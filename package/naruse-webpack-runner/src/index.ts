import webpack, { Stats } from 'webpack';
import { BaseConfig } from './core/baseConfig';
import { NaruseTemplate } from './core/template';
import { NaruseWebpackRunnerOptions } from './types/options';




const defaultConfig: Partial<NaruseWebpackRunnerOptions> = {
    mode: 'production',
    isWatch: false,
    template: new NaruseTemplate(),
}

export default async function build(options: NaruseWebpackRunnerOptions): Promise<Stats> {
    const config = Object.assign({}, defaultConfig, options);
    return new Promise<Stats>((resolve, reject) => {
        const baseConfig = new BaseConfig(config);
        const webpackConfig: any = baseConfig.chain.toConfig();;

        const callback = async (err: Error, stats: Stats) => {
            if (err || stats.hasErrors()) {
                const error = err ?? stats.toJson().errors
                return reject(error)
            }
            resolve(stats)
        }

        const compiler = webpack(webpackConfig);

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
    compilerType: 'pages',
    outputPath: '/Users/hashiro/MiniProjects/blank/demo/demo-alipay/pages/',
    pages: ['/index/index', '/cc/index'],
    sourceDir: '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/demo/pages/',
    isWatch: true,
    naruseExternal: '/Users/hashiro/MiniProjects/blank/demo/demo-alipay/naruse-alipay',
}).catch(err => {
    console.error(err);
})
