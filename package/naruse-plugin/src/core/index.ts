import { PluginApplyParams, PluginConstructorFirstParma, PluginMethod, PluginMethodKey, PluginOnErrorParams } from "../type";
import { EventBus } from "naruse-share";
import { log } from '../utils/log';

/**
 * 插件,很明显，它是一个插件，它可以做点什么。你必须继承此类，来实现插件
 */
export default class Plugin {
    /** 插件名称标识 */
    name: string = '';
    public constructor(_config: PluginConstructorFirstParma, ..._params: any[]) {
        if (new.target === Plugin){
            throw new Error('Plugin 是一个抽象类，不能被实例化');
        }
    }
    /** 在广告代码运行前，获取到有效的广告数据后 */
    apply (_params: PluginApplyParams) {
    }
    /** 解析广告代码错误时、运行广告代码错误时 */
    onError(_params: PluginOnErrorParams): void {
    }
}


/** 插件的所有方法 */
const PluginMethodList: Array<PluginMethodKey> = ['apply', 'onError'];
/** 所有的插件 */
const plugins: Record<string, Plugin> = {};
// @ts-ignore
export const pluginEvent = new EventBus();
/** 使用全局事件中心 注册插件的生命周期 */
PluginMethodList.forEach((method: PluginMethodKey) => {
    pluginEvent.on(PluginMethod[method], (params) => {
        const keys = Object.keys(plugins);
        log.info(`PluginMethod[${method}]`, keys.length, params);
        keys
            .forEach(key => {
                plugins[key][method](params);
            })
    })
});

/** 注册一个插件 */
export function registerPlugin (name: string, pluginConstructor: typeof Plugin, firstParam: PluginConstructorFirstParma, ...params: any[]): Plugin {
    // 构造对象
    const plugin = new pluginConstructor(firstParam, ...params);
    if (!(plugin instanceof Plugin)) {
        throw new Error('registerPlugin: pluginConstructor 必须返回一个 Plugin类的实例');
    }
    if (plugin[name]) {
        throw new Error(`${name} 此插件，已经注册过了`);
    }
    plugins[name] = plugin;
    plugin.name = name;
    return plugin;
}
