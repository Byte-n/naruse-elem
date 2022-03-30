import createLogger from './log/logger';

const logger = createLogger('naurse-error');

/**
 * @description 期望为某个类型，异步版
 * @author CHC
 * @date 2022-03-30 15:03:05
 * @param {*} { obj, type, name }
 * @returns {*}
 */
export const exceptType = (obj, type, name) => {
    if (typeof obj !== type) {
        const res = { errMsg: `${name}:fail must has a ${type}` };
        logger.error(res.errMsg);
        return Promise.reject(res);
    }
};

/**
 * @description 期望为某个类型同步版
 * @author CHC
 * @date 2022-03-30 15:03:22
 * @param {*} obj
 * @param {*} type
 * @param {*} name
 * @returns {*}
 */
export const exceptTypeSync = (obj, type, name) => {
    if (typeof obj !== type) {
        logger.error(`${name}:fail must has a ${type}`);
        return true;
    }
    return false;
};
