import * as $userInfoChanger from './userInfo'
import momemt from 'moment';
import * as $mappUtils from './mappUtils'
import * as $adSensorsBeacon from './adSensorsBeacon'
import * as $sensorsBeacon from './sensorsBeacon'
const adData = {
    "message": "OK",
    "open_id": "e000b529-879b-4bc2-8ab0-a33c829ee65d",
    "results": [
        {
            "creative_name": "测试创意-促销水印-功能点-Android-customAd",
            "dest_url": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220222162004%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007951687%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v3&sign=AD247593B83EF4EA347728425E6B9C85&spm=a313p.266.ei5lud.1370863636957&short_name=Y4.77tvN&app=chrome",
            "pid": 5245,
            "img_size": "600*720",
            "secondary_class": "",
            "creative_id": "43330",
            "primary_class": "",
            "user_define": {
                "id": "templateDefine",
                "title": "自定义模板",
                "body": {
                    ios_img: "http://q.aiyongtech.com/ad/images/aW9zMQ==_1646297193802.png",
                    android_img: "http://q.aiyongtech.com/ad/images/5a6J5Y2TMQ==_1646297217862.png",
                    img_url: "http://q.aiyongtech.com/ad/images/TUIy_1646300515608.png",
                    btn_name: "残忍拒绝",
                    img_size: '600*720',
                    service: '请购买[ios_url]',
                    ios_url_up: 'https://s.taobao.com/search?q=ios_url_up',
                    ios_url_down: 'https://s.taobao.com/search?q=ios_url_down',
                    android_url_up: 'https://s.taobao.com/search?q=android_url_up',
                    android_url: 'https://s.taobao.com/search?q=android_url_up',
                    android_url_down: 'https://s.taobao.com/search?q=android_url_down',
                    img:'http://q.aiyongtech.com/ad/images/TUIy_1646823381653.png',
                    ios_url:'https://s.taobao.com/search?q=ios_url_up',
                    "hotArrIos": "[{ \t\"type\": \"contact\", \t\"url\": \"https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301121145%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007974285%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=A560089AFCAFCEC1F44B350CE48405BE&spm=a313p.266.ei5lud.1372912035542&short_name=Y4.76dpb&app=chrome\", \t\"text\": \"开通享12享高级特权，一键提高搜索排名（支持7天无理由退）： \\n52元/季度：https://c.tb.cn/Y4.76dpb \\n138元/年：https://c.tb.cn/Y4.7Rg6S  【点击发送】\", \t\"packageName\": \"立即试用\" }]",
                    "imageSrcIos": "http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTI=_1646621808133.png",
                    "isOneBtn": "false",
                    "hotArrAndroid": "[{ \t\"type\": \"url\", \t\"url\": \"https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301121020%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975315%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=23B327D041E9F0F2470FC35A1466F261&spm=a313p.266.ei5lud.1369890893701&short_name=Y4.7j093&app=chrome\", \t\"packageName\": \"立即购买\",     \"amountPayable\": \"52\" }, { \t\"type\": \"url\", \t\"url\": \"https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301121020%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975315%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=BD28B5ADE3AC8644D56D7016F6708146&spm=a313p.266.ei5lud.1372912110436&short_name=Y4.7r7pe&app=chrome\", \t\"packageName\": \"立即购买\", \t\"amountPayable\": \"138\" }]",
                    "imageSrcAndroid": "http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png",
                    "vipflag": "0"
                }
            },
            "group_id": 66685610,
            "img_path": "http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png",
            "creative_type": "4",
            "pid_name": "FMB商品初级版-促销水印-单个水印点击",
            "plan_id": 15967,
            "rdomNum": 0,
            "open_id": "e000b529-879b-4bc2-8ab0-a33c829ee65d"
        }
    ],
    "return_num": "1",
    "status": "200",
    "total_num": 1,
    "result": {
        "creative_name": "测试创意-促销水印-功能点-Android-customAd",
        "dest_url": "https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220222162004%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007951687%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v3&sign=AD247593B83EF4EA347728425E6B9C85&spm=a313p.266.ei5lud.1370863636957&short_name=Y4.77tvN&app=chrome",
        "pid": 5207,
        "img_size": "600*720",
        "secondary_class": "",
        "creative_id": "43330",
        "primary_class": "",
        "user_define": {
            "id": "templateDefine",
            "title": "自定义模板",
            "body": {
                "hotArrIos": "[{ \t\"type\": \"contact\", \t\"url\": \"https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301121145%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007974285%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=A560089AFCAFCEC1F44B350CE48405BE&spm=a313p.266.ei5lud.1372912035542&short_name=Y4.76dpb&app=chrome\", \t\"text\": \"开通享12享高级特权，一键提高搜索排名（支持7天无理由退）： \\n52元/季度：https://c.tb.cn/Y4.76dpb \\n138元/年：https://c.tb.cn/Y4.7Rg6S  【点击发送】\", \t\"packageName\": \"立即试用\" }]",
                "imageSrcIos": "http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTI=_1646621808133.png",
                "isOneBtn": "false",
                "hotArrAndroid": "[{ \t\"type\": \"url\", \t\"url\": \"https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301121020%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975315%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=23B327D041E9F0F2470FC35A1466F261&spm=a313p.266.ei5lud.1369890893701&short_name=Y4.7j093&app=chrome\", \t\"packageName\": \"立即购买\",     \"amountPayable\": \"52\" }, { \t\"type\": \"url\", \t\"url\": \"https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220301121020%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007975315%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=BD28B5ADE3AC8644D56D7016F6708146&spm=a313p.266.ei5lud.1372912110436&short_name=Y4.7r7pe&app=chrome\", \t\"packageName\": \"立即购买\", \t\"amountPayable\": \"138\" }]",
                "imageSrcAndroid": "http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png",
                "vipflag": "0"
            }
        },
        "group_id": 66685610,
        "img_path": "http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png",
        "creative_type": "4",
        "pid_name": "FMB商品初级版-促销水印-单个水印点击",
        "plan_id": 15967,
        "rdomNum": 0,
        "open_id": "e000b529-879b-4bc2-8ab0-a33c829ee65d"
    },
    "createTime": 1646813903418
}

export const ayRequireList = {
    $userInfoChanger,
    $moment: momemt,
    $mappUtils,
    $adSensorsBeacon,
    $sensorsBeacon,
    $openChat:{contactCustomerService:function () {
        console.log('contactCustomerService')
    }},
    $adImport: {
        adData,
        callback() {
            console.log('gogogo');
        }
    },
};