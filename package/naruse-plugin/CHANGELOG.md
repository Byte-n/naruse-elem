# naruse-plugin

## 1.2.0

### Minor Changes

- #FIX: naruse-alipay class 组件 props 函数丢失

## 1.1.1

### Patch Changes

- #FEAT:全端 EventBus.on 返回取消监听的函数
- #FEAT:优化 weex 端的 globalEvent 实现
- #FEAT:优化 unsafe_run 的实现，修正 LoggerLanding 的 tryCatch 枚举值

## 1.1.0

### Minor Changes

- #FEAT: alipay,h5,weex 接入插件日志系统

### Patch Changes

- #FEAT: naruse-webpack-runner 正式发布，支持页面、单热更新组件模式编译

## 1.0.5

### Patch Changes

- #FIX: 升级 naruse-parser 0.1.12 修复 error 文本错误问题

## 1.0.4

### Patch Changes

- #FIX: 升级 naruse-parser 修复部分语法错误

## 1.0.3

### Patch Changes

- #FEAT: naruse-parser 升级 0.1.10

## 1.0.2

### Patch Changes

- #FIX: 日志无广告版本，新增自定义转换日志请求参数接口 coverLoggerInfoToRequestParamInterface， page.evnets 新增 once
- #FEAT: 热装载函数非必要初始化项 & 新增 ctx 传入

## 1.0.1

### Patch Changes

- #FEAT: 新增 naruse-plugin(just alipay) 支持组件系统
- #FIX: 【alipay】修复 ES3 类写法下 middware 初始化的问题
