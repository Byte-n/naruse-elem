import { createElement } from "./createElement";
import { run } from '../../naruse-parser/index'
import { Naruse } from "./naurse";
import { logger } from "./uitl";
import { NaruseComponent } from "./component";

const _config = {
    hotPuller: () => {
        logger.error('未初始化热更新拉取，无法更新组件默认为空');
        return Promise.resolve({ code: '', ctx: {} });
    },
    baseCtx: () => {
        return {};
    },
    onRunError: (err) => {
        console.error(err);
    },
};

/**
 * @description 获取初始化
 * @author CHC
 * @date 2022-06-14 10:06:50
 * @returns {{ _config: () => Promise<{ code, ctx }>  }} 
 */
const getNaruseConfig = () => {
    return _config;
}

/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 */
const naruseInit = ({ hotPuller, baseCtx, onRunError } = {}) => {
    if (hotPuller) _config.hotPuller = hotPuller;
    if (baseCtx) _config.baseCtx = baseCtx;
    if (onRunError) _config.onRunError = onRunError;
}

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
const getNaruseComponentFromProps = async (props) => {
    if (!props || typeof props !== 'object') {
        logger.error('无效参数，无法生成对应naruse组件');
    }; 
    const { hotPuller, baseCtx: _baseCtx, onRunError } = _config;
    const { code, ctx } = await hotPuller(props);
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

export { naruseInit, getNaruseConfig, getNaruseComponentFromProps }

