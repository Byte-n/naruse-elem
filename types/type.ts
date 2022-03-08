// 这是为了方便开发添加的全局类型声明
import * as userInfoChanger from '../package/naurse-app-profill/userInfo'
import moment from 'moment';
/**
* 伪react组件
*/
declare class NaruseComponent {
    state: {
        [key in string]: any;
    };
    /** 更改状态 */
    setState: (newState: Object) => {};
    /**
     * 当组件被挂载时被调用
     */
    componentDidMount: () => {};
    /**
     * 当组件每次重新渲染完毕后调用
     */
    componentDidUpdate: () => {};
    /**
     * 渲染函数
     */
    render: () => any;
}

/**
* 自定义广告的引入组件
*/
declare interface $adImport {
    /** 广告内容 */
    adData: {
        message: "OK" | "offline",
        open_id: string,
        results: [
            {
                creative_name: string,
                dest_url: string,
                pid: number,
                img_size: string,
                secondary_class: string,
                creative_id: string,
                primary_class: string,
                user_define: {
                    id: "templateDefine",
                    title: "自定义模板",
                    body: {
                        /** 加载的代码 */
                        code: string;
                        [key: string]: string;
                    }
                },
                group_id: number,
                img_path: string,
                creative_type: string,
                pid_name: string,
                plan_id: number,
                rdomNum: 0,
            }
        ],
        return_num: "1" | "0",
        status: "200" | "500",
        total_num: 1 | 0,
        createTime: number
    },
    /** 此方法只会在调取showCustomAdDecorator时才会传入 */
    callback: (parma: boolean) => void;
}


interface MappUtils {

}

interface openChat {

}

interface userInfoChanger {

}

interface env {

}


interface beacon {

}

interface sensorsBeacon {

}

interface adAction {

}

interface adUtils {

}
interface adFeedback {

}
/** 交易公共模块 */
interface tradePublicUtils {

}


/** api请求 */
interface api {

}

/** 用户信息 */
interface userInfo {

}


declare global {
    var $mappUtils: MappUtils;
    var $openChat: openChat;
    var $userInfoChanger: typeof userInfoChanger;
    var $env: env;
    var $beacon: beacon;
    var $sensorsBeacon: sensorsBeacon;
    var $adAction: adAction;
    var $adUtils: adUtils;
    var $adFeedback: adFeedback;
    var $tradePublicUtils: tradePublicUtils;
    var $moment: typeof moment;
    var $ayApi: api;
    var $ayUserInfo: userInfo;
    var $adImport: $adImport;
}