namespace navigateTo {
    interface Option {
      /** 需要跳转的应用内非 tabBar 的页面的路径, 路径后可以带参数。参数与路径之间使用 `?` 分隔，参数键与参数值用 `=` 相连，不同参数用 `&` 分隔；如 'path?key=value&key2=value2' */
      url: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult & { eventChannel: EventChannel }) => void
    }
}
interface navigateTo {
    (option: navigateTo.Option): void;
}

namespace navigateToWebPage {
    interface Option {
      /** 需要打开的外面页面地址，http或者https，在小程序中调用时请注意白名单限制 */
      url: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
}
interface navigateBack {
    (option: navigateBack.Option): void;
}

namespace navigateBack {
    interface Option {
      /** 返回的页面数，如果 delta 大于现有页面数，则返回到首页。 */
      delta: number
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
}
interface navigateToWebPage {
    (option: navigateToWebPage.Option): void;
}

declare module 'Naruse' {
    let navigateTo: navigateTo;
    let navigateToWebPage: navigateToWebPage;
    let navigateBack: navigateBack;
    let renderComponentOnPage: (pageName: string, component: any) => void;
}