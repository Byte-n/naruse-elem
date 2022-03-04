const path = require('path');
const NaruseWebpackPlugin = require('./package/naruse-webpack-loader/naruse--webpack-plugin');

const entry = './template/test.js';

module.exports = {
    entry,
    mode: 'production',
    output: {
        path: path.resolve(__dirname, `./dist/`),
        filename: `index.js`,
        iife: false,
    },
    optimization: {
        usedExports: true,
        sideEffects: false,
        minimize: false,
    },
    watch: true,
    stats: 'errors-only',
    module: {
        noParse: /exports/,
        rules: [{
            test: /\.js|jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        [require('babel-plugin-transform-react-jsx'), {
                            "pragma": "h"
                        }],
                        [require('@babel/plugin-transform-destructuring')],
                    ]
                }
            },
            parser: {
                amd: false,
                commonjs: false,
                system: false,
                harmony: false,
                requireInclude: false,
                requireEnsure: false,
                requireContext: false,
                browserify: false,
                requireJs: false,
                node: true,
            }
        }]
    },
    plugins: [
        new NaruseWebpackPlugin()
    ]
}