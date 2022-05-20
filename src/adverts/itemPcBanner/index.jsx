import { Component, navigateToWebPage } from 'Naruse';
import { taskQue } from '@/common/FadeContainer';
import Error from '@components/oneGoConfirmBuyDialog/error';
import SuccessPc from '@components/oneGoConfirmBuyDialog/successItem';
import { isSubUser, getItemOneYuanGoCentPrice } from '@utils/index';
const adInfo = $adImport.adData.results[0];
const { user_define } = adInfo;
const { env, yuan_img_url, cent_img_url } = user_define.body;
const cent_price = '1';
const isCent = cent_price === '1';
const imgSrc = isCent ? cent_img_url : yuan_img_url;
const host = env === 'dev' ? 'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';
const service_suffix = `一${isCent ? '分' : '元'}购活动`;
const button_text = `1${isCent ? '分' : '元'}/15天`;
const secondary_class = `一${isCent ? '分' : '元'}购Banner`;
const buryAdOrderNow = (order_cycle, btnText) => {
    if (btnText === undefined) {
        btnText = '';
    }
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, secondary_class, order_cycle }, btnText, adInfo.pid);
};
const adViewBeacon = (sc) => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo, secondary_class: sc ? sc : secondary_class }, adInfo.pid);
};
export default class PcBanner extends Component {
    constructor () {
        super();
        this.state = { visible: false, timer: null, receiptFlag: false, paymentUrl: '', isPaySuccess: false, pollingFlag: false };
    }

    componentDidMount () {
        if (isSubUser() || cent_price === '0') {
            $uninstall();
            return;
        }
        adViewBeacon();
        this.setState({ visible: true });
    }

    onLinkClick () {
        const opt = {
            mode: 'post',
            method: '/activity/getOneYuanActivityOrder',
            args: { app: 'item', payCount: cent_price },
            apiName: 'aiyong.activity.oneyuan.order.get',
            host,
        };
        const _promiseItem = $ayApi.apiAsync(opt);
        _promiseItem.then((res) => {
            const { payUrl } = res.body || {};
            // 是否需要提示信息，待确定
            if (!payUrl) {
                this.onCloseModal();
                return;
            }
            buryAdOrderNow('付款链接跳转', button_text);
            adViewBeacon('支付失败回执弹窗');
            navigateToWebPage({ url: payUrl });
            this.setState({  paymentUrl: payUrl, receiptFlag: true });
            taskQue(() => {
                !this.state.pollingFlag && this.startPolling();
            }, 3 * 1000);
        });
    }

    startPolling () {
        clearInterval.call(null, this.state.timer);
        this.setState({  pollingFlag: true });
        const _timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval.call(null, _timer);
                return;
            }
            const opt = {
                mode: 'post',
                method: '/activity/confirmOneYuanPurchaseOrder',
                args: { app: 'item' },
                apiName: 'aiyong.activity.oneyuan.order.confirm',
                host,
            };
            const _promiseItem = $ayApi.apiAsync(opt);
            _promiseItem.then((res) => {
                const { payResult } = res.body || {};
                if (!payResult) return;
                adViewBeacon('支付成功回执弹窗');
                this.setState({  pollingFlag: false, isPaySuccess: true });
                $userInfoChanger.updateUserInfo();
            });
            _promiseItem.catch(() => { });
        }, 3 * 1000);
        this.setState({  timer: _timer });
    }
    onCloseModal () {
        this.setState({  visible: false });
        setTimeout(() => $uninstall());
    }
    onSendServiceMsg () {
        $openChat.contactCustomerService(`你好，参加${service_suffix}支付失败怎么办？链接地址：${this.state.paymentUrl}`);
    }
    onReAction () {
        navigateToWebPage({ url: this.state.paymentUrl });
    }
    onCloseErrModal () {
        this.setState({  pollingFlag: false, receiptFlag: false });
    }

    render () {
        const { visible, receiptFlag, isPaySuccess } = this.state;
        if (!user_define || !visible) return null;
        let payResJsx = null;
        // 支付结果
        if (receiptFlag) {
            payResJsx = <view>
                {isPaySuccess ? (
                    <view >
                        <SuccessPc closeBtnName='我知道了' onClone={this.onCloseModal.bind(this)} />
                    </view>
                ) : (
                    <view >
                        <Error onClone={this.onCloseErrModal.bind(this)} onCustomerService={this.onSendServiceMsg.bind(this)} onAgain={this.onReAction.bind(this)} closeBtnName='关闭' />
                    </view>
                )}
            </view>;
        }
        // 广告弹窗
        return (
            <view>
                <image onClick={this.onLinkClick.bind(this)} src={imgSrc} style={{ height: '65rpx' }} />
                {payResJsx}
            </view>
        );
    }
}