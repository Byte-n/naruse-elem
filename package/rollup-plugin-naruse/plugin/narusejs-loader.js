const { parseSync, transformSync } = require('@babel/core');
const { default: generate } = require('@babel/generator');
const chalk = require('chalk');


/** 获取转译后的ast */
const getAst = (source) => {
    return transformSync(source, {
        ast: true,
        plugins: [
            [require('@babel/plugin-proposal-object-rest-spread')],
            [require('@babel/plugin-transform-shorthand-properties')],
            [require('@babel/plugin-transform-destructuring')],
            [require('babel-plugin-transform-es2015-arrow-functions')],
            [require('@babel/plugin-transform-parameters')],
            [require('@babel/plugin-transform-template-literals')],
            [require('babel-plugin-transform-class')],
            [require('@babel/plugin-proposal-class-properties')],
        ],
    }).ast;
};
/** 生成代码 */
const genCode = (ast, option) => {
    return generate(ast, {
        jsescOption: {
            minimal: true,
            quotes: 'single',
        },
        comments: false,
        minified: !!option.minified,
    });
};
/**
 * 处理进程
 * @param {*} source
 * @param {*} option
 * @returns
 */
module.exports = function NaruseLoader (source, option) {
    const ast = getAst(source);
    dealAst(ast);
    const output = genCode(ast, option);
    // console.log(new Date().toLocaleTimeString(), '【naruse-loader】【生成完毕】');
    return clearCode(output.code);
};
const emptyFunctionDes = parseSync('function _newArrowCheck (){}').program.body[0];
const _objectSpreadDes = parseSync('const _objectSpread = Object.assign;').program.body[0];

/**
 * @description 创建一个基础export
 * @author CHC
 * @date 2022-03-14 17:03:57
 * @param {*} name
 * @param {*} right
 * @returns {*}
 */
const createBaseExport = (name, right) => {
    const baseExport = parseSync('exports.qwer = 123').program.body[0];
    baseExport.expression.left.property.name = name;
    baseExport.expression.right = right;
    return baseExport;
};

/**
 * @description 判断B的全部属性都等于A
 * @author CHC
 * @date 2022-02-22 12:02:18
 * @param {*} objA
 * @param {*} objB
 * @returns {*}
 */
const bSameA = (objA, objB) => {
    return Object.keys(objB).every((key) => {
        if (typeof objB[key] === 'object' && typeof objA[key] === 'object') {
            return bSameA(objA[key], objB[key]);
        }
        return objA[key] === objB[key];
    });
};

/**
 * @description 找到某个astbody下的ast并移除它
 * @author CHC
 * @date 2022-02-22 09:02:23
 * @param {*} astBody
 * @param {*} type
 * @returns {*}
 */
const eatAst = (astBody, props, isEat = true) => {
    let index = -1;
    const classNode = astBody.body.find((aa, _index) => {
        index = _index;
        return bSameA(aa, props);
    });
    isEat && classNode && astBody.body.splice(index, 1);
    return classNode;
};

/**
 * @description 处理ast
 * @author CHC
 * @date 2022-02-21 19:02:13
 * @param {babel.ParseResult} ast
 */
const dealAst = function dealAst (ast) {
    dealDeaultExport(ast);
    clearExport(ast);
    // 清除profill
    clearProfill(ast);
};

/**
 * @description 处理默认导出
 * @author CHC
 * @date 2022-03-03 20:03:52
 * @param {*} ast
 */
const dealDeaultExport = function dealDeaultExport (ast) {
    const classNode = eatAst(ast.program, { type: 'ExportNamedDeclaration' });
    if (!classNode) {
        console.log(chalk.red('【naruse-loader】检测到没有任何导出，请检查代码'));
        return;
    }
    if (!classNode.specifiers) {
        console.log(chalk.red('【naruse-loader】检测到没有导出默认导出组件，页面将不会有任何渲染，请检查代码'));
        return;
    }
    classNode.specifiers.forEach(element => {
        ast.program.body.push(createBaseExport(element.exported.name, element.local));
    });
};

/**
 * @description 清除代理韩束
 * @author CHC
 * @date 2022-03-14 17:03:42
 * @param {*} ast
 */
const clearProfill = function clearProfill (ast) {
    const arrownode = eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_newArrowCheck' } });
    const node =  eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_objectSpread' } });
    eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_defineProperty' } });
    eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: 'ownKeys' } });
    arrownode && ast.program.body.unshift(emptyFunctionDes);
    node && ast.program.body.unshift(_objectSpreadDes);
};

/**
 * @description 清理函数
 * @author CHC
 * @date 2022-03-14 17:03:48
 * @param {*} code
 * @returns {*}
 */
const clearCode = function clearCode (code) {
    return code.replace('var __webpack_exports__={};', '')
        .replace('var __webpack_exports__ = {};', '')
        .replace(';;', ';')
        .replace(/\s;\s/g, '')
        .replace('"use strict";', '');
};

/**
 * @description 清除导出函数
 * @author CHC
 * @date 2022-03-14 17:03:28
 * @param {*} ast
 */
const clearExport = function clearExport (ast) {
    eatAst(ast.program, { type: 'ExportNamedDeclaration' });
};
