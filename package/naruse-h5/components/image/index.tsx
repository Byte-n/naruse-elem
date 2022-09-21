import { commonEventHander } from '../../core/event';
import { Component } from 'react';
import cssStyle from './index.css'

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoaded: false };
        this.imageOnLoad = this.imageOnLoad.bind(this);
        this.observer = {};
        this.imgRef = null;
    }
    componentDidMount () {
        if (this.props.lazyLoad) {
            this.observer = new IntersectionObserver((entries) => {
                // 异步 api 关系
                if (entries[entries.length - 1].isIntersecting) {
                    this.setState({ isLoaded: true }, () => {
                        this.imgRef.src = this.props.src;
                    });
                }
            }, { rootMargin: '300px 0px' });
            this.observer.observe(this.imgRef);
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
        } = this.props;
        const divStyle = { ...cssStyle.naruseImg, ...(mode === 'widthFix' ? cssStyle.naruseImg__widthfix : {}) };
        const imgStyle = cssStyle[(mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')];
        return (
            <div onClick={commonEventHander.bind(this)} className={className} style={{ ...divStyle, ...style }}>
                {
                    <img
                        ref={img => (this.imgRef = img)}
                        style={imgStyle}
                        src={src}
                        onLoad={this.imageOnLoad}
                        onError={onError}
                        {...imgProps}
                    />
                }
            </div>
        );
    }
}

export default Image;