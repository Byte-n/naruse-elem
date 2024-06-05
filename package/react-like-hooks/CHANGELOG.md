# react-like-hooks

## 0.7.2

### Patch Changes

- #FEAT: H5 新增 compatibleWeexElement

## 0.7.1

### Patch Changes

- naruse-plugin-hot-puller-cache 缓存错误

## 0.7.0

### Minor Changes

- #FIX: 支付宝小程序中旧 弹窗无法被新弹窗顶掉

## 0.6.5

### Patch Changes

- #FIX: 小程序 didUnmount 时，主组件未卸载、函数调用无响应
- #FEAT: weex 支持 props 穿透

## 0.6.4

### Patch Changes

- 插件生命周期可选、h5 中 adProps 改为 props
- 新增 fs-aw 子模块
- 新增 hot-puller-cache 插件

## 0.6.3

### Patch Changes

- #FEAET: 规范 H5 端的 ref
- #FEAT: 完善 WebView

## 0.6.2

### Patch Changes

- #FEAT: 引入 naruse-parser 子模块
- #FEAT: 三端引入 web-view

## 0.6.1

### Patch Changes

- #FEAT: [alipay] 静态事件中心挂载修改为动态寻找
- #FEAT: H5 支持业务 props 透传给广告、修复 Hooks 报错、日志发送错误
- #FEAT: [h5] 支持 appear 相关 API
- #FEAT: [alipay] view 支持 Appear 系列事件
- #REFACT: [demo] 修改 @swc/helper 依赖项版本不正确导致的无法启动 demo 测试

## 0.6.0

### Minor Changes

- #FIX: naruse-alipay class 组件 props 函数丢失

## 0.5.1

### Patch Changes

- #FEAT:全端 EventBus.on 返回取消监听的函数
- #FEAT:优化 weex 端的 globalEvent 实现
- #FEAT:优化 unsafe_run 的实现，修正 LoggerLanding 的 tryCatch 枚举值

## 0.5.0

### Minor Changes

- #FEAT: alipay,h5,weex 接入插件日志系统

### Patch Changes

- #FEAT: naruse-webpack-runner 正式发布，支持页面、单热更新组件模式编译

## 0.4.12

### Patch Changes

- #FIX: 升级 naruse-parser 0.1.12 修复 error 文本错误问题

## 0.4.11

### Patch Changes

- #FIX: 升级 naruse-parser 修复部分语法错误

## 0.4.10

### Patch Changes

- #FEAT: naruse-parser 升级 0.1.10

## 0.4.9

### Patch Changes

- #FIX: 日志无广告版本，新增自定义转换日志请求参数接口 coverLoggerInfoToRequestParamInterface， page.evnets 新增 once
- #FEAT: 热装载函数非必要初始化项 & 新增 ctx 传入

## 0.4.8

### Patch Changes

- #FEAT: 新增 naruse-plugin(just alipay) 支持组件系统
- #FIX: 【alipay】修复 ES3 类写法下 middware 初始化的问题

## 0.4.7

### Patch Changes

- #FEAT: 三端支持 hooks
- #FEAT: naruse-parser 升级到 0.1.9
- #FEAT: 三端演示 demo 构建完毕，详见 demo 文件夹下
- #FEAT: naruse-webpack-runner 支持完整的编译体系
- #FEAT: 新增热加载特性，在 init 下初始化 hotImport 使用
- #FEAT: naruse 支持插件扩展
- #FEAT: 新增 showToast 与 hideToast Api
