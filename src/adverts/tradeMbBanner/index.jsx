import { Component, navigateToWebPage, getStorage, setStorage } from 'Naruse';
import style from './index.css';
import CloseButton from '@/common/CloseButton';
import { taskQue } from '@/common/FadeContainer';
import Error from '@components/oneGoConfirmBuyDialog/error';
import SuccessMB from '@components/oneGoConfirmBuyDialog/successMB';
const adInfo = $adImport.adData.results[0];
const { user_define, img_path: imgSrc } = adInfo;
const { cent_price, env } = user_define.body;
const isCent = cent_price === '1';
const host = env === 'dev' ? 'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';
const service_suffix = `一${isCent ? '分' : '元'}购活动`;
const button_text = `1${isCent ? '分' : '元'}/15天`;
const secondary_class = `一${isCent ? '分' : '元'}购弹窗`;
const buryAdPageView = () => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo, secondary_class }, adInfo.pid);
};
const buryAdOrderNow = (order_cycle, btnText) => {
    if (btnText === undefined) {
        btnText = '';
    }
    $adSensorsBeacon.adOrderNowBeacon({ ...adInfo, secondary_class, order_cycle }, btnText, adInfo.pid);
};
export default class ItemMoileModal extends Component {
    constructor () {
        super();
        this.state = { visible: false, stayFlag: false, timer: null, receiptFlag: false, paymentUrl: '', isPaySuccess: false, pollingFlag: false };
    }

    componentDidMount () {
        buryAdPageView();
        const key = `bannerShow${adInfo.pid}`;
        getStorage({ key })
            .then(({ data }) => {
                console.log(data);
                const now = $moment().format('YYYY-MM-DD');
                if (!data || data !== now) {
                    this.setState({ visible: true });
                }
            });
    }

    onLinkClick () {
        this.setState({ ...this.state, receiptFlag: true });
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
                return;
            }
            if ($mappUtils.isIOS()) {
                $adSensorsBeacon.adOrderNowBeacon(adInfo, '/跳客服', adInfo.pid);
                $openChat.contactCustomerService(`你好，我想参与${service_suffix}\n${payUrl}`);
            } else {
                buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
                navigateToWebPage({ url: payUrl });
            }
            this.setState({ ...this.state, paymentUrl: payUrl });
            taskQue(() => {
                !this.state.pollingFlag && this.startPolling();
            }, 2 * 1000);
        });
        _promiseItem.catch(() => { });
    }

    startPolling () {
        this.setState({ pollingFlag: true });
        clearInterval(this.state.timer);
        const _timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval(_timer);
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
                this.setState({ pollingFlag: false, isPaySuccess: true });
                $userInfoChanger.updateUserInfo();
            });
            _promiseItem.catch(() => { });
        }, 3 * 1000);
        this.setState({ ...this.state, timer: _timer });
    }
    onCloseModal () {
        const key = `bannerShow${adInfo.pid}`;
        setStorage({ key, data: $moment().format('YYYY-MM-DD') });
        this.setState({ ...this.state, visible: false });
    }
    onSendServiceMsg () {
        $openChat.contactCustomerService(`你好，参加${service_suffix}支付失败怎么办？\n链接地址：${this.state.paymentUrl}`);
    }
    onReAction () {
        const { paymentUrl } = this.state;
        if ($mappUtils.isIOS()) {
            $openChat.contactCustomerService(`你好，我想参与${service_suffix}\n${paymentUrl}`);
        } else {
            navigateToWebPage({ url: paymentUrl });
        }
    }
    onCloseErrModal () {
        this.setState({ ...this.state, pollingFlag: false, receiptFlag: false });
        // $uninstall && !$uninstall();
    }
    componentWillUnmount () {
        clearInterval(this.state.timer);
    }

    render () {
        const { visible, receiptFlag, isPaySuccess } = this.state;
        console.log(this.state);
        if (!user_define || !visible) return null;
        let payResJsx = null;
        // 支付结果
        if (receiptFlag) {
            payResJsx = <view>
                {isPaySuccess && <SuccessMB closeBtnName='我知道了' onClone={this.onCloseModal.bind(this)} />}
                {!isPaySuccess && <Error onClone={this.onCloseErrModal.bind(this)} onCustomerService={this.onSendServiceMsg.bind(this)} onAgain={this.onReAction.bind(this)} closeBtnName='关闭' />}
            </view>;
        }

        // 广告Banner
        return (
            <view style={style.bannerWarp}>
                <image onClick={this.onLinkClick.bind(this)} style={style.img} src={imgSrc} />
                <image onClick={this.onCloseModal.bind(this)} style={style.closeBtn} src='//q.aiyongtech.com/miniapp/marketing/mobile/banner_closer.png' />
                {payResJsx}
            </view>
        );
    }
}