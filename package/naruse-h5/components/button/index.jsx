import { commonEventHander } from '../../core/event';
import { Component } from 'react';
import cssStyle from './index.css';

class Button extends Component {
    constructor () {
        super();
        this.state = { hover: false, active: false };
        this.touch = false;
    }

    /** 当开始点击时 */
    onTouchStart () {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled) return;

        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }

    /** 点击结束时 */
    onTouchEnd () {
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

    /** 当开始点击时 */
    onActiveStart () {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled) return;

        this.touch = true;
        setTimeout(() => {
            this.setState({ active: true });
        }, hoverStartTime);
    }

    /** 点击结束时 */
    onActiveEnd () {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled) {
            return;
        }

        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ active: false });
            }
        }, hoverStayTime);
    }

    render () {
        const {
            type,
            disabled,
            style,
            className,
            hoverStyle,
            activeStyle,
            ...other
        } = this.props;

        const { hover, active } = this.state;

        const conStyle = {
            ...cssStyle['a-button'],
            ...(type ? cssStyle[type] : {}),
            ...style,
            ...(hover ? hoverStyle : {}),
            ...(active ? { ...cssStyle.active, ...activeStyle } : {}),
        };

        return (
            <button
                onMouseEnter={this.onTouchStart.bind(this)}
                onMouseLeave={this.onTouchEnd.bind(this)}
                style={conStyle}
                disabled={disabled}
                className={className}
                onClick={commonEventHander.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
            // {...other}
            >
                {this.props.children}
            </button>
        );
    }
}

export default Button;
