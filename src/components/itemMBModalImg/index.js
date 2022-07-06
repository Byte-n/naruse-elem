
import { Component, renderComponentOnPage, withPage } from 'Naruse';

class Qwer extends Component {

    shouldComponentUpdate(p, s) {
        console.log(p, s);
        return false;
    }

    render() {
        console.log('我渲染啦')
        return <view>测试！</view>
    }
}

class ItemMoileModal extends Component {
    state = {
        key: 1,
    }

    componentDidMount() {
        const { currentPage } = this.props;
        console.log(currentPage.route);
        currentPage.events.on('onTabItemTap', (item) => {
            console.log('点啦点啦', item);
        });
    }

    shouldComponentUpdate(p, s) {
        console.log(p, s);
        return false;
    }

    render() {
        return <view>
            <Qwer />
            <button onClick={() => { this.setState({ key: this.state.key + 1 }) }} >qwer</button>
        </view>
    }
}


export default withPage(ItemMoileModal);