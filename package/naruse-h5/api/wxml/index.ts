import { temporarilyNotSupport } from '../../../naruse-share/index'
import { SelectorQuery } from './selectorQuery'

export const createSelectorQuery = () => {
  return new SelectorQuery()
}

export const createIntersectionObserver = temporarilyNotSupport('createIntersectionObserver')
