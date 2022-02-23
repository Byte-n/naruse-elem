export default class component extends NaruseComponent {
    constructor() {
        this.state = {
            qwe: 1,
            ww: 2,
        }
    }
    componentDidMount() {
        console.log('我出来啦！')
    }
    componentDidUpdate() {
        console.log('我自由啦');
    }
    render() {
        const { qwe } = this.state;
        return <view>
            <view>{qwe}</view>
            <view>123</view>
            <button onClick={(e) => {
                console.log(e)
                this.setState({
                    qwe: qwe++,
                });
            }}>修改</button>
            <image src={'https://q.aiyongtech.com/trade/web/images/operation_address_success.png'} />
            <input onChange={(e) => {
                this.setState({
                    qwe: e.detail.value,
                })
            }} />
        </view>;
    }
}