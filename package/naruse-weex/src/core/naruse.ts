import * as Storage from '../api/storage/index';
import * as Route from '../api/route/index';
import * as Device from '../api/device/clipborad'
import * as System from '../api/system/index';
import * as UI from '../api/ui/interaction/index'
import { getDeferred, EventBus, globalEvent, initVersionLogger, temporarilyNotSupport } from '../../../naruse-share'
import NaruseComponent from './component';
import { naruseCreateElement } from './createElement';
import { run } from 'naruse-parser';
import * as elementApi from './element';
import { Hooks } from './hooks';

// @ts-ignore
const version = __VERSION__;
initVersionLogger('naruse-weex', version);

const Naruse = {
    ...Hooks,
    Component: NaruseComponent,
    createElement: naruseCreateElement,
    getDeferred,
    EventBus,
    unsafe_run: run,
    globalEvent,
    withPage: (Component: any) => Component,
    ...Storage,
    ...Route,
    ...Device,
    ...System,
    ...UI,
    getImageInfo: temporarilyNotSupport('getImageInfo'),
    createAnimation: temporarilyNotSupport('createAnimation'),
    ...elementApi,
};

const naruseExtend = (obj: any) => {
    Object.assign(Naruse, obj);
}

export { Naruse, naruseExtend };
export default Naruse;
