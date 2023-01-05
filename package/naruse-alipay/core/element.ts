import { cleanChildNode, VNode } from "./diff";

/**
 * @description 以 Naruse 元素为模板克隆并返回新的 Naruse 元素，将传入的 props 与原始元素的 props 浅层合并后返回新元素的 props。新的子元素将取代现有的子元素，而来自原始元素的 key 和 ref 将被保留。
 * @author CHC
 * @date 2023-01-05 11:01:51
 * @param {*} element
 * @param {Record<string,any>} props
 * @param {*} children
 */
export const cloneElement = (element: VNode, props: Record<string,any>, ...children: VNode[]) => {
    const newProps = { ...element.props, ...props };
    let newChildren = children.length ? children : element.children;

    if (newChildren.length) {
        newChildren = newChildren.map(cleanChildNode);
    }

    // naruse 组件元素
    if (element.naruseType === 'naruse-element') {
        const oldProps = element?.component.props;
        const newComponent = { ...element.component, props: { ...oldProps, ...newProps, children: newChildren, key: oldProps.key, ref: oldProps.ref } };
        return { ...element, component: newComponent };
    }
    // 基础元素
    return {
        ...element,
        ...newProps,
        childNodes: newChildren,
        naruseType: element.naruseType,
        key: element.key,
        ref: element.ref,
    };
};


/**
 * @description 判断是有效的Naruse元素
 * @author CHC
 * @date 2023-01-05 11:01:20
 */
export const isValidElement = (element: any): boolean => {
    return !!(element && element.naruseType);
}