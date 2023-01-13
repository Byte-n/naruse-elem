import { getMiniappEventBehavior } from './domEvents.js';
import { logger, propsEquals } from './uitl.js';
import { Middware } from './middware.js';
import { isEmpty } from '../../naruse-share/index';
import { getNaruseComponentFromProps } from './create.js';
import { bindRenderEventOnComponent, uninstallMainComponentOnSomePage } from '../expand/index.js';

/**
 * @description 初始化naruse主组件
 * @author CHC
 * @date 2022-03-21 17:03:20
 * @returns {*}
 */
const initMainComponent = function () {
    getNaruseComponentFromProps(this.props)
        .then((component) => {
            if (!component) {
                logger.warn('无远程资源，不加载组件')
                return;
            }
            this.$middware = new Middware(this, component, {});
            this.$middware.update();
        })
        .catch((err) => {
            logger.error('初始化主组件失败', err);
        })
};

/**
 * @description 初始化子虚拟组件
 * @author CHC
 * @date 2022-03-21 16:03:28
 * @param {*} component
 */
const initSubComponent = function (args: Record<string, any> = {}) {
    const { actuator, props } = args;
    if (actuator) {
        this.$middware = new Middware(this, actuator, props || {});
        this.$middware.update();
    }
};

/**
 * @description 初始化主组件
 */
const createMainVmContext = function () {
    try {
        // 主组件
        initMainComponent.call(this);
    } catch (error) {
        logger.error('初始化失败', error);
    }
};


/**
 * @description 初始化组件
 */
const createVmContext = function () {
    (!this.isNaruseMainComponent ? initSubComponent : createMainVmContext).call(this, this.props.component);
};

/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */
const createMainBehavior = (option = {}) => {
    // 小程序组件默认minxs对象
    const naruseBehavior = {
        ...getMiniappEventBehavior(),
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount() {
            this.isNaruseMainComponent = isEmpty(this.props.component);
            if (this.isNaruseMainComponent) {
                const { unique = false } = this.props || {};
                // 绑定重新渲染事件
                if (unique) bindRenderEventOnComponent(this);
            }
            this.option = option;
            createVmContext.call(this);
        },
        /**
         * @description 组件更新后
         * @author CHC
         * @date 2022-03-16 10:03:21
         */
        didUpdate(prevProps) {
            // 主组件更新逻辑
            if (this.isNaruseMainComponent) {
                // 参数不同则重新创建元素
                if (!propsEquals(prevProps, this.props)) {
                    // 卸载
                    this.$middware && this.$middware.onUnMount();
                    // 重新创建
                    createVmContext.call(this);
                }
                return;
            }
            // 子组件更新逻辑
            if (!isEmpty(this.props.component)) {
                const { props, actuator } = prevProps.component;
                // FIX: 修复了当切换装载器后不会卸载组件重新渲染
                // FIX: 修复了当key发生变化后组件不会重新渲染 0615
                if (actuator === this.props.component.actuator && props.key === this.props.component.props.key) {
                    this.$middware.props = this.props.component.props;
                    this.$middware.canUpdate(props);
                } else {
                    this.$middware.onUnMount();
                    initSubComponent.call(this, this.props.component);
                }
            }
        },
        /**
         * @description 组件卸载后
         * @author CHC
         * @date 2022-03-16 10:03:36
         */
        didUnmount() {
            if (!this.$middware) return;
            this.isNaruseMainComponent && uninstallMainComponentOnSomePage(this);
            this.$middware.onUnMount(true);
        },
    };
    return naruseBehavior;
};

export { createMainBehavior };
