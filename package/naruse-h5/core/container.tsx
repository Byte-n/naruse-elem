import { Component } from 'react';
import { run } from 'naruse-parser';
import { Naruse } from './jsEngineEnv';
import { getNaruseConfig } from './init';
import { logger } from '../utils/log';

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
export const getNaruseComponentFromProps = async (props) => {
    if (!props || typeof props !== 'object') {
        logger.error('无效参数，无法生成对应naruse组件');
        return;
    }
    const { hotPuller } = getNaruseConfig();
    try {
        const { code, ctx } = await hotPuller!(props);
        return getNaruseComponentFromCode(code, ctx);
    } catch (e) {
        logger.error('加载远程代码资源失败', e);
    }
}

/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 */
export const getNaruseComponentFromCode = async (code, ctx) => {
    if (!code) return null;
    const { baseCtx: _baseCtx, onRunError, hotImport } = getNaruseConfig();
    const baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx;

    // 主动注入一个全局变量供 webpack 挂载，防止多个不同环境的代码混合
    // 每次加载新的组件都需要创建一个用于隔离环境
    // 详细可以见 naruse-webpack-runner
    const $webpack = {};
    const $$import = async (path) => {
        // @ts-ignore
        const code = await hotImport(path, context);
        return executeCode(code);
    };
    const context = {
        h: Naruse.createElement,
        Naruse,
        ...baseCtx,
        ...ctx,
        // 热加载导入
        $$import,
        $webpack,
    };
    const executeCode = (code) => run(code, context);
    // 导出变量
    let exports: any = {};
    try {
        exports = executeCode(code);
    } catch (err) {
        logger.error('运行时出错，自动继续', err);
        onRunError!(err);
        return;
    }
    let component: any = null;
    // 默认导出组件存在
    if (exports.default) {
        component = exports.default;
    } else {
        const NaruseComponent = Naruse.Component;
        // 兼容老版组件
        const compatibleClass = function compatibleClass(...args) {
            const self = this;
            NaruseComponent.apply(this, args);
            exports.constructor && exports.constructor.call(this);

            Object.entries(exports).forEach(([key, value]) => {
                if (key === 'constructor') return;
                self[key] = typeof value === 'function' ? value.bind(self) : value;
            });
        };
        compatibleClass.prototype = Object.create(NaruseComponent.prototype);
        Object.assign(compatibleClass.prototype, { constructor: compatibleClass });
        component = compatibleClass;
    }
    return component;
}


/**
 * @description 热更新容器组件
 * @author CHC
 * @date 2022-07-19 18:07:44
 * @class Container
 * @extends {Component<{}, {loaded: boolean}>}
 */
class Container extends Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
        this.init(props);
    }

    Component: any;

    async init(props) {
        this.Component = await getNaruseComponentFromProps(props);
        if (this.Component) {
            this.setState({ loaded: true });
        }
    }

    render() {
        // @ts-ignore
        return this.state.loaded ? Naruse.createElement(this.Component) : null;
    }
}

export default Container;
export { Container };
