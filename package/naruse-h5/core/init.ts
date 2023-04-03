import { NaruseInitParams } from "../../naruse-share";
import { logger } from "../utils/log";
import { withPageInit } from "./withPage";

const _config: NaruseInitParams = {
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
    hotImport: (path) => {
        throw new Error('尚未初始化 hotImport 函数');
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
 * @param hotPuller 热更新处理、广告加载
 * @param baseCtx 广告运行时的上下文环境
 * @param onRunError 广告运行错误时触发
 * @param convertRpx 自定义 rpx 到 px 的转换
 * @param pageContainer 能获取到页面滚动条偏移量的容器元素
 */
const naruseInit = (newConfig: NaruseInitParams) => {
    Object.assign(_config, newConfig);
    const { pageContainer } = _config as any;
    withPageInit({ pageContainer });
}

export { naruseInit, getNaruseConfig }

