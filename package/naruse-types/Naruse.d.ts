
interface ComponentLifecycle<P, S, SS = any> {
  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  componentDidMount?(): void;

  shouldComponentUpdate?(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
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
  componentDidUpdate?(): void;
  /**
   * @deprecated 暂未实现
   */
  componentWillReceiveProps?(nextProps: Readonly<P>, nextContext: any): void;
  /**
   * 强制刷新render函数
   */
  forceUpdate(callback: () => void): void;
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

    forceUpdate(callBack?: () => void): void;

    render(): any;
  }

  let Component = Component;
}
