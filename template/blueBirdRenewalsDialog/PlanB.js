const wrapperStyle = {display:'flex',width:'100vw',height: '100vh',position:'fixed',top:0,left:0,justifyContent: 'center',alignItems:'center',backgroundColor:'rgba(0, 0, 0, 0.7)',zIndex:900}
const mainStyle = {display:'flex',flexDirection:'column',position:'relative',alignItems:'center'}
const closeStyle = {color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.56rem',
    padding: '10rpx 40rpx',
    border: '2rpx solid',
    borderRadius: '50rpx',
}
const titleStyle = {
    color: '#FFFFFF',
    fontSize: '40rpx',
    fontWeight: 'bold',
    position: 'absolute',
    top: '36rpx',
    left: '136rpx'
}
const dayStyle = {color:'#E96C5D',fontSize: '15px',fontWeight: 'bold',position:'absolute',top: '94rpx',left: '374rpx',lineHeight:'1'}
const jumpBtnAll = {width:'160rpx',height: '60rpx',position:'absolute',left: '400rpx'}

const jumpBtn_1= Object.assign({ bottom: '526rpx' }, jumpBtnAll)

const jumpBtn_2 = Object.assign({ bottom: '412rpx' }, jumpBtnAll)

const jumpBtn_3 = Object.assign({ bottom: '300rpx' }, jumpBtnAll)

const buyBtn= {width:'460rpx',height: '92rpx',position:'absolute',left: '70rpx',bottom: '136rpx'}

const userInfo = $userInfoChanger.getUserInfo()
const BLUE_BIRD_USER_RENEWALS_PIDS = {
    '5245': {fName: '处理退款', pid: 5245},
    '5246': {fName: '订单备注', pid: 5246},
    '5247': {fName: '订单评价', pid: 5247},
    '5248': {fName: '复制地址', pid: 5248},
    '5249': {fName: '解密地址', pid: 5249},
    '5250': {fName: '一键发货', pid: 5250},
}
let remainingDay = 0
const adInfo = $adImport.adData.results[0];
console.log('gao adInfo', adInfo)
console.log('gao env',   my.getSystemInfoSync())
class blueBirdRenewalsDialog extends NaruseComponent {
    constructor() {
        this.state = {
            dialogVisible: false,
        }
    }

    componentDidMount(){
        // 不是目标人群不弹
        console.log('gao_ componentDidMount')
        if (!this.isBlueBird15RenewalsPlan()) {
            return
        }
        const {userNick} = userInfo;

        // 缓存计数键值
        const countCacheKey = 'count_' + userNick + '_renewals_dialog_' + $moment().format('YYYYMMDD');
        const countCacheVal = '1';

        const dialogCount = my.getStorageSync({key: countCacheKey}).data;
        console.log('gao_ dialogCount', dialogCount)
        // 今天已经弹出过, 不处理
        if (dialogCount === countCacheVal) {
            return;
        }
        console.log('gao_ 1')
        this.setState({dialogVisible: true})
        my.setStorageSync({key: countCacheKey, data: countCacheVal});
    }

    getAdKey() {
        const prefix = this.isIOS() ? 'ios' : 'android'
        return {
            img: 'img_url',
            btn: 'btn_name',
            urlUp: prefix + '_url_up',
            urlDown: prefix + '_url_down',
            service: 'service',
            imgSize: 'img_size',
        }
    }

    isIOS() {
        const {platform} = my.getSystemInfoSync();
        return ['iOS','ios'].includes(platform)
    };
    
    iosBuy(){
        const {body} = adInfo.user_define;
        const {userNick} = userInfo;
        const text = body.service.replace('[ios_url]', body.ios_url);
        console.log('buy ios',text )
        $openChat.contactCustomerService(text, userNick);
    }
    
    androidBuy(){
        const {body} = adInfo.user_define;
        console.log('buy androidBuy', )
        this.gotoWebPage(body.android_url)
        $adSensorsBeacon.adOrderNowBeacon(adInfo, '148/年', '')
    }

    isBlueBird15RenewalsPlan() {
        const {tag, promotion, vipFlag, vipTime} = userInfo;
        console.log('gao 1')
        const timeDistance = $moment(promotion,'YYYY-MM-DD hh:mm:ss').diff($moment());
        console.log('gao 2', timeDistance)
        const _day = Math.ceil(timeDistance / 100 / 10 / 3600 / 24);
        // const _day = 9;
        remainingDay = _day < 10 ? '0' + _day : _day
        console.log('gao 3', _day)
        // 有青鸟tag
        const userTag = tag.includes('newUserRenewTest') || tag.includes('extendUserRenewTest');
        console.log('gao 4',)
        // 在青鸟有效期内
        const soonExpire = (_day < 15) && (vipFlag === 1);
        // 没购买过
        const notBuy = $moment(vipTime,'YYYY-MM-DD hh:mm:ss').diff(promotion) <= 0
        console.log('userTag && soonExpire && notBuy', userTag, soonExpire, notBuy)

        return userTag && soonExpire && notBuy
    };
    
    gotoWebPage(url, isShopLink) {
        if (url.indexOf('http') > -1 || url.indexOf('https') > -1) {
            my.qn.navigateToWebPage({url: url});
            // 购物链接需要展示确认弹窗
            if (isShopLink === 'true') {
                beforePayBeacon(marketing_getState().customAd);
                adAction.saveNewToMarkRedux({
                    key: 'shopConfirmModal',
                    data: {
                        visible: true,
                        payResultInfo: {url: url, type: 2},
                    },
                });
            }
        } else if (url.indexOf('miniapp:///') > -1) {
            // miniapp:///pages/waterMark/index
            const suffix = url.substr(10, url.length)
            $mappUtils.navigateTo({url: suffix});
        }
    }
    
    closeDialog() {
        this.setState({dialogVisible: false})
    }

    render() {
       
        const _this = this;
        const {dialogVisible} = this.state;
        const {body} = adInfo.user_define;
        const {pid} = adInfo
        const adKey = this.getAdKey();
        const imgSize = body[adKey.imgSize].split('*');
        const jumpBtnClick = function (url) {
            return function () {
                console.log('gao jumpBtnClick',url )
                my.navigateTo({ url: url })
            }
        }
        const buyClick = function () {
            return _this.isIOS() ? _this.iosBuy : _this.androidBuy 
        }
        console.log('gao render 4', )
        return (<view>
            {dialogVisible && <view style={wrapperStyle}>
                <view style={mainStyle}>
                    <image style={{width: imgSize[0] + 'rpx', height: imgSize[1] + 'rpx'}} src={body.img}/>
                    <view style={titleStyle}> {'恭喜解锁' + BLUE_BIRD_USER_RENEWALS_PIDS[pid].fName + '功能'}</view>
                    <view style={dayStyle}> {remainingDay} </view>
                    <text style={jumpBtn_1} onClick={jumpBtnClick('/pages/my/index')}>  </text>
                    <text style={jumpBtn_2} onClick={jumpBtnClick('/pages/tradeSearch/index')}>  </text>
                    <text style={jumpBtn_3} onClick={jumpBtnClick('/pages/rateManagement/index')}>  </text>
                    <text style={buyBtn} onClick={buyClick()}>  </text>
                    <text style={closeStyle} onClick={this.closeDialog}>
                        {body[adKey.btn]}
                    </text>
                </view>
            </view>}
        </view>)
    }
}