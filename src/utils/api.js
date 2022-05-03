const adInfo = $adImport.adData.results[0];
const { env } = adInfo.user_define.body;

const host = env === 'dev' ? 'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';

const ajax = (method, apiName, data, mode) => {
    if (!data) {
        data = {};
    }
    const option = { mode, method, apiName, host, args: { ...data } };
    return $ayApi.apiAsync(option);
};

const post = (url, apiName, data) => ajax(url, apiName, data, 'post');

const get = (url, apiName, data) => ajax(url, apiName, data, 'get');

/**
 * @desc 该对象只有 post get 两个方法
 * @param {string} 必 url 接口文档提供
 * @param {string} 必 apiName 接口文档提供
 * @param {object} 选 data 需要的参数 接口文档提供
 * @author gao01
 * @date 2022/04/28 23:19:46
 */
export const api = { post, get };
