const baseUrl = '//q.aiyongtech.com/trade/web/img/custom-ad-imgs/';
const imgStyle = { width: '216rpx', height: '98rpx' };
const jumpLink = 'https://c.tb.cn/Y4.';

<view>
    <view style={{ position: 'relative', backgroundColor: '#def1ff', width: '100%', height: '100vh' }}>
        <image src={`${baseUrl}安卓无按钮.png`} style={{ width: '752rpx', height: '1392rpx' }} />
        <view style={{ display: 'flex', justifyContent: 'space-around', position: 'absolute', top: '744rpx', width: '95%', left: '50%', transform: 'translate(-50%, 0)' }}>
            <image
                src={`${baseUrl}order_members_quarter_btn.png`}
                style={imgStyle}
                onClick={[
                    <gotoWebPage url={`${jumpLink}SFC76`} isShopLink={true} />
                  ]}
            />
            <image
                src={`${baseUrl}order_members_year_btn.png`}
                style={imgStyle}
                onClick={[
                    <gotoWebPage url={`${jumpLink}SvhWK`} isShopLink={true} />
                  ]}
            />
            <image
                src={`${baseUrl}order_members_harf_year_btn.png`}
                style={imgStyle}
                onClick={[
                    <gotoWebPage url={`${jumpLink}SN4y5`} isShopLink={true} />
                  ]}
            />
        </view>
    </view>
</view>