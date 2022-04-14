import { Component } from 'Naruse';

const warpStyle = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: '0',
    left: '0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '900',
};
const dialogBox = {
    fontSize: '36rpx',
    textAlign: 'center',
    maxWidth: '580rpx',
    padding: '20rpx 52rpx',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#000',
    color: '#FFF',
    position: 'relative',
    borderRadius: '20rpx',
    transition: 'all 0.5s',
    opacity: '1',
    transform: 'translateY(0)',
    border: '2rpx solid',
};
const dialogBoxDown = { opacity: '0', transform: 'translateY(-50%)' };

/**
 * 提示信息框
 * message 提示信息
 * time 提示信息展示时间
 */
class MessageTip extends Component {
    constructor () {
        super();
        this.state = {
            isShow: true,
            animation: true,
        };
    }

    componentDidMount () {
        const { time } = this.props;
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
        setTimeout(() => {
            this.setState({ isShow: false });
        }, time);
    }

    render () {
        const { isShow, animation } = this.state;
        const { message } = this.props;
        return (
            <view>
                {
                    isShow && (
                        <view style={warpStyle}>
                            <view style={{ ...dialogBox, ...(animation ? dialogBoxDown : {}) }}>
                                <view>{ message }</view>
                            </view>
                        </view>
                    )
                }
            </view>
        );
    }
}

export default MessageTip;
