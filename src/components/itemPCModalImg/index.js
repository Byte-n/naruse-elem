
import { Component, navigateToWebPage } from 'Naruse';
import style from './index.css';

import CloseButton from '@/common/CloseButton';
import FadeContainer, { taskQue } from '@/common/FadeContainer';
import Error from '@/components/oneGoConfirmBuyDialog/error.js';
import SuccessPC from '@/components/oneGoConfirmBuyDialog/successPC.js';
import ItemPCRetainDialog from '@/adverts/itemPcRetainDialog/index';


const adInfo = $adImport.adData.results[0];
const { user_define } = adInfo;
const { footer_url, content_url, cent_price, version, env } = user_define.body;
const isCent = cent_price === '1';
const app = 'item';
const host = env === 'dev' ?   'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';
const service_suffix = `一${isCent ? '分' : '元'}购活动`;
const button_text = `1${isCent ? '分' : '元'}/15天`;
const secondary_class = `一${isCent ? '分' : '元'}购弹窗`;

const payUrlOpt = {
    mode: 'post',
    method: '/activity/confirmOneYuanPurchaseOrder',
    args: { app },
    apiName: 'aiyong.activity.oneyuan.order.confirm',
    host,
};
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
            buryAdPageView();
            this.setState({ ...this.state, visible: true });
            this.setShown();
        });
        _promiseItem.catch(() => {});
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
        const p =  $ayApi.apiAsync(opt);
        p.catch(() => {});
    }


    onLinkClick () {
        this.setState({ ...this.state, receiptFlag: true });

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
            console.log('支付链接：', payUrl);
            if (!payUrl) return;
            buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
            navigateToWebPage({ url: payUrl });
            this.setState({ ...this.state, paymentUrl: payUrl });
            taskQue(() => {
                !this.state.pollingFlag &&  this.startPolling();
            }, 2 * 1000);
        });
        _promiseItem.catch(() => {});
    }

    startPolling () {
        clearInterval.call(null, this.timer);
        this.setState({ ...this.state, pollingFlag: true });
        const _timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval.call(null, _timer);
                return;
            }
            const _promiseItem =  $ayApi.apiAsync(payUrlOpt);
            _promiseItem.then((res) => {
                const { payResult } = res.body || {};
                if (!payResult) return;
                this.setState({ ...this.state, pollingFlag: false, isPaySuccess: true });
                $userInfoChanger.updateUserInfo();
            });
            _promiseItem.catch(() => {});
        }, 3 * 1000);
        this.timer = _timer;
    }
    onCloseModal () {
        this.setState({ ...this.state, stayFlag: true });
    }
    onSendServiceMsg () {
        $openChat.contactCustomerService(`你好，参加${service_suffix}支付失败怎么办？\n链接地址：${this.state.paymentUrl}`);
    }
    onReAction () {
        if (this.state.paymentUrl) {
            navigateToWebPage({ url: this.state.paymentUrl });
            return;
        }
        const _promiseItem =  $ayApi.apiAsync(payUrlOpt);
        _promiseItem.then((res) => {
            const { payUrl } = res.body || {};
            // 是否需要提示信息，待确定
            console.log('支付链接：', payUrl);
            if (!payUrl) return;
            buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
            navigateToWebPage({ url: payUrl });
            this.setState({ ...this.state, paymentUrl: payUrl });
        });
        _promiseItem.catch(() => {});
    }
    onCloseErrModal () {
        this.setState({ ...this.state, pollingFlag: false, visible: false });
        // $uninstall && !$uninstall();
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
                            <SuccessPC closeBtnName='我知道了'/>
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
                    <ItemPCRetainDialog centPrice={cent_price} onCancel={this.onCloseErrModal.bind(this)} onConfirm={this.onLinkClick.bind(this)} />
                </view>
            );
        }
        // 广告弹窗
        return (
            <FadeContainer inStyle={style.fadeIn}   visible={visible}   style={style.mask} >
                <view style={style.content} >
                    <view style={style.contentImg}>
                        <image  onClick={this.onLinkClick.bind(this)}     src={content_url}/>
                    </view>
                </view>
                <CloseButton onClose={this.onCloseModal.bind(this)}  text={version  || '关闭'}/>
                <view style={style.footer}>
                    <image onClick={this.onLinkClick.bind(this)} style={style.footerImg}   mode='widthFix'  src={footer_url}/>
                </view>
            </FadeContainer>
        );
    }
}
