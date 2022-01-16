import node from '../template/output'

Page({
  data: {
    item: node,
    qwer:{
      contactWW() {
        console.log('啊哈哈哈');
      }
    },

  },
  onLoad(query) {
    console.log('page onLoad', query)
  },
  onShow() {},
})