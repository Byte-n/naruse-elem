# naruse-h5
naruse的h5端运行平台

## 发布记录
#### 0.2.0
+ #FEAT: 升级 naurse-parser 依赖为 0.1.1
+ #FEAT: 支持 createAnimaton 组件
+ #FEAT: 支持 getImageInfo API 支持提前加载图片资源与信息
+ #FIX: 修复部分如 withPage 函数在 naruse-h5 内不存在的问题
+ #FIX: 修复部分组件缺少 id 等基本属性的问题
#### 0.1.9
+ #FEAT: 升级 naurse-parser 依赖为 0.0.8
+ #FEAT: 所有组件支持 onTransitionEnd 事件
#### 0.1.8
+ #FIX: 修复因为TS自动补全导致的text,input组件setState失效的问题
#### 0.1.7
+ #FEAT: 新增scroll-view & textarea 组件
#### 0.1.4 & 0.1.5
+ #FIX: 修复错误的入口文件名
#### 0.1.3
+ #FIX: 修复发布时忘记发布dist文件夹的问题
#### 0.1.2
+ #FEAT: 新增scroll-view组件，详细支持请查看文档
#### 0.1.1
+ #FEAT: 更新naruse-parser，支持完整的es5与`大部分es6语法

#### 0.1.0
+ #FIX: 【H5】修复getStorage取到空值时错误的问题
+ #FEAT: 【naruse-h5】H5端API对齐初始化

#### 0.0.9
+ #FIX:  修复view组件在卸载后依旧setState的问题
+ #FEAT: 新增`getDeferred` `globalEvent` 等 api 与外部交换数据

#### 0.0.8
+ #FEAT: view 组件支持 `onMouseEnter` `onMouseMove` `onMouseLeave` 事件
