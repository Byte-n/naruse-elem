const ww = require('../qwer.js');

Page({
  data: {},
  onLoad(query) {
    console.log('page onLoad', query)
  },
      qwer() {
      console.log('事件触发');
    },
  method: {
    qwer() {
      console.log('事件触发');
    }
  },
  onShow() {
    console.log(JSON)
  }
})