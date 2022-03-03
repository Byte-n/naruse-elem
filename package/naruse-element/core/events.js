// 事件中心
/**
 * 支持继续冒泡的node类型
*/
const popupNodeType = ['text']

/**
 * @description 为元素生成随机id
 * @author CHC
 * @date 2022-02-23 09:02:25
 * @param {*} randomLength
 * @returns {*} 
 */
const randomId = (randomLength) => {
    let idStr = Date.now().toString(36)
    idStr += (Math.random()).toString(36).slice(2, randomLength)
    return idStr
}


/**
 * @description 获取节点的路径
 * @author CHC
 * @date 2022-02-23 09:02:32
 * @param {*} id
 * @param {*} vnode
 * @returns {*} 
 */
export const getPathById = function (id, vnode) {
    const path = [];
    if (vnode.id === id) return path;
    if (!vnode.childNodes || !vnode.childNodes.length) return;
    // 层次遍历
    for (let i = 0; i < vnode.childNodes.length; i++) {
        if (vnode.childNodes[i].id === id) {
            path.push(i);
            return path;
        };
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
}

/**
 * @description 获取节点
 * @author CHC
 * @date 2022-02-23 09:02:02
 * @param {*} id
 * @param {*} vnode
 * @returns {*} 
 */
export const getVnodeById = function (id, vnode) {
    const path = getPathById(id, vnode);
    if (!path) return undefined;
    if (!path.length) return vnode;
    let node = vnode;
    path.forEach(index => {
        node = node.childNodes[index];
    });
    return node;
}

/**
 * @description 初始化节点
 * @author CHC
 * @date 2022-02-23 09:02:49
 * @param {*} vnode
 * @param {*} environments
 * @param {*} parentId
 * @returns {*} 
 */
export const initVnodeTree = function (vnode, parentId) {
    const newNode = vnode;
    if (typeof vnode !== 'object') return vnode;
    // 没有id的挂上id
    if (!newNode.id) newNode.id = randomId(16);
    newNode.parentId = parentId;
    // 递归遍历
    if (Array.isArray(newNode.childNodes)) {
        newNode.childNodes.forEach((node) => initVnodeTree(node, newNode.id));
    }
    return newNode;
}

/**
 * 小程序事件映射表
 */
const eventNameMap = {
    tap: 'onClick',
    longPress: 'onLongClick',
    input: 'onChange',
    blur: 'onBlur',
    focus: 'onFocus',
}

/**
 * @description 事件分发中心
 * @author CHC
 * @date 2022-02-23 09:02:22
 * @param {*} event
 * @param {*} nodeTree
 * @returns {*} 
 */
export const eventCenter = function (event, nodeTree) {
    let stopPropagetion = false;
    event.stopPropagetion = () => {
        stopPropagetion = true;
    };
    // 空事件不响应
    if (!(event && event.target && event.target.id)) return;
    // 空节点不响应
    const eventNode = getVnodeById(event.target.id, nodeTree);
    if (!eventNode) return;
    // 获取事件类型
    const { type } = event;
    const reflectedEventName = eventNameMap[type];
    // 不支持的事件
    if (!reflectedEventName) {
        console.log('[naruse-element][warn]', `${reflectedEventName}事件不支持`);
    }
    // 反射事件名称
    const responseFuc = eventNode[reflectedEventName];
    if (!(responseFuc && typeof responseFuc === 'function')) {
        // console.log('[naruse-element][debugger]', `元素${eventNode.naruseType}:没有绑定${reflectedEventName}事件`);
    } else {
        console.log('[naruse-element][debugger]', `元素${eventNode.naruseType}:触发${reflectedEventName}事件`);
        responseFuc.call(eventNode, event);
    }
    // 没有截断就继续冒泡
    if (stopPropagetion) {
        console.log('[naruse-element][debugger]', `元素${eventNode.naruseType}: 冒泡${reflectedEventName}事件`);
        eventCenter({ ...event, target: { id: eventNode.parentId } }, nodeTree);
    }
}

function allEvents(props) { eventCenter(props, this.data.node) }
/** 
 * @description 小程序组件事件绑定
 * @type {*} 
 * */
export const miniappEventBehavior = {
    props: {
        code: 'exports.render = function () { return h("view", null, "你好") }',
    },
    data: {
        node: {},
    },
    methods: {
        onTap: allEvents,
        onLongPress: allEvents,
        onInputInput: allEvents,
        onInputBlur: allEvents,
        onInputFocus: allEvents,
    }
}