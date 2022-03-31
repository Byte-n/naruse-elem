import * as system from './system/index';
import * as storage from './storage/index';
import * as route from './route/index';
import device from './device/index';

const api = {
    ...system,
    ...storage,
    ...route,
    ...device,
};

export default api;
