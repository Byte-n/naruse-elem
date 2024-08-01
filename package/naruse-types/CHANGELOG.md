# naruse-types

## 0.7.5

### Patch Changes

- #FEAT: H5 新增 radio-group、radio

## 0.7.4

### Patch Changes

- #FIX: rpx\px 有小数时转换错误

## 0.7.3

### Patch Changes

- #FIX: 1688 官方编译不支持部分 for.init 语法、修改 h5 中对 week image 组件的样式兼容

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

## 0.4.11

### Patch Changes

- #FIX: 升级 naruse-parser 0.1.12 修复 error 文本错误问题

## 0.4.10

### Patch Changes

- #FIX: 升级 naruse-parser 修复部分语法错误

## 0.4.9

### Patch Changes

- #FEAT: naruse-parser 升级 0.1.10

## 0.4.8

### Patch Changes

- #FIX: 日志无广告版本，新增自定义转换日志请求参数接口 coverLoggerInfoToRequestParamInterface， page.evnets 新增 once
- #FEAT: 热装载函数非必要初始化项 & 新增 ctx 传入

## 0.4.7

### Patch Changes

- #FEAT: 新增 naruse-plugin(just alipay) 支持组件系统
- #FIX: 【alipay】修复 ES3 类写法下 middware 初始化的问题

## 0.4.6

### Patch Changes

- #FEAT: 【share】切换为 TS
- #FIX: 【weex】修复 weex 端运行时因为缺失 api 导致的页面渲染错误
- #FEAT: 【PC】PC 的 MouseEvent 新增 target，currentTarget，新增 onMouseDown,onMouseUp,，优化 hoverClass 导致的更新错误，PC\MB 保留 dataset，MB Touch 添加 detail

## 0.4.5

### Patch Changes

- #FEAT: 【alipay】优化生成体积，弃用 mixins 支持非 component2 编译

## 0.4.4

### Patch Changes

- #FIX: 【alipay】修复 getPageInstance 获取不到 id 的问题

## 0.4.3

### Patch Changes

- #FEAT: 三端新增 cloneElement 与 isValidElement 顶级 API

## 0.4.2

### Patch Changes

- #FEAT: 【alipay】缩小模版体积，适应支持直接创建对应 Page 页面函数
