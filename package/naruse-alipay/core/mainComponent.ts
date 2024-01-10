import { getMiniappEventBehavior } from './domEvents.js';
import { logger, propsEquals } from './uitl.js';
import { allMiddware, Middware } from './middware.js';
import { globalEvent, isEmpty } from '../../naruse-share/index';
import { getNaruseComponentFromProps } from './create.js';
import { bindRenderEventOnComponent, uninstallMainComponentOnSomePage } from '../expand';
import { getPageInstance } from "./page";

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
            this.$middware = new Middware(this, { actuator: component, props: {} });
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
 */
const initSubComponent = function () {
    const { actuator } = allMiddware[this.props.parentMiddwareId].parseProps({ propHubKey: this.props.propHubKey });
    if (actuator) {
        this.$middware = new Middware(this, { propHubKey: this.props.propHubKey, parentMiddwareId: this.props.parentMiddwareId });
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
    (!this.isNaruseMainComponent ? initSubComponent : createMainVmContext).call(this);
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
        __NaruseUniqueComponentPageShowEvent: null,
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount() {
            this.isNaruseMainComponent = isEmpty(this.props.propHubKey);
            if (this.isNaruseMainComponent) {
                const { unique = false } = this.props || {};
                if (unique) {
                    // 绑定重新渲染事件
                    bindRenderEventOnComponent(this);
                    this.__NaruseUniqueComponentPageShowEvent = (event) => {
                        // 小程序对象Page.__proto__.route
                        const path = Object.getPrototypeOf(this.$page).route;
                        globalEvent.emit('__NaruseUniqueComponentPageShow', { path, event: event || 'onShow' });
                    }
                    getPageInstance(this).on('onShow', this.__NaruseUniqueComponentPageShowEvent);
                    this.__NaruseUniqueComponentPageShowEvent('didMount');
                }
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
            if (this.props.propHubKey) {
                // 从指定的 主组件下获取，
                const { props: propsOld, actuator: actuatorOld } = allMiddware[prevProps.parentMiddwareId].parseProps({ propHubKey: prevProps.propHubKey })
                const { props, actuator } = allMiddware[this.props.parentMiddwareId].parseProps({ propHubKey: this.props.propHubKey });
                // FIX: 修复了当切换装载器后不会卸载组件重新渲染
                // FIX: 修复了当key发生变化后组件不会重新渲染 0615
                if (actuator=== actuatorOld && props.key === propsOld.key) {
                    this.$middware.props = props;
                    this.$middware.canUpdate(propsOld);
                } else {
                    this.$middware.onUnMount();
                    // 更新 mainComponent。 $middware 会重建
                    initSubComponent.call(this);
                }
            }
        },
        /**
         * @description 组件卸载后
         * @author CHC
         * @date 2022-03-16 10:03:36
         */
        didUnmount() {
            this.isNaruseMainComponent && uninstallMainComponentOnSomePage(this);
            if (!this.$middware) return;
            this.$middware.onUnMount(true);
        },
    };
    return naruseBehavior;
};

export { createMainBehavior };
