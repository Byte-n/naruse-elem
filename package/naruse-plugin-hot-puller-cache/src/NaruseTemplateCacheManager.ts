import createLogger from 'naruse-share/log/logger';
// @ts-ignore
import fsaw from 'fs-aw/miniapp';

const log = createLogger('naruse-plugin');

export type RequestManagerData<ResponseResult> = Omit<Cache<ResponseResult>, 'deps' | 'expireTime'> & { cache?: boolean };

export interface Cache <ResponseResult = any> {
    deps: string[];
    data: ResponseResult;
    expireTime: number;
    templateVersion: string,
    templateName: string,
    code: string,
}

export interface RequestManagerConstructor<
    RequestData,
    ResponseResult,
> {
    cacheTime?: number,
    templateDirPath?: string,
    dataDirPath?: string,
    versionFilePath?: string,
    onRequestVersion: () => Promise<string>,
    onRequestBefore: (request: RData<RequestData>) => OnRequestBeforeReturn,
    onRequest: (request: RData<RequestData>) => Promise<RequestManagerData<ResponseResult>>,
    onRequestTemplate: (path: string, version: string) => Promise<string>,
}

export interface OnRequestBeforeReturn {
    /** 返回存储此次请求数据的路径 */
    dataFilePath: string;
}

export interface RequestFuncParams <RequestData> {
    key: string;
    data: RequestData;
    deps: string[];
    forceRefresh?: boolean;
}

export type RData <RequestData> = {
    version: string;
    templateList: string[];
} & RequestFuncParams <RequestData>;

export default class NaruseTemplateCacheManager<
    RequestData,
    ResponseResult,
