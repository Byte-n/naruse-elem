import { isEmptyObj, isFunc } from '../../naruse-share';
import { NaruseComponent } from './component';
import { VNode, vnodeDiff } from './diff';
import { initVnodeTree } from './domEvents';
import { logger, NOOP, propsEquals } from './uitl';




/**
 * @description 承接小程序组件与NaruseComponent的桥梁，将小程序组件的生命周期映射到naruseComponent上，同时将naruseComponet的行为映射到小程序组件上
 * @author CHC
 * @date 2022-03-21 12:03:54
 * @class ReactMiddware
 * @note 因为是先创建的naruseComponent组件实例，后创建的中间件，所以采用后绑定
 */
export class Middware {
    naruseComponent: NaruseComponent | null;
    props: any;
    component: any;
    fristRender: boolean = true;
    updating: boolean = false;
    callbackList: Function[] = [];
    prevProps: any;
    lastUpdateNode: VNode;
    /** diff修改队列 */
    diffQueue: Record<string, any> = {};
    constructor(miniappComponent: any, NaruseComponentActuator: typeof NaruseComponent | NaruseComponent, props: {}) {
        this.props = props;
        this.component = miniappComponent;
        if (NaruseComponentActuator instanceof NaruseComponent) {
            this.naruseComponent = NaruseComponentActuator;
        } else {
            this.naruseComponent = new NaruseComponentActuator(props);
            this.naruseComponent.props = props;
        }
        this.naruseComponent.$updater = this;
    }

    /** 执行更新 */
    update(callback = NOOP) {
        const self = this;
        this.callbackList.push(callback);
        !this.updating && Promise.resolve().then(() => {
            this.updating = false;
            // fix: maybe has unmounted
            if (!this.naruseComponent) {
                logger.error('you are updating a has unmounted component, please check you code');
                return;
            };
            if (!this.naruseComponent.render) {
                logger.error('the NaruseComponent must have a render function');
                return;
            }
            const vnode = this.naruseComponent.render();
            // console.time('diff 花费时间');
            initVnodeTree(vnode);
            const diff = vnodeDiff(vnode, this.fristRender ? null : this.component.data.node);
            const updatedCallBack = () => {
                // console.log('data', JSON.parse(JSON.stringify(this.component.data.node)));
                this.lastUpdateNode = vnode;
                this.onUpdated.call(self);
                this.executeUpdateList();
            };
            
            // console.timeEnd('diff 花费时间');

            // console.log('new data', JSON.parse(JSON.stringify(vnode)));
            // console.log('old data', JSON.parse(JSON.stringify(this.component.data.node)));
            // console.log('diff data', JSON.parse(JSON.stringify(diff)));

            // diff 存在结果才会重新渲染
            if (!isEmptyObj(diff)) {
                this.component.setData(diff, updatedCallBack);
            } else {
                updatedCallBack();
            }
        });
        this.updating = true;
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
    onUpdated() {
        if (!this.naruseComponent) return;
        const funcName = this.fristRender ? 'componentDidMount' : 'componentDidUpdate';
        this.naruseComponent[funcName] && this.naruseComponent[funcName]();
        if (this.fristRender) this.naruseComponent.$mounted = true;
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
            this.naruseComponent.$updater = null;
        }
        this.naruseComponent = null;
    }
}
