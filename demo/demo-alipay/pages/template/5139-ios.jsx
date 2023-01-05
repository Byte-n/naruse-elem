const baseUrl = 'https://q.aiyongtech.com/trade/web/images/caro/testModal/';

<view style={{ position: 'relative' }}>
  <image src={`${baseUrl}特权.png`} style={{ width: '100%', height: '665rpx', marginTop: '36rpx' }} />
  <view style={{ position: 'relative' }}>
    <view style={{ width: '508rpx', position: 'absolute', bottom: '26rpx', fontSize: '28rpx', color: '#B58535', left: '50%', transform: 'translateX(-50%)' }}>累计已有 3,129,847 个卖家选择爱用商品</view>
  </view>
  <image src={`${baseUrl}评价.png`} style={{ width: '100%', height: '933rpx' }} />
  <view style={{ height: '120rpx' }}></view>
  <image
    src={`${baseUrl}ios按钮.png`} onClick={[
      <contactWW text='亲，我想升级爱用商品高级功能！https://tb.cn/H26EeGw' />,
    ]}
    style={{ width: '100%', height: '110rpx', position: 'fixed', bottom: 10, zIndex: 10, left: 0 }} />
</view>