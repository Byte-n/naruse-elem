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
    render () {
        return naruseCreateElement('view', null, 'Test');
    }
}


class Qwer extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return <div bubble onClick={ww}>
            {naruseCreateElement('view', { style: { width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' } },
                naruseCreateElement('view', null, 'qwer'),
                naruseCreateElement('view', null, '321'),
                naruseCreateElement('view', null, '213'),
                naruseCreateElement(QQwer, null, null),
                naruseCreateElement(Test, null, null),
            )}
            <View style={{ width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' }}>123</View>
        </div>;
    }
}


render(<Qwer />)
