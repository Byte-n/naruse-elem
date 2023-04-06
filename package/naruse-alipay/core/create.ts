import { run } from 'naruse-parser';
import { getNaruseConfig } from './init';
import { logger } from './uitl';
import { createElement } from './createElement';
import { Naruse } from './naurse';
import { AdRunningContext, RunningCodeErrorSource } from 'naruse-share';
import { PluginApplyParams, pluginEvent, PluginMethod, PluginOnErrorParams } from '../../naruse-plugin';

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
export const getNaruseComponentFromProps = async (props: any) => {
    if (!props || typeof props !== 'object') {
        logger.error('无效参数，无法生成对应naruse组件');
        return;
    }
    const { hotPuller } = getNaruseConfig();
    try {
        const { code, ctx } = await hotPuller(props);
        return getNaruseComponentFromCode(code, ctx);
    } catch (e) {
        logger.error('加载远程代码资源失败', e);
    }
}



/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 * @param {*} code
 * @param {*} ctx
 * @returns {*}
 */
export const getNaruseComponentFromCode = async (code: string, ctx: AdRunningContext | {}) => {
    if (!code) return;
    const naruseConfig = getNaruseConfig();
    const {  baseCtx: _baseCtx, onRunError, hotImport } = naruseConfig;
    const baseCtx = <AdRunningContext>(typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx);

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
        // @ts-ignore
        my: typeof my === 'object' ? my : {},
        ...baseCtx,
        ...ctx,
        // 热加载导入
        $$import,
        $webpack,
    };

    // 运行时错误处理
    const onError = (source: RunningCodeErrorSource, error: Error) => {
        const params: PluginOnErrorParams = { config: naruseConfig, context, error, source };
        pluginEvent.emit(PluginMethod.onError, params);
        onRunError(error, source);
    }

    // 执行代码
    const executeCode = (code: string) => run(code, context, onError.bind(null, RunningCodeErrorSource.errorCenter));

    // 触发插件的生命周期 apply
    const params: PluginApplyParams = { config: naruseConfig, context };
    pluginEvent.emit(PluginMethod.apply, params);

    // 导出变量
    let exports: Record<string, any> = {};
    try {
        exports = executeCode(code);
    } catch (err) {
        logger.error('运行时出错，自动继续', err);
        onError(RunningCodeErrorSource.tryCatch, err);
        return;
    }
    let component = null;
    // 默认导出组件存在
    if (exports.default) {
        component = exports.default;
    } else {
        const NaruseComponent = Naruse.Component;
        // 兼容老版组件
        const compatibleClass = function compatibleClass (...args: any[]) {
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

