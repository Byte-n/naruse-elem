import Naruse from 'Naruse';

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
        console.log('cc', cc);
    }
    render() {
        return '你好';
    }
}
