import { Component } from 'Naruse';

const backgroundImgSrc = 'http://q.aiyongtech.com/ad/images/TULmiJDlip%2FlvLnnqpc%3D_1652865510642.png';

const warpStyle = {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 900,
};
const dialogBox = {
    fontSize: '18rpx',
    display: 'flex',
    flexDirection: 'column',
    width: '600rpx',
    minHeight: '520rpx',
    position: 'relative',
    borderRadius: '20px',
    transition: 'all 0.5s',
    opacity: 1,
    transform: 'translateY(0)',
};
const dialogBoxDown = {
    opacity: 0,
    transform: 'translateY(-50%)',
};
const backgroundImg = {
    width: '600rpx',
    height: '720rpx',
};
const closeBtn = {
    width: '500rpx',
    height: '100rpx',
    position: 'absolute',
    top: '600rpx',
    left: '50%',
    transform: 'translate(-250rpx, 0)',
}

export default class OrderSuccess extends Component {
    constructor () {
        this.state = { visible: true, animation: true };
    }

    componentDidMount () {
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
    }

    closeDialog () {
        this.setState({ animation: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ visible: false });
            this.props.onClose && this.props.onClose();
        });
    }

    render () {
        const { visible, animation } = this.state;
        if (!visible) return null;
        return (
            <view style={warpStyle}>
                <view style={{ ...dialogBox, ...(animation ? dialogBoxDown : {}) }}>
                    <image style={backgroundImg} src={backgroundImgSrc} />
                    <view style={closeBtn} onClick={() => this.closeDialog()}></view>
                </view>
            </view>
        )
    }
}