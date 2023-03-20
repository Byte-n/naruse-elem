import { renderComponentOnPage, renderComponentOnPageWithCode } from "../expand/index";
import { createMiniFactory } from "./hybrid/createMiniFactory";
import { naruseInit } from "./init";
import { createMainBehavior } from "./mainComponent";
import { Naruse, naruseExtend } from "./naurse";
import { Plugin, registerPlugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin } from '../../naruse-share/index';

naruseExtend({
    renderComponentOnPage,
    createMainBehavior,
    naruseInit,
    naruseExtend,
    renderComponentOnPageWithCode,
    createMiniFactory,
    Naruse,
});

export default Naruse;
export {
    Naruse, createMainBehavior, naruseExtend, naruseInit, renderComponentOnPageWithCode,
    Plugin, registerPlugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin,
};
