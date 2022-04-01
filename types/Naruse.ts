
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
  class Component<P, S> {
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

  interface setClipboardData {
    (option: setClipboardData.Option): Promise<setClipboardData.Promised>
  }

  /**
   * 获取系统剪贴板内容
   */
  interface getClipboardData {
    (res?: getClipboardData.Option): Promise<getClipboardData.Promised>
  }

}