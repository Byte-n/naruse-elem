

Page({
  data: {},
  onLoad(query) {
    console.log('page onLoad', query)
  },
  qwer() {
    my.navigateTo({ url: '/pages/qwer/qwer' })
  },
  gotoIndex() {
    my.navigateTo({ url: '/pages/index/index' })
  }
})