import { naruseCreateElement } from '../components/index';
import { getDeferred, globalEvent, EventBus } from '../../naruse-share/index';
import { Component } from 'react';
import api from '../api/index';

const version = '0.0.5'


const Naruse = {
    ...api,
    Component,
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
};

if (typeof window !== 'undefined') {
    window.Naruse = Naruse;
}


export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
    my: Naruse,
};

