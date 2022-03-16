// 此处修改入口文件名
module.exports = {
    // 入口文件
    input: './src/adverts/index.js',
    // 编译后的userDefinebody会自带的一些内容，用于本地调试
    advertUserDefine: {
        test: 123,
    },
    // 生成的代码是否删除console
    dropConsole: true,
};
