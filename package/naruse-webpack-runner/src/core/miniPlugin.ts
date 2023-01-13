import {
    isAliasPath,
    isEmptyObject,
    META_TYPE,
    NODE_MODULES_REG,
    printLog,
    processTypeEnum,
    promoteRelativePath,
    readConfig,
    REG_STYLE,
    replaceAliasPath,
    resolveMainFilePath,
} from '@tarojs/helper'
import fs from 'fs-extra'
import { urlToRequest } from 'loader-utils'
import path from 'path'
import { Compilation, sources } from 'webpack'
import EntryDependency from 'webpack/lib/dependencies/EntryDependency'

import TaroSingleEntryDependency from '../dependencies/TaroSingleEntryDependency'
import { componentConfig } from '../template/component'


import type { RecursiveTemplate, UnRecursiveTemplate } from '@tarojs/shared/dist/template'
import type { AppConfig, Config } from '@tarojs/taro'
import type { Compiler } from 'webpack'
import type { IComponent, IFileType } from '../utils/types'
import { NaruseTemplate } from './template'

const PLUGIN_NAME = 'TaroMiniPlugin'
const { ConcatSource, RawSource } = sources

function isLoaderExist(loaders, loaderName: string) {
    return loaders.some(item => item.loader === loaderName)
}

interface ITaroMiniPluginOptions {
    appEntry?: string
    pages: string[]
    sourceDir: string
    pluginConfig?: Record<string, any>
    pluginMainEntry?: string
    commonChunks?: string[]
    frameworkExts?: string[]
    fileType?: IFileType
    template?: NaruseTemplate
    alias?: Record<string, string>
}

export interface IComponentObj {
    name?: string
    path: string | null
    type?: string
}

interface FilesConfig {
    [configName: string]: {
        content: Config
        path: string
    }
}

export default class TaroMiniPlugin {
    /** 插件配置选项 */
    options: ITaroMiniPluginOptions
    context: string
    /** app 入口文件路径 */
    appEntry: string
    /** app config 配置内容 */
    appConfig: AppConfig = {}
    /** app、页面、组件的配置集合 */
    filesConfig: FilesConfig = {}
    isWatch = false
    /** 页面列表 */
    pages = new Set<IComponent>()
    components = new Set<IComponent>()
    /** tabbar icon 图片路径列表 */
    tabBarIcons = new Set<string>()
    dependencies = new Map<string, TaroSingleEntryDependency>()

    constructor(options = {} as ITaroMiniPluginOptions) {
        this.options = Object.assign({
            sourceDir: '',
            commonChunks: ['runtime', 'vendors'],
            fileType: {
                style: '.acss',
                config: '.json',
                script: '.js',
                templ: '.axml',
            },
            minifyXML: {},
            hot: false,
            alias: {},
        }, options)
        this.appEntry = options.appEntry || this.options.sourceDir;
    }

    /**
     * 自动驱动 tapAsync
     */
    tryAsync<T extends Compiler | Compilation>(fn: (target: T) => Promise<any>) {
        return async (arg: T, callback: any) => {
            try {
                await fn(arg)
                callback()
            } catch (err) {
                callback(err)
            }
        }
    }

