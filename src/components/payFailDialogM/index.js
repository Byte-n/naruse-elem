import { Component, navigateToWebPage } from 'Naruse';
import style from '../confirmBuyedDialogM/index.css';
import style2 from './index.css';
import { isIOS } from '@utils/userInfo';

/**
 * @description 购买确认弹窗
 * @author CHC
 * @date 2022-04-01 17:04:14
 * @export
 * @class PayFailDialog
 * @extends {Component<{}, { reBuyLink: string }>}
 */
export default class payFailDialogM extends Component {
    constructor () {
        super();
        this.state = { animation: true, visible: true };
    }

    componentDidMount () {
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
    }

    /**
     * @description 当付款遇到问题联系客服
     * @author CHC
     * @date 2022-04-01 17:04:22
     */
    onHasProblem () {
        $openChat.contactCustomerService('你好，我想订购爱用交易高级版，但是支付失败，我该怎么办？');
    }

    /**
     * @description 关闭弹窗
     * @author CHC
     * @date 2022-04-01 19:04:58
     */
    close () {
        const { onClose } = this.props;
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            onClose && onClose();
            this.setState({ visible: false });
        });
    }
    /**
     * 跳转订购
     * @param {String} type 订购类型
     */
    repayments = (reBuyLink,text) =>  {
        if(isIOS()){
            $openChat.contactCustomerService(text);
        }else{
            my.qn.navigateToWebPage({ url: reBuyLink });
        }
    }
    render () {
        const { reBuyLink, text } = this.props;
        const { animation, visible } = this.state;
        if (!visible) return null;
        return (
            <view style={{ ...style.warpStyle, zIndex: 910 }}>
                <view style={{ ...style.dialogBox }}>
                    <view style={{
                        fontSize: '34rpx',
                        height: '80rpx',
                        lineHeight: '80rpx',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(201,0,24,.03)',
                    }}>
                        <image onClick={this.close.bind(this)} style={style2.closeBtn} src={'//q.aiyongtech.com/trade/web/img/payDialogCloseIcon.png'} />
                        <view style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <text style={style2.redTitle}>支付失败！</text>
                        </view>
                    </view>
                    <view style={{ ...style.dialogContent, padding: '20rpx 40rpx' }}>
                        <view style={style.dialogSelection}>尊敬的用户，您可能在支付过程中遇到以下问题：</view>
                        <view style={style.dialogSelection}>1.您的支付宝余额不足，建议您先对您的支付宝账户进行充值，完成后再重新支付。</view>
                        <view style={style.dialogSelection}>2.您的手机或电脑与支付宝的网络通讯暂时不通，遇到此情况，建议您检查网络后再重新支付。</view>
                        <view style={style.dialogSelection}>3.如遇到支付宝已扣款，但订单状态仍显示“待付款”？这可能是银行网络传输发生故障或延时造成的，淘宝会在2个工作日内恢复金额，请耐心等待。</view>
                        <view style={style.dialogSelection}>4.如遇“校验错误”，可能是您有“待付款”的订单，请先完成付款，或关闭订单后重新订购。</view>
                        <view style={style.dialogSelection}>5.如果问题仍不能解决，请联系客服。</view>
                    </view>
                    <view style={style.dialogBottom}>
                        <button
                            onClick={this.repayments.bind(this,reBuyLink,text)}
                            style={style.dialogButton}>重新支付</button>
                        <button
                            onClick={this.onHasProblem.bind(this)}
                            style={{
                                ...style.dialogButton,
                                ...style.dialogButtonRight,
                            }}
                        >联系客服</button>
                    </view>
                </view>
            </view>
        );
    }
}
