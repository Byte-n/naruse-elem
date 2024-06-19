/** naruseInit 初始化时的参数 */
export type NaruseInitParams = Partial<NaruseConfig>

/** naruse 配置项 */
export type NaruseConfig = {
    hotPuller: (props: any & { unique?: boolean }) => Promise<HotPullerReturn>,
    baseCtx: () => AdRunningContext | {},
    onRunError: (err: Error, source?: RunningCodeErrorSource) => void,
    hotImport: (path: string, ctx: any) => string | Promise<string>,
    [k: string]: any,
}

export type NaruseConfigH5 = {
    unsafeEnabled: {
        compatibleWeexElement?: boolean
        compatibleWeexElementLog?: boolean
    },
    convertRpx: (val: number) => (number|string)
} & NaruseConfig;
export type NaruseInitParamsH5 = Partial<NaruseConfigH5>

/** 热更新方法返回值 */
export type HotPullerReturn = {
    code?: string,
    ctx: Partial<AdRunningContext>,
    props?: Record<string, any>
}

/** 广告代码运行时上下文环境对象 */
export type AdRunningContext = {
    h:  (type: any, props: any, ...children: any[]) => any,
    Naruse: any,
} & Record<string, any>;

export type AdDataResponse = {
    status: string,
    results: AdData[],
}
export type AdData = {
    creative_name: string,
    dest_url: string,
    // pid 可能也有
    pid: string | number,
    // 有cid为字符串的，例如 47243
    creative_id: string | number,
    img_size: string,
    secondary_class: string,
    primary_class: string,
    user_define: { body: AdBody },
    group_id: number,
    img_path: string,
    template_type: string,
    pid_name: string,
    plan_id: number,
    version: string,
    // todo；待补充
} & Record<string, any>;

/** 除函数之外的类型 */
export type AdBody = Record<string, AdBodyValue>;

export type AdBodyValue = NoFunctionAndObject | Array<AdBodyValue> | Record<string, NoFunctionAndObject>;

/** 除function,object外的基本数据类型，包含 null 这个 object */
export type NoFunctionAndObject = string | number | boolean | null | undefined;

/** 错误来源，该枚举的值为 LoggerLanding 的 key */
export enum RunningCodeErrorSource {
    errorCenter = 'errorCenter',
    tryCatch = 'tryCatch'
}
