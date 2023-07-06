import RAP from 'rap-sdk';

export const globalEvent = {
    _eventName(eventName) {
        return `APP.naruse_global_event_${eventName}`;
    },
    on (eventName, event)  {
        if (typeof event !== 'function') {
            throw new Error('event must be a function');
        }
        RAP.on(this._eventName(eventName), event)
        return  () => {
            this.off(eventName, event)
        }
    },
    off (eventName, event) {
        RAP.off(this._eventName(eventName), event);
    },
    emit (eventName, data) {
        RAP.emit(this._eventName(eventName), data);
    },
    once (eventName, event) {
        const func = (...args) => {
            event(...args);
            // 取消监听
            this.off(eventName, func);
        }
        // 监听
        this.on(eventName, func);
    },
    clear () {
        // 暂未有实现方案
    },
};
