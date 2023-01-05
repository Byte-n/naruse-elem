declare module 'Naruse' {

  namespace getImageInfo {
    interface Option {
      /** 图片的路径，可以是相对路径、临时文件路径、存储文件路径、网络图片路径 */
      src: string
      /** 接口调用结束的回调函数（调用成功、失败都会执行） */
      complete?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用失败的回调函数 */
      fail?: (res: TaroGeneral.CallbackResult) => void
      /** 接口调用成功的回调函数 */
      success?: (result: SuccessCallbackResult) => void
    }
    interface SuccessCallbackResult extends TaroGeneral.CallbackResult {
      /** 图片原始高度，单位px。不考虑旋转。 */
      height: number
      /** [拍照时设备方向](http://sylvana.net/jpegcrop/exif_orientation.html)
       * @default "up"
       */
      orientation: keyof Orientation
      /** 图片的本地路径 */
      path: string
      /** 图片格式 */
      type: string
      /** 图片原始宽度，单位px。不考虑旋转。 */
      width: number
      /** 调用结果 */
      errMsg: string
    }

    interface Orientation {
      /** 默认方向（手机横持拍照），对应 Exif 中的 1。或无 orientation 信息。 */
      'up'
      /** 同 up，但镜像翻转，对应 Exif 中的 2 */
      'up-mirrored'
      /** 旋转180度，对应 Exif 中的 3 */
      'down'
      /** 同 down，但镜像翻转，对应 Exif 中的 4 */
      'down-mirrored'
      /** 同 left，但镜像翻转，对应 Exif 中的 5 */
      'left-mirrored'
      /** 顺时针旋转90度，对应 Exif 中的 6 */
      'right'
      /** 同 right，但镜像翻转，对应 Exif 中的 7 */
      'right-mirrored'
      /** 逆时针旋转90度，对应 Exif 中的 8 */
      'left'
    }
  }

  /** 获取图片信息。网络图片需先配置download域名才能生效。
   * @supported weapp, h5, rn, alipay, swan, tt
   * @example
   * ```tsx
   * Naruse.getImageInfo({
   *   src: 'images/a.jpg',
   *   success: function (res) {
   *     console.log(res.width)
   *     console.log(res.height)
   *   }
   * })
   * ```
   * @see https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
   */
  function getImageInfo(option: getImageInfo.Option): Promise<getImageInfo.SuccessCallbackResult>;
}
