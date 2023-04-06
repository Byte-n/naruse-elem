# rollup-plugin-naruse

## 0.4.13

### Patch Changes

- #FIX: 升级 naruse-parser 修复部分语法错误

## 0.4.10

### Patch Changes

- #FEAT: naruse-parser 升级 0.1.10

## 0.4.9

### Patch Changes

- #FIX: 日志无广告版本，新增自定义转换日志请求参数接口 coverLoggerInfoToRequestParamInterface， page.evnets 新增 once
- #FEAT: 热装载函数非必要初始化项 & 新增 ctx 传入

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

## 0.4.1

### Patch Changes

- #FEAT: 切换版本日志由 changesets 统一管理
