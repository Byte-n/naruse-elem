/**
 * 去掉前后 空格/空行/tab 的正则 预先定义 避免在函数中重复构造
 * @type {RegExp}
 */
const trimReg = /(^\s*)|(\s*$)/g;

/**
  * 判断一个东西是不是空 空格 空字符串 undefined 长度为0的数组及对象会被认为是空的
  * @param key
  * @returns {boolean}
  */
export const isEmpty = (key) => {
    if (key === undefined || key === '' || key === null) {
        return true;
    }
    if (typeof (key) === 'string') {
        key = key.replace(trimReg, '');
        if (key === '' || key === null || key === 'null' || key === undefined || key === 'undefined') {
            return true;
        }
        return false;
    } else if (typeof (key) === 'undefined') {
        return true;
    } else if (typeof (key) === 'object') {
        for (const i in key) {
            return false;
        }
        return true;
    } else if (typeof (key) === 'boolean') {
        return false;
    }
};

/** 移除对象的中空值 */
export function removeObjectNullValue (obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    Object.keys(obj)
        .forEach(k => {
            if (isEmpty(obj[k])) {
                delete obj[k];
            }
        });
    return obj;
}
/**
 * @description 判断是否是函数
 * @author CHC
 * @date 2022-04-07 13:04:03
 * @param {*} obj
 */
export const isFunc = (obj) => typeof obj === 'function';

export const isObj = (obj) => obj !== null &&  typeof obj === 'object';

/**
 * @description 不会报错的JSON.parse
 * @author CHC
 * @date 2022-07-14 17:07:45
 * @param {*} str
 * @returns {*}
 */
export const safeJsonParse = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}

/**
 * @description 是否是一个空对象
 * @author CHC
 * @date 2022-10-12 14:10:29
 */
export const isEmptyObj = (o) => {
    for (let i in o) {
        return false;
    }
    return true;
}
/** 判断是不是箭头函数 */
export const isArrowFunction = (fn) => {
    const fnStr = fn.toString();
    if (!(fn instanceof Function)) {
        return false;
    }
    // 判断函数体是否有花括号
    if (fnStr.match(/{[\s\S]*}/)) {
        // 将花括号内的函数体去掉
        return fnStr.replace(/{[\s\S]*}/, "").includes("=>")
    } else {
        return true
    }
};
