const path = require('path');
const NaruseWebpackPlugin = require('./package/naruse-webpack-loader/naruse-webpack-plugin');

const entry = './template/index.js';

module.exports = {
    entry,
    mode: 'production',
    output: {
        path: path.resolve(__dirname, `./dist/`),
        filename: 'index.js',
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
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        [require('babel-plugin-transform-react-jsx'), {
                            "pragma": "h"
                        }],
                        [require('@babel/plugin-transform-destructuring')],
                        [require('babel-plugin-transform-es2015-arrow-functions')]
                    ]
                }
            },
        }]
    },
    plugins: [
        new NaruseWebpackPlugin()
    ]
}