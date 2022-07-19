import type { TouchEvent } from 'rax';
/**
 * @description 创建通用事件
 * @author CHC
 * @date 2022-07-07 20:07:46
 * @param {string} type
 * @param {Record<string, any>} detail
 * @returns {*} 
 */
const createCommonEvent = (type: string, detail: Record<string, any>) => {
    return {
        type,
        detail,
        timeStamp: new Date().getTime(),
    }
}

/**
 * @description 创建通用触摸事件
 * @author CHC
 * @date 2022-07-11 14:07:05
 * @param {TouchEvent<any>} event
 * @returns {*} 
 */
const createCommonTouchEvent = (event: TouchEvent<any>) => {
    const { changedTouches, touches, type, stopPropagation } = event;
    return {
        type,
        changedTouches,
        touches,
        stopPropagation,
        timestamp: new Date().getTime(),
    }
}

const nexTick = (fn: any): void => {
    if (typeof Promise !== 'undefined') {
        Promise.resolve().then(fn);
    } else {
        setTimeout(fn);
    }
}


export { createCommonEvent, createCommonTouchEvent, nexTick };