// 商品安卓
const item = { width: '750rpx', height: '100%', position: 'relative', overflow: 'scroll' };
const itemAndroidbg = { width: '750rpx', height: '1155rpx' };
const itemChoseOrderType = { width: '750rpx', height: '260rpx', position: 'absolute', top: '800rpx', display: 'flex', justifyContent: 'space-around' };
const itemChoseOrderMonthNum = { width: '210rpx', height: '260rpx' };
const itemFooterPayAdvancedVersion = { width: '750rpx', height: '114rpx', position: 'fixed', bottom: '0' };
// 商品ios
const iosHeaderContent = { width: '750rpx', height: '460rpx' };
const iosDiscountBtn = { width: '700rpx', height: '133rpx', textAlign: 'center', marginTop: '40rpx', marginBottom: '20rpx' };
const iosEnsureTip = { width: '391rpx', height: '30rpx', marginRight: '25rpx', marginBottom: '24rpx' };
const iosFooterContent = { width: '750rpx', height: '1387rpx' };


// 用户信息
const userInfo = $userInfoChanger.getUserInfo();
// 广告信息
const adInfo = $adImport.adData.results[0];

/**
 * 商品续费模板
 */
class continueBuyAdvancedVersion extends NaruseComponent {
    // constructor () {
    //     this.state = {};
    // };

    isIOS () {
        const { platform } = my.getSystemInfoSync();
        return ['iOS', 'ios'].includes(platform);
    };

    orderChose () {
        
    }

    render() {
        const { body } = adInfo.user_define;
        console.log('body===', adInfo, body);
        return (
            <view style={{ width: '750rpx', height: '110vh', background: '#FFF' }}>
                {
                    !this.isIOS() ? (
                        <view style={item}>
                            <image style={itemAndroidbg} src={adInfo.img_path} />
                            <view style={itemChoseOrderType}>
                                <image onClick={this.orderChose} style={itemChoseOrderMonthNum} src={adInfo.img_path} />
                                <image style={itemChoseOrderMonthNum} src={adInfo.img_path} />
                                <image style={itemChoseOrderMonthNum} src={adInfo.img_path} />
                            </view>
                            <view>
                                <image style={itemFooterPayAdvancedVersion} src={adInfo.img_path} />
                            </view>
                        </view>
                    ) : (
                        <view>
                            <image style={iosHeaderContent} src={adInfo.img_path} />
                            <image style={iosDiscountBtn} src={adInfo.img_path} />
                            <image style={iosEnsureTip} src={adInfo.img_path} />
                            <image style={iosFooterContent} src={adInfo.img_path} />
                        </view>
                    )
                }
            </view>
        );
    };
}