import { naruseCreateElement } from "../components";
import {Component} from "react";
import {parseURLParam} from "../utils";

export default function withPage (Comp) {
    return class A extends Component {
        render ( ) {
            const page = getCurrentPageInstance();
            const hashs = location.hash.split('?');
            const currentPage = {
                route: hashs[0],
                param: parseURLParam(hashs[1]),
                events: {},
            };
            let cp = naruseCreateElement(Comp, { ...this.props, currentPage } );
            currentPage.events = {
                on: page.on.bind(page, cp.id),
                off: page.off.bind(page, cp.id),
                once: page.once.bind(page, cp.id),
            }
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
    // 此页面的所有函数
    events: Record<string, Record<string, Function>> = {  }
    on (id: string, event: string, callback: Function) {
        if (PageEventKeys.indexOf(event) === -1){
            return false;
        }
        if (typeof callback !== 'function') {
            return false;
        }
        if (!this.events[event]) {
            this.events[event] = {};
        }
        this.events[event][id] = callback;
        return true;
    }
    off (id: string, event: string) {
        if (PageEventKeys.indexOf(event) === -1){
            return false;
        }
        delete this.events[event][id]
        return true;
    }
    once (id: string, event: string, callback: Function) {
        if (typeof callback !== 'function') {
            return false;
        }
        const func = (...args) => {
            callback(...args);
            this.off(id, event);
        };
        return this.on(id,  event, func);
    }
    // 触发指定 事件
    call (eventName, e) {
        const event = this.events[eventName];
        const keys = Object.keys(event);
        if (keys.length === 0) {
            return;
        }
        keys.forEach(k => event[k](e))
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
let currentPageContainer: Window | HTMLElement = window;
currentPageContainer.addEventListener('scroll', onPageScrollEvent);
export function withPageInit ({ pageContainer = window }) {
    if (pageContainer && pageContainer !== currentPageContainer) {
        // 切换事件 对象
        currentPageContainer.removeEventListener('scroll', onPageScrollEvent);
        pageContainer.addEventListener('scroll', onPageScrollEvent);
        currentPageContainer = pageContainer;
    }
}
