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
        this.naturalSize = null;
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
        this.computeNaturalSize(() => {
            this.adaptationWeex();
            this.setState({ visible: true });
        });
    }

    computeNaturalSize (callback) {
        const image = new Image();
        image.src = this.props.src;
        image.onload = () => {
            this.naturalSize = { width: image.width, height: image.height };
            callback(true);
        };
        image.onerror = () => {
            callback(false);
            this.naturalSize = null;
        };
        image.onabort = () => {
            callback(false);
            this.naturalSize = null;
        };
    }
    componentDidUpdate(prevProps) {
        if(prevProps.src != this.props.src) {
            this.computeNaturalSize(() => {
                this.adaptationWeex();
            });
        } else if (
            prevProps.style?.width !== this.props.style?.width
            || prevProps.style?.height !== this.props.style?.height
        ) {
            this.adaptationWeex();
        }
    }
    adaptationWeex () {
        const { style = {}, mode } = this.props;
        const { unsafeEnabled: { compatibleWeexElement, compatibleWeexElementLog }, convertRpx } = getNaruseConfig();
        if (compatibleWeexElementLog) {
            console.log('compatibleWeexElement:', this.props, this.naturalSize);
        }
        if (
            compatibleWeexElement
            && (style.height == undefined && style.width === undefined)
            && this.naturalSize
        ) {
            switch (mode) {
                case 'widthFix':
                    this.setState({
                        imageSize: {
                            maxWidth: convertRpx(this.naturalSize.width) + 'px',
                        }
                    });
                    return;
                case 'heightFix':
                    this.setState({
                        imageSize: {
                            maxHeight: convertRpx(this.naturalSize.height) + 'px',
                        }
                    });
                    return;
            }
        } else {
            this.setState({ imageSize: {} });
        }
    }
    componentWillUnmount () {
        this.observer.disconnect && this.observer.disconnect();
    }

    /** 当图片加载完毕 */
    imageOnLoad = (event) => {
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
