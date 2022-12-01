// naruse事件中心

import { logger } from './uitl';

/** 允许继续冒泡的事件 */
const allowPropagetionEventNames = [
    'onClick',
    'onLongClick',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'onTransitionEnd',
    'onAnimationStart',
    'onAnimationIteration',
    'onAnimationEnd',
];


/**
 * @description 获取节点的路径
 * @author CHC
 * @date 2022-02-23 09:02:32
 * @param {*} id
 * @param {*} vnode
 * @returns {*}
 */
export const getPathById = function (id: any, vnode: { id: any; childNodes: string | any[]; }) {
    const path: number[] = [];
    if (!vnode) return;
    if (vnode.id === id) return path;
    if (!vnode.childNodes || !vnode.childNodes.length) return;
    // 层次遍历
    for (let i = 0; i < vnode.childNodes.length; i++) {
        if (vnode.childNodes[i] && vnode.childNodes[i].id === id) {
            path.push(i);
            return path;
        }
    }
    for (let i = 0; i < vnode.childNodes.length; i++) {
        const childPath = getPathById(id, vnode.childNodes[i]);
        if (childPath) {
            path.push(i);
            for (let j = 0; j < childPath.length; j++) {
                path.push(childPath[j]);
            }
            return path;
        }
    }
};

/**
 * @description 获取节点
 * @author CHC
 * @date 2022-02-23 09:02:02
 * @param {*} id
 * @param {*} vnode
 * @returns {*}
 */
export const getVnodeById = function (id: any, vnode: any) {
    const path = getPathById(id, vnode);
    if (!path) return undefined;
    if (!path.length) return vnode;
    let node = vnode;
    path.forEach((index: string | number) => {
        node = node.childNodes[index];
    });
    return node;
};


/**
 * @description 初始化节点
 * @author CHC
 * @date 2022-02-23 09:02:49
 * @param {*} vnode
 * @param {*} environments
 * @param {*} parentId
 * @returns {*}
 */
export const initVnodeTree = function (vnode: any, parentId?: any) {
    const newNode = vnode;
    if (!vnode || typeof vnode !== 'object') return {};
    newNode.parentId = parentId;
    // 递归遍历
    if (Array.isArray(newNode.childNodes)) {
        newNode.childNodes.forEach((node: any) => initVnodeTree(node, newNode.id));
    }
    return newNode;
};

/**
 * @description 事件分发中心
 * @author CHC
 * @date 2022-03-15 14:03:55
 * @param {*} props
 */
const allEvents = function allEvents(props: any) {
    eventCenter(props, this.data.node);
};

/**
 * 小程序事件映射表
 */
const eventNameMap: Record<string, string> = {};

const methodsTags = [
    'tap',
    'longTap',
    'input',
    'blur',
    'focus',
    'load',
    'change',
    'confirm',
    'keyBoardHeightChange',
    'scroll',
    'scrollToUpper',
    'scrollToLower',
    'touchStart',
    'touchMove',
    'touchEnd',
    'touchCancel',
    'transitionEnd'
];


const methodTagTransformMap: Record<string, string> = {
    'tap': 'click',
    'longTap': 'longClick'
}

const transformFirstApha = (item: string) => 'on' + item.slice(0, 1).toLocaleUpperCase() + item.slice(1)

const methods: Record<string, any> = {};
methodsTags.forEach((item) => {
    const eventName = transformFirstApha(item);
    methods[eventName] = allEvents;
    eventNameMap[item] = transformFirstApha(methodTagTransformMap[item] || item);
})


/**
 * @description 事件处理中心
 * @author CHC
 * @date 2022-02-23 09:02:22
 * @param {*} event
 * @param {*} nodeTree
 * @returns {*}
 */
export const eventCenter = function (event: { target?: any; stopPropagation?: any; type?: any; naruseTarget?: any, narusePropagetion?: boolean }, nodeTree: any) {
    // 是否继续冒泡的标志
    let stopFlag = false;
    // 空事件不响应
    if (!(event && event.target && event.target.id)) return;
    // 空节点不响应
    const eventNode = getVnodeById(event.target.id, nodeTree);
    event.naruseTarget = eventNode;
    if (!eventNode) return;
    // 获取事件类型
    const { type } = event;
    const reflectedEventName = eventNameMap[type];
    // 不支持的事件
    if (!reflectedEventName) {
        logger.warn(`${type}事件不支持`);
    }
    // 冒泡事件便允许阻止冒泡
    if (allowPropagetionEventNames.includes(reflectedEventName)) {
        stopFlag = true;
        event.stopPropagation = () => {
            stopFlag = false;
        };
    }
    // 反射事件名称
    const responseFuc = eventNode[reflectedEventName];
    if (!(responseFuc && typeof responseFuc === 'function')) {
        // logger.debug(`元素${eventNode.naruseType}:没有绑定${reflectedEventName}事件`);
    } else {
        // logger.debug(`元素${eventNode.naruseType}:触发${reflectedEventName}事件`);
        responseFuc.call(eventNode, event);
    }
    // 没有截断就继续冒泡
    if (stopFlag) {
        // logger.debug(`元素${eventNode.naruseType}: 冒泡${reflectedEventName}事件`);
        eventCenter({ ...event, target: { id: eventNode.parentId }, narusePropagetion: true }, nodeTree);
    }
};

/**
 * @description 小程序组件事件绑定
 * @type {*}
 * */
export const miniappEventBehavior = {
    props: { component: {} },
    data: { node: {} },
    methods,
};
