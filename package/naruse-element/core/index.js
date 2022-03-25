import { miniappEventBehavior } from './domEvents.js';
import run from '../../naruse-parser/index.js';
import { isEmpty, logger } from './uitl.js';
import { createElement } from './createElement.js';
import { NaruseComponent } from './component.js';
import { Middware } from './middware.js';
import { Naruse } from './naurse.js';


/**
 * @description 初始化子组件
 * @author CHC
 * @date 2022-03-21 16:03:28
 * @param {*} component
 */
const initChildComponent = function (args = {}) {
    const { actuator, props } = args;
    if (actuator) {
        this.$middware = new Middware(this, actuator, props || {});
        this.$middware.update();
    }
};

/**
 * @description 初始化naruse主组件
 * @author CHC
 * @date 2022-03-21 17:03:20
 * @returns {*}
 */
const initMainComponent = function () {
    if (this.props.code === this.code) return;
    this.code = this.props.code;
    const injectObject = this.$page.requireList || {};
    // 获取动态运行代码的对象
    let exports = {};
    try {
        exports = run(this.props.code, {
            h: createElement,
            Naruse,
            my,
            ...injectObject,
        });
    } catch (err) {
        logger.error('运行时出错，自动继续', err);
        // 运行出错自动继续
        injectObject.$adImport && injectObject.$adImport.callback && injectObject.$adImport.callback(true);
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
    this.$middware = new Middware(this, component, {});
    this.$middware.update();
};

/**
 * @description 初始化组件
 */
const createVmContext = function () {
    // 子组件
    if (!isEmpty(this.props.component)) {
        initChildComponent.call(this, this.props.component);
        return;
    }
    // 主组件
    initMainComponent.call(this);
};


/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */
const createBehavior = (option = {}) => {
    // 小程序组件默认minxs对象
    const naruseBehavior = {
        ...miniappEventBehavior,
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount () {
            this.option = option;
            try {
                createVmContext.call(this);
            } catch (error) {
                logger.error('初始化失败', error);
            }
        },
        /**
         * @description 组件更新后
         * @author CHC
         * @date 2022-03-16 10:03:21
         */
        didUpdate (prevProps) {
            // 只有子组件需要走更新进程
            if (!isEmpty(this.props.component)) {
                const { props } = prevProps.component;
                this.$middware.props = this.props.component.props;
                this.$middware.canUpdate(props);
            }
        },
        /**
         * @description 组件卸载后
         * @author CHC
         * @date 2022-03-16 10:03:36
         */
        didUnmount () {
            this.$middware.onUnMount();
        },
    };
    return naruseBehavior;
};

export { createBehavior };
