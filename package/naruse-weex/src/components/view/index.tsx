import { createElement } from 'rax';
import type { TouchEvent } from 'rax';
import { View } from 'rax-components';
import { createCommonEvent, createCommonTouchEvent } from '../../utils';
import { infectionStyleChildren } from '../../core/style';
import { BaseComponent } from 'src/core/component';

class _View extends BaseComponent {
    constructor (props: any) {
        super(props);
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

    onLongClick = (event: TouchEvent) => {
        const { onLongClick } = this.props;
        const { changedTouches } = event;
        if (!changedTouches.length) return;
        const item = changedTouches[0];
        onLongClick && onLongClick(createCommonEvent('longclick', {
            clientX: item.clientX || 0,
            clientY: item.clientY || 0,
            pageX: item.pageX || 0,
            pageY: item.pageY || 0,
        }));
    }

    onTouchStart = (event: TouchEvent) => {
        const { onTouchStart } = this.props;
        onTouchStart && onTouchStart(createCommonTouchEvent(event));
    }

    onTouchMove = (event: TouchEvent) => {
        const { onTouchMove } = this.props;
        onTouchMove && onTouchMove(createCommonTouchEvent(event));
    }

    onTouchEnd = (event: TouchEvent) => {
        const { onTouchEnd } = this.props;
        onTouchEnd && onTouchEnd(createCommonTouchEvent(event));
    }

    componentWillUnmount () {
    }

    render() {

        const { children, style, className, onClick, onLongClick, onTouchStart, onTouchMove, onTouchEnd, _infectedProps = {}, ...other } = this.props;
        const { style: parentStyle } = _infectedProps;
        const styleObj = { ...parentStyle, ...style };
        const infectedChildren = infectionStyleChildren(children, styleObj);

        const jsx = <View
            {...other}
            style={styleObj}
            className={parentStyle}
            onClick={onClick ? this.onClick : undefined}
            onLongpress={onLongClick ? this.onLongClick : undefined}
            onTouchStart={onTouchMove ? this.onTouchStart : undefined}
            onTouchMove={onTouchMove ? this.onTouchMove : undefined}
            onTouchEnd={onTouchEnd ? this.onTouchEnd : undefined}
        >{infectedChildren}</View>;
        return jsx;
    }
}


export default _View;
