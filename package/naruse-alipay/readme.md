# naruse-alipay

这是一个在小程序内模拟WEB的DOM树的基础库


## todo
+ [ ] 优化diff函数，key
+ [ ] 增加更多的组件

## history
#### 0.3.1
+ #FIX: 修复了组件错误的卸载方式
+ #FIX: 修复了当渲染为空时无法渲染的问题
#### 0.3.0
+ #FEAT: 新增diff阶段，优化渲染速度与内容
+ #FIX: 修复部分组件属性失效
#### 0.2.7
+ #FEAT: 新增textarea组件支持，详细参数参考文档
+ #FIX: 修复了scroll-view部分缺失属性与事件
#### 0.2.6
+ #FEAT: 新增scroll-view组件支持，详细参数参考文档
#### 0.2.5
+ #FEAT: 切换为ts
#### 0.2.4
+ #FEAT: 更新naruse-parser，支持完整的es5与大部分es6
#### 0.2.3
+ #FEAT: 【alipay】新增getDefer api 方便Naruse内部与外部交换数据
#### 0.2.2
+ #FEAT: 【alipay】修改withPage事件挂载机制，新增了更多事件挂载
+ #FEAT: 【alipay】新增unsafe_run 在naruse命名空间内
+ #FIX: 【alipay】修复了因为容错导致的事件无法触发
+ #FIX: 【alipay】修复老组件兼容错误的问题
+ #FIX: 【alipay】修复了forceUpdate不会触发shouUpdate生命周期的问题
+ #FIX: 【alipay】修复主组件卸载时的错误
#### 0.2.0 && 0.2.1
+ #FIX: 修复了当alipay node为空时导致报错的问题
#### 0.1.9
+ #FEAT: 修复错误的props判定导致的无法重新渲染
#### 0.1.8
+ #FEAT: 新增shouldComponentUpdate生命周期，与react保持一致
#### 0.1.7
+ #BACK: 由于children的行为改变具有破坏性，推迟到后续修复，先删除此commit
#### v0.1.6
+ #FIX: 修复naruse-parse新增语法的报错
#### v0.1.5
+ #FEAT: 更新小程序端架构，模版与逻辑拆分，方便后续扩展 & 修复了一些容错bug
+ #FEAT: 更新renderComponentOnPage至Naruse命名空间内
+ #FEAT: 更新naruse组件架构，支持单组件单页面渲染
+ #FIX: 修复了小程序端当key发生变化后组件不会重新渲染
+ #FIX: 修复小程序端createElement与react.createElement参数不一致的问题
+ #FIX: 修复小程序中children中与React行为不一致的问题
#### v0.1.4
+ FIX: 修复了因为依赖的naruse-parser与naruse-share使用的es6语法导致小程序编译失败
+ FIX: 修复了函数式函数传入单传入children会报错的问题