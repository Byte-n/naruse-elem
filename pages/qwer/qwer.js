const runtime = require("./runtime.esm")

Page({
  data: {},
  onLoad(query) {

    
    console.log('page onLoad', query)
    
  },
  onShow() {
    console.log(JSON)
    my.runtime = runtime
  }
})