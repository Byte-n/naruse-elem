import { createElement, Component, render, createRef } from 'rax';
import { View, Text } from 'rax-components';
import { Naruse } from '../../../../packages/naruse-weex/build/lib'

const bc = new BroadcastChannel('007');
console.log(window);
bc.onmessage = function (event) {
    console.log(event);
}


class Qwer extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        bc.postMessage('冲冲冲！');
    }

    render() {
        return <View>
            <View style={{ width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' }}>
                <Text style={{ fontSize: '30rpx' }}>第二个页面！！！！！</Text>
            </View>
        </View>;
    }
}


render(<Qwer />)
