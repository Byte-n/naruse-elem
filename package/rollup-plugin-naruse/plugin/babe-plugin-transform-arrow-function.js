module.exports = function () {
    return {
        visitor: {
            ArrowFunctionExpression (path) {
                if (path.parent.type === 'ClassProperty') {
                    return;
                }
                path.arrowFunctionToExpression({ noNewArrows: true, allowInsertArrow: false });
            },
        },
    };
};
