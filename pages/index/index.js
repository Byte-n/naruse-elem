import item from '../template/output.js'
Page({
  data: {
    item,
  },
  onLoad(query) {
    console.log('page onLoad', query)
  },
  onShow() {}
})