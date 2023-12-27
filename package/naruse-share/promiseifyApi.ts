import { temporarilyNotSupport } from './assert';
import { isFunc } from './utils';

/**
 * @description 处理api
 * @author CHC
 * @date 2022-04-07 12:04:21
 * @param {*} Naruse Naruse对象
 * @param {*} global 全局对象
 * @param {*} [config={}]
 */
export const processApis = function processApis (Naruse, global, config: any = {}) {
    if (!global) return;

    const apis = config.needPromiseApis || [];
    const syncApis = config.needSyncApis || [];

    const { transformMeta } = config;

    // 处理所有需要promisify的api
    apis.forEach(key => {
        const originKey = key;
        Naruse[originKey] = (options: any = {}, ...args: any []) => {
            let key = originKey;

            // 第一个参数 options 为字符串，单独处理
            if (typeof options === 'string') {
                if (args.length) {
                    return global[key](options, ...args);
                }
                return global[key](options);
            }

            // 改变 key 或 option 字段
            if (config.transformMeta) {
                const { key: newKey, options: newOpt } = transformMeta(key, options);
                key = newKey;
                options = newOpt;
                // 新 key 可能不存在
                if (!global.hasOwnProperty(key)) {
                    return temporarilyNotSupport(key)();
                }
            }

            const obj: any = Object.assign({}, options);


            // Promisify
            const p = new Promise((resolve, reject) => {
                obj.success = res => {
                    isFunc(options.success) && options.success(res);
                    resolve(res);
                };
                obj.fail = res => {
                    isFunc(options.fail) && options.fail(res);
                    reject(res);
                };
                obj.complete = res => {
                    isFunc(options.complete) && options.complete(res);
                };
                // let task;
                // if (args.length) {
                //     task = global[key](obj, ...args);
                // } else {
                //     task = global[key](obj);
                // }
            });

            return p;
        };
    });

    syncApis.forEach(key => {
        if (typeof global[key] === 'function') {
            Naruse[key] = (...args) => {
                if (config.handleSyncApis) {
                    return config.handleSyncApis(key, global, args);
                }
                return global[key].apply(global, args);
            };
        } else {
            Naruse[key] = global[key];
        }
    });
};
