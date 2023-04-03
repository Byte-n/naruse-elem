
import Chain from 'webpack-chain'
import NaruseMiniPlugin from './miniPlugin';
import path from 'path';
import { NaruseWebpackRunnerOptions } from '../types/options';
import SingleHotComponentPlugin from './singleHotComponentPlugin';
import webpackBar from 'webpackbar';
import formatMessages from 'webpack-format-messages'
import { baseExts } from '../utils';
import { Stats } from 'webpack';
import { chalk } from '@tarojs/helper';

export class BaseConfig {

    private readonly config: NaruseWebpackRunnerOptions;
    private readonly _chain: Chain

    constructor(config: NaruseWebpackRunnerOptions) {
        this.config = config;
        const chain = this._chain = new Chain()

        chain.devtool(false);
        chain.mode(config.mode);
        this.setBaseConfig();
        this.setNaruseExternalConfig();
        this.setWebpackBar();

        if (config.compilerType === 'pages') {
            this.setAppOutputConfig();
            this.setSwcLoader();
            chain.plugin('NaruseMiniPlugin').use(NaruseMiniPlugin, [config])
        }

        if (config.compilerType === 'components') {
            this.setAppOutputConfig();
            this.setSwcLoader();
            chain.plugin('NaruseMiniPlugin').use(NaruseMiniPlugin, [config])
        }

        // 专门针对单文件热更新的插件
        if (config.compilerType === 'singleHotComponent') {
            this.setSwcLoader();
            this.initSingleHotComponentPlugin();
        }

        // 外部扩展
        if (config.webpackChain) {
            config.webpackChain(chain, config);
        }
    }

    /**
     * @description 设置进度条
     * @author CHC
     * @date 2023-03-31 16:03:52
     */
    setWebpackBar() {
        const { chain, config } = this;
        chain.plugin('webpackbar').use(webpackBar, [{
            name: 'Naruse',
            reporters: [
                'fancy',
                [{
                    done(_context, { stats }: { stats: Stats }) {
                        const { warnings, errors } = formatMessages(stats)

                        if (stats.hasWarnings()) {
                            console.log(chalk.bgKeyword('orange')('⚠️ Warinings: \n'))
                            warnings.forEach(w => console.log(w + '\n'))
                        }

                        if (stats.hasErrors()) {
                            console.log(chalk.bgRed('✖ Errors: \n'))
                            errors.forEach(e => console.log(e + '\n'))
                            !config.isWatch && process.exit(1)
                        }

                        if (config.isWatch) {
                            console.log(chalk.gray(`→ Watching... [${new Date().toLocaleString()}]\n`))
                        }

                    }
                }]
            ]
        }])
    }


    /**
     * @description 初始化单文件热更新配置项
     * @author CHC
     * @date 2023-03-29 16:03:10
     */
    initSingleHotComponentPlugin() {
        const { config } = this;
        if (config.compilerType !== 'singleHotComponent') return;
        // 设置输出配置
        this.chain.merge({
            output: {
                library: {
                    name: '$outer',
                    type: 'assign',
                },
                chunkFormat: 'array-push',
                // 挂载在一个需要主动生成的全局变量上，每次 NaruseRun 都会生成一个全新的 webpackJsonp 来进行环境隔离
                globalObject: '$webpack',
                chunkLoading: 'jsonp',
                chunkLoadingGlobal: 'wpLs',
                path: config.outputPath,
                // 不需要用 iife 包裹
                iife: false,
            }
        })
        // this.chain.optimization.minimize(true);
        this.chain.plugin('SingleHotComponentPlugin').use(SingleHotComponentPlugin, [{
            entry: config.sourceDir,
            outputPath: config.outputPath,
            isExportDefaultString: config.isExportDefaultString,
        }])

        // 使用自定义的 loader
        this.chain.module
            .rule('css')
            .test(/\.css$/)
            .use('css2obj-loader')
            .loader(path.resolve(__dirname, '../loaders/css2ObjectLoader.js'))
    }

    /**
     * 通用基础配置
     */
    setBaseConfig() {
        const { chain, config } = this;
        // 基础配置
        chain.merge({
            target: ['es5'],
            resolve: {
                extensions: baseExts,
                symlinks: true,
                fallback: {
                    fs: false,
                    path: false
                }
            },
            resolveLoader: {
                modules: ['node_modules']
            },
            watchOptions: {
                aggregateTimeout: 200
            },
            optimization: {
                sideEffects: true,
                usedExports: true,
            }
        })
    }

