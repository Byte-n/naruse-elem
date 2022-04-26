import { Component } from 'Naruse';
import { isIOS } from '@utils/userInfo';
import Timer from '@components/timer/index';

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
const backgroundSrc = `${baseImgSrc}MeWIhumSseaMveeVmeW8ueeqlw==_1650359001803.png`;
const oneYuanBgSrc = `${baseImgSrc}b25leXVhbg==_1650887050936.png`;

const leaveBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9_1650383848828.png`;
const orderOneyuanBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDI=_1650384004775.png`;
const orderOnecentBtnSrc = `${baseImgSrc}55S75p2/_1650422727204.png`;
const orderIosBtnSrc = `${baseImgSrc}5ZWG5ZOBTUI=_1650428896611.png`;
const leaveLastBtnSrc = `${baseImgSrc}55S75p2/5aSH5Lu9IDM=_1650384047461.png`;
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
 * 商品mb挽留
 */
export default class ItemMbRetainDialog extends Component {
    constructor () {
        this.state = {
            isShow: true,
            isOrderBtn: true,
        };
    }

    componentDidMount () {
        buryAdPageView(`商品手机端挽留弹窗${isIOS ? 'ios' : 'android'}`);
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
        } else {
            buryAdOrderNow(`关闭商品手机端挽留弹窗${isIOS ? 'ios' : 'android'}`, '优惠结束');
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
                                <view style={{ marginTop: '572rpx', marginLeft: '80rpx' }}>
                                    <Timer closeTimer={this.closeTimer.bind(this)} />
                                </view>
                                <image
                                    src={isOrderBtn ? leaveBtnSrc : leaveLastBtnSrc}
                                    style={{ ...btnStyle, ...{ left: '33rpx' } }}
                                    onClick={this.closeDialog.bind(this)}
                                />
                                <image
                                    // src={!isOrderBtn ? discountOverBtnSrc : (centPrice ==='100' ? orderOneyuanBtnSrc : orderOnecentBtnSrc)}
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