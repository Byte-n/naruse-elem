import { isEmptyObj, isObj } from "../../naruse-share";
import type { NaruseComponent } from "./component";

import { createElement } from "./createElement";

type DiffRes = Record<string, any>;

interface BaseVNode {
    naruseType: string;
    key?: string;
    childNodes?: VNode[];
    content?: string;
    _uid?: string;
    id?: string;
    parentId?: string;
    component?: {
        actuator: NaruseComponent;
        props: any;
    };
    [key: string]: any;
};


export type VNode = BaseVNode | null | undefined;

/**
 * @description 简单的o(n^2)diff操作，记录需要更新的node
 * @author CHC
 * @date 2022-10-11 14:10:32
 * @returns {*} 
 */
export const vnodeDiff = (newVnode: VNode, oldVnode: VNode, newParentNode?: VNode, oldParentNode?: VNode, path = 'node', diffRes: DiffRes = {}): DiffRes => {
    const res = diffRes;
    // just null
    if (!newVnode || isEmptyObj(newVnode)) {
        res[path] = {};
        return res;
    }

    // fix: 复用节点后diff失效的问题，单纯的使用指针判断是否相等在复用节点时会出现问题
    // 完全相同的对象并不一定内容一定相同
    // if (newVnode === oldVnode ) {
    //     return res;
    // }

    // 继承父组件id
    if (oldParentNode) {
        newVnode.parentId = oldParentNode.id;
    }

    if (!oldVnode) {
        res[path] = newVnode;
        return res;
    }

    // 非自定义id组件时，继承id
    if (!isCustomIdNode(newVnode)) {
        newVnode._uid = newVnode.id = oldVnode.id;
    }


    // key & type
    if (newVnode.key !== oldVnode.key
        || newVnode.naruseType !== oldVnode.naruseType) {
        res[path] = newVnode;
        return res;
    }

    // naruse-element 单独判断
    if (newVnode.naruseType === 'naruse-element' && newVnode.component) {
        if (newVnode.component.actuator === oldVnode.component?.actuator) {
            const propsChnages = vnodePropsDiff(newVnode.component.props, oldVnode.component.props);
            Object.keys(propsChnages).forEach((key) => {
                res[`${path}.component.props.${key}`] = propsChnages[key];
            });
        } else {
            res[path] = newVnode;
            return res;
        }
    } else {
        // 普通元素的props判断
        const propsChnages = vnodePropsDiff(newVnode, oldVnode);
        Object.keys(propsChnages).forEach((key) => {
            res[`${path}.${key}`] = propsChnages[key];
        });
        diffVnodeChildren(newVnode, oldVnode, `${path}.childNodes`, res);
    }

    return res;
}

/**
 * @description 子节点数组之间进行diff
 * @author CHC
 * @date 2022-10-11 15:10:18
 */
const diffVnodeChildren = (newNode: VNode, oldNode: VNode, path = 'node', diffRes: DiffRes = {}) => {
    let i: number, oldVNode: VNode, childVNode: VNode;

    const oldChildren = [...((oldNode && oldNode.childNodes) || [])];

    const oldChildrenLength = oldChildren.length;

    const newChildNodes = [...(newNode && newNode.childNodes) || []];

    if (!newChildNodes.length) {
        if (oldChildrenLength) {
            diffRes[path] = [];
        }
        return;
    }

    if (!oldChildrenLength) {
        return diffRes[path] = newChildNodes;
    }

    // 当新的列表长度小于旧列表时，直接重新设置整个列表，因为小程序的data list只支持增不支持减
    if (newChildNodes.length < oldChildrenLength) {
        return diffRes[path] = newChildNodes;
    }


    // just same length will diff
    for (i = 0; i < newChildNodes.length; i++) {
        childVNode = newChildNodes[i];

        if (childVNode == null || typeof childVNode == 'boolean') {
            childVNode = null;
        } else if (
            typeof childVNode == 'string' ||
            typeof childVNode == 'number' ||
            typeof childVNode == 'bigint'
        ) {
            childVNode = createElement('text', null, childVNode);
        } else if (Array.isArray(childVNode)) {
            childVNode = createElement('fragment', null, childVNode);
        }

        oldVNode = oldChildren[i];

        if (oldVNode == null ||  typeof oldVNode == 'boolean') {
            oldVNode = null;
        }

        if (!childVNode) {
            if (childVNode !== oldVNode) {
                diffRes[`${path}[${i}]`] = null;
            }
            continue;
        }

        // Morph the old element into the new one, but don't append it to the dom yet
        vnodeDiff(childVNode, oldVNode, newNode, oldNode, `${path}[${i}]`, diffRes);
    }

}



/** 需要跳过的属性名 */
const skipPropsKeys = ['naruseType', 'key', 'childNodes'];
/**
 * @description shallow props diff
 * @author CHC
 * @date 2022-10-11 15:10:52
 */
const vnodePropsDiff = (newVnode: any, oldVnode: any): Record<string, any> => {
    const res: Record<string, any> = {};

    if (!oldVnode) return res;

    // change
    for (let newPropKey in newVnode) {
        if (skipPropsKeys.includes(newPropKey)) continue;
        const newPropValue = newVnode[newPropKey];
        const oldPropValue = oldVnode[newPropKey];

        if (newPropValue !== oldPropValue) {
            if (newPropKey === 'style' 
                && isObj(newPropValue) 
                && isObj(oldPropValue)
                && isEmptyObj(vnodePropsDiff(newPropValue, oldPropValue))
                ) {
                continue;
            }
            res[newPropKey] = newPropValue;
        }
    }

    // remove
    for (let oldPropKey in oldVnode) {
        if (skipPropsKeys.includes(oldPropKey)) continue;
        if (!(oldPropKey in newVnode)) {
            res[oldPropKey] = undefined;
        }
    }

    return res;
}

const isCustomIdNode = (node: any) => !node._uid;