import { initVnodeTree } from './domEvents';

/**
 * @description 两个props是否完全相同
 * @author CHC
 * @date 2022-03-21 18:03:59
 * @param {*} a
 * @param {*} b
 * @returns {*}
 */
const propsEquals = (a, b) => {
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
    constructor (miniappComponent, NaruseComponentActuator, props) {
        this.props = props;
        this.component = miniappComponent;
        this.naruseComponent = new NaruseComponentActuator(props);
        this.naruseComponent.$updater = this;
        this.fristRender = true;
        this.updating = false;
    }

    /** 执行更新 */
    update (callback) {
        !this.updating && Promise.resolve().then(() => {
            this.updating = false;
            const node = initVnodeTree(this.naruseComponent.render());
            this.component.setData({ node }, () => {
                this.onUpdated();
                callback();
            });
        });
        this.updating = true;
    }

    /** 更新后 */
    onUpdated () {
        const funcName = this.fristRender ? 'componentDidMount' : 'componentDidUpdate';
        this.naruseComponent[funcName] && this.naruseComponent[funcName]();
        if (this.fristRender) this.naruseComponent.$mounted = true;
        this.fristRender = false;
    }

    /** 父组件更新后是否需要更新子组件 */
    canUpdate (prevProps) {
        if (!propsEquals(prevProps, this.props)) {
            this.naruseComponent.props = this.props;
            this.update();
        }
    }

    /** 卸载时 */
    onUnMount () {
        this.naruseComponent.componentWillUnmount();
        // 解绑对象
        this.component = null;
        this.naruseComponent = null;
    }
}
