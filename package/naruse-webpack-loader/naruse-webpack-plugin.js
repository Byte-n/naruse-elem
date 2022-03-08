const { Compilation } = require('webpack');
const narusejsLoader = require('./narusejs-loader');
const ConcatSource = require('webpack-sources').ConcatSource;
const chalk = require('chalk');
const readline = require('readline');
const uglifyJs = require('uglify-js');
const pluginName = 'NaruseWebpackPlugin';
const compressOption = {
    unused: true,
    toplevel: true,
    unsafe_undefined: true,
    typeofs: false,
}
const clearConsole = () => {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}

const clearViod = (string) => {
    return string.replace(/void 0/g, 'undefined');
}

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
                clearConsole();
                const code = compilation.assets['index.js'].source();
                const compiledCode = narusejsLoader(code, { minified: false });
                const reBuildCode = uglifyJs.minify(compiledCode, {
                    compress: compressOption,
                    output: {
                        beautify: true,
                    }
                });
                assets['index.js'] = new ConcatSource(`export default \`${clearViod(reBuildCode.code)}\``);
                const minifiedCode = uglifyJs.minify(compiledCode, {
                    compress: compressOption,
                }).code;
                assets['dist.js'] = new ConcatSource(minifiedCode);
                console.log(chalk.green(new Date().toLocaleTimeString(), '【naruse-plugin】【生成完毕】'));
                Object.entries(assets).forEach(([pathname, source]) => {
                    console.log(chalk.gray(`— ${pathname}: ${source.size()} bytes`));
                });
            }
        );
    })

}
module.exports = NaruseWebpackPlugin;