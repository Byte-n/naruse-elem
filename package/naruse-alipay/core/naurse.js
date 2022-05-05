import { NaruseComponent } from './component';
import { globalEvent, EventBus } from '../../naruse-share/eventCenter';
import { initNaruseAlipayApi } from '../api/index';
import { version } from '../../naruse-share/index';
import { withPage } from '../api/HOC/index';

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
};

my.Naruse = Naruse;