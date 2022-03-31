/** 简易事件中心 */
class EventBus {
    constructor () {
        this.listeners = {};
    }

    on (eventName, callback) {
        if (this.listeners[eventName] === undefined) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    off (eventName, callback) {
        if (this.listeners[eventName] === undefined) {
            return;
        }
        const index = this.listeners[eventName].indexOf(callback);
        if (index !== -1) {
            this.listeners[eventName].splice(index, 1);
        }
    }

    emit (eventName, ...args) {
        if (this.listeners[eventName] === undefined) {
            return;
        }
        this.listeners[eventName].forEach(callback => {
            callback(...args);
        });
    }
}

/** 全局事件中心 */
const globalEvent = new EventBus();

export {
    globalEvent,
    EventBus,
};
