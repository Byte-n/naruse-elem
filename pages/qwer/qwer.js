<<<<<<< HEAD
const runtime = require("./runtime.esm")
=======
const ww = require('../qwer.js');
>>>>>>> temp1

Page({
  data: {},
  onLoad(query) {
<<<<<<< HEAD

    
    console.log('page onLoad', query)
    
  },
  onShow() {
    console.log(JSON)
    my.runtime = runtime
=======
    console.log('page onLoad', query)
  },
      qwer() {
      console.log('事件触发');
    },
  method: {
    qwer(e) {
      console.log(e)
    }
  },
  onShow() {
    console.log(JSON)
>>>>>>> temp1
  }
})