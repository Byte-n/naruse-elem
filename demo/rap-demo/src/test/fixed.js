import { createElement, Component, render, createRef } from 'rax';
import { View, } from 'rax-components';
import { createElement as naruseCreateElement, Component as NaruseComponent } from '../../../../package/naruse-weex/build/lib'

const ww = (e) => {
    console.log(e.type, e);
}


const QQwer = () => {
    return naruseCreateElement('view', null, '123');
}

class Test extends NaruseComponent {

    state = {
        qwer: 123,
    }

    render () {
        console.log(this.state.qwer);
        return naruseCreateElement('view', { style: { fontSize: '50rpx', color: 'green' } }, naruseCreateElement('view', { onClick: () => {
            console.log('被店家啦')
            this.setState({ qwer: 321 });
        } }, '你好哇','笑死', naruseCreateElement('view', { style: { position: 'fixed' ,fontSize: '50rpx', color: 'green', zIndex: 124, backgroundColor: 'red'  } }, '啊喝酒啊哈哈', 'qwer')));
    }
}


class Qwer extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return <View>
            {naruseCreateElement('view', { style: { width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' } },
                naruseCreateElement('view', null, 'qwer'),
                naruseCreateElement('view', null, '321'),
                naruseCreateElement('view', null, 
                    naruseCreateElement('view', { style: { position: 'fixed', zIndex: 123, backgroundColor: 'yellow' } }, '213'), 
                    naruseCreateElement('text', { style: { position: 'fixed', zIndex: 121, backgroundColor: 'black' } }, 'qwer'),
                    naruseCreateElement('image', { style: { position: 'fixed' } }),
                ),
                naruseCreateElement(QQwer, null, null),
            )}
            {naruseCreateElement(Test, null, null)}
            <View style={{ width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' }}>123</View>
        </View>;
    }
}


render(<Qwer />)
