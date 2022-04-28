
import { Component, navigateToWebPage } from 'Naruse';
import style from './index.css';

import { isSubUser } from '@utils/index';
import CloseButton from '@/common/CloseButton';
import FadeContainer, { taskQue } from '@/common/FadeContainer';
import Error from '@/components/oneGoConfirmBuyDialog/error.js';
import SuccessItem from '@/components/oneGoConfirmBuyDialog/successItem.js';
import ItemPcRetainDialog from '@/adverts/itemPcRetainDialog/index';


const adInfo = $adImport.adData.results[0];
const { user_define } = adInfo;

const oneCentTag = 'itemOneyuangoA'
const oneYuanTag = 'itemOneyuangoB'
const getParamsByConfig = (config) => {
    const { one_content_url, hundred_content_url } = config;
    return {
        content_url: isOneCent ? one_content_url : hundred_content_url,
        cent_price: isOneCent ? '1' : '100'
    }
}
let content_url, cent_price, isShowAd, isCent, service_suffix, button_text, secondary_class, tag, isOneCent

const { version, env } = user_define.body;
const app = 'item';
const host = env === 'dev' ? 'http://tradepre.aiyongtech.com' : '//trade.aiyongtech.com';
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
    constructor() {
        super();
        this.state = { visible: false, stayFlag: false, receiptFlag: false, paymentUrl: '', isPaySuccess: false, pollingFlag: false };
    }

    componentDidMount() {
        if (isSubUser()) {
            $uninstall();
            return;
        }
        const initInfo = $userInfoChanger.updateUserInfo()
        initInfo.then((info) => {
            tag = info.tag || ''
            isOneCent = tag && tag.includes(oneCentTag);
            const _params = getParamsByConfig(user_define.body)
            content_url = _params.content_url
            cent_price = _params.cent_price
            isShowAd = tag.includes(oneCentTag) || tag.includes(oneYuanTag);
            isCent = cent_price === '1';
            service_suffix = `一${isCent ? '分' : '元'}购活动`;
            button_text = `1${isCent ? '分' : '元'}/15天`;
            secondary_class = `一${isCent ? '分' : '元'}购弹窗`;
            if (!isShowAd) {
                $uninstall();
                return
            }
            const opt = {
                mode: 'post',
                method: '/activity/oneYuanActivityVisibleState',
                args: { app, action: 'get' },
                apiName: 'aiyong.activity.oneyuan.visiblestate.config',
                host,
            };
            const _promiseItem = $ayApi.apiAsync(opt);
            _promiseItem.then((res) => {
                const { isShown } = res.body || {};
                if (isShown) return;
                buryAdPageView();
                this.setState({ ...this.state, visible: true });
                this.setShown();
            });
        })

    }

    setShown() {
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


    onLinkClick() {
        const opt = {
            mode: 'post',
            method: '/activity/getOneYuanActivityOrder',
            args: { app, payCount: cent_price },
            apiName: 'aiyong.activity.oneyuan.order.get',
            host,
        };
        const _promiseItem = $ayApi.apiAsync(opt);
        _promiseItem.then((res) => {
            const { payUrl } = res.body || {};
            // 是否需要提示信息，待确定
            if (!payUrl) return;

            this.setState({ ...this.state, paymentUrl: payUrl, receiptFlag: true });
            buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
            navigateToWebPage({ url: payUrl });
            taskQue(() => {
                !this.state.pollingFlag && this.startPolling();
            }, 2 * 1000);
        });
    }

    startPolling() {
        clearInterval.call(null, this.timer);
        this.setState({ ...this.state, pollingFlag: true });
        const _timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval.call(null, _timer);
                return;
            }
            const _promiseItem = $ayApi.apiAsync(payUrlOpt);
            _promiseItem.then((res) => {
                const { payResult } = res.body || {};
                if (!payResult) return;
                this.setState({ ...this.state, pollingFlag: false, isPaySuccess: true });
                $userInfoChanger.updateUserInfo();
            });
        }, 3 * 1000);
        this.timer = _timer;
    }
    onCloseModal() {
        this.setState({ ...this.state, stayFlag: true });
    }
    onSendServiceMsg() {
        $openChat.contactCustomerService(`你好，参加${service_suffix}支付失败怎么办？链接地址：${this.state.paymentUrl}`);
    }
    onReAction() {
        if (this.state.paymentUrl) {
            navigateToWebPage({ url: this.state.paymentUrl });
            return;
        }
        const opt = {
            mode: 'post',
            method: '/activity/getOneYuanActivityOrder',
            args: { app, payCount: cent_price },
            apiName: 'aiyong.activity.oneyuan.order.get',
            host,
        };
        const _promiseItem = $ayApi.apiAsync(opt);
        _promiseItem.then((res) => {
            const { payUrl } = res.body || {};
            // 是否需要提示信息，待确定
            if (!payUrl) return;
            buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
            navigateToWebPage({ url: payUrl });
            this.setState({ ...this.state, paymentUrl: payUrl });
        });
    }
    onCloseErrModal() {
        this.setState({ ...this.state, pollingFlag: false, visible: false });
        $uninstall();
    }

    render() {
        const { visible, stayFlag, receiptFlag, isPaySuccess } = this.state;
        if (!user_define || !visible) return null;
        console.log(this.state);
        // 支付结果
        if (receiptFlag) {
            return (
                <view>
                    {isPaySuccess ? (
                        <view >
                            <SuccessItem isPc={true} onClone={this.onCloseErrModal.bind(this)} closeBtnName='我知道了' />
                        </view>
                    ) : (
                        <view>
                            <Error onClone={this.onCloseErrModal.bind(this)} onCustomerService={this.onSendServiceMsg.bind(this)} onAgain={this.onReAction.bind(this)} closeBtnName='关闭' />
                        </view>
                    )}
                </view>
            );
        }
        // 挽留弹窗
        if (stayFlag) {
            return (
                <view>
                    <ItemPcRetainDialog centPrice={cent_price} onCancel={this.onCloseErrModal.bind(this)} onConfirm={this.onLinkClick.bind(this)} />
                </view>
            );
        }
        // 广告弹窗
        return (
            <FadeContainer inStyle={style.fadeIn} visible={visible} style={style.mask} >
                <view style={style.content} >
                    <view style={style.contentImg}>
                        <image onClick={this.onLinkClick.bind(this)} src={content_url} />
                    </view>
                </view>
                <CloseButton onClose={this.onCloseModal.bind(this)} text={version || '关闭'} />
            </FadeContainer>
        );
    }
}
