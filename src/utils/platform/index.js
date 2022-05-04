/**
 * @desc 负责判断各种设备信息,项目,平台的库
 */

/** 平台全部信息 */
export const platformConfig = Naruse.getSystemInfoSync();

/**
 * @desc 是否为PC设备
 * @author gao01
 * @return {boolean}
 * @date 2022/04/29 15:13:07
 */
export const isPC = () => platformConfig.model === 'PC';

/**
 * @desc 是否为移动设备
 * @author gao01
 * @return {boolean}
 * @date 2022/04/29 15:13:31
 */
export const isMB = () => !isPC();

/**
 * @desc 判断用户设备是否是ios
 * @author gao01
 * @return {boolean}
 * @date 2022/03/16 11:21:59
 */
export const isIOS = () => ['iOS', 'ios'].includes(platformConfig.platform);

const decideApp = (appName) => {
    if (isPC()) {
        return $env.app === appName;
    }
    if (isMB()) {
        return $env.ENV.app === appName;
    }
};
/**
 * @desc 是否为交易app
 * @author gao01
 * @return {boolean}
 * @date 2022/04/29 16:01:46
 */
export const isAppTrade = () => decideApp('trade');

/**
 * @desc 是否为商品app
 * @author gao01
 * @return {boolean}
 * @date 2022/04/29 16:01:46
 */
export const isAppItem = () => decideApp('item');
