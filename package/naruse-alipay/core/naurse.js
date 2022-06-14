import { NaruseComponent } from './component';
import { globalEvent, EventBus, version } from '../../naruse-share/index';
import { initNaruseAlipayApi } from '../api/index';
import { withPage } from '../api/HOC/index';
import { renderComponentOnPage } from '../expand/index';

const apis = initNaruseAlipayApi();


// naruse模块内容
export const Naruse = {
    Component: NaruseComponent,
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
    renderComponentOnPage,
};

export const naruseExtend = (opt) => {
    if (typeof opt === 'object') {
        Object.assign(Naruse, opt);
    }
}

my.Naruse = Naruse;