import { Component, navigateToWebPage } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = { width: '800rpx', height: '506rpx', background: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const tradePcOrderTemMain = { width: '800rpx', height: '500rpx', position: 'relative' };
const topPart = { width: '800rpx', height: '390rpx' };
const bottomPart = { width: '800rpx', height: '110rpx', position: 'relative' };
const bottomImg = { width: '800rpx', height: '110rpx' };
const bottomClickPart = { width: '400rpx', height: '110rpx', position: 'absolute', top: '0' };
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10rpx 40rpx',
    border: '2rpx solid',
    borderRadius: '50rpx',
    position: 'absolute',
    bottom: '-100rpx',
    left: '230px',
};

// 用户信息
const userInfo = $userInfoChanger.getUserInfo();
// 广告信息
const adInfo = $adImport.adData.results[0];
console.log('ad_ adInfo', adInfo);
console.log('ad_ userInfo', userInfo);
const {
    topImgUrl,
    bottomImgUrl,
    orderQuarterLink,
    orderYearLink,
    leftButton,
    rightButton
} = adInfo.user_define.body;

export default class TradePcOrderTem extends Component {
    constructor() {
        this.state = { isShow: true };
    }

    componentDidMount() {
        buryAdPageView();
    }

    jumpOrderLink = (type) => {
        let url = type === 'quarter' ? orderQuarterLink : orderYearLink;
        let beaconText = type === 'quarter' ? leftButton : rightButton;
        buryAdOrderNow(beaconText);
        navigateToWebPage({ url });
    }

    colsePopup = () => {
        $adImport.uninstall();
        this.setState({ isShow: false });
    }

    render() {
        const { isShow } = this.state;
        return (
            <view>
                {
                    isShow && (
                        <view style={tradePcContainer} onClick={this.colsePopup}>
                            <view style={tradePcOrderTem}>
                                <view style={tradePcOrderTemMain}>
                                    <image style={topPart} src={topImgUrl} />
                                    <view style={bottomPart}>
                                        <image style={bottomImg} src={bottomImgUrl} />
                                        <view style={{ ...bottomClickPart, left: '0' }} onClick={() => this.jumpOrderLink('quarter')}></view>
                                        <view style={{ ...bottomClickPart, right: '0' }} onClick={() => this.jumpOrderLink('year')}></view>
                                    </view>
                                    <text style={closeStyle} onClick={this.colsePopup}>{'关闭'}</text>
                                </view>
                            </view>
                        </view>
                    )
                }
            </view>
        )
    }
}