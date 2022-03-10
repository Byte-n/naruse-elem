import code from '../../dist/index'
import { ayRequireList } from '../../package/naurse-ay-polyfill'

Page({
  data: {
    code,
  },
  onLoad(query) {
    this.requireList = ayRequireList
  },
  onShow() {
  }
})