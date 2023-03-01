import { naruseCreateElement } from '../components/index';
import { getDeferred, globalEvent, EventBus, initVersionLogger } from '../../naruse-share/index';
import { run } from 'naruse-parser';
import { Component, cloneElement, isValidElement, Children } from 'react';
import api from '../api/index';
import withPage from "./withPage";

// @ts-ignore
const version = __VERSION__;

initVersionLogger('naruse-h5', version);

export const Naruse = {
    ...api,
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
    withPage,
    cloneElement,
    isValidElement,
    Children,
};

if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Naruse = Naruse;
}


export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
    my: Naruse,
};

