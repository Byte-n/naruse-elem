import './polyfill/flat'
import Naruse, { naruseExtend } from './core/naruse';
import { naruseInit } from './core/init';
import { Container } from './core/container';
import { getNaruseConfig } from "./core/init";
import { Plugin, registerPlugin as _registerPlugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin } from '../../naruse-plugin';

export {
    Naruse,
    naruseExtend,
    naruseInit,
    Container,
}

const registerPlugin = (name: string, plugin: typeof Plugin, ...params: any []) => {
    const config = getNaruseConfig();
    return _registerPlugin(name, plugin, { config }, ...params)
}
export {
    registerPlugin, Plugin, LoggerLevel, LoggerLanding, LoggerPlus, LoggerPlugin
}
