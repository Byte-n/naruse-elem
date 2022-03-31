import { Component, navigateToWebPage } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';

// 模板样式
const tradePcOrderTem = { width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const tradePcOrderTemMain = { width: '800px', height: '500px' };
const topPart = { width: '800px', height: '390px' };
const bottomPart = { width: '800px', height: '110px', position: 'relative' };
const bottomImg = { width: '800px', height: '110px' };
const bottomClickPart = { width: '400px', height: '110px', position: 'absolute', top: '0' };
// 高级搜索
const topImgAdress = 'http://q.aiyongtech.com/ad/images/6auY57qn5pCc57Si_1648690650355.png';
// 合单
// const topImgAdress = 'http://q.aiyongtech.com/ad/images/6Ieq5Yqo5ZCI5Y2V_1648697856605.png';
// 右上角升级
// const topImgAdress = 'q.aiyongtech.com/trade/web/img/rightTopAdImg.png;
// 功能点模板下半部分图片
const bottomImgAdress = 'http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9LTE3_1648690701005.gif';

export default class TradePcOrderTem extends Component {
    componentDidMount () {
        buryAdPageView();
    }

    jumpOrderLink = (type) => {
        let url = type === 'quarter' ? 'https://c.tb.cn/Y4.iffUB' : 'https://c.tb.cn/Y4.iWcM7';
        let beaconText = type === 'quarter' ? '52/季度' : '148/年';
        buryAdOrderNow(beaconText);
        navigateToWebPage({ url });
    }

    render () {
        return (
            <view style={tradePcOrderTem}>
                <view style={tradePcOrderTemMain}>
                    <image style={topPart} src={topImgAdress} />
                    <view style={bottomPart}>
                        <image style={bottomImg} src={bottomImgAdress} />
                        <view style={{ ...bottomClickPart, left: '0' }} onClick={() => this.jumpOrderLink('quarter')}></view>
                        <view style={{ ...bottomClickPart, right: '0' }} onClick={() => this.jumpOrderLink('year')}></view>
                    </view>
                </view>
            </view>
        )
    }
}