

/**
 * 判断是否是 animation 名称
 */
export const isNaruseAnimaitonName = (name?: string) => name && name.substring(0, 19) === 'naruse-h5-poly-fill';

/**
 * 获取props中以 'data-' 开头的属性
 * @param props
 */
export const getPropsDataSet = (props) => Object.keys(props || {}).reduce((per: any, cur: string) =>{
    if (cur.indexOf('data-') === 0) {
        per[cur] = props[cur];
    }
    return per;
}, {})
const basePropsKey = ['id', 'className', 'style'];
const basePropsKeyU = ['Id', 'ClassName', 'Style'];
export const getBaseProps = (props, keyPrefix = '') => {
    const obj = {};
    const keys = keyPrefix ? basePropsKeyU : basePropsKey;
    for (const key of keys) {
        if (props[keyPrefix + key] === undefined) {
            continue;
        }
        obj[key] = props[key];
    }
    return obj;
}

/**
 * 解析 字符串参数，类型： k=v&k=v&k=v&...
 * 前面没有 ‘？’
 * @param url
 */
export function parseURLParam(url = '') {
    if (!url) {
        return {};
    }
    const split = url.split('&');
    const res = {};
    for (const item of split) {
        const kv = item.split('=');
        res[kv[0]] = kv[1];
    }
    return res;
}
