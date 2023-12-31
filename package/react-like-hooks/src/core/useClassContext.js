import invariant from 'tiny-invariant';
import { checkSymbol, getMagicDispatcher, getMagicSelf } from './magicSelf';
import { createHook } from './createHook';

export function useClassContextKey(keySymbol, context, observedBits) {
  checkSymbol('useClassContext', keySymbol);
  getMagicSelf(); // invariant hook outside render method
  invariant(context && context.Provider && context.Consumer, 'Context should be Naruse.createContext object!');

  const contextValue = getMagicDispatcher().readContext(context, observedBits);

  return contextValue;
}

export const useClassContext = createHook('Contexts', useClassContextKey);
