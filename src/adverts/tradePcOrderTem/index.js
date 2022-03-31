import { Component, navigateToWebPage } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';

// 模板样式
const tradePcOrderTem = { width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const tradePcOrderTemMain = { width: '800px', height: '500px' };
const topPart = { width: '800px', height: '390px' };
const bottomPart = { width: '800px', height: '110px', position: 'relative' };
const bottomImg = { width: '800px', height: '110px' };
const bottomClickPart = { width: '400px', height: '110px', position: 'absolute', top: '0' };

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
    componentDidMount () {
        buryAdPageView();
    }

    jumpOrderLink = (type) => {
        let url = type === 'quarter' ? orderQuarterLink : orderYearLink;
        let beaconText = type === 'quarter' ? leftButton : rightButton;
        buryAdOrderNow(beaconText);
        navigateToWebPage({ url });
    }

    render () {
        return (
            <view style={tradePcOrderTem}>
                <view style={tradePcOrderTemMain}>
                    <image style={topPart} src={topImgUrl} />
                    <view style={bottomPart}>
                        <image style={bottomImg} src={bottomImgUrl} />
                        <view style={{ ...bottomClickPart, left: '0' }} onClick={() => this.jumpOrderLink('quarter')}></view>
                        <view style={{ ...bottomClickPart, right: '0' }} onClick={() => this.jumpOrderLink('year')}></view>
                    </view>
                </view>
            </view>
        )
    }
}