import { MethodHandler } from '../../../../naruse-share/index';
import RAP from 'rap-sdk'

const { clipboard } = RAP

/**
  * 设置系统剪贴板的内容
  */
export const setClipboardData = ({ data, success, fail, complete }) => {
    const handle = new MethodHandler({ name: 'setClipboardData', success, fail, complete });

    if (typeof data !== 'string') {
        return handle.fail({ errMsg: 'data' });
    }

    clipboard.setString(data);
    return handle.success({ data, errMsg: '' });
 };

/**
  * 获取系统剪贴板的内容
  */
export const getClipboardData = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getClipboardData', success, fail, complete });
    return new Promise((resolve) => {
        clipboard.getString((res: any) => {
            const { data } = res;
            resolve(handle.success({ data }));
        })
    })
};

