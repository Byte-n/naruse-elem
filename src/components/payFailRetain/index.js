import { Component, navigateToWebPage } from 'Naruse';
import HorseRaceLamp from '@components/horseRaceLamp/index';
import ConfirmBuyedDialog from '@components/confirmBuyedDialog';
import style from './index.css';

const leftBtnSrc = 'http://q.aiyongtech.com/ad/images/5byA6YCa5LiA5bm06YCJ5Lit5aSH5Lu9_1652773599771.png';
const rightBtnSrc = 'http://q.aiyongtech.com/ad/images/5byA6YCa5a2j5bqm5pyq6YCJ5Lit_1652773587435.png';
const checkLeftBtnSrc = 'http://q.aiyongtech.com/ad/images/5byA6YCa5LiA5bm06YCJ5Lit_1652943914395.png';
const checkRightBtnSrc = 'http://q.aiyongtech.com/ad/images/5byA6YCa5a2j5bqm6YCJ5Lit_1652943906536.png';

const adInfo = $adImport.adData.results[0];
const { pid, creative_id, creative_name, pid_name } = adInfo;

export default class PayFailRetain extends Component {
    constructor () {
        super();
        this.state = {
            animation: true,
            visible: true,
            orderCheck: true,
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

    close () {
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.props.onClose && this.props.onClose();
            this.setState({ visible: false });
        });
    }

    openService () {
        $openChat.openChat({ text: '你好，我想订购爱用交易高级版，但是支付失败，我该怎么办？' });
    }

    jumpOrderLick () {
        const { orderCheck } = this.state;
        const { orderYearLink, orderMonthLink } = this.props;
        let orderLink = '';
        if (orderCheck) {
            orderLink = orderYearLink;
        } else {
            orderLink = orderMonthLink;
        }
        $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, primary_class: '挽留弹窗', secondary_class: '点击未支付挽留弹窗', amount_payable: `${orderCheck ? '148' : '52'}` }, '', pid);
        this.setState({ visible: false });
        this.props.onOpen && this.props.onOpen();
        navigateToWebPage({ url: orderLink });
    }

    render () {
        const { animation, visible, orderCheck } = this.state;
        if (!visible) return null;
        return (
            <view style={style.warpStyle}>
                <view style={{ ...style.dialogBox, ...(animation ? style.dialogBoxDown : {}) }}>
                    <view style={style.dialogHeader}>
                        <text style={style.dialogHeaderMainTip}>
                            系统检测到您尚未完成付款
                        </text>
                        <text style={style.dialogHeaderOtherTip}>
                            你将错过12项高级特权
                        </text>
                    </view>
                    <view style={style.dialogContent}>
                        <HorseRaceLamp equipmentType={'pc'} />
                    </view>
                    <view style={style.dialogFooter}>
                        <view style={style.dialogFooterBtn}>
                            <view style={style.dialogFooterLeft} onClick={() => this.setState({ orderCheck: true })}>
                                <image src={orderCheck ? checkLeftBtnSrc : leftBtnSrc} />
                            </view>
                            <view style={style.dialogFooterRight} onClick={() => this.setState({ orderCheck: false })}>
                                <image style={{height: '43px'}} src={!orderCheck ? checkRightBtnSrc : rightBtnSrc} />
                            </view>
                        </view>
                        <view style={style.dialogFooterOrder}>
                            <view style={style.dialogFooterOrderBtn} onClick={() => {this.jumpOrderLick()}}>
                                开通高级版，不满意随时退
                            </view>
                            <view style={style.dialogFooterService} onClick={() => this.openService()}>
                                支付遇到问题，联系客服
                            </view>
                        </view>
                    </view>
                    <view style={style.closeStyle} hoverStyle={style.buyBtnHoverStyle} onClick={() => this.close()} > 关闭 </view>
                </view>
            </view>
        )
    }
}