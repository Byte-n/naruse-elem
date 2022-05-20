const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { uglify } = require('rollup-plugin-uglify');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
    input: './component/index.js',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    plugins: [
        alias({ customResolver }),
        replace({
            __IS_ALIAPY__: true,
            __IS_H5__: false,
        }),
        uglify({
            compress: false,
        }),
    ],
};
