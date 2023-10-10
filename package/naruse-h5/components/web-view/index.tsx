import { commonEventHander, commonMouseEventCreater, commonTouchEventCreater } from '../../core/event';
import React, { Component } from 'react';
import { getPropsDataSet, isNaruseAnimaitonName } from '../../utils';

const h = React.createElement;

class WebView extends Component<{
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
    observer?: IntersectionObserver;
    hasFirstAppear = false;

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
        this.updateAppear();
    }

    componentDidUpdate() {
        this.updateAnimation();
        this.updateAppear();
    }

    private updateAnimation() {
        const { animation } = this.props;
        if (animation !== this.lastAnimationName && isNaruseAnimaitonName(animation)) {
            // 等待组件彻底装载完毕后再启动animation，否则会出现动画不生效的情况
            clearTimeout(this.animationTimer);
            this.animationTimer = setTimeout(() => this.ref?.setAttribute('data-animation', animation))
            this.lastAnimationName = animation;
        }
    }

    private updateAppear() {
        const { onAppear, onDisappear, onFirstAppear } = this.props;
        const hasAppear = onAppear || onDisappear || onFirstAppear;
        if (hasAppear && this.ref) {
            const isOnlyFirst = onFirstAppear && !onAppear && !onDisappear;
            if (isOnlyFirst && this.hasFirstAppear) return;
            // 开始观察
            this.startObserver(isOnlyFirst);
        }
    }

    private startObserver(isOnlyFirst: boolean) {
        if (this.observer) return;
        if (window.IntersectionObserver === undefined) {
            console.warn('IntersectionObserver is not supported in this browser, please use polyfill.');
            return;
        }
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.intersectionRatio >= 0.5) {
                    this.props.onAppear && this.props.onAppear();
                    if (this.props.onFirstAppear) {
                        if (this.hasFirstAppear) return;
                        this.props.onFirstAppear();
                    }
                    if (isOnlyFirst) {
                        this.observer?.disconnect();
                        this.observer = undefined;
                    }
                    this.hasFirstAppear = true;
                } else {
                    // 没有展示过的不会触发消失事件
                    if (!this.hasFirstAppear) return;
                    this.props.onDisappear && this.props.onDisappear();
                }
            })
        }, {
            threshold: [0.5]
        });
        this.observer.observe(this.ref!);
    }

    componentWillUnmount() {
        this.mounted = false;
        // 清除动画
        clearTimeout(this.hoverTimer);
        clearTimeout(this.animationTimer);
        // 清除观察
        this.observer?.disconnect?.();
        this.observer = undefined;
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
            src,
            ...other
        } = this.props;
        const { hover } = this.state;

        const conStyle = {
            ...style,
            ...(hover ? hoverStyle : {}),
        };


        return (
            <iframe
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
                onBlur={commonEventHander.bind(this)}
                onFocus={commonEventHander.bind(this)}
                onLoad={commonEventHander.bind(this)}
                onError={commonEventHander.bind(this)}
                onMessage={commonEventHander.bind(this)}
                src={src}
                {...getPropsDataSet(other)}
            >
                {this.props.children}
            </iframe>
        );
    }
}

export default WebView;
