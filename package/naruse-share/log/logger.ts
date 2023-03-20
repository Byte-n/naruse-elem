
const createLogger = (name) => {
    return {
        debug(...args) {
            console.debug(`[${name}][debugger]`, ...args);
        },
        warn(...args) {
            console.warn(`[${name}][warn]`, ...args);
        },
        info(...args) {
            console.info(`[${name}][info]`, ...args);
        },
        error(...args) {
            console.error(`[${name}][error]`, ...args);
        },
    };
}

export const initVersionLogger = (name, version) => {
    console.log(
        `%c naruse %c ${name} v${version} %c`,
        'background:#17c0eb ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#7158e2 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      )
}

export default createLogger;
