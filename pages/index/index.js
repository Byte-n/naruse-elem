import code from '../../dist/naruse.dev.debug'
import { ayRequireList } from '../../package/naurse-ay-polyfill'
import { Naruse, naruseInit,renderComponentOnPageWithCode } from '../../package/naruse-alipay/build/lib'


naruseInit({
  hotPuller: async (porps) => {
    return { code, ctx: {} }
  },
  baseCtx: () => ayRequireList,
})


Page({
  qwer(){
    renderComponentOnPageWithCode('pages/my/my', code, { qwer: 'qwer' })
  }
})