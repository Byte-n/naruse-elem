import { Hooks, NaruseComponent, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from './component';
import { globalEvent, EventBus, getDeferred, initVersionLogger } from 'naruse-share';
import { initNaruseAlipayApi } from '../api/index';
import { withPage } from '../api/HOC/index';
import { run } from 'naruse-parser';
import { createElement, Fragment } from './createElement';
import * as elementApi from './element';
import { createMiniFactory } from './hybrid/createMiniFactory';

const apis = initNaruseAlipayApi();
// @ts-ignore
const version = __VERSION__;
initVersionLogger('naruse-alipay', version);

// naruse模块内容
export const Naruse = {
    ...Hooks,
    Component: NaruseComponent,
    createElement,
    h: createElement,
    getDeferred,
    globalEvent,
    EventBus,
    env: {
        clientName: 'alipay',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'alipay',
    },
    version,
    // @ts-ignore
    ...my,
    ...apis,
    withPage,
    unsafe_run: run,
    $$debug: false,
    ...elementApi,
    createMiniFactory,
    Fragment,
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
};

export const naruseExtend = (opt: any) => {
    if (typeof opt === 'object') {
        Object.assign(Naruse, opt);
    }
}

// @ts-ignore
my.Naruse = Naruse;
