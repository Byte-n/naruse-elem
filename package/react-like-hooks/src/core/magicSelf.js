import invariant from 'tiny-invariant';

invariant(typeof Symbol === 'function' && Symbol.for, 'react-class-hooks needs Symbols!');

// Separate objects for better debugging.
export const MAGIC_STATES = Symbol.for('States');
export const MAGIC_EFFECTS = Symbol.for('Effects');
export const MAGIC_MEMOS = Symbol.for('Memos');
export const MAGIC_REFS = Symbol.for('Refs');
export const MAGIC_STACKS = Symbol.for('Stacks');

const mustFristInit = () => {
  throw new Error('You must call reactLikeHooksInit first!');
};

const defaultConfig = {
  isOrginReact: false,
  getDispatcher: mustFristInit,
  getSelfComponent: mustFristInit,
}

export function getMagicSelf() {
  invariant(
    defaultConfig.getSelfComponent(),
    'You are using Hooks outside of "render" Component Method!'
  );
  return defaultConfig.getSelfComponent();
}


export const getMagicDispatcher = () => {
  return defaultConfig.getDispatcher();
};

export function checkSymbol(name, keySymbol) {
  invariant(typeof keySymbol === 'symbol', `${name} - Expected a Symbol for key!`);
}


/**
 * @description 初始化 react like hooks
 * @author CHC
 * @date 2023-03-22 20:03:49
 * @param {*} FacotoryObject
 * @param {*} specialCurrentObjectPath
 * @param {boolean} [isOrginReact=false]
 */
export const reactLikeHooksInit = ({ getDispatcher, getSelfComponent, isOrginReact = false }) => {
  defaultConfig.getDispatcher = getDispatcher;
  defaultConfig.getSelfComponent = getSelfComponent;
  defaultConfig.isOrginReact = isOrginReact;
}


