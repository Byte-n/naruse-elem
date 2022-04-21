import { Component } from 'Naruse';


const formatTimeFromSecond  = (count) => {
    const hours = Math.floor((count / (60 * 60) % 24));
    const minutes = Math.floor((count /  60) % 60);
    const seconds = Math.floor(count % 60);
    return {
        hours,
        minutes,
        seconds,
    };
};
/**
 * 倒计时组件
 */
export default class Timer extends Component {
    constructor () {
        super();
        this.state = { count: (3 * 60) - 1 };
    }

    componentDidMount () {
        this.startCountdown();
    }

    // 倒计时
    startCountdown () {
        const { closeTimer } = this.props;
        const timer = setInterval(() => {
            if (this.state.count === 0) {
                clearInterval(timer);
                closeTimer(false);
                return;
            }
            this.setState({ count: this.state.count - 1 });
        }, 1000);
        this.timer = timer;
    }
    componentWillUnmount () {
        clearInterval.call(null, this.timer);
    }

    render () {
        const { equipmentType } = this.props;
        const container = {
            width: `${equipmentType === 'pc' ? '300rpx' : '440rpx'}`,
            height: `${equipmentType === 'pc' ? '68rpx' : '80rpx'}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#FFF',
            color: '#999999',
            fontWeight: 'bold',
        };
        const timeNum = {
            width: `${equipmentType === 'pc' ? '50rpx' : '76rpx'}`,
            height: `${equipmentType === 'pc' ? '40rpx' : '66rpx'}`,
            border: '2rpx solid #DDDEE1',
            borderRadius: '10rpx',
            margin: `${equipmentType === 'pc' ? '0 10rpx' : '0 20rpx'}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#F26413',
        };
        const { hours, minutes, seconds }  = formatTimeFromSecond(this.state.count);
        return (
            <view style={container}>
                <view style={timeNum}>
                    { hours > 9 ? hours : `0${hours}` }
                </view>
                时
                <view style={timeNum}>
                    { minutes > 9 ? minutes : `0${minutes}` }
                </view>
                 分
                <view style={timeNum}>
                    { seconds > 9 ? seconds : `0${seconds}` }
                </view>
                 秒
            </view>
        );
    }
}
