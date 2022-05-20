

Page({
  data: {},
  onLoad(query) {
    this.onUnload = () => {
      console.log('要卸载拉')
    }
    this.onPageScroll = () => {
      console.log('滚动滚动！')
    }
    console.log(this);
  },
  event: {
    onBack() {
      console.log('123');
    }
  }
})