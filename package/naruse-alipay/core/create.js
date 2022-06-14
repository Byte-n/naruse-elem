import { getNaruseConfig } from './init';
import { logger, NOOP } from './uitl';
import { run } from '../../naruse-parser/index';
import { createElement } from './createElement';
import { Naruse } from './naurse';


/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
export const getNaruseComponentFromProps = async (props) => {
    if (!props || typeof props !== 'object') {
        logger.error('无效参数，无法生成对应naruse组件');
    }; 
    const { hotPuller, baseCtx: _baseCtx } = getNaruseConfig();
    const { code, ctx } = await hotPuller(props);
    return getNaruseComponentFromCode(code, ctx);
}



/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 * @param {*} code
 * @param {*} ctx
 * @returns {*} 
 */
export const getNaruseComponentFromCode = async (code, ctx) => {
    const {  baseCtx: _baseCtx, onRunError } = getNaruseConfig();
    const baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx;
    // 导出变量
    let exports = {};
    try {
        exports = run(code, {
            h: createElement,
            Naruse,
            my: typeof my === 'object' ? my : {},
            ...baseCtx,
            ...ctx,
        });
    } catch (err) {
        logger.error('运行时出错，自动继续', err);
        onRunError(err);
        return;
    }
    let component = null;
    // 默认导出组件存在
    if (exports.default) {
        component = exports.default;
    } else {
        // 兼容老版组件
        const compatibleClass = function compatibleClass (...args) {
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

