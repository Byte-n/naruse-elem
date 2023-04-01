import { NaruseConfig } from "../../../naruse-share";
import { logger } from "../utils/log";

const _config: NaruseConfig = {
    hotPuller: (...args: any []) => {
        logger.error('未初始化热更新拉取，无法更新组件默认为空');
        return Promise.resolve({ code: '', ctx: {} });
    },
    baseCtx: () => {
        return {};
    },
    onRunError: (err) => {
        console.error(err);
    },
    hotImport: (...args: any []) => {
        logger.error('未初始化热更新导入，无法更新组件默认为空');
        return Promise.resolve('');
    }
};

/**
 * @description 获取配置项
 * @author CHC
 * @date 2022-06-14 10:06:50
 */
const getNaruseConfig = () => {
    return _config;
}

/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 */
const naruseInit = (props?: NaruseConfig) => {
    Object.assign(_config, props);
}



export { naruseInit, getNaruseConfig }

