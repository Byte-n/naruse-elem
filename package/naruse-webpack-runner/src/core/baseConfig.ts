import { NaruseWebpackRunnerOptions } from 'src';
import Chain from 'webpack-chain'
import TaroMiniPlugin from './miniPlugin';
import webpack from 'webpack';
import babelLoader from 'babel-loader';
import preset from '@babel/preset-env';
import path from 'path';


export class BaseConfig {

  private readonly config: NaruseWebpackRunnerOptions;
  private readonly _chain: Chain

  constructor(config: NaruseWebpackRunnerOptions) {
    this.config = config;
    const chain = this._chain = new Chain()
    chain.entry('index').add('./demo/index.js').end()

    if (config.isWatch) {
      chain.watch(true)
      chain.mode('development');
      chain.devtool('cheap-module-source-map');
    } else {
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
    })
    chain.plugin('TaroMiniPlugin').use(TaroMiniPlugin, [{
      ...config,
      pages: Array.isArray(config.pageConfig.entry) ? config.pageConfig.entry : [config.pageConfig.entry],
    }])

    this.setMiniExternalConfig();

    chain.plugin('ProvidePlugin').use(webpack.ProvidePlugin, [{
      Naruse: ['naruse-alipay', 'Naruse'],
    }])

    this.setBabelLoader();

  }

  get chain() {
    return this._chain
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
            return path.relative(context, path.resolve(naruseExternalPath)) + '/lib.js';
          }
          if (/^Naruse$/.test(request)) {
            // 使用 request 路径，将一个 commonjs 模块外部化
            return 'naruse-alipay';
          }
          return '';
        })();
      } catch (error) {
        console.log(error);
      }

      console.log('naruseExternal', naruseExternal);


      if (naruseExternal) {
        return callback(null, `commonjs ${naruseExternal}`);
      }

      // 继续下一步且不外部化引用
      callback();
    })
  }

  protected setBabelLoader() {
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
        [preset, { modules: false }]
      ]
    });
  }


  // minimizer 配置
  protected setMinimizer(config: NaruseWebpackRunnerOptions) {
    if (config.mode !== 'production') return

    let minimize = true
    const minimizer: Record<string, any> = {}

    minimize = false

    this.chain.merge({
      optimization: {
        minimize,
        minimizer
      }
    })
  }
}
