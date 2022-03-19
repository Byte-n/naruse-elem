import { commonEventHander } from '../../core/event';
import { Component } from 'react';
import cssStyle from './index.css';

class Text extends Component {

    state = {
        hover: false
    }

    /** 当开始点击时 */
    onTouchStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled) return;

        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }

    /** 点击结束时 */
    onTouchEnd() {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled) {
            return;
        }

        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ hover: false });
            }
        }, hoverStayTime);
    }

    render() {
        const { className, selectable = false, style, hoverStyle, ...restProps } = this.props;
        const { hover } = this.state;
        const cls = {
            ...(hover ? hoverStyle : {}),
            ...cssStyle.text,
            ...(selectable ? cssStyle.textSelectable : {}),
            ...style,
        };

        return (
            <span
                onMouseEnter={this.onTouchStart.bind(this)}
                onMouseLeave={this.onTouchEnd.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                style={cls}
                className={className}
                onClick={commonEventHander.bind(this)} >
                {this.props.children}
            </span>
        );
    }
}

export default Text;
