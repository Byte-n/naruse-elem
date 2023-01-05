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
            { naruseCreateElement('view', { style: { width: 750, height: 400, backgroundColor: 'red' },
            onClick:ww,
            onLongClick: ww,
            onTouchStart: ww,
            onTouchMove: ww,
            onTouchEnd: ww, 
        }, 
            naruseCreateElement('view', { style: { width: 200, height: 200, backgroundColor: 'blue' } })) }
        </View>;
    }
}


render(<Qwer />)
