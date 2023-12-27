import { PluginConstructorFirstParma } from '../../naruse-plugin/src/type/index';
import { HotPullerReturn } from '../../naruse-share/types/index';
import NaruseTemplateCacheManager, {
    RequestManagerConstructor, RequestManagerData, RequestFuncParams,
} from './NaruseTemplateCacheManager';
export interface HotPullerCachePluginConfig <Props, RequestData, ResponseResult> {
    ignoreUniqueComponent?: boolean,
    managerConfig: RequestManagerConstructor<RequestData, ResponseResult>,
    onCreateRequest: (props: Props) => RequestFuncParams<RequestData>;
    onHotPuller: (props: Props, resp: RequestManagerData<ResponseResult>, req: RequestFuncParams<RequestData>) => ({ ctx: object; props: object });
}
export default class HotPullerCachePlugin<Props extends object, RequestData, ResponseResult> {
    public manager: NaruseTemplateCacheManager<RequestData, ResponseResult>;
    private onCreateRequest: (props: Props) => RequestFuncParams<RequestData>;
    private onHotPuller: (props: Props,resp: RequestManagerData<ResponseResult>, req: RequestFuncParams<RequestData>) => ({ ctx: object; props: object });

    public ignoreUniqueComponent: boolean = true;
    constructor (
        params: PluginConstructorFirstParma,
        {
            managerConfig, onCreateRequest, onHotPuller, ignoreUniqueComponent = true,
        }: HotPullerCachePluginConfig<Props, RequestData, ResponseResult>,
    ) {
        const config = params.config;
        config.hotPuller = this.hotPuller;
        this.manager = new NaruseTemplateCacheManager<RequestData, ResponseResult>(managerConfig);
        this.onCreateRequest = onCreateRequest;
        this.onHotPuller = onHotPuller;
        this.ignoreUniqueComponent = ignoreUniqueComponent;
    }

    hotPuller = async (props: Props & { unique?: boolean }): Promise<HotPullerReturn> => {
        if (props.unique && this.ignoreUniqueComponent) {
            return { props: {}, ctx: {} };
        }
        const requestParams = this.onCreateRequest(props);
        const resp = await this.manager.request(requestParams);
        const { ctx, props: _props } = this.onHotPuller(props, resp, requestParams);
        return Promise.resolve({
            code: resp.code,
            ctx,
            props: _props,
        });
    }
}
