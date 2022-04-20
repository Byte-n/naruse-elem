
import { Component, navigateToWebPage } from 'Naruse';
import style from './index.css';

import CloseButton from '@/common/CloseButton';
import FadeContainer, { taskQue } from '@/common/FadeContainer';
import Error from '@/components/oneGoConfirmBuyDialog/error.js';
import SuccessPC from '@/components/oneGoConfirmBuyDialog/successPC.js';
import ItemPcRetainDialog from '@/adverts/itemPcRetainDialog/index';

const adInfo = $adImport.adData.results[0];
const { user_define } = adInfo;
const { footer_url, cent_price, content_url } = user_define.body;

const isCent = cent_price === '1';
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
            args: { app: 'item', action: 'get' },
            apiName: 'aiyong.activity.oneyuan.visiblestate.config',
            host: 'http://tradepre.aiyongtech.com',
        };
        $ayApi.apiAsync(opt)
            .then((res) => {
                const { isShown } = res.body || {};
                if (isShown) return;
                buryAdPageView();
                this.setState({ ...this.state, visible: true });
            })
            .catch(() => {});
    }


    onLinkClick () {
        if ($mappUtils.isIOS()) {
            $adSensorsBeacon.adOrderNowBeacon(adInfo, '/跳客服', adInfo.pid);
            $openChat.contactCustomerService(`你好，我想参与${service_suffix}`);
        } else {
            const opt = {
                mode: 'post',
                method: '/activity/getOneYuanActivityOrder',
                args: { app: 'item', payCount: cent_price },
                apiName: 'aiyong.activity.oneyuan.order.get',
                host: 'http://tradepre.aiyongtech.com',
            };
            $ayApi.apiAsync(opt)
                .then((res) => {
                    console.log('res', res);
                    const { payUrl } = res.body || {};
                    // 是否需要提示信息，待确定
                    if (!payUrl) return;
                    buryAdOrderNow('付款链接跳转', button_text, adInfo.pid);
                    navigateToWebPage({ url: payUrl });
                    taskQue(() => {
                        this.setState({ ...this.state, receiptFlag: true, paymentUrl: payUrl });
                    }, 500);
                    taskQue(() => {
                        !this.state.pollingFlag &&  this.startPolling();
                    }, 1 * 1000);
                })
                .catch(() => {});
        }
    }

    startPolling () {
        this.setState({ ...this.state, pollingFlag: true });
        const timer = setInterval(() => {
            if (!this.state.pollingFlag) {
                clearInterval(timer);
                return;
            }
            const opt = {
                mode: 'post',
                method: '/activity/confirmOneYuanPurchaseOrder',
                args: { app: 'item' },
                apiName: 'aiyong.activity.oneyuan.order.confirm',
                host: 'http://tradepre.aiyongtech.com',
            };
            $ayApi.apiAsync(opt)
                .then((res) => {
                    const { payResult } = res.body || {};
                    if (!payResult) return;
                    this.setState({ ...this.state, pollingFlag: false });
                })
                .catch(() => {});
        }, 2 * 1000);
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
    }
    onRetainPayment () {
        this.setState({ ...this.state, stayFlag: false, receiptFlag: true });
        this.onReAction();
    }
    render () {
        const {  visible, stayFlag, receiptFlag, isPaySuccess } = this.state;
        if (!user_define || !visible) return null;
        // 支付结果
        if (receiptFlag) {
            return (
                <view>
                    {isPaySuccess ? (
                        <view>
                            <SuccessMB closeBtnName='我知道了'/>
                        </view>
                    ) : (
                        <view>
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
                    <ItemPcRetainDialog centPrice={cent_price} onCancel={this.onCloseErrModal.bind(this)} onConfirm={this.onRetainPayment.bind(this)} />;
                </view>
            );
        }
        // 广告弹窗
        return (
            <FadeContainer inStyle={style.fadeIn}   visible={visible}   style={style.mask} >
                <view style={style.content} >
                    <image  onClick={this.onLinkClick.bind(this)} style={{ ...style.img, ...style.cursor }}   mode='widthFix'  src={content_url}/>
                </view>
                <CloseButton onClose={this.onCloseModal.bind(this)} />
                <view style={style.footer}>
                    <image onClick={this.onLinkClick.bind(this)} style={style.footerImg}   mode='widthFix'  src={footer_url}/>
                </view>
            </FadeContainer>
        );
    }
}
