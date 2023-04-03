import { Component } from 'Naruse';


class Qwer extends Component {
    constructor () {
        super();
        (async () => {
            const ww = await Promise.resolve(123);
            console.log('加载完毕');
            setTimeout(() => {
                this.setState({ name: ww });
            }, 2000);
        })()
        this.state = { name: 'hello world' };
    }

    render () {
        // @ts-ignore
        return <view>123, {this.state.name}</view>;
    }

}


export default Qwer;
