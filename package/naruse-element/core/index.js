import { events, FakeReactRuntime } from './fake-react.js';
import { miniappEventBehavior, initVnodeTree } from './events.js';
import run from '../../naruse-parser/index.js';
import { _classCallCheck, _createClass, _defineProperties } from './uitl.js';

/**
 * 一些引擎不支持的方法
 */
const profill = {
    _classCallCheck,
    _defineProperties,
    _createClass,
};

/**
 * @description 创建一个函数式组件
 * @author CHC
 * @date 2022-03-15 12:03:45
 */
const funcNode = (type, props, childNodes) => {
    return type({ ...props, children: childNodes });
};


/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */
const vnodeSpecialMap = {
    text(props, childNodes) {
        return { content: childNodes ? childNodes[0] : '' };
    },
};

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
    if (typeof type === 'function') {
        return funcNode(type, props, childNodes);
    }
    if (vnodeSpecialMap[type]) {
        newNode = vnodeSpecialMap[type](props, childNodes);
    }
    childNodes = childNodes.flat && childNodes.flat(1) || childNodes;
    childNodes = childNodes.map(child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return { naruseType: 'text', content: child };
        }
        return child;
    });
    const node = ({ naruseType: type, ...props, childNodes, ...newNode });
    return node;
};

const $createReg = (reg) => new RegExp(reg);

let naruseComponentId = 1;

/**
 * @description 执行虚拟环境
 */
const createVmContext = function (prevProps, prevData) {
    if (this.props.code === this.code) return;
    console.log('[naruse-element] didUpdate 更新');
    this.code = this.props.code;
    const injectObject = this.$page.requireList || {};
    // 获取动态运行代码的对象
    const component = run(this.props.code, {
        ...profill,
        h: createVnode,
        require,
        my,
        getApp,
        $createReg,
        ...injectObject,
    });
    // 更新id
    this.naruseComponentId = naruseComponentId++;
    // 创建虚拟react组件
    const reactRuntime = new FakeReactRuntime(component, this.naruseComponentId);
    // 初始化渲染
    const [node, cb] = reactRuntime._render();
    this.setData({ node: initVnodeTree(node, null) }, () => {
        cb();
    });
    this.reRenderCallBack = () => {
        console.log('[naruse-element] 重新渲染');
        const [node, cb] = reactRuntime._render();
        this.setData({ node: initVnodeTree(node, null) }, (cb));
    };
    // 监听setState然后重新渲染
    events.on(`update-${this.naruseComponentId}`, this.reRenderCallBack);
};

/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */
const createBehavior = () => {
    // 小程序组件默认minxs对象
    const naruseBehavior = {
        ...miniappEventBehavior,
        didMount() {
            console.log('[naruse-element] didMount 装载');
            if (this.props.code) {
                try {
                    createVmContext.call(this);
                } catch (error) {
                    console.error('[naruse-element] 初始化失败', error);
                }
            }
        },
        // 组件初始化时运行
        didUpdate() {
            try {
                createVmContext.call(this);
            } catch (error) {
                console.error('[naruse-element] 更新失败', error);
            }
        },
        didUnmount() {
            console.log('[naruse-element] didUnmount 卸载');
            events.off(`update-${this.naruseComponentId}`, this.reRenderCallBack);
        },
    };
    return naruseBehavior;
};

export { createBehavior };
