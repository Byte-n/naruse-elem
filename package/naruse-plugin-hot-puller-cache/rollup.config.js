import babel from '@rollup/plugin-babel';

const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');
import dts from 'rollup-plugin-dts';

const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');
import resolve from '@rollup/plugin-node-resolve';

const fs = require('fs');
const path = require('path');
const version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8')).version;

const customResolver = nodeResolve({ extensions: ['.mjs', 'cjs', '.js', '.json', '.ts'] });

const plugins = [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    typescript({ tsconfig: 'tsconfig.json' }),
    customResolver,
    commonjs(),
    replace({
        __VERSION__: JSON.stringify(version),
        'fs-aw/miniapp': 'fs-aw/miniapp',
    }),
];

const tsConfig = [
    {
        input: './src/index.ts',
        output: {
            file: './dist/index.alipay.js',
            format: 'es',
        },
        plugins: plugins,
    },
    {
        input: './src/index.ts',
        output: {
            file: './dist/index.h5.js',
            format: 'es',
        },
        plugins: plugins,
    },
];

const dtsConfig = [
    {
        input: '.\\dist\\package\\naruse-plugin-hot-puller-cache\\src\\index.d.ts',
        output: {
            file: './dist/index.d.ts',
            format: 'es',
        },
        plugins: [dts(), resolve()],
    },
];
console.log('process.env.TYPE:', process.env.TYPE, process.env.BUILD);
module.exports = process.env.TYPE === 'dts' ? dtsConfig : tsConfig;