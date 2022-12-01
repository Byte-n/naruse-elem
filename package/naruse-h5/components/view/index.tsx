import { commonEventHander, commonMouseEventCreater } from '../../core/event';
import React, { Component } from 'react';

const h = React.createElement;

class View extends Component<{ 
    disabled, 
    hoverStartTime, 
    hoverStayTime, 
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onTransitionEnd,
    onClick,
    className,
    style,
    hoverStyle,
}, {
    hover: boolean,
}> {
    mounted = false;
    touch = false;
    constructor() {
        super();
        this.state = {
            hover: false
        }
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    /** 当开始点击时 */
    onTouchStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled || !this.mounted) return;

        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }

    /** 点击结束时 */
    onTouchEnd() {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled || !this.mounted) return;

        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ hover: false });
            }
        }, hoverStayTime);
    }


    onMouseEnter(event) {
        const { onMouseEnter } = this.props;
        onMouseEnter && onMouseEnter(commonMouseEventCreater(event));
        this.onTouchStart();
    }

    onMouseMove(event) {
        const { onMouseMove } = this.props;
        onMouseMove && onMouseMove(commonMouseEventCreater(event));
    }

    onMouseLeave(event) {
        const { onMouseLeave } = this.props;
        onMouseLeave && onMouseLeave(commonMouseEventCreater(event));
        this.onTouchEnd();
    }


    render() {
        const {
            className,
            style,
            hoverStyle,
            ...other
        } = this.props;
        const { hover } = this.state;

        const conStyle = {
            ...style,
            ...(hover ? hoverStyle : {}),
        };


        return (
            <div
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                onTransitionEnd={commonEventHander.bind(this)}
                className={className}
                style={conStyle}
                onClick={commonEventHander.bind(this)}
            >
                {this.props.children}
            </div>
        );
    }
}

export default View;
