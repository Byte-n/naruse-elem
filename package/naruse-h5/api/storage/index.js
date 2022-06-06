
import { logger } from '../../utils/log';
import { exceptType, exceptTypeSync, MethodHandler } from 'naruse-share';

/** 获取缓存 */
const getItem = function getItem (key) {
    let item;
    try {
        item = JSON.parse(localStorage.getItem(key) || '');
    } catch (e) { }

    if (item && typeof item === 'object' && Object.keys(item).includes('data')) {
        return { result: true, data: item.data };
    }
    return { result: false };
};

/** 同步设置缓存 */
export const setStorageSync = (key, data = '') => {
    if (exceptTypeSync(key, 'string', 'removeStorageSync')) return;

    const type = typeof data;
    let obj = {};

    if (type === 'symbol') {
        obj = { data: '' };
    } else {
        obj = { data };
    }
    localStorage.setItem(key, JSON.stringify(obj));
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

    setStorageSync(key, data);
    return handle.success();
};

/** 同步删除缓存 */
export const removeStorageSync = (key) => {
    if (exceptTypeSync(key, 'string', 'removeStorageSync')) return;
    localStorage.removeItem(key);
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

    removeStorageSync(key);
    return handle.success();
};

/** 同步获取缓存  */
export const getStorageSync = (key) => {
    if (exceptTypeSync(key, 'string', 'getStorageSync')) return;

    const res = getItem(key);
    if (res.result) return res.data;

    return '';
};

/** 异步获取缓存  */
export const getStorageInfoSync = () => {
    const res = {
        keys: Object.keys(localStorage),
        limitSize: NaN,
        currentSize: NaN,
    };
    return res;
};


/** 获取缓存信息  */
export const getStorageInfo = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete });
    return handle.success(getStorageInfoSync());
};

/** 同步获取缓存 */
export const getStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'getStorage')) return err;

    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getStorage', success, fail, complete });

    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'getStorage:fail key must be string' });
    }
};

/** 同步清除缓存 */
export const clearStorageSync = () => {
    localStorage.clear();
};

/** 异步清除缓存 */
export const clearStorage = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'clearStorage', success, fail, complete });
    clearStorageSync();
    return handle.success();
};

