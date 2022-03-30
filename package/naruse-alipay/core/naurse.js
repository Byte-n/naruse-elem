import { NaruseComponent } from './component';
import { globalEvent, EventBus } from '../../naruse-share/eventCenter';
// naruse模块内容
export const Naruse = {
    Component: NaruseComponent,
    globalEvent,
    EventBus,
    env: {
        clientName: 'alipay',
        clientVersion: '0.0.1',
        language: 'zh-Hans',
        platform: 'alipay',
    },
    ...my,
};
