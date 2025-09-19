import { fs, printLog, processTypeEnum } from "@tarojs/helper";
import path from "path";
import { baseExts } from "../utils";
import { Compilation, Compiler, RuntimeGlobals, sources } from "webpack";
import { NaruseLoadScript } from "../modules/NaruseLoadScriptModule";
import { NarusePublicPathModule  } from '../modules/NarusePublicPathModule';

interface IOptions {
    entry: string;
    outputPath: string;
    isExportDefaultString?: boolean;
    fileName: string;
}


/**
 * 特别针对与 naruse 的单文件更新配置项
 * 所需：
 * 1. ✅单文件引入与导出
 * 2. css 文件引入（外部插件实现）
 * 3. ✅Naruse 自动设为全局变量
 * 4. ✅主文件支持导出组件
 * 5. ✅TS 支持
 * 6. 支持动态导入组件
 *    a. 本地导入
 *    b. 运行时导入
 * 7. 配置项导出（外部插件实现）
 */
export default class SingleHotComponentPlugin {
    /** 插件配置选项 */
    options: IOptions;
    /** 入口文件 */
    entry: string;
    /** 输出路径 */
    outputPath: string;
    /** 入口文件路径 */
    entryFile: string;
    /** 是否导出默认字符串 */
    isExportDefaultString: boolean;
    fileName: string;

    constructor(options: IOptions) {
        this.options = options;
        this.entry = options.entry;
        this.outputPath = options.outputPath;
        this.isExportDefaultString = options.isExportDefaultString || false;
        this.fileName = options.fileName || 'index.js';
    }

    apply(compiler: Compiler) {
        // 重置入口文件
        this.resetEntryOption(compiler);

        compiler.hooks.compilation.tap('SingleHotComponentPlugin', compilation => {
            // 替换掉加载脚本的模块
            compilation.hooks.runtimeRequirementInTree
                .for(RuntimeGlobals.loadScript)
                .tap('SingleHotComponentPlugin', (chunk, set) => {
                    // 删除原有的加载脚本模块
                    set.delete(RuntimeGlobals.loadScript);
                    // 添加新的加载脚本模块
                    compilation.addRuntimeModule(chunk, new NaruseLoadScript());
                    return true;
                });
            // 替换掉原有的公共地址模块，因为实际上是在 naruse-parser 虚拟机内运行的，不需要额外的公共地址
            compilation.hooks.runtimeRequirementInTree
                .for(RuntimeGlobals.publicPath)
                .tap('SingleHotComponentPlugin', (chunk, set) => {
                    set.delete(RuntimeGlobals.publicPath);
                    compilation.addRuntimeModule(chunk, new NarusePublicPathModule());
                    return true;
                });

            // 最后一步，将入口文件的内容替换为 export default
            // 使用更早的阶段来避免破坏已生成的 source map
            compilation.hooks.processAssets.tap({
                name: 'SingleHotComponentPlugin',
                stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
            }, () => {
                const originalAsset = compilation.assets[this.fileName];

                // 判断是否为 SourceMapSource 类型
                if (originalAsset.sourceAndMap && originalAsset.map) {
                    // 情况1：有 source map，使用 ReplaceSource 保持映射
                    const { source, map } = originalAsset.sourceAndMap();
                    const replaceSource = new sources.ReplaceSource(
                        new sources.SourceMapSource(source, this.fileName, map)
                    );

                    // 在头部插入 $webpack 和 $outer 变量声明
                    const headerCode = 'var $webpack=(typeof $webpack)[0]==\'u\'?{}:$webpack;var $outer={};';
                    replaceSource.insert(0, headerCode);

                    // 在末尾插入导出逻辑
                    const footerCode = 'for(var i in $outer)exports[i] = $outer[i];';
                    const sourceLength = typeof source === 'string' ? source.length : 0;
                    replaceSource.insert(sourceLength, footerCode);

                    let finalContent = replaceSource.source();

                    // 处理 isExportDefaultString 逻辑
                    if (this.isExportDefaultString) {
                        // 清理出口文件中不支持转译为模版字符串的内容
                        finalContent = finalContent.toString().replace(/`/g, '\\`');
                        finalContent = `export default ${JSON.stringify(finalContent)}`;

                        // 创建最终的 SourceMapSource
                        compilation.assets[this.fileName] = new sources.SourceMapSource(
                            finalContent,
                            this.fileName,
                            map
                        );
                    } else {
                        // 直接使用 ReplaceSource
                        compilation.assets[this.fileName] = replaceSource;
                    }
                } else {
                    // 情况2：没有 source map，按原来的方式处理
                    let entryContent = originalAsset.source().toString();
                    // 将 webpack 导出的东西重新导出到 exports
                    entryContent += 'for(var i in $outer)exports[i] = $outer[i];';
                    // 在头部默认添加上 $webpack 防止不存在
                    entryContent = `var $webpack=(typeof $webpack)[0]=='u'?{}:$webpack;var $outer={};${entryContent}`;
                    if (this.isExportDefaultString) {
                        // 清理出口文件中不支持转译为模版字符串的内容
                        entryContent = entryContent.toString().replace(/`/g, '\\`');
                        entryContent = `export default ${JSON.stringify(entryContent)}`;
                    }
                    compilation.assets[this.fileName] = new sources.RawSource(entryContent);
                }
            })
        })
    }

    /**
     * 清理入口文件，由 entry 自动生成
     */
    resetEntryOption(compiler: Compiler) {
        const exts = [...compiler.options?.resolve?.extensions, baseExts];
        // 判断入口路径是否是一个目录，不是则报错
        const isDir = fs.statSync(this.entry).isDirectory();
        if (!isDir) {
            throw new Error(`Entry path must be a directory, but got ${this.entry}`);
        }
        // 枚举所有可能存在的文件名
        const enumNames = ['index', path.basename(this.entry)];
        const fileNames = exts.reduce((prev, cur) => {
            const names = enumNames.map(name => `${name}${cur}`);
            return [...prev, ...names];
        }, []) as string[];
        // 判断入口文件是否存在
        const entryFile = fileNames.find(name => fs.existsSync(path.join(this.entry, name)));
        if (!entryFile) {
            throw new Error(`Entry file not found in ${this.entry}`);
        }
        // 生成入口文件路径
        const entryPath = path.join(this.entry, entryFile);
        printLog(processTypeEnum.COMPILE, '发现入口文件', entryPath);
        this.entryFile = entryPath;
        compiler.options.entry = {
            [path.parse(this.fileName).name]: {
                import: [entryPath],
            },
        };
        // // 更改输出路径
        compiler.options.output.path = this.outputPath;
    }
}
