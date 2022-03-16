# 使用手册
## 起步
### 克隆项目
```shell
git clone https://github.com/Barrierml/Naruse.git
```
### 安装依赖
```shell
npm install
```
### 预览
```shell
npm run start
# 输出
# dist/naruse.dev.debug.js
# dist/naruse.dev.debug.json
# dist/naruse.min.js

# 打开淘宝开发者工具，选择该项目根目录即可看到效果
```
### 配置自己的组件
```js
// naruse.config.js
module.exports = {
    ...
    input: './src/adverts/index', // 修改为自己组件路径
    ...
};
```
