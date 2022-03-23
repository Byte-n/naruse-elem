const _defineProperty = function _defineProperty (obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    } return obj;
};

const _typeof = (obj) => typeof obj;

/** 常用的polyfill 直接加入引擎 */
export const babelPolyfill = { _defineProperty, typeof: _typeof };
