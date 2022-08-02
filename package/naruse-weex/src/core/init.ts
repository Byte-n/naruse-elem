import { logger } from "../utils/log";

const _config = {
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
const naruseInit = (props = {}) => {
    const { hotPuller, baseCtx, onRunError } = props as typeof _config;
    if (hotPuller) _config.hotPuller = hotPuller;
    if (baseCtx) _config.baseCtx = baseCtx;
    if (onRunError) _config.onRunError = onRunError;
}



export { naruseInit, getNaruseConfig }

