
interface Defer extends Promise<any> {
    /** 完成此defer */
    resolve: (...args: any[]) => void;
    /** 拒绝此defer */
    reject: (...args: any[]) => void;
}
interface getDeferred {
    (deferName: string): Defer;
}

/** 事件中心类 */
interface EventBus {
    new (): EventBus;
    on (event: string, listener: Function): void;
    off (event: string, listener: Function): void;
    emit (event: string, ...args: any[]): void;
    clear (): void;
}

/** 全局事件中心 */
type globalEvent = Omit<EventBus, 'new'>;


declare module 'Naruse' {
    let getDeferred: getDeferred;
    let globalEvent: globalEvent;
    let EventBus: EventBus;
}