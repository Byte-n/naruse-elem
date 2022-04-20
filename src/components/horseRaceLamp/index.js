import { Component } from 'Naruse';

const baseImgSrc = 'http://q.aiyongtech.com/ad/images/';
const topImgFirst = `${baseImgSrc}57yW57uEIDPlpIfku70gNg==_1650384625638.png`;
const topImgSecond = `${baseImgSrc}57yW57uEIDPlpIfku70gOQ==_1650384668529.png`;
const topImgThird = `${baseImgSrc}57yW57uEIDPlpIfku70gOQ==_1650384668529.png`;
const topImgFourth = `${baseImgSrc}57yW57uEIDPlpIfku70gMw==_1650014752406.png`;
const topImgFifth = `${baseImgSrc}57yW57uEIDPlpIfku70gMTA=_1650384715223.png`;
const bottomImgFirst = `${baseImgSrc}57yW57uEIDPlpIfku70gNQ==_1650384757158.png`;
const bottomImgSecond = `${baseImgSrc}57yW57uEIDPlpIfku70=_1650384781183.png`;
const bottomImgThird = `${baseImgSrc}57yW57uEIDPlpIfku70gNA==_1650384804572.png`;
const bottomImgFouth = `${baseImgSrc}57yW57uEIDPlpIfku70gOA==_1650384819875.png`;
const bottomImgFifth = `${baseImgSrc}57yW57uEIDPlpIfku70gMTE=_1650384837035.png`;

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
        }, !isAnimation ? 12000 : 10);
    }

    render () {
        const { isAnimation } = this.state;
        const { equipmentType } = this.props;
        const topPart = {
            display: 'flex',
            height: '400rpx',
            transform: `translate3D(${isAnimation ? '0': `${equipmentType === 'pc' ? '-53' : '-70'}`}%, 0, 0)`,
            transition: `${!isAnimation ? 'transform 12s linear' : 'none'}`
        };
        const container = {
            width: `${equipmentType === 'pc' ? '734rpx' : '620rpx'}`,
            height: '450rpx',
            overflow: 'hidden',
            position: 'absolute',
            top: `${equipmentType === 'pc' ? '190rpx' : '220rpx'}`,
            left: `${equipmentType === 'pc' ? '61rpx' : '0'}`,
        };
        const imgStyle = {
            marginRight: `${equipmentType === 'pc' ? '60rpx' : '80rpx'}`,
            whiteSpace: 'nowrap',
            flexShrink: '0',
            width: `${equipmentType === 'pc' ? '250rpx' : '310rpx'}`,
            height: `${equipmentType === 'pc' ? '90rpx' : '110rpx'}`,
        };
        return (
            <view style={container}>
                <view style={{...topPart, ...{width: `${equipmentType === 'pc' ? '1700rpx' : '2200rpx'}`}}}>
                    <view style={{ position: 'relative' }}>
                        <view>
                            <image src={topImgFirst} style={imgStyle} />
                            <image src={topImgSecond} style={imgStyle} />
                            <image src={topImgThird} style={imgStyle} />
                            <image src={topImgFourth} style={imgStyle} />
                            <image src={topImgFifth} style={imgStyle} />
                        </view>
                        <view>
                            <image src={bottomImgFirst} style={{...imgStyle, ...{marginLeft: `${equipmentType === 'pc' ? '150rpx' : '250rpx'}`}}} />
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
