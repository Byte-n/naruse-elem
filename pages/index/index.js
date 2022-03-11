import code from '../../dist/naruse.dev.debug'
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