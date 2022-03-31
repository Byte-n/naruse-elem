const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const externalGlobals = require('rollup-plugin-external-globals');
const replace = require('@rollup/plugin-replace');
const { babel } = require('@rollup/plugin-babel');
const css = require('../rollup-plugin-naruse/plugin/naruse-css-loader');
const { uglify } = require('rollup-plugin-uglify');
const inject = require('@rollup/plugin-inject');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

const isDev = process.env.BUILD === 'development';

const config = {
    input: './index.js',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    plugins: [
        babel({
            babelHelpers: 'bundled',
            plugins: [
                [require('babel-plugin-transform-react-jsx')],
            ],
        }),
        replace({
            __IS_ALIAPY__: false,
            __IS_H5__: true,
            __IS_WEEX__: false,
        }),
        alias({ customResolver }),
        css(),
    ],
};

if (!isDev) {
    config.plugins.push(externalGlobals({ react: 'React' }));
    config.plugins.push(uglify());
} else {
    config.plugins.push(inject({ React: 'react' }));
}

module.exports = config;
