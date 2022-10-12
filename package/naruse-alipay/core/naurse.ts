import { NaruseComponent } from './component';
import { globalEvent, EventBus, getDeferred, initVersionLogger } from '../../naruse-share/index';
import { initNaruseAlipayApi } from '../api/index';
import { withPage } from '../api/HOC/index';
import run from '../../naruse-parser/dev';
import { createElement } from './createElement';

const apis = initNaruseAlipayApi();

const version = __VERSION__;
initVersionLogger('naruse-alipay', version);

// naruse模块内容
export const Naruse = {
    Component: NaruseComponent,
    createElement,
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
    ...my,
    ...apis,
    withPage,
    unsafe_run: run,
};

export const naruseExtend = (opt: any) => {
    if (typeof opt === 'object') {
        Object.assign(Naruse, opt);
    }
}

my.Naruse = Naruse;