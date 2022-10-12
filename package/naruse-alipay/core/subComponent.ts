import { miniappEventBehavior } from './domEvents.js';
import { logger } from './uitl.js';
import { isEmpty } from '../../naruse-share/index';
import { Middware } from './middware.js';


/**
 * @description 初始化子虚拟组件
 * @author CHC
 * @date 2022-03-21 16:03:28
 * @param {*} component
 */
const initSubComponent = function (args = {}) {
    const { actuator, props } = args;
    if (actuator) {
        this.$middware = new Middware(this, actuator, props || {});
        this.$middware.update();
    }
};

/**
 * @description 初始化组件
 */
const createVmContext = function () {
    // 子组件
    if (!isEmpty(this.props.component)) {
        initSubComponent.call(this, this.props.component);
        return;
    }
    logger.error('无效空naruse组件')
};


/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */
const createSubBehavior = () => {
    // 小程序组件默认minxs对象
    const naruseBehavior = {
        ...miniappEventBehavior,
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount() {
            try {
                createVmContext.call(this);
            } catch (error) {
                logger.error('子组件初始化失败', error);
            }
        },
        /**
         * @description 组件更新后
         * @author CHC
         * @date 2022-03-16 10:03:21
         */
        didUpdate(prevProps) {
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
            this.$middware.onUnMount(true);
        },
    };
    return naruseBehavior;
};

export { createSubBehavior };
