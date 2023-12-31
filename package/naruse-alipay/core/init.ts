import { logger } from "./uitl";
import { NaruseConfig, NaruseInitParams } from 'naruse-share';

const _config: NaruseConfig = {
    hotPuller: () => {
        logger.error('未初始化热更新拉取，无法更新组件默认为空');
        return Promise.resolve({ code: '', ctx: {} });
    },
    baseCtx: () => {
        return {};
    },
    onRunError: (err: Error) => {
        console.error(err);
    },
    hotImport: (path, ctx) => {
        logger.error('hotImport 函数尚未初始化！');
        return Promise.resolve('');
    }
};

/**
 * @description 获取初始化
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
const naruseInit = (params: NaruseInitParams = {}) => {
    Object.assign(_config, params);
}



export { naruseInit, getNaruseConfig }

