import { isIOS } from '@utils/userInfo';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';
const userInfo = $userInfoChanger.getUserInfo();
console.log('gao_ my', my.env);
console.log('gao_ userInfo', userInfo);
console.log('gao_ adImport', $adImport.adData);
let remainingDay = 0;

const mainStyle = { display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center' };

const titleStyle = {
    color: '#FFFFFF',
    fontSize: '46rpx',
    fontWeight: 'bold',
    position: 'absolute',
    top: '44rpx',
    left: '112rpx',
};
const wrapperStyle = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 900,
};
const dayStyleAll = {
    color: '#E96C5D',
    fontSize: '28rpx',
    fontWeight: 'bold',
    position: 'absolute',
};
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.56rem',
    padding: '10rpx 40rpx',
    border: '2rpx solid',
    borderRadius: '50rpx',
};
const BLUE_BIRD_USER_RENEWALS_PIDS = {
    '5245': { fName: '处理退款', pid: 5245 },
    '5246': { fName: '订单备注', pid: 5246 },
    '5247': { fName: '订单评价', pid: 5247 },
    '5248': { fName: '复制地址', pid: 5248 },
    '5249': { fName: '解密地址', pid: 5249 },
    '5250': { fName: '一键发货', pid: 5250 },
};
const { userNick } = userInfo;
const toDay = $moment().format('YYYYMMDD');
const countCacheKey = `count_${userNick}_renewals_dialog`;// 缓存计数键值


export class Template extends NaruseComponent {
    constructor () {
        this.state = { dialogVisible: false };
    }

    componentDidMount () {
        // 不是目标人群不弹
        console.log('gao_ componentDidMount');
        if (!this.isBlueBird15RenewalsPlan()) {
            return;
        }

        const dialogSign = my.getStorageSync({ key: countCacheKey }).data;
        console.log('gao_ dialogSign', dialogSign);
        // 今天已经弹出过, 不处理
        if (dialogSign === toDay) {
            return;
        }
        buryAdPageView();
        this.setState({ dialogVisible: true });
    }

    closeDialog () {
        my.setStorageSync({ key: countCacheKey, data: toDay });
        this.setState({ dialogVisible: false });
    }

    getAdKey () {
        const prefix = isIOS() ? 'ios' : 'android';
        return {
            img: `${prefix}_img`,
            btn: 'btn_name',
            urlUp: `${prefix}_url_up`,
            urlDown: `${prefix}_url_down`,
            service: 'service',
            imgSize: 'img_size',
        };
    }

    getIosPlanA () {
        const dayStyle = {
            top: '124rpx',
            left: '290rpx', ...dayStyleAll,
        };

        const buyBtnStyle = {
            width: '436rpx',
            height: '92rpx',
            position: 'absolute',
            left: '82rpx',
            bottom: '208rpx',
        };

        const adInfo = $adImport.adData.results[0];
        const { body } = adInfo.user_define;
        const { pid } = adInfo;
        const adKey = this.getAdKey();
        const imgSize = body[adKey.imgSize].split('*');

        const text = body[adKey.service].replace(`[${adKey.urlUp}]`, body[adKey.urlUp])
            .replace(`[${adKey.urlDown}]`, body[adKey.urlDown]);
        console.log('gao body[adKey.service]', body[adKey.service], text);
        function buyBtnClick () {
            buryAdOrderNow('/跳客服');
            $openChat.contactCustomerService(text);
        }

        return (<view style={wrapperStyle}>
            <view style={mainStyle}>
                <image style={{ width: `${imgSize[0]}rpx`, height: `${imgSize[1]}rpx` }} src={body[adKey.img]}/>
                <view style={titleStyle}> {`恭喜解锁${BLUE_BIRD_USER_RENEWALS_PIDS[pid].fName}功能`}</view>
                <view style={dayStyle}> {remainingDay} </view>
                <text style={buyBtnStyle} onClick={buyBtnClick}> </text>
                <text style={closeStyle} onClick={this.closeDialog}>
                    {body[adKey.btn]}
                </text>
            </view>
        </view>);
    }

