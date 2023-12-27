import { PluginConstructorFirstParma } from '../../naruse-plugin/src/type/index';
import { HotPullerReturn } from '../../naruse-share/types/index';
import NaruseTemplateCacheManager, {
    RequestManagerConstructor, RequestManagerData, RequestFuncParams,
} from './NaruseTemplateCacheManager';
export interface HotPullerCachePluginConfig <Props, RequestData, ResponseResult> {
    managerConfig: RequestManagerConstructor<RequestData, ResponseResult>,
    onCreateRequest: (props: Props) => RequestFuncParams<RequestData>;
    onHotPuller: (props: Props, resp: RequestManagerData<ResponseResult>, req: RequestFuncParams<RequestData>) => ({ ctx: object; adProps: object });
}
export default class HotPullerCachePlugin<Props, RequestData, ResponseResult> {
    private manager: NaruseTemplateCacheManager<RequestData, ResponseResult>;
    private onCreateRequest: (props: Props) => RequestFuncParams<RequestData>;
    private onHotPuller: (props: Props,resp: RequestManagerData<ResponseResult>, req: RequestFuncParams<RequestData>) => ({ ctx: object; adProps: object });

    constructor (
        params: PluginConstructorFirstParma,
        {
            managerConfig, onCreateRequest, onHotPuller,
        }: HotPullerCachePluginConfig<Props, RequestData, ResponseResult>,
    ) {
        const config = params.config;
        config.hotPuller = this.hotPuller;
        this.manager = new NaruseTemplateCacheManager<RequestData, ResponseResult>(managerConfig);
        this.onCreateRequest = onCreateRequest;
        this.onHotPuller = onHotPuller;
    }

    hotPuller = async (props: Props): Promise<HotPullerReturn> => {
        const requestParams = this.onCreateRequest(props);
        const resp = await this.manager.request(requestParams);
        const { ctx, adProps } = this.onHotPuller(props, resp, requestParams);
        return Promise.resolve({
            code: resp.code,
            ctx,
            adProps,
        });
    }
}
