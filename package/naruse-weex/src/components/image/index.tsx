import { Component, createElement } from "rax";
import { Image } from "rax-components";
import { createCommonEvent } from "../../utils/index";

const rpxReg = /([\d.]+)\s?r?px/g;

/**
 * @description 将rpx 或者 px 转换为 数字
 * @author CHC
 * @date 2022-07-08 14:07:16
 * @param {(string | number)} val
 * @returns {*}
 */
const parseRpxToNumber = (val: string | number): number => {
    if (typeof val !== 'string') return val;
    const matchRes = val.match(rpxReg);
    if (!matchRes) return parseFloat(val);
    return parseFloat(matchRes[0]);
};


const modeReflectMap: Record<string, string> = {
    aspectFit: 'contain',
    aspectFill: 'cover',
    scaleToFill: 'stretch'
}

class _Image extends Component<any, any> {
    private width: number = 400;
    private height: number = 400;
    state = { height: 400, width: 400, resize: 'stretch' };

    constructor (props: any) {
        super(props);
    }

    onLoad = (event: { success: any; size: any; }) => {
        const { success, size } = event;
        const { onLoad } = this.props;
        if (success) {
            const { naturalWidth: width, naturalHeight: height } = size;
            if (!(width > 0 && height > 0)) return;
            this.width = width;
            this.height = height;
            this.setState({ width, height });
            this.initMode();
            onLoad && onLoad(createCommonEvent('load', { width, height }));
        }
    }

    onClick = (event: any) => {
        const { onClick } = this.props;
        onClick && onClick(createCommonEvent('click', { originEvent: event }));
    }

    /**
     * @description 初始化mode
     * @author CHC
     * @date 2022-07-08 14:07:33
     */
    initMode = () => {
        const { mode, style } = this.props;
        switch (mode) {
            case 'aspectFit':
            case 'aspectFill':
            case 'scaleToFill':
                return this.setState({ resize: modeReflectMap[mode] });
            case 'widthFix': {
                // 宽存在切高不存在
                if (style && style.width && !style.height) {
                    // 等比计算高度
                    const height: number = parseRpxToNumber(style.width) * (this.height / this.width);
                    this.setState({ height });
                }
                return;
            }
            case 'heightFix': {
                // 高存在切宽不存在
                if (style && style.height && !style.width) {
                    // 等比计算宽度
                    const width: number = parseRpxToNumber(style.height) * (this.width / this.height);
                    this.setState({ width });
                }
                return;
            }
            default:
                return;
        }
    }

    render() {
        const { width, height, resize } = this.state;
        const {
            src,
            style,
            className,
            ...other
        } = this.props;
        return (
            <Image
                {...other}
                className={className}
                style={{ width, height, ...style }}
                source={{
                    uri: src,
                }}
                onLoad={this.onLoad}
                onError={this.onLoad}
                onCLick={this.onClick}
                resize={resize}
            >
            </Image>
        );
    }
}

export default _Image;
