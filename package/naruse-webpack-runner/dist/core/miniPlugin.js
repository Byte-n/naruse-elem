"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
const fs_extra_1 = __importDefault(require("fs-extra"));
const loader_utils_1 = require("loader-utils");
const path_1 = __importDefault(require("path"));
const webpack_1 = require("webpack");
const EntryDependency_1 = __importDefault(require("webpack/lib/dependencies/EntryDependency"));
const TaroSingleEntryDependency_1 = __importDefault(require("../dependencies/TaroSingleEntryDependency"));
const component_1 = require("../template/component");
const PLUGIN_NAME = 'TaroMiniPlugin';
const { ConcatSource, RawSource } = webpack_1.sources;
function isLoaderExist(loaders, loaderName) {
    return loaders.some(item => item.loader === loaderName);
}
class TaroMiniPlugin {
    constructor(options = {}) {
        /** app config 配置内容 */
        this.appConfig = {};
        /** app、页面、组件的配置集合 */
        this.filesConfig = {};
        this.isWatch = false;
        /** 页面列表 */
        this.pages = new Set();
        this.components = new Set();
        /** tabbar icon 图片路径列表 */
        this.tabBarIcons = new Set();
        this.dependencies = new Map();
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
        }, options);
        this.appEntry = options.appEntry || this.options.sourceDir;
    }
    /**
     * 自动驱动 tapAsync
     */
    tryAsync(fn) {
        return (arg, callback) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield fn(arg);
                callback();
            }
            catch (err) {
                callback(err);
            }
        });
    }
    /**
     * 插件入口
     */
    apply(compiler) {
        this.context = compiler.context;
        compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
            console.log('entryOption', context, entry);
        });
        /** build mode */
        compiler.hooks.run.tapAsync(PLUGIN_NAME, this.tryAsync((compiler) => __awaiter(this, void 0, void 0, function* () {
            yield this.run(compiler);
        })));
        /** watch mode */
        compiler.hooks.watchRun.tapAsync(PLUGIN_NAME, this.tryAsync((compiler) => __awaiter(this, void 0, void 0, function* () {
            const changedFiles = this.getChangedFiles(compiler);
            if ((changedFiles === null || changedFiles === void 0 ? void 0 : changedFiles.size) > 0) {
                this.isWatch = true;
            }
            yield this.run(compiler);
        })));
        /** compilation.addEntry */
        compiler.hooks.make.tapAsync(PLUGIN_NAME, this.tryAsync((compilation) => __awaiter(this, void 0, void 0, function* () {
            const dependencies = this.dependencies;
            const promises = [];
            dependencies.forEach(dep => {
                promises.push(new Promise((resolve, reject) => {
                    compilation.addEntry(this.options.sourceDir, dep, Object.assign({ name: dep.name }, dep.options), err => err ? reject(err) : resolve(null));
                }));
            });
            yield Promise.all(promises);
        })));
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            /** For Webpack compilation get factory from compilation.dependencyFactories by denpendence's constructor */
            compilation.dependencyFactories.set(EntryDependency_1.default, normalModuleFactory);
            compilation.dependencyFactories.set(TaroSingleEntryDependency_1.default, normalModuleFactory);
            compiler.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(PLUGIN_NAME, (_loaderContext, module) => {
                const loaderName = '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/dist/core/baseLoader.js';
                if (!isLoaderExist(module.loaders, '')) {
                    module.loaders.unshift({
                        loader: loaderName,
                        options: {
                            loaderMeta: {},
                            naruseSourcePath: '../src',
                        }
                    });
                }
            });
            compilation.hooks.processAssets.tapAsync({
                name: PLUGIN_NAME,
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
            }, this.tryAsync(() => __awaiter(this, void 0, void 0, function* () {
                yield this.generateMiniFiles(compilation);
            })));
        });
    }
    getChangedFiles(compiler) {
        return compiler.modifiedFiles;
    }
    /**
     * 分析 app 入口文件，搜集页面、组件信息，
     * 往 this.dependencies 中添加资源模块
     */
    run(compiler) {
        this.getPages();
        this.getPagesConfig();
        this.getConfigFiles(compiler);
        this.addEntries();
    }
    /**
     * 根据 app config 的 pages 配置项，收集所有页面信息，
     * 包括处理分包和 tabbar
     */
    getPages() {
        const appPages = this.options.pages;
        if (!appPages || !appPages.length) {
            throw new Error('全局配置缺少 pages 字段，请检查！');
        }
        if (!this.isWatch) {
            (0, helper_1.printLog)("compile" /* processTypeEnum.COMPILE */, '入口路径', this.getShowPath(this.appEntry));
        }
        const { frameworkExts } = this.options;
        this.pages = new Set([
            ...appPages.map(item => {
                const pagePath = (0, helper_1.resolveMainFilePath)(path_1.default.join(this.options.sourceDir, item), frameworkExts);
                const pageTemplatePath = this.getTemplatePath(pagePath);
                const isNative = this.isNativePageORComponent(pageTemplatePath);
                return {
                    name: item,
                    path: pagePath,
                    isNative,
                    stylePath: isNative ? this.getStylePath(pagePath) : undefined,
                    templatePath: isNative ? this.getTemplatePath(pagePath) : undefined
                };
            })
        ]);
    }
    /**
     * 读取页面及其依赖的组件的配置
     */
    getPagesConfig() {
        this.pages.forEach(page => {
            if (!this.isWatch) {
                (0, helper_1.printLog)("compile" /* processTypeEnum.COMPILE */, '发现页面', this.getShowPath(page.path));
            }
            this.compileFile(page);
        });
    }
    /**
     * 往 this.dependencies 中新增或修改所有 config 配置模块
     */
    getConfigFiles(compiler) {
        const filesConfig = this.filesConfig;
        Object.keys(filesConfig).forEach(item => {
            if (fs_extra_1.default.existsSync(filesConfig[item].path)) {
                this.addEntry(filesConfig[item].path, item, helper_1.META_TYPE.CONFIG);
            }
        });
        // webpack createChunkAssets 前一刻，去除所有 config chunks
        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            compilation.hooks.beforeChunkAssets.tap(PLUGIN_NAME, () => {
                const chunks = compilation.chunks;
                const configNames = Object.keys(filesConfig);
                //@ts-ignore
                for (const chunk of chunks) {
                    if (configNames.find(configName => configName === chunk.name))
                        chunks.delete(chunk);
                }
            });
        });
    }
    /**
     * 在 this.dependencies 中新增或修改模块
     */
    addEntry(entryPath, entryName, entryType, options = {}) {
        let dep;
        if (this.dependencies.has(entryPath)) {
            dep = this.dependencies.get(entryPath);
            dep.name = entryName;
            dep.loc = { name: entryName };
            dep.request = entryPath;
            dep.userRequest = entryPath;
            dep.miniType = entryType;
            dep.options = options;
        }
        else {
            dep = new TaroSingleEntryDependency_1.default(entryPath, entryName, { name: entryName }, entryType, options);
        }
        this.dependencies.set(entryPath, dep);
    }
    /**
     * 在 this.dependencies 中新增或修改 app、模板组件、页面、组件等资源模块
     */
    addEntries() {
        this.pages.forEach(item => {
            if (item.isNative) {
                this.addEntry(item.path, item.name, helper_1.META_TYPE.NORMAL);
                if (item.stylePath && fs_extra_1.default.existsSync(item.stylePath)) {
                    this.addEntry(item.stylePath, this.getStylePath(item.name), helper_1.META_TYPE.NORMAL);
                }
                if (item.templatePath && fs_extra_1.default.existsSync(item.templatePath)) {
                    this.addEntry(item.templatePath, this.getTemplatePath(item.name), helper_1.META_TYPE.NORMAL);
                }
            }
            else {
                this.addEntry(item.path, item.name, helper_1.META_TYPE.PAGE);
            }
        });
        this.components.forEach(item => {
            if (item.isNative) {
                this.addEntry(item.path, item.name, helper_1.META_TYPE.NORMAL);
                if (item.stylePath && fs_extra_1.default.existsSync(item.stylePath)) {
                    this.addEntry(item.stylePath, this.getStylePath(item.name), helper_1.META_TYPE.NORMAL);
                }
                if (item.templatePath && fs_extra_1.default.existsSync(item.templatePath)) {
                    this.addEntry(item.templatePath, this.getTemplatePath(item.name), helper_1.META_TYPE.NORMAL);
                }
            }
            else {
                this.addEntry(item.path, item.name, helper_1.META_TYPE.COMPONENT);
            }
        });
    }
    replaceExt(file, ext) {
        return path_1.default.join(path_1.default.dirname(file), path_1.default.basename(file, path_1.default.extname(file)) + `${ext}`);
    }
    /**
     * 读取页面、组件的配置，并递归读取依赖的组件的配置
     */
    compileFile(file) {
        const filePath = file.path;
        const fileConfigPath = file.isNative ? this.replaceExt(filePath, '.json') : this.getConfigFilePath(filePath);
        const fileConfig = (0, helper_1.readConfig)(fileConfigPath);
        const usingComponents = fileConfig.usingComponents;
        // 递归收集依赖的第三方组件
        if (usingComponents) {
            const componentNames = Object.keys(usingComponents);
            const depComponents = [];
            const alias = this.options.alias;
            for (const compName of componentNames) {
                let compPath = usingComponents[compName];
                if ((0, helper_1.isAliasPath)(compPath, alias)) {
                    compPath = (0, helper_1.replaceAliasPath)(filePath, compPath, alias);
                    fileConfig.usingComponents[compName] = compPath;
                }
                depComponents.push({
                    name: compName,
                    path: compPath
                });
                if (!component_1.componentConfig.thirdPartyComponents.has(compName) && !file.isNative) {
                    component_1.componentConfig.thirdPartyComponents.set(compName, new Set());
                }
            }
            depComponents.forEach(item => {
                const componentPath = (0, helper_1.resolveMainFilePath)(path_1.default.resolve(path_1.default.dirname(file.path), item.path));
                if (fs_extra_1.default.existsSync(componentPath) && !Array.from(this.components).some(item => item.path === componentPath)) {
                    const componentName = this.getComponentName(componentPath);
                    const componentTempPath = this.getTemplatePath(componentPath);
                    const isNative = this.isNativePageORComponent(componentTempPath);
                    const componentObj = {
                        name: componentName,
                        path: componentPath,
                        isNative,
                        stylePath: isNative ? this.getStylePath(componentPath) : undefined,
                        templatePath: isNative ? this.getTemplatePath(componentPath) : undefined
                    };
                    this.components.add(componentObj);
                    this.compileFile(componentObj);
                }
            });
        }
        this.filesConfig[this.getConfigFilePath(file.name)] = {
            content: fileConfig,
            path: fileConfigPath
        };
    }
    /** 是否为小程序原生页面或组件 */
    isNativePageORComponent(templatePath) {
        return fs_extra_1.default.existsSync(templatePath);
    }
    getShowPath(filePath) {
        return filePath.replace(this.context, '').replace(/\\/g, '/').replace(/^\//, '');
    }
    /** 生成小程序相关文件 */
    generateMiniFiles(compilation) {
        return __awaiter(this, void 0, void 0, function* () {
            const { template, sourceDir } = this.options;
            const baseTemplateName = this.getIsBuildPluginPath('base', false);
            /**
             * 与原生小程序混写时解析模板与样式
             */
            compilation.getAssets().forEach(({ name: assetPath }) => {
                const styleExt = this.options.fileType.style;
                const templExt = this.options.fileType.templ;
                if (new RegExp(`(\\${styleExt}|\\${templExt})\\.js(\\.map){0,1}$`).test(assetPath)) {
                    delete compilation.assets[assetPath];
                }
                else if (new RegExp(`${styleExt}${styleExt}$`).test(assetPath)) {
                    const assetObj = compilation.assets[assetPath];
                    const newAssetPath = assetPath.replace(styleExt, '');
                    compilation.assets[newAssetPath] = assetObj;
                    delete compilation.assets[assetPath];
                }
                else if (new RegExp(`.?.js.js$`).test(assetPath)) {
                    delete compilation.assets[assetPath];
                }
            });
            this.generateTemplateFile(compilation, baseTemplateName, template.buildTemplate, component_1.componentConfig);
            this.components.forEach(component => {
                const importBaseTemplatePath = (0, helper_1.promoteRelativePath)(path_1.default.relative(component.path, path_1.default.join(sourceDir, this.getTemplatePath(baseTemplateName))));
                const config = this.filesConfig[this.getConfigFilePath(component.name)];
                if (config) {
                    this.generateConfigFile(compilation, component.path, config.content);
                }
                if (!component.isNative) {
                    this.generateTemplateFile(compilation, component.path, template.buildPageTemplate, importBaseTemplatePath);
                }
            });
            this.pages.forEach(page => {
                let importBaseTemplatePath = (0, helper_1.promoteRelativePath)(path_1.default.relative(page.path, path_1.default.join(sourceDir, this.getTemplatePath(baseTemplateName))));
                const config = this.filesConfig[this.getConfigFilePath(page.name)];
                if (config) {
                    config.content.usingComponents = Object.assign({}, config.content.usingComponents);
                    this.generateConfigFile(compilation, page.path, config.content);
                }
                if (!page.isNative) {
                    this.generateTemplateFile(compilation, page.path, template.buildPageTemplate, importBaseTemplatePath);
                }
            });
            this.injectCommonStyles(compilation);
        });
    }
    generateConfigFile(compilation, filePath, config) {
        const fileConfigName = this.getConfigPath(this.getComponentName(filePath));
        const unOfficalConfigs = ['enableShareAppMessage', 'enableShareTimeline', 'components'];
        unOfficalConfigs.forEach(item => {
            delete config[item];
        });
        const fileConfigStr = JSON.stringify(config);
        compilation.assets[fileConfigName] = new RawSource(fileConfigStr);
    }
    generateTemplateFile(compilation, filePath, templateFn, ...options) {
        let templStr = templateFn(...options);
        const fileTemplName = this.getTemplatePath(this.getComponentName(filePath));
        compilation.assets[fileTemplName] = new RawSource(templStr);
    }
    getComponentName(componentPath) {
        let componentName;
        if (helper_1.NODE_MODULES_REG.test(componentPath)) {
            componentName = componentPath.replace(this.context, '').replace(/\\/g, '/').replace(path_1.default.extname(componentPath), '');
            componentName = componentName.replace(/node_modules/gi, 'npm');
        }
        else {
            componentName = componentPath.replace(this.options.sourceDir, '').replace(/\\/g, '/').replace(path_1.default.extname(componentPath), '');
        }
        return componentName.replace(/^(\/|\\)/, '');
    }
    getIsBuildPluginPath(filePath, isBuildPlugin) {
        return isBuildPlugin ? `plugin/${filePath}` : filePath;
    }
    /**
     * 根据 app、页面、组件的路径获取对应的 config 配置文件的路径
     * @returns config 的路径
     */
    getConfigFilePath(filePath) {
        return (0, helper_1.resolveMainFilePath)(`${filePath.replace(path_1.default.extname(filePath), '')}.config`);
    }
    /** 处理 xml 文件后缀 */
    getTemplatePath(filePath) {
        return this.getTargetFilePath(filePath, this.options.fileType.templ);
    }
    /** 处理样式文件后缀 */
    getStylePath(filePath) {
        return this.getTargetFilePath(filePath, this.options.fileType.style);
    }
    /** 处理 config 文件后缀 */
    getConfigPath(filePath) {
        return this.getTargetFilePath(filePath, this.options.fileType.config);
    }
    /** 处理 extname */
    getTargetFilePath(filePath, targetExtname) {
        const extname = path_1.default.extname(filePath);
        if (extname) {
            return filePath.replace(extname, targetExtname);
        }
        return filePath + targetExtname;
    }
    /**
     * 小程序全局样式文件中引入 common chunks 中的公共样式文件
     */
    injectCommonStyles({ assets }) {
        const styleExt = this.options.fileType.style;
        const appStyle = `app${styleExt}`;
        const REG_STYLE_EXT = new RegExp(`\\.(${styleExt.replace('.', '')})(\\?.*)?$`);
        if (!assets[appStyle])
            return;
        const originSource = assets[appStyle];
        const source = new ConcatSource(originSource);
        Object.keys(assets).forEach(assetName => {
            const fileName = path_1.default.basename(assetName, path_1.default.extname(assetName));
            if ((helper_1.REG_STYLE.test(assetName) || REG_STYLE_EXT.test(assetName)) && this.options.commonChunks.includes(fileName)) {
                source.add('\n');
                source.add(`@import ${JSON.stringify((0, loader_utils_1.urlToRequest)(assetName))};`);
                assets[appStyle] = source;
            }
        });
    }
}
exports.default = TaroMiniPlugin;
//# sourceMappingURL=miniPlugin.js.map