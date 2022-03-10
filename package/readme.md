## naruse-element
用于在支付宝小程序内模拟dom树，同时提供一个简易的react运行时
#### 借鉴
1. [NervJS/Taro](https://github.com/NervJS/taro/tree/next/packages/taro-runtime)
   开放式跨端跨框架解决方案
2. [Tencent/Kbone](https://github.com/Tencent/kbone)
   一个致力于微信小程序和 Web 端同构的解决方案
3. [Facebook/React](https://github.com/facebook/react)
   About A declarative, efficient, and flexible JavaScript library for building user interfaces.
4. [支付宝开发程序](https://opendocs.alipay.com/mini/developer) 提供文档支持

## naruse-parser
12KB的js编译器+js解释器
用于在小程序等不支持动态执行js代码的环境内运行js代码

#### 借鉴
1. [acornjs/acorn](https://github.com/acornjs/acorn)
   A small, fast, JavaScript-based JavaScript parser
2. [bramblex/jsjs](https://github.com/bramblex/jsjs)
   About
简易的 JavaScript 元循环解释器

## naruse-web
远程加载react组件并渲染

## naruse-webpack-loader
naruse webpack 插件与loader，用与将标准的react组件转换为naruse-paser能运行的代码

## naurse-ay-polyfill
爱用项目所需的polyfill，用于本地环境开发使用