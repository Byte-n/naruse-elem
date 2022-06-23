const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { uglify } = require('rollup-plugin-uglify');
const babel = require('rollup-plugin-babel');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
    input: './core/index.js',
    output: {
        file: './build/lib.js',
        format: 'es',
    },
    plugins: [
        alias({ customResolver }),
        replace({
            __IS_ALIAPY__: true,
            __IS_H5__: false,
        }),
        babel({ exclude: 'node_modules/**' }),
        // uglify({ compress: false }),
    ],
};
