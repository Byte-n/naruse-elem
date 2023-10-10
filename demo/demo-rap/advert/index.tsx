import { Component,showToast } from 'Naruse';


export default class Qwer extends Component {
    state = {
        name: 'qwer',
    }

    async componentDidMount() {
        const qq = await import('./test');

        showToast({
            title: qq.qq(),
        })

        this.setState({
            name: JSON.stringify(qq.qq()),
        });
    }

    render() {
        return <view>
            123: {this.state.name}
            <web-view
                src='https://opendocs.alipay.com/mini/tool/h5?pathHash=37933357'
                style={{ height: 200, width: 200 }}
            ></web-view>
        </view>;
    }
}
