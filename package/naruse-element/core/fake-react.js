/** 简易事件中心，用来通知是否需要刷新 */
import { logger } from './uitl'
class eventBus {
    constructor() {
        this.listeners = {};
    }

    on(eventName, callback) {
        if (this.listeners[eventName] === undefined) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    }

    off(eventName, callback) {
        if (this.listeners[eventName] === undefined) {
            return;
        }
        const index = this.listeners[eventName].indexOf(callback);
        if (index !== -1) {
            this.listeners[eventName].splice(index, 1);
        }
    }

    emit(eventName, ...args) {
        if (this.listeners[eventName] === undefined) {
            return;
        }
        this.listeners[eventName].forEach(callback => {
            callback(...args);
        });
    }
}

/** 专属事件中心 */
const events = new eventBus();

const checkReactIntegrity = (obj, self) => {
    const types = Object.keys(obj);
    if (!types.includes('render')) {
        logger.error('naruse-fake-react-runtime 必须要一个render函数');
    }
    types.forEach((key) => {
        if (key === 'constructor') {
            self['init'] = obj[key].bind(self);
        }
        if (typeof obj[key] === 'function') {
            self[key] = obj[key].bind(self);
        } else {
            self[key] = obj[key]
        }
    })
}

// 简易的react运行时

let componentId = 0;
class NaruseComponent {

    _isFristRender = false;
    _isUpdating = false;

    constructor(props) {
        this.$componentId = componentId++;
    }

    _render() {
        const vnode = this.render && this.render() || {};
        return [vnode, () => {
            this._isFristRender ? this.componentDidMount && this.componentDidMount() : this.componentDidUpdate && this.componentDidUpdate();
            this._isFristRender = false;
        }];
    }

    setState(newState) {
        if (newState === this.state) return
        this.state = {
            ...this.state,
            ...newState
        };
        !this._isUpdating && Promise.resolve().then(() => {
            events.emit(`update-${this.componentId}`);
            this._isUpdating = false
        })
        this._isUpdating = true
    }
}
export {
    events,
    NaruseComponent,
};
