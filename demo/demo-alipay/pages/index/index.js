import code from '../../../../dist/naruse.dev.debug'
import { ayRequireList } from '../../package/naurse-ay-polyfill'
import { Naruse, naruseInit, renderComponentOnPageWithCode } from '../../../../package/naruse-alipay/build/lib'


naruseInit({
  hotPuller: async (porps) => {
    return { code, ctx: {} }
  },
  baseCtx: () => ayRequireList,
})


Page({
  evetns: {},
  onLoad() {
    console.log('123');
  },
  qwer() {
    console.log('啊哈哈哈');
  },
  ccc(e) {
    console.log('啊哈哈哈');

    console.log(e);
  }
})