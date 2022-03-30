const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const css = require('../rollup-plugin-naruse/plugin/naruse-css-loader');
const { uglify } = require('rollup-plugin-uglify');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });


module.exports = {
    input: './index.js',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    plugins: [
        replace({
            __IS_ALIAPY__: false,
            __IS_H5__: true,
            __IS_WEEX__: false,
        }),
        alias({ customResolver }),
        css(),
        uglify(),
    ],
};
