"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const miniPlugin_1 = __importDefault(require("./miniPlugin"));
const webpack_1 = __importDefault(require("webpack"));
const preset_env_1 = __importDefault(require("@babel/preset-env"));
const path_1 = __importDefault(require("path"));
class BaseConfig {
    constructor(config) {
        this.config = config;
        const chain = this._chain = new webpack_chain_1.default();
        chain.entry('index').add('./demo/index.js').end();
        if (config.isWatch) {
            chain.watch(true);
            chain.mode('development');
            chain.devtool('cheap-module-source-map');
        }
        else {
            chain.mode('production');
        }
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
                path: '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/demo/dist',
                chunkFormat: 'array-push',
                globalObject: 'my',
                chunkLoading: 'jsonp',
            },
            watchOptions: {
                aggregateTimeout: 200
            },
            optimization: {
                sideEffects: true,
                runtimeChunk: true,
            },
            performance: {
                maxEntrypointSize: 2 * 1000 * 1000
            }
        });
        chain.plugin('TaroMiniPlugin').use(miniPlugin_1.default, [Object.assign(Object.assign({}, config), { pages: Array.isArray(config.pageConfig.entry) ? config.pageConfig.entry : [config.pageConfig.entry] })]);
        this.setMiniExternalConfig();
        chain.plugin('ProvidePlugin').use(webpack_1.default.ProvidePlugin, [{
                Naruse: ['naruse-alipay', 'Naruse'],
            }]);
        this.setBabelLoader();
    }
    get chain() {
        return this._chain;
    }
    setMiniExternalConfig() {
        this.chain.externals((ctx, callback) => {
            const { context, request } = ctx;
            let naruseExternal = '';
            try {
                naruseExternal = (() => {
                    const { naruseExternalPath, outputPath } = this.config;
                    if (naruseExternalPath) {
                        console.log(ctx);
                        return path_1.default.relative(context, path_1.default.resolve(naruseExternalPath)) + '/lib.js';
                    }
                    if (/^Naruse$/.test(request)) {
                        // 使用 request 路径，将一个 commonjs 模块外部化
                        return 'naruse-alipay';
                    }
                    return '';
                })();
            }
            catch (error) {
                console.log(error);
            }
            console.log('naruseExternal', naruseExternal);
            if (naruseExternal) {
                return callback(null, `commonjs ${naruseExternal}`);
            }
            // 继续下一步且不外部化引用
            callback();
        });
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
                [preset_env_1.default, { modules: false }]
            ]
        });
    }
    // minimizer 配置
    setMinimizer(config) {
        if (config.mode !== 'production')
            return;
        let minimize = true;
        const minimizer = {};
        minimize = false;
        this.chain.merge({
            optimization: {
                minimize,
                minimizer
            }
        });
    }
}
exports.BaseConfig = BaseConfig;
//# sourceMappingURL=baseConfig.js.map