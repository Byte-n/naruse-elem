
export class MethodHandler {
    private methodName: any;
    private __success: any;
    private __fail: any;
    private __complete: any;
    constructor ({ name, success, fail, complete }) {
        this.methodName = name;
        this.__success = success;
        this.__fail = fail;
        this.__complete = complete;
    }

    /** 成功 */
    success (res: { errMsg?: string } = {}, resolve = Promise.resolve.bind(Promise)) {
        if (!res.errMsg) {
            res.errMsg = `${this.methodName}:ok`;
        }
        typeof this.__success === 'function' && this.__success(res);
        typeof this.__complete === 'function' && this.__complete(res);
        return resolve(res);
    }

    /** 失败 */
    fail (res: { errMsg?: string } = {}, reject = Promise.reject.bind(Promise)) {
        if (!res.errMsg) {
            res.errMsg = `${this.methodName}:fail`;
        } else {
            res.errMsg = `${this.methodName}:fail ${res.errMsg}`;
        }
        console.error(res.errMsg);
        typeof this.__fail === 'function' && this.__fail(res);
        typeof this.__complete === 'function' && this.__complete(res);
        return reject(res);
    }
}
