interface CallbackResult {
    /** 错误信息 */
    errMsg: string
}

namespace setStorage {
    export interface Option {
        /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
        data: any
        /** 本地缓存中指定的 key */
        key: string
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (res: CallbackResult) => void
    }
}

namespace removeStorage {
    export interface Option {
        /** 本地缓存中指定的 key */
        key: string
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (res: CallbackResult) => void
    }
}

namespace getStorageInfoSync {
    export interface Option {
        /** 当前占用的空间大小, 单位 KB */
        currentSize: number
        /** 当前 storage 中所有的 key */
        keys: string[]
        /** 限制的空间大小，单位 KB */
        limitSize: number
    }
}

namespace getStorageInfo {
    export interface Option {
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (option: SuccessCallbackOption) => void
    }

    interface SuccessCallbackOption {
        /** 当前占用的空间大小, 单位 KB */
        currentSize: number
        /** 当前 storage 中所有的 key */
        keys: string[]
        /** 限制的空间大小，单位 KB */
        limitSize: number
    }
}

namespace getStorage {
    export interface Option<T> {
        /** 本地缓存中指定的 key */
        key: string
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (result: SuccessCallbackResult<T>) => void
    }
    export interface SuccessCallbackResult<T> extends CallbackResult {
        /** key对应的内容 */
        data: T
        /** 调用结果 */
        errMsg: string
    }
}

namespace clearStorage {
    export interface Option {
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: CallbackResult) => void
        /** 接口调用失败的回调函数 */
        fail?: (res: CallbackResult) => void
        /** 接口调用成功的回调函数 */
        success?: (res: CallbackResult) => void
    }
}


/** Naruse.setStorage 的同步版本  */
interface setStorageSync {
    (
        /** 本地缓存中指定的 key */
        key: string,
        /** 需要存储的内容。只支持原生类型、Date、及能够通过`JSON.stringify`序列化的对象。 */
        data: any,
    ): void
}

/** 将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。除非用户主动删除或因存储空间原因被系统清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。  */
interface setStorage { (option: setStorage.Option): Promise<CallbackResult> }

/**
 * 从本地缓存中同步移除指定 key 。
 */
interface removeStorageSync { (key: string): void }

/** 从本地缓存中移除指定 key
 * @supported weapp, h5, rn
 * @example
 * ```tsx
 * Naruse.removeStorage({
 *   key: 'key',
 *   success: function (res) {
 *     console.log(res)
 *   }
 * })
 * ```
 *
 * ```tsx
 * try {
 *   Naruse.removeStorageSync('key')
 * } catch (e) {
 *   // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorage.html
 */
interface removeStorage { (option: removeStorage.Option): Promise<CallbackResult> }

/** Naruse.getStorage 的同步版本
 * @supported weapp, h5
 * @example
 * ```tsx
 * Naruse.getStorage({
 *   key: 'key',
 *   success: function (res) {
 *     console.log(res.data)
 *   }
 * })
 * ```
 *
 * ```tsx
 * try {
 *   var value = Naruse.getStorageSync('key')
 *   if (value) {
 *     // Do something with return value
 *   }
 * } catch (e) {
 *   // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageSync.html
 */
interface getStorageSync<T = any> {
    (
        /** 本地缓存中指定的 key */
        key: string,
    ): T
}
/** Naruse.getStorageInfo 的同步版本
 * @supported weapp, h5
 * @example
 * ```tsx
 * Naruse.getStorageInfo({
 *   success: function (res) {
 *     console.log(res.keys)
 *     console.log(res.currentSize)
 *     console.log(res.limitSize)
 *   }
 * })
 * ```
 *
 * ```tsx
 * try {
 *   const res = Naruse.getStorageInfoSync()
 *   console.log(res.keys)
 *   console.log(res.currentSize)
 *   console.log(res.limitSize)
 * } catch (e) {
 *   // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageInfoSync.html
 */
interface getStorageInfoSync { (): getStorageInfoSync.Option }

/** 异步获取当前storage的相关信息
 * @supported weapp, h5, rn
 * @example
 * ```tsx
 * Naruse.getStorageInfo({
 *   success: function (res) {
 *     console.log(res.keys)
 *     console.log(res.currentSize)
 *     console.log(res.limitSize)
 *   }
 * })
 * ```
 *
 * ```tsx
 * try {
 *   const res = Naruse.getStorageInfoSync()
 *   console.log(res.keys)
 *   console.log(res.currentSize)
 *   console.log(res.limitSize)
 * } catch (e) {
 *   // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorageInfo.html
 */
interface getStorageInfo { (option?: getStorageInfo.Option): Promise<CallbackResult> }

/** 从本地缓存中异步获取指定 key 的内容
 * @supported weapp, h5, rn
 * @example
 * ```tsx
 * Naruse.getStorage({
 *   key: 'key',
 *   success: function (res) {
 *     console.log(res.data)
 *   }
 * })
 * ```
 *
 * ```tsx
 * try {
 *   var value = Naruse.getStorageSync('key')
 *   if (value) {
 *     // Do something with return value
 *   }
 * } catch (e) {
 *   // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.getStorage.html
 */
interface getStorage { <T = any>(option: getStorage.Option<T>): Promise<getStorage.SuccessCallbackResult<T>> }

/** Naruse.clearStorage 的同步版本
 * @supported weapp, h5
 * @example
 * ```tsx
 * Naruse.clearStorage()
 * ```
 *
 * ```tsx
 * try {
 *   Naruse.clearStorageSync()
 * } catch(e) {
 * // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorageSync.html
 */
interface clearStorageSync { (): void }

/** 清理本地数据缓存
 * @supported weapp, h5, rn
 * @example
 * ```tsx
 * Naruse.clearStorage()
 * ```
 *
 * ```tsx
 * try {
 *   Naruse.clearStorageSync()
 * } catch(e) {
 *   // Do something when catch error
 * }
 * ```
 * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.clearStorage.html
 */
interface clearStorage { (option?: clearStorage.Option): Promise<CallbackResult> }




declare module 'Naruse' {
    let setStorageSync: setStorageSync;
    let setStorage: setStorage;
    let removeStorageSync: removeStorageSync;
    let removeStorage: removeStorage;
    let getStorageSync: getStorageSync;
    let getStorage: getStorage;
    let getStorageInfoSync: getStorageInfoSync;
    let getStorageInfo: getStorageInfo;
    let clearStorageSync: clearStorageSync;
    let clearStorage: clearStorage;
}