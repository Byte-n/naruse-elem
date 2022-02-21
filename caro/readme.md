# caro

其实就是把

## 介绍

caro目前是一个支付宝小程序内的一个组件
通过纯JSON字符串的格式动态的渲染页面，可以通过动态加载json字符串实现在小程序内的热更新页面。

## 快速开始

### 引入caro组件

1. 将
   页面配置设置中

```json
// 在页面引入caro组件
{
  "usingComponents": {
    "my-component": "/"
  }
}
```



## 编译

在caro目录下

运行以下命令

```
node paser.js input='你要编译的文件名' output='输出文件地址名'
```
