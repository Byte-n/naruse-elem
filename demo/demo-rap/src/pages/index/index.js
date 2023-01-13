import { createElement, Component, render, createRef } from 'rax';
import { View, } from 'rax-components';
import { Naruse } from '../../../../packages/naruse-weex/build/lib'
import RAP from 'rap-sdk';

RAP.toast.show(window.location.href);

const bc = new BroadcastChannel('007');
bc.onmessage = function (event) {
    console.log(event);
    // bc.postMessage('收到你的消息啦！');
}

console.log(window);

class Qwer extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        // console.log('来啦小宝贝')
        // bc.postMessage('冲冲冲！');
    }

    render() {
        return <View>
            <View onClick={() => {
                console.log(Naruse.getSystemInfoSync());
            }} style={{ width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' }}>123</View>
            <View onClick={() => {
                Naruse.navigateBack({ delta: 99 });
            }} style={{ width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' }}>qwer</View>
        </View>;
    }
}


render(<Qwer />)
