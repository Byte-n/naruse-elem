import { NaruseConfigH5, NaruseInitParamsH5 } from '../../naruse-share';
import { logger } from "../utils/log";
import { withPageInit } from "./withPage";

const _config: NaruseConfigH5 = {
    hotPuller: () => {
        logger.error('未初始化热更新拉取，无法更新组件默认为空');
        return Promise.resolve({ code: '', ctx: {} });
    },
    baseCtx: () => {
        return {};
    },
    onRunError: (err) => {
        console.error(err);
    },
    // 自定义 rpx 的单位转换
    convertRpx: (rpx) => (rpx / 2 * 1.4).toFixed(1),
    hotImport: (_path, _ctx) => {
        logger.error('hotImport 函数尚未初始化！');
        return Promise.resolve('');
    },
    unsafeEnabled: {
        compatibleWeexElement: false
    }
};

/**
 * @description 获取初始化
 * @author CHC
 * @date 2022-06-14 10:06:50
 * @returns {{ _config: () => Promise<{ code, ctx }>  }}
 */
const getNaruseConfig = () => {
    return _config;
}

/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 * @param newConfig
 */
const naruseInit = (newConfig: NaruseInitParamsH5) => {
    const unsafeEnabled = newConfig.unsafeEnabled;
    delete newConfig.unsafeEnabled;
    Object.assign(_config, newConfig);
    Object.assign(_config.unsafeEnabled, unsafeEnabled);
    const { pageContainer } = _config as any;
    withPageInit({ pageContainer });
}

export { naruseInit, getNaruseConfig }

