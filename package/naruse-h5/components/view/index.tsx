import {commonEventHander, commonMouseEventCreater, commonTouchEventCreater} from '../../core/event';
import React, { Component } from 'react';
import {getPropsDataSet, isNaruseAnimaitonName} from '../../utils';

const h = React.createElement;

class View extends Component<{
    disabled,
    hoverStartTime,
    hoverStayTime,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onMouseUp,
    onMouseDown,
    onTouchEnd,
    onTouchStart,
    onTouchMove,
    onTransitionEnd,
    onClick,
    className,
    style,
    hoverStyle,
    id,
    animation,
}, {
    hover: boolean,
}> {
    mounted = false;
    touch = false;
    ref: HTMLDivElement | null;
    lastAnimationName: string;
    animationTimer: number;
    hoverTimer: number;
    constructor() {
        super();
        this.state = {
            hover: false
        }
    }
    componentDidMount() {
        this.mounted = true;
        // 等待装载完毕后再启动animation
        this.updateAnimation();
    }

    componentDidUpdate() {
        this.updateAnimation();
    }

    updateAnimation () {
        const {animation} = this.props;
        if (animation !== this.lastAnimationName && isNaruseAnimaitonName(animation)) {
            // 等待组件彻底装载完毕后再启动animation，否则会出现动画不生效的情况
            clearTimeout(this.animationTimer);
            this.animationTimer = setTimeout(() => this.ref?.setAttribute('data-animation', animation))
            this.lastAnimationName = animation;
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        clearTimeout(this.hoverTimer);
        clearTimeout(this.animationTimer);
    }
    /** 当开始点击时 */
    onTouchStart(event?: React.TouchEvent<any>) {
        const { disabled, hoverStartTime = 20, onTouchStart } = this.props;
        if (disabled || !this.mounted) return;

        this.touch = true;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
        event && onTouchStart && onTouchStart(commonTouchEventCreater(event));
    }

    /** 点击结束时 */
    onTouchEnd(event?: React.TouchEvent<any>) {
        const { disabled, hoverStayTime = 70, onTouchEnd } = this.props;
        if (disabled || !this.mounted) return;
        this.touch = false;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(() => {
            if (!this.touch) {
                this.setState({ hover: false });
            }
        }, hoverStayTime);
        event && onTouchEnd && onTouchEnd(commonTouchEventCreater(event));
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
            id,
            ...other
        } = this.props;
        const { hover } = this.state;

        const conStyle = {
            ...style,
            ...(hover ? hoverStyle : {}),
        };


        return (
            <div
                id={id}
                ref={ref => this.ref = ref}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                onMouseMove={this.onMouseMove.bind(this)}
                onTouchStart={this.onTouchStart.bind(this)}
                onTouchMove={commonEventHander.bind(this)}
                onTouchEnd={this.onTouchEnd.bind(this)}
                onTransitionEnd={commonEventHander.bind(this)}
                onMouseDown={commonEventHander.bind(this)}
                onMouseUp={commonEventHander.bind(this)}
                className={className}
                style={conStyle}
                onClick={commonEventHander.bind(this)}
                {...getPropsDataSet(this.props)}
            >
                {this.props.children}
            </div>
        );
    }
}

export default View;
