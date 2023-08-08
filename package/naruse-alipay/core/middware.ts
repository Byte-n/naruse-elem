import { isEmptyObj, isFunc } from '../../naruse-share';
import { functionalizae, NaruseComponent } from './component';
import { createElement, createTextElement, VnodeType } from './createElement';
import { isBaseTypeComponent, VNode, vnodeDiff } from './diff';
import { initVnodeTree } from './domEvents';
import { Naruse } from './naurse';
import { logger, NOOP, propsEquals } from './uitl';

let uid = 0;

/** 当前在渲染的 */
export const currentRenderMiddawre: { current?: Middware } = {
    current: null
}

/** 所有的 */
export const allMiddware: Record<string, Middware> = {};

export type MiddwareProps  = Partial<{ actuator: typeof NaruseComponent, props: any, propHubKey: string, parentMiddwareId: string }>;

/**
 * @description 承接小程序组件与NaruseComponent的桥梁，将小程序组件的生命周期映射到naruseComponent上，同时将naruseComponet的行为映射到小程序组件上
 * @author CHC
 * @date 2022-03-21 12:03:54
 * @class ReactMiddware
 * @note 因为是先创建的naruseComponent组件实例，后创建的中间件，所以采用后绑定
 */
export class Middware {

    /** 唯一id */
    $$uid = uid++;

    /** 绑定对应的 naruse 组件 */
    naruseComponent: NaruseComponent | null;

    /** props */
    props: any;

    /** 映射的小程序组件 */
    component: any;

    /** 是否是首次渲染 */
    fristRender: boolean = true;

    /** 是否正在更新的标志 */
    updating: boolean = false;

    /** 更新完毕的回调队列 */
    callbackList: Function[] = [];

    /** 上次的 props 参数 */
    prevProps: any;

    /** 最后一次更新的虚拟节点 */
    lastUpdateNode: VNode;

    /** 最后一次更新的时间 */
    lastUpdatedTime: number;

    /** 最近重新刷新的次数 */
    $updateCount: number = 0;

    /** diff修改队列 */
    diffQueue: Record<string, any> = {};

    /** 存储此 组件下的所有 class 组件的 props */
    hub = {};
    /** hub key 的自增id */
    incrId = 0;

    /** 保存 */
    saveProps = ({ actuator, props }:{ actuator: typeof NaruseComponent, props: any }) => {
        const id = this.incrId++;

        this.hub[id] = { actuator, props };

        return id;
    }

    /** 解析 */
    parseProps (params: MiddwareProps) {
        const { actuator, props = {}, propHubKey, parentMiddwareId = this.$$uid } = params || {};
        if (actuator) {
            return { actuator, props }
        }
        return allMiddware[parentMiddwareId].hub[propHubKey];
    }

    constructor(miniappComponent: any, params: MiddwareProps) {
        allMiddware[this.$$uid] = this;
        const { actuator: NaruseComponentActuator, props } = this.parseProps(params);
        this.props = props;
        this.component = miniappComponent;
        if (NaruseComponentActuator instanceof NaruseComponent) {
            this.naruseComponent = NaruseComponentActuator;
        // 通过静态属性判断是否是尚未实例化的 naruse 组件 || 通过原型链判断是否是继承自 NaruseComponent 的组件
        // @ts-ignore
        } else if (NaruseComponentActuator.$isNaruseClass || Object.getPrototypeOf(NaruseComponentActuator.prototype).constructor?.$isNaruseClass) {
            // @ts-ignore
            this.naruseComponent = new NaruseComponentActuator(props);
            this.naruseComponent.props = props;
        } else if (typeof NaruseComponentActuator === 'function') {
            const newClass = functionalizae(NaruseComponentActuator);
            this.naruseComponent = new newClass(props);
        }
        this.naruseComponent.updater = this;
    }

    /**
     * 判断是否已经挂载，React for 函数
     */
    isMounted = () => {
        return this.naruseComponent.$mounted;
    }

    /** React For 函数，帮助使用统一的 Hooks */
    enqueueForceUpdate = this.enqueueUpdate;

    /** 进入更新队列在下一个时刻准备更新 */
    enqueueUpdate(callback = NOOP, callbackMaybe = NOOP) {
        // @ts-ignore
        // polyfill react-like-hooks
        if (callback === this) {
            callback = callbackMaybe;
        }
        this.callbackList.push(callback);
        !this.updating && Promise.resolve().then(() => {
            this.updating = false;
            this.update();
        });
        this.updating = true;
    }

