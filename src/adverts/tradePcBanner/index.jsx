import { Component, navigateToWebPage } from 'Naruse';
import { taskQue } from '@/common/FadeContainer';
import Error from '@components/oneGoConfirmBuyDialog/error';
import SuccessPc from '@components/oneGoConfirmBuyDialog/successPC';
import { oneYuanActivitySubUserContact, isSubUser, getTradeOneYuanGoCentPrice } from '@utils/index';
const adInfo = $adImport.adData.results[0];
const { user_define } = adInfo;
const { env, yuan_img_url, cent_img_url } = user_define.body;
const cent_price = getTradeOneYuanGoCentPrice();
const isCent = cent_price === '1';
const imgSrc = isCent ? cent_img_url : yuan_img_url;
const host = env === 'dev' ? 'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';
const service_suffix = `一${isCent ? '分' : '元'}购活动`;
const button_text = `1${isCent ? '分' : '元'}/15天`;
const secondary_class = `一${isCent ? '分' : '元'}购弹窗`;
const buryAdOrderNow = (order_cycle, btnText) => {
    if (btnText === undefined) {
        btnText = '';
    }
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, secondary_class, order_cycle }, btnText, adInfo.pid);
};
export default class PcBanner extends Component {
    constructor () {
        super();
        this.state = { visible: false, timer: null, receiptFlag: false, paymentUrl: '', isPaySuccess: false, pollingFlag: false };
    }

    componentDidMount () {
        if (isSubUser() || cent_price === '0') return;
        buryAdOrderNow();
        this.setState({ visible: true });
    }

    onLinkClick () {
        const opt = {
            mode: 'post',
            method: '/activity/getOneYuanActivityOrder',
            args: { app: 'trade', payCount: cent_price },
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
            // 一元购子账号返回
            if (oneYuanActivitySubUserContact(cent_price, payUrl)) return;
            buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
            navigateToWebPage({ url: payUrl });
            this.setState({ ...this.state, paymentUrl: payUrl, receiptFlag: true });
            taskQue(() => {
                !this.state.pollingFlag && this.startPolling();
            }, 2 * 1000);
        });
        _promiseItem.catch(() => { });
    }

    startPolling () {
        clearInterval.call(null, this.state.timer);
        this.setState({ ...this.state, pollingFlag: true });
        const _timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval.call(null, _timer);
                return;
            }
            const opt = {
                mode: 'post',
                method: '/activity/confirmOneYuanPurchaseOrder',
                args: { app: 'trade' },
                apiName: 'aiyong.activity.oneyuan.order.confirm',
                host,
            };
            const _promiseItem = $ayApi.apiAsync(opt);
            _promiseItem.then((res) => {
                const { payResult } = res.body || {};
                if (!payResult) return;
                this.setState({ ...this.state, pollingFlag: false, isPaySuccess: true });
                $userInfoChanger.updateUserInfo();
            });
            _promiseItem.catch(() => { });
        }, 3 * 1000);
        this.setState({ ...this.state, timer: _timer });
    }
    onCloseModal () {
        this.setState({ ...this.state, visible: false, pollingFlag: false });
        setTimeout(() => {
            $uninstall();
        });
    }
    onSendServiceMsg () {
        $openChat.contactCustomerService(`你好，参加${service_suffix}支付失败怎么办？链接地址：${this.state.paymentUrl}`);
    }
    onReAction () {
        navigateToWebPage({ url: this.state.paymentUrl });
    }
    onCloseErrModal () {
        this.setState({ ...this.state, pollingFlag: false, receiptFlag: false });
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