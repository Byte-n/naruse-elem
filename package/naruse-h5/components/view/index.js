import { Component } from 'react';

class View extends Component {
    constructor () {
        super();
        this.state = {
            hover: false,
            touch: false,
        };
        this.startTime = 0;
    }

    render () {
        const {
            hoverClass,
            onTouchStart,
            onTouchEnd,
            onTouchMove,
            className,
            hoverStartTime = 50,
            hoverStayTime = 400,
            ...other
        } = this.props;

        /** 开始触摸 */
        const _onTouchStart = e => {
            if (hoverClass) {
                this.setState(() => ({ touch: true }));
                setTimeout(() => {
                    if (this.state.touch) {
                        this.setState(() => ({ hover: true }));
                    }
                }, hoverStartTime);
            }
            onTouchStart && onTouchStart(e);
            if (this.props.onLongPress) {
                this.timeoutEvent = setTimeout(() => {
                    this.props.onLongPress();
                }, 350);
                this.startTime = (new Date()).getTime();
            }
        };

        /** 触摸移动 */
        const _onTouchMove = e => {
            clearTimeout(this.timeoutEvent);
            onTouchMove && onTouchMove(e);
        };

        /** 当触摸结束 */
        const _onTouchEnd = e => {
            const spanTime = (new Date().getTime()) - this.startTime;
            if (spanTime < 350) {
                clearTimeout(this.timeoutEvent);
            }
            if (hoverClass) {
                this.setState(() => ({ touch: false }));
                setTimeout(() => {
                    if (!this.state.touch) {
                        this.setState(() => ({ hover: false }));
                    }
                }, hoverStayTime);
            }
            onTouchEnd && onTouchEnd(e);
        };

        return (
            <div
                {...other}
                className={className}
                onTouchStart={_onTouchStart}
                onTouchEnd={_onTouchEnd}
                onTouchMove={_onTouchMove}
            >
                {this.props.children}
            </div>
        );
    }
}

export default View;
