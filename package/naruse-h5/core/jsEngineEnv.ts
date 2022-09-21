import { naruseCreateElement } from '../components/index';
import { getDeferred, globalEvent, EventBus } from '../../naruse-share/index';
import run from '../../naruse-parser/index';
import { Component } from 'react';
import api from '../api/index';

const version = '0.1.1'


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
};

if (typeof window !== 'undefined') {
    window.Naruse = Naruse;
}


export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
    my: Naruse,
};
