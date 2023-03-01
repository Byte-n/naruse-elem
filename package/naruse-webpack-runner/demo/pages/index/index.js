import Naruse from 'Naruse';
import { cc } from '../../common'


export default class Demo extends Naruse.Component {

    componentDidMount() {
        console.log('componentDidMount');
        setTimeout(() => {
            this.setState({
                a: 1,
            });
        }, 1000);
    }

    cc() {
        console.log(cc);
        Naruse.navigateTo({
            url: '/pages/cc/index',
        });
    }

    render() {
        return '你好';
    }
}