    getAndroidPlanA () {
        const dayStyle = {
            top: '114rpx',
            left: '292rpx', ...dayStyleAll,
        };

        const buyBtnStyle = {
            width: '436rpx',
            height: '92rpx',
            position: 'absolute',
            left: '82rpx',
        };
        const buyBtnUp = { bottom: '280rpx', ...buyBtnStyle };
        const buyBtnDown = { bottom: '168rpx', ...buyBtnStyle };

        const adInfo = $adImport.adData.results[0];
        const { body } = adInfo.user_define;
        const { pid } = adInfo;
        const adKey = this.getAdKey();
        const imgSize = body[adKey.imgSize].split('*');
        const _this = this;
        const price = {
            up: '148/年',
            down: '52/季',
        };

        function jumpUrl (url, btnText) {
            return function () {
                console.log('gao_ btnText', btnText);
                buryAdOrderNow(btnText);
                _this.gotoWebPage(url);
            };
        }

        return (
            <view style={wrapperStyle}>
                <view style={mainStyle}>
                    <image style={{ width: `${imgSize[0]}rpx`, height: `${imgSize[1]}rpx` }} src={body[adKey.img]}/>
                    <view style={titleStyle}> {`恭喜解锁${BLUE_BIRD_USER_RENEWALS_PIDS[pid].fName}功能`}</view>
                    <view style={dayStyle}> {remainingDay} </view>
                    <text style={buyBtnUp} onClick={jumpUrl(body[adKey.urlUp], price.up)}></text>
                    <text style={buyBtnDown} onClick={jumpUrl(body[adKey.urlDown], price.down)}></text>
                    <text style={closeStyle} onClick={this.closeDialog}>
                        {body[adKey.btn]}
                    </text>
                </view>
            </view>
        );
    }

    isBlueBird15RenewalsPlan () {
        console.log('gao isBlueBird15RenewalsPlan',);
        const { tag, promotion, vipFlag, vipTime } = userInfo;
        console.log('gao 1');
        const timeDistance = $moment(promotion, 'YYYY-MM-DD hh:mm:ss').diff($moment());
        const _day = Math.ceil(timeDistance / 100 / 10 / 3600 / 24);

        remainingDay = _day < 10 ? `0${_day}` : _day;
        console.log('gao 3', _day);
        // 有青鸟tag
        const userTag = tag.includes('newUserRenewTest') || tag.includes('extendUserRenewTest');
        console.log('gao 4',);
        // 在青鸟有效期内
        const soonExpire = (_day < 15) && (vipFlag === 1);

        // 没购买过
        const notBuy = $moment(vipTime, 'YYYY-MM-DD hh:mm:ss').diff(promotion) <= 0;
        console.log('userTag && soonExpire && notBuy', userTag, soonExpire, notBuy);

        return userTag && soonExpire && notBuy;
    }

    gotoWebPage (url, isShopLink) {
        if (url.indexOf('http') > -1 || url.indexOf('https') > -1) {
            my.qn.navigateToWebPage({ url });
            // 购物链接需要展示确认弹窗
            if (isShopLink === 'true') {
                beforePayBeacon(marketing_getState().customAd);
                adAction.saveNewToMarkRedux({
                    key: 'shopConfirmModal',
                    data: {
                        visible: true,
                        payResultInfo: { url, type: 2 },
                    },
                });
            }
        } else if (url.indexOf('miniapp:///') > -1) {
            // miniapp:///pages/waterMark/index
            const suffix = url.substr(10, url.length);
            $mappUtils.navigateTo({ url: suffix });
        }
    }

    getTemplate () {
        return isIOS() ? this.getIosPlanA() : this.getAndroidPlanA();
    }

    render () {
        console.log('gao_ render1',);
        const { dialogVisible } = this.state;
        console.log('gao_ dialogVisible', dialogVisible);
        return (
            <view>
                { dialogVisible && this.getTemplate()}
            </view>
        );
    }
}