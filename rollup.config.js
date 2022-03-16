const narusePlugin = require('./package/rollup-plugin-naruse/plugin/rollup-plugin-naruse');
const { babel } = require('@rollup/plugin-babel');
const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const path = require('path');
const config = require('./naruse.config');


const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss'] });
const projectRootDir = path.resolve(__dirname);
const skipCode = ['FILE_NAME_CONFLICT'];


module.exports = {
    input: config.input || './src/adverts/test.js',
    output: {
        file: './dist/naruse.dev.debug.js',
        format: 'es',
    },
    /** 清除警告 */
    onwarn: (message, hander) => !skipCode.includes(message.code) && hander(message),
    plugins: [
        babel({
            babelHelpers: 'bundled',
            plugins: [
                [require('babel-plugin-transform-react-jsx'), { pragma: 'h' }],
                [require('@babel/plugin-transform-destructuring')],
                [require('babel-plugin-transform-es2015-arrow-functions')],
                [require('@babel/plugin-transform-parameters')],
            ],
        }),
        alias({
            entries: [
                { find: '@', replacement: path.resolve(projectRootDir, './src') },
                { find: '@utils', replacement: path.resolve(projectRootDir, './src/utils') },
                { find: '@components', replacement: path.resolve(projectRootDir, './src/components') },
                { find: '@adverts', replacement: path.resolve(projectRootDir, './src/adverts') },
            ],
            customResolver,
        }),
        narusePlugin({ advertUserDefine: config.advertUserDefine, dropConsole: config.dropConsole }),
    ],
};
