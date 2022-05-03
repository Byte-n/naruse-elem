import { Component } from 'Naruse';
import CloseButton from '@components/CloseButton';
import { getToast } from '@adverts/ShanghaiHelpPlan/toast';
import { addActivityComplete } from '../../service/activity';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';
import { isPC } from '@utils/platform';

// 模板样式
const tradePcContainer = { width: '100vw', height: '100vh', position: 'fixed', top: '0', left: '0', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 900 };
const tradePcOrderTem = {  display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: '0', transform: 'translateY(-50%)' };
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };

const adInfo = $adImport.adData.results[0];

const { closeBtnName, ad_img ,toast_success,toast_error} = adInfo.user_define.body;

const adDefine = {
    img_style: '',
};
adDefine.img_style = isPC() ? { width: '1000rpx', height: '570rpx' } : { width: '600rpx', height: '720rpx' };


const delDialog = () => {
    $mappUtils.showTabBar()
    $uninstall()
}

/**
 * @desc 高级版组件
 * @author gao01
 * @date 2022/04/28 10:38:26
 */
export default class TemplateFlag1 extends Component {
    constructor() {
        this.state = {
            dialogVisible: true,
            toastVisible: false,
            toastMsg: toast_success,
            animation: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ animation: true });
            $mappUtils.hideTabBar()
            buryAdPageView()
        });
    }

    buyBtnClick = () => {
        this.setState({ dialogVisible:false});
        buryAdOrderNow('延长15天/高级版');
        const addActivityCompleteFinally = () => {
            this.setState({ toastVisible:true});
            setTimeout(() => {
                $uninstall();
            },3000)
        }
        addActivityComplete({"activityCode": "shanghaiAidTradeFlag0",nick:"老白你在哪"}).then((res) => {
            if(res.code != 200){
                this.setState({ toastMsg:toast_error});
                return
            }
            console.log('gao addActivityComplete', res);
            $userInfoChanger.updateUserInfo();
            addActivityCompleteFinally()
        },(e) => {
            console.log('gao e', e);
            this.setState({ toastMsg:toast_error});
            addActivityCompleteFinally()
        })
    }

    /**
     * @desc 赠送弹窗
     * @author gao01
     * @date 2022/04/28 13:34:36
     */
    getDialog = () => {
        const { animation } = this.state;
        const {img_style} = adDefine

        return (
            <view style={tradePcContainer}>
                <view style={{ ...tradePcOrderTem,  ...(animation ? dialogBox : {}) }}>
                    <view style={{ position:'relative', cursor: 'pointer' }} onClick={() => {this.buyBtnClick()}}>
                        <image style={img_style} src={ad_img} />
                    </view>
                    <view>
                        <CloseButton closeBtnName={closeBtnName} dialogClose={$uninstall} />
                    </view>
                </view>
            </view>
        )
    }

    render() {
        const { dialogVisible,toastVisible,toastMsg } = this.state
        console.log('gao dialogVisible', dialogVisible);
        return (
            <view>
                {dialogVisible && this.getDialog()}
                {toastVisible && getToast(toastMsg)}
            </view>
        )
    }
}
