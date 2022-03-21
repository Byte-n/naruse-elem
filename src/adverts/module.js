import { Component } from 'Naruse'
export const text = '欢迎使用 Naruse';
export const tips = '打开console获得更多提示';

export const getText = () => {
    return text;
};

class Qwer extends Component {
    state = { qq: 123 };
    componentDidMount() {
        console.log('qwer 被装载啦');
    }
    componentWillUnmount() {
        console.log('qwer 被卸载啦');
    }
    render() {
        return <view>{
            this.state.qq
        }
        <button onClick={() => { this.setState({ qq: 21312 }) }} >{this.props.name}</button>
        </view>;
    }
}

export { Qwer };