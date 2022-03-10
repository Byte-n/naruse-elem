/**
 * 统一埋点方法
 * @author ZW
 * @param {string} eventName 事件名称
 * @param {object} ext 拓展参数，会原样传入到埋点数据中
 * @date 2021-10-26 22:27:01
 */
export const sensorsBeacon = (eventName = '', ext = {}) => {
    console.warn(`%c###BeaconParams### %c${eventName}`, '', 'font-size:20px;color:#fbb300;background:#191919;', ext);
};
