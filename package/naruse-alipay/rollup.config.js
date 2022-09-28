const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const { uglify } = require('rollup-plugin-uglify');
const typescript = require('@rollup/plugin-typescript');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
    input: './core/index.ts',
    output: {
        file: './build/lib.js',
        format: 'es',
    },
    plugins: [
        alias({ customResolver }),
        typescript(),
        replace({
            __IS_ALIAPY__: true,
            __IS_H5__: false,
        }),
        // uglify({ mangle: {  toplevel: true}, compress: { toplevel: true } })
    ],
};
