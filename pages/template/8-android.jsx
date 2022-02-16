const baseUrl = 'https://q.aiyongtech.com/trade/web/images/';

<view style={{position:'realtive',backgroundColor:'#fff'}}>
  <image style={{width:'750rpx',height:'815rpx'}} src={`${baseUrl}common-8-1.png`} />
  <view style={{textAlign:'center',marginTop:'20rpx'}}>
    <image onClick={[
        <gotoWebPage url="https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220215182827%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007932968%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=A709B431B04DE5FCED20A4FC7D530F64&spm=a313p.266.ei5lud.1367499660626&short_name=Y4.7dPqO&app=chrome"/>
      ]} 
      style={{width:'335rpx',height:'100rpx',marginRight:'20rpx'}} src={`${baseUrl}android-btn-1.png`} />
    <image onClick={[
        <gotoWebPage url="https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220215182925%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007932197%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=E017D5FF6BF608C6EB3C60DD9F7FA343&spm=a313p.266.ei5lud.1365827934436&short_name=Y4.7fx4K&app=chrome"/>
      ]} 
    style={{width:'335rpx',height:'124rpx'}} src={`${baseUrl}android-btn-2.png`} />
  </view>
  <image style={{width:'353rpx',height:'28rpx',margin:'30rpx',marginTop:'20rpx'}} src={`${baseUrl}common-bottom-2.png`} />
  <image style={{width:'750rpx',height:'1734rpx'}} src={`${baseUrl}common-bottom-3.png`} />
</view>