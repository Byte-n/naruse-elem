import { Component } from 'Naruse' ;

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center' ,    flexDirection: 'column',opacity: '0', transform: 'translateY(-50%)'
};
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };


const buyBtnStyle = {
    width: '280rpx',
    height: '115rpx',
    position: 'absolute',

    cursor: 'pointer',
    left: '515rpx'
};
const buyBtnHoverStyle = { backgroundColor: 'white', color: '#666666'  }
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10px 40px',
    border: '2px solid #FFF',
    borderRadius: '50px',
    cursor: 'pointer',
    marginTop:'40rpx'
};

const adInfo = $adImport.adData.results[0];
const successResSecondaryClass = '开通成功弹窗';
const recommendSecondaryClass = '开通成功推荐功能弹窗'

const { pid } = adInfo;
export const buryAdPageView = (secondary_class) => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo,secondary_class}, pid);
};
export const buryAdOrderNow = (secondary_class,order_cycle) => {
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo,secondary_class,order_cycle}, '' , pid);
};

/**
 * @desc 一分购商品成功组件
 * @param {string} closeBtnName 关闭按钮文本 默认'关闭'
 * @param {boolean} isPc 是否为pc环境 默认'false'
 * @param {function} onClone 关闭弹窗时调用
 * @author gao01
 * @date 2022/04/15 16:00:41
 */
export default class successItem extends Component {
    constructor() {
        this.state = {
            successResDialogVisible: true,
            animation: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animation: true });
            buryAdPageView(successResSecondaryClass);
        });
    }

    /**
     * @desc 成功结果弹窗
     * @author gao01
     * @date 2022/4/18 18:46:13
     */
    getSuccessResDialog = () => {
        const { animation } = this.state;
        const { isPc = false } = this.props;
        const pcOption = {style:{ },src:'http://q.aiyongtech.com/ad/images/55S75p2/IDI=_1650549049768.png'}
        const mbOption = {style:{ width:'600rpx', height:'720rpx' },src:'http://q.aiyongtech.com/ad/images/55S75p2/_1650548641079.png'}
        const imageAttr = isPc ? pcOption : mbOption
        const closeDialog = () => {
            const { onClone } = this.props;
            this.setState({ successResDialogVisible: false,animation: false});
            buryAdOrderNow(successResSecondaryClass,'我知道了')
            onClone && onClone();
        }

        return(
            <view style={tradePcContainer}>
                <view style={{ ...tradePcOrderTem,  ...(animation ? dialogBox : {}) }}>
                    <view style={{ position:'relative',cursor: 'pointer'}} onClick={closeDialog} >
                        <image style={imageAttr.style} src={imageAttr.src} />
                    </view>
                </view>
            </view>
        )
    }

    render() {
        const { successResDialogVisible } = this.state;
        return (
            <view>
                {successResDialogVisible && this.getSuccessResDialog()}
            </view>
        )
    }
}