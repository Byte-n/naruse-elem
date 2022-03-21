import { Component } from 'Naruse';
import { Qwer, getText, tips } from './module';
// import { isBlueBirdUser, getBlueBirdUserExpireTime, isIOS } from '@utils/userInfo';
// console.log('全局属性================================================');
// console.log('设备信息', my.getSystemInfoSync());
// console.log('用户信息 userInfo', $userInfoChanger.getUserInfo());
// console.log('广告信息 adData', $adImport.adData);

// console.log('工具测试================================================');
// console.log('设备是否是ios ', isIOS());
// console.log('是否为青鸟用户 ', isBlueBirdUser());
// console.log('青鸟用户的到期时间距离现在多久 ', getBlueBirdUserExpireTime());

// console.log('语法支持================================================');
// const obj1 = { a: 1 };
// const obj2 = { b: 1 };
// console.log('拓展运算', { ...obj1, ...obj2 });
// console.log('模板字符串', `你好${true}`);

class Demo extends Component {
    constructor() {
        this.state = { count: 1, value: '123', show: false };
    }

    setCount(type) {
        let { count } = this.state;
        count = type === '+' ? count + 1 : count - 1;
        this.setState({ count, show: !this.state.show });
    }

    render() {
        const { count, value, show } = this.state;

        return (
            <view hoverStyle={{ color: 'red' }} onClick={(e) => console.log('冒泡')}>
                <image mode='bottom right' style={{ width: 100, height: 100 }} src="https://cdn.pixabay.com/photo/2021/05/10/10/46/yellow-wall-6243164_960_720.jpg" />
                <view style={{ fontSize: '24px', textAlign: 'center' }}>{getText()} {count}</view>
                <button onClick={() => this.setCount('+')}> count + 1</button>
                <button onClick={() => this.setCount('-')}> count - 1</button>
                <text hoverStyle={{ color: 'blue' }} onClick={() => console.log(12312312)}>123</text>
                <view>{tips}</view>
                <input focus maxlength={10} onInput={(e) => {
                    // this.setState({ value: e.detail.value });
                }}></input>
                {show && <Qwer name={count} />}
            </view>
        );
    }
}
export default Demo;
