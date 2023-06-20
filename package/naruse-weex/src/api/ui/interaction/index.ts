import RAP from 'rap-sdk';
import { exceptType, MethodHandler } from '../../../../../naruse-share/index';

// 展示 toast
export const showToast = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'showToast')) return err;

    const { title, duration, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'showToast', success, fail, complete });

    if (typeof title !== 'string') {
        return handle.fail({ errMsg: 'title' });
    }

    try {
        RAP.toast.show(title, duration)
        handle.success();
    } catch (e) {
        handle.fail(e);
    }
}


// 隐藏 toast
export const hideToast = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'hideToast')) return err;

    const { success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'hideToast', success, fail, complete });

    try {
        RAP.toast.hide();
        handle.success();
    } catch (e) {
        handle.fail(e);
    }
}
