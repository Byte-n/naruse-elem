import { naruseCreateElement } from "../components";
import {Component} from "react";
import {parseURLParam} from "../utils";
import { EventBus } from '../../naruse-share/index';

export default function withPage (Comp) {
    return class WithPageComponent extends Component {
        render ( ) {
            const page = getCurrentPageInstance();
            const hashs = location.hash.split('?');
            const currentPage = {
                route: hashs[0],
                param: parseURLParam(hashs[1]),
                events: {
                    on: page.on.bind(page),
                    off: page.off.bind(page),
                    once: page.once.bind(page),
                },
            };
            return naruseCreateElement(Comp, { ...this.props, currentPage } )
        }
    }
}

const pages: Array<Page> = [];
// 获取当前页面的对象
function getCurrentPageInstance() {
    const hash = location.hash.substring(1);
    if (pages[hash]) {
        return pages[hash];
    }
    pages[hash] = new Page();
    return pages[hash];
}
// 页面可用生命周期函数
const PageEventKey = {onShow: 'onShow', onHide: 'onHide', onPageScroll: 'onPageScroll'};
const PageEventKeys = Object.keys(PageEventKey);
class Page {
    // @ts-ignore 事件中心
    private eventCenter = new EventBus();
    on (event: string, callback: Function) {
        if (PageEventKeys.indexOf(event) === -1){
            return;
        }
        if (typeof callback !== 'function') {
            return;
        }
        this.eventCenter.on(event, callback)
    }
    off (event: string, callback?: Function) {
        if (PageEventKeys.indexOf(event) === -1){
            return;
        }
        this.eventCenter.off(event, callback)
    }
    once (event: string, callback: Function) {
        if (PageEventKeys.indexOf(event) === -1){
            return;
        }
        if (typeof callback !== 'function') {
            return;
        }
        this.eventCenter.once(event, callback)
    }
    // 触发指定 事件
    call (eventName, e) {
        this.eventCenter.emit(eventName, e)
    }
}

/**
 * 兼容获取浏览器滚动条位置 ，
 */
const getScroll = () => {
    if (currentPageContainer === window || currentPageContainer === document.body || currentPageContainer === document.documentElement) {
        return {
            scrollTop: document.body.scrollTop || document.documentElement.scrollTop  || 0,
            scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft || 0
        }
    }
    return {
        scrollTop: (currentPageContainer as HTMLElement).scrollTop,
        scrollLeft: (currentPageContainer as HTMLElement).scrollLeft,
    }
}

/**
 * 监听地址栏的hash变化
 */
window.addEventListener('hashchange', function (event: HashChangeEvent) {
    let keys = Object.keys(pages);
    if (keys.length === 0) {
        return;
    }
    const { oldURL='', newURL='' } = event;
    // 隐藏
    const prePage = pages[oldURL.split('#')[1]];
    prePage && prePage.call(PageEventKey.onHide);
    // 显示
    const cur = pages[newURL.split('#')[1]];
    cur && cur.call(PageEventKey.onShow);
})
function onPageScrollEvent () {
    let keys = Object.keys(pages);
    if (keys.length === 0) {
        return;
    }
    const hash = location.hash.substring(1);
    pages[hash] && pages[hash].call(PageEventKey.onPageScroll, getScroll());
}
// 默认window
let currentPageContainer: Window | HTMLElement | null = null;
export function withPageInit ({ pageContainer = window }) {
    if (pageContainer && pageContainer !== currentPageContainer) {
        // 切换事件 对象
        currentPageContainer && currentPageContainer.removeEventListener('scroll', onPageScrollEvent);
        pageContainer.addEventListener('scroll', onPageScrollEvent);
        currentPageContainer = pageContainer;
    }
}
