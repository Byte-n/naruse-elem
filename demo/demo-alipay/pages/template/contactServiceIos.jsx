const baseUrl = '//q.aiyongtech.com/trade/web/img/contact_service_';
const baseUrlOther = '//q.aiyongtech.com/trade/web/img/custom-ad-imgs/contact_service_';
const ImgStyle = { width: '95%', textAlign: 'center' };

<view style={{ position: 'relative', width: '100%' }}>
    <view style={{ maxWidth: '100%', backgroundColor: '#ED3C23', height: '45rpx', height: '80rpx', lineHeight: '80rpx' }}>
        <view style={{ marginLeft: '24rpx', color: '#FFF' }}> 
        您的试用模式剩余
        <dynamicText>
        赠送剩余过期天数
        </dynamicText>
        天结束
        </view>
        <image src={`${baseUrl}tip.jpg`} style={{ width: '222rpx', height: '40rpx', position: 'absolute', top: '20rpx', right: '20rpx', borderRadius: '20rpx' }} />
    </view>
    <view style={{ width: '100%', textAlign: 'center', marginTop: '20rpx' }}>
        <image src={`${baseUrlOther}advertising_hd.png`} style={{...ImgStyle, height: '752rpx'}} />
        <view style={{ width: '95%', height: '63rpx', fontWeight: '500', fontSize: '46rpx',marginTop: '38rpx', color: '#ED3C23', lineHeight: '63rpx', textAlign: 'center', display: 'inline-block' }}>恭喜你被抽中为幸运用户！</view>
        <view style={{ width: '95%', height: '45rpx', fontSize: '26rpx', fontWeight: '500', color: '#333', lineHeight: '37rpx', display: 'inline-block' }}>
            联系客服获取专享优惠，续订一年每天仅需
            <view style={{ color: '#ED3C23', fontSize: '37rpx', display: 'inline-block' }}>0.37</view>
            元
        </view>
        <image
            src={`${baseUrl}btn.gif`}
            style={{...ImgStyle, height: '100rpx', marginTop: '20rpx' }}
            onClick={[
                <contactWW text='亲，我想升级爱用商品高级功能！https://tb.cn/H26EeGw' />,
            ]}
        />
        <image src={`${baseUrlOther}evaluation_hd.png`} style={{...ImgStyle, marginTop: '58rpx'}} />
    </view>
</view>