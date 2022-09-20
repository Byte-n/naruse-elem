import React from "react"
import { EventBus } from '../../../naruse-share/index';
import { logger } from '../../utils/log';

const routeReg = /^#\/(\S+)\?/;

let pageScrollFn
let pageDOM = window

export function bindPageScroll (page, pageEl, distance = 50) {
  pageEl.removeEventListener('scroll', pageScrollFn)
  pageDOM = pageEl

  let isReachBottom = false

  pageScrollFn = function () {
    page.onPageScroll && page.onPageScroll({
      scrollTop: pageDOM instanceof Window ? window.scrollY : pageDOM.scrollTop
    })

    if (isReachBottom && getOffset() > distance) {
      isReachBottom = false
    }

    if (
      page.onReachBottom &&
      !isReachBottom &&
      getOffset() < distance
    ) {
      isReachBottom = true
      page.onReachBottom()
    }
  }

  pageDOM.addEventListener('scroll', pageScrollFn, false)
}

function getOffset () {
  if (pageDOM instanceof Window) {
    return document.documentElement.scrollHeight - window.scrollY - window.innerHeight
  } else {
    return pageDOM.scrollHeight - pageDOM.scrollTop - pageDOM.clientHeight
  }
}


const withPage = (Component) => {
    return class extends React.Component {
        render () {
            // return <Component {...this.props} currentPage={getPageInstant()} />
        }
    }
}




const pageCenter = {};

const ALLOW_EVENT = [
    'onPageScroll',
    'onReachBottom'
]

/**
 * @description Naruse内部的Page实例
 * @author CHC
 * @date 2022-05-04 18:05:45
 * @class Page
 */
export class Page {
    constructor() {
        // 事件中心
        this.eventCenter = new EventBus();
        this.hasBind = {};
    }
    
    interceptEvent (name) {
        switch (name) {
            case 'onPageScroll':
                break;
            default:
                break;
        }
    }

    onPageScroll(func) {
        window.addEventListener('scroll', func);
    }

    on(eventName, func) {
        if (!ALLOW_EVENT.includes(eventName)) {
            logger.error(`无效绑定事件名-${eventName}`);
            return;
        }
        // 使用时再绑定
        if (!this.hasBind[eventName]) {
            this.interceptEvent(eventName);
            this.hasBind[eventName] = true;
        }
        this.eventCenter.on(eventName, func);
    }

    off(eventName, func) {
        this.eventCenter.off(eventName, func);
    }

    get route() {
        // 默认为hash模式
        return window.location.hash.match(routeReg)[1];
    }

    clear() {
        this.eventCenter.clear();
    }
}