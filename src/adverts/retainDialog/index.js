import ConfirmBuyedDialogM from '@components/confirmBuyedDialogM';
import { Component, navigateToWebPage } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';
import style from './index.css';
import { isIOS,isNotVip } from '@utils/userInfo';

// 模板样式

// 用户信息
const userInfo = $userInfoChanger.getUserInfo();
// 广告信息
const adInfo = $adImport.adData.results[0];
const {
    android_url,
    text,
    img_url,
    btn_name,
    frequency
} = adInfo.user_define.body;
const toDay = $moment().format('YYYYMMDD');

/**
 * 缓存的key
 */
const adCacheKey = adInfo.creative_id + '-' + adInfo.pid;

// 根据frequency计算 更新缓存的日期
const frequencyDay = $moment(toDay).add(frequency, 'd').format('YYYYMMDD');

/**
 * Pc功能点模板
 */
export default class TradePcOrderTem extends Component {
    constructor() {
        this.state = {
            isShow: false,
            isShowPayRes: false,
            animation: true,
            reBuyLink: android_url,
        };
    }

    componentDidMount() {
        let _adCacheKey = my.getStorageSync({ key: adCacheKey }).data;
        // 缓存里取到设置的展示频率 和 现在设置的不一样。则更新当前的广告展示频率，并从今天开始重新计时。
        if(_adCacheKey && _adCacheKey.frequency != frequency){
            // 今天是否展示过
            if(_adCacheKey.showDate === toDay){
                const data = {
                    frequencyDay: frequencyDay,
                    frequency:frequency,
                    showDate:toDay
                };
                my.setStorageSync({ key: adCacheKey, data:data  });
            }else{
                this.openAd()
            }
        }else{
            if(_adCacheKey && _adCacheKey.frequencyDay > toDay ){
            }else{
                this.openAd()
            }
        }

        
    }

    // 展示广告
    openAd = () => {
        const { creative_id, creative_name, secondary_class, pid_name, primary_class,pid } = adInfo;
        $sensorsBeacon.sensorsBeacon('YY_AdPageview', {
            primary_class,
            secondary_class,
            cid: Number(creative_id),
            pid: Number(pid) ,
            cname: creative_name,
            pname: pid_name,
            from_pid: pid,
            from_pname: pid_name,
        });
        $mappUtils.hideTabBar();
        // 发送初始化埋点
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false, isShow:true });
        });
        const data = {
            frequencyDay: frequencyDay,
            frequency:frequency,
            showDate:toDay
        };
        my.setStorageSync({ key: adCacheKey, data:data  });
    }
    /**
     * 跳转订购
     * @param {String} type 订购类型
     */
    jumpOrderLink = () =>  {
        $mappUtils.showTabBar();
        buryAdOrderNow(btn_name);
        if(isIOS()){
            $openChat.contactCustomerService(text);
        }else{
            my.qn.navigateToWebPage({ url: android_url });
        }
        this.setState({ isShowPayRes: true, isShow:false });
    }

    /**
     * 模板弹窗关闭
     */
    colsePopup = () => {
        $mappUtils.showTabBar();
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ isShow: false, isShowPayRes: false });
            $uninstall();
        });
    }

    render() {
        const { isShow, isShowPayRes, animation, reBuyLink } = this.state;
        return (
            <view>
                <view>
                {
                    isShowPayRes && <ConfirmBuyedDialogM onClose={() => this.setState({ isShowPayRes: false })} reBuyLink={reBuyLink} text={text} />
                }
                </view>
                {
                    isShow && (
                        <view style={style.warpStyle}>
                            <image style={style.image} onClick={() => this.jumpOrderLink()} src={img_url} ></image>
                            <view style={style.closeBox}>
                                <image onClick={this.colsePopup} style={style.closeBtn} src="https://q.aiyongtech.com/item/web/miniappimages/ad-close20220225.png" ></image>
                            </view>
                        </view>
                    )
                }
            </view>
        )
    }
}