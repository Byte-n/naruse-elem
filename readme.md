# Naruse

> しろは　なるせ（shiroha naruse） 白羽 鸣濑是一名鸟白岛上的巫女，经常站在海岸边眺望大海。

Naruse是一个在小程序内支持使用 **react** 开发，同时在小程序内部支持 **热更新** 的解决方案
特性

🔥   原生react开发体验（生命周期，多组件开发，你想要的都有）

🚀   热更新代码（无需等待小程序繁琐的审核！）

🧱   完善的配套开发工具（webpack插件， 类型提示...）


#  [详细文档](https://barrierml.github.io/naruse-doc)


## 开发相关

> 因为 naruse 可能会经常涉及到多个库之间依赖运行，例如：naruse-webpack-runner 与 naruse-alipay 与 react-like-hooks 同时运行的情况，所以推荐使用 concurrently 运行多个开发

例子：
```shell
# 以 naruse-webpack-runner 的 demo 与 naruse-alipay 为例
pnpm concurrently --kill-others-on-fail "pnpm --filter naruse-webpack-runner dev:demo" "pnpm --filter naruse-alipay dev"
```
