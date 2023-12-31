import { isEmpty, isEmptyObj, isObj } from "../../naruse-share";
import { createElement } from "./createElement";
import { allMiddware } from './middware';

type DiffRes = Record<string, any>;

interface BaseVNode {
    naruseType: string;
    key?: string;
    childNodes?: VNode[];
    content?: string;
    _uid?: string;
    id?: string;
    parentId?: string;
    propHubKey?: string;
    parentMiddwareId?: string;
    [key: string]: any;
};


export type VNode = BaseVNode | null | undefined;

/**
 * @description 简单的o(n^2)diff操作，记录需要更新的node
 * @author CHC
 * @date 2022-10-11 14:10:32
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
    if (newVnode.naruseType === 'naruse-element' && newVnode.propHubKey) {
        const newComponent = allMiddware[newVnode.parentMiddwareId].parseProps({ propHubKey: newVnode.propHubKey });
        const oldComponent = allMiddware[oldVnode.parentMiddwareId].parseProps({ propHubKey: oldVnode.propHubKey });
        // 比较
        if (newComponent.actuator === oldComponent?.actuator) {
            // 仅仅 props 就行了。毕竟只有 actuator naruseType, props 了。
            const propsChanges = vnodePropsDiff(newComponent.props, oldComponent.props, true);
            // 如果又更新
            if (!isEmpty(propsChanges)) {
                res[`${path}.propHubKey`] = newVnode.propHubKey;
                res[`${path}.parentMiddwareId`] = newVnode.parentMiddwareId;
            }
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

        childVNode = cleanChildNode(childVNode);

        oldVNode = oldChildren[i];

        if (oldVNode == null || typeof oldVNode == 'boolean') {
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
const vnodePropsDiff = (newVnode: any, oldVnode: any, isNaruseComponent = false): Record<string, any> => {
    const res: Record<string, any> = {};
    // 两者必须都是 naruse 组件
    const isBothNaruseComponent = isNaruseComponent && oldVnode && oldVnode.naruseType === 'naruse-element';
    // fix: 修复 naruse 组件会忽略部分属性值的问题
    const realSkipPropsKeys = isBothNaruseComponent ? [] : skipPropsKeys;

    if (!oldVnode) return res;

    // change
    for (let newPropKey in newVnode) {
        if (realSkipPropsKeys.includes(newPropKey)) continue;
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
            // 是 NaruseComponent 的前提下都为空的情况下跳过 diff 子元素
            if (
                isBothNaruseComponent &&
                newPropKey === 'children'
                && newPropValue
                && !newPropValue.length
                && oldPropValue
                && !oldPropValue.length
            ) {
                continue;
            }
            res[newPropKey] = newPropValue;
        }
    }

    // remove
    for (let oldPropKey in oldVnode) {
        if (realSkipPropsKeys.includes(oldPropKey)) continue;
        if (!(oldPropKey in newVnode)) {
            res[oldPropKey] = undefined;
        }
    }

    return res;
}

const isCustomIdNode = (node: any) => !node._uid;

export const isBaseTypeComponent = (childVNode: any) => {
    return typeof childVNode == 'string' ||
        typeof childVNode == 'number' ||
        typeof childVNode == 'bigint'
}

export const cleanChildNode = (childVNode: any) => {
    if (childVNode == null || typeof childVNode == 'boolean') {
        childVNode = null;
    } else if (isBaseTypeComponent(childVNode)) {
        childVNode = createElement('text', null, childVNode);
    } else if (Array.isArray(childVNode)) {
        childVNode = createElement('fragment', null, childVNode);
    }
    return childVNode;
}
