import ConfirmBuyedDialog from '@components/confirmBuyedDialog';
import { Component, navigateToWebPage } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = { width: '800px', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };
const dialogBoxDown = { opacity: '0', transform: 'translateY(-50%)' };
const tradePcOrderTemMain = { width: '800px', height: '500px', position: 'relative' };
const topPart = { width: '800px', height: '390px' };
const bottomPart = { width: '800px', height: '100px', position: 'relative', cursor: 'pointer', marginTop: '-4px' };
const bottomImg = { width: '800px', height: '100px' };
const bottomClickPart = { width: '400px', height: '100px', position: 'absolute', top: '0' };
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10px 40px',
    border: '2px solid #FFF',
    borderRadius: '50px',
    position: 'absolute',
    bottom: '-100px',
    left: '340px',
    cursor: 'pointer',
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

/**
 * Pc功能点模板
 */
export default class TradePcOrderTem extends Component {
    constructor() {
        this.state = {
            isShow: true,
            isShowPayRes: false,
            animation: true,
            reBuyLink: orderYearLink,
        };
    }

    componentDidMount() {
        // 发送初始化埋点
        $adSensorsBeacon.adViewBeacon(adInfo, false, adInfo.pid);
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
    }

    /**
     * 跳转订购
     * @param {String} type 订购类型
     */
    jumpOrderLink = (type) => {
        let url = type === 'quarter' ? orderQuarterLink : orderYearLink;
        let beaconText = type === 'quarter' ? leftButton : rightButton;
        buryAdOrderNow(beaconText);
        navigateToWebPage({ url });
        this.setState({ isShowPayRes: true, reBuyLink: url });
    }

    /**
     * 模板弹窗关闭
     */
    colsePopup = () => {
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ isShow: false });
        });
        $uninstall();
    }

    render() {
        const { isShow, isShowPayRes, animation, reBuyLink } = this.state;
        return (
            <view>
                {
                    isShow && (
                        <view style={tradePcContainer}>
                            {
                                isShowPayRes && <ConfirmBuyedDialog reBuyLink={reBuyLink} />
                            }
                            <view style={{ ...tradePcOrderTem, ...dialogBox, ...(animation ? dialogBoxDown : {}) }}>
                                <view style={tradePcOrderTemMain}>
                                    <image style={topPart} src={topImgUrl} />
                                    <view style={bottomPart}>
                                        <image style={bottomImg} src={bottomImgUrl} />
                                        <view style={{ ...bottomClickPart, left: '0' }} onClick={() => this.jumpOrderLink('quarter')}></view>
                                        <view style={{ ...bottomClickPart, right: '0' }} onClick={() => this.jumpOrderLink('year')}></view>
                                    </view>
                                    <view
                                        style={closeStyle}
                                        onClick={this.colsePopup}
                                    >
                                        {'关闭'}
                                    </view>
                                </view>
                            </view>
                        </view>
                    )
                }
            </view>
        )
    }
}