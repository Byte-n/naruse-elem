import { Component } from 'Naruse';
import { buryAdOrderNow, buryAdPageView } from '@utils/beacon';

// 模板样式
const tradePcOrderTem = { width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const tradePcOrderTemMain = { width: '800px', height: '500px' };
const topPart = { width: '800px', height: '390px' };
const bottomPart = { width: '800px', height: '110px', position: 'relative' };
const bottomImg = { width: '800px', height: '110px' };
const bottomClickPart = { width: '400px', height: '110px', position: 'absolute', top: '0' };

export default class TradePcOrderTem extends Component {
    componentDidMount () {
        buryAdPageView();
    }

    jumpOrderLink = (type) => {
        let url = type === 'quarter' ? 'https://c.tb.cn/Y4.iffUB' : 'https://c.tb.cn/Y4.iWcM7';
        let beaconText = type === 'quarter' ? '52/季度' : '148/年';
        buryAdOrderNow(beaconText);
        my.qn.navigateToWebPage({ url });
    }

    render () {
        return (
            <view style={tradePcOrderTem}>
                <view style={tradePcOrderTemMain}>
                    <image style={topPart} src='http://q.aiyongtech.com/ad/images/6auY57qn5pCc57Si_1648690650355.png' />
                    <view style={bottomPart}>
                        <image style={bottomImg} src='http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9LTE3_1648690701005.gif' />
                        <view style={{ ...bottomClickPart, left: '0' }} onClick={() => this.jumpOrderLink('quarter')}></view>
                        <view style={{ ...bottomClickPart, right: '0' }} onClick={() => this.jumpOrderLink('year')}></view>
                    </view>
                </view>
            </view>
        )
    }
}