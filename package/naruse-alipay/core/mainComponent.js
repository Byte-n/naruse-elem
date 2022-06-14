import { miniappEventBehavior } from './domEvents.js';
import { logger } from './uitl.js';
import { Middware, propsEquals } from './middware.js';
import { getNaruseComponentFromProps } from './init.js';

/**
 * @description 初始化naruse主组件
 * @author CHC
 * @date 2022-03-21 17:03:20
 * @returns {*}
 */
const initMainComponent = function () {
    getNaruseComponentFromProps(this.props)
        .then((component) => { 
            this.$middware = new Middware(this, component, {});
            this.$middware.update();
        })
        .catch((err) => {
            console.error('初始化主组件失败', err);
        })
};



/**
 * @description 初始化组件
 */
const createVmContext = function () {
    try {
        // 主组件
        initMainComponent.call(this);
    } catch (error) {
        logger.error('初始化失败', error);
    }
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
        ...miniappEventBehavior,
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount() {
            this.option = option;
            createVmContext.call(this);
        },
        /**
         * @description 组件更新后
         * @author CHC
         * @date 2022-03-16 10:03:21
         */
        didUpdate(prevProps) {
            // 参数不同则重新创建元素
            if (!propsEquals(prevProps, this.props)) {
                // 卸载
                this.$middware && this.$middware.onUnMount();
                // 重新创建
                createVmContext.call(this);
            }
        },
        /**
         * @description 组件卸载后
         * @author CHC
         * @date 2022-03-16 10:03:36
         */
        didUnmount() {
            this.$middware && this.$middware.onUnMount();
        },
    };
    return naruseBehavior;
};

export { createMainBehavior };