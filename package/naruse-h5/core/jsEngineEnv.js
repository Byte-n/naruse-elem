import { naruseCreateElement } from '../components/index';
import { Component } from 'react';
import * as Storage from '../api/storage/index';


const Naruse = { ...Storage, Component };


export const jsEngineEnv = {
    h: naruseCreateElement,
    Naruse,
};

