import { Middware } from "core/middware";
import { ALLOW_EVENT } from "core/page";
import { MiniComponentConfig } from "./createMiniFactory";

export const createPageComponent = (config: MiniComponentConfig) => {
    const pageConfig: Record<string, any> = {
        // 标识是 naruse 页面
        $$narusePage: true,
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
        const middware = new Middware(this, config.component, {});
        middware.update();
        this.$middware = middware;
    }

    // @ts-ignore
    Page(pageConfig);
}