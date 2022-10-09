const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');

const typescript = require('@rollup/plugin-typescript');
const fs = require('fs');
const path = require('path');
const version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8')).version;
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
            __VERSION__: JSON.stringify(version),
        }),
        // uglify({ mangle: {  toplevel: true}, compress: { toplevel: true } })
    ],
};
