import { Component } from 'Naruse';
import style from '../confirmBuyedDialogM/index.css';


/**
 * @description 购买确认弹窗
 * @author CHC
 * @date 2022-04-01 17:04:14
 * @export
 * @class ConfirmBuyedDialog
 * @extends {Component}
 */
export default class paySuccessDialogM extends Component {
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

    close () {
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ visible: false });
        });
    }

    render () {
        const { animation, visible } = this.state;
        if (!visible) return null;
        return (
            <view style={style.warpStyle}>
                <view style={{ ...style.dialogBox, ...(animation ? style.dialogBoxDown : {}) }}>
                    <view style={style.dialogHeader}>
                        <text>温馨提示</text>
                        <text onClick={this.close.bind(this)} style={{ transform: 'scale(1.3)', cursor: 'pointer' }}>X</text>
                    </view>
                    <text style={style.dialogLine}></text>
                    <text style={{ ...style.dialogContent, textAlign: 'center' }}>
                        订购完成，请重新进入软件
                    </text>
                    <view style={style.dialogBottom}>
                        <button
                            onClick={this.close.bind(this)}
                            style={style.dialogButton} >确定</button>
                    </view>
                </view>
            </view>
        );
    }
}
