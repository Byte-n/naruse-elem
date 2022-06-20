# naruse-element

这是一个在小程序内模拟WEB的DOM树的基础库

## history

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