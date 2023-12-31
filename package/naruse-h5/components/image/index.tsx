import { commonEventHander } from '../../core/event';
import React, { Component } from 'react';
import cssStyle from './index.css'
import { getPropsDataSet } from '../../utils';

const h = React.createElement;

class Image extends Component<
{
    lazyLoad,
    mode,
    onError,
    onLoad,
    src,
    className,
    style,
    onClick,
    onLongClick,
    onLongTap,
    imgProps,
    id,
}, {
    isLoaded: boolean,
}
> {
    observer: any;
    ref: HTMLImageElement | null;
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };
        this.imageOnLoad = this.imageOnLoad.bind(this);
        this.observer = {};
        this.ref = null;
    }
    componentDidMount () {
        if (this.props.lazyLoad) {
            this.observer = new IntersectionObserver((entries) => {
                // 异步 api 关系
                if (entries[entries.length - 1].isIntersecting) {
                    this.setState({ isLoaded: true }, () => {
                        this.ref && (this.ref.src = this.props.src);
                    });
                }
            }, { rootMargin: '300px 0px' });
            this.observer.observe(this.ref);
        }
    }

    componentWillUnmount () {
        this.observer.disconnect && this.observer.disconnect();
    }

    /** 当图片加载完毕 */
    imageOnLoad = commonEventHander.bind(this)

    render () {
        const {
            className,
            src,
            style = {},
            mode,
            onError,
            imgProps,
            id,
            ...other
        } = this.props;
        const divStyle = { ...cssStyle.naruseImg, ...(mode === 'widthFix' ? cssStyle.naruseImg__widthfix : {}) };
        const imgStyle = cssStyle[(mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')];
        return (
            <div onClick={commonEventHander.bind(this)} className={className} style={{ ...divStyle, ...style }}>
                {
                    <img
                        ref={img => (this.ref = img)}
                        id={id}
                        style={imgStyle}
                        src={src}
                        onLoad={this.imageOnLoad}
                        onError={onError}
                        onTransitionEnd={commonEventHander.bind(this)}
                        {...imgProps}
                        {...getPropsDataSet(other)}
                    />
                }
            </div>
        );
    }
}

export default Image;
