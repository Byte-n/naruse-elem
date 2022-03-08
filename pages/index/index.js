import code from '../../dist/index'
import * as $userInfoChanger from '../../package/naurse-app-profill/userInfo'
import momemt from 'moment';
Page({
  data: {
    code,
  },
  onLoad(query) {
    this.requireList = {
      $userInfoChanger,
      $momemt: momemt,
    };
  },
  onShow() {
  }
})