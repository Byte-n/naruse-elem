const { Compilation } = require('webpack');
const narusejsLoader = require('./narusejs-loader');
const ConcatSource = require('webpack-sources').ConcatSource;
const pluginName = 'NaruseWebpackPlugin';



function NaruseWebpackPlugin(options) {
    this.options = options
}
NaruseWebpackPlugin.prototype.apply = function (compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
        compilation.hooks.processAssets.tap(
            {
                name: pluginName,
                stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS, // see below for more stages
            },
            (assets) => {
                const code = compilation.assets['index.js'].source();
                assets['index.js'] = new ConcatSource(narusejsLoader(code, { minified: false }))
                assets['dist.js'] = new ConcatSource(narusejsLoader(code, { minified: true }))
                console.log(new Date().toLocaleTimeString(), '【naruse-plugin】【生成完毕】');
                Object.entries(assets).forEach(([pathname, source]) => {
                    console.log(`— ${pathname}: ${source.size()} bytes`);
                });
            }
        );

    })
}
module.exports = NaruseWebpackPlugin;