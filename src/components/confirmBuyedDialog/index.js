import PayFailDialog from '@components/payFailDialog';
import PaySuccessDialog from '@components/paySuccessDialog';
import { confirmTradeUserBuyResult } from '@utils/index';
import { Component } from 'Naruse';
import style from './index.css';

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
        confirmTradeUserBuyResult().then((res) => {
            if (res === 2 || res === 3) {
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
     * @author CHC
     * @date 2022-04-01 17:04:22
     */
    onHasProblem () {
        $openChat.openChat({ text: '你好，我想订购爱用交易高级版，但是支付失败，我该怎么办？' });
    }
    render () {
        const { reBuyLink } = this.props;
        const { animation, resSuccess, resFail, visible } = this.state;
        if (!visible) return null;
        if (resSuccess) return <PaySuccessDialog />;
        return (
            <view style={style.warpStyle}>
                <view style={{ ...style.dialogBox, ...(animation ? style.dialogBoxDown : {}) }}>
                    <view style={style.dialogHeader}>
                        <text>温馨提示</text>
                        <text onClick={this.close.bind(this)} style={{ transform: 'scale(1.3)', cursor: 'pointer' }}>X</text>
                    </view>
                    <text style={style.dialogLine}></text>
                    <text style={style.dialogContent}>
                        请您在新开的页面上完成付款，付款完成前请不要关闭此窗口。完成付款后请根据您的情况点击下面的按钮。
                    </text>
                    <view style={style.dialogBottom}>
                        <button
                            onClick={this.confirmHasBuyed.bind(this)}
                            style={style.dialogButton} >已完成付款</button>
                        <button
                            onClick={this.onHasProblem.bind(this)}
                            style={{
                                ...style.dialogButton,
                                ...style.dialogButtonWhite,
                            }}
                        >付款遇到问题</button>
                    </view>
                </view>
                {resFail && <PayFailDialog onClose={() => this.setState({ resFail: false })} reBuyLink={reBuyLink} />}
            </view>
        );
    }
}
