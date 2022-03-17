const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const externalGlobals = require('rollup-plugin-external-globals');
const { babel } = require('@rollup/plugin-babel');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss'] });


module.exports = {
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
        alias({ customResolver }),
        externalGlobals({ react: 'React' }),
    ],
};
