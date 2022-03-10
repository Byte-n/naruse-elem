const path = require('path');
const NaruseWebpackPlugin = require('./package/naruse-webpack-loader/naruse-webpack-plugin');

const entry = './src/adverts/test.js';

module.exports = {
    entry,
    mode: 'production',
    output: {
        path: path.resolve(__dirname, `./dist/`),
        filename: 'naruse.dev.debug.js',
        iife: false,
    },
    optimization: {
        usedExports: true,
        sideEffects: false,
        minimize: false,
    },
    watch: true,
    stats: 'errors-only',
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src/'),
            "@utils": path.resolve(__dirname, 'src/utils/'),
            "@components": path.resolve(__dirname, 'src/components/'),
            "@adverts": path.resolve(__dirname, 'src/adverts/'),
        },
    },
    module: {
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