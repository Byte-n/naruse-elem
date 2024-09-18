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
                    <checkbox value='dsad' label='d1111' checked
                    color='#eee'
                    onChange={evl => console.log(evl.detail)}/>
                    
            </view>
        );
    }
}
