const { parseSync, transformSync } = require('@babel/core');
const { default: generate } = require('@babel/generator');
const { declare } = require("@babel/helper-plugin-utils");
const { clear } = require('console');
const fs = require('fs');


const noArrowFunction = declare((api) => {
    const noNewArrows = false;
    return {
        name: "transform-arrow-functions",
        visitor: {
            ArrowFunctionExpression(path) {
                if (!path.isArrowFunctionExpression()) return;
                path.arrowFunctionToExpression({
                    allowInsertArrow: false,
                    noNewArrows,
                    specCompliant: !noNewArrows,
                });
            },
        },
    };
});

/** 获取转译后的ast */
const getAst = (source) => {
    return transformSync(source, {
        ast: true,
        plugins: [
            noArrowFunction,
            [require('@babel/plugin-proposal-object-rest-spread')],
        ]
    }).ast;
}
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
}
/**
 * 处理进程
 * @param {*} source 
 * @param {*} option 
 * @returns 
 */
module.exports = function NaruseLoader(source, option) {
    const ast = getAst(source);
    dealAst(ast);
    const output = genCode(ast, option);
    // console.log(new Date().toLocaleTimeString(), '【naruse-loader】【生成完毕】');
    return clearCode(output.code);
};
const emptyFunctionDes = parseSync('function _newArrowCheck (){}').program.body[0];
const _objectSpreadDes = parseSync('const _objectSpread = Object.assign;').program.body[0];

const createBaseExport = (name, right) => {
    const baseExport = parseSync('exports.qwer = function (){}').program.body[0];
    baseExport.expression.left.property.name = name
    baseExport.expression.right.params = right.params
    baseExport.expression.right.body = right.body
    return baseExport
}

/**
 * @description B的全部属性都等于A
 * @author CHC
 * @date 2022-02-22 12:02:18
 * @param {*} A
 * @param {*} B
 * @returns {*} 
 */
const BSameA = (A, B) => {
    return Object.keys(B).every((key) => {
        if (typeof B[key] === 'object' && typeof A[key] === 'object') {
            return BSameA(A[key], B[key]);
        }
        return A[key] === B[key]
    })
}

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
        return BSameA(aa, props);
    });
    isEat && classNode && astBody.body.splice(index, 1);
    return classNode;
}

/**
 * @description 处理ast
 * @author CHC
 * @date 2022-02-21 19:02:13
 * @param {babel.ParseResult} ast
 */
function dealAst(ast) {
    dealDeaultExport(ast);
    // 处理导入
    dealImport(ast);
    // 清除profill
    clearProfill(ast);
}



function dealImport(ast) {
    const node = eatAst(ast.program, { type: 'ImportDeclaration' });
    while (node) {
        const { source, specifiers } = node;
        console.log(loadModule(source.value));
    }
}


function loadModule(path) {
    return genCode(getAst(fs.readFileSync(path, 'utf-8')));
}


/**
 * @description 处理默认导出
 * @author CHC
 * @date 2022-03-03 20:03:52
 * @param {*} ast
 */
function dealDeaultExport(ast) {
    classNode = eatAst(ast.program, { type: 'ClassDeclaration' });
    if (!classNode) {
        throw new Error('必须创建一个类！')
    }
    classNode.body.body.map((item) => {
        ast.program.body.push(createBaseExport(item.key.name, item));
    })
}

function clearProfill(ast) {
    const arrownode = eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_newArrowCheck' } });
    const node =  eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_objectSpread' } });
    eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_defineProperty' } });
    eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: 'ownKeys' } });

    arrownode && ast.program.body.unshift(emptyFunctionDes);
    node && ast.program.body.unshift(_objectSpreadDes);
}

function clearCode(code) {
    return code.replace("var __webpack_exports__={};", '')
        .replace("var __webpack_exports__ = {};", '')
        .replace(";;", ";")
        .replace(/\s;\s/g, '')
        .replace('"use strict";', '');
}