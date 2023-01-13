import webpack, { Stats } from 'webpack';
import { BaseConfig } from './core/baseConfig';
import { NaruseTemplate } from './core/template';


export interface NaruseWebpackRunnerOptions {
    // 编译方式
    compilerType?: 'app' | 'pages' | 'component';
    // 输出路径
    outputPath: string;
    // 编译模式
    mode?: 'production' | 'development' | 'none';
    // 是否监听文件变化
    isWatch?: boolean;
    // page模式的配置项
    pageConfig?: {
        // 页面入口文件
        entry: string | string[];
    };
    template?: NaruseTemplate;
    sourceDir: string;
    // naurse 外部源地址
    naruseExternalPath?: string;
}

const defaultConfig = {
    mode: 'production',
    isWatch: false,
    compilerType: 'pages',
}

export default async function build(options: NaruseWebpackRunnerOptions): Promise<Stats> {
    const config = Object.assign({}, defaultConfig, options);
    return new Promise<Stats>((resolve, reject) => {
        const baseConfig = new BaseConfig(config);
        const webpackConfig = baseConfig.chain.toConfig();;
        const compiler = webpack(webpackConfig);

        const callback = async (err: Error, stats: Stats) => {
            if (err || stats.hasErrors()) {
                const error = err ?? stats.toJson().errors
                return reject(error)
            }
            resolve(stats)
        }

        if (config.isWatch) {
            compiler.watch({
                aggregateTimeout: 300,
                poll: undefined
            }, callback)
        } else {
            compiler.run((err: Error, stats: Stats) => {
                compiler.close(err2 => callback(err || err2, stats))
            })
        }
    })
}



build({
    outputPath: './demo/dist',
    pageConfig: {
        entry: 'index.js',
    },
    sourceDir: '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/demo',
    isWatch: true,
    template: new NaruseTemplate(),
    naruseExternalPath: '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/demo',
}).catch(err => {
    console.error(err);
})