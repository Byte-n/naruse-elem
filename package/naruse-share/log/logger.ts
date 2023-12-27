
const createLogger = (name: string) => {
    return {
        debug(...args: any[]) {
            console.debug(`[${name}][debugger]`, ...args);
        },
        warn(...args: any[]) {
            console.warn(`[${name}][warn]`, ...args);
        },
        info(...args: any[]) {
            console.info(`[${name}][info]`, ...args);
        },
        error(...args: string[]) {
            console.error(`[${name}][error]`, ...args);
        },
    };
}

export const initVersionLogger = (name: any, version: any) => {
    console.log(
        `%c naruse %c ${name} v${version} %c`,
        'background:#17c0eb ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#7158e2 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      )
}

export default createLogger;
