
module.exports = function () {
    const visitor = unsupportList.map(item => {
        return {
            [item.name]: () => {
                throw new Error(`${item.desc} 暂不支持，请使用对应替换语法`);
            },
        };
    }).reduce((sum, value) => {
        return { ...sum, ...value };
    }, {});
    return { visitor };
};


// 无法编译的语法
const unsupportList = [
    {
        name: 'ArrayPattern',
        desc: '数组解构',
    },
    {
        name: 'AwaitExpression',
        desc: 'await 语句',
    },
];