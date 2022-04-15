import PayFailDialogM from '@components/payFailDialogM';
import PaySuccessDialogM from '@components/paySuccessDialogM';
import { confirmTradeUserBuyResultM } from '@utils/index';
import { Component } from 'Naruse';
import style from './index.css';
import { isIOS } from '@utils/userInfo';


/**
 * @description 购买确认弹窗
 * @author CHC
 * @date 2022-04-01 17:04:14
 * @export
 * @class ConfirmBuyedDialog
 * @extends {Component<{ reBuyLink: string }, { animation: boolean, resSuccess: boolean, resFail: boolean, visible: boolean }>}
 */
export default class ConfirmBuyedDialog extends Component {
    constructor () {
        super();
        this.state = { animation: true, resSuccess: false, resFail: false, visible: true };
    }

    componentDidMount () {
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
    }

    /**
     * @description 确定是否购买
     * @author CHC
     * @date 2022-04-01 18:04:46
     */
    confirmHasBuyed () {
        confirmTradeUserBuyResultM().then((res) => {
            if (res === 1 || res === 2 || res === 3) {
                // resSuccess
                this.setState({ resSuccess: true });
            } else {
                this.setState({ resFail: true });
            }
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

    /**
     * @description 当付款遇到问题联系客服
     * @author ZH
     * @date 2022-04-01 17:04:22
     */
    onHasProblem () {
        $openChat.contactCustomerService('你好，我想订购爱用交易高级版，但是支付失败，我该怎么办？');
    }
    render () {
        const { reBuyLink, text } = this.props;
        const { animation, resSuccess, resFail, visible } = this.state;
        if (!visible) return null;
        if (resSuccess) return <PaySuccessDialogM />;
        return (
            <view style={style.warpStyle}>
                <view style={{ ...style.dialogBox, ...(animation ? style.dialogBoxDown : {}) }}>
                    <view style={style.dialogHeader}>
                        <text>温馨提示</text>
                        <text onClick={this.close.bind(this)} style={{ transform: 'scale(1.3)', cursor: 'pointer' }}>X</text>
                    </view>
                    <text style={style.dialogLine}></text>
                    <text style={style.dialogContent}>
                        完成付款后，请根据您的支付情况点击下面的按钮。
                    </text>
                    <view style={style.dialogBottom}>
                        <button
                            onClick={this.onHasProblem.bind(this)}
                            style={style.dialogButton}
                        >付款遇到问题</button>
                        <button
                            onClick={this.confirmHasBuyed.bind(this)}
                            style={{
                                ...style.dialogButton,
                                ...style.dialogButtonRight,
                            }} >已完成付款</button>
                    </view>
                </view>
                {resFail && <PayFailDialogM onClose={() => this.setState({ resFail: false })} reBuyLink={reBuyLink} text={text} />}
            </view>
        );
    }
}
