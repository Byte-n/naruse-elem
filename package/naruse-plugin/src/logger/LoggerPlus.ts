import {
    InitAdLoggerPublicInfoParams,
    LoggerInfo,
    LoggerInfoKeyMap,
    LoggerLanding,
    LoggerLevel,
    LoggerPlusConstructorParams,
    LoggerPublicInfo,
    LoggerRawInfo,
    LogNetworkInterface,
    LoggerRequestParams,
    LoggerCloneParams, UpdateAdLoggerPublicInfoParams,
} from '../type';
import { AdData, removeObjectNullValue, createLogger, } from "naruse-share";

// 所有日志等级，顺序 按优先级升序（none 这个...最高，啥也不显示）
const levels = [LoggerLevel.debug, LoggerLevel.info, LoggerLevel.warn, LoggerLevel.error, LoggerLevel.none];
/** 获取空广告 */
const nullAdData: () => AdData = () => ({
    creative_id: undefined,
    creative_name: "null data",
    dest_url: "",
    group_id: 0,
    img_path: "",
    img_size: "",
    pid: undefined,
    pid_name: "",
    plan_id: 0,
    primary_class: "",
    secondary_class: "",
    template_type: "",
    user_define: { body: undefined },
    version: ""
});
const log = createLogger('LoggerPlus');
/** 日志发送类 */
export default class LoggerPlus {
    /** 日志的基础信息 */
    _info: LoggerRawInfo;

    /** 日志的公共信息 */
    _publicInfo: LoggerPublicInfo = {
        action: 'advert-template-logger',
        appName: "",
        landing: undefined,
        systemInfo: "",
        userNick: "",
        vipEndTime: "",
        vipFlag: 0
    }

    /** 日志的网络请求接口 */
    _logNetworkInterface: LogNetworkInterface = () => {
        throw new Error('未初始化 LoggerPlugin logInterface');
    };
    // 当前日志等级
    _curLoggerLevel = LoggerLevel.debug;

    /**
     * 构造日志对象
     * @param adData     广告数据
     * @param landing    日志触发源头
     * @param publicInfo 初始化日志公共属性的参数
     */
    constructor({ adData, landing }: LoggerPlusConstructorParams, publicInfo: InitAdLoggerPublicInfoParams) {
        if (!(adData !== null && typeof adData === 'object')) {
            throw new Error('构造日志对象错误: adData 必须是一个对象')
        }
        // 初始化 公共属性
        this.updatePublicInfo(publicInfo, false);

        // 初始化 私有属性
        const { creative_name, creative_id, version, pid } = adData;
        this._info = {
            landing,
            creative_name,
            /** 二级分类 发送 时指定， 默认创意名称 */
            event: creative_name,

            /** 日志等级 发送 时指定 */
            level: LoggerLevel.debug,
            /** 广告系统版本 */
            adVer: version,
            /** m9 日志信息 */
            info: {},

            /** 广告位 */
            pid: Number(pid),
            /** 创意id */
            cid: Number(creative_id)
        };
        // 移除空值
        removeObjectNullValue(this._info);
    }

    /** 解析公共属性 */
    updatePublicInfo(
        {
            level,
            landing,
            appName,
            userInfo,
            systemInfo,
            logInterface
        }: UpdateAdLoggerPublicInfoParams,
        ignoredNull = true) {
        const { userNick, vipEndTime, vipFlag } = userInfo;
        const obj = {
            userNick, appName, landing, vipEndTime, systemInfo, vipFlag,
        };
        ignoredNull && removeObjectNullValue(obj);
        // 日志等级
        if (levels.includes(level)) {
            this._curLoggerLevel = level;
        }
        // 日志 网络接口
        if (typeof logInterface === 'function') {
            this._logNetworkInterface = logInterface;
        }
        Object.assign(this._publicInfo, obj);
    }

