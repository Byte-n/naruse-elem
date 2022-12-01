import * as Storage from '../api/storage/index';
import * as Route from '../api/route/index';
import * as Device from '../api/device/clipborad'
import * as System from '../api/system/index';
import { getDeferred, EventBus, globalEvent, initVersionLogger } from '../../../naruse-share'
import NaruseComponent from './component';
import { naruseCreateElement } from './createElement';
import { run } from 'naruse-parser';

// @ts-ignore
const version = __VERSION__;
initVersionLogger('naruse-weex', version);

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

const naruseExtend = (obj: any) => {
    Object.assign(Naruse, obj);
}

export { Naruse, naruseExtend };
export default Naruse;