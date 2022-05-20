import { Component } from 'Naruse';

const baseImgSrc = 'http://q.aiyongtech.com/ad/images/';
const topImgFirst = `${baseImgSrc}57yW57uEIDLlpIfku70gMg%3D%3D_1652921710028.png`;
const topImgSecond = `${baseImgSrc}57yW57uEIDLlpIfku70gMw%3D%3D_1652922462335.png`;
const topImgThird = `${baseImgSrc}57yW57uEIDLlpIfku70gNA%3D%3D_1652922471987.png`;
const topImgFourth = `${baseImgSrc}57yW57uEIDLlpIfku70gNQ%3D%3D_1652922483368.png`;
const topImgFifth = `${baseImgSrc}57yW57uEIDLlpIfku70gNg%3D%3D_1652922493500.png`;
const bottomImgFirst = `${baseImgSrc}57yW57uEIDLlpIfku70gNw%3D%3D_1652922503854.png`;
const bottomImgSecond = `${baseImgSrc}57yW57uEIDLlpIfku70gOA%3D%3D_1652922519852.png`;
const bottomImgThird = `${baseImgSrc}57yW57uEIDLlpIfku70gOQ%3D%3D_1652922529590.png`;
const bottomImgFouth = `${baseImgSrc}57yW57uEIDLlpIfku70gMTA%3D_1652922545279.png`;
const bottomImgFifth = `${baseImgSrc}57yW57uEIDLlpIfku70gMTE%3D_1652922554099.png`;

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
        }, !isAnimation ? 16000 : 10);
    }

    render () {
        const { isAnimation } = this.state;
        const { equipmentType } = this.props;
        const topPart = {
            display: 'flex',
            height: '400rpx',
            transform: `translate3D(${isAnimation ? '0': `${equipmentType === 'pc' ? '-46' : '-64'}`}%, 0, 0)`,
            transition: `${!isAnimation ? 'transform 16s linear' : 'none'}`
        };
        const container = {
            width: `${equipmentType === 'pc' ? '620px' : '560rpx'}`,
            height: '450rpx',
            overflow: 'hidden',
            position: 'absolute',
            top: `${equipmentType === 'pc' ? '120rpx' : ''}`,
            left: `${equipmentType === 'pc' ? '' : ''}`,
        };
        const imgStyle = {
            marginRight: `${equipmentType === 'pc' ? '12rpx' : '40rpx'}`,
            whiteSpace: 'nowrap',
            flexShrink: '0',
            width: `${equipmentType === 'pc' ? '250rpx' : '310rpx'}`,
            height: `${equipmentType === 'pc' ? '90rpx' : '100rpx'}`,
        };
        return (
            <view style={container}>
                <view style={{...topPart, ...{width: `${equipmentType === 'pc' ? '1200px' : '2250rpx'}`}}}>
                    <view style={{ position: 'relative' }}>
                        <view style={{marginBottom: '10rpx'}}>
                            <image src={topImgFirst} style={imgStyle} />
                            <image src={topImgSecond} style={imgStyle} />
                            <image src={topImgThird} style={imgStyle} />
                            <image src={topImgFourth} style={imgStyle} />
                            <image src={topImgFifth} style={imgStyle} />
                        </view>
                        <view>
                            <image src={bottomImgFirst} style={{...imgStyle, ...{marginLeft: `${equipmentType === 'pc' ? '150rpx' : '200rpx'}`}}} />
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
