import * as system from './system/index';
import * as storage from './storage/index';
import * as route from './route/index';
import device from './device/index';
import * as media from './media/index';
import * as wxml from './wxml/index';
import * as animation from './ui/animation/index';
import * as uiInteraction from './ui/interaction/index';

const api = {
    ...system,
    ...storage,
    ...route,
    ...device,
    ...media,
    ...wxml,
    ...animation,
    ...uiInteraction,
};

export default api;
