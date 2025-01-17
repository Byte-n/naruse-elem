import { globalEvent } from "../../../naruse-share/index";
import { getNaruseComponentFromCode } from "./container";
import { logger } from "../utils/log";


const bindedPages = {};

// 扩展能力，小程序环境内特殊的api


/**
 * @description 渲染某个组件到页面上
 * @author CHC
 * @date 2022-06-14 16:06:24
 * @param {*} page
 * @param {*} Component
 */
const renderComponentOnPage = (route, Component, props = {}) => {
    globalEvent.emit('naruse.renderComponentOnPage', route, Component, props);
};


/**
 * @description 绑定渲染中心到组件上，一个页面只允许绑定一个
 * @author CHC
 * @date 2022-06-14 15:06:16
 * @param {*} page
 * @param {*} Component
 */
const bindRenderEventOnComponent = (miniComponent) => {
    if (!miniComponent) return;
    const { route } =  miniComponent.$page;
    if (bindedPages[route]) {
        logger.error(`${route}-已经绑定了事件中心`);
        return;
    }
    bindedPages[route] = miniComponent;
    miniComponent._naruseEventCenter = globalEvent;
    globalEvent.on('naruse.renderComponentOnPage', (pageName, Component, props) => {
        if (pageName !== route) return;
        // 卸载已有组件
        miniComponent.$middware && miniComponent.$middware.onUnMount();
        // 重新加载组件
        miniComponent.$middware = new Middware(miniComponent, Component, { ...props });
        miniComponent.$middware.update();
    });
}

/**
 * @description 使用代码渲染组件在某个页面
 * @author CHC
 * @date 2022-06-14 16:06:46
 * @param {*} route
 * @param {*} code
 * @param {*} ctx
 */
const renderComponentOnPageWithCode = async (route, code, ctx, props) => {
    if (!route) return;
    const component =  await getNaruseComponentFromCode(code, ctx);
    renderComponentOnPage(route, component, props);
}


export {
    renderComponentOnPage,
    bindRenderEventOnComponent,
    renderComponentOnPageWithCode
}