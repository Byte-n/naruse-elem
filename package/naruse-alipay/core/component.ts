import {
    logger,
    NOOP
} from './uitl';
import type { Middware } from './middware';
import { VNode } from './diff';
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, reactLikeHooksInit } from 'react-like-hooks';
/**
 * @description naruseComponent 实现
 * @author CHC
 * @date 2022-03-21 14:03:21
 * @class NaruseComponent
 */
export class NaruseComponent {
    static $isNaruseClass = true;
    state: Record<string, any>;
    props: Record<string, any>;
    $mounted: boolean;
    updater: Middware | null;
    constructor(props: Record<string, any>) {
        this.state = {};
        this.props = props;
        this.$mounted = false;
        // 中间件实例
        this.updater = null;
    }
    setState(update: Record<string, any>, callback = NOOP) {
        if (!this.updater) {
            // @ts-ignore
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        if (typeof update !== 'object') {
            // @ts-ignore
            logger.error('setState 不支持的数据格式！', update);
            return;
        }
        if (this.state === update) return;
        const newState = {
            ...this.state,
            ...update,
        };
        const flag = this.updater.shouldUpdate(this.props, newState);
        this.state = newState;
        flag && this.updater.enqueueUpdate(callback);
    }
    forceUpdate(callback = NOOP) {
        if (!this.updater) {
            // @ts-ignore
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        this.updater.enqueueUpdate(callback);
    }
    // @ts-ignore
    shouldComponentUpdate ():boolean {}
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
    // @ts-ignore
    render(): VNode {}
}

/**
 * 与环境相关的全局变量
 */
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
    /** naruse 渲染时留下的全局渲染变量 */
    NaruseCurrentOwner: {
        current: null
    }
}

// 初始化
reactLikeHooksInit({
    getSelfComponent: () => __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.NaruseCurrentOwner.current,
    getDispatcher: () => null,
});

export const Hooks = {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useState,
    useRef
}

/** 判断是否是NaruseComponent */
export const isNaruseComponent = (obj: any) => obj instanceof NaruseComponent;

/**
 * 将函数组件转换为类组件
 */
export const functionalizae = (fn: Function) => {
    return class extends NaruseComponent {
        render() {
            return fn(this.props);
        }
    }
}

