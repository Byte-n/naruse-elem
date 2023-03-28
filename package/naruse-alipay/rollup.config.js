const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const replace = require('@rollup/plugin-replace');
const commonjs = require('@rollup/plugin-commonjs');


const typescript = require('@rollup/plugin-typescript');
const fs = require('fs');
const path = require('path');
const version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8')).version;
const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });
const { main: genTemplate } = require('./axml/index');
import babel from 'rollup-plugin-babel'

// 生成对应模版文件
genTemplate(path.join(__dirname, './build/'));
// demo 也生成一份
genTemplate(path.join(__dirname, '../../demo/demo-alipay/naruse-alipay'));
/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
    input: './core/index.ts',
    output: [
        {
            file: './build/lib.js',
            format: 'es',
        },
        {
            file: '../../demo/demo-alipay/naruse-alipay/lib.js',
            format: 'es',
        }
    ],
    plugins: [
        customResolver,
        commonjs(),
        typescript(),
        replace({
            __IS_ALIAPY__: true,
            __IS_H5__: false,
            __VERSION__: JSON.stringify(version),
        }),
        babel({
            extensions: ['.js', '.ts'],
            presets: [
                // 解决 rollup 不支持的 部分 ts 语法
                '@babel/preset-typescript'
            ]
        })
        // uglify({ mangle: {  toplevel: true}, compress: { toplevel: true } })
    ],
};
