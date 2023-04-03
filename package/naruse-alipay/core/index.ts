import { renderComponentOnPage, renderComponentOnPageWithCode } from "../expand";
import { createMiniFactory } from "./hybrid/createMiniFactory";
import { getNaruseConfig, naruseInit } from "./init";
import { createMainBehavior } from "./mainComponent";
import { Naruse, naruseExtend } from "./naurse";
import { Plugin, registerPlugin as _registerPlugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin } from '../../naruse-plugin';

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
    Plugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin,
};
export const registerPlugin = (name: string, plugin: typeof Plugin, ...params: any []) => {
    const config = getNaruseConfig();
    return _registerPlugin(name, plugin, { config }, ...params)
}
