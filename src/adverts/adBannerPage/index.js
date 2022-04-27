import ConfirmBuyedDialogM from '@components/confirmBuyedDialogM';
import { Component, navigateToWebPage } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';
import style from './index.css';
import { isIOS,isNotVip } from '@utils/userInfo';

// 广告信息
const adInfo = $adImport.adData.results[0];
const {
    android_url,
    iosText
} = adInfo.user_define.body;
const imgPath = 'http://q.aiyongtech.com/ad/images/';
const imgArr = [{
    name: 'MQ==_1650276094001.png',
    height:'903',
    btnImage:'',
},{
    name: 'Mg==_1650276331751.png',
    height:'970',
    btnImage:'MQ==_1650341862614.gif',
    top:'120',
    value:'店铺体检',
    url:'/pages/shopTest/index',
},{
    name: 'Mw==_1650276356262.png',
    height:'1184',
    btnImage:'Mg==_1650341897441.gif',
    top:'296',
    value:'标题优化',
    url:'/pages/titleOptimize/index'
},{
    name: 'NA==_1650276384943.png',
    height:'1060',
    btnImage:'Mw==_1650342027109.gif',
    top:'132',
    value:'自动上下架',
    url:'/pages/autoMaticMounting/index'
},{
    name: 'NQ==_1650276401102.png',
    height:'1216',
    btnImage:'NA==_1650342058008.gif',
    top:'242',
    value:'促销打折',
    url:'/pages/promotionalList/index'
    
},{
    name: 'Ng==_1650276417736.png',
    height:'1041',
    btnImage:'NA==_1650342058008.gif',
    top:'160',
    value:'促销水印',
    url:'/pages/waterMark/index'
},{
    name: 'Nw==_1650276438762.png',
    height:'1134',
    btnImage:'NQ==_1650371099263.gif',
    top:'258',
    value:'手机详情',
    url: '/pages/newDescMobile/index'
},{
    name: 'OA==_1650276456496.png',
    height:'988',
    btnImage:'Nw==_1650342129394.gif',
    top:'100',
    value:'复制宝贝',
    url:'/pages/copyBaby/index'
},{
    name: 'OQ==_1650276473474.png',
    height:'952',
    btnImage:'Ng==_1650372176519.gif',
    top:'142',
    value:'违规词检测',
    url:'/pages/badWordDetection/badWordIndex/index'
},{
    name: 'MTA=_1650276487598.png',
    height:'871',
    btnImage:'',
    type:'web',
    url:'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220309112922%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1008002086%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v2&sign=0E5DC09D055A248FDEDE7B05140985A9&spm=a313p.266.ei5lud.1372507379574&short_name=Y4.7DJwH&app=chrome'
}]

/**
 * Pc功能点模板
 */
export default class TradePcOrderTem extends Component {
    constructor() {
        this.state = {
        };
    }

    componentDidMount() {
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
    }
    /**
     * 跳转订购
     * @param {String} type 订购类型
     */
    jumpOrderLink = (type, url,value) =>  {
        const { creative_id, creative_name, secondary_class, pid_name, primary_class,pid } = adInfo;
        if(url && type === 'web'){
            if(isIOS()){
                $openChat.contactCustomerService(iosText);
            }else{
                my.qn.navigateToWebPage({ url: android_url });
            }
        }else{
            $mappUtils.navigateTo({ url: url });
        }
        $sensorsBeacon.sensorsBeacon('YY_OrderNow', {
            primary_class,
            secondary_class,
            cid: Number(creative_id),
            pid: Number(pid) ,
            cname: creative_name,
            pname: pid_name,
            from_pid: pid,
            from_pname: value,
        });
    }
    render() {
        return (
            <view>
                <view>
                    {
                        imgArr.map((item, index) => {
                            let heightStyle = {
                                height:`${item.height}rpx`
                            };
                            let topStyle = {
                                top:`${item.top}rpx`
                            };
                            return <view style={{
                                ...style.viewBox,
                                ...style.imageStyle,
                                ...heightStyle,
                            }}>
                                <image style={{
                                ...style.imageStyle,
                                ...heightStyle,
                            }} src={imgPath+item.name} />
                            {item.btnImage && <image
                            onClick={() => this.jumpOrderLink(item.type,item.url,item.value)}
                            style={{
                                ...style.btnImage,
                                ...topStyle,
                            }} src={imgPath+item.btnImage} />}
                            {index === imgArr.length -1 && <view onClick={() => this.jumpOrderLink(item.type,item.url)}  style={style.hotStyle}></view>}
                            </view>;
                        })
                    }
                    
                </view>
            </view>
        )
    }
}