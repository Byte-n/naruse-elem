import { processApis } from 'naruse-share';

const apiDiff = {
    getClipboardData: { alias: 'getClipboard' },
    setClipboardData: {
        alias: 'setClipboard',
        options: {
            change: [{
                old: 'data',
                new: 'text',
            }],
        },
    },
};

export const transformMeta = (api, options) => {
    let apiAlias = api;
    Object.keys(apiDiff).forEach(item => {
        const apiItem = apiDiff[item];
        if (api === item) {
            if (apiItem.alias) {
                apiAlias = apiItem.alias;
            }
            if (apiItem.options) {
                const { change } = apiItem.options;
                const { set } = apiItem.options;
                if (change) {
                    change.forEach(changeItem => {
                        options[changeItem.new] = options[changeItem.old];
                    });
                }
                if (set) {
                    set.forEach(setItem => {
                        options[setItem.key] = typeof setItem.value === 'function' ? setItem.value(options) : setItem.value;
                    });
                }
            }
        }
    });

    return {
        key: apiAlias,
        options,
    };
};

export const handleSyncApis = function handleSyncApis (key, global, args) {
    if (key === 'getStorageSync') {
        const arg1 = args[0];
        if (arg1 != null) {
            const res = global[key]({ key: arg1 });

            // 支付宝小程序遗留bug：值可能在data或APDataStorage字段下
            let data = null;
            if (res.hasOwnProperty('data')) {
                data = res.data;
            } else if (res.hasOwnProperty('APDataStorage')) {
                data = res.APDataStorage;
            }

            return data === null ? '' : data;
        }
        return console.error('getStorageSync 传入参数错误');
    }
    if (key === 'setStorageSync') {
        const arg1 = args[0];
        const arg2 = args[1];
        if (arg1 != null) {
            return global[key]({
                key: arg1,
                data: arg2,
            });
        }
        return console.error('setStorageSync 传入参数错误');
    }
    if (key === 'removeStorageSync') {
        const arg1 = args[0];
        if (arg1 != null) {
            return global[key]({ key: arg1 });
        }
        return console.error('removeStorageSync 传入参数错误');
    }
    if (key === 'createSelectorQuery') {
        const query = global[key]();
        query.in = function () {
            return query;
        };
        return query;
    }
    return global[key].apply(global, args);
};

const needPromiseApis = [
    'getStorage',
    'setStorage',
    'removeStorage',
    'clearStorage',
    'getStorageInfo',
    'getSystemInfo',
    'navigateTo',
    'navigateBack',
    'setClipboard',
    'getClipboard',
];

const syncApis = [
    'getStorageSync',
    'setStorageSync',
    'removeStorageSync',
    'clearStorageSync',
    'getStorageInfoSync',
];

const qnPromiseApis = [
    'navigateToWebPage',
];


/**
 * @description 初始化alipay的api
 * @author CHC
 * @date 2022-04-07 13:04:59
 * @returns {*}
 */
export const initNaruseAlipayApi = () => {
    const NaruseApiInterface = {};
    processApis(NaruseApiInterface, my, {
        transformMeta,
        needPromiseApis,
        handleSyncApis,
        needSyncApis: syncApis,
    });
    processApis(NaruseApiInterface, my.qn, { needPromiseApis: qnPromiseApis });
    return NaruseApiInterface;
};