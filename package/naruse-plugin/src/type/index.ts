import { AdData, AdRunningContext, NaruseConfig, RunningCodeErrorSource } from "naruse-share";

/** 插件 Apply 的参数 */
export type PluginApplyParams = {
    context: AdRunningContext,
    config: NaruseConfig,
};

/** 插件构造函数的第一个参数 */
export type PluginConstructorFirstParma = {
    config: NaruseConfig
}

/** 插件 OnError 的参数 */
export type PluginOnErrorParams = {
    error: Error, source: RunningCodeErrorSource
} & PluginApplyParams;

/** 插件 的 生命周期 */
export enum PluginMethod {
    apply = 'Plugin.apply',
    onError = 'Plugin.onError',
}

/** PluginMethod 的 key  */
export type PluginMethodKey = keyof (typeof PluginMethod);

/** 构造 LoggerPlus 的构造方法 参数 */
export interface LoggerPlusConstructorParams {
    adData: AdData,
    landing?: LoggerLanding,
    adVer: string,
}
/** 将LoggerInfo 转为 请求参数的接口 */
export type CoverLoggerInfoToRequestParamInterface = (info: LoggerInfo) => Record<string, any>;
/** initPublicInfo 的参数 */
export type InitAdLoggerPublicInfoParams = {
    level: LoggerLevel,
    landing?: LoggerLanding,
    logInterface: LogNetworkInterface,
    appName: string,
    userInfo: { userNick: string, vipEndTime: string, vipFlag: number },
    systemInfo: any,
    coverLoggerInfoToRequestParamInterface?: CoverLoggerInfoToRequestParamInterface
};

/** changePublicInfo 的参数 */
export type UpdateAdLoggerPublicInfoParams = Partial<InitAdLoggerPublicInfoParams>;

/** 日志的公共属性 */
export type LoggerPublicInfo = {
    /** action(p)事件 一级分类 这里只能是 advert-template-logger，此值用于区分 日志系统中，其他日志 和 广告系统的 日志  */
    action: 'advert-template-logger',
    /** nick(n) 用户昵称 */
    userNick: string,

    /** app 名称 */
    appName: string,
    /** 触发日志的地方  */
    landing: LoggerLanding,
    /** 用户 版本 到期时间 */
    vipEndTime: string,
    /**  系统信息 */
    systemInfo: string,

    /** d3 用户 版本 */
    vipFlag: number,
};

/** 每条日志的 日志信息 */
export type LoggerRawInfo = {
    /**  触发日志的地方  */
    landing: LoggerLanding,
    /** event(e) 事件 二级分类 */
    event: string,

    /**  日志等级 */
    level: LoggerLevel,
    /**  广告系统版本 */
    adVer: string,

    /**  日志信息 */
    info: any

    /** d1 广告位 */
    pid: number,
    /** d2 创意id */
    cid: number,
    /** 物料模板名称 */
    template_type: string,
};

/** 日志的完整信息 */
export type LoggerInfo = LoggerRawInfo & LoggerPublicInfo;

export type LoggerCloneParams = Partial<LoggerPublicInfo & {
    action: never,
    level: LoggerLevel,
    logInterface: LogNetworkInterface,
}>;
/** 日志等级 */
export enum LoggerLevel {
    debug = 'debug',
    info = 'info',
    warn = 'warn',
    error = 'error',
    none = 'none',
}

/** 日志的触发起源地 */
export enum LoggerLanding {
    /** naruse error center */
    errorCenter = 'error-center',
    /** try-catch run */
    tryCatch = 'try-catch',
    /** 线上 */
    production = 'production',
    /** 开发时 */
    development = 'development',
};

/** 发送日志的网络请求接口 */
export type LogNetworkInterface = (
    /** & 链接的 k=v字符串 */
    paramsStr: string,
    /** value 编码后的 请求参数对象 */
    params: Record<keyof LoggerRequestParams, string>,
    /** 原始 日志对象 */
    loggerInfo: LoggerInfo
) => void;

/** 调用 LogNetworkInterface 的参数 */
export interface LoggerRequestParams {
    /** action(p)事件 一级分类 这里只能是 advert-template  */
    p: string,
    /** event(e) 事件 二级分类 */
    e: string,
    /** nick(n) 用户昵称 */
    n: string,

    /**  日志等级 */
    m1: LoggerLevel,
    /**  app 名称 */
    m2: string,
    /**  触发日志的地方  */
    m3: 'error-center' | 'user' | 'dev',
    /**  用户 版本 到期时间 */
    m4: string,
    /**  广告系统版本 */
    m5: string,
    /** 物料名称 */
    m6: string,

    /**  系统信息 */
    m7: string,
    /**  日志信息 */
    m9: any

    /** d1 广告位 */
    d1: number,
    /** d2 创意id */
    d2: number,
    /** d3 用户 版本 */
    d3: number,
};

/** LoggerInfo 中 key 到 梦想埋点参数 key 的映射 */
export const LoggerInfoKeyMap = {
    action: 'p',
    event: 'e',
    userNick: 'n',
    level: 'm1',
    appName: 'm2',
    landing: 'm3',
    vipEndTime: 'm4',
    adVer: 'm5',
    template_type: 'm6',
    systemInfo: 'm7',
    info: 'm9',
    pid: 'd1',
    cid: 'd2',
    vipFlag: 'd3',
} as const;

// type ValueOf<T> = T[keyof T];
// type RequestParamsKey = ValueOf<typeof LoggerInfoKeyMap>;
