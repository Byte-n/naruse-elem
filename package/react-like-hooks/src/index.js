import { useClassState } from './core/useClassState';
import { useClassEffect } from './core/useClassEffect';
import { useClassMemo } from './core/useClassMemo';
import { useClassCallback } from './core/useClassCallback';
import { useClassReducer } from './core/useClassReducer';
import { useClassRef, refCallback } from './core/useClassRef';
import { reactLikeHooksInit } from './core/magicSelf';

const useClassLayoutEffect = useClassEffect;

export {
  reactLikeHooksInit,
  useClassState as useState,
  useClassEffect as useEffect,
  useClassLayoutEffect as useLayoutEffect,
  useClassMemo as useMemo,
  useClassCallback as useCallback,
  useClassReducer as useReducer,
  useClassRef as useRef,
  refCallback,
};
