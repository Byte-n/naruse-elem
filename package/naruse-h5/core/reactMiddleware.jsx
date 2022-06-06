import React, { Component } from 'react';
import run from 'naruse-parser';
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
        const exports = run(props.code, { ...(props.env || {}), ...jsEngineEnv });
        if (!exports.default) {
            // 兼容老版组件
            const compatibleClass = function compatibleClass (...args) {
                const self = this;
                Component.apply(this, args);
                exports.constructor.call(this);

                Object.entries(exports).forEach(([key, value]) => {
                    if (key === 'constructor') return;
                    self[key] = typeof value === 'function' ? value.bind(self) : value;
                });
            };
            compatibleClass.prototype = Object.create(Component.prototype);
            Object.assign(compatibleClass.prototype, { constructor: compatibleClass });
            this.compilerComponent = compatibleClass;
        } else {
            this.compilerComponent = exports.default;
        }
    }
    render () {
        return <this.compilerComponent />;
    }
}
