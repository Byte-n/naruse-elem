const narusePlugin = require('./package/rollup-plugin-naruse/plugin/rollup-plugin-naruse');
const { babel } = require('@rollup/plugin-babel');
const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const path = require('path');
const config = require('./demo/demo-alipay/naruse.config');
const externalGlobals = require('rollup-plugin-external-globals');


const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', 'css'] });
const projectRootDir = path.resolve(__dirname);
const skipCode = ['FILE_NAME_CONFLICT'];


module.exports = {
    input: config.input || './src/adverts/test.js',
    output: [
        {
            file: './demo/demo-alipay/naruse.dev.debug.js',
            format: 'es',
        },
        {
            file: './dist/naruse.dev.debug.js',
            format: 'es',
        }
    ],
    /** 清除警告 */
    onwarn: (message, hander) => !skipCode.includes(message.code) && hander(message),
    plugins: [
        babel({
            babelHelpers: 'bundled',
            plugins: [
                [require('babel-plugin-transform-react-jsx'), { pragma: 'h' }],
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
        externalGlobals({ Naruse: 'Naruse' }),
    ],
};
