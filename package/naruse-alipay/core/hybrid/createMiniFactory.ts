import type { NaruseComponent } from "core/component";
import { logger } from "core/uitl";
import { createPageComponent } from "./page";


export interface MiniComponentConfig {
    component: NaruseComponent;
}

type FactoryType = 'page' | 'component'

/**
 * 创建一个小程序的组件工厂，允许直接传入 Naruse 组件进行开发
 */
export const createMiniFactory = (type: FactoryType, config: MiniComponentConfig) => {
    if (type === 'page') {
        // @ts-ignore
        return createPageComponent(config);
    } else {
        logger.error('初始化暂不支持组件');
    }
}