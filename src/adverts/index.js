import { qwer, www } from 'Naruse';
console.log(qwer);
console.log(www);
export default class demo {
    render () {
        return <view onClick={() => console.log('冒泡啦')}>
            <checkbox onChange={(e) => console.log(e)} value={'321'} checked={false}/>
            <checkbox onChange={(e) => console.log(e)} value={'123'} checked={false}/>
            <input/>
            {www}
            <radio />
        </view>;
    }
}
