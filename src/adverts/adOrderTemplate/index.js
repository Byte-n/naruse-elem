const templateMainStyle = { width: '750rpx', height: '100%' };
const firstTemStyle = { width: '750rpx', height: '750rpx', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const firstTemImgStyle = { width: '700rpx', height: '700rpx' };
const secondTemStyle = { marginTop: '10rpx', position: 'relative' };
const secondTemImgStyle = { width: '750rpx', height: '2025rpx' };
const orderBtnStyle = { width: '750rpx', height: '124rpx', position: 'absolute', top: '100rpx' };
const iosBtnStyle = { width: '700rpx', height: '124rpx' };
const androidBtnStyle = { display: 'flex', justifyContent: 'space-around' };
const androidYearBtnStyle = { width: '340rpx', height: '124rpx' };
const androidQuarterBtnStyle = { width: '340rpx', height: '100rpx', marginTop: '24rpx' };

// 用户信息
const userInfo = $userInfoChanger.getUserInfo()
// 广告信息
const adInfo = $adImport.adData.results[0];
// 订购地址
const orderQuarterLink = 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301155305%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975540%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=14A525439F81BBA0EA8C790607D732F9&spm=a313p.266.ei5lud.1373001755278&short_name=Y4.7rQrL&app=chrome';
const orderYearLink = 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301155305%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975540%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=A1D51A1D1B2DEC8C558E442A5036FE99&spm=a313p.266.ei5lud.1371656866520&short_name=Y4.7kyWZ&app=chrome';
// 图片地址
const mainBackgroundImg = 'http://q.aiyongtech.com/ad/images/bmV3X3RlbXBsYXRl_1646981993571.png';
const iosOrderBtn = 'http://q.aiyongtech.com/ad/images/aW9zX2p1bXBfc2VydmljZV9idG4=_1646982081811.gif';
const ardroidOrderYearBtn = 'http://q.aiyongtech.com/ad/images/b25lX3F1YXJ0ZXJfcHJpY2VfYnRu_1646982094639.png';
const ardroidOrderQuarterBtn = 'http://q.aiyongtech.com/ad/images/b25lX3llYXJfcHJpY2VfYnRu_1646982097169.gif';

console.log('ad_ adInfo', adInfo);
console.log('ad_ userInfo', userInfo);


/**
 * 广告系统新增模板
 */
class AdOrderTemplate extends NaruseComponent {
    constructor() {
        this.state = {
            dialogVisible: true,
            isIOS: false,
        };
    }
    
    componentDidMount() {
        this.setState({ isIOS: this.isIOS() });
    }

    isIOS() {
        const { platform } = my.getSystemInfoSync();
        return ['iOS', 'ios'].includes(platform)
    };

    iosOpenService() {
        const { body } = adInfo.user_define;
        const text = body.service;
        console.log('ad_message', text);
        $openChat.contactCustomerService(text);
        console.log('adBeacon2222');
        $adSensorsBeacon.adOrderNowBeacon(adInfo, '/跳客服', '');
    }

    render() {
        const { dialogVisible, isIOS } = this.state;
        const jumpClick = function (url) {
            console.log('ad_jumplink====');
            return function () {
                console.log('ad_url====', url);
                my.qn.navigateToWebPage({ url: url });
                console.log('adBeacon1111');
                $adSensorsBeacon.adOrderNowBeacon(adInfo, url == orderQuarterLink ? '52/季度' : '148/年', '');
            }
        };
        if (dialogVisible) {
            return (<view style={templateMainStyle}>
                <view style={firstTemStyle}>
                    <image style={firstTemImgStyle} src={adInfo.img_path} />
                </view>
                <view style={secondTemStyle}>
                    <image style={secondTemImgStyle} src={mainBackgroundImg} />
                    <view style={orderBtnStyle}>
                        {
                            isIOS ? <view style={androidBtnStyle}><image onClick={this.iosOpenService} style={iosBtnStyle} src={iosOrderBtn} /></view> : (
                                <view style={androidBtnStyle}>
                                    <view>
                                        <image style={androidQuarterBtnStyle} src={ardroidOrderYearBtn} onClick={jumpClick(orderQuarterLink)} />
                                    </view>
                                    <view>
                                        <image style={androidYearBtnStyle} src={ardroidOrderQuarterBtn} onClick={jumpClick(orderYearLink)} />
                                    </view>
                                </view>
                            )
                        }
                    </view>
                </view>
            </view>)
        }
        return;
    }
}