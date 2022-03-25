import { naruseCreateElement } from '../components/index';
import { Component } from 'react';
import * as Storage from '../api/storage/index';
import * as Route from '../api/route/index';


const Naruse = {
    ...Storage,
    ...Route,
    Component,
    env: {
        USER_DATA_PATH: '',
        clientName: 'H5',
        clientVersion: '0.0.1',
        language: 'zh-Hans',
        platform: 'H5',
    },
    getSystemInfoSync: () => {
        return { platform: 'PC' };
    },
};


export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
    my: Naruse,
};

