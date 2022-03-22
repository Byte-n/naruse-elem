import { isIOS } from '@utils/userInfo';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';

// 样式
const buyAdvancedVersion = { width: '750rpx', height: '110vh', background: '#FFF' };
// 商品安卓
const item = { width: '750rpx', height: '100%', position: 'relative', overflow: 'scroll' };
const itemAndroidbg = { width: '750rpx', height: '1269rpx' };
const itemChoseOrderType = { width: '750rpx', height: '260rpx', position: 'absolute', top: '800rpx', display: 'flex', justifyContent: 'space-evenly' };
const itemChoseOrderMonthNum = { width: '210rpx', height: '260rpx' };
const itemFooterPayAdvancedVersion = { width: '750rpx', height: '114rpx', position: 'fixed', bottom: '0' };
// 商品ios
const iosHeaderContent = { width: '750rpx', height: '460rpx' };
const iosDiscount = { width: '750rpx', height: '100%', marginTop: '40rpx', marginBottom: '20rpx', display: 'flex', justifyContent: 'center' };
const iosDiscountBtn = { width: '700rpx', height: '133rpx' };
const iosEnsureTip = { width: '391rpx', height: '30rpx', marginLeft: '25rpx', marginBottom: '24rpx' };
const iosFooterContent = { width: '750rpx', height: '1387rpx' };

// 用户信息
const userInfo = $userInfoChanger.getUserInfo();
// 广告信息
const adInfo = $adImport.adData.results[0];
// item订购地址
// const orderLinkType = {
//     year: 'http://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_190723152728%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1004416437%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=CA42FCE667735449CB70F97A0513864B',
//     halfyear: 'http://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_191016164345%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1004727157%5D&subParams=cycleNum%3A6%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=00EB669AA23C947B76AAD0CEE3EBCC8B',
//     quarter: 'http://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_190723152728%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1004416437%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=A4FAEDB30346B82D31E1D10020A96060',
// };
// trade订购地址
const orderLinkType = {
    year: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210712112101%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007259005%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=8C1EA5D7495651824D3EFD3303511AB8',
    halfyear: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210712112101%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007259005%5D&subParams=cycleNum%3A6%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=482BA52407A87A2151D28BAAEC4F4CC2',
    quarter: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210712112101%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007259005%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=D4BB4E6735CF19FD898D38F50F585F9A',
};
const imgBaseAdress = 'http://q.aiyongtech.com/ad/images';
// item图片地址
// const imgAdress = {
//     android_background: '/5ZWG5ZOBYW5kcm9pZHPlpIfku70gMg==_1647589176465.png',
//     quarter_img: '/57yW57uEIDTlpIfku70=_1647507350518.png',
//     halfyear_img: '/57yW57uEIDE15aSH5Lu9_1647569527750.png',
//     year_img: '/57yW57uEIDIw5aSH5Lu9IDI=_1647569544178.png',
//     select_quarter_img: '/57yW57uEIDTlpIfku70gMg==_1647569719324.png',
//     select_halfyear_img: '/57yW57uEIDE15aSH5Lu9IDI=_1647569750951.png',
//     select_year_img: '/57yW57uEIDIw5aSH5Lu9_1647569775095.png',
//     quarter_payment: '/57yW57uEIDEx5aSH5Lu9_1647507609309.png',
//     halfyear_payment: '/57yW57uEIDEx5aSH5Lu9IDM=_1647569568148.png',
//     year_payment: '/57yW57uEIDEx5aSH5Lu9_1647569580385.png',
//     ios_header: '/57yW57uEIDLlpIfku70=_1647589392096.png',
//     ios_button: '/YW5uaXU=_1647511431592.gif',
//     ios_tip: '/57yW57uEIDnlpIfku70gMw==_1647511446698.png',
//     ios_footer: '/5ZWG5ZOBaU9T5aSH5Lu9IDI=_1647592197357.png',
// };
// trade图片地址
const imgAdress = {
    android_background: '/5Lqk5piTYW5kcm9pZHPlpIfku70=_1647507250632.png',
    quarter_img: '/57yW57uEIDTlpIfku70=_1647507350518.png',
    halfyear_img: '/57yW57uEIDE15aSH5Lu9_1647507412293.png',
    year_img: '/57yW57uEIDIw5aSH5Lu9IDI=_1647507428860.png',
    select_quarter_img: '/57yW57uEIDTlpIfku70gMg==_1647569719324.png',
    select_halfyear_img: '/57yW57uEIDE15aSH5Lu9IDI=_1647593488755.png',
    select_year_img: '/57yW57uEIDIw5aSH5Lu9_1647593601059.png',
    quarter_payment: '/57yW57uEIDEx5aSH5Lu9_1647507609309.png',
    halfyear_payment: '/57yW57uEIDEx5aSH5Lu9IDI=_1647507634951.png',
    year_payment: '/57yW57uEIDEx_1647507664502.png',
    ios_header: '/57yW57uEIDLlpIfku70=_1647511385107.png',
    ios_button: '/YW5uaXU=_1647511431592.gif',
    ios_tip: '/57yW57uEIDnlpIfku70gMw==_1647511446698.png',
    ios_footer: '/5Lqk5piTaU9T5aSH5Lu9_1647511462765.png',
};

