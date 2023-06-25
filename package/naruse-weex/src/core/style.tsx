import Rax, { createElement } from 'rax';
import Text from '../components/text/index';
import { isNaruseComponent, isRaxComponent } from './component';

/** 可继承属性 */
const inheritableStyleMap: Record<string, boolean> = {
    color: true,
    fontSize: true,
    fontWeight: true,
    fontStyle: true,
    fontFamily: true,
    lineHeight: true,
    textAlign: true,
    textDecoration: true,
    textOverflow: true,
    textShadow: true,
    textTransform: true,
    letterSpacing: true,
    wordSpacing: true,
    textIndent: true,
    whiteSpace: true,
    wordWrap: true,
    wordBreak: true,
    direction: true,
    visibility: true,
    backgroundImage: true,
}


/** 获取继承后的属性 */
const inheritStyle = (style: Record<string, any>) => {
    if (!style) return style;
    const newStyle: Record<string, any> = {};
    for (const key in style) {
        if (inheritableStyleMap[key]) {
            newStyle[key] = style[key];
        }
    }
    return newStyle;
}


/** 是否是一个fixed基础组件 */
const isFixedComponent = (component: Rax.RaxNode): boolean => {
    return isRaxComponent(component?.type) && component?.props?.style?.position === 'fixed';
}

/** 是否为基础类型元素 */
const isBaseTypeComponent = (child: Rax.RaxNode): boolean => {
    return typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean';
}

/** 生成基本元素组件 */
const generateBaseTypeComponent = (child: string | number | boolean, style: Record<string, any>) => {
    return <Text style={style}>{child}</Text>
}


/**
 * @description 样式感染
 * @author CHC
 * @date 2022-07-11 18:07:02
 */
const infectionStyleChildren = (children: Rax.RaxNode, parentStyle: Record<string, any>): Rax.RaxNode => {
    if (!children) return children;

    const filteredStyle = inheritStyle(parentStyle);
    const _infectedProps = Object.freeze && Object.freeze({ style: filteredStyle }) || { style: filteredStyle };

    // naruse组件判断是否含有fix组件
    if (isNaruseComponent(children)) {
        return children.props.style = { ...filteredStyle, ...children.props.style };
    }

    if (isBaseTypeComponent(children)) {
        return generateBaseTypeComponent(children, filteredStyle);
    }

    if (!Array.isArray(children)) children = [children];

    const newChildren: Rax.RaxNode [] = [];

    (children as []).forEach((child: Rax.RaxChild) => {
        if (!child) return;
        // 基本元素自动转化为text
        if (isBaseTypeComponent(child)) {
            return newChildren.push(generateBaseTypeComponent(child, filteredStyle));
        }
        // 透过组件传递参数
        if (typeof child.type === 'function') {
            child.props = { ...child.props, _infectedProps };
            return newChildren.push(child);
        }
        return newChildren.push(child);
    });
    return newChildren;
}


export {
    infectionStyleChildren,
}
