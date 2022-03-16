import { getText,tips } from './module';
console.log('全局属性 设备信息', my.getSystemInfoSync());
console.log('全局属性 用户信息 userInfo', $userInfoChanger.getUserInfo());
console.log('全局属性 广告信息 adData', $adImport.adData);
const obj1 = { a: 1 };
const obj2 = { b: 1 };
console.log('拓展运算', { ...obj1, ...obj2 });

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
                <view style={{ fontSize: '24px', textAlign: 'center' }}>{getText()} {count}</view>
                <button onClick={() =>  this.setCount('+')}> count + 1</button>
                <button onClick={() =>  this.setCount('-')}> count - 1</button>
                <view>{tips}</view>
            </view>
        );
    }
}
