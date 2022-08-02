import { createElement } from 'rax';
import Component from './component'
import { logger } from '../utils/log';
import View from '../components/view/index';
import Text from '../components/text/index';
import Image from '../components/image/index';
import { infectionStyleChildren } from './style';


/** 组件映射表 */
const componentReflectMap: Record<string, any> = {
    view: View,
    text: Text,
    image: Image,
};

/**
 * @description 拦截下来的rax.createElement
 * @author CHC
 * @date 2022-03-17 17:03:42
 */
const naruseCreateElement = (type: string | { (arg0: any): any; prototype: any; }, props?: any, ...children: string[]): any => {
    if (typeof type === 'string') {
        const Component = componentReflectMap[type];
        if (!Component) {
            logger.warn('不支持的组件类型', type);
            return naruseCreateElement('view', null, `不支持的组件类型-${type}`);
        }
        return createElement(Component, props, children);
    }
    if (type.prototype instanceof Component) {
        return createElement(type, props, children);
    }
    if (typeof type === 'function') {
        if (props) {
            props.children = children;
        } else {
            props = { children };
        }
        return infectionStyleChildren(type(props), props.style);
    }
    logger.warn('不支持的组件类型', type);
};


const emptyElement = (): any => {
    return createElement(View);
}

export { naruseCreateElement, emptyElement };
