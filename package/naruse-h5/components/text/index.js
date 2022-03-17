import { Component } from 'react';
import classNames from 'classnames';


class Text extends Component {
    render () {
        const { className, selectable = false, ...restProps } = this.props;
        const cls = classNames(
            'naruse-text',
            { 'naruse-text__selectable': selectable },
            className
        );
        return (
            <span {...restProps} className={cls}>
                {this.props.children}
            </span>
        );
    }
}

export default Text;
