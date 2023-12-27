const invariant = (condition: boolean, errorMsg: string) => {
    if (condition) {
        throw new Error(errorMsg);
    }
}

const asserAbsolutePath = (path: string) => {
    invariant(typeof path !== 'string' || path.length === 0, 'Path must be a non empty string');
    invariant(path.includes('..'), 'path not allow include ..')
};
export function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint16Array(buf)) as string;
}

export function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
export {
    invariant,
    asserAbsolutePath,
}