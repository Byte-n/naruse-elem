import { ww } from './qwer.js';

const {imageSrcIos,imageSrcAndroid, isCodeBlock, isOneBtn, hotArrIos, hotArrAndroid} = $adImport.adData.result.user_define.body
const pageName = MappUtils.getCurrentPageName();
const isShown = my.getStorageSync({ key: $adImport.adData.result.creative_id + $adImport.adData.result.pid }).data;
class component extends NaruseComponent {
    constructor() {
        this.state = {
            showAnimation:false,
            show:false,
        }
    }
    contactWW(text, nick){
        openChat.contactCustomerService(text, nick);
    }
    // 打开外链
    gotoWebPage (url, isShopLink) {
        if (url.indexOf('http') > -1 || url.indexOf('https') > -1 ) {
            my.qn.navigateToWebPage({ url: url });
            // 购物链接需要展示确认弹窗
            if (isShopLink === 'true') {
                beforePayBeacon(marketing_getState().customAd);
                adAction.saveNewToMarkRedux({
                    key: 'shopConfirmModal',
                    data:  {
                        visible: true,
                        payResultInfo: { url: url, type: 2 },
                    },
                });
            }
        }else if(url.indexOf('miniapp:///') > -1){
            // miniapp:///pages/waterMark/index
            const suffix = url.substr(10,url.length)
            MappUtils.navigateTo({ url: suffix });
        }
    }
    beacon (props, packageName,amountPayable) {
        const { creative_id, creative_name, pid, pid_name, primary_class, secondary_class } = props;
        sensorsBeacon.sensorsBeacon('YY_OrderNow',{
            primary_class:primary_class,
            secondary_class:secondary_class,
            cid: Number(creative_id),
            pid: Number(pid),
            cname: creative_name || '兜底广告',
            pname: pid_name,
            package_name:packageName,
            amount_payable: amountPayable,
            from_pid: Number(pid),
            from_pname: pid_name
        })
    }
    componentDidMount() {
        if (isShown) {
            $adImport.callback(true);
            return;
        }
        // 如果是有tabbar的页面，则隐藏tabbar。
        if(pageName === 'itemIndex' || pageName === 'itemList' || pageName === 'itemMy'){
            MappUtils.hideTabBar()
        }
        this.setState({
            show:true
        })
        setTimeout(() => {
            this.setState({
                showAnimation:true
            })
        }, 1000);
    }
    componentDidUpdate() {
        console.log('我自由啦');
    }
    gethotArr(){
        return MappUtils.isIOS() ? JSON.parse(hotArrIos) : JSON.parse(hotArrAndroid)
    }
    render() {
        const { show, showAnimation } = this.state;
        return show && (
        <view>
            <view style={showAnimation?'position:fixed;top:0;width:100%;opacity:1;transition: opacity .3s;z-index:99999':'position:fixed;top:0;width:100%;opacity:0;transition: opacity .3s;'}>
                <view style="background-color:rgba(0,0,0,.7);width:100%;height:100vh;display:flex;justify-content:center;align-items:center;">
                <view style="width:600rpx;height:700rpx;position:relative;">
                    <image onClick={(e) => {
                        const hotData = this.gethotArr()
                        if(isOneBtn === 'true' || hotData.length === 1){
                            if(hotData[0].type === 'url'){
                                this.gotoWebPage(hotData[0].url,hotData[0].isShopLink)
                            }else{
                                this.contactWW(hotData[0].text)
                            }
                            this.beacon($adImport.adData.result,hotData[0].packageName,hotData[0].amountPayable)
                        }
                    }}
                    src={MappUtils.isIOS() ? imageSrcIos : imageSrcAndroid} style="width:600rpx;height:700rpx;" />
                    {/* 按钮热区 */}
                    {
                        isOneBtn === 'false' ?
                        (
                            <view style="display:flex;flex:0 0 120rpx;justify-content:space-between;width:486rpx;position:absolute;bottom:30rpx;left:60rpx;height:80rpx;overflow:hidden;">
                                { 
                                
                                this.gethotArr().map((item, index) => {
                                    return <button style="width:220rpx;background:red;margin:0 10rpx;opacity:0;"
                                        onClick={(e) => {
                                            if(item.type === 'url'){
                                                this.gotoWebPage(item.url,item.isShopLink)
                                            }else{
                                                this.contactWW(item.text)
                                            }
                                            this.beacon($adImport.adData.result,item.packageName,item.amountPayable)
                                        }}>热区{index}</button>
                                    })
                                }
                            </view>
                            )
                        :''
                    }
                    <view style="text-align:center;margin-top:50rpx;" >
                        <image onClick={(e) =>{
                            this.setState({
                                showAnimation:false
                            })
                            setTimeout(() => {
                                this.setState({
                                    show:false
                                })
                                if(pageName === 'itemIndex' || pageName === 'itemList' || pageName === 'itemMy'){
                                    MappUtils.showTabBar()
                                }
                                $adImport.callback(isCodeBlock);
                                my.setStorageSync({ key: $adImport.adData.result.creative_id + $adImport.adData.result.pid , data: '1' });
                            }, 350);
                        }}  style="width:44rpx;height:44rpx;" src="https://q.aiyongtech.com/item/web/miniappimages/ad-close20220225.png" />
                    </view>
                </view>
                </view>
            </view>
        </view>
        )
    }
}