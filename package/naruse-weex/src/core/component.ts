import Rax, { Component, createElement } from "rax";
import { infectionStyleChildren } from "./style";

/** 基础组件 */
class BaseComponent extends Component<any, any> {
    /** 绑定前函数 */
    public _bindRender?: () => Rax.RaxNode;

    constructor (props: any) {
        super(props);
    }
}

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

    constructor(props: any) {
        super(props);
        this.__render = this.render.bind(this);
        this.render = this.__naruseRender.bind(this);
    }

    __naruseRender() {
        const { _infectedProps = {} } = this.props;
        const { style } = _infectedProps;
        const renderedRes = this.__render();
        return infectionStyleChildren(renderedRes, style);
    }
}

const isNaruseComponent = (component: any): boolean => component?.prototype instanceof NaruseComponent;

const isRaxComponent = (component: any): boolean => component?.prototype instanceof Component;


export {
    NaruseComponent,
    isNaruseComponent,
    isRaxComponent,
    BaseComponent,
};

export default NaruseComponent;
