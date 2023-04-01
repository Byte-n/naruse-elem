// 利用 express 启动一个简单的 HTTP 服务，访问的目录自动返回对应目录下的文件内容
// 例如访问 http://localhost:8080/qwer.js 会返回 demo-alipay 目录下的 qwer.js 文件内容

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.resolve(__dirname, './')))

app.listen(6936, () => {
    console.log('文件服务器已启动在 6936')
});
