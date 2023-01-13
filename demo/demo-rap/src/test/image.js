import { createElement, Component, render, createRef } from 'rax';
import { View,  } from 'rax-components';
import rap from 'rap-sdk';
import { createElement as naruseCreateElement, log } from '../../../../package/naruse-weex/build/lib'


class Qwer extends Component {

    constructor () {
        super();
        this.pcr
    }

    componentDidMount () {
        setTimeout(() => {
            log('你啊好')
        }, 3000)
        console.log(this.pcr);
        fetch
    }

    render() {
        return <View ref={(q) => this.pcr = q} onClick={(e) => console.log(e)}>
            {naruseCreateElement('image', { src: 'http://q.aiyongtech.com/ad/images/5LyY5oOg5Yi4_1657168214533.gif', mode: 'heightFix', style: { height: '400px' } }, null)}
            {/* <View style={{ width: '300px', height: '400px' }}>
                <image style={{ flex: '1' }} resize="contain" src='http://q.aiyongtech.com/ad/images/5oiQ5ZOB5qC35byP_1657105922750.png' ></image>
            </View> */}
        </View>;
    }
}


render(<Qwer />)
