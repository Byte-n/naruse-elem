import * as $userInfoChanger from './userInfo';
import momemt from 'moment';
import * as $mappUtils from './mappUtils';
import * as $adSensorsBeacon from './adSensorsBeacon';
import * as $sensorsBeacon from './sensorsBeacon';
import * as $ayApi from './$ayApi';
import $env from './env';
import { advertUserDefine } from '../../naruse.config.esm';
const adData = {
    message: 'OK',
    open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
    results: [
        {
            creative_name: '测试创意',
            dest_url: '未知',
            pid: 5245,
            img_size: '600*720',
            secondary_class: '',
            creative_id: '43330',
            primary_class: '',
            user_define: {
                id: 'templateDefine',
                title: '自定义模板',
                body: advertUserDefine,
            },
            group_id: 66685610,
            img_path: 'http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png',
            creative_type: '4',
            pid_name: '测试pid',
            plan_id: 15967,
            rdomNum: 0,
            open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
        },
    ],
    return_num: '1',
    status: '200',
    total_num: 1,
    createTime: 1646813903418,
};

const _defineProperty = function e (t, r, n) {
    if (r in t) {
        Object.defineProperty(t, r, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true,
        });
    } else {
        t[r] = n;
    }
    return t;
};

export const ayRequireList = {
    $userInfoChanger,
    $moment: momemt,
    $mappUtils,
    $adSensorsBeacon,
    $sensorsBeacon,
    $openChat: {
        contactCustomerService () {
            console.log('contactCustomerService');
        },
    },
    $adImport: {
        adData,
        callback () {
            console.log('gogogo');
        },
    },
    $ayApi,
    $env,
    _defineProperty
};
