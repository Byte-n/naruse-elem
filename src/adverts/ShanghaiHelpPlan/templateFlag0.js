import ConfirmBuyedDialog from '@components/confirmBuyedDialog';
import ConfirmBuyedDialogM from '@components/confirmBuyedDialogM';
import { Component } from 'Naruse' ;
import CloseButton from '@components/CloseButton';
import { isIOS } from '@utils/userInfo';
import { buryAdOrderNow } from '@utils/beacon';
import { addActivityComplete, updateRedis } from '../../service/activity';
import { isAppTrade, isPC } from '@utils/platform';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center' ,    flexDirection: 'column',opacity: '0', transform: 'translateY(-50%)'
};
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };
const userInfo = $userInfoChanger.getUserInfo();
const { userNick } = userInfo;

const buyBtnStyleAll = {
    position: 'absolute',
    cursor: 'pointer',

};

const adInfo = $adImport.adData.results[0];

const { pid } = adInfo;

const {closeBtnName,link_up,link_down,ios_service,charge_img,free_img,charge_img_ios} = adInfo.user_define.body;

const adDefine = {
    img_style:"",
    btnText:"",
    buyBtnStyle:"",
    apiName:""
}
console.log('gao isPC()',isPC());
console.log('gao isAppTrade()',isAppTrade());
adDefine.img_style = isPC() ? { width: 'auto', height: 'auto'} : { width: '600rpx', height: '720rpx'};
adDefine.buyBtnStyle = isPC() ? { width: '445rpx', height: '75rpx', left: '270rpx' } : {width: '475rpx', height: '105rpx', left: '55rpx'};
adDefine.buyBtnBottom = isPC() ? { up: '195rpx', down: '105rpx'} : { up: '270rpx', down: '125rpx'};
adDefine.apiName = isAppTrade() ? 'shanghaiAidTradeFlag0' : 'shanghaiAidItemFlag0';
adDefine.btnText = isAppTrade() ? { up: '74元/6个月', down: '148元/12个月'} : { up: '69元/6个月', down: '138元/12个月'};


console.log('gao  obj', adDefine);

export const buryAdPageView = (secondary_class) => {
    $adSensorsBeacon.adViewBeacon({ ...adInfo, secondary_class }, pid);
};

const delDialog = () => {
    $mappUtils.showTabBar()
    $uninstall()
}

/**
 * @desc 初级版组件
 * @author gao01
 * @date 2022/04/28 10:38:26
 */
export default class TemplateFlag0 extends Component {
    constructor() {
        this.state = {
            giveDialogVisible: true,
            orderDialogVisible: false,
            payResVisible: false,
            animation: false,
            reBuyLink: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animation: true });
            $mappUtils.hideTabBar()
            buryAdPageView('上海助力赠送')
        });
    }

    /**
     * @desc 赠送弹窗
     * @author gao01
     * @date 2022/04/28 13:21:59
     */
    getGiveDialog = () => {
        const { animation } = this.state;
        const {img_style,apiName} = adDefine

        const buyBtnClick = () => {
            buryAdOrderNow('赠送15天/初级版');
            console.log('gao 赠送成功', );

            const error = (e) => {
                console.log('gao e', e);
                $mappUtils.showTabBar()
                delDialog()

            }
            this.setState({ giveDialogVisible:false});
            addActivityComplete({"activityCode": apiName ,nick:"老白你在哪"}).then((res) => {
                console.log('gao addActivityComplete', res);
                if(res.code != 200){
                    error()
                    return
                }
                const updateRedisCb = (res) => {
                    console.log('gao updateRedis',res );
                    $userInfoChanger.updateUserInfo();
                    buryAdPageView('上海助力订购')
                    this.setState({ orderDialogVisible:true});
                }
                updateRedis({nick:userNick}).then(updateRedisCb,updateRedisCb)
            },error)

        }

        return(
            <view style={{ ...tradePcOrderTem, ...(animation ? dialogBox : {}) }}>
                <view style={{ position:'relative', cursor: 'pointer' }} onClick={() => {buyBtnClick()}}>
                    <image style={img_style} src={free_img} />
                </view>
                <view>
                    <CloseButton closeBtnName={closeBtnName} dialogClose={delDialog} />
                </view>
            </view>
        )
    }

    /**
     * @desc 订购弹窗
     * @author gao01
     * @date 2022/04/28 11:32:38
     */
    getOrderDialog = () => {
        const { animation } = this.state;

        const buyBtnClick = ({ btnText,url }) => {
            console.log('gao{ btnText,url }', { btnText,url });

            Naruse.navigateToWebPage({ url });
            buryAdOrderNow(btnText);
            this.setState({ orderDialogVisible:false, payResVisible: true, reBuyLink:url });
        }
        const {img_style,btnText,buyBtnStyle,buyBtnBottom} = adDefine
        return (
            <view style={{ ...tradePcOrderTem,...(animation ? dialogBox : {}) }}>
                <view style={{ position:'relative', cursor: 'pointer'}} >
                    <image style={img_style} src={charge_img} />
                    <text style={{ ...buyBtnStyleAll,...buyBtnStyle, bottom: buyBtnBottom.up }} onClick={() => {buyBtnClick({ btnText:btnText.up,url:link_up })}}/>
                    <text style={{ ...buyBtnStyleAll,...buyBtnStyle, bottom: buyBtnBottom.down }} onClick={() => {buyBtnClick({ btnText:btnText.down,url:link_down })}}/>
                </view>
                <view>
                    <CloseButton closeBtnName={closeBtnName} dialogClose={delDialog} />
                </view>
            </view>
        )
    }

    /**
     * @desc 订购弹窗ios
     * @author gao01
     * @date 2022/04/28 11:32:38
     */
    getOrderDialogIos = () => {
        const { animation } = this.state;
        const buyBtnClick = (btnText) => {
            console.log('gao body[adKey.service]', ios_service);
            buryAdOrderNow(btnText);
            $openChat.contactCustomerService(ios_service);
            this.setState({ orderDialogVisible:false, payResVisible: true });
        }
        const {img_style} = adDefine
        return (
            <view style={{ ...tradePcOrderTem,...(animation ? dialogBox : {}) }}>
                <view style={{ position:'relative', cursor: 'pointer'}} onClick={() => {buyBtnClick('跳客服/1')}}>
                    <image style={img_style} src={charge_img_ios} />
                </view>
                <view>
                    <CloseButton closeBtnName={closeBtnName} dialogClose={delDialog} />
                </view>
            </view>
        )
    }

    getDialog = () => {
        const { giveDialogVisible,orderDialogVisible } = this.state;
        return (
            <view style={tradePcContainer}>
                {giveDialogVisible && this.getGiveDialog()}
                {orderDialogVisible && (isIOS() ? this.getOrderDialogIos() : this.getOrderDialog())}
            </view>
        )
    }

    getBuyedDialog = () => {
        const { reBuyLink } = this.state;
        return isPC() ? <ConfirmBuyedDialog onClose={delDialog} reBuyLink={reBuyLink} /> : <ConfirmBuyedDialogM onClose={delDialog} reBuyLink={reBuyLink} text={ios_service} />
    }

    render() {
        const { payResVisible } = this.state;
        return (
            <view>
                {this.getDialog()}
                {payResVisible && this.getBuyedDialog()}
            </view>
        )
    }
}
