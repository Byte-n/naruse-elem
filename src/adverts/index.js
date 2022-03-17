import { getText, tips } from './module';
import style from './index.css';
import { isBlueBirdUser, getBlueBirdUserExpireTime, isIOS } from '@utils/userInfo';
console.log('全局属性================================================');
console.log('设备信息', my.getSystemInfoSync());
console.log('用户信息 userInfo', $userInfoChanger.getUserInfo());
console.log('广告信息 adData', $adImport.adData);

console.log('工具测试================================================');
console.log('设备是否是ios ', isIOS());
console.log('是否为青鸟用户 ', isBlueBirdUser());
console.log('青鸟用户的到期时间距离现在多久 ', getBlueBirdUserExpireTime());

console.log('语法支持================================================');
const obj1 = { a: 1 };
const obj2 = { b: 1 };
console.log('拓展运算', { ...obj1, ...obj2 });
console.log('模板字符串', `你好${true}`);

export class Demo extends NaruseComponent {
    constructor () {
        this.state = { count: 1 };
    }

    setCount (type) {
        let { count } = this.state;
        count = type === '+' ?  count + 1 : count - 1;
        this.setState({ count });
    }

    render () {
        return <view style={style.qwer} onClick={() => console.log('冒泡啦')}>
            <checkbox onChange={(e) => console.log(e)} value={'321'} checked={false}/>
            <checkbox onChange={(e) => console.log(e)} value={'123'} checked={false}/>
            <input/>
            {www}
            <radio />
        </view>;
    }
}