    /**
     * @description 设置 app 相关的输出配置
     * @author CHC
     * @date 2023-03-29 16:03:42
     */
    setAppOutputConfig() {
        this.chain.merge({
            output: {
                chunkLoadingGlobal: 'webpackJsonp',
                path: this.config.outputPath,
                chunkFormat: 'array-push',
                globalObject: 'my',
                chunkLoading: 'jsonp',
            },
        })
    }

    /**
     * @description 重定位引用 Naruse 的外部依赖地址
     * @author CHC
     * @date 2023-03-29 14:03:21
     */
    setNaruseExternalConfig() {
        // 不存在则默认不转换，由外部提供 Naruse
        if (this.config.naruseExternal === false) {
            // 设置 Naruse 为外部依赖
            this.chain.externals({
                Naruse: 'Naruse'
            });
            return;
        }
        this.chain.externals((ctx, callback) => {
            const { context, request } = ctx;
            let naruseExternal = '';
            try {
                naruseExternal = (() => {
                    const { naruseExternal, outputPath, sourceDir } = this.config;
                    if (naruseExternal === false) {
                        return '';
                    }
                    // 获取外置依赖的路径
                    const [naruseExternalPath, fileName] = typeof naruseExternal === 'string' ? [naruseExternal, 'lib.js'] : [naruseExternal.path, naruseExternal.libName || 'lib.js'];
                    if (/^Naruse$/.test(request)) {
                        // 先获取源码内的相对路径
                        const emitRelativePath = path.relative(sourceDir, context);
                        // 生成的绝对路径
                        const emitedPath = path.resolve(outputPath, `./${emitRelativePath}`);
                        // 算出要引用的相对路径
                        const libPath = path.relative(emitedPath, naruseExternalPath);
                        if (naruseExternalPath) {
                            return path.join(libPath, fileName);
                        }
                        // 使用 request 路径，将一个 commonjs 模块外部化
                        return 'Naruse';
                    }
                    return '';
                })();
            } catch (error) {
                console.log(error);
            }
            if (naruseExternal) {
                return callback(null, `commonjs ${naruseExternal}`);
            }
            callback();
        })
    }
    /**
     * @description 设置 swc-loader
     * @author CHC
     * @date 2023-03-29 14:03:27
     */
    setSwcLoader() {
        this.chain.module.rule('compile')
            .exclude
            .add(/node_modules/)
            .add(/^Naruse*/)
            .add(/^naruse-*/)
            .end()
            .test(/\.(js|jsx|ts|tsx)$/)
            .use('swc-loader')
            .loader('swc-loader')
            .options({
                "jsc": {
                    "parser": {
                        "syntax": "typescript",
                        "tsx": true
                    },
                    "target": "es5",
                    "loose": false,
                    "minify": {
                        "compress": false,
                        "mangle": false
                    },
                    "transform": {
                        "react": {
                            "pragma": "Naruse.createElement",
                            "pragmaFrag": "Naruse.Fragment",
                            "development": false,
                        }
                    }
                },
                "module": {
                    "type": "es6"
                },
                "minify": false,
                "isModule": true
            });
    }

    /**
     * @description 设置 ts-loader
     * @author CHC
     * @date 2023-03-30 13:03:13
     */
    setTsLoader() {
        this.chain.module.rule('compile')
            .test(/\.(ts|tsx)$/)
            .use('ts-loader')
            .loader('ts-loader')

    }
    /**
     * @description 针对 page 与 commponent 等编译为项目类型的配置项
     * @author CHC
     * @date 2023-03-29 14:03:38
     */
    setAppMinimizer() {
        this.chain.merge({
            optimization: {
                // app 模式下需要把 runtime 抽离出来作为一个单独的文件
                runtimeChunk: {
                    name: 'runtime'
                },
                // 拆分公共包
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 0,
                    cacheGroups: {
                        default: false,
                        defaultVendors: false,
                        common: {
                            name: 'common',
                            minChunks: 2,
                            priority: 1
                        },
                        vendors: {
                            name: `vendors`,
                            minChunks: 2,
                            test: module => /[\\/]node_modules[\\/]/.test(module.resource),
                            priority: 10
                        },
                    }
                }
            },
        })
    }


    get chain() {
        return this._chain
    }
}
