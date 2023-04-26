export const baseExts = ['.js', '.jsx', '.ts', '.tsx', '.mjs'];


/**
 * 深层合并对象
 */
export function deepMergeObject(firstObject, secondObject) {
    for (var key in secondObject) {
        firstObject[key] = firstObject[key] && Object.prototype.toString.call(firstObject[key]) === "[object Object]" ?
            deepMergeObject(firstObject[key], secondObject[key]) : secondObject[key];
    }
    return firstObject;
}
