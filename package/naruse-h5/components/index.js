import { createElement } from 'react';
import { logger } from '../utils/log';
import Button from './button/index';
import Checkbox from './checkbox/index';
import Image from './image/index';
import Input from './input/index';
import Text from './text/index';
import View from './view/index';

/** 组件映射表 */
const componentReflectMap = {
    button: Button,
    checkbox: Checkbox,
    image: Image,
    input: Input,
    text: Text,
    view: View,
};


/**
 * @description 拦截下来的react.createElement
 * @author CHC
 * @date 2022-03-17 17:03:42
 * @param {*} type
 * @param {*} props
 * @param {*} children
 */
const naruseCreateElement = (type, props, ...children) => {
    if (typeof type === 'string') {
        const Component = componentReflectMap[type];
        if (!Component) {
            logger.warn('组件类型不存在', type);
            return null;
        }
        return createElement(Component, props, ...children);
    }
    if (typeof type === 'function') {
        props.children = children;
        return type(props);
    }
    logger.warn('不支持的组件类型', type);
};


export { naruseCreateElement };
