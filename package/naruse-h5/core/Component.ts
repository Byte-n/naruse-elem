import React from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, reactLikeHooksInit } from 'react-like-hooks'

let Hooks = {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useState,
    useRef,
}

// 判断 react 是否支持 hooks，如果不支持则使用 react-like-hooks
if (React.useState) {
    Hooks = {
        useCallback: React.useCallback,
        useEffect: React.useEffect,
        useLayoutEffect: React.useLayoutEffect,
        useMemo: React.useMemo,
        useReducer: React.useReducer,
        useState: React.useState,
        useRef: React.useRef,
    }
} else {
    // inject None effects
    React.PureComponent.prototype.componentDidMount = () => { };
    React.Component.prototype.componentDidMount = () => { };
    // 初始化
    reactLikeHooksInit({
        // @ts-ignore
        getSelfComponent: () => {
            // @ts-ignore
            return React?.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current?._instance;
        },
        getDispatcher: () => null,
    });
}



export const getHooks = () => {
    return Hooks;
}

/**
 * 将函数组件转换为类组件
 */
export const functionalizae = (fn: Function) => {
    return class extends React.Component {
        render() {
            return fn(this.props);
        }
    }
}
