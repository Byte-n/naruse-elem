import { isNaruseComponent } from './component';

/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */
const vnodeSpecialMap = {
    text (props, childNodes) {
        return { content: childNodes ? childNodes[0] : '' };
    },
};

/**
 * @description 模拟react的创建虚拟节点
 * @author CHC
 * @date 2022-02-23 15:02:03
 * @param {*} type 组件类型
 * @param {*} props 组件属性
 * @param {*} childNodes 子节点
 * @returns {*}
 */
export const createElement = (type, props, ...childNodes) => {
    if (isNaruseComponent(type.prototype)) return createClassElement(type, props, childNodes);
    if (typeof type === 'function') return createFuncElement(type, props, childNodes);
    return createBaseElement(type, props, childNodes);
};


/**
 * @description 创建新的naruse组件
 * @author CHC
 * @date 2022-03-21 12:03:04
 * @param {*} type
 * @param {*} props
 * @param {*} childNodes
 */
const createClassElement = (type, props, childNodes) => {
    props = { ...props, children: childNodes };
    // 先不实例化对象，等待组件装载完成后再实例化
    const component = { actuator: type, props };
    return { naruseType: 'naruse-element', component };
};

/**
 * @description 创建基础节点
 * @author CHC
 * @date 2022-03-21 12:03:16
 * @param {*} type
 * @param {*} props
 * @param {*} childNodes
 * @returns {*}
 */
const createBaseElement = (type, props, childNodes) => {
    let newNode = {};
    if (vnodeSpecialMap[type]) newNode = vnodeSpecialMap[type](props, childNodes);
    childNodes = (childNodes.flat && childNodes.flat(1)) || childNodes;
    childNodes = childNodes.map(child => {
        if (typeof child === 'string' || typeof child === 'number') return { naruseType: 'text', content: child };
        return child;
    });
    const node = ({ naruseType: type, ...props, childNodes, ...newNode });
    return node;
};

/**
 * @description 创建一个函数式组件
 * @author CHC
 * @date 2022-03-15 12:03:45
 */
const createFuncElement = (type, props, childNodes) => {
    return type({ ...props, children: childNodes });
};
