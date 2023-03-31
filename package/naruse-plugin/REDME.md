# 很明显这是一个插件
## 目录
* core： 插件效果的抽象、核心逻辑
* logger： 日志插件，新建一个插件就在src下新建一个目录？
* type： naruse-plugin 用到的所有 ts 类型约束


## 插件的生命周期
```typescript
export default class Plugin {
    /** 插件名称标识 */
    name: string = '';
    public constructor(_config: PluginConstructorFirstParma, ..._params: any[]) {
        if (new.target === Plugin){
            throw new Error('Plugin 是一个抽象类，不能被实例化');
        }
    }
    /** 在广告代码运行前，获取到有效的广告数据后 */
    apply (params: PluginApplyParams) {
    }
    /** 解析广告代码错误时、运行广告代码错误时 */
    onError(params: PluginOnErrorParams): void {
    }
}
```

## 注册一个插件 (naruse-alipay)
```typescript
const p = Naruse.registerPlugin(name, plugin, ...params);
```
* name: 插件的名称，重复的无法注册
* plugin: 插件的类构造函数
* ...params：传递给插件构造函数的额外参数
* p 插件实例

**例如：**
```typescript
import { Plugin, registerPlugin } from 'Naruse';
class PluginA extends Plugin {
    student: Student
    constructor (first, student, teacher, ...other) {
        super(frist);
        console.log('frist 是 { config: NaruseConfig } 类型', frist);
        console.log(student, teacher, other);
        this.student = student;
    }
    apply ({ context }) {
        context.student = this.student;
    }
    onError () {
        console.error('出错了啊啊啊啊啊啊啊啊啊啊啊啊啊啊,救命~');
    }
};
// 注册 PluginA
const pluginA = registerPlugin('plugin-a', PluginA, { name: 'student' }, 'teacher', ...[1, 2, 3]);
```

# 插件
## LoggerPlugin
向广告的运行上下文中注入一个 `$logger` 对象。
在构造 LoggerPlugin 时会注入一个默认的 `$logger` 对象。
然后在每次运行一个广告前（apply）,会根据当前广告信息，构造一个新的 `$logger` 替换掉默认的。
并且在 `onError`时记录日志。 

### LoggerPlugin
如下
```typescript
class LoggerPlugin extends Plugin {
    constructor(first: PluginConstructorFirstParma, {
        level,
        landing,
        appName,
        userInfo,
        logInterface,
        systemInfo,
    }: InitAdLoggerPublicInfoParams) {
        super();
    }
    /** 修改参数 */
    updatePublicInfo(params: UpdateAdLoggerPublicInfoParams, ignoredNull = true) {}
    apply({ context, config }: PluginApplyParams) {}
    onError({ context, error, source }: PluginOnErrorParams) {}
}
```

### LoggerPlus
*  `$logger` 的类型为：LoggerPlus，主要方法如下
```typescript
class LoggerPlus {
    /**
     * 构造日志对象
     * @param adData     广告数据
     * @param landing    日志触发源头
     * @param publicInfo 初始化日志公共属性的参数
     */
    constructor({ adData, landing }: LoggerPlusConstructorParams, publicInfo: InitAdLoggerPublicInfoParams) {}
    /** 再此日志对象基础上，创建一个新的日志对象 */
    clone (info: LoggerCloneParams, ignoredNull = true): LoggerPlus{}
    /** debug 日志 */
    debug(event, ...args) { }
    /** info 日志 */
    info(event, ...args) { }
    /** warn 日志 */
    warn(event, ...args) { }
    /** error 日志 */
    error(event, ...args) { }
}
```
> 查看日志，前往 [阿里云日志控制台](https://sls.console.aliyun.com/lognext/project/ittool-zjk/logsearch/ittool)。
> 通过此对象发出的日志为： `action: 'advert-template-logger'`
