import * as $userInfoChanger from './userInfo';
import momemt from 'moment';
import * as $mappUtils from './mappUtils';
import * as $adSensorsBeacon from './adSensorsBeacon';
import * as $sensorsBeacon from './sensorsBeacon';
import { advertUserDefine  } from '../../naruse.config';
const adData = {
    message: 'OK',
    open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
    results: [
        {
            creative_name: '测试创意-促销水印-功能点-Android-customAd',
            dest_url: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220222162004%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007951687%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v3&sign=AD247593B83EF4EA347728425E6B9C85&spm=a313p.266.ei5lud.1370863636957&short_name=Y4.77tvN&app=chrome',
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
            pid_name: 'FMB商品初级版-促销水印-单个水印点击',
            plan_id: 15967,
            rdomNum: 0,
            open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
        },
    ],
    return_num: '1',
    status: '200',
    total_num: 1,
    result: {
        creative_name: '测试创意-促销水印-功能点-Android-customAd',
        dest_url: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220222162004%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007951687%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v3&sign=AD247593B83EF4EA347728425E6B9C85&spm=a313p.266.ei5lud.1370863636957&short_name=Y4.77tvN&app=chrome',
        pid: 5207,
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
        pid_name: 'FMB商品初级版-促销水印-单个水印点击',
        plan_id: 15967,
        rdomNum: 0,
        open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
    },
    createTime: 1646813903418,
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
};
