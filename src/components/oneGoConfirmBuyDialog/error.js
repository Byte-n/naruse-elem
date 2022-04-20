import { Component } from 'Naruse';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center',    flexDirection: 'column', opacity: '0', transform: 'translateY(-50%)' };
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };


const buyBtnStyle = {
    width: '230rpx',
    height: '85rpx',
    position: 'absolute',
    bottom: '50rpx',
    cursor: 'pointer',
};
const buyBtnHoverStyle = { backgroundColor: 'white', color: '#666666'  };
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10px 40px',
    border: '2px solid #FFF',
    borderRadius: '50px',
    cursor: 'pointer',
    marginTop: '40rpx',
};

const adInfo = $adImport.adData.results[0];

const { pid } = adInfo;
const secondary_class = '开通失败弹窗';
export const buryAdPageView = () => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo, secondary_class }, pid);
};
export const buryAdOrderNow = (order_cycle, btnText) => {
    if (btnText === undefined) {
        btnText = '';
    }
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, secondary_class, order_cycle }, btnText, pid);
};

/**
 * @desc 一分购失败组件
 * @param {function} onCustomerService 联系客服点击动作
 * @param {function} onAgain 再次尝试点击动作
 * @param {string} closeBtnName 关闭按钮文本 默认'关闭'
 * @author gao01
 * @date 2022/04/15 16:00:41
 */
export default class OneGoError extends Component {
    constructor () {
        this.state = {
            dialogVisible: true,
            animation: false,
        };
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({ animation: true });
            buryAdPageView('PC续费落地页A');
        });
    }

    btnClick = (clickCb, { order_cycle, btnText }) => {
        buryAdOrderNow(order_cycle, btnText);
        // this.setState({ dialogVisible:false});
        clickCb && clickCb();
    };

    onClose = () => {
        this.setState({ dialogVisible: false, animation: false });
        this.props.onClose && this.props.onClose();
    };

    render () {
        const { dialogVisible, animation } = this.state;
        const { onCustomerService, onAgain, closeBtnName = '关闭' } = this.props;
        return (
            <view style={tradePcContainer}>
                {dialogVisible && <view style={{ ...tradePcOrderTem,  ...(animation ? dialogBox : {}) }}>
                    <view style={{ position: 'relative' }}>
                        <image style={{ width: '580rpx', height: '400rpx' }}  src={'http://q.aiyongtech.com/ad/images/TULlpLHotKXlvLnnqpc=_1650179400796.png'} />
                        <text style={{ ...buyBtnStyle, left: '40rpx' }} onClick={ () => {
                            this.btnClick(onCustomerService, { order_cycle: '联系客服', btnText: '' });
                        }}/>
                        <text style={{ ...buyBtnStyle, left: '300rpx' }} onClick={() => {
                            this.btnClick(onAgain, { order_cycle: '15天', btnText: '0.01/15天' });
                        } }/>
                    </view>
                    <view>
                        <view style={closeStyle} hoverStyle={buyBtnHoverStyle} onClick={this.onClose} > {closeBtnName} </view>
                    </view>
                </view>}
            </view>
        );
    }
}

