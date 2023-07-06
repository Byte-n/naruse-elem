import { Component, createElement } from 'rax';
import { Text } from 'rax-components';
import type { TouchEvent } from 'rax';
import { createCommonEvent } from '../../utils';


class _Text extends Component<any, any> {

    private touched = true;
    private eventRaw: TouchEvent | undefined;

    constructor (props: any) {
        super(props);
    }

    onTouchStart = (event: TouchEvent) => {
        this.touched = true;
        this.eventRaw = event;
    }

    onTouchEnd = () => {
        if (!this.touched) return;
        const { onClick } = this.props;
        const item = this.eventRaw?.changedTouches[0];
        onClick && onClick(createCommonEvent('click', {
            clientX: item?.clientX || 0,
            clientY: item?.clientY || 0,
            pageX: item?.pageX || 0,
            pageY: item?.pageY || 0,
        }));
        this.touched = false;
        this.eventRaw = undefined;
    }

    onClick = (event: any) => {
        const { onClick } = this.props;
        const item = event.position || {};
        onClick && onClick(createCommonEvent('click', {
            clientX: item.clientX || 0,
            clientY: item.clientY || 0,
            pageX: item.pageX || 0,
            pageY: item.pageY || 0,
        }));
    }

    render() {
        const { children, style, className, selectable, onClick, _infectedProps = {} , ...other } = this.props;
        const { style: parentStyle } = _infectedProps;
        const styleObj = { ...parentStyle, ...style };
        return <Text
            {...other}
            style={styleObj}
            selectable={selectable}
            className={className}
            onClick={onClick ? this.onClick : undefined}
            // onTouchStart={this.onTouchStart}
            // onTouchEnd={this.onTouchEnd}
        >{children}</Text>;
    }
}

export default _Text;
