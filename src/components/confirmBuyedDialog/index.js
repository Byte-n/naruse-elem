import PayFailDialog from '@components/payFailDialog';
import PaySuccessDialog from '@components/paySuccessDialog';
import PayFailRetain from '@components/payFailRetain';
import OrderSuccess from '@components/orderSuccess';
import { confirmTradeUserBuyResult } from '@utils/index';
import { Component } from 'Naruse';
import style from './index.css';
import orderSuccess from '@components/orderSuccess';
import MessageTip from '@components/messageTip/index';

const adInfo = $adImport.adData.results[0];
const { pid } = adInfo;

/**
 * @description 购买确认弹窗
 * @author CHC
 * @date 2022-04-01 17:04:14
 * @export
 * @class ConfirmBuyedDialog
 * @extends {Component<{ reBuyLink: string }, { animation: boolean, resSuccess: boolean, resFail: boolean, visible: boolean }>}
 */
class ConfirmBuyedDialog extends Component {
    constructor () {
        super();
        this.state = {
            animation: true,
            resSuccess: false,
            resFail: false,
            visible: true,
            isOpenMessage: false,
        };
    }

    componentDidMount () {
        console.log(111);
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
        const { isOldDialog } = this.props;
        if (!isOldDialog) {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();
            const retainRecord = Naruse.getStorageSync('retainRecord');
            console.log('date===', today, year, month, day);
            const retainRecordDate = retainRecord.split('-');
            if (retainRecordDate[0] == year && retainRecordDate[1] == month + 1 && retainRecordDate[2] == day && retainRecordDate[3] == pid) {
                this.setState({ isOpenMessage: true });
                // 弹提示
            }
            // 可以弹挽留
            Naruse.setStorageSync('retainRecord', `${year}-${month + 1}-${day}-${pid}`);
        }
        this.setState({ visible: false });
        confirmTradeUserBuyResult().then((res) => {
            if (res === 1 || res === 2 || res === 3) {
                // 弹成功关闭,支付回执
                this.setState({ resSuccess: true });
            } else {
                // 提示和挽留其中必弹，关闭支付回执
                this.setState({ resFail: true });
            }
        });
    }

    initState () {
        this.setState({visible: true, isOpenMessage: false, resSuccess: false, resFail: false});
        this.props.onClose && this.props.onClose();
    }

    handleOpen(){
        this.setState({visible: true, isOpenMessage: false, resSuccess: false, resFail: false});
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
        const { reBuyLink, isOldDialog, orderYearLink, orderMonthLink } = this.props;
        const { animation, resSuccess, resFail, visible, isOpenMessage } = this.state;
        console.log('qqqq', visible, resSuccess, resFail, isOpenMessage);
        // 支付失败弹框 挽留true 接口告知失败 回执弹框关闭
        if (isOpenMessage && resFail && !visible) return <MessageTip message={'未完成支付'} time={3000} onClose={this.initState.bind(this)} />;
        // 挽留弹框 回执弹框关闭 接口告知失败 新回执 挽留false
        if (!visible && resFail && !isOldDialog && !isOpenMessage) return <PayFailRetain onClose={this.initState.bind(this)} onOpen={this.handleOpen.bind(this)} orderYearLink={orderYearLink} orderMonthLink={orderMonthLink} />;
        if (!visible && resSuccess && !isOldDialog) return <OrderSuccess onClose={this.initState.bind(this)} />;
        if (!visible) return null;
        if (resSuccess && isOldDialog) return <PaySuccessDialog />;
        return (
            <view style={style.warpStyle}>
                <view style={{ ...style.dialogBox, ...(animation ? style.dialogBoxDown : {}) }}>
                    <view style={style.dialogHeader}>
                        <text>温馨提示</text>
                        <text onClick={isOldDialog ? this.close.bind(this) : this.confirmHasBuyed.bind(this)} style={{ transform: 'scale(1.3)', cursor: 'pointer' }}>X</text>
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
                {resFail && isOldDialog && <PayFailDialog onClose={() => this.setState({ resFail: false })} reBuyLink={reBuyLink} />}
            </view>
        );
    }
}

export default ConfirmBuyedDialog;
