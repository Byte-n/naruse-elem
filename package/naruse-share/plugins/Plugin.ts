import { PluginApplyParams, PluginOnErrorParams } from "../types";

/**
* 插件,很明显，它是一个插件，它可以做点什么。你必须继承此类，来实现插件
*/
export default class Plugin {
    /** 插件名称标识 */
    name: string = '';
    public constructor() {
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
