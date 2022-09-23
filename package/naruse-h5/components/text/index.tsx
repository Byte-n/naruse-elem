import { commonEventHander } from '../../core/event';
import React, { Component } from 'react';
import cssStyle from './index.css';

const h = React.createElement;

class Text extends Component<{ disabled: any; hoverStartTime?: 20 | undefined; }> {

    state = {
        hover: false
    }
    touch: boolean = false;

    /** 当开始点击时 */
    onTouchStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled) return;

        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }
    setState(arg0: { hover: boolean; }) {
        throw new Error('Method not implemented.');
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
        const { className,id, selectable = false, style, hoverStyle, ...restProps } = this.props;
        const { hover } = this.state;
        const cls = {
            ...cssStyle.text,
            ...(selectable ? cssStyle.textSelectable : {}),
            ...style,
            ...(hover ? hoverStyle : {}),
        };

        return (
            <span
                id={id}
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
