import { Naruse } from '../naruse-alipay/lib';
const { chai } = my;

/**简易的标题介绍 */
export const describe = (name, fun) => {
    console.log(`%c${name}`, 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: underline;');
    fun();
}

let nowTask = Promise.resolve();

/** 简易的异步测试用例 */
export const it = (name, fun) => {
    nowTask = nowTask.then(() => fun())
        .then(() => {
            console.log(`%c${name} success`, 'color: #43bb88;font-size: 18px;');
        })
        .catch((e) => {
            console.log(`%c${name} failed`, 'color: red;font-size: 18px;');
            console.error(e);
        });
}

export const expect = chai.expect;


/** 向app上挂载组件 */
export const mount = (component) => {
    Naruse.renderComponentOnPage('pages/index/index', component);
}

/** 卸载组件 */
export const unmount = () => {
    Naruse.renderComponentOnPage('pages/index/index', () => {});
}


export const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

/** mock fn 收集函数是否被调用，以及被调用的次数, 参数等 */
export const mockFn = () => {
    let count = 0;
    let args = [];
    let isCalled = false;
    const fn = (...arg) => {
        count++;
        args = arg;
        isCalled = true;
    }
    fn.getCount = () => count;
    fn.getArgs = () => args;
    fn.isCalled = () => isCalled;
    return fn;
}
