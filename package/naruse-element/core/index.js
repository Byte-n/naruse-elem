import { events, fakeReactRuntime } from './fake-react.js'
import { miniappEventBehavior, initVnodeTree } from './events.js'
import run from '../../naruse-parser/index.js'

/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */
const vnodeSpecialMap = {
    text(props, childNodes) {
        return {
            content: childNodes ? childNodes[0] : '',
        }
    }
}

/**
 * @description 创建虚拟node
 * @author CHC
 * @date 2022-02-23 15:02:03
 * @param {*} type 组件类型
 * @param {*} props 组件属性
 * @param {*} childNodes 子节点
 * @returns {*} 
 */
const createVnode = (type, props, ...childNodes) => {
    let newNode = {};
    if (vnodeSpecialMap[type]) {
        newNode = vnodeSpecialMap[type](props, childNodes)
    }
    childNodes = childNodes.map(child => {
        if (typeof child === "string" || typeof child === "number") {
            return { naruseType: 'text', content: child };
        }
        return child;
    })
    const node = ({ naruseType: type, ...props, childNodes, ...newNode });
    return node;
}

// 小程序组件默认minxs对象
const naruseBehavior = {
    ...miniappEventBehavior,
    // 组件初始化时运行
    onInit() {
        console.log('[naruse-element] onInit 初始化');
        // 获取动态运行代码的对象
        const component = run(this.props.code, {
            h: createVnode,
        })
        // 创建虚拟react组件
        const reactRuntime = new fakeReactRuntime(component);
        // 初始化渲染
        const [node, cb] = reactRuntime._render();
        this.setData({
            node: initVnodeTree(node, null)
        }, (cb))
        // 监听setState然后重新渲染
        events.on('update', () => {
            console.log('[naruse-element] 重新渲染');
            const [node, cb] = reactRuntime._render();
            this.setData({
                node: initVnodeTree(node, null)
            }, (cb))
        })
    },
}

export {
    createVnode,
    naruseBehavior,
}