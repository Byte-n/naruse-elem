import ConfirmBuyedDialog from '@components/confirmBuyedDialog';
import { Component,navigateToWebPage ,setStorageSync,getStorageSync} from 'Naruse' ;

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center' ,    flexDirection: 'column',opacity: '0', transform: 'translateY(-50%)'
};
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };


const buyBtnStyle = {
    width: '280rpx',
    height: '115rpx',
    position: 'absolute',
    bottom: '30rpx',
    cursor: 'pointer'
};
const buyBtnHoverStyle = { backgroundColor: 'white', color: '#666666'  }
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10px 40px',
    border: '2px solid #FFF',
    borderRadius: '50px',
    cursor: 'pointer',
    marginTop:'40rpx'
};

const { userNick } = $userInfoChanger.getUserInfo();
const adInfo = $adImport.adData.results[0];
const toDay = $moment().format('YYYYMMDD');
const countCacheKey = `upper_right_flag_dialog_${userNick}`;// 缓存计数键值

const { pid } = adInfo;

export const buryAdPageView = (cname) => {
    adInfo.creative_name = cname;
    $adSensorsBeacon.adViewBeacon(adInfo, pid);

};

export const buryAdOrderNow = (cname,btnText) => {
    adInfo.creative_name = cname;
    $adSensorsBeacon.adOrderNowBeacon(adInfo, btnText , pid);
};

``
/**
 * @desc pc右上旗标点击之后的弹窗,该弹窗关闭时,次数大于1次后会追加弹出挽留弹窗,一天后重置
 * @author gao01
 * @date 2022/04/08 00:01:57
 */
export default class upper_right_flag_dialog extends Component {
    constructor() {
        this.state = {
            upperRightFlagDialogVisible: true,
            retainDialogVisible: false,
            payResVisible: false,
            animation: false
        }
    }

    componentDidMount() {
            setTimeout(() => {
                this.setState({ animation: true });
                buryAdPageView('PC续费落地页A')
            });
    }

    buyBtnClick = ({ btnText,url,cname }) => {
        buryAdOrderNow(cname,btnText);
        navigateToWebPage({ url });
        this.setState({ upperRightFlagDialogVisible:false,retainDialogVisible:false, payResVisible: true });
    }

    /**
     * @desc pc右上角旗标续费弹窗
     * @author gao01
     * @date 2022/04/08 17:15:12
     */
    upperRightFlagDialog = () => {
        const { flagImgSrc, img_size ,closeBtnName,buyLink1,buyLink2,buyLink3} = adInfo.user_define.body;
        const { animation } = this.state;
        const imgSize = img_size.split('*');
        const imgStyle = { width: `${imgSize[0]}px`, height: `${imgSize[1]}px`}

        const closePopup = () => {
            const recorded = getStorageSync(countCacheKey, toDay)
            this.setState({ upperRightFlagDialogVisible: false,animation: false} );
            console.log('gao recorded === toDay', recorded ,toDay,recorded === toDay);
            if(recorded === toDay){
               this.setState({ retainDialogVisible: true });
               buryAdPageView('PC续费挽留A')
               setTimeout(() => {
                    this.setState({ animation: true });
               });
            }else{
                setStorageSync(countCacheKey, toDay)
                $uninstall();
            }
        }

        console.log('imgStyle', imgStyle);
        return(
            <view style={{ ...tradePcOrderTem,  ...(animation ? dialogBox : {}) }}>
                <view style={{ position:'relative'}}>
                    <image  src={flagImgSrc} />
                    <text style={{ ...buyBtnStyle,left: '95rpx' }} onClick={() => {this.buyBtnClick({ btnText:'52/3个月',url:buyLink1,cname:'PC续费落地页A-季度' })}}/>
                    <text style={{ ...buyBtnStyle,left: '435rpx' }} onClick={() => {this.buyBtnClick({ btnText:'99/6个月',url:buyLink2,cname:'PC续费落地页A-半年' })}}/>
                    <text style={{ ...buyBtnStyle,left: '770rpx' }} onClick={() => {this.buyBtnClick({ btnText:'148/12个月',url:buyLink3,cname:'PC续费落地页A-年度'})}}/>
                </view>
                <view>
                    <view style={closeStyle} hoverStyle={buyBtnHoverStyle} onClick={closePopup} > {closeBtnName} </view>
                </view>
            </view>
        )
    }

    /**
     * @desc 挽留弹窗
     * @author gao01
     * @date 2022/04/08 17:15:32
     */
    getRetainDialog = () => {
        const { retainImgSrc,closeBtnName,buyLinkRetain} = adInfo.user_define.body;
        const { animation } = this.state;
        const  retainDialogClose = () => {
            $uninstall();
        }

        return (
        <view style={{ ...tradePcOrderTem,...(animation ? dialogBox : {}) }}>
            <view style={{ position:'relative',   cursor: 'pointer'}} onClick={() => {this.buyBtnClick({ btnText:'天降红包/1个月',url:buyLinkRetain,cname:'PC续费挽留A-年度'})}}>
                <image src={retainImgSrc} />
               </view>
            <view>
                <view style={closeStyle} hoverStyle={buyBtnHoverStyle} onClick={retainDialogClose} > {closeBtnName} </view>
            </view>
        </view>
        )
    }

    getDialog = () => {
        const { upperRightFlagDialogVisible,retainDialogVisible } = this.state;
        return (
            <view style={tradePcContainer}>
                {upperRightFlagDialogVisible && this.upperRightFlagDialog()}
                {retainDialogVisible && this.getRetainDialog()}
            </view>
        )
    }

    render() {
        const { upperRightFlagDialogVisible,retainDialogVisible, payResVisible, reBuyLink } = this.state;
        const haveDialog = upperRightFlagDialogVisible || retainDialogVisible
        return (
            <view>
                {haveDialog && this.getDialog()}
                {payResVisible && <ConfirmBuyedDialog onClose={$uninstall} reBuyLink={reBuyLink} />}
            </view>
        )
    }
}
