import { createLogger } from '../../naruse-share/index';
const logger = createLogger('naruse-element');

const NOOP = () => {};

/**
 * @description 两个props是否完全相同
 * @author CHC
 * @date 2022-03-21 18:03:59
 * @param {*} a
 * @param {*} b
 * @returns {*}
 */
const propsEquals = (a: { [x: string]: any; }, b: { [x: string]: any; }) => {
    if (Object.is(a, b) && typeof a !== 'object') {
        return true;
    }

    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
};

export { logger, NOOP, propsEquals };

/** 深度克隆，例如调试时，用于打印某个时刻的对象副本 */
export function deepClone(obj, circularReferences = new WeakMap()) {
    // 判断是否为引用类型或函数
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    // 检查是否已经拷贝过该对象
    if (circularReferences.has(obj)) {
        return circularReferences.get(obj);
    }
    // 创建新的对象或数组
    const clone = Array.isArray(obj) ? [] : {};
    // 缓存当前对象和对应的拷贝
    circularReferences.set(obj, clone);
    // 遍历属性进行拷贝
    Object.keys(obj).forEach(key => {
        clone[key] = deepClone(obj[key], circularReferences);
    });
    return clone;
}
