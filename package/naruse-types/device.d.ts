namespace setClipboardData {
    export interface Promised extends CallbackResult {
        /** 调用信息 */
        errMsg: string
        /** 剪贴板的内容 */
        data: string
    }
    export interface Option {
        /** 剪贴板的内容 */
        data: string
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (res: CallbackResult) => void
    }
}

namespace getClipboardData {
    export interface Promised extends CallbackResult {
        /** 调用信息 */
        errMsg: string
        /** 剪贴板的内容 */
        data: string
    }
    export interface Option {
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (res: SuccessCallbackOption) => void
    }
    interface SuccessCallbackOption {
        /** 剪贴板的内容 */
        data: string
    }
}


interface setClipboardData {
    (option: setClipboardData.Option): Promise<setClipboardData.Promised>
}

/**
 * 获取系统剪贴板内容
 */
interface getClipboardData {
    (res?: getClipboardData.Option): Promise<getClipboardData.Promised>
}


declare module 'Naruse' {
    let setClipboardData: setClipboardData;
    let getClipboardData: getClipboardData;
}