    /**
     * 插件入口
     */
    apply(compiler: Compiler) {

        this.context = compiler.context

        compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
            console.log('entryOption', context, entry)
        });

        /** build mode */
        compiler.hooks.run.tapAsync(
            PLUGIN_NAME,
            this.tryAsync<Compiler>(async compiler => {
                await this.run(compiler)
            })
        )

        /** watch mode */
        compiler.hooks.watchRun.tapAsync(
            PLUGIN_NAME,
            this.tryAsync<Compiler>(async compiler => {
                const changedFiles = this.getChangedFiles(compiler)
                if (changedFiles?.size > 0) {
                    this.isWatch = true
                }
                await this.run(compiler)
            })
        )

        /** compilation.addEntry */
        compiler.hooks.make.tapAsync(
            PLUGIN_NAME,
            this.tryAsync<Compilation>(async compilation => {
                const dependencies = this.dependencies
                const promises: Promise<null>[] = []
                dependencies.forEach(dep => {
                    promises.push(new Promise<null>((resolve, reject) => {
                        compilation.addEntry(this.options.sourceDir, dep, {
                            name: dep.name,
                            ...dep.options
                        }, err => err ? reject(err) : resolve(null))
                    }))
                })
                await Promise.all(promises)
            })
        )

        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            /** For Webpack compilation get factory from compilation.dependencyFactories by denpendence's constructor */
            compilation.dependencyFactories.set(EntryDependency, normalModuleFactory)
            compilation.dependencyFactories.set(TaroSingleEntryDependency as any, normalModuleFactory)


            compiler.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(PLUGIN_NAME, (_loaderContext, module:/** TaroNormalModule */ any) => {
                const loaderName = '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/dist/core/baseLoader.js';
                if (!isLoaderExist(module.loaders, '')) {
                    module.loaders.unshift({
                        loader: loaderName,
                        options: {
                            loaderMeta: {},
                            naruseSourcePath: '../src',
                        }
                    })
                }
            })

            compilation.hooks.processAssets.tapAsync(
                {
                    name: PLUGIN_NAME,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
                },
                this.tryAsync<any>(async () => {
                    await this.generateMiniFiles(compilation)
                })
            )
        })
    }

    getChangedFiles(compiler: Compiler) {
        return compiler.modifiedFiles
    }

    /**
     * 分析 app 入口文件，搜集页面、组件信息，
     * 往 this.dependencies 中添加资源模块
     */
    run(compiler: Compiler) {
        this.getPages()
        this.getPagesConfig()
        this.getConfigFiles(compiler)
        this.addEntries()
    }

    /**
     * 根据 app config 的 pages 配置项，收集所有页面信息，
     * 包括处理分包和 tabbar
     */
    getPages() {
        const appPages = this.options.pages;
        if (!appPages || !appPages.length) {
            throw new Error('全局配置缺少 pages 字段，请检查！')
        }

        if (!this.isWatch) {
            printLog(processTypeEnum.COMPILE, '入口路径', this.getShowPath(this.appEntry))
        }
        const { frameworkExts } = this.options
        this.pages = new Set([
            ...appPages.map<IComponent>(item => {
                const pagePath = resolveMainFilePath(path.join(this.options.sourceDir, item), frameworkExts)
                const pageTemplatePath = this.getTemplatePath(pagePath)
                const isNative = this.isNativePageORComponent(pageTemplatePath)
                return {
                    name: item,
                    path: pagePath,
                    isNative,
                    stylePath: isNative ? this.getStylePath(pagePath) : undefined,
                    templatePath: isNative ? this.getTemplatePath(pagePath) : undefined
                }
            })
        ])
    }

    /**
     * 读取页面及其依赖的组件的配置
     */
    getPagesConfig() {
        this.pages.forEach(page => {
            if (!this.isWatch) {
                printLog(processTypeEnum.COMPILE, '发现页面', this.getShowPath(page.path))
            }
            this.compileFile(page)
        })
    }

    /**
     * 往 this.dependencies 中新增或修改所有 config 配置模块
     */
    getConfigFiles(compiler: Compiler) {
        const filesConfig = this.filesConfig
        Object.keys(filesConfig).forEach(item => {
            if (fs.existsSync(filesConfig[item].path)) {
                this.addEntry(filesConfig[item].path, item, META_TYPE.CONFIG)
            }
        })

        // webpack createChunkAssets 前一刻，去除所有 config chunks
        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            compilation.hooks.beforeChunkAssets.tap(PLUGIN_NAME, () => {
                const chunks = compilation.chunks
                const configNames = Object.keys(filesConfig)

                //@ts-ignore
                for (const chunk of chunks) {
                    if (configNames.find(configName => configName === chunk.name)) chunks.delete(chunk)
                }
            })
        })
    }

    /**
     * 在 this.dependencies 中新增或修改模块
     */
    addEntry(entryPath: string, entryName: string, entryType: META_TYPE, options = {}) {
        let dep: TaroSingleEntryDependency
        if (this.dependencies.has(entryPath)) {
            dep = this.dependencies.get(entryPath)!
            dep.name = entryName
            dep.loc = { name: entryName }
            dep.request = entryPath
            dep.userRequest = entryPath
            dep.miniType = entryType
            dep.options = options
        } else {
            dep = new TaroSingleEntryDependency(entryPath, entryName, { name: entryName }, entryType, options)
        }
        this.dependencies.set(entryPath, dep)
    }

    /**
     * 在 this.dependencies 中新增或修改 app、模板组件、页面、组件等资源模块
     */
    addEntries() {
        this.pages.forEach(item => {
            if (item.isNative) {
                this.addEntry(item.path, item.name, META_TYPE.NORMAL)
                if (item.stylePath && fs.existsSync(item.stylePath)) {
                    this.addEntry(item.stylePath, this.getStylePath(item.name), META_TYPE.NORMAL)
                }
                if (item.templatePath && fs.existsSync(item.templatePath)) {
                    this.addEntry(item.templatePath, this.getTemplatePath(item.name), META_TYPE.NORMAL)
                }
            } else {
                this.addEntry(item.path, item.name, META_TYPE.PAGE)
            }
        })
        this.components.forEach(item => {
            if (item.isNative) {
                this.addEntry(item.path, item.name, META_TYPE.NORMAL)
                if (item.stylePath && fs.existsSync(item.stylePath)) {
                    this.addEntry(item.stylePath, this.getStylePath(item.name), META_TYPE.NORMAL)
                }
                if (item.templatePath && fs.existsSync(item.templatePath)) {
                    this.addEntry(item.templatePath, this.getTemplatePath(item.name), META_TYPE.NORMAL)
                }
            } else {
                this.addEntry(item.path, item.name, META_TYPE.COMPONENT)
            }
        })
    }

    replaceExt(file: string, ext: string) {
        return path.join(path.dirname(file), path.basename(file, path.extname(file)) + `${ext}`)
    }

    /**
     * 读取页面、组件的配置，并递归读取依赖的组件的配置
     */
    compileFile(file: IComponent) {
        const filePath = file.path
        const fileConfigPath = file.isNative ? this.replaceExt(filePath, '.json') : this.getConfigFilePath(filePath)
        const fileConfig = readConfig(fileConfigPath)
        const usingComponents = fileConfig.usingComponents

        // 递归收集依赖的第三方组件
        if (usingComponents) {
            const componentNames = Object.keys(usingComponents)
            const depComponents: Array<{ name: string, path: string }> = []
            const alias = this.options.alias
            for (const compName of componentNames) {
                let compPath = usingComponents[compName]

                if (isAliasPath(compPath, alias)) {
                    compPath = replaceAliasPath(filePath, compPath, alias)
                    fileConfig.usingComponents[compName] = compPath
                }

                depComponents.push({
                    name: compName,
                    path: compPath
                })

                if (!componentConfig.thirdPartyComponents.has(compName) && !file.isNative) {
                    componentConfig.thirdPartyComponents.set(compName, new Set())
                }
            }
            depComponents.forEach(item => {
                const componentPath = resolveMainFilePath(path.resolve(path.dirname(file.path), item.path))
                if (fs.existsSync(componentPath) && !Array.from(this.components).some(item => item.path === componentPath)) {
                    const componentName = this.getComponentName(componentPath)
                    const componentTempPath = this.getTemplatePath(componentPath)
                    const isNative = this.isNativePageORComponent(componentTempPath)
                    const componentObj = {
                        name: componentName,
                        path: componentPath,
                        isNative,
                        stylePath: isNative ? this.getStylePath(componentPath) : undefined,
                        templatePath: isNative ? this.getTemplatePath(componentPath) : undefined
                    }
                    this.components.add(componentObj)
                    this.compileFile(componentObj)
                }
            })
        }

        this.filesConfig[this.getConfigFilePath(file.name)] = {
            content: fileConfig,
            path: fileConfigPath
        }
    }


    /** 是否为小程序原生页面或组件 */
    isNativePageORComponent(templatePath: string): boolean {
        return fs.existsSync(templatePath)
    }

    getShowPath(filePath: string) {
        return filePath.replace(this.context, '').replace(/\\/g, '/').replace(/^\//, '')
    }

    /** 生成小程序相关文件 */
    async generateMiniFiles(compilation: Compilation) {
        const { template, sourceDir } = this.options
        const baseTemplateName = this.getIsBuildPluginPath('base', false)


        /**
         * 与原生小程序混写时解析模板与样式
         */
        compilation.getAssets().forEach(({ name: assetPath }) => {
            const styleExt = this.options.fileType.style
            const templExt = this.options.fileType.templ
            if (new RegExp(`(\\${styleExt}|\\${templExt})\\.js(\\.map){0,1}$`).test(assetPath)) {
                delete compilation.assets[assetPath]
            } else if (new RegExp(`${styleExt}${styleExt}$`).test(assetPath)) {
                const assetObj = compilation.assets[assetPath]
                const newAssetPath = assetPath.replace(styleExt, '')
                compilation.assets[newAssetPath] = assetObj
                delete compilation.assets[assetPath]
            } else if (new RegExp(`.?.js.js$`).test(assetPath)) {
                delete compilation.assets[assetPath]
            }
        })
        this.generateTemplateFile(compilation, baseTemplateName, template.buildTemplate, componentConfig)
        this.components.forEach(component => {
            const importBaseTemplatePath = promoteRelativePath(path.relative(component.path, path.join(sourceDir, this.getTemplatePath(baseTemplateName))))
            const config = this.filesConfig[this.getConfigFilePath(component.name)]
            if (config) {
                this.generateConfigFile(compilation, component.path, config.content)
            }
            if (!component.isNative) {
                this.generateTemplateFile(compilation, component.path, template.buildPageTemplate, importBaseTemplatePath)
            }
        })
        this.pages.forEach(page => {
            let importBaseTemplatePath = promoteRelativePath(path.relative(page.path, path.join(sourceDir, this.getTemplatePath(baseTemplateName))))
            const config = this.filesConfig[this.getConfigFilePath(page.name)]
            if (config) {
                config.content.usingComponents = {
                    ...config.content.usingComponents
                }
                this.generateConfigFile(compilation, page.path, config.content)
            }
            if (!page.isNative) {
                this.generateTemplateFile(compilation, page.path, template.buildPageTemplate, importBaseTemplatePath)
            }
        })
        this.injectCommonStyles(compilation)
    }

    generateConfigFile(compilation: Compilation, filePath: string, config: Config & { component?: boolean }) {
        const fileConfigName = this.getConfigPath(this.getComponentName(filePath))
        const unOfficalConfigs = ['enableShareAppMessage', 'enableShareTimeline', 'components']
        unOfficalConfigs.forEach(item => {
            delete config[item]
        })
        const fileConfigStr = JSON.stringify(config)
        compilation.assets[fileConfigName] = new RawSource(fileConfigStr)
    }

    generateTemplateFile(compilation: Compilation, filePath: string, templateFn: (...args) => string, ...options) {
        let templStr = templateFn(...options)
        const fileTemplName = this.getTemplatePath(this.getComponentName(filePath))
        compilation.assets[fileTemplName] = new RawSource(templStr)
    }

    getComponentName(componentPath: string) {
        let componentName: string
        if (NODE_MODULES_REG.test(componentPath)) {
            componentName = componentPath.replace(this.context, '').replace(/\\/g, '/').replace(path.extname(componentPath), '')
            componentName = componentName.replace(/node_modules/gi, 'npm')
        } else {
            componentName = componentPath.replace(this.options.sourceDir, '').replace(/\\/g, '/').replace(path.extname(componentPath), '')
        }

        return componentName.replace(/^(\/|\\)/, '')
    }

    getIsBuildPluginPath(filePath, isBuildPlugin) {
        return isBuildPlugin ? `plugin/${filePath}` : filePath
    }

    /**
     * 根据 app、页面、组件的路径获取对应的 config 配置文件的路径
     * @returns config 的路径
     */
    getConfigFilePath(filePath: string) {
        return resolveMainFilePath(`${filePath.replace(path.extname(filePath), '')}.config`)
    }

    /** 处理 xml 文件后缀 */
    getTemplatePath(filePath: string) {
        return this.getTargetFilePath(filePath, this.options.fileType.templ)
    }

    /** 处理样式文件后缀 */
    getStylePath(filePath: string) {
        return this.getTargetFilePath(filePath, this.options.fileType.style)
    }

    /** 处理 config 文件后缀 */
    getConfigPath(filePath: string) {
        return this.getTargetFilePath(filePath, this.options.fileType.config)
    }

    /** 处理 extname */
    getTargetFilePath(filePath: string, targetExtname: string) {
        const extname = path.extname(filePath)
        if (extname) {
            return filePath.replace(extname, targetExtname)
        }
        return filePath + targetExtname
    }

    /**
     * 小程序全局样式文件中引入 common chunks 中的公共样式文件
     */
    injectCommonStyles({ assets }: Compilation) {
        const styleExt = this.options.fileType.style
        const appStyle = `app${styleExt}`
        const REG_STYLE_EXT = new RegExp(`\\.(${styleExt.replace('.', '')})(\\?.*)?$`)

        if (!assets[appStyle]) return

        const originSource = assets[appStyle]
        const source = new ConcatSource(originSource)

        Object.keys(assets).forEach(assetName => {
            const fileName = path.basename(assetName, path.extname(assetName))
            if ((REG_STYLE.test(assetName) || REG_STYLE_EXT.test(assetName)) && this.options.commonChunks.includes(fileName)) {
                source.add('\n')
                source.add(`@import ${JSON.stringify(urlToRequest(assetName))};`)
                assets[appStyle] = source
            }
        })
    }
}
