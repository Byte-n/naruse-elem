import { commonEventHander } from '../../core/event';
import React, { Component } from 'react';
import cssStyle from './index.css'
import { getPropsDataSet } from '../../utils';
import { getNaruseConfig } from '../../core/init';

const h = React.createElement;

class _Image extends Component<
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
        const { unsafeEnabled: { compatibleWeexElement } } = getNaruseConfig();
        this.state = { isLoaded: false, imageSize: {}, visible: !compatibleWeexElement };
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
        this.adaptationWeex();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.src != this.props.src) {
            this.adaptationWeex();
        }
    }
    adaptationWeex () {
        const { unsafeEnabled: { compatibleWeexElement }, convertRpx } = getNaruseConfig();
        if (compatibleWeexElement) {
            this.setState({ imageSize: {}, visible: false });
            const image = new Image()
            image.src = this.props.src
            image.onload = () => {
                this.setState({
                    imageSize: {
                        width: convertRpx(image.width) + 'px',
                        height: convertRpx(image.height)  + 'px',
                    },
                    visible: true
                });
            }
            image.onerror = () => {
                this.setState({ visible: true });
            }
            image.onabort = () => {
                this.setState({ visible: true });
            }
        }
    }
    componentWillUnmount () {
        this.observer.disconnect && this.observer.disconnect();
    }

    /** 当图片加载完毕 */
    imageOnLoad = (event) => {
        const { unsafeEnabled: { compatibleWeexElement }, convertRpx } = getNaruseConfig();
        if (compatibleWeexElement) {
            console.log('compatibleWeexElement:', compatibleWeexElement,event.detail, {
                width: convertRpx(event.target.width) + 'px',
                height: convertRpx(event.target.height)  + 'px',
            });

        }
        commonEventHander.call(this, event);
    }

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
        const { imageSize, visible } = this.state;
        if (!visible) {
            return null;
        }
        const divStyle = { ...cssStyle.naruseImg, ...(mode === 'widthFix' ? cssStyle.naruseImg__widthfix : {}) };
        const imgStyle = cssStyle[(mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')];
        return (
            <div onClick={commonEventHander.bind(this)} className={className} style={{ ...divStyle, ...style }}>
                <img
                    key='img'
                    ref={img => (this.ref = img)}
                    id={id}
                    style={{ ...imageSize, ...imgStyle }}
                    src={src}
                    onLoad={this.imageOnLoad}
                    onError={onError}
                    onTransitionEnd={commonEventHander.bind(this)}
                    {...imgProps}
                    {...getPropsDataSet(other)}
                />
            </div>
        );
    }
}

export default _Image;
