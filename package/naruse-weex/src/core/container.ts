// 1. 样式继承的问题 ✅
// 2. z-index的问题 ✅
// 3. 必须写完整，如background:#000需要写成background-color:#000 ✅
// 4. 自动转换rpx ✅
// 5. 不支持view滚动
// 6. 事件冒泡 ✅
// 7. 不支持百分比

import { Component, RaxNode } from 'rax';
import { getNaruseConfig } from './init';
import { logger } from '../utils/log';
import { run } from 'naruse-parser';
import { Naruse } from './naruse';
import { emptyElement, naruseCreateElement } from './createElement';
import { AdRunningContext, RunningCodeErrorSource } from '../../../naruse-share';
import { PluginApplyParams, pluginEvent, PluginMethod, PluginOnErrorParams } from "../../../naruse-plugin";
// @ts-ignore
import RAP from 'rap-sdk';

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
export const getNaruseComponentFromProps = async (props: any) => {
    if (!props || typeof props !== 'object') {
        logger.error('无效参数，无法生成对应naruse组件');
        return { component: undefined, props: {} };
    }
    const { hotPuller } = getNaruseConfig();
    try {
        const { code, ctx, props: _props } = (await hotPuller(props)) || {};
        return {
            component: await getNaruseComponentFromCode(code, ctx as AdRunningContext),
            props: _props
        };
    } catch (e) {
        logger.error('加载远程代码资源失败', e);
    }
}

/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 */
export const getNaruseComponentFromCode = async (code: string, ctx: AdRunningContext) => {
    if (!code) return emptyElement;
    const naruseConfig = getNaruseConfig();
    const { baseCtx: _baseCtx, onRunError, hotImport } = naruseConfig;
    const baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx;

    // 用于隔离多个 webpack 打包的代码
    const $webpack = {};

    // 热加载导入
    const $$import = async (path) => {
        // @ts-ignore
        const code = await hotImport(path, context);
        return executeCode(code);
    };

    // 运行时上下文
    const context: AdRunningContext = {
        h: Naruse.createElement,
        Naruse,
        ...baseCtx,
        ...ctx,
        // 热加载导入
        $$import,
        $webpack,
        RAP,
        window,
    };

    // 运行时错误处理
    const onErrorHandler = (source: RunningCodeErrorSource, error: Error) => {
        const params: PluginOnErrorParams = { config: naruseConfig, context, error, source };
        pluginEvent.emit(PluginMethod.onError, params);
        onRunError(error, source);
    }

    // 触发插件的生命周期 apply
    const params: PluginApplyParams = { config: naruseConfig, context };
    pluginEvent.emit(PluginMethod.apply, params);
    // 执行代码
    const executeCode = (code: string) => run(code, context, onErrorHandler.bind(null, RunningCodeErrorSource.errorCenter));

    // 导出变量
    let exports: Record<string, any> = {};
    try {
        exports = executeCode(code);
    } catch (err) {
        logger.error('运行时出错，自动继续', err);
        onErrorHandler(RunningCodeErrorSource.tryCatch, err);
        return;
    }
    let component = null;
    // 默认导出组件存在
    if (exports.default) {
        component = exports.default;
    } else {
        const NaruseComponent = Naruse.Component;
        // 兼容老版组件
        const compatibleClass = function compatibleClass(...args: any[]) {
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
class Container extends Component<{}, { loaded: boolean }> {
    private Component: any;
    private componentProps: any;
    constructor(props) {
        super(props);
        this.state = { loaded: false };
        this.init(props);
    }

    async init(props) {
        const { component, props: _props } = await getNaruseComponentFromProps(props);
        this.Component = component;
        this.componentProps = _props;
        if (this.Component) {
            this.setState({ loaded: true });
        }
    }

    render(): RaxNode {
        return naruseCreateElement(this.state.loaded ? this.Component : emptyElement, this.componentProps);
    }
}


export { Container };
