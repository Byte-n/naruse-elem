import { Component } from 'Naruse';
import HorseRaceLamp from '@components/horseRaceLamp/index';
import { isIOS } from '@utils/platform';
import style from './index.css';

const adInfo = $adImport.adData.results[0];
const { pid, creative_id, creative_name, pid_name } = adInfo;
const { service } = adInfo.user_define.body;

const backgroundImgSrc = 'http://q.aiyongtech.com/ad/images/YW5kcm9pZFJldGFpbg%3D%3D_1652796568509.png';
const iosBackgroundImgSrc = 'http://q.aiyongtech.com/ad/images/SU9T5bqV5Zu%2B_1652801537611.png';
const checkSignSrc = 'http://q.aiyongtech.com/ad/images/5omL5py656uv5a%2B55Y%2B3MuWAjeWbvg%3D%3D_1652797531466.png';

export default class PayFailRetain extends Component {
    constructor () {
        super();
        this.state = {
            animation: true,
            visible: true,
            orderCheck: true,
            isShowPayRes: false,
        };
    }

    componentDidMount () {
        $adSensorsBeacon.adViewBeacon({ ...adInfo, primary_class: '挽留弹窗', secondary_class: '点击未支付挽留弹窗' }, pid);
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
    }

    /**
     * 跳转订购链接
     */
    jumpOrderLink () {
        const { orderCheck } = this.state;
        const { orderYearLink, orderMonthLink, onOpen } = this.props;
        $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, primary_class: '挽留弹窗', secondary_class: '点击未支付挽留弹窗', amount_payable: `${orderCheck ? '148' : '52'}` }, '', pid);
        this.setState({ visible: false });
        onOpen && onOpen();
        my.qn.navigateToWebPage({ url: orderCheck ? orderYearLink : orderMonthLink });
    }

    /**
     * 带入话术打开客服
     * @param {String} type 客服打开类型
     */
    openService (type) {
        const { onOpen } = this.props;
        let text = '你好，我想订购爱用交易高级版，但是支付失败，我该怎么办';
        if (type === 'orderIos') {
            text = service;
            $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, primary_class: '挽留弹窗', secondary_class: '点击未支付挽留弹窗' }, '', pid);
            this.setState({ visible: false });
            onOpen && onOpen();
        }
        $openChat.contactCustomerService(text);
    }

    close () {
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.props.onClose && this.props.onClose();
            this.setState({ visible: false });
        });
    }

    render () {
        const { animation, visible, orderCheck } = this.state;
        if (!visible) return null;
        return (
            <view style={style.warpStyle}>
                <view style={{ ...style.dialogBox, ...(animation ? style.dialogBoxDown : {})}}>
                    {
                        isIOS() ? (
                            <view>
                                <image style={style.iosBackgroundImg} src={iosBackgroundImgSrc} />
                                <view style={style.iosDialogContent}><HorseRaceLamp /></view>
                                <view style={style.iosDialogOrder}>
                                    <view style={style.iosDialogOrderBtn} onClick={() => this.openService('orderIos')}></view>
                                </view>
                                <view style={style.iosDialogService}>
                                    <view style={style.iosDialogServicePart} onClick={() => this.openService('orderFail')}></view>
                                </view>
                            </view>
                        ) : (
                            <view>
                                <image style={style.backgroundImg} src={backgroundImgSrc} />
                                <image style={{ ...style.checkSign, ...{ top: orderCheck ? '392rpx' : '472rpx' } }} src={checkSignSrc} />
                                <view style={style.dialogContent}><HorseRaceLamp /></view>
                                <view style={style.dialogFooter}>
                                    <view style={style.dialogFooterYearBtn} onClick={() => this.setState({ orderCheck: true })}></view>
                                    <view style={style.dialogFooterMonthBtn} onClick={() => this.setState({ orderCheck: false })}></view>
                                    <view style={style.dialogFooterOrder}>
                                        <view style={style.dialogFooterOrderBtn} onClick={() => this.jumpOrderLink()}></view>
                                    </view>
                                    <view style={style.dialogFooterService}>
                                        <view style={style.dialogFooterServicePart} onClick={() => this.openService('orderFail')}></view>
                                    </view>
                                </view>
                            </view>
                        )
                    }
                    <view style={{...style.closeBtn, ...{bottom: isIOS() ? '-20rpx': '-100rpx'}}} onClick={this.close.bind(this)}>关闭</view>
                </view>
            </view>
        )
    }
}