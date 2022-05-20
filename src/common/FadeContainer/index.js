import { Component } from 'Naruse';

export const taskQue  = (cb, interval) => {
    const  _interval = interval || 0;
    new Promise((resolve) => {
        let timer =   setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            resolve();
        }, _interval);
    }).then(() => {
        cb();
    });
};
/**
 * @description 动画效果容器组件
 * @author D
 * @date 2022-04-19 10:30:42
 * @export
 * @class FadeContainer
 * @extends {Component<{ visible: boolean;style:CSSProperties;inStyle:CSSProperties;outStyle:CSSProperties; onCloseEnd:()=>void>}
 */
export default class FadeContainer extends Component {
    constructor () {
        super();
        this.state = { animation: true, fadeVisible: true, closeingFlag: false };
    }

    componentDidMount () {
        taskQue(() => {
            this.setState({ ...this.state, animation: false });
        });
    }

    onClose () {
        this.setState({  closeingFlag: true,  animation: true, fadeVisible: true  });
        taskQue(() => {
            this.setState({ ...this.state,  animation: false, fadeVisible: false });
            this.props.onCloseEnd &&  this.props.onCloseEnd(false);
        }, 520);
    }
    componentDidUpdate () {
        const { closeingFlag } = this.state;
        if (closeingFlag) return;
        !this.props.visible && this.onClose();
    }

    render () {
        const { animation, fadeVisible } = this.state;
        const { children, style, inStyle, outStyle } = this.props;
        if (!fadeVisible) return null;
        const fadeStyle = animation ? inStyle : outStyle;
        return (
            <view style={{ ...style, ...fadeStyle }} >
                {children}
            </view>
        );
    }
}