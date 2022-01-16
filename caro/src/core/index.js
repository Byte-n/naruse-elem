/**
 * 支持继续冒泡的node类型
 */
const popupNodeType = ['text']
/** 变量对应的正则字符串 */
const variableReg = /\{\{\s?(.*?)\s?\}\}/

const log = console.log;

const randomId = (randomLength) => {
  let idStr = Date.now().toString(36)
  idStr += (Math.random()).toString(36).slice(2, randomLength)
  return idStr
}

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

export const changeDomTreeById = function (id, props, vnode) {
  const node = getVnodeById(id, vnode);
  if (node) {
    log('caro-更新元素', JSON.parse(JSON.stringify(node)), JSON.parse(JSON.stringify(props)));
    // 创建新对象防止数据源被污染
    const newStyle = {};
    Object.assign(newStyle, node.style);
    Object.assign(newStyle, props.style);
    Object.assign(node, props);
    node.style = newStyle;
    node.id = id;
    // 重新挂载变量
    initVnodeTree(node);
  };
  return vnode;
}

/** 渲染动态字符串 */
const renderText = function (variableName, environments) {
  if (variableName && environments[variableName]) {
    return environments[variableName];
  }
  return variableName;
}


export const initVnodeTree = function (vnode, environments, parentId) {
  const newNode = vnode;
  // 没有id的挂上id
  if (!newNode.id) newNode.id = randomId(16);
  newNode.parentId = parentId;
  // 文本类型挂载环境变量
  if (newNode.isDynamicText) {
    newNode.childNodes = renderText(newNode.childNodes, environments);
  }
  // 递归遍历
  if (Array.isArray(newNode.childNodes)) {
    newNode.childNodes.forEach((node) => initVnodeTree(node, environments, newNode.id));
  }
  return newNode;
}

/**
 * 将所有小程序的点击事件集中处理，因为小程序内的冒泡流程处理较为麻烦，所以全部阻拦，手动进行冒泡。
 */
export const clickEventBus = function (event, nodeTree, otherEvents) {
  let item = nodeTree;
  if (!(event && event.target && event.target.id)) return nodeTree;
  const res = getVnodeById(event.target.id, item);
  if (!res) return nodeTree;

  // 触发事件
  const { onClick } = res;
  // 不存在事件则不需要更新
  if (!onClick) return item;
  onClick.forEach(element => {
    log(`caro-触发事件-${event.type === 'popup' ? '冒泡' : '原生'}-${element.type}-${element.targetId}`, element.props);
    switch (element.type) {
      case 'changeDom': {
        item = changeDomTreeById(element.targetId, element.props, item);
        break;
      }
      // 其他事件处理机制
      default: {
        otherEvents && Object.keys(otherEvents).forEach((eventType) => {
          if (eventType === element.type) {
            otherEvents[eventType](element.props);
          }
        })
      }
    }
  });

  // 事件冒泡
  if (popupNodeType.includes(res.type)) {
    clickEventBus({ target: { id: res.parentId }, type: 'popup' }, nodeTree);
  }

  return item;
}