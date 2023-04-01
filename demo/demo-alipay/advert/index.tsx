import { Component } from 'Naruse';


export default class Qwer extends Component {

    async componentDidMount() {
        const qq = await import('./qwer.css');
        console.log('ccc', qq.ccc);
    }

    render() {
        return <view>123</view>;
    }
}
