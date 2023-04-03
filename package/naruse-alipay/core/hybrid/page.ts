import { NaruseComponent } from "core/component";
import { getMethodsObject } from "core/domEvents";
import { Middware } from "core/middware";
import { ALLOW_EVENT } from "core/page";
import { MiniComponentConfig } from "./createMiniFactory";

/**
 * 创建一个页面组件
 */
 export const createPageComponent = (instance: NaruseComponent, config: MiniComponentConfig) => {
    const pageConfig: Record<string, any> = {
        // 标识是 naruse 页面
        $$narusePage: true,
        // 页面配置
        $config: config,
        // 事件处理器
        ...getMethodsObject(),
    };

    // 挂载页面事件
    ALLOW_EVENT.forEach((event) => {
        pageConfig[event] = function () {};
    });

    // 初始化属性
    pageConfig.data = {};

    // 加载时
    pageConfig["onLoad"] = function (query) {
        this.$query = query;
        // 初始化 naruse 组件
        const middware = new Middware(this, instance, {});
        middware.update();
        this.$middware = middware;
    }

    // @ts-ignore 小程序中的Page?
    Page(pageConfig);
}
