import { Component } from 'Naruse';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center',    flexDirection: 'column', opacity: '0', transform: 'translateY(-50%)' };
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };


const buyBtnStyle = {
    width: '200rpx',
    height: '60rpx',
    position: 'absolute',
    cursor: 'pointer',
    left: '340rpx',
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
const successResSecondaryClass = '开通成功弹窗';
const recommendSecondaryClass = '开通成功推荐功能弹窗';

const { pid } = adInfo;
export const buryAdPageView = (secondary_class) => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo, secondary_class }, pid);
};
export const buryAdOrderNow = (secondary_class, order_cycle) => {
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, secondary_class, order_cycle }, '', pid);
};

/**
 * @desc 一分购成功组件
 * @param {string} closeBtnName 关闭按钮文本 默认'关闭'
 * @author gao01
 * @date 2022/04/15 16:00:41
 */
export default class OneGoSuccessMB extends Component {
    constructor () {
        this.state = {
            successResDialogVisible: true,
            recommendDialogVisible: false,
            animation: false,
        };
    }

    componentDidMount () {
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
        const nextStep = () => {
            this.setState({ successResDialogVisible: false, animation: false, recommendDialogVisible: true });
            buryAdPageView(recommendSecondaryClass);
            buryAdOrderNow(successResSecondaryClass, '我知道了');
            setTimeout(() => {
                this.setState({ animation: true });
            });
        };

        return (
            <view style={{ ...tradePcOrderTem,  ...(animation ? dialogBox : {}) }}>
                <view style={{ position: 'relative', cursor: 'pointer' }} onClick={nextStep} >
                    <image style={{ width: '600rpx', height: '720rpx' }} src={'http://q.aiyongtech.com/ad/images/TULmiJDlip/lvLnnqpcx_1650348780522.png'} />
                </view>
            </view>
        );
    };

    /**
     * @desc 功能引导弹窗
     * @author gao01
     * @date 2022/4/18 18:46:53
     */
    getRecommendDialog = () => {
        const { animation } = this.state;
        const { closeBtnName = '关闭' } = this.props;
        const  dialogClose = () => {
            this.setState({ successResDialogVisible: false, recommendDialogVisible: false });
            $uninstall();
        };
        const jumpUrl = (url, order_cycle) => {
            buryAdOrderNow(recommendSecondaryClass, order_cycle);
            navigateTo({ url });
            this.setState({ successResDialogVisible: false, recommendDialogVisible: false });
            $uninstall();
        };
        return (
            <view style={{ ...tradePcOrderTem, ...(animation ? dialogBox : {}) }}>
                <view style={{ position: 'relative' }}>
                    <image style={{ width: '600rpx', height: '720rpx' }}  src={'http://q.aiyongtech.com/ad/images/TULmiJDlip/lvLnnqpcy_1650348792629.png'} />
                    <text style={{ ...buyBtnStyle, bottom: '450rpx' }} onClick={() => {
                        jumpUrl('pages/featureIntroduction/index', '自动评价');
                    }}/>
                    <text style={{ ...buyBtnStyle, bottom: '260rpx' }} onClick={() => {
                        jumpUrl('pages/featureIntroduction/index', '差评拦截');
                    }}/>
                    <text style={{ ...buyBtnStyle, bottom: '60rpx' }} onClick={() => {
                        jumpUrl('pages/tradeList/index', '核对地址');
                    }}/>
                </view>
                <view>
                    <view style={closeStyle} hoverStyle={buyBtnHoverStyle} onClick={dialogClose} > {closeBtnName} </view>
                </view>
            </view>
        );
    };

    getDialog = () => {
        const { successResDialogVisible, recommendDialogVisible } = this.state;
        return (
            <view style={tradePcContainer}>
                {successResDialogVisible && this.getSuccessResDialog()}
                {recommendDialogVisible && this.getRecommendDialog()}
            </view>
        );
    };

    render () {
        const { successResDialogVisible, recommendDialogVisible } = this.state;
        const haveDialog = successResDialogVisible || recommendDialogVisible;
        return (
            <view>
                {haveDialog && this.getDialog()}
            </view>
        );
    }
}

