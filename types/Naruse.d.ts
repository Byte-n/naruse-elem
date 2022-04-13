
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




interface ComponentLifecycle<P, S, SS = any> {
  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  componentDidMount?(): void;
  /**
   * @description 暂未实现
   * Called to determine whether the change in props and state should trigger a re-render.
   *
   * `Component` always returns true.
   * `PureComponent` implements a shallow comparison on props and state and returns true if any
   * props or states have changed.
   *
   * If false is returned, `Component#render`, `componentWillUpdate`
   * and `componentDidUpdate` will not be called.
   */
  shouldComponentUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): boolean;
  /**
   * Called immediately before a component is destroyed. Perform any necessary cleanup in this method, such as
   * cancelled network requests, or cleaning up any DOM elements created in `componentDidMount`.
   */
  componentWillUnmount?(): void;
  /**
   * Called immediately after updating occurs. Not called for the initial render.
   *
   * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
   */
  componentDidUpdate?(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot?: SS): void;
  /**
   * @deprecated 暂未实现
   */
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
}

interface CallbackResult {
  /** 错误信息 */
  errMsg: string
}


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



declare module 'Naruse' {
  interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }
  export class Component<P, S> {
    readonly props: Readonly<P> & Readonly<{ children?: any | undefined }>;
    state: Readonly<S>;

    constructor(props: Readonly<P>);

    setState<K extends keyof S>(
      state:
        | ((prevState: Readonly<S>, props: Readonly<P>) => Pick<S, K> | S | null)
        | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;

    /**
     * @deprecated
     */
    forceUpdate(callBack?: () => void): void;

    render(): any;
  }

  export interface setClipboardData {
    (option: setClipboardData.Option): Promise<setClipboardData.Promised>
  }

  /**
   * 获取系统剪贴板内容
   */
  interface getClipboardData {
    (res?: getClipboardData.Option): Promise<getClipboardData.Promised>
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

  /** Naruse.removeStorage 的同步版本
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
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/storage/wx.removeStorageSync.html
   */
  interface removeStorageSync {
    (
      /** 本地缓存中指定的 key */
      key: string,
    ): void
  }

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

}