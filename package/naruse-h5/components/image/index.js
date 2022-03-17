import { Component } from 'react';
import classNames from 'classnames';

class Image extends Component {
    constructor (props) {
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
                        // findDOMNode(this).children[0].src = this.props.src
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
    imageOnLoad (e) {
        const { onLoad } = this.props;
        Object.defineProperty(e, 'detail', {
            enumerable: true,
            writable: true,
            value: {
                width: e.target.width,
                height: e.target.height,
            },
        });

        onLoad && onLoad(e);
    }

    render () {
        const {
            className,
            src,
            style = {},
            mode,
            onError,
            imgProps,
            ...reset
        } = this.props;
        const cls = classNames(
            'taro-img',
            { 'taro-img__widthfix': mode === 'widthFix' },
            className
        );
        const imgCls = classNames(`taro-img__mode-${
            (mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')}`);

        return (
            <div className={cls} style={style} {...reset}>
                {
                    <img
            ref={img => (this.imgRef = img)}
            className={imgCls}
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
