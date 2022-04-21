import { Component, navigateToWebPage } from 'Naruse';
import style from './index.css';

import CloseButton from '@/common/CloseButton';
import FadeContainer, { taskQue } from '@/common/FadeContainer';
import Error from '@/components/oneGoConfirmBuyDialog/error.js';
import SuccessMB from '@/components/oneGoConfirmBuyDialog/successMB.js';
import TradeMbRetainDialog from '@/adverts/tradeMbRetainDialog/index';
const adInfo = $adImport.adData.results[0];
const { user_define } = adInfo;
const { android_img_url, ios_img_url, cent_price, version, env } = user_define.body;
const isCent = cent_price === '1';
const app = 'trade';
const host = env === 'dev' ?   'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';
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
        this.state = { visible: false, stayFlag: false, receiptFlag: false, paymentUrl: '', isPaySuccess: false, pollingFlag: false };
    }

    componentDidMount () {
        const opt = {
            mode: 'post',
            method: '/activity/oneYuanActivityVisibleState',
            args: { app, action: 'get' },
            apiName: 'aiyong.activity.oneyuan.visiblestate.config',
            host,
        };
        const _promiseItem =   $ayApi.apiAsync(opt);
        _promiseItem.then((res) => {
            const { isShown } = res.body || {};
            if (isShown) return;
            $mappUtils.hideTabBar();
            this.setState({ ...this.state, visible: true });
            buryAdPageView();
            this.setShown();
        });
    }

    setShown () {
        // 已经展示过了，不再展示
        const opt = {
            mode: 'post',
            method: '/activity/oneYuanActivityVisibleState',
            args: { app, action: 'set' },
            apiName: 'aiyong.activity.oneyuan.visiblestate.config',
            host,
        };
        $ayApi.apiAsync(opt);
    }


    onLinkClick () {
        this.setState({ ...this.state, receiptFlag: true });
        if ($mappUtils.isIOS()) {
            $adSensorsBeacon.adOrderNowBeacon(adInfo, '/跳客服', adInfo.pid);
            $openChat.contactCustomerService(`你好，我想参与${service_suffix}`);
        } else {
            const opt = {
                mode: 'post',
                method: '/activity/getOneYuanActivityOrder',
                args: { app, payCount: cent_price },
                apiName: 'aiyong.activity.oneyuan.order.get',
                host,
            };
            const _promiseItem =  $ayApi.apiAsync(opt);
            _promiseItem.then((res) => {
                const { payUrl } = res.body || {};
                // 是否需要提示信息，待确定
                if (!payUrl) return;
                buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
                navigateToWebPage({ url: payUrl });
                this.setState({ ...this.state, paymentUrl: payUrl });
                taskQue(() => {
                    !this.state.pollingFlag &&  this.startPolling();
                }, 2 * 1000);
            });
        }
    }

    startPolling () {
        clearInterval.call(null, this.timer);

        this.setState({ ...this.state, pollingFlag: true });
        const _timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval.call(null, _timer);
                return;
            }
            const opt = {
                mode: 'post',
                method: '/activity/confirmOneYuanPurchaseOrder',
                args: { app },
                apiName: 'aiyong.activity.oneyuan.order.confirm',
                host,
            };
            const _promiseItem =  $ayApi.apiAsync(opt);
            _promiseItem.then((res) => {
                const { payResult } = res.body || {};
                if (!payResult) return;
                this.setState({ ...this.state, pollingFlag: false, isPaySuccess: true });
                $userInfoChanger.updateUserInfo();
            });
        }, 3 * 1000);
        this.timer = _timer;
        this.setState({ ...this.state });
    }
    onCloseModal () {
        this.setState({ ...this.state, stayFlag: true });
    }
    onSendServiceMsg () {
        $openChat.contactCustomerService(`你好，参加${service_suffix}支付失败怎么办？\n链接地址：${this.state.paymentUrl}`);
    }
    onReAction () {
        navigateToWebPage({ url: this.state.paymentUrl });
    }
    onCloseErrModal () {
        this.setState({ ...this.state, pollingFlag: false, visible: false });
        $mappUtils.showTabBar();
        $uninstall();
    }

    render () {
        const {  visible, stayFlag, receiptFlag, isPaySuccess } = this.state;
        if (!user_define || !visible) return null;
        // 支付结果
        if (receiptFlag) {
            return (
                <view>
                    {isPaySuccess ? (
                        <view >
                            <SuccessMB closeBtnName='我知道了'/>
                        </view>
                    ) : (
                        <view >
                            <Error onClose={this.onCloseErrModal.bind(this)} onCustomerService={this.onSendServiceMsg.bind(this)} onAgain={this.onReAction.bind(this)} closeBtnName='关闭'/>
                        </view>

                    )}
                </view>
            );
        }
        // 挽留弹窗
        if (stayFlag) {
            return (
                <view>
                    <TradeMbRetainDialog centPrice={cent_price} onCancel={this.onCloseErrModal.bind(this)} onConfirm={this.onLinkClick.bind(this)} />
                </view>
            );
        }
        // 广告弹窗
        return (
            <FadeContainer inStyle={style.fadeIn}   visible={visible}   style={style.mask} >
                <view style={style.content} >
                    <image onClick={this.onLinkClick.bind(this)} style={{ ...style.img, ...style.cursor }}   mode='widthFix'  src={$mappUtils.isIOS() ? ios_img_url : android_img_url}/>
                    <CloseButton onClose={this.onCloseModal.bind(this)}  text={version || '关闭'}/>
                </view>
            </FadeContainer>
        );
    }
}