import { Component } from 'react';
import run from '../../naruse-parser/index';
import { jsEngineEnv } from './jsEngineEnv';


/**
 * @description 根据代码动态的加载组件，使用前请确定代码已经加载完毕
 * @author CHC
 * @date 2022-03-17 19:03:51
 * @export
 * @class ReactMiddleware
 * @extends {Component}
 */
export class ReactMiddleware extends Component {
    constructor (props) {
        super(props);
        const exports = run(props.code, jsEngineEnv);
        this.compilerComponent = exports.default;
    }
    render () {
        return <this.compilerComponent />;
    }
}