    /**
     * 直接更新，不进入队列
     */
    update() {
        this.checkExecessiveUpdate();
        // fix: maybe has unmounted
        if (!this.naruseComponent) {
            // @ts-ignore
            logger.error('you are updating a has unmounted component, please check you code');
            return;
        };
        if (!this.naruseComponent.render) {
            // @ts-ignore
            logger.error('the NaruseComponent must have a render function');
            return;
        }
        // 注入当前组件
        currentRenderMiddawre.current = this;
        const extrnalCurrentOwner = Naruse.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.NaruseCurrentOwner;
        extrnalCurrentOwner.current = this.naruseComponent;
        // 开始渲染
        let vnode: VNode = this.naruseComponent.render();
        // 取消注入
        extrnalCurrentOwner.current = null;
        currentRenderMiddawre.current = null;
        // 计时
        Naruse.$$debug && console.time(`组件 ${this.$$uid} diff 花费时间`);
        // 单文字节点需要包裹一层text节点
        if (isBaseTypeComponent(vnode)) vnode = createTextElement(vnode);
        // 初始化vnode
        initVnodeTree(vnode);
        const diff = vnodeDiff(vnode, this.fristRender ? null : this.component.data.node);
        Naruse.$$debug && console.log(`组件 ${this.$$uid}, diff结果`, diff);
        const updatedCallBack = () => {
            Naruse.$$debug && console.timeEnd(`组件 ${this.$$uid} setData 花费时间`);
            this.lastUpdateNode = vnode;
            this.onUpdated.call(self);
            this.executeUpdateList();
        };
        Naruse.$$debug && console.timeEnd(`组件 ${this.$$uid} diff 花费时间`);
        Naruse.$$debug && console.time(`组件 ${this.$$uid} setData 花费时间`);
        // diff 存在结果才会重新渲染
        if (!isEmptyObj(diff)) {
            this.component.setData(diff, updatedCallBack);
        } else {
            updatedCallBack();
        }
    }

    /**
     * 检查短时间内 (50ms内) 是否更新超过20次 有过多的更新，如果存在则报错
     */
    checkExecessiveUpdate() {
        const now = Date.now();
        if (now - this.lastUpdatedTime < 50) {
            this.$updateCount++;
        } else {
            this.$updateCount = 0;
        }
        this.lastUpdatedTime = now;
        if (this.$updateCount > 20) {
            throw new Error('too many re-renders. Naruse limits the number of renders to prevent an infinite loop.');
        }
    }

    /** 按序执行callbackList中的函数，非函数不执行 */
    executeUpdateList() {
        this.callbackList.forEach((item) => {
            if (isFunc(item)) {
                item();
            }
        });
        this.callbackList.length = 0;
    }

    /** 更新后 */
    onUpdated = () => {
        if (!this.naruseComponent) return;
        if (this.fristRender) this.naruseComponent.$mounted = true;
        const funcName = this.fristRender ? 'componentDidMount' : 'componentDidUpdate';
        this.naruseComponent[funcName] && this.naruseComponent[funcName]();
        this.fristRender = false;
    }

    /** 父组件更新后是否需要更新子组件 */
    canUpdate(prevProps: any) {
        const c = this.naruseComponent;
        const flag = this.shouldUpdate(this.props, c.state);
        if (flag && !propsEquals(prevProps, this.props)) {
            this.prevProps = prevProps;
            c.props = this.props;
            this.update();
        }
    }

    /** 是否应该刷新 */
    shouldUpdate(nextProps: any, nextState: any) {
        const c = this.naruseComponent;
        if (!c || typeof c.shouldComponentUpdate !== 'function') return true;
        const res = c.shouldComponentUpdate.call(c, nextProps, nextState);
        return res === undefined ? true : res;
    }

    /** 卸载时 */
    onUnMount(isMiniComponentUnmount: boolean = false) {
        this.naruseComponent && this.naruseComponent.componentWillUnmount();
        // 解绑对象
        // fix: 修复当naruse组件卸载时把小程序组件一起卸载导致后续渲染失败
        if (isMiniComponentUnmount) {
            this.component = null;
        }
        // fix: 修复naruseComponent为空的情况
        if (this.naruseComponent) {
            this.naruseComponent.updater = null;
        }
        this.naruseComponent = null;
        delete allMiddware[this.$$uid];
    }
}
