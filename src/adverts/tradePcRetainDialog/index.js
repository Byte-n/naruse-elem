import { Component } from 'Naruse';
import HorseRaceLamp from '@components/horseRaceLamp/index';
import Timer from '@components/timer/index';

const container = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 900,
    position: 'fixed',
    top: '0',
    left: '0',
};
const containerMain = { width: '600px', height: '420px', position: 'absolute' };
const backgroundImg = {
    width: '600px',
    height: '420px',
};
const btnStyle = { width: '160px', height: '40px', position: 'absolute', top: '336px' };

const baseImgSrc = 'http://q.aiyongtech.com/ad/images/';
const backgroundSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDc=_1650359418137.png`;
const leaveBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDQ=_1650434802345.png`;
const orderOneyuanBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDEy_1650381083973.png`;
const orderOnecentBtnSrc = `${baseImgSrc}55S75p2/IDI=_1650421545665.png`;
const leaveLastBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDM=_1650382500397.png`;
const discountOverBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDU=_1650382605642.png`;

// 广告信息
const adInfo = $adImport.adData.results[0];
const { pid } = adInfo;
const buryAdPageView = (secondary_class) => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo,secondary_class}, pid);
};
const buryAdOrderNow = (secondary_class,order_cycle) => {
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo,secondary_class,order_cycle}, '' , pid);
};

/**
 * 交易pc挽留弹窗
 */
export default class TradePcRetainDialog extends Component {
    constructor () {
        this.state = {
            isShow: true,
            isOrderBtn: true,
        };
    }

    componentDidMount () {
        buryAdPageView('交易pc端挽留弹窗');
    }

    /**
     * 弹窗关闭
     */
    closeDialog () {
        const { isOrderBtn } = this.state;
        const { onCancel } = this.props;
        const closeText = `${isOrderBtn ? '忍痛离开' : '下次再来'}`
        onCancel(closeText);
        buryAdOrderNow('关闭交易pc端挽留弹窗', closeText);
        this.setState({ isShow: false });
        $uninstall();
    }

    /**
     * 获取倒计时是否清零
     * @param {boolean} isTime 倒计时是否清零
     */
    closeTimer (isTime) {
        this.setState({ isOrderBtn: isTime })
    }

    /**
     * 订购点击
     */
     orderVip () {
        const { isOrderBtn } = this.state;
        const { onConfirm } = this.props;
        if (isOrderBtn) {
            onConfirm();
        } else {
            buryAdOrderNow('关闭交易pc端挽留弹窗', '优惠结束');
        }
        this.setState({ isShow: false });
        $uninstall();
    }

    render () {
        const { isShow, isOrderBtn } = this.state;
        const { centPrice } = this.props;
        return (
            <view>
                {
                    isShow && (
                        <view style={container}>
                            <image style={backgroundImg} src={backgroundSrc} />
                            <view style={containerMain}>
                                <HorseRaceLamp equipmentType={'pc'} />
                                <view style={{ marginTop: '415rpx', marginLeft: '380rpx' }}>
                                    <Timer equipmentType={'pc'} closeTimer={this.closeTimer.bind(this)} />
                                </view>
                                <image
                                    src={isOrderBtn ? leaveBtnSrc : leaveLastBtnSrc}
                                    style={{...btnStyle, ...{left: '125px'}}}
                                    onClick={this.closeDialog.bind(this)}
                                />
                                <image
                                    src={!isOrderBtn ? discountOverBtnSrc : (centPrice === '100' ? orderOneyuanBtnSrc : orderOnecentBtnSrc)}
                                    style={{...btnStyle, ...{right: '125px'}}}
                                    onClick={this.orderVip.bind(this)}
                                />
                            </view>
                        </view>
                    )
                }
            </view>
        )
    }
}