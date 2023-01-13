import { createElement, Component, render, createRef } from 'rax';
import { View,  } from 'rax-components';
import { createElement as naruseCreateElement } from '../../../../package/naruse-weex/build/lib'

const ww = (e) => {
    console.log(e.type, e);
}


class Qwer extends Component {

    constructor () {
        super();
    }

    componentDidMount () {
    }

    render() {
        return <View ref={(q) => this.pcr = q} onClick={(e) => console.log(e)}>
            {naruseCreateElement('text', { style: { width: 200, height: 200, backgroundColor: 'blue' }, onClick: ww }, '123')}
        </View>;
    }
}


render(<Qwer />)
