import Rax, { Component, createElement } from "rax";
import { nexTick } from "src/utils";
import { infectionStyleChildren } from "./style";
import { isRootComponent } from './rootComponent';

let baseNaruseId = 0;
const getNewId = () => baseNaruseId++;

/** 现在正在渲染的Naruse组件队列栈 */
const nowRenderingComponentStack: BaseComponent[] = [];

/** 现在正在渲染的naruse组件 */
const getCurrentRenderingComponent = (): BaseComponent | undefined => nowRenderingComponentStack[nowRenderingComponentStack.length - 1];

/** 所有的fixed组件 */
const allFixedComponents: Record<number, BaseComponent> = {};


/** 排序并获取当前所有fixed组件 */
const getAllFixedComponents = () => {
    return Object.values(allFixedComponents)
        .map((component) => component._fixedComponents)
        .flat(1)
        // @ts-ignore
        .sort((a, b) => Number(a.props.style?.zIndex || 0) - Number(b.props.style?.zIndex || 0));
};

/** 基础组件 */
class BaseComponent extends Component<any, any> {
    /** 组件id */
    public _naruseId: number = getNewId();
 
    /** 当前组件的fixed组件列表 */
    public _fixedComponents: Rax.RaxChild[] = [];

    /** 是否已经绑定 */
    public _hasBinding?: boolean;

    /** 绑定前函数 */
    public _bindRender?: () => Rax.RaxNode;
}

let fixedComponentUpdater: () => void = () => {};
let hasNextTick = false;

/**
 * @description 更新fixed组件
 * @author CHC
 * @date 2022-07-14 12:07:43
 */
const updateFixedComponents = () => {
    if (fixedComponentUpdater && !hasNextTick) {
        hasNextTick = true;
        nexTick(() => {
            hasNextTick = false;
            fixedComponentUpdater();
        });
    }
}
/**
 * @description 拦截原有render函数，每当重新渲染时也重新渲染fixed组件
 * @author CHC
 * @date 2022-07-14 14:07:57
 * @param {BaseComponent} component
 */
const bindRender = (component: BaseComponent) => {
    if (component._hasBinding) return;
    component._bindRender = component.render;
    component._hasBinding = true;
    updateFixedComponents();

    component.render = (): Rax.RaxNode => {
        updateFixedComponents();
        return component._bindRender && component._bindRender();
    }
}


/**
 * @description fixed容器组件，在主组件完全创建完毕后渲染
 * @author CHC
 * @date 2022-07-13 21:07:47
 * @class FixedComponent
 * @extends {BaseComponent}
 */
class FixedComponent extends BaseComponent {
    constructor(props: any) {
        super(props);
        fixedComponentUpdater = () => this.setState({});
    }

    render(): Rax.RaxNode {
        return getAllFixedComponents();
    }
}

const FixedContainer = createElement(FixedComponent);

/**
 * @description 拦截下来的rax.Component
 * @author CHC
 * @date 2022-07-11 20:07:04
 * @class NaruseComponent
 * @extends {Component<any, any>}
 */
class NaruseComponent extends BaseComponent {

    /** 原有的render函数 */
    private __render;

    /** 原有的卸载函数 */
    private __componentWillUnmount;

    constructor(props: any) {
        super(props);
        this.__render = this.render.bind(this);
        this.render = this.__naruseRender.bind(this);
        this.__componentWillUnmount = this.componentWillMount;
    }

    componentWillUnmount () {
        this._fixedComponents.length = 0;
        typeof this.__componentWillUnmount === 'function' && this.__componentWillUnmount.call(this);
    }

    __naruseRender() {
        this._fixedComponents.length = 0;
        nowRenderingComponentStack.push(this);

        const { _infectedProps = {} } = this.props;
        const { style } = _infectedProps;
        const renderedRes = this.__render();
        const infectedRes = infectionStyleChildren(renderedRes, style);

        nowRenderingComponentStack.pop();

        // 如果当前组件含有fixed组件，那么把当前组件加入到fixed组件列表中
        if (this._fixedComponents.length) {
            allFixedComponents[this._naruseId] = this;
            bindRender(this);
        } else {
            allFixedComponents[this._naruseId] && delete allFixedComponents[this._naruseId];
        }

        // 顶层组件
        if (isRootComponent(this)) {
            return [
                infectedRes,
                FixedContainer,
            ];
        }

        return infectedRes;
    }
}

const isNaruseComponent = (component: any): boolean => component?.prototype instanceof NaruseComponent;

const isRaxComponent = (component: any): boolean => component?.prototype instanceof Component;


export {
    NaruseComponent,
    isNaruseComponent,
    isRaxComponent,
    nowRenderingComponentStack,
    getCurrentRenderingComponent,
    getNewId,
    allFixedComponents,
    BaseComponent,
    bindRender,
    updateFixedComponents,
};

export default NaruseComponent;