    /** 再此日志对象基础上，创建一个新的日志对象 */
    clone (info: LoggerCloneParams, ignoredNull = true): LoggerPlus{
        // 不允许修改 action
        delete info.action;
        if (ignoredNull) {
            removeObjectNullValue(info);
        }
        // 构造一份原本的
        const obj: LoggerCloneParams = { ...(<Partial<LoggerPublicInfo & { action: never }>>this._publicInfo), logInterface: this._logNetworkInterface, level: this._curLoggerLevel };
        // 覆盖上去
        Object.assign(obj, info);
        // 构造日志类
        let loggerPlus = new LoggerPlus(
            // 先使用空公共信息
            { adData: nullAdData(), landing: LoggerLanding.production },
            {
                appName: obj.appName,
                landing: obj.landing,
                level: obj.level,
                logInterface: obj.logInterface,
                systemInfo: obj.systemInfo,
                userInfo: { userNick: obj.userNick, vipEndTime: obj.vipEndTime, vipFlag: obj.vipFlag },
            }
        );
        // 公共 私有 信息 部分。
        loggerPlus._info = {
            ...this._info,
        }
        return loggerPlus;
    }

    /**
     * 发送日志
     * @param level 日志等级
     * @param event 事件名称
     * @param args 参数
     */
    _request(level: LoggerLevel, event, ...args) {
        if (!this.isCanLog(level)) {
            log.debug('忽略日志：', level, event, ...args);
            return;
        }
        if (typeof this._logNetworkInterface !== 'function') {
            // 按理来说，在初始化时 initAdLoggerPublicInfo 没报错，这里不可能为空
            throw new Error('logNetworkInterface 不是一个函数');
        }
        const info: LoggerInfo = {
            ...this._publicInfo,
            ...(this._info),
            event,
            level,
            info: args
        };
        // 转换
        let requestParams = coverLoggerInfoToRequestParam(info);
        // 调用接口发送
        this._logNetworkInterface(
            this.encode(requestParams),
            this.encodeValue(requestParams),
            info,
        );
        log.debug('发生日志：', level, event, info);
    }

    /** 将obj转 get 请求的字符串，并进行 url 编码 */
    encode(obj) {
        const res = this.encodeValue(obj);
        return Object.keys(res)
            .map(key => `${key}=${obj[key]}`)
            .join('&');
    }

    /**
     * 将 obj 的 value 编码成字符串
     * @param obj
     */
    encodeValue(obj): Record<keyof LoggerRequestParams, string> {
        const res = {};
        Object.keys(obj)
            .forEach(key => {
                const value = obj[key];
                if (typeof value === 'object') {
                    res[key] = encodeURIComponent(JSON.stringify(value));
                    return;
                }
                if (typeof value === 'function') {
                    // 不会有人传递一个函数吧
                    res[key] = encodeURIComponent(`[function-${value.name}]:${value.toString()}`);
                    return;
                }
                res[key] = encodeURIComponent(value);
            });
        return <Record<keyof LoggerRequestParams, string>>res;
    }

    /** debug 日志 */
    debug(event, ...args) {
        this._request(LoggerLevel.debug, event, ...args)
    }

    /** info 日志 */
    info(event, ...args) {
        this._request(LoggerLevel.info, event, ...args)
    }

    /** warn 日志 */
    warn(event, ...args) {
        this._request(LoggerLevel.warn, event, ...args)
    }

    /** error 日志 */
    error(event, ...args) {
        this._request(LoggerLevel.error, event, ...args)
    }

    /** 是否可打印 level 级别的日志 */
    isCanLog(level: LoggerLevel) {
        const index = levels.findIndex(v => v === level);
        const curIndex = levels.findIndex(v => v === this._curLoggerLevel);
        // level 级别 >= _curLoggerLevel 才能发送
        return index >= curIndex;
    }
}

/** 将 LoggerInfo 转为 LoggerRequestParams */
function coverLoggerInfoToRequestParam(info: LoggerInfo): LoggerRequestParams {
    return <LoggerRequestParams>Object.keys(info).reduce((res, k) => {
        res[LoggerInfoKeyMap[k]] = info[k];
        return res;
    }, {});
}
