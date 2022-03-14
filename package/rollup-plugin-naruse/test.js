
export default class component {
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
            <button onClick={(e) => {
                console.log(e)
                this.setState({
                    qwe: qwe++,
                });
            }}>修改</button>
            <input onChange={(e) => {
                this.setState({
                    qwe: e.detail.value,
                })
            }} />
        </view>;
    }
}