import { NaruseTemplate } from "src/core/template";

interface BaseWebpackRunnerOptions {
    /** 编译模式 */
    mode?: 'production' | 'development' | 'none';
    /** 是否热更新 */
    isWatch?: boolean;
    /** 基础环境 */
    sourceDir: string;
    /** naruse 外部依赖路径 */
    naruseExternal?: string | {
        path: string;
        // 外部依赖的库名
        libName?: string;
        // 外部组件名
        componentName?: string;
    };
    template?: NaruseTemplate;
    /** 输出总路径 */
    outputPath: string;
    /** commonChunks */
    commonChunks?: string[];
}

/** 编译模式 */
export type CompilerType = 'app' | 'pages' | 'components';

/**
 * 页面配置
 */
export interface NaruseWebpackPageRunnerOptions extends BaseWebpackRunnerOptions {
    compilerType: 'pages';
    /** 页面入口文件 */
    pages : string | string[];
}

/**
 * 组件编译配置
 */
export interface NaruseWebpackComponentRunnerOptions extends BaseWebpackRunnerOptions {
    compilerType: 'components';
    componentConfig?: {
        // 组件入口文件
        entry: string | string[] | ComponentEntryConfig[] | ComponentEntryConfig;
    };
}

export interface ComponentEntryConfig {
    // 组件入口文件
    entry: string;
    // 输出路径
    outputPath: string;
}


export type NaruseWebpackRunnerOptions = NaruseWebpackPageRunnerOptions | NaruseWebpackComponentRunnerOptions;
