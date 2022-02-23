const baseUrl = 'https://q.aiyongtech.com/trade/web/images/caro/testModal/';

<view style={{ position: 'relative' }}>
  <view style={{ maxWidth: '100%', background: '#F4C856', borderRadius: '1rpx', padding: '28rpx' }}>
    <view
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '32rpx',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: 500,
        color: '#ED3C23',
      }}>
      <view onClick={[
        <contactWW text='qwer' />
      ]}>
        您的试用模式剩余
        <dynamicText>
          赠送剩余过期天数
        </dynamicText>
        天
        </view>
      <image src={`${baseUrl}图标.png`} style={{ width: '220rpx', height: '40rpx' }} />
    </view>
  </view>
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
    style={{ width: '100%', height: '110rpx', position: 'fixed', bottom: 0, zIndex: 10, left: 0 }} />
</view>