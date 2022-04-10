import { processApis } from '../../naruse-share/promiseifyApi';

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

export const transformMeta = (api, options) =>  {
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
    processApis(NaruseApiInterface, my, { transformMeta, needPromiseApis });
    processApis(NaruseApiInterface, my.qn, { qnPromiseApis });
    return NaruseApiInterface;
};