
import { logger } from '../../utils/log';
import { exceptType, MethodHandler, safeJsonParse, temporarilyNotSupport } from '../../../../naruse-share/index';
import RAP from 'rap-sdk';

const localStorage = RAP.localStorage;

/** 同步设置缓存 */
export const setStorageSync = () => {
    temporarilyNotSupport('setStorageSync');
};

/** 异步设置缓存 */
export const setStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'setStorage')) return err;

    const { key, data, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'setStorage', success, fail, complete });

    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'setStorage:fail key must be string' });
    }

    localStorage.setItem({
        [key]: JSON.stringify(data)
    });

    return handle.success();
};

/** 同步删除缓存 */
export const removeStorageSync = () => {
    temporarilyNotSupport('removeStorageSync');
};


/** 异步删除缓存 */
export const removeStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'removeStorage')) return err;

    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'removeStorage', success, fail, complete });

    if (typeof key !== 'string') {
        if (typeof key !== 'string') {
            logger.error('removeStorage:fail key must be string');
            return;
        }
    }

    localStorage.removeItem([key]);
    return handle.success();
};

/** 同步获取缓存  */
export const getStorageSync = () => {
    temporarilyNotSupport('getStorageSync');
};

/** 异步获取缓存  */
export const getStorageInfoSync = () => {
    temporarilyNotSupport('getStorageInfoSync');
};


/** 获取缓存信息  */
export const getStorageInfo = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete });
    return localStorage.getKeys().then((keys) => {
        const res = {
            keys: keys?.data,
            limitSize: NaN,
            currentSize: NaN,
        };
        return handle.success(res);
    }).catch(() => {
        return handle.fail();
    })
};

/** 异步获取缓存 */
export const getStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'getStorage')) return err;

    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getStorage', success, fail, complete });

    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'getStorage:fail key must be string' });
    }
    return localStorage.getItem([key])
        .then((res) => {
            const { data } = res;
            const value = safeJsonParse(data?.[key]);
            return handle.success({ data: value });
        })
        .catch(({ msg }) => handle.fail({ errMsg: msg }));
};

/** 同步清除缓存 */
export const clearStorageSync = () => {
    temporarilyNotSupport('clearStorageSync');
};

/** 异步清除缓存 */
export const clearStorage = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'clearStorage', success, fail, complete });
    return localStorage
        .getKeys()
        .then((result: { data: any [] }) => {
            const keyList = result.data;
            if (!(keyList?.length > 0)) return;
            localStorage.removeItem(keyList);
            return handle.success();
        })
        .catch(() => {
            return handle.fail();
        })
};

