const deferMap = {};

const getDeferPromise = () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    // @ts-ignore
    promise.resolve = resolve;
    // @ts-ignore
    promise.reject = reject;
    return promise;
}

const proxyObject = (obj) => {
    if (typeof Proxy !== 'function') {
        return obj;
    }
    return new Proxy(obj, {
        get(target, key) {
            if (!target[key]) {
                // @ts-ignore
                return obj[key] = getDeferPromise(key);
            }
            return obj[key];
        }
    });
}

const getDeferred = (key) => {
    if (!key) {
        return proxyObject(deferMap);
    }
    if (deferMap[key]) {
        return deferMap[key];
    } else {
        return deferMap[key] = getDeferPromise();
    }
}

export { getDeferred }
export default getDeferred;