> {

    private cacheTime = 1000 * 60 * 60;
    private templateDirPath = '/template';
    private dataDirPath = '/data';
    private versionFilePath = '/version.txt';
    private onRequestVersion = () => Promise.resolve('0.0.1');
    private onRequestBefore: (request: RData<RequestData>) => OnRequestBeforeReturn;
    private onRequest: (request: RData<RequestData>) => (Promise<Omit<RequestManagerData<ResponseResult>, 'cache'>>);
    private onRequestTemplate = (_path: string, _version: string) => Promise.resolve('');
    /** 保存模版key列表，配合后端判断是否存在，允许同时存在多个版本的模版列表，用来区分正式和测试版本 */
    private currentTemplateKeyListMap: Record<string, string[]> = {};

    /** 当前版本号 */
    private version: string;

    /** 唯一请求map，防止短时间内的多次重复请求 */
    private duplicateRequestMap: Map<string, Promise<unknown>> = new Map();
    private initResolve: (value: (PromiseLike<unknown> | unknown)) => void;
    private initPromise: Promise<unknown>;

    constructor (params: RequestManagerConstructor<RequestData, ResponseResult>) {
        this.cacheTime = typeof params.cacheTime === 'number' ? params.cacheTime : this.cacheTime;
        this.templateDirPath = params.templateDirPath ?? this.templateDirPath;
        this.dataDirPath = params.dataDirPath ?? this.dataDirPath;
        this.versionFilePath = params.versionFilePath ?? this.versionFilePath;
        this.onRequestVersion = params.onRequestVersion;
        this.onRequestBefore = params.onRequestBefore;
        this.onRequestTemplate = params.onRequestTemplate;
        this.onRequest = params.onRequest;
        this.version = '';
        
        this.initResolve = () => void 0;
        this.initPromise = new Promise(resolve => {
            this.initResolve = resolve;
        });
        // 初始化缓存数据
        this.initCache();
    }

    /** 初始化版本号和模版列表，如果版本号不一致，清空缓存，重新获取模版列表 */
    private async initCache (): Promise<void> {
        const { versionFilePath, onRequestVersion, templateDirPath, dataDirPath } = this;
        if (await fsaw.exists(versionFilePath)) {
            // 获取当前缓存的版本号
            this.version = await fsaw.readFile(versionFilePath, 'utf8');
        }
        // 获取远程系统最新的版本号
        const newVersion = await onRequestVersion();
        // 版本号不一致，清空缓存
        if (this.version !== newVersion) {
            // 当前版本存在证明有之前的版本，
            if (this.version) {
                const oldVersion = this.version;
                // 清除上个版本的缓存，因为是一个耗时较长的动作，放在setTimeout中，防止阻塞主线程
                // 而且清除上个版本的缓存并不是必须的，如果清除失败，也不会影响当前版本的使用
                // 这里理论上应该清除全部版本的缓存，但是因为异步的原因，会导致清楚与读取同时运行，导致读取失败
                // 但是如果不使用 setTimeout 的话会阻塞主线程，所以这里只清除上一个版本的缓存
                // 理论上使用测试版本的用户都是我们的测试人员，所以这里允许一部分冗余的情况出现
                setTimeout(() => fsaw.rmdir(`${templateDirPath}/${oldVersion}`));
            }
            this.version = newVersion;
            // 保存版本号（同步）
            await fsaw.writeFile(versionFilePath, newVersion);

            if (await fsaw.exists(dataDirPath)) {
                // 清除数据缓存
                await fsaw.rmdir(dataDirPath);
            }
        }
        const tmp = `${templateDirPath}/${this.version}`;
        if (await fsaw.exists(tmp)) {
            // 获取当前版本的模版列表
            this.currentTemplateKeyListMap[this.version] = (await fsaw.readdir(tmp)) as string[];
        }
        this.initResolve(null);
    }

    private async getCacheData (
        { deps = [], cachePath }: { data: RequestData, deps: string[], cachePath: string },
    ): Promise<[boolean, (Cache<ResponseResult>) | null]> {
        const failResult: [boolean, Cache<ResponseResult> | null] = [false, null];
        // 判断缓存是否存在
        if (!(await fsaw.exists(cachePath))) {
            return failResult;
        }
        // 获取缓存的数据
        const cacheAdData = await fsaw.readFile(cachePath, 'utf8');
        if (!cacheAdData) return failResult;
        let cacheAdDataObj: Cache<ResponseResult>;
        try {
            cacheAdDataObj = JSON.parse(cacheAdData);
        } catch (err) {
            log.warn('缓存文件解析失败', err);
            return failResult;
        }
        // 判断缓存是否过期
        if (cacheAdDataObj.expireTime < Date.now()) {
            await fsaw.removeFile(cachePath);
            return failResult;
        }
        // 如果缓存的依赖项与当前依赖项一致，直接返回缓存数据
        if (cacheAdDataObj.deps &&
            cacheAdDataObj.deps.length === deps.length &&
            cacheAdDataObj.deps.every((item, index) => item === deps[index])) {
            return [true, cacheAdDataObj];
        }
        return failResult;
    }

    /** 获取对应版本的模版列表 */
    private getTemplateListByVersion (version: string): string[] {
        if (!this.currentTemplateKeyListMap[version]) {
            this.currentTemplateKeyListMap[version] = [];
        }
        return this.currentTemplateKeyListMap[version];
    }


    /**
     * 请求
     * @param key   去重key
     * @param data  请求的参数
     * @param deps  依赖，依赖改变，则不使用缓存中的数据
     * @param forceRefresh 是否强制请求，不使用缓存中的数据
     */
    public async request ({ key, data, deps, forceRefresh }: RequestFuncParams<RequestData>): Promise<RequestManagerData<ResponseResult>> {
        return this.createDuplicateRequest(key, () => this.originalRequest({
            data, deps, forceRefresh, key
        }));
    }
    
    public clearAll () {
        fsaw.rmdirSync('/')
    }

    /**
     * @description 懒加载远程 ES 模块，在打包时通过 webpack 将文件分为多个 chunk，等待代码执行到该处时
     * 再通过 api 获取代码执行 的形式懒加载，可以动态的决定加载哪些模块，大幅度减少首次模块加载的时间
     * @author CHC
     * @date 2023-04-07 18:04:33
     */
    public async getTemplate (
        { templateName, templateVersion }: { templateName: string, templateVersion: string },
    ): Promise<string> {
        return this.createDuplicateRequest(`${templateName}-${templateVersion}`,
            async () => {
                if (!templateVersion) {
                    templateVersion = this.version;
                }
                const templateList = this.getTemplateListByVersion(templateVersion);

                const fullPath = `${this.templateDirPath}/${templateVersion}/${templateName}`;

                // 不在 已存在的模版列表中，或 路径不存在
                if (!templateList.includes(templateName) || !(await fsaw.exists(fullPath))) {
                    // 重新获取模版
                    const fileContent = await this.onRequestTemplate(templateName, templateVersion);
                    // 写入缓存
                    fsaw.writeFile(fullPath, fileContent);
                    // 更新模版列表
                    this.addTemplateName(templateVersion, templateName);
                    return fileContent;
                }
                return fsaw.readFile(fullPath, 'utf8');
            });
    }

    private async originalRequest (
        { key, data, deps, forceRefresh }: {
            key: string,
            data: RequestData,
            deps: string[],
            forceRefresh?: boolean,
        },
    ): Promise<RequestManagerData<ResponseResult>> {
        await this.initPromise;

        const requestData = {
            data, deps, key, forceRefresh,
            version: this.version,
            templateList: this.getTemplateListByVersion(this.version),
        };
        const { dataFilePath } = this.onRequestBefore(requestData);
        
        const cachePath = `${this.dataDirPath}${ dataFilePath.startsWith('/') ? dataFilePath : `/${dataFilePath}`}`;

        let cache: Cache<ResponseResult> | null = null;
        let isCache = false;

        // 缓存处理
        if (!forceRefresh) {
            let [isCacheAdDataValid, cacheTmp] = await this.getCacheData({ data, deps, cachePath });
            if (isCacheAdDataValid && cacheTmp) {
                cache = cacheTmp;
            }
        }
        if (cache?.data) {
            isCache = true;
        } else {
            const responseResult = await this.onRequest(requestData);
            cache = {
                expireTime: new Date().getTime() + this.cacheTime,
                ...responseResult,
                deps,
            };
        }

        await fsaw.writeFile(cachePath, JSON.stringify(cache));

        // 处理模版
        let { templateVersion, templateName, code } = cache;
        
        if (templateName) {
            // 没有模版名称，就直接返回
            return { ...cache, cache: isCache };
        }
        if (!templateVersion) {
            templateVersion = this.version;
        }
        // 判断是否返回了新的模版内容，如果有就缓存起来
        if (code) {
            const templateCacheFilePath = `${this.templateDirPath}/${templateVersion}/${templateName}`;
            await fsaw.writeFile(templateCacheFilePath, code);
            // 模版名添加到列表中
            this.addTemplateName(templateVersion, templateName);
        } else {
            cache.code = await this.getTemplate({ templateName, templateVersion });
        }
        return { ...cache, cache: isCache };
    }

    addTemplateName (templateVersion: string, templateName: string) {
        const list = this.currentTemplateKeyListMap[templateVersion] || [];
        list.push(templateName);
        if (typeof Set === 'function') {
            // @ts-ignore
            this.currentTemplateKeyListMap[templateVersion] = [...new Set(list)];
        } else {
            this.currentTemplateKeyListMap[templateVersion] = list;
        }
    }

    public async createDuplicateRequest<T> (key: string, fn: (...args: unknown[]) => Promise<T>, isforce?: boolean): Promise<T> {
        if (this.duplicateRequestMap.has(key) && !isforce) {
            return await this.duplicateRequestMap.get(key) as unknown as T;
        }
        try {
            const request = fn();
            this.duplicateRequestMap.set(key, request);
            // 这里必须要使用 await，否则会导致请求被自动去除
            return await request;
        } finally {
            this.duplicateRequestMap.delete(key);
        }
    }
}
