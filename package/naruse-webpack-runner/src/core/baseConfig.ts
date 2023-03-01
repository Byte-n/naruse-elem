
import Chain from 'webpack-chain'
import NaruseMiniPlugin from './miniPlugin';
import path from 'path';
import { NaruseWebpackRunnerOptions } from '../types/options';


export class BaseConfig {

    private readonly config: NaruseWebpackRunnerOptions;
    private readonly _chain: Chain

    constructor(config: NaruseWebpackRunnerOptions) {
        this.config = config;
        const chain = this._chain = new Chain()

        // 开发模式
        if (config.isWatch) {
            chain.mode('development');
            chain.devtool(false);
        } else {
            chain.mode('production');
        }

        this.setBaseConfig();
        this.setMiniExternalConfig();
        this.setBabelLoader();
        this.setMinimizer();


        if (config.compilerType === 'pages') {
            chain.plugin('NaruseMiniPlugin').use(NaruseMiniPlugin, [config])
        }

        if (config.compilerType === 'components') {
            chain.plugin('NaruseMiniPlugin').use(NaruseMiniPlugin, [config])
        }
    }



    /**
     * 基础设置
     */
    setBaseConfig() {
        const { chain, config } = this;
        // 基础配置
        chain.merge({
            target: ['es5'],
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
                symlinks: true,
                fallback: {
                    fs: false,
                    path: false
                }
            },
            resolveLoader: {
                modules: ['node_modules']
            },
            output: {
                chunkLoadingGlobal: 'webpackJsonp',
                path: config.outputPath,
                chunkFormat: 'array-push',
                globalObject: 'my',
                chunkLoading: 'jsonp',
            },
            watchOptions: {
                aggregateTimeout: 200
            },
            optimization: {
                sideEffects: true,
                usedExports: true,
                runtimeChunk: {
                    name: 'runtime'
                },
            }
        })
    }

    /**
     * 设置 ExternalConfig
     */
    setMiniExternalConfig() {
        this.chain.externals((ctx, callback) => {
            const { context, request } = ctx;
            let naruseExternal = '';
            try {
                naruseExternal = (() => {
                    const { naruseExternal, outputPath, sourceDir } = this.config;
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
                        return 'naruse-alipay';
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

    setBabelLoader() {
        this.chain.module
            .rule('compile')
            .exclude
            .add(/node_modules/)
            .add(/^Naruse*/)
            .add(/^naruse-*/)
            .end()
            .test(/\.js$/)
            .use('babel')
            .loader('babel-loader')
            .options({
                presets: [
                    [
                        "@babel/preset-env",
                    ]
                ],
                plugins: [
                    [
                        "@babel/plugin-transform-react-jsx",
                        {
                            pragma: "Naruse.h",
                            pragmaFrag: "Naruse.Fragment"
                        }
                    ]
                ]
            });
    }


    // minimizer 配置
    setMinimizer() {
        const { config } = this;
        if (config.mode !== 'production') return
        let minimize = true
        const minimizer: Record<string, any> = {}
        minimize = false
        this.chain.merge({
            optimization: {
                minimize,
                minimizer,
            }
        })

        this.chain.merge({
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 0,
                    cacheGroups: {
                        default: false,
                        defaultVendors: false,
                        common: {
                            name: `common`,
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
