const { parseSync, transformSync } = require('@babel/core');
const { default: generate } = require('@babel/generator');
const { declare } = require("@babel/helper-plugin-utils");


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


module.exports = function loader(source) {
    const { ast } = transformSync(source, {
        ast: true,
        plugins: [
            noArrowFunction,
            [require('babel-plugin-transform-react-jsx'), {
                "pragma": "h"
            }],
            [require('@babel/plugin-transform-destructuring')]
        ]
    });
    dealAst(ast);
    const output = generate(ast, {
        jsescOption: {
            minimal: true,
            json: false,
            quotes: 'single',
        },
        comments: false,
    });
    console.log(new Date().toLocaleTimeString(), '【naruse-loader】【生成完毕】');
    return `export default \`${output.code}\``;
};
const emptyFunctionDes = parseSync('function _newArrowCheck (){}').program.body[0];

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
    // 确认默认导出
    const exportNode = eatAst(ast.program, { type: 'ExportDefaultDeclaration' });
    if (!exportNode) {
        throw new Error('自定义模版需要一个默认导出')
    }
    const exportDefault = exportNode.declaration;
    let classNode;
    if (exportDefault.type === 'Identifier') {
        classNode = eatAst(ast.program, { type: 'ClassDeclaration', id: { name: exportDefault.name } });
        if (!classNode) {
            throw new Error('默认导出必须是一个类')
        }
    }
    if (exportDefault.type === 'ClassDeclaration') {
        classNode = exportDefault;
    }
    classNode.body.body.map((item) => {
        ast.program.body.push(createBaseExport(item.key.name, item));
    })

    // 清楚profill
    eatAst(ast.program, { type: 'FunctionDeclaration', id: { name: '_newArrowCheck' } });
    ast.program.body.unshift(emptyFunctionDes);
}