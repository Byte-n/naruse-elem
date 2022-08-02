import * as Storage from '../api/storage/index';
import * as Route from '../api/route/index';
import * as Device from '../api/device/clipborad'
import * as System from '../api/system/index';

import { getDeferred, EventBus, globalEvent } from '../../../naruse-share'
import NaruseComponent from './component';
import { naruseCreateElement } from './createElement';
import run from '../../../naruse-parser';
const Naruse = {
    Component: NaruseComponent,
    createElement: naruseCreateElement,
    getDeferred,
    EventBus,
    unsafe_run: run,
    globalEvent,
    ...Storage,
    ...Route,
    ...Device,
    ...System,
};

export { Naruse };
export default Naruse;