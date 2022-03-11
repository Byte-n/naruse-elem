console.log('全局属性 设备信息', my.getSystemInfoSync());
console.log('全局属性 用户信息 userInfo', $userInfoChanger.getUserInfo());
console.log('全局属性 广告信息 adData', $adImport.adData);
class Demo extends NaruseComponent {
    constructor () {
        this.state = { count: 1 };
    }

    setCount (type) {
        let { count } = this.state;
        count = type === '+' ?  count + 1 : count - 1;
        this.setState({ count });
    }

    render () {
        const { count } = this.state;

        return (
            <view>
                <view style={{ fontSize: '24px', textAlign: 'center' }}>欢迎使用 Naruse {count}</view>
                <button onClick={() =>  this.setCount('+')}> count + 1</button>
                <button onClick={() =>  this.setCount('-')}> count - 1</button>
            </view>
        );
    }
}
