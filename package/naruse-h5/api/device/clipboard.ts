/**
 * 剪贴板部分的api参考了Chameleon项目的实现：
 *
 * setClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/setClipBoardData
 * getClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/getClipBoardData
 */

import { setStorage, setStorageSync, getStorageSync } from '../storage/index';
import { MethodHandler } from '../../../naruse-share/index';

const CLIPBOARD_STORAGE_NAME = 'naruse_clipboard';

document.addEventListener('copy', () => {
    setStorage({
        key: CLIPBOARD_STORAGE_NAME,
        data: window.getSelection()?.toString(),
    }).catch(e => {
        console.error(e);
    });
});

/**
  * 设置系统剪贴板的内容
  */
export const setClipboardData = ({ data, success, fail, complete }) => {
    const handle = new MethodHandler({ name: 'setClipboardData', success, fail, complete });
    try {
        setStorageSync(CLIPBOARD_STORAGE_NAME, data);
        /**
      * 已于 iPhone 6s Plus iOS 13.1.3 上的 Safari 测试通过
      * iOS < 10 的系统可能无法使用编程方式访问剪贴板，参考：
      * https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084
      */
        if (typeof document.execCommand === 'function') {
            const textarea = document.createElement('textarea');
            textarea.readOnly = true;
            textarea.value = data;
            textarea.style.position = 'absolute';
            textarea.style.width = '100px';
            textarea.style.left = '-10000px';
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            document.execCommand('copy');
            document.body.removeChild(textarea);
        } else if (typeof window.copy === 'function') {
            window.copy(data);
        } else {
            throw new Error('Unsupported Function');
        }
        return handle.success();
    } catch (e) {
        return handle.fail({ errMsg: e.message });
    }
};

/**
  * 获取系统剪贴板的内容
  */
export const getClipboardData = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getClipboardData', success, fail, complete });
    try {
        const data = getStorageSync(CLIPBOARD_STORAGE_NAME);
        return handle.success({ data });
    } catch (e) {
        return handle.fail({ errMsg: e.message });
    }
};

