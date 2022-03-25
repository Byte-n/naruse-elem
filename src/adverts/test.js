import { Component } from 'Naruse';
const wrapperStyle = { display: 'flex', width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 900 };
const mainStyle = { display: 'flex', flexDirection: 'column', position: 'relative', alignItems: 'center' };
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: '20rpx',
    padding: '10rpx 40rpx',
    border: '2rpx solid',
    borderRadius: '50rpx',
};
const titleStyle = {
    color: '#FFFFFF',
    fontSize: '40rpx',
    fontWeight: 'bold',
    position: 'absolute',
    top: '36rpx',
    left: '136rpx',
};
const dayStyle = { color: '#E96C5D', fontSize: '15px', fontWeight: 'bold', position: 'absolute', top: '94rpx', left: '374rpx', lineHeight: '1' };


const buyBtn = { width: '460rpx', height: '92rpx', position: 'absolute', left: '70rpx', bottom: '136rpx' };

export default class blueBirdRenewalsDialog extends Component {
    constructor () {
        this.state = { dialogVisible: true };
    }

    componentDidMount () {
        console.log('啊哈哈哈');
    }

    getAdKey () {
        const prefix =  'ios';
        return {
            img: 'img_url',
            btn: 'btn_name',
            urlUp: `${prefix}_url_up`,
            urlDown: `${prefix}_url_down`,
            service: 'service',
            imgSize: 'img_size',
        };
    }

    closeDialog () {
        $adImport.uninstall();
        this.setState({ dialogVisible: false });
    }

    render () {
        return (<view>
            {this.state.dialogVisible && <view style={wrapperStyle}>
                <view style={mainStyle}>
                    <image style={{ width: `${600}rpx`, height: `${720}rpx` }} src={'http://q.aiyongtech.com/ad/images/TUIy_1646823381653.png'}/>
                    <view style={titleStyle}> {'恭喜解锁批量退款功能'}</view>
                    <view style={dayStyle}> 01 </view>
                    <text style={buyBtn}>  </text>
                    <text style={closeStyle} onClick={this.closeDialog.bind(this)}>
                        {'关闭'}
                    </text>
                </view>
            </view>}
        </view>);
    }
}
