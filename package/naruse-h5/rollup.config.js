const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const externalGlobals = require('rollup-plugin-external-globals');
const replace = require('@rollup/plugin-replace');
const { babel } = require('@rollup/plugin-babel');
const css = require('../rollup-plugin-naruse/plugin/naruse-css-loader');
const { uglify } = require('rollup-plugin-uglify');
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
        // babel({
        //     babelHelpers: 'bundled',
        //     plugins: [
        //         [require('babel-plugin-transform-react-jsx')],
        //     ],
        // }),
        alias({ customResolver }),
        externalGlobals({ react: 'React' }),
        typescript(),
        css(),
    ],
};

if (!isDev) {
    // config.plugins.push(externalGlobals({ react: 'React' }));
    // config.plugins.push(uglify({ mangle: {  toplevel: true}, compress: { toplevel: true } }));
} else {
    config.plugins.push(inject({ React: 'react' }));
}

module.exports = config;
