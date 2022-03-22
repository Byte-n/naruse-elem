import React, { Component, createElement } from 'react';
import { logger } from '../utils/log';
import Button from './button/index.jsx';
import Checkbox from './checkbox/index.jsx';
import Image from './image/index.jsx';
import Input from './input/index.jsx';
import Text from './text/index.jsx';
import View from './view/index.jsx';

window.React = React;

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
            logger.warn('不支持的组件类型', type);
            return naruseCreateElement('view', null, '不支持的组件类型');
        }
        return createElement(Component, props, ...children);
    }
    if (type.prototype instanceof Component) {
        return createElement(type, props, ...children);
    }
    if (typeof type === 'function') {
        props.children = children;
        return type(props);
    }
    logger.warn('不支持的组件类型', type);
};


export { naruseCreateElement };
