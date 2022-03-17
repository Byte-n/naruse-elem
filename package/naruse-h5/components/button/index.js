import { Component } from 'react';
import classNames from 'classnames';

class Button extends Component {
    constructor () {
        this.state = {
            hover: false,
            touch: false,
        };
    }

    /** 当开始点击时 */
    onTouchStart () {
        if (this.disabled) {
            return;
        }

        this.touch = true;
        if (this.hoverClass && !this.disabled) {
            setTimeout(() => {
                if (this.touch) {
                    this.hover = true;
                }
            }, this.hoverStartTime);
        }
    }

    /** 点击结束时 */
    onTouchEnd () {
        if (this.disabled) {
            return;
        }

        this.touch = false;
        if (this.hoverClass && !this.disabled) {
            setTimeout(() => {
                if (!this.touch) {
                    this.hover = false;
                }
            }, this.hoverStayTime);
        }
    }

    render () {
        const {
            disabled,
            hoverClass,
            hover,
            ...other
        } = this.props;

        const cls = classNames({ [`${hoverClass}`]: hover && !disabled });

        return (
            <button
                disabled={disabled}
                className={cls}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                {...other}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;
