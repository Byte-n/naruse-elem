import {
    InitAdLoggerPublicInfoParams,
    LoggerLanding,
    LoggerLevel,
    PluginApplyParams,
    PluginConstructorFirstParma,
    PluginOnErrorParams,
    UpdateAdLoggerPublicInfoParams,
} from '../type'
import { AdData, AdRunningContext, createLogger, removeObjectNullValue } from "naruse-share";

import Plugin from '../core/index'
import LoggerPlus from "./LoggerPlus";

const log = createLogger('LoggerPlugin');
const getNullAdData: () => AdData = () => {
    return {
        creative_id: 0,
        creative_name: "creative_name",
        dest_url: "",
        group_id: 0,
        img_path: "",
        img_size: "",
        pid: 0,
        pid_name: "",
        plan_id: 0,
        primary_class: "",
        secondary_class: "",
        template_type: "template_type",
        user_define: { body: {} },
        version: ""
    } ;
}
/**
 * 日志插件，将 管理 日志 的公共属性参数，负责将日志对象注入到公共系统中
 */
class LoggerPlugin extends Plugin {
    /** 日志的公共信息 参数 */
    _initParams: InitAdLoggerPublicInfoParams = {
        appName: "",
        level: LoggerLevel.debug,
        logInterface(_paramsStr, _params, _loggerInfo): void {
            throw new Error('未初始化 LoggerPlugin logInterface');
        },
        systemInfo: {},
        userInfo: { userNick: "", vipEndTime: "", vipFlag: 0 }
    }
    $logger: LoggerPlus | null
    /** 插件构造函数的第一个参数 */
    constructorFirstParams: PluginConstructorFirstParma
    constructor(first: PluginConstructorFirstParma, {
        level,
        landing,
        appName,
        userInfo,
        logInterface,
        systemInfo,
        coverLoggerInfoToRequestParamInterface,
    }: InitAdLoggerPublicInfoParams) {
        super(first);
        // 一小波，错误提示
        if (typeof appName !== 'string') {
            throw new Error('initAdLoggerPublicInfo: appName 必须是一个字符串');
        }
        if (typeof userInfo !== "object") {
            throw new Error('initAdLoggerPublicInfo: userInfo 必须是一个对象');
        }
        if (typeof logInterface !== 'function') {
            throw new Error('initAdLoggerPublicInfo: logInterface 必须是一个函数');
        }
        if (typeof systemInfo !== "object") {
            throw new Error('initAdLoggerPublicInfo: systemInfo 必须是一个对象');
        }
        if (typeof landing !=="string") {
            throw new Error('initAdLoggerPublicInfo: landing 必须是一个字符串');
        }
        if (coverLoggerInfoToRequestParamInterface && typeof coverLoggerInfoToRequestParamInterface !=="function") {
            throw new Error('initAdLoggerPublicInfo: coverLoggerInfoToRequestParamInterface 必须是一个函数');
        }
        this.constructorFirstParams = first;
        this.updatePublicInfo({ level, landing, appName, userInfo, logInterface, systemInfo, coverLoggerInfoToRequestParamInterface }, false);
    }

    /** 修改参数 */
    updatePublicInfo(params: UpdateAdLoggerPublicInfoParams, ignoredNull = true) {
        log.info('updatePublicInfo: params = ',params, 'ignoredNull = ',ignoredNull);
        (ignoredNull) && removeObjectNullValue(params);
        Object.assign(this._initParams, params);
        const { config } = this.constructorFirstParams;
        const baseCtx = config.baseCtx() as AdRunningContext;
        // 修改公共信息之后，也要重新初始化 默认的 logger
        // 注入默认的 日志对象.(预加载代码，不会触发插件的生命周期)
        baseCtx.$logger = new LoggerPlus(
            {
                adData: getNullAdData(),
                landing: LoggerLanding.production,
                adVer: baseCtx.$adVersion || '0.0.0',
            },
            this._initParams
        );
        // 优先才有 准确的 logger
        const logger = this.$logger || baseCtx.$logger;
        logger.updatePublicInfo(params, ignoredNull);
    }

    apply({ context, config }: PluginApplyParams) {
        const { $adImport, $adVersion } = context
        const { adData } = $adImport;
        /** 注入 日志对象 */
        this.$logger = new LoggerPlus({
            adData: adData.results[0],
            adVer: $adVersion,
        }, this._initParams);
        context.$logger = this.$logger;
        log.info('apply: context = ', context);
    }

    onError({ context, error, source }: PluginOnErrorParams) {
        const { $logger } = context;
        // 打印错误日志
        $logger.clone({ landing: LoggerLanding[source] })
            .error(`${error.name}-${error.message}`, error);
    }
}

export { LoggerPlus, LoggerPlugin };
