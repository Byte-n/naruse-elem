import cssStyle from './index.css'

import React from 'react'

const h = React.createElement;

export function throttle(fn, threshold = 250, scope?) {
    let lastTime = 0
    let deferTimer: ReturnType<typeof setTimeout>
    return function (...args) {
        const context = scope || this
        const now = Date.now()
        if (now - lastTime > threshold) {
            fn.apply(this, args)
            lastTime = now
        } else {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                lastTime = now
                fn.apply(context, args)
            }, threshold)
        }
    }
}

function easeOutScroll(from = 0, to = 0, callback) {
    if (from === to || typeof from !== 'number') {
        return
    }
    const change = to - from
    const dur = 500
    const sTime = +new Date()
    function linear(t, b, c, d) {
        return (c * t) / d + b
    }
    const isLarger = to >= from

    function step() {
        from = linear(+new Date() - sTime, from, change, dur)
        if ((isLarger && from >= to) || (!isLarger && to >= from)) {
            callback(to)
            return
        }
        callback(from)
        requestAnimationFrame(step)
    }
    step()
}

function scrollIntoView(id) {
    document.querySelector(`#${id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
    })
}

function scrollVertical(top, isAnimation) {
    if (isAnimation) {
        easeOutScroll(this._scrollTop, top, pos => {
            if (this.container) this.container.scrollTop = pos
        })
    } else {
        if (this.container) this.container.scrollTop = top
    }
    this._scrollTop = top
}

function scrollHorizontal(left, isAnimation) {
    if (isAnimation) {
        easeOutScroll(this._scrollLeft, left, pos => {
            if (this.container) this.container.scrollLeft = pos
        })
    } else {
        if (this.container) this.container.scrollLeft = left
    }
    this._scrollLeft = left
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    scrollX: boolean
    scrollY: boolean
    upperThreshold: number
    lowerThreshold: number
    scrollTop: number
    scrollLeft: number
    scrollIntoView?: string
    scrollWithAnimation: boolean
    enableBackToTop?: boolean
    onScrollToUpper: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
    onScrollToLower: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
    onScroll: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
    onTouchMove: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
}

const scrollId = 'scroll';
const scrollBar = document.createElement('style');
scrollBar.type = 'text/css';
scrollBar.id = '_theOnlyScrollBar';
scrollBar.innerHTML = `
    ._scrollView::-webkit-scrollbar {
        display: none
    }
`;
const head = document.getElementsByTagName('head').item(0);
if (!document.getElementById('_theOnlyScrollBar')) {
    head.append(scrollBar);
}

class ScrollView extends React.Component<IProps> {
    _scrollTop: any = undefined;
    _scrollLeft: any = undefined;
    container: any = null;

    onTouchMove = e => {
        e.stopPropagation()
    }

    componentDidMount() {
        const childNodesList = this.props.children;
        this.handleScroll(this.props, true);
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        this.handleScroll(this.props);
    }

    handleScroll(props, isInit = false) {
        if (
            props.scrollIntoView &&
            typeof props.scrollIntoView === 'string' &&
            document &&
            document.querySelector &&
            document.querySelector(`#${props.scrollIntoView}`)
        ) {
            if (isInit) {
                setTimeout(() => scrollIntoView(props.scrollIntoView), 500)
            } else {
                scrollIntoView(props.scrollIntoView)
            }
        } else {
            const isAnimation = 'scrollWithAnimation' in props;
            // Y 轴滚动
            if (props.scrollY && typeof props.scrollTop === 'number' && props.scrollTop !== this._scrollTop) {
                if (isInit) {
                    setTimeout(() => scrollVertical.bind(this)(props.scrollTop, isAnimation), 10)
                } else {
                    scrollVertical.bind(this)(props.scrollTop, isAnimation)
                }
            }
            // X 轴滚动
            if (props.scrollX && typeof props.scrollLeft === 'number' && props.scrollLeft !== this._scrollLeft) {
                if (isInit) {
                    setTimeout(() => scrollHorizontal.bind(this)(props.scrollLeft, isAnimation), 10)
                } else {
                    scrollHorizontal.bind(this)(props.scrollLeft, isAnimation)
                }
            }
        }
    }

    render() {
        const {
            className,
            style = {},
            scrollX,
            scrollY,
            onScroll,
            onScrollToUpper,
            onScrollToLower,
            onTouchMove,
        } = this.props;
        let { upperThreshold, lowerThreshold } = this.props;
        upperThreshold = upperThreshold ? Number(upperThreshold) : 0;
        lowerThreshold = lowerThreshold ? Number(lowerThreshold) : 0;
        const scrollWhere = {
            overflowX: (scrollX ? 'scroll' : 'hidden'),
            overflowY: (scrollY ? 'scroll' : 'hidden'),
        }

        const upperAndLower = e => {
            if (!this.container) return;
            const { offsetWidth, offsetHeight, scrollLeft, scrollTop, scrollHeight, scrollWidth } = this.container;
            // 滚动到距离顶部/左边多远就触发事件
            if (
                onScrollToLower &&
                ((this.props.scrollY && offsetHeight + scrollTop + lowerThreshold >= scrollHeight) ||
                    (this.props.scrollX && offsetWidth + scrollLeft + lowerThreshold >= scrollWidth))
            ) {
                onScrollToLower(e)
            }
            if (
                onScrollToUpper &&
                ((this.props.scrollY && scrollTop <= upperThreshold) || (this.props.scrollX && scrollLeft <= upperThreshold))
            ) {
                onScrollToUpper(e)
            }
        }
        const upperAndLowerThrottle = throttle(upperAndLower, 200);
        const _onScroll = e => {
            const { scrollLeft, scrollTop, scrollHeight, scrollWidth } = this.container;
            this._scrollLeft = scrollLeft;
            this._scrollTop = scrollTop;
            Object.defineProperty(e, 'detail', {
                enumerable: true,
                writable: true,
                value: {
                    scrollLeft,
                    scrollTop,
                    scrollHeight,
                    scrollWidth,
                }
            })
            upperAndLowerThrottle(e);
            onScroll && onScroll(e);
        }
        const _onTouchMove = e => {
            onTouchMove ? onTouchMove(e) : this.onTouchMove(e);
        }
        return (
            <div
                className={ `${className} _scrollView` }
                ref={container => {
                    this.container = container;
                }}
                style={{ ...cssStyle.scroll, ...style, ...scrollWhere }}
                onScroll={_onScroll}
                onTouchMove={_onTouchMove}
            >
                {this.props.children}
            </div>
        )
    }
}

ScrollView.defaultProps = {
    scrollX: false,
    scrollY: false,
    upperThreshold: 50,
    lowerThreshold: 50,
    scrollWithAnimation: false,
}

export default ScrollView