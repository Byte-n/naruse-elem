import { PluginMethodKey, PluginMethod } from "../types";
import { EventBus } from "../eventCenter";
import Plugin from './Plugin'
import { createLogger } from "../index";

/** 插件的所有方法 */
const PluginMethodList: Array<PluginMethodKey> = ['apply', 'onError'];
/** 所有的插件 */
const plugins: Record<string, Plugin> = {};
const log = createLogger('PluginMethod')
// @ts-ignore
const pluginEvent = new EventBus();
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
export function registerPlugin (name: string, plugin: Plugin) {
    if (!(plugin instanceof Plugin)) {
        throw new Error('registerPlugin: plugin 必须是 Plugin类的实例 ');
    }
    if (plugin[name]) {
        throw new Error(`${name} 此插件，已经注册过了`);
    }
    plugins[name] = plugin;
    plugin.name = name;
}

export {
    Plugin, pluginEvent
}
export * from './logger/index'
