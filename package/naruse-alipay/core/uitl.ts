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
