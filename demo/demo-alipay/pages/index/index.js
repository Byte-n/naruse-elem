import code from '../../naruse.dev.debug'
// import { ayRequireList } from '../../package/naurse-ay-polyfill'
import { Naruse, naruseInit } from '../../naruse-alipay/lib'


const _defineProperty = (obj, key, value) => {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
}

naruseInit({
  hotPuller: async (porps) => {
    return { code, ctx: {} }
  },
  baseCtx: () => ({ _defineProperty }),
})

Page({
  evetns: {},
  onLoad() {
  },
  qwer() {
    console.log('啊哈哈哈');
  },
  ccc(e) {
    console.log('啊哈哈哈');

    console.log(e);
  }
})