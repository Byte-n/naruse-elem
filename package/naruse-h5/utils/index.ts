

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