/**
 * 商品续费模板
 */
class ContinueBuyAdvancedVersion extends NaruseComponent {
    constructor () {
        this.state = { choseOrderType: 'year' };
    }

    componentDidMount () {
        const { choseOrderType } = this.state;
        console.log('orderLink====', orderLinkType[choseOrderType]);
        my.setNavigationBar({ title: '高级版续费特惠' });
        buryAdPageView();
    }

    /**
     * 安卓跳转订购链接
     */
    jumpOrderLink () {
        const { choseOrderType } = this.state;
        my.qn.navigateToWebPage({ url: orderLinkType[choseOrderType] });
        let beaconText = '';
        if (choseOrderType === 'year') {
            beaconText = '148/年';
        } else if (choseOrderType === 'halfyear') {
            beaconText = '99/半年';
        } else {
            beaconText = '52/季度';
        }
        console.log('androidBeacon');
        buryAdOrderNow(beaconText);
    }

    /**
     * ios打开客服
     */
    openIosService () {
        const { service } = adInfo.user_define.body;
        $openChat.contactCustomerService(service);
        console.log('iosBeacon++++');
        buryAdOrderNow('/跳客服');
    }

    render () {
        const { body } = adInfo.user_define;
        const { choseOrderType } = this.state;
        console.log('body===', adInfo, body);
        const quarterImg = choseOrderType === 'quarter' ? 'select_quarter_img' : 'quarter_img';
        const halfyearImg = choseOrderType === 'halfyear' ? 'select_halfyear_img' : 'halfyear_img';
        const yearImg = choseOrderType === 'year' ? 'select_year_img' : 'year_img';
        const paymentImg = body[choseOrderType + '_payment'];
        console.log('halfyearImg===', quarterImg, halfyearImg, yearImg, paymentImg);
        console.log('imgAdress====', choseOrderType === 'quarter' ? 'select_quarter_img' : 'quarter_img', imgBaseAdress + imgAdress[choseOrderType === 'quarter' ? 'select_quarter_img' : 'quarter_img']);
        return (
            <view style={buyAdvancedVersion}>
                {
                    !isIOS() ? (
                        <view style={item}>
                            <image style={itemAndroidbg} src={imgBaseAdress + imgAdress['android_background']} />
                            <view style={itemChoseOrderType}>
                                <image
                                    onClick={() => this.setState({ choseOrderType: 'quarter' })}
                                    style={itemChoseOrderMonthNum}
                                    src={imgBaseAdress + imgAdress[choseOrderType === 'quarter' ? 'select_quarter_img' : 'quarter_img']}
                                />
                                <image
                                    onClick={() => this.setState({ choseOrderType: 'halfyear' })}
                                    style={itemChoseOrderMonthNum}
                                    src={imgBaseAdress + imgAdress[choseOrderType === 'halfyear' ? 'select_halfyear_img' : 'halfyear_img']}
                                />
                                <image
                                    onClick={() => this.setState({ choseOrderType: 'year' })}
                                    style={itemChoseOrderMonthNum}
                                    src={imgBaseAdress + imgAdress[choseOrderType === 'year' ? 'select_year_img' : 'year_img']}
                                />
                            </view>
                            <view>
                                <image style={itemFooterPayAdvancedVersion} src={imgBaseAdress + imgAdress[choseOrderType + '_payment']} onClick={this.jumpOrderLink} />
                            </view>
                        </view>
                    ) : (
                        <view>
                            <image style={iosHeaderContent} src={imgBaseAdress + imgAdress.ios_header} />
                            <view style={iosDiscount}>
                                <image style={iosDiscountBtn} src={imgBaseAdress + imgAdress.ios_button} onClick={this.openIosService} />
                            </view>
                            <image style={iosEnsureTip} src={imgBaseAdress + imgAdress.ios_tip} />
                            <image style={iosFooterContent} src={imgBaseAdress + imgAdress.ios_footer} />
                        </view>
                    )
                }
            </view>
        );
    }
}
