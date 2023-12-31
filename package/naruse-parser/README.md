# naruse-parser
This is a javascript interpreter for naruse code run in different platform

gzip后只有18kb，基于 TypeScript 编写的 JavaScript 解释器，运行于es的环境，支持完整的es5特性与大部分的es6特性，完整的错误提示系统，

编译器是基于`acorn`的`0.12.0`改造后的版本。
解释器是fork于[jsjs](https://github.com/bramblex/jsjs)。

## 特性
+ 完全实现自举，自己运行自己（套娃）详见 `test/bootstrapping.js`
+ 支持完整的 ES5 与大部分 ES6
+ 支持动态 import 导入新模块
+ 支持全局同步与异步错误收集
+ 完整的错误代码提示

## 在线demo
[点击体验](https://narusejs.github.io/naruse-parser/)

## 使用场景
+  某些限制动态执行JS代码的地方热更新产品。
+  希望能够安全的运行某些JS代码。(推荐配合Proxy使用，能够完全沙箱隔离)
+  学习研究使用。
+  ES5 环境不需要编译直接执行 ES6 代码。（部分支持）

## 使用限制
+ 与原生 JS 解释器相比，针对 var 变量并不会进行全局变量提升
+ 固定为严格模式，不允许未经声明使用变量

## 安装

```shell
npm i naruse-parser -S
```

## 使用

```javascript
import run from 'naruse-parser';

const exports = run(`
exports.name = 'naruse';
console.log(exports.name);
`);

// naruse

```

## 参数

```ts
/**
 * @parma code 传入的代码片段
 * @parma injectObject 注入的全局变量
 * @parma onError 全局错误收集中心
 */
declare const run: (code: string, injectObject: Record<string, any>, onError?: (e: Error) => void) => any;

```

## 支持特性

相关特性可以看[这里](https://babeljs.io/docs/en/learn/)，并不一定全部实现。但常用的都会实现的。

- [x] 块级作用域
  - [x] let
  - [x] const
- [ ] Class
  - [ ] 基础声明
  - [ ] extends
  - [ ] class fields
  - [ ] static property
- [x] 箭头函数
  - [x] 基础执行支持
  - [x] context绑定
- [x] 解构
  - [x] 对象解构
  - [x] 数组解构
  - [x] 函数实参解构
- [ ] Rest element
  - [ ] ObjectPattern
  - [ ] ArrayPattern
  - [ ] 函数形参rest
- [x] Map + Set + WeakMap + WeakSet 由外部提供支持，不支持环境请自行导入`polyfill`
- [x] for-of for-in
- [x] Template Strings
- [x] Computed property
- [ ] Symbols
- [ ] Generators (doing)
- [ ] async/await
  - [ ] Async generator functions 不支持

## 进一步优化速度与体积
- [ ] 热更新只传输 ast
- [ ] ast 压缩传输
- [ ] 加速ast解析

## History
#### 0.1.12
+ #FIX: 修复多个 runner 同时运行时导致错误内容截取为最后一个执行片段的问题
#### 0.1.11
+ #FIX: 修复了函数内使用 const 声明与函数名同名的变量时会出现错误 [issue](https://github.com/narusejs/naruse-parser/issues/12)
#### 0.1.10
+ #FIX: 修复了函数内使用 const 声明与函数名同名的变量时会出现错误 [issue](https://github.com/narusejs/naruse-parser/issues/11)
#### 0.1.9
+ #FIX: 修复了当函数中出现与函数名相同的的形参时会导致形参会取到当前函数 [issue](https://github.com/narusejs/naruse-parser/issues/10)
#### 0.1.8
+ #FIX: 修复了函数中使用 try finally 后返回值默认为 undefined [issue](https://github.com/narusejs/naruse-parser/issues/9)
#### 0.1.7
+ #FIX: 修复当 var 定义的变量名与注入变量名相同时会取到为空
#### 0.1.6
+ #EAT: 优化了部分代码 & 外部注入变量更改为 Var 赋值类型，允许内部进行修改
#### 0.1.5
+ #FIX: 修复了在非 block 作用域中使用函数名调用函数时，函数名指向错误的问题 [issue](https://github.com/narusejs/naruse-parser/issues/7)
#### 0.1.4
+ #FIX: 修复了在 ForIn 与 ForOf 中不允许提前声明变量的问题 & 数组解构不能直接赋值 [issue](https://github.com/narusejs/naruse-parser/issues/8)
#### 0.1.3
+ #FIX: 修复错误事件中心多次报错无法收集问题 [PR6](https://github.com/narusejs/naruse-parser/pull/6) [@Byte-n](https://github.com/Byte-n)
#### 0.1.2
+ #FIX: 修复正常作用域下 var 没有提前声明的问题 & for in /of 同样支持 var 作用域提升

#### 0.1.1
+ #FIX: 修复 var 不允许重复声明与在 for 循环内声明没有进行变量提升的问题

#### 0.1.0
+ #FIX: 修复 function 没有变量提升 行为与原生不符 [issues](https://github.com/narusejs/naruse-parser/issues/5)
+ #FEAT: 完成编译器自举，详情见 `/test/bootstrapping.js`
#### 0.0.9
+ #FIX: 修复 for 循环返回值错误的问题
+ #FIX: 修复在某些版本的 babel 中会将 typeof 编译为同名函数，导致运行栈溢出
+ #FEAT: 新增全局错误收集中心
#### 0.0.8
+ #CHORE: 更换入口文件位置与新增TS提示
#### 0.0.7
+ #FEAT: const 重新赋值改为报错
+ #FEAT: acorn 切换为TS
+ #FIX: 修复FOR循环无法使用

#### 0.0.6
+ #CHORE: update readme
#### 0.0.5
+ #FIX:  "const" string cannot be changed
+ #FEAT: support pnpm

## License
Mozilla Public License Version 2.0