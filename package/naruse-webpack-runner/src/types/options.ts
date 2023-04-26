import { Swcrc } from "@swc/core";
import type { NaruseTemplate } from "../core/template";
import type Chain from 'webpack-chain';

interface BaseWebpackRunnerOptions {
    /** 编译模式 */
    mode?: 'production' | 'development' | 'none';
    /** 是否热更新 */
    isWatch?: boolean;
    /** 基础环境 */
    sourceDir: string;
    /** naruse 外部依赖路径, 为空 或 为 false 则默认不转化 Naruse 引入 */
    naruseExternal?: string | {
        path: string;
        // 外部依赖的库名
        libName?: string;
        // 外部组件名
        componentName?: string;
    } | false;
    template?: NaruseTemplate;
    /** 输出总路径 */
    outputPath: string;
    /** 对外暴露 webpack chain */
    webpackChain?: (chain: Chain, config: BaseWebpackRunnerOptions) => void;
    /** swc 合并配置项 */
    swcOptions?: Swcrc;
}

/** 编译模式 */
export type CompilerType = 'app' | 'pages' | 'components';

/**
 * 页面配置
 */
export interface NaruseWebpackPageRunnerOptions extends BaseWebpackRunnerOptions {
    compilerType: 'pages';
    /** 页面入口文件 */
    pages: string | string[];
    /** commonChunks */
    commonChunks?: string[];
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
    /** commonChunks */
    commonChunks?: string[];
}

export interface ComponentEntryConfig {
    // 组件入口文件
    entry: string;
    // 输出路径
    outputPath: string;
}


export interface NaruseWebpackSingleHotComponentRunnerOptions extends BaseWebpackRunnerOptions {
    compilerType: 'singleHotComponent'
    // 默认为 false
    naruseExternal: false;
    /** 是否输出为 export default + 字符串 */
    isExportDefaultString?: boolean;
    /** 输出文件名 */
    fileName?: string;
}


export type NaruseWebpackRunnerOptions = NaruseWebpackPageRunnerOptions | NaruseWebpackComponentRunnerOptions | NaruseWebpackSingleHotComponentRunnerOptions;
