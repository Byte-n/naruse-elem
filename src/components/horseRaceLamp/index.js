import { Component } from 'Naruse';

const baseImgSrc = 'http://q.aiyongtech.com/ad/images/';
const topImgFirst = `${baseImgSrc}57yW57uEIDPlpIfku70gMTM=_1650968131481.png`;
const topImgSecond = `${baseImgSrc}57yW57uEIDPlpIfku70gMTQ=_1650968142644.png`;
const topImgThird = `${baseImgSrc}57yW57uEIDPlpIfku70gNw==_1650967110941.png`;
const topImgFourth = `${baseImgSrc}57yW57uEIDPlpIfku70gMw==_1650967185961.png`;
const topImgFifth = `${baseImgSrc}57yW57uEIDPlpIfku70gMTA=_1650967236305.png`;
const bottomImgFirst = `${baseImgSrc}57yW57uEIDPlpIfku70gNQ==_1650967251087.png`;
const bottomImgSecond = `${baseImgSrc}57yW57uEIDPlpIfku70=_1650967259486.png`;
const bottomImgThird = `${baseImgSrc}57yW57uEIDPlpIfku70gNA==_1650967267851.png`;
const bottomImgFouth = `${baseImgSrc}57yW57uEIDPlpIfku70gOA==_1650967296616.png`;
const bottomImgFifth = `${baseImgSrc}57yW57uEIDPlpIfku70gMTE=_1650967305280.png`;

/**
 * 图片切换轮播
 */
export default class HorseRaceLamp extends Component {
    constructor () {
        super();
        this.state = { isAnimation: true };
        this.timer = null;
    }

    componentDidMount () {
        this.changeImg();
    }

    /**
     * 切换动画开启
     */
    changeImg = () => {
        const { isAnimation } = this.state;
        clearTimeout.call(null,this.timer);
        this.timer = setTimeout(() => {
            this.setState({
                isAnimation: !isAnimation,
            }, () => {
                this.changeImg();
            });
        }, !isAnimation ? 24000 : 10);
    }

    render () {
        const { isAnimation } = this.state;
        const { equipmentType } = this.props;
        const topPart = {
            display: 'flex',
            height: '400rpx',
            transform: `translate3D(${isAnimation ? '0': `${equipmentType === 'pc' ? '-46' : '-65'}`}%, 0, 0)`,
            transition: `${!isAnimation ? 'transform 24s linear' : 'none'}`
        };
        const container = {
            width: `${equipmentType === 'pc' ? '734rpx' : '620rpx'}`,
            height: '450rpx',
            overflow: 'hidden',
            position: 'absolute',
            top: `${equipmentType === 'pc' ? '190rpx' : '200rpx'}`,
            left: `${equipmentType === 'pc' ? '61rpx' : '0'}`,
        };
        const imgStyle = {
            marginRight: `${equipmentType === 'pc' ? '12rpx' : '40rpx'}`,
            whiteSpace: 'nowrap',
            flexShrink: '0',
            width: `${equipmentType === 'pc' ? '250rpx' : '326rpx'}`,
            height: `${equipmentType === 'pc' ? '90rpx' : '126rpx'}`,
        };
        return (
            <view style={container}>
                <view style={{...topPart, ...{width: `${equipmentType === 'pc' ? '1500rpx' : '2100rpx'}`}}}>
                    <view style={{ position: 'relative' }}>
                        <view>
                            <image src={topImgFirst} style={imgStyle} />
                            <image src={topImgSecond} style={imgStyle} />
                            <image src={topImgThird} style={imgStyle} />
                            <image src={topImgFourth} style={imgStyle} />
                            <image src={topImgFifth} style={imgStyle} />
                        </view>
                        <view>
                            <image src={bottomImgFirst} style={{...imgStyle, ...{marginLeft: `${equipmentType === 'pc' ? '130rpx' : '190rpx'}`}}} />
                            <image src={bottomImgSecond} style={imgStyle} />
                            <image src={bottomImgThird} style={imgStyle} />
                            <image src={bottomImgFouth} style={imgStyle} />
                            <image src={bottomImgFifth} style={imgStyle} />
                        </view>
                    </view>
                </view>
            </view>
        )
    }
}
