import { MethodHandler } from '../../../../naruse-share/index';

const model = navigator.userAgent.match(/\((.*?)\)/)?.[1];

const mainVersion = navigator.userAgent.replace(/\((.*?)\)/, '').split(' ').map((key) => key.split('/'));

const weexVersion = mainVersion[0][1];


/**
 * @description 获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:25
 * @returns {*}
 */
export const getSystemInfoSync = () => {
    return {
        app: navigator.appName,
        brand: 'unknown',
        currentBattery: '100%',
        fontSizeSetting: 16,
        language: 'Chinese',
        model,
        pixelRatio: 1.5,
        platform: navigator.platform.toLowerCase(),
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        statusBarHeight: 0,
        storage: null,
        system: mainVersion[1].join(''),
        taojimuEnv: undefined,
        titleBarHeight: 0,
        version: navigator.appVersion,
        windowHeight: window.screen.availHeight,
        windowWidth: window.screen.availWidth,
        scaleWith: 750,
        scaleHeight: Math.ceil((window.screen.availHeight) / (window.screen.availWidth) * 750),
    };
};

/**
 * @description 异步获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:00
 * @param {*} [{ success, fail, complete }={}]
 * @returns {*}
 */
export const getSystemInfo = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete });
    return handle.success(getSystemInfoSync());
};
