import { NaruseComponent } from './component';
import { initVnodeTree } from './domEvents';
import { logger, NOOP } from './uitl';

/**
 * @description 两个props是否完全相同
 * @author CHC
 * @date 2022-03-21 18:03:59
 * @param {*} a
 * @param {*} b
 * @returns {*}
 */
export const propsEquals = (a: { [x: string]: any; }, b: { [x: string]: any; component?: {}; }) => {
    if (Object.is(a, b) && typeof a !== 'object') {
        return true;
    }

    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
};


/**
 * @description 承接小程序组件与NaruseComponent的桥梁，将小程序组件的生命周期映射到naruseComponent上，同时将naruseComponet的行为映射到小程序组件上
 * @author CHC
 * @date 2022-03-21 12:03:54
 * @class ReactMiddware
 * @note 因为是先创建的naruseComponent组件实例，后创建的中间件，所以采用后绑定
 */
export class Middware {
    naruseComponent: any;
    props: any;
    component: any;
    fristRender: boolean;
    updating: boolean;
    prevProps: any;
    constructor(miniappComponent: any, NaruseComponentActuator: any, props: {}) {
        this.props = props;
        this.component = miniappComponent;
        if (NaruseComponentActuator instanceof NaruseComponent) {
            this.naruseComponent = NaruseComponentActuator;
        } else {
            this.naruseComponent = new NaruseComponentActuator(props);
            this.naruseComponent.props = props;
        }
        this.naruseComponent.$updater = this;
        this.fristRender = true;
        this.updating = false;
    }

    /** 执行更新 */
    update(callback = NOOP) {
        const self = this;
        !this.updating && Promise.resolve().then(() => {
            this.updating = false;
            // fix: maybe has unmounted
            if (!this.naruseComponent) return;
            if (!this.naruseComponent.render) {
                logger.error('组件必须需要一个render函数');
                return;
            }
            const vnode = this.naruseComponent.render();
            const node = initVnodeTree(vnode);
            this.component.setData({ node }, () => {
                this.onUpdated.call(self);
                callback();
            });
        });
        this.updating = true;
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
    onUnMount() {
        this.naruseComponent && this.naruseComponent.componentWillUnmount();
        // 解绑对象
        this.component = null;
        this.naruseComponent = null;
    }
}
