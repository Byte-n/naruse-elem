
interface showToast{
    (option?: showToast.Option): Promise<TaroGeneral.CallbackResult>
}

namespace showToast {
    interface Option {
      /** 提示的内容 */
      title: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 提示的延迟时间 */
      duration?: number
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 图标
       *
       * 可选值：
       * - 'success': 显示成功图标，此时 title 文本最多显示 7 个汉字长度;
       * - 'error': 显示失败图标，此时 title 文本最多显示 7 个汉字长度;
       * - 'loading': 显示加载图标，此时 title 文本最多显示 7 个汉字长度;
       * - 'none': 不显示图标，此时 title 文本最多可显示两行 */
      icon?: 'success' | 'error' | 'loading' | 'none'
      /** 自定义图标的本地路径，image 的优先级高于 icon */
      image?: string
      /** 是否显示透明蒙层，防止触摸穿透 */
      mask?: boolean
      /** 接口调用成功的回调函数 */
      success?: (res: TaroGeneral.CallbackResult) => void
    }
  }


declare module 'Naruse' {
    /** 显示消息提示框
     *
     * **注意**
     * - Naruse.showToast 应与 Naruse.hideToast 配对使用
     * @supported alipay, h5, weex
     * @example
     * ```tsx
     * Naruse.showToast({
     *   title: '成功',
     *   icon: 'success',
     *   duration: 2000
     * })
     * ```
     * @see https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html
     */
    const showToast = showToast;
}
