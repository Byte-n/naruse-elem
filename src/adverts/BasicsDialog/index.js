import { Component, getStorageSync, navigateToWebPage, setStorageSync } from 'Naruse' ;
import CloseButton from '@components/CloseButton';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';
import { isIOS } from '@utils/platform';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center' ,    flexDirection: 'column',opacity: '0', transform: 'translateY(-50%)'
};
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };
const userInfo = $userInfoChanger.getUserInfo();
const { userNick } = userInfo;
const adInfo = $adImport.adData.results[0];
const countCacheKey = `basics_dialog_${userNick}_${adInfo.creative_id}`;// 缓存计数键值
const toDay = $moment().format('YYYYMMDD');
/**
 * @desc 基础弹窗，点击图片触发事件并关闭弹窗，一天弹出一次，点击关闭按钮关闭弹窗，再无其他逻辑。
 * @author gao01
 * @date 2022/05/05 16:43:55
 */
export default class BasicsDialog extends Component {
    constructor() {
        this.state = {
            animation: false
        }
    }

    componentDidMount() {
        const recorded = getStorageSync(countCacheKey, toDay);
        if (recorded === toDay){
            $uninstall()
            return
        }
        setStorageSync(countCacheKey, toDay)
        setTimeout(() => {
            this.setState({ animation: true });
            buryAdPageView();
        });
    }

    delDialog = ({ btnText,url,cname }) => {
        buryAdOrderNow(cname,btnText);
        navigateToWebPage({ url });
        $uninstall();
    }

    clickPay = () => {
        const forIos = () => {
            const { service } = adInfo.user_define.body;
            $openChat.contactCustomerService(service);
            buryAdOrderNow('/跳客服');
        }
        const forAndroid = () => {
            const { play_link } = adInfo.user_define.body;
            Naruse.navigateToWebPage({ url: play_link });
            buryAdOrderNow('/订购链接');
        }
        isIOS() ? forIos() : forAndroid();
    }

    render() {
        const { animation} = this.state;
        const { img_url,img_size,close_btn_name } = adInfo.user_define.body;
        const imgSize = img_size.split('*');
        return (
            <view>
                {animation && <view style={tradePcContainer}>
                    <view style={{ ...tradePcOrderTem, ...(animation ? dialogBox : {}) }}>
                        <view style={{ position: 'relative', cursor: 'pointer' }} onClick={this.clickPay}>
                            <image style={{ width: imgSize[0] + 'rpx', height: imgSize[1] + 'rpx' }} src={img_url}/>
                        </view>
                        <view>
                            <CloseButton closeBtnName={close_btn_name} dialogClose={this.delDialog}/>
                        </view>
                    </view>
                </view>}
            </view>
        )
    }
}
