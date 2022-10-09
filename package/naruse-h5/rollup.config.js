const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const externalGlobals = require('rollup-plugin-external-globals');
const css = require('../rollup-plugin-naruse/plugin/naruse-css-loader');
const inject = require('@rollup/plugin-inject');
const typescript = require('@rollup/plugin-typescript');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

const isDev = process.env.BUILD === 'development';

const config = {
    input: './index.ts',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    external: [ 'react' ],
    plugins: [
        alias({ customResolver }),
        externalGlobals({ react: 'React' }),
        inject({ React: 'react' }),
        typescript(),
        css(),
    ],
};

module.exports = config;
