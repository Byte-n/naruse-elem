import { Component } from 'react';
import run from '../../naruse-parser/index';
import { jsEngineEnv } from './jsEngineEnv';


/**
 * @description 中间件初始化，将组件从编译时转化为运行时
 * @author CHC
 * @date 2022-03-17 10:03:12
 * @param {Component} component
 */
const middlewareInit = (component, code) => {
    const compilerComponent = run(code, jsEngineEnv);
    // 将运行时组件返回对象所有的对象绑定到真实的react组件上
    Object.keys(compilerComponent).forEach(key => {
        const propriety = compilerComponent[key];
        component[key] = typeof propriety === 'function' ? propriety.bind(component) : propriety;
    });
    // 初始化组件
    compilerComponent.constructor && compilerComponent.constructor.call(component);
};


/**
 * @description 根据代码动态的加载组件，使用前请确定代码已经加载完毕
 * @author CHC
 * @date 2022-03-17 19:03:51
 * @export
 * @class ReactMiddleware
 * @extends {Component}
 */
export class ReactMiddleware extends Component {
    constructor () {
        super();
        middlewareInit(this, this.props.code);
    }
}

