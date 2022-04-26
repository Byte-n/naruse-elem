import { Component } from 'Naruse';
import HorseRaceLamp from '@components/horseRaceLamp/index';
import Timer from '@components/timer/index';
import { isIOS } from '@utils/userInfo';

const container = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 999,
    position: 'fixed',
    top: '0',
    left: '0',
};
const containerMain = { width: '620rpx', height: '800rpx', position: 'absolute' };
const backgroundImg = {
    width: '620rpx',
    height: '800rpx',
};
const btnStyle = { width: '260rpx', height: '90rpx', position: 'absolute', top: '680rpx' };

const baseImgSrc = 'http://q.aiyongtech.com/ad/images/';
const backgroundSrc = `${baseImgSrc}55S75p2/_1650337101811.png`;
const oneYuanBgSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDY=_1650885160178.png`;
const leaveBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDQ=_1650353672603.png`;
const orderOneyuanBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDEy_1650381083973.png`;
const orderOnecentBtnSrc = `${baseImgSrc}55S75p2/IDI=_1650421545665.png`;
const orderIosBtnSrc = `${baseImgSrc}5Lqk5piTTUI=_1650946750257.png`;
const leaveLastBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDM=_1650382500397.png`;
const discountOverBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDU=_1650382605642.png`;

// 广告信息
const adInfo = $adImport.adData.results[0];
const { pid } = adInfo;
const buryAdPageView = (secondary_class) => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo, secondary_class }, pid);
};
const buryAdOrderNow = (secondary_class, order_cycle) => {
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, secondary_class, order_cycle }, '', pid);
};

/**
 * 交易mb挽留
 */
export default class TradeMbRetainDialog extends Component {
    constructor () {
        this.state = {
            isShow: true,
            isOrderBtn: true,
        };
    }

    componentDidMount () {
        buryAdPageView(`交易手机端挽留弹窗${isIOS ? 'ios' : 'android'}`);
    }

    closeDialog () {
        const { isOrderBtn } = this.state;
        const { onCancel } = this.props;
        const closeText = `${isOrderBtn ? '忍痛离开' : '下次再来'}`;
        onCancel(closeText);
        buryAdOrderNow(`关闭交易手机端挽留弹窗${isIOS ? 'ios' : 'android'}`, closeText);
        this.setState({ isShow: false });
        // $uninstall();
    }

    /**
     * 获取倒计时是否清零
     * @param {boolean} isTime 倒计时是否清零
     */
    closeTimer (isTime) {
        this.setState({ isOrderBtn: isTime });
    }

    /**
     * 订购点击
     */
    orderVip () {
        const { isOrderBtn } = this.state;
        const { onConfirm } = this.props;
        if (isOrderBtn) {
            onConfirm();
        }
        // $uninstall();
    }

    render () {
        const { isShow, isOrderBtn } = this.state;
        const { centPrice } = this.props;
        return (
            <view>
                {
                    isShow && (
                        <view style={container}>
                            <image style={backgroundImg} src={centPrice === '100' ? oneYuanBgSrc : backgroundSrc} />
                            <view style={containerMain}>
                                <HorseRaceLamp />
                                <view style={{ marginTop: '572rpx', marginLeft: '80rpx' }}>
                                    <Timer closeTimer={this.closeTimer.bind(this)} />
                                </view>
                                <image
                                    src={isOrderBtn ? leaveBtnSrc : leaveLastBtnSrc}
                                    style={{ ...btnStyle, ...{ left: '33rpx' } }}
                                    onClick={this.closeDialog.bind(this)}
                                />
                                <image
                                    src={!isOrderBtn ? discountOverBtnSrc : (isIOS() ? orderIosBtnSrc : (centPrice === '100' ? orderOneyuanBtnSrc : orderOnecentBtnSrc))}
                                    style={{ ...btnStyle, ...{ right: '33rpx' } }}
                                    onClick={this.orderVip.bind(this)}
                                />
                            </view>
                        </view>
                    )
                }
            </view>
        );
    }
}