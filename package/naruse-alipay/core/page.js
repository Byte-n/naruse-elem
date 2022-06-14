// 放置页面相关的处理

import { EventBus } from '../../naruse-share/index';
import { logger } from './uitl';

const pageCenter = {};

/**
 * @description 获取naruse内部的页面对象
 * @author CHC
 * @date 2022-05-04 18:05:46
 * @param {Page} miniComponent
 */
export const getPageInstance = (miniComponent) => {
    if (!miniComponent) {
        logger.error('无效组件');
        return;
    }
    const id = miniComponent.$page && miniComponent.$page.$id;
    if (!id) {
        logger.error('无效页面id');
        return;
    }
    if (!pageCenter[id]) {
        pageCenter[id] = new Page(miniComponent.$page);
        return pageCenter[id];
    }
    return pageCenter[id];
};


/**
 * @description Naruse内部的Page实例
 * @author CHC
 * @date 2022-05-04 18:05:45
 * @class Page
 */
export class Page {
    constructor (miniPage) {
        // 小程序实例
        this.miniPage = miniPage;
        // 事件中心
        this.eventCenter = new EventBus();
        // 各个原有事件
        this.oldEvents = {};
        // 替换监听事件
        this.interceptEvent('onShow');
        this.interceptEvent('onHide');
        this.interceptEvent('onUnload');
        this.interceptEvent('onPullDownRefresh');
        this.interceptEvent('onPageScroll');
        // this.eventCenter.on('onUnload', () => setTimeout(() => this.clear()));
    }

    /**
     * @description 拦截小程序页面事件，将事件改造为事件中心机制
     * @author CHC
     * @date 2022-05-05 10:05:43
     * @param {*} key
     * @param {*} value
     */
    interceptEvent (key) {
        const selfPage = this;
        // 保存原有事件并进入事件中心
        selfPage.oldEvents[key] = selfPage.miniPage[key];
        const oldEvent = selfPage.miniPage[key];
        // 原有事件同样挂载到事件中心
        selfPage.eventCenter.on(key, (...args) => typeof oldEvent === 'function' && oldEvent.apply(this.miniPage, args));
        Object.defineProperty(this.miniPage, key, {
            get () {
                return () => selfPage.eventCenter.emit(key);
            },
            set () {
                logger.error('正在修改页面事件，请勿修改，请使用Naruse.Page.on()');
            },
            enumerable: true,
            configurable: true,
        });
    }

    on (eventName, func) {
        this.eventCenter.on(eventName, func);
    }

    off (eventName, func) {
        this.eventCenter.off(eventName, func);
    }

    get route () {
        return this.miniPage.route;
    }

    clear () {
        this.eventCenter.clear();
        // 替换回对应的事件
        Object.keys(this.oldEvents).forEach((key) => {
            this.miniPage[key] = this.oldEvents[key];
        });
        // 清除引用
        this.miniPage = null;
        this.oldEvents = {};
    }
}