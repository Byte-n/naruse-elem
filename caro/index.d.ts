/** 可变虚拟node的属性 */
type writableVnodeProps = Omit<vnode, 'id'>;

/** 基础事件 */
interface baseEvent {
    type: string;
}

/** 改变其他dom事件 */
interface changeDomEvent extends baseEvent {
    type: 'changeDom';
    props: writableVnodeProps;
    target: string;
}
/** 联系旺旺事件 */
interface contactWW extends baseEvent {
    type: 'contactWW';
    target: string;
    content: string;
}
/** 跳转事件 */
interface gotoWebPage extends baseEvent {
    type: 'gotoWebPage';
    target: string;
}

/** 埋点信息 */
interface beacon extends baseEvent {
    type: 'sensorbeacon' | 'aybeacon';
    props: object;
}

/** 所有事件类型 */
type allEventTypes = gotoWebPage | contactWW | changeDomEvent;

interface vnode {
    id: string;
    type: "view" | "image" | "text";
    style: object;
    class: string;
    childrenNodes: Array<vnode>;
    onClick: Array<allEventTypes>;
}

/**
 * @description 通过id在vnode树内查找路径
 * @author CHC
 * @date 2022-01-03 15:01:10
 * @interface getPathById
 */
interface getPathById{
    (id: string, node: vnode): Array<number> | undefined;
}

/**
 * @description 通过id在vonode树中找到对应的vnode
 * @author CHC
 * @date 2022-01-03 15:01:24
 * @interface getVnodeById
 */
interface getVnodeById {
    (id: string, node: vnode): vnode | undefined;
}

/** 改变对应id的dom树，并生成一个新的dom树 */
interface changeDomTreeById {
    (path: string, props: writableVnodeProps, node: vnode): vnode;
}
/** 虚拟的事件总线 */
interface clickEventBus {
    (event, nodeTree: vnode): vnode;
}
/** 初始化虚拟dom树 */
interface initDomTree {
    (vnode: vnode): vnode;
}