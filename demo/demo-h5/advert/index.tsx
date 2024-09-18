import { Component } from 'Naruse';


export default class Qwer extends Component {

    async componentDidMount () {
        const qq = await import('./qwer.css');
    }
    render () {
        return (
            <view>
                <radio-group onChange={evl => console.log(evl.detail)}>
                    <radio name="a" value={'a'} checked>aaa</radio>
                    <radio name="a" value={'b'}>bbb</radio>
                </radio-group>
                <view >
                    <checkbox onChange={evl => console.log(evl.detail)} value='dsadsa'></checkbox>
                    你好
                </view>
            </view>
        );
    }
}
