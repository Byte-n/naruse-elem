const { nodeResolve } = require('@rollup/plugin-node-resolve');
const externalGlobals = require('rollup-plugin-external-globals');
const css = require('../rollup-plugin-naruse/plugin/naruse-css-loader');
const inject = require('@rollup/plugin-inject');
const typescript = require('@rollup/plugin-typescript');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');

const fs = require('fs');
const path = require('path');
const version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8')).version;

const customResolver = nodeResolve({ extensions: ['.mjs', 'cjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css', '.ts', 'tsx'] });

const isDev = process.env.BUILD === 'development';

const config = {
    input: './index.ts',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    external: ['react'],
    plugins: [
        css(),
        typescript(),
        customResolver,
        commonjs(),
        externalGlobals({ react: 'React' }),
        replace({ __VERSION__: JSON.stringify(version) }),
        inject({ React: 'react' }),
    ],
};

module.exports = config;
