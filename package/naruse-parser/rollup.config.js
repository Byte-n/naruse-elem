// rollup.config.js
import typescript from '@rollup/plugin-typescript';
const alias = require('@rollup/plugin-alias');
const { uglify } = require('rollup-plugin-uglify');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });


export default {
    input: './index.ts',
    output: {
        dir: 'dist',
        format: 'es',
    },
    plugins: [
        typescript(),
        alias({ customResolver }),
        // uglify(),
    ],
};