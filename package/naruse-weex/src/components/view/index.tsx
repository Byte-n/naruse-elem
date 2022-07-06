import { Component, createElement } from 'rax';
import { View } from 'rax-components';

class _View extends Component {
    render() {
        const { children } = this.props;
        return <View>{children}</View>;
    }
}

export default _View;
