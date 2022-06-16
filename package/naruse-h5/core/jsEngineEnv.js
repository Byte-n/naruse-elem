import { naruseCreateElement } from '../components/index';
import { Component } from 'react';
import { version } from 'naruse-share';
import api from '../api/index';


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

