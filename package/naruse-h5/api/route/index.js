import { MethodHandler } from '../../../naruse-share/handler';
import { exceptType } from '../../../naruse-share/assert';

/**
 * @description 跳转到其他页面
 * @author CHC
 * @date 2022-03-30 18:03:08
 * @param {*} options
 * @returns {*}
 */
export const navigateTo = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'navigateTo')) return err;

    const { url, success, fail } = options;
    const handle = new MethodHandler({ name: 'navigateTo', success, fail });

    if (typeof url !== 'string') {
        return handle.fail({ errMsg: 'url' });
    }

    window.location.href = url;
    return handle.success();
};


/**
 * @description 打开外部页面
 * @author CHC
 * @date 2022-03-30 18:03:03
 * @param {*} options
 */
export const navigateToWebPage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'navigateToWebPage')) return err;

    const { url, success, fail } = options;
    const handle = new MethodHandler({ name: 'navigateToWebPage', success, fail });

    if (typeof url !== 'string') {
        return handle.fail({ errMsg: 'url' });
    }

    window.open(url);
    return handle.success();
};


/**
 * @description 返回路由
 * @author CHC
 * @date 2022-03-30 18:03:18
 * @param {*} options
 * @returns {*}
 */
export const navigateBack = (options = {}) => {
    let err;
    if (err = exceptType(options, 'object', 'navigateBack')) return err;

    const { delta = 1, success, fail } = options;
    const handle = new MethodHandler({ name: 'navigateBack', success, fail });

    if (typeof delta !== 'number') {
        return handle.fail({ errMsg: 'delta must a number' });
    }

    window.history.go(-Number(delta));

    return handle.success();
};
