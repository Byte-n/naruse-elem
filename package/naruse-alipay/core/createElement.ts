import { isNaruseComponent, functionalizae } from './component';
import { isBaseTypeComponent, VNode } from './diff';
import { currentRenderMiddawre } from './middware';

/**
 * 所有 node 类型
 */
export const enum VnodeType {
    Text = 'text',
    View = 'view',
    PureView = 'pv',
    PureText = 'pt',
    Input = 'input',
    Button = 'button',
    ScrollView = 'scroll-view',
    Textarea = 'textarea',
    Image = 'image',
    Video = 'video',
    Fragment = 'fragment',
    NaruseComponent = 'naruse-element',
    WebView = 'web-view',
}


let uid = 0;

/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */
const vnodeSpecialMap: Record<string, Function> = {
    text (props: any, childNodes: any []) {
        const tag = isPureProps(props) ? VnodeType.PureText : VnodeType.Text;
        const id = `_n_${uid++}`;
        return { naruseType: tag, content: childNodes.join(''), id, _uid: id };
    },
    view (props: any) {
        const tag = isPureProps(props) ? VnodeType.PureView : VnodeType.View;
        return { naruseType: tag };
    }
};

const purePropsKeyNames = ['style', 'className'];

/**
 * @description 判断节点的 props 是否只有 style 和 class，则切换为纯净节点，用于提高事件反应性能
 * @author CHC
 * @date 2023-02-28 16:02:46
 */
const isPureProps = (props) => {
    if (!props) return true;
    const keys = Object.keys(props);
    if (keys.length > 2) return false;
    for (const key of keys) {
        if (!purePropsKeyNames.includes(key)) return false;
    }
    return true;
}

/**
 * @description 模拟react的创建虚拟节点
 * @author CHC
 * @date 2022-02-23 15:02:03
 * @param {*} type 组件类型
 * @param {*} props 组件属性
 * @param {*} childNodes 子节点
 * @returns {*}
 */
export const createElement = function (type: any, props: any, ...childNodes: any): any {
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
const createClassElement = (type: any, props: any, childNodes: any) => {
    props = { ...props, children: childNodes };
    // 先不实例化对象，等待组件装载完成后再实例化
    const component = { actuator: type, props };
    return {
        naruseType: VnodeType.NaruseComponent, propHubKey: currentRenderMiddawre.current.saveProps(component),
        parentMiddwareId: currentRenderMiddawre.current.$$uid,
    };
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
const createBaseElement = (type: any, props: any, childNodes: any []): VNode => {
    let newNode: any = {};
    if (vnodeSpecialMap[type]) newNode = vnodeSpecialMap[type](props, childNodes);

    // perf: 优化 text 会重复遍历的问题
    if (!(type == VnodeType.PureText || type == VnodeType.Text)) {
        childNodes = (childNodes.flat && childNodes.flat(1)) || childNodes;
        childNodes = childNodes.map((child: any) => {
            if (isBaseTypeComponent(child)) return createTextElement(child);
            return child;
        });
        newNode.childNodes = childNodes;
    }

    const node = { naruseType: type, ...props, ...newNode };

    // 如果处理完毕没有 id 则自动补充上 id
    if (!node.id) {
        node.id = node._uid = `_n_${uid++}`;
    }

    return node;
};

/**
 * @description 创建一个函数式组件
 * @author CHC
 * @date 2022-03-15 12:03:45
 */
const createFuncElement = (type, props, childNodes) => {
    return createClassElement(functionalizae(type), props, childNodes);
};


export const Fragment = (props) => {
    const childNodes = props.children;
    delete props.children;
    return createBaseElement(VnodeType.Fragment, props, childNodes);
}

/**
 * @description 单独创建一个文本组件
 * @author CHC
 * @date 2023-02-28 17:02:15
 */
export const createTextElement = (content: any) => {
    return createBaseElement(VnodeType.Text, null, [ content ]);
}
