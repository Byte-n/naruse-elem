export { Naruse, naruseExtend } from './core/jsEngineEnv';
export { naruseInit } from './core/init'
export { Container as default, Container } from './core/container';
import { getNaruseConfig } from "./core/init";
import { Plugin, registerPlugin as _registerPlugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin } from '../naruse-plugin';

const registerPlugin = (name: string, plugin: typeof Plugin, ...params: any []) => {
    const config = getNaruseConfig();
    return _registerPlugin(name, plugin, { config }, ...params)
}
export {
    registerPlugin, Plugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin
}
