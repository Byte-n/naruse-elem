# naruse-parser

只有13kb的一个js编译器+js解释器

用于嵌入不支持js动态执行的环境中

如：小程序环境中

### 能够做到这么小的体积是因为精简了大量的特性，只保留了部分特性。请确定满足使用的语法环境再使用

## 目前不支持的语法
1. 1e3            科学数字法
2. new            新建对象语法
3. class          类声明
4. while          循环语法
5. switch         分支选择
6. try catch      容错语法
7. for in/of      迭代类型语法
8. async/await    异步语法

补充ing
