import { MethodHandler, exceptType } from '../../../../naruse-share/index';
import RAP from 'rap-sdk';

const navigator = RAP.navigator;


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

    const { url, success, fail, complete, ...other } = options;
    const handle = new MethodHandler({ name: 'navigateTo', success, fail, complete });

    if (typeof url !== 'string') {
        return handle.fail({ errMsg: 'url' });
    }

    const newUrl = `rap:///${url}`;

    return navigator.push({
        url: newUrl,
        ...other
    }).then(() => {
        return handle.success();
    }).catch(({ msg }) => {
        return handle.fail({ errMsg: msg });
    })
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

    const { url, success, fail, complete, ...other } = options;
    const handle = new MethodHandler({ name: 'navigateToWebPage', success, fail, complete });

    if (typeof url !== 'string') {
        return handle.fail({ errMsg: url });
    }

    return navigator.push({
        url,
        ...other
    }).then(() => {
        return handle.success();
    }).catch(({ msg }) => {
        return handle.fail({ errMsg: msg });
    })

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

    const { delta, success, fail, complete, other } = options;
    const handle = new MethodHandler({ name: 'navigateBack', success, fail, complete });

    if (typeof delta !== 'number') {
        return handle.fail({ errMsg: 'delta must a number' });
    }

    return navigator.pop({
        index: delta,
        ...other
    }).then(() => {
        return handle.success();
    }).catch(({ msg }) => {
        return handle.fail({ errMsg: msg });
    });
};
