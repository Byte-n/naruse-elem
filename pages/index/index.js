import item from '../template/output.js'
Page({
  data: {
    item,
    ww: 0,
  },
  onLoad(query) {
    console.log('page onLoad', query)
    const ww = require;
    // setTimeout(() => {
    //   console.log(ww('../qwer/qwer.js'))
    // }, 6000);
  },
  qwer(){
    const pc =require(`${this.data.ww}`);
    console.log(pc);
    if (typeof pc === 'function') {
      console.log(pc)
    }
  },
  qqqq(v) {
    this.setData({
      ww: v.detail.value,
    })
  },
  onShow() {}
})