import React, { Component, createElement } from 'react';
import { logger } from '../utils/log';
import Button from './button/index'
import Checkbox from './checkbox/index';
import Image from './image/index'
import Input from './input/index'
import Text from './text/index'
import View from './view/index'

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
const naruseCreateElement = (type: string, props: {} | null | undefined, ...children: string[]) => {
    transformRpx(props);
    if (typeof type === 'string') {
        const Component = componentReflectMap[type];
        if (!Component) {
            logger.warn('不支持的组件类型', type);
            return naruseCreateElement('view', null, `不支持的组件类型-${type}`);
        }
        return createElement(Component, props, ...children);
    }
    if (type.prototype instanceof Component) {
        return createElement(type, props, ...children);
    }
    if (typeof type === 'function') {
        props && (props.children = children);
        return type(props);
    }
    logger.warn('不支持的组件类型', type);
};


const rpxReg = /(\d+)\s?rpx/g;

const parsePx = val => {
    if (typeof val !== 'string') return val;
    const matchRes = val.match(rpxReg);
    if (!matchRes) return val;
    matchRes.forEach((item) => {
        const num = parseFloat(item);
        // 按照手机和电脑的比例进行换算
        val = val.replace(item, `${(num / 2 * 1.4).toFixed(1)}px`);
    });
    return val;
};

/**
 * @description 将所有的rpx转换为px
 * @author CHC
 * @date 2022-03-25 15:03:47
 * @param {*} [props={}]
 * @returns {*}
 */
const transformRpx = (props = {}) => {
    if (!props) return;
    const { style } = props;
    if (style && typeof style === 'object') {
        for (const key in style) {
            style[key] = parsePx(style[key]);
        }
    }
};


export { naruseCreateElement };
