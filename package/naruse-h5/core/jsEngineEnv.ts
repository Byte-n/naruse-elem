import { naruseCreateElement } from '../components/index';
import { getDeferred, globalEvent, EventBus, initVersionLogger, AdRunningContext } from '../../naruse-share/index';
import { run } from 'naruse-parser';
import { Component, cloneElement, isValidElement, Children } from 'react';
import api from '../api/index';
import withPage from "./withPage";
import { getHooks } from './Component';
import { getNaruseComponentFromCode } from "./container";

// @ts-ignore
const version = __VERSION__;

initVersionLogger('naruse-h5', version);

const runCodeWithNaruse = (code: string, ctx: AdRunningContext) => getNaruseComponentFromCode(code, ctx);

export const Naruse = {
    ...api,
    ...getHooks(),
    Component,
    createElement: naruseCreateElement,
    env: {
        USER_DATA_PATH: '',
        clientName: 'H5',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'H5',
    },
    getDeferred,
    globalEvent,
    EventBus,
    version,
    unsafe_run: run,
    runCodeWithNaruse,
    withPage,
    cloneElement,
    isValidElement,
    Children,
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Naruse = Naruse;
}

export function naruseExtend (object) {
    if (typeof object !== 'object') {
        return false;
    }
    Object.assign(Naruse, object);
    return true;
}

export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
    my: Naruse,
};

