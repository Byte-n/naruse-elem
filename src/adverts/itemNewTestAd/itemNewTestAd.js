// 商品新增运营位广告
const { imageSrcIos, imageSrcAndroid, isCodeBlock, hotArrIos, hotArrAndroid } = $adImport.adData.result.user_define.body;
/** 当前页面名称 */
const pageName = $mappUtils.getCurrentPageName();
/**
 * 缓存的key
 */
const adCacheKey = $adImport.adData.result.creative_id + $adImport.adData.result.pid + $moment().format('YYYYMMDD');
/**
 * 是否需要展示
 */
const isShown = my.getStorageSync({ key: adCacheKey }).data;
/**
 * 广告数据
 */
const adData = $adImport.adData.results[0];

// 不展示则直接回调关闭
if (isShown) {
    $adImport.callback(true);
}

class component extends NaruseComponent {
    constructor() {
        this.state = {
            show: false,
        }
    }
    contactWW(text, nick) {
        $openChat.contactCustomerService(text, nick);
    }

    close() {
        this.setState({
            show: false
        })
        if (pageName === 'itemIndex' || pageName === 'itemList' || pageName === 'itemMy') {
            $mappUtils.showTabBar()
        }
        $adImport.callback(isCodeBlock);
        my.setStorageSync({ key: adCacheKey, data: '1' });
    }
    // 打开外链
    gotoWebPage(url, isShopLink) {
        if (url.indexOf('http') > -1 || url.indexOf('https') > -1) {
            my.qn.navigateToWebPage({ url: url });
            // 购物链接需要展示确认弹窗
            if (isShopLink === 'true') {
                beforePayBeacon(marketing_getState().customAd);
                adAction.saveNewToMarkRedux({
                    key: 'shopConfirmModal',
                    data: {
                        visible: true,
                        payResultInfo: { url: url, type: 2 },
                    },
                });
            }
        } else if (url.indexOf('miniapp:///') > -1) {
            // miniapp:///pages/waterMark/index
            const suffix = url.substr(10, url.length)
            $mappUtils.navigateTo({ url: suffix });
        }
    }
    beacon(qwer, packageName, amountPayable) {
        const { creative_id, creative_name, pid, pid_name, primary_class, secondary_class } = qwer;
        $sensorsBeacon.sensorsBeacon('YY_OrderNow', {
            primary_class,
            secondary_class,
            cid: Number(creative_id),
            pid: Number(pid),
            cname: creative_name || '兜底广告',
            pname: pid_name,
            package_name: packageName,
            amount_payable: amountPayable,
            from_pid: Number(pid),
            from_pname: pid_name
        })
    }
    componentDidMount() {
        if (isShown) {
            return;
        }
        // 发送初始化埋点
        $adSensorsBeacon.adViewBeacon(adData, adData.pid);
        this.setState({
            show: true
        })
        // 如果是有tabbar的页面，则隐藏tabbar。
        if (pageName === 'itemIndex' || pageName === 'itemList' || pageName === 'itemMy') {
            $mappUtils.hideTabBar()
        }
    }
    gethotArr() {
        return $mappUtils.isIOS() ? JSON.parse(hotArrIos) : JSON.parse(hotArrAndroid)
    }
    render() {
        const { show } = this.state;
        return show && (
            <view>
                <view style={'position:fixed;top:0;width:100%;opacity:1;transition: opacity .3s;z-index:99999'}>
                    <view style="background-color:rgba(0,0,0,.7);width:100%;height:100vh;display:flex;justify-content:center;align-items:center;">
                        <view style="width:600rpx;height:700rpx;position:relative;">
                            <image onClick={(e) => {
                                const hotData = this.gethotArr()
                                if (hotData.length === 1) {
                                    if (hotData[0].type === 'url') {
                                        this.gotoWebPage(hotData[0].url, hotData[0].isShopLink);
                                    } else {
                                        this.contactWW(hotData[0].text);
                                    }
                                    this.beacon($adImport.adData.result, hotData[0].packageName, hotData[0].amountPayable);
                                    this.close();
                                }
                            }}
                                src={$mappUtils.isIOS() ? imageSrcIos : imageSrcAndroid} style="width:600rpx;height:700rpx;" />
                            {/* 按钮热区 */}
                            {
                                this.gethotArr() && this.gethotArr().length > 1 && (
                                    <view style="display:flex;flex:0 0 120rpx;justify-content:space-between;width:486rpx;position:absolute;bottom:30rpx;left:60rpx;height:80rpx;overflow:hidden;">
                                        {
                                            this.gethotArr().map((item, index) => {
                                                return <view style="width:220rpx;background:red;margin:0 10rpx;opacity:0;"
                                                    onClick={(ww) => {
                                                        console.log(ww);
                                                        if (item.type === 'url') {
                                                            this.gotoWebPage(item.url, item.isShopLink)
                                                        } else {
                                                            this.contactWW(item.text)
                                                        }
                                                        console.log('22');
                                                        this.beacon($adImport.adData.result, item.packageName, item.amountPayable)
                                                        console.log('22');
                                                        this.close();
                                                    }}>热区{index}</view>
                                            })
                                        }
                                    </view>)
                            }
                            <view style="text-align:center;margin-top:50rpx;" >
                                <image onClick={this.close} style="width:44rpx;height:44rpx;" src="https://q.aiyongtech.com/item/web/miniappimages/ad-close20220225.png" />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        )
    }
}