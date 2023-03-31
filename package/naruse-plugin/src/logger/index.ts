import {
    InitAdLoggerPublicInfoParams,
    LoggerLanding,
    LoggerLevel,
    PluginApplyParams,
    PluginConstructorFirstParma,
    PluginOnErrorParams,
    UpdateAdLoggerPublicInfoParams,
} from '../type'
import { AdData, AdRunningContext, isEmpty, removeObjectNullValue, createLogger, } from "naruse-share";

import Plugin from '../core/index'
import LoggerPlus from "./LoggerPlus";

const log = createLogger('LoggerPlugin');
const getNullAdData: () => AdData = () => {
    return {
        creative_id: 0,
        creative_name: "",
        dest_url: "",
        group_id: 0,
        img_path: "",
        img_size: "",
        pid: 0,
        pid_name: "",
        plan_id: 0,
        primary_class: "",
        secondary_class: "",
        template_type: "",
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
    constructor(first: PluginConstructorFirstParma, {
        level,
        landing,
        appName,
        userInfo,
        logInterface,
        systemInfo,
    }: InitAdLoggerPublicInfoParams) {
        super(first);
        // 一小波，错误提示
        if (isEmpty(appName)) {
            throw new Error('initAdLoggerPublicInfo: appName 必须的');
        }
        if (isEmpty(userInfo)) {
            throw new Error('initAdLoggerPublicInfo: userInfo 必须的');
        }
        if (typeof logInterface !== 'function') {
            throw new Error('initAdLoggerPublicInfo: logInterface 必须是一个函数');
        }
        if (isEmpty(systemInfo)) {
            throw new Error('initAdLoggerPublicInfo: systemInfo 必须的');
        }
        if (isEmpty(landing)) {
            throw new Error('initAdLoggerPublicInfo: landing 必须的');
        }
        this.updatePublicInfo({ level, landing, appName, userInfo, logInterface, systemInfo }, false);
        // 注入默认的 日志对象.(预加载代码，不会触发插件的生命周期)
        const default$logger = new LoggerPlus(
            { adData: getNullAdData(), landing: LoggerLanding.production },
            this._initParams
        );
        const { config } = first;
        const baseCtx = config.baseCtx() as AdRunningContext;
        baseCtx.$logger = default$logger;
    }

    /** 修改参数 */
    updatePublicInfo(params: UpdateAdLoggerPublicInfoParams, ignoredNull = true) {
        log.info('updatePublicInfo: params = ',params, 'ignoredNull = ',ignoredNull);
        (ignoredNull) && removeObjectNullValue(params);
        Object.assign(this._initParams, params);
        this.$logger && this.$logger.updatePublicInfo(params, ignoredNull);
    }

    apply({ context, config }: PluginApplyParams) {
        const { $adImport } = context
        const { adData } = $adImport;
        /** 注入 日志对象 */
        this.$logger = new LoggerPlus({ adData: adData.results[0] }, this._initParams);
        context.$logger = this.$logger;
        log.info('apply: context = ', context);
    }

    onError({ context, error, source }: PluginOnErrorParams) {
        const { $logger } = context;
        // 打印错误日志
        $logger.clone({ landing: LoggerLanding[source] })
            .error(`${error.name}-${error.message}`, JSON.stringify(error));
    }
}

export { LoggerPlus, LoggerPlugin };
