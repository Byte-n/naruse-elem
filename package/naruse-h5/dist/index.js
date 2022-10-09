const createLogger = (name) => {
    const Logger = {
        debug () {
            console.debug(`[${name}][debugger]`, ...arguments);
        },
        warn () {
            console.warn(`[${name}][warn]`, ...arguments);
        },
        info () {
            console.info(`[${name}][info]`, ...arguments);
        },
        error () {
            console.error(`[${name}][error]`, ...arguments);
        },
    };

    return Logger;
};

const logger$1 = createLogger('naurse-error');

/**
 * @description 期望为某个类型，异步版
 * @author CHC
 * @date 2022-03-30 15:03:05
 * @param {*} { obj, type, name }
 * @returns {*}
 */
const exceptType = (obj, type, name) => {
    if (typeof obj !== type) {
        const res = { errMsg: `${name}:fail must has a ${type}` };
        logger$1.error(res.errMsg);
        return Promise.reject(res);
    }
};

/**
 * @description 期望为某个类型同步版
 * @author CHC
 * @date 2022-03-30 15:03:22
 * @param {*} obj
 * @param {*} type
 * @param {*} name
 * @returns {*}
 */
const exceptTypeSync = (obj, type, name) => {
    if (typeof obj !== type) {
        logger$1.error(`${name}:fail must has a ${type}`);
        return true;
    }
    return false;
};


/**
 * @description 暂时不支持的api
 * @author CHC
 * @date 2022-03-30 18:03:04
 * @param {*} apiName
 * @returns {*}
 */
const temporarilyNotSupport = function temporarilyNotSupport (apiName) {
    return () => {
        const errMsg = `暂时不支持 API ${apiName}`;
        logger$1.error(errMsg);
        return Promise.reject({ errMsg });
    };
};

const mitt = function (n) {
    return {
        all: n = n || new Map,
        on: function (e, t) {
            var i = n.get(e);
            i ? i.push(t) : n.set(e, [t]);
        },
        off: function (e, t) {
            var i = n.get(e);
            i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : n.set(e, []));
        },
        emit: function (e, ...t) {
            var i = n.get(e);
            i && i.slice().map(function (n) {
                n(...t);
            }), (i = n.get("*")) && i.slice().map(function (n) {
                typeof n === 'function' && n(e, ...t);
            });
        },
        clear: function () {
            n.clear();
        }
    }
};


/** 全局事件中心 */
const globalEvent = mitt();

/**
 * 这里不要改成箭头函数
 * 需要利用 new 来执行(兼容)
 * 如果构造函数内部通过 return 语句返回了一个引用类型值，则 new 操作最终返回这个引用类型值
 * 否则返回刚创建的新对象。
 * 箭头函数没有 constructor
 * @returns mitt
 */
function EventBus(map) {
    return mitt(map);
}

class MethodHandler {
    constructor ({ name, success, fail, complete }) {
        this.methodName = name;
        this.__success = success;
        this.__fail = fail;
        this.__complete = complete;
    }

    /** 成功 */
    success (res = {}, resolve = Promise.resolve.bind(Promise)) {
        if (!res.errMsg) {
            res.errMsg = `${this.methodName}:ok`;
        }
        typeof this.__success === 'function' && this.__success(res);
        typeof this.__complete === 'function' && this.__complete(res);
        return resolve(res);
    }

    /** 失败 */
    fail (res = {}, reject = Promise.reject.bind(Promise)) {
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

const deferMap = {};

const getDeferPromise = () => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    promise.resolve = resolve;
    promise.reject = reject;
    return promise;
};

const proxyObject = (obj) => {
    if (typeof Proxy !== 'function') {
        return obj;
    }
    return new Proxy(obj, {
        get(target, key) {
            if (!target[key]) {
                return obj[key] = getDeferPromise();
            }
            return obj[key];
        }
    });
};

const getDeferred = (key) => {
    if (!key) {
        return proxyObject(deferMap);
    }
    if (deferMap[key]) {
        return deferMap[key];
    } else {
        return deferMap[key] = getDeferPromise();
    }
};

const logger = createLogger('naruse-h5');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const reflectEventMap = {
    /** 点击事件处理 */
    click(e) {
        return {
            type: 'click',
            detail: {
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
            },
            /** 阻止冒泡 */
            stopPropagation() {
                e.stopPropagation();
            },
        };
    },
    /** 加载完毕 */
    load(e) {
        return {
            type: 'load',
            detail: {
                width: e.target.width,
                height: e.target.height,
            },
        };
    },
    /** 聚焦 */
    focus(e) {
        return {
            type: 'foucs',
            detail: { value: e.target.value },
        };
    },
    /** 失焦 */
    blur(e) {
        return {
            type: 'blur',
            detail: { value: e.target.value },
        };
    },
    /** 按键 */
    keydown(e) {
        e.stopPropagation();
        const { value } = e.target;
        const keyCode = e.keyCode || e.code;
        return {
            type: 'keydown',
            detail: {
                value,
                cursor: value.length,
                keyCode,
            },
        };
    },
    /** 输入 */
    input(e) {
        return {
            type: 'input',
            detail: e.detail,
        };
    },
};
/** 事件名称对应处理名称 */
const reflectEventNameMap = {
    click: 'onClick',
    load: 'onLoad',
    focus: 'onFocus',
    blur: 'onBlur',
    keydown: 'onKeyDown',
    input: 'onInput',
};
/**
 * @description 通用事件处理
 * @author CHC
 * @date 2022-03-18 16:03:45
 * @param {React.SyntheticEvent} e
 */
const commonEventHander = function (e) {
    const handler = this.props[reflectEventNameMap[e.type]];
    if (!handler || typeof handler !== 'function')
        return;
    const event = reflectEventMap[e.type];
    const res = reflectEventMap[e.type](e);
    res.timeStamp = new Date().getTime();
    event && handler(res);
};
/**
 * @description
 * @author CHC
 * @date 2022-07-08 15:07:54
 * @param {React.MouseEvent<T, MouseEvent>} event
 * @returns {*}
 */
const commonMouseEventCreater = (event) => {
    const { altKey, ctrlKey, shiftKey, clientX, clientY, pageX, pageY, screenX, screenY, stopPropagation, type } = event;
    return {
        type,
        detail: {
            altKey, ctrlKey, shiftKey, clientX, clientY, pageX, pageY, screenX, screenY,
        },
        stopPropagation,
        timeStamp: new Date().getTime(),
    };
};

var cssStyle$4 = {"a-button":{"display":"block","outline":"0","WebkitAppearance":"none","boxSizing":"border-box","padding":"0","textAlign":"center","fontSize":"18px","height":"47px","lineHeight":"47px","borderRadius":"2px","overflow":"hidden","textOverflow":"ellipsis","wordBreak":"break-word","whiteSpace":"nowrap","color":"#000","backgroundColor":"#fff","border":"1px solid #eee"},"active":{"backgroundColor":"#ddd","color":"rgba(0,0,0,.3)"},"disabled":{"color":"rgba(0,0,0,.6)","backgroundColor":"rgba(255,255,255,.6)"}};

const h$8 = React.createElement;
class Button extends React.Component {
    constructor() {
        super();
        this.state = { hover: false, active: false };
        this.touch = false;
    }
    /** 当开始点击时 */
    onTouchStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled)
            return;
        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }
    /** 点击结束时 */
    onTouchEnd() {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled) {
            return;
        }
        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ hover: false });
            }
        }, hoverStayTime);
    }
    /** 当开始点击时 */
    onActiveStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled)
            return;
        this.touch = true;
        setTimeout(() => {
            this.setState({ active: true });
        }, hoverStartTime);
    }
    /** 点击结束时 */
    onActiveEnd() {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled) {
            return;
        }
        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ active: false });
            }
        }, hoverStayTime);
    }
    render() {
        const _a = this.props, { type, disabled, style, className, hoverStyle, activeStyle } = _a; __rest(_a, ["type", "disabled", "style", "className", "hoverStyle", "activeStyle"]);
        const { hover, active } = this.state;
        const conStyle = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, cssStyle$4['a-button']), (type ? cssStyle$4[type] : {})), style), (hover ? hoverStyle : {})), (active ? Object.assign(Object.assign({}, cssStyle$4.active), activeStyle) : {}));
        return (h$8("button", { onMouseEnter: this.onTouchStart.bind(this), onMouseLeave: this.onTouchEnd.bind(this), style: conStyle, disabled: disabled, className: className, onClick: commonEventHander.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this) }, this.props.children));
    }
}

const h$7 = React.createElement;
class Checkbox extends React.Component {
    /** 改变事件 */
    handleChange(e) {
        e.stopPropagation();
        this.props.onChange && this.props.onChange({ value: this.value });
    }
    render() {
        const _a = this.props, { checked, name, color, value, disabled } = _a, nativeProps = __rest(_a, ["checked", "name", "color", "value", "disabled"]);
        return (h$7("input", Object.assign({ ref: dom => {
                if (!dom)
                    return;
                this.inputEl = dom;
                if (this.id)
                    dom.setAttribute('id', this.id);
            }, type: 'checkbox', value: value, name: name, style: { color }, checked: checked, disabled: disabled, onChange: this.handleChange.bind(this) }, nativeProps)));
    }
}

var cssStyle$3 = {"img-empty":{"opacity":"0"},"naruseImg":{"display":"inline-block","overflow":"hidden","position":"relative","fontSize":"0"},"naruseImg__widthfix":{"height":"100%"},"scaletofill":{"objectFit":"contain","width":"100%","height":"100%"},"aspectfit":{"objectFit":"contain","width":"100%","height":"100%"},"aspectfill":{"objectFit":"cover","width":"100%","height":"100%"},"widthfix":{"width":"100%"},"top":{"width":"100%"},"bottom":{"width":"100%","position":"absolute","bottom":"0"},"left":{"height":"100%"},"right":{"position":"absolute","height":"100%","right":"0"},"topright":{"position":"absolute","right":"0"},"bottomleft":{"position":"absolute","bottom":"0"},"bottomright":{"position":"absolute","right":"0","bottom":"0"}};

const h$6 = React.createElement;
class Image$1 extends React.Component {
    constructor(props) {
        super(props);
        /** 当图片加载完毕 */
        this.imageOnLoad = commonEventHander.bind(this);
        this.state = { isLoaded: false };
        this.imageOnLoad = this.imageOnLoad.bind(this);
        this.observer = {};
        this.imgRef = null;
    }
    componentDidMount() {
        if (this.props.lazyLoad) {
            this.observer = new IntersectionObserver((entries) => {
                // 异步 api 关系
                if (entries[entries.length - 1].isIntersecting) {
                    this.setState({ isLoaded: true }, () => {
                        this.imgRef.src = this.props.src;
                    });
                }
            }, { rootMargin: '300px 0px' });
            this.observer.observe(this.imgRef);
        }
    }
    componentWillUnmount() {
        this.observer.disconnect && this.observer.disconnect();
    }
    render() {
        const { className, src, style = {}, mode, onError, imgProps, id, } = this.props;
        const divStyle = Object.assign(Object.assign({}, cssStyle$3.naruseImg), (mode === 'widthFix' ? cssStyle$3.naruseImg__widthfix : {}));
        const imgStyle = cssStyle$3[(mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')];
        return (h$6("div", { onClick: commonEventHander.bind(this), className: className, style: Object.assign(Object.assign({}, divStyle), style) }, h$6("img", Object.assign({ ref: img => (this.imgRef = img), id: id, style: imgStyle, src: src, onLoad: this.imageOnLoad, onError: onError }, imgProps))));
    }
}

const h$5 = React.createElement;
/** 是否是支持的type */
const getTrueType = function getTrueType(type, confirmType, password) {
    if (confirmType === 'search')
        type = 'search';
    if (password)
        type = 'password';
    if (typeof type === 'undefined') {
        return 'text';
    }
    if (!type) {
        throw new Error('unexpected type');
    }
    if (type === 'digit')
        type = 'number';
    return type;
};
/** 修复可控值 */
const fixControlledValue = function fixControlledValue(value) {
    return value !== null && value !== void 0 ? value : '';
};
class Input extends React.Component {
    constructor() {
        super();
        /** 聚焦 */
        this.handleFocus = commonEventHander.bind(this);
        /** 脱焦 */
        this.handleBlur = commonEventHander.bind(this);
        /** 改变 */
        this.handleChange = commonEventHander.bind(this);
        /** 按下 */
        this.handleKeyDown = (e) => {
            const { value } = e.target;
            const keyCode = e.keyCode || e.code;
            commonEventHander.call(this, e);
            keyCode === 13 && this.props.onConfirm && this.props.onConfirm({ value });
        };
        this.inputRef = null;
        this.isOnComposition = false;
        this.onInputExcuted = false;
        this.el = {};
        this.state = { _value: '' };
    }
    componentDidMount() {
        var _a;
        if (this.props.type === 'file') {
            this.fileListener = (e) => {
                this.props.onInput && this.props.onInput(e);
            };
            (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.fileListener);
        }
        Object.defineProperty(this.el, 'value', {
            get: () => { var _a; return (_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.value; },
            set: value => {
                this.setState({
                    _value: value,
                });
            },
            configurable: true,
        });
        setTimeout(() => { var _a; return this.props.focus && ((_a = this.inputRef) === null || _a === void 0 ? void 0 : _a.focus()); });
    }
    setState(arg0) {
        throw new Error('Method not implemented.');
    }
    /** 输入 */
    handleInput(e) {
        e.stopPropagation();
        const { type, maxlength, confirmType, password, } = this.props;
        let { value } = e.target;
        const inputType = getTrueType(type, confirmType, password);
        if (inputType === 'number' && value && maxlength <= value.length) {
            value = value.substring(0, maxlength);
            e.target.value = value;
        }
        this._value = value;
        this.setState({ _value: value });
        commonEventHander.call(this, {
            type: 'input', detail: {
                value,
                cursor: value.length,
            }
        });
    }
    render() {
        const _a = this.props, { type, password, placeholder, disabled, maxlength, confirmType, name, className, value, controlled } = _a; __rest(_a, ["type", "password", "placeholder", "disabled", "maxlength", "confirmType", "name", "className", "value", "controlled"]);
        const { _value } = this.state;
        return (h$5("input", { ref: (input) => {
                this.inputRef = input;
            }, className: className, 
            // 受控则只使用外部值，非受控优先使用外部值
            value: fixControlledValue(controlled ? value : (value !== null && value !== void 0 ? value : _value)), type: getTrueType(type, confirmType, password), placeholder: placeholder, disabled: disabled, maxLength: maxlength, name: name, onInput: this.handleInput.bind(this), onFocus: this.handleFocus.bind(this), onBlur: this.handleBlur.bind(this), onChange: this.handleChange.bind(this), onKeyDown: this.handleKeyDown.bind(this) }));
    }
}

var cssStyle$2 = {"text":{"MozUserSelect":"none","WebkitUserSelect":"none","MsUserSelect":"none","userSelect":"none"},"textSelectable":{"MozUserSelect":"text","WebkitUserSelect":"text","MsUserSelect":"text","userSelect":"text"}};

const h$4 = React.createElement;
class Text extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            hover: false
        };
        this.touch = false;
    }
    /** 当开始点击时 */
    onTouchStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled)
            return;
        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }
    setState(arg0) {
        throw new Error('Method not implemented.');
    }
    /** 点击结束时 */
    onTouchEnd() {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled) {
            return;
        }
        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ hover: false });
            }
        }, hoverStayTime);
    }
    render() {
        const _a = this.props, { className, id, selectable = false, style, hoverStyle } = _a; __rest(_a, ["className", "id", "selectable", "style", "hoverStyle"]);
        const { hover } = this.state;
        const cls = Object.assign(Object.assign(Object.assign(Object.assign({}, cssStyle$2.text), (selectable ? cssStyle$2.textSelectable : {})), style), (hover ? hoverStyle : {}));
        return (h$4("span", { id: id, onMouseEnter: this.onTouchStart.bind(this), onMouseLeave: this.onTouchEnd.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), style: cls, className: className, onClick: commonEventHander.bind(this) }, this.props.children));
    }
}

const h$3 = React.createElement;
class View extends React.Component {
    constructor() {
        super();
        this.state = {
            hover: false
        };
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    /** 当开始点击时 */
    onTouchStart() {
        const { disabled, hoverStartTime = 20 } = this.props;
        if (disabled || !this.mounted)
            return;
        this.touch = true;
        setTimeout(() => {
            this.setState({ hover: true });
        }, hoverStartTime);
    }
    /** 点击结束时 */
    onTouchEnd() {
        const { disabled, hoverStayTime = 70 } = this.props;
        if (disabled || !this.mounted)
            return;
        this.touch = false;
        setTimeout(() => {
            if (!this.touch) {
                this.setState({ hover: false });
            }
        }, hoverStayTime);
    }
    onMouseEnter(event) {
        const { onMouseEnter } = this.props;
        onMouseEnter && onMouseEnter(commonMouseEventCreater(event));
        this.onTouchStart();
    }
    onMouseMove(event) {
        const { onMouseMove } = this.props;
        onMouseMove && onMouseMove(commonMouseEventCreater(event));
    }
    onMouseLeave(event) {
        const { onMouseLeave } = this.props;
        onMouseLeave && onMouseLeave(commonMouseEventCreater(event));
        this.onTouchEnd();
    }
    render() {
        const _a = this.props, { className, style, hoverStyle } = _a; __rest(_a, ["className", "style", "hoverStyle"]);
        const { hover } = this.state;
        const conStyle = Object.assign(Object.assign({}, style), (hover ? hoverStyle : {}));
        return (h$3("div", { onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), onMouseMove: this.onMouseMove.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), className: className, style: conStyle, onClick: commonEventHander.bind(this) }, this.props.children));
    }
}

var cssStyle$1 = {"scroll":{"WebkitOverflowScrolling":"auto"},"scroll::-webkit-scrollbar":{"display":"none"},"scroll-view":{"overflow":"hidden"}};

const h$2 = React.createElement;
function throttle(fn, threshold = 250, scope) {
    let lastTime = 0;
    let deferTimer;
    return function (...args) {
        const context = scope || this;
        const now = Date.now();
        if (now - lastTime > threshold) {
            fn.apply(this, args);
            lastTime = now;
        }
        else {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(() => {
                lastTime = now;
                fn.apply(context, args);
            }, threshold);
        }
    };
}
function easeOutScroll(from = 0, to = 0, callback) {
    if (from === to || typeof from !== 'number') {
        return;
    }
    const change = to - from;
    const dur = 500;
    const sTime = +new Date();
    function linear(t, b, c, d) {
        return (c * t) / d + b;
    }
    const isLarger = to >= from;
    function step() {
        from = linear(+new Date() - sTime, from, change, dur);
        if ((isLarger && from >= to) || (!isLarger && to >= from)) {
            callback(to);
            return;
        }
        callback(from);
        requestAnimationFrame(step);
    }
    step();
}
function scrollIntoView(id) {
    var _a;
    (_a = document.querySelector(`#${id}`)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
    });
}
function scrollVertical(top, isAnimation) {
    if (isAnimation) {
        easeOutScroll(this._scrollTop, top, pos => {
            if (this.container)
                this.container.scrollTop = pos;
        });
    }
    else {
        if (this.container)
            this.container.scrollTop = top;
    }
    this._scrollTop = top;
}
function scrollHorizontal(left, isAnimation) {
    if (isAnimation) {
        easeOutScroll(this._scrollLeft, left, pos => {
            if (this.container)
                this.container.scrollLeft = pos;
        });
    }
    else {
        if (this.container)
            this.container.scrollLeft = left;
    }
    this._scrollLeft = left;
}
const scrollBar$1 = document.createElement('style');
scrollBar$1.type = 'text/css';
scrollBar$1.id = '_theOnlyScrollBar';
scrollBar$1.innerHTML = `
    ._scrollView::-webkit-scrollbar {
        display: none
    }
`;
const head$1 = document.getElementsByTagName('head').item(0);
if (!document.getElementById('_theOnlyScrollBar')) {
    head$1.append(scrollBar$1);
}
class ScrollView extends React.Component {
    constructor() {
        super(...arguments);
        this._scrollTop = undefined;
        this._scrollLeft = undefined;
        this.container = null;
        this.onTouchMove = e => {
            e.stopPropagation();
        };
    }
    componentDidMount() {
        this.props.children;
        this.handleScroll(this.props, true);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleScroll(this.props);
    }
    handleScroll(props, isInit = false) {
        if (props.scrollIntoView &&
            typeof props.scrollIntoView === 'string' &&
            document &&
            document.querySelector &&
            document.querySelector(`#${props.scrollIntoView}`)) {
            if (isInit) {
                setTimeout(() => scrollIntoView(props.scrollIntoView), 500);
            }
            else {
                scrollIntoView(props.scrollIntoView);
            }
        }
        else {
            const isAnimation = 'scrollWithAnimation' in props;
            // Y 轴滚动
            if (props.scrollY && typeof props.scrollTop === 'number' && props.scrollTop !== this._scrollTop) {
                if (isInit) {
                    setTimeout(() => scrollVertical.bind(this)(props.scrollTop, isAnimation), 10);
                }
                else {
                    scrollVertical.bind(this)(props.scrollTop, isAnimation);
                }
            }
            // X 轴滚动
            if (props.scrollX && typeof props.scrollLeft === 'number' && props.scrollLeft !== this._scrollLeft) {
                if (isInit) {
                    setTimeout(() => scrollHorizontal.bind(this)(props.scrollLeft, isAnimation), 10);
                }
                else {
                    scrollHorizontal.bind(this)(props.scrollLeft, isAnimation);
                }
            }
        }
    }
    render() {
        const { className, style = {}, scrollX, scrollY, onScroll, onScrollToUpper, onScrollToLower, onTouchMove, } = this.props;
        let { upperThreshold, lowerThreshold } = this.props;
        upperThreshold = upperThreshold ? Number(upperThreshold) : 0;
        lowerThreshold = lowerThreshold ? Number(lowerThreshold) : 0;
        const scrollWhere = {
            overflowX: (scrollX ? 'scroll' : 'hidden'),
            overflowY: (scrollY ? 'scroll' : 'hidden'),
        };
        const upperAndLower = e => {
            if (!this.container)
                return;
            const { offsetWidth, offsetHeight, scrollLeft, scrollTop, scrollHeight, scrollWidth } = this.container;
            // 滚动到距离顶部/左边多远就触发事件
            if (onScrollToLower &&
                ((this.props.scrollY && offsetHeight + scrollTop + lowerThreshold >= scrollHeight) ||
                    (this.props.scrollX && offsetWidth + scrollLeft + lowerThreshold >= scrollWidth))) {
                onScrollToLower(e);
            }
            if (onScrollToUpper &&
                ((this.props.scrollY && scrollTop <= upperThreshold) || (this.props.scrollX && scrollLeft <= upperThreshold))) {
                onScrollToUpper(e);
            }
        };
        const upperAndLowerThrottle = throttle(upperAndLower, 200);
        const _onScroll = e => {
            const { scrollLeft, scrollTop, scrollHeight, scrollWidth } = this.container;
            this._scrollLeft = scrollLeft;
            this._scrollTop = scrollTop;
            Object.defineProperty(e, 'detail', {
                enumerable: true,
                writable: true,
                value: {
                    scrollLeft,
                    scrollTop,
                    scrollHeight,
                    scrollWidth,
                }
            });
            const event = { type: 'scroll', detail: {
                    scrollLeft,
                    scrollTop,
                    scrollHeight,
                    scrollWidth,
                }, timestamp: new Date().getTime() };
            upperAndLowerThrottle(event);
            onScroll && onScroll(event);
        };
        const _onTouchMove = e => {
            onTouchMove ? onTouchMove(e) : this.onTouchMove(e);
        };
        return (h$2("div", { className: `${className} _scrollView`, ref: container => {
                this.container = container;
            }, style: Object.assign(Object.assign(Object.assign({}, cssStyle$1.scroll), style), scrollWhere), onScroll: _onScroll, onTouchMove: _onTouchMove }, this.props.children));
    }
}
ScrollView.defaultProps = {
    scrollX: false,
    scrollY: false,
    upperThreshold: 50,
    lowerThreshold: 50,
    scrollWithAnimation: false,
};

var cssStyle = {"taroTextarea":{"display":"block","appearance":"none","cursor":"auto","lineHeight":"1.5","resize":"none","outline":"none"}};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const h$1 = React.createElement;
const scrollBar = document.createElement('style');
scrollBar.type = 'text/css';
scrollBar.id = '_theOnlytextarea';
scrollBar.innerHTML = `
    .taroTextareaCore {
        &:focus {
            outline: none;
          }
    }
    .taroTextareaCore::-webkit-scrollbar {
        display: none
    }
`;
const head = document.getElementsByTagName('head').item(0);
if (!document.getElementById('_theOnlytextarea')) {
    head.append(scrollBar);
}
class Textarea extends React.Component {
    constructor() {
        super(...arguments);
        this.textareaRef = null;
        this.el = null;
        this.value = '';
        this.line = 1;
        this.handleLineChange = () => {
            const line = this.getNumberOfLines();
            if (line !== this.line) {
                this.line = line;
                this.textareaRef.rows = line;
            }
        };
        this.getNumberOfLines = () => {
            const ta = this.textareaRef, style = window.getComputedStyle ? window.getComputedStyle(ta) : ta.style, 
            // This will get the line-height only if it is set in the css,
            // otherwise it's "normal"
            taLineHeight = parseInt(style.lineHeight, 10), 
            // Get the scroll height of the textarea
            taHeight = this.calculateContentHeight(ta, taLineHeight), 
            // calculate the number of lines
            numberOfLines = Math.ceil(taHeight / taLineHeight);
            return numberOfLines;
        };
        this.calculateContentHeight = (ta, scanAmount) => {
            let cta = getComputedStyle(ta);
            let origHeight = ta.style.height, height = ta.offsetHeight, scrollHeight = parseFloat(cta.height), overflow = ta.style.overflow, originMinHeight = ta.style.minHeight || null;
            // scrollHeight -= paddingAll;
            /// only bother if the ta is bigger than content
            if (height >= scrollHeight) {
                ta.style.minHeight = 0;
                /// check that our browser supports changing dimension
                /// calculations mid-way through a function call...
                ta.style.height = height + scanAmount + 'px';
                /// because the scrollbar can cause calculation problems
                ta.style.overflow = 'hidden';
                /// by checking that scrollHeight has updated
                if (scrollHeight < ta.scrollHeight) {
                    /// now try and scan the ta's height downwards
                    /// until scrollHeight becomes larger than height
                    while (ta.offsetHeight >= ta.scrollHeight) {
                        ta.style.height = (height -= scanAmount) + 'px';
                    }
                    /// be more specific to get the exact height
                    while (ta.offsetHeight < ta.scrollHeight) {
                        ta.style.height = height++ + 'px';
                    }
                    /// reset the ta back to it's original height
                    ta.style.height = origHeight;
                    /// put the overflow back
                    ta.style.overflow = overflow;
                    ta.style.minHeight = originMinHeight;
                    return height;
                }
            }
            else {
                return scrollHeight;
            }
        };
    }
    componentDidMount() {
        const { value = '' } = this.props;
        if (value != '') {
            this.textareaRef.value = value;
        }
    }
    render() {
        const { style, placeholder, disabled, maxLength, autoFocus, autoHeight, name, nativeProps, onInput, onFocus, onBlur, onConfirm } = this.props;
        const otherProps = {};
        if (autoHeight) {
            otherProps.rows = this.line;
            cssStyle.taroTextarea.height = 'auto';
        }
        const _onInput = (e) => {
            const { value } = this.textareaRef;
            const event = {
                type: 'input', detail: {
                    value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onInput && onInput(event);
            if (autoHeight)
                this.handleLineChange();
        };
        const _onFocus = (e) => {
            const { value } = this.textareaRef;
            const event = {
                type: 'focus', detail: {
                    value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onFocus && onFocus(event);
        };
        const _onBlur = (e) => {
            const { value } = this.textareaRef;
            const event = {
                type: 'blur', detail: {
                    value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onBlur && onBlur(event);
        };
        const _onConfirm = (e) => {
            if (e.keyCode === 13) {
                const { value } = this.textareaRef;
                const event = {
                    type: 'confirm', detail: {
                        value,
                        cursor: value.length,
                    }, timestamp: new Date().getTime()
                };
                onConfirm && onConfirm(event);
            }
        };
        return (h$1("textarea", Object.assign({ ref: input => {
                if (input) {
                    this.textareaRef = input;
                }
            }, style: Object.assign(Object.assign({}, style), cssStyle.taroTextarea), className: 'taroTextareaCore', placeholder: placeholder, name: name, disabled: !!disabled, maxLength: maxLength, autoFocus: autoFocus, onInput: _onInput, onFocus: _onFocus, onBlur: _onBlur, onKeyUp: _onConfirm }, nativeProps, otherProps)));
    }
}
Textarea.defaultProps = {
    disabled: false,
    maxlength: 140,
    readonly: false,
    focus: false,
    autoHeight: false,
    showCount: true,
    controlled: false,
};

/** 组件映射表 */
const componentReflectMap = {
    button: Button,
    checkbox: Checkbox,
    image: Image$1,
    input: Input,
    text: Text,
    view: View,
    'scroll-view': ScrollView,
    textarea: Textarea,
};
/**
 * @description 拦截下来的react.createElement
 * @author CHC
 * @date 2022-03-17 17:03:42
 * @param {*} type
 * @param {*} props
 * @param {*} children
 */
const naruseCreateElement = (type, props, ...children) => {
    transformRpx(props);
    if (typeof type === 'string') {
        const Component = componentReflectMap[type];
        if (!Component) {
            logger.warn('不支持的组件类型', type);
            return naruseCreateElement('view', null, `不支持的组件类型-${type}`);
        }
        return React.createElement(Component, props, ...children);
    }
    if (type.prototype instanceof React.Component) {
        return React.createElement(type, props, ...children);
    }
    if (typeof type === 'function') {
        props && (props.children = children);
        return type(props);
    }
    logger.warn('不支持的组件类型', type);
};
const rpxReg = /(\d+)\s?rpx/g;
const parsePx = val => {
    if (typeof val !== 'string')
        return val;
    const matchRes = val.match(rpxReg);
    if (!matchRes)
        return val;
    matchRes.forEach((item) => {
        const num = parseFloat(item);
        // 按照手机和电脑的比例进行换算
        val = val.replace(item, `${(num / 2 * 1.4).toFixed(1)}px`);
    });
    return val;
};
/**
 * @description 将所有的rpx转换为px
 * @author CHC
 * @date 2022-03-25 15:03:47
 * @param {*} [props={}]
 * @returns {*}
 */
const transformRpx = (props = {}) => {
    if (!props)
        return;
    const { style } = props;
    if (style && typeof style === 'object') {
        for (const key in style) {
            style[key] = parsePx(style[key]);
        }
    }
};

var n=function(e,r){return (n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r;}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);})(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function t(){this.constructor=e;}n(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t);}const A="Identifier",v="Literal",i="Program",g="Property",K="FunctionDeclaration",Z="FunctionExpression",ee="ExpressionStatement",b="ObjectPattern",u="ArrayPattern",o="AssignmentPattern",w="ObjectExpression",x="ArrayExpression",k="AssignmentExpression",E="MemberExpression",$="RestElement",C="SpreadElement",re="DoWhileStatement",te="DebuggerStatement",ne="ContinueStatement",oe="BreakStatement",S="CallExpression",ae="YieldExpression",ie="ImportBatchSpecifier",ue="ImportSpecifier",se="ImportDeclaration",ce="ExportSpecifier",le="ExportBatchSpecifier",fe="ExportDeclaration",pe="ClassDeclaration",de="ClassExpression",he="ClassBody",t="ArrowFunctionExpression",me="TemplateLiteral",ye="MethodDefinition",ve="SequenceExpression",ge="ParenthesizedExpression",be="NewExpression",we="UpdateExpression",xe="BinaryExpression",ke="LogicalExpression",Ee="UnaryExpression",$e="VariableDeclaration",Ce="IfStatement",Se="ReturnStatement",Ae="SwitchCase",Ie="SwitchStatement",Oe="ThrowStatement",Ve="TaggedTemplateExpression",Re="TryStatement",Fe="CatchClause",Te="WhileStatement",De="EmptyStatement",je="LabeledStatement",Ue="BlockStatement",Ne="ForInStatement",Pe="ForOfStatement",qe="ForStatement",Be="VariableDeclarator",Le="ThisExpression",Me="ConditionalExpression",_e="ImportExpression";r(Xe,ze=Error);var ze,He,Ye,e=Xe;function Xe(){var e=null!==ze&&ze.apply(this,arguments)||this;return e.isEvaluateError=!0,e}function Je(){return null!==He&&He.apply(this,arguments)||this}function We(){return null!==Ye&&Ye.apply(this,arguments)||this}r(Je,He=e),r(We,Ye=e);var s,c={notYetDefined:[1e3,"未定义的变量: %0",We],duplicateDefinition:[1001,"变量重复定义: %0",We],notCallableFunction:[1002,"不是可调用的函数: %0",We],notSupportNode:[1003,"尚未支持的node类型: %0",e],notHasSomeProperty:[1004,"对象不存在对应属性: %0",We],runTimeError:[1005,"运行错误 %0",e],deconstructNotArray:[1006,"解构应为一个数组: %0",We],deconstructNotObject:[1007,"解构应为一个对象: %0",We],notHasImport:[1008,"未初始化函数: %0",We]},l=function(e,r,t,n){var r=e[1].replace("%0",String(r)),o=(t&&n&&(o=t.loc,n=n.slice(t.start,t.end),n="错误代码: ".concat(n),o&&(n+=" [".concat(o.start.line,":").concat(o.start.column,"-").concat(o.end.line,":").concat(o.end.column,"]")),r="".concat(r," \n ").concat(n)),new e[2](r));return o.nodeLoc=t,o},Qe=0,Ge={},Ke={},Ze={result:void 0},er=[setTimeout,setInterval,clearInterval,clearTimeout],rr=((e={})[i]=function(e,r){for(var t=0,n=e.body;t<n.length;t++)f(n[t],r);},e[A]=function(e,r){if("undefined"!==e.name){r=r.$find(e.name);if(r)return r.$get();throw l(c.notYetDefined,e.name,e,s.source)}},e[v]=function(e){return e.value},e[Ue]=function(e,r){for(var t=r.invasived?r:new ir("block",r),n=0,o=e.body;n<o.length;n++){var a=f(o[n],t);if(a===Ge||a===Ke||a===Ze)return a}},e[De]=function(){},e[ee]=function(e,r){f(e.expression,r);},e[Se]=function(e,r){return Ze.result=e.argument?f(e.argument,r):void 0,Ze},e[oe]=function(){return Ge},e[ne]=function(){return Ke},e[Ce]=function(e,r){return f(e.test,r)?f(e.consequent,r):e.alternate?f(e.alternate,r):void 0},e[qe]=function(e,r){var t=new ir("loop",r);for(e.init&&f(e.init,t);!e.test||f(e.test,t);e.update&&f(e.update,t)){var n=f({type:"BlockStatement",body:e.body},t);if(n===Ge)break;if(n!==Ke&&n===Ze)return n}},e[K]=function(e,r){var t=rr[Z](e,r),n=(e.id||{name:"anonymous".concat(Qe++)}).name;if(r.$var(n,t))return t;throw l(c.duplicateDefinition,n,e,s.source)},e[$e]=function(e,r){for(var t=e.kind,n=0,o=e.declarations;n<o.length;n++){var a=o[n],i=a.id,a=a.init,a=a?f(a,r):void 0;if(i.type===A){var u=i.name;if(!r.$declar(t,u,a))throw l(c.duplicateDefinition,u,e,s.source)}else rr[i.type](i,r,t,a);}},e[u]=function(n,o,a,i){var e=n.elements;if(!Array.isArray(i))throw l(c.deconstructNotArray,i,n,s.source);e.forEach(function(e,r){if(e)if(e.type===A){var t=e.name;if(!o.$declar(a,t,i[r]))throw l(c.duplicateDefinition,t,n,s.source)}else rr[e.type](e,o,a,i[r]);});},e[b]=function(n,o,a,i){n.properties.forEach(function(e){if(e.type===g){var r=e.key,t=e.value,e=e.computed?f(r,o):r.name;if(t.type===A){r=t.name;if(!o.$declar(a,r,i[e]))throw l(c.duplicateDefinition,r,n,s.source)}else rr[t.type](t,o,a,i[e]);}});},e[o]=function(e,r,t,n){var o=e.left,a=e.right,a=void 0===n?f(a,r):n;if(o.type===A){n=o.name;if(!r.$declar(t,n,a))throw l(c.duplicateDefinition,n,e,s.source)}else rr[o.type](o,r,t,a);},e[Le]=function(e,r){r=r.$find("this");return r?r.$get():null},e[x]=function(e,r){return e.elements.map(function(e){return e?f(e,r):null})},e[w]=function(e,r){for(var t={},n=0,o=e.properties;n<o.length;n++){var a=o[n];if(a.type!==g)throw l(c.notSupportNode,a.type,e,s.source);var i=a.kind,u=void 0,a=(a.computed||a.key.type===v?u=f(a.key,r):a.key.type===A&&(u=a.key.name),f(a.value,r));"init"===i?t[u]=a:"set"===i?Object.defineProperty(t,u,{set:a}):"get"===i&&Object.defineProperty(t,u,{get:a});}return t},e[Z]=function(t,a,i){function e(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var o=new ir("function",a);if(o.invasived=!0,t.params.forEach(function(e,r){var t;e.type===A?(t=e.name,o.$var(t,n[r])):rr[e.type](e,o,"var",n[r]);}),i){var r=a.$find("this").$get();if(o.$const("this",r||null),r=f(t.body,o),t.body.type!==Ue)return r}else o.$const("this",this),o.$const("arguments",arguments),r=f(t.body,o);if(r===Ze)return r.result}return (i=void 0===i?!1:i)&&Object.defineProperty(e,"prototype",{value:void 0}),Object.defineProperty(e,"length",{value:t.params.length}),Object.defineProperty(e,"toString",{value:function(){return s.source.slice(t.start,t.end)}}),e},e[Ee]=function(n,o){return {"-":function(){return -f(n.argument,o)},"+":function(){return +f(n.argument,o)},"!":function(){return !f(n.argument,o)},"~":function(){return ~f(n.argument,o)},void:function(){f(n.argument,o);},typeof:function(){var e;return n.argument.type===A?(e=o.$find(n.argument.name))?typeof e.$get():"undefined":typeof f(n.argument,o)},delete:function(){var e,r;if(n.argument.type===E)return e=(t=n.argument).object,r=t.property,t.computed?delete f(e,o)[f(r,o)]:delete f(e,o)[r.name];if(n.argument.type===A){var t=o.$find("this");if(t)return t.$get()[n.argument.name]}}}[n.operator]()},e[we]=function(e,r){var t,n,o=e.prefix;if(e.argument.type===A){var a,i=e.argument.name;if(!(a=r.$find(i)))throw l(c.notYetDefined,i,e,s.source)}else e.argument.type===E&&(i=e.argument,t=f(i.object,r),n=i.computed?f(i.property,r):i.property.name,a={$set:function(e){return t[n]=e,!0},$get:function(){return t[n]}});return {"--":function(e){return a.$set(e-1),o?--e:e--},"++":function(e){return a.$set(e+1),o?++e:e++}}[e.operator](f(e.argument,r))},e[xe]=function(e,r){return {"==":function(e,r){return e==r},"!=":function(e,r){return e!=r},"===":function(e,r){return e===r},"!==":function(e,r){return e!==r},"<":function(e,r){return e<r},"<=":function(e,r){return e<=r},">":function(e,r){return r<e},">=":function(e,r){return r<=e},"+":function(e,r){return e+r},"-":function(e,r){return e-r},"*":function(e,r){return e*r},"**":function(e,r){return Math.pow(e,r)},"/":function(e,r){return e/r},"%":function(e,r){return e%r},"|":function(e,r){return e|r},"^":function(e,r){return e^r},"&":function(e,r){return e&r},"<<":function(e,r){return e<<r},">>":function(e,r){return e>>r},">>>":function(e,r){return e>>>r},in:function(e,r){return e in r},instanceof:function(e,r){return e instanceof r}}[e.operator](f(e.left,r),f(e.right,r))},e[k]=function(e,r){var t=e.left;if(t.type===A){var n=t.name,o=r.$find(n);if(!o)throw l(c.notYetDefined,n,e,s.source);u=o;}else {if(t.type!==E)throw l(c.notSupportNode,t.type,e,s.source);var n=t.object,o=t.property,t=t.computed,a=f(n,r),i=t?f(o,r):o.name,u={$set:function(e){return a[i]=e,!0},$get:function(){return a[i]}};}return {"=":function(e){return u.$set(e),e},"+=":function(e){return u.$set(u.$get()+e),u.$get()},"-=":function(e){return u.$set(u.$get()-e),u.$get()},"*=":function(e){return u.$set(u.$get()*e),u.$get()},"**=":function(e){return u.$set(Math.pow(u.$get(),e)),u.$get()},"/=":function(e){return u.$set(u.$get()/e),u.$get()},"%=":function(e){return u.$set(u.$get()%e),u.$get()},"|=":function(e){return u.$set(u.$get()|e),u.$get()},"<<=":function(e){return u.$set(u.$get()<<e),u.$get()},">>=":function(e){return u.$set(u.$get()>>e),u.$get()},">>>=":function(e){return u.$set(u.$get()>>>e),u.$get()},"^=":function(e){return u.$set(u.$get()^e),u.$get()},"&=":function(e){return u.$set(u.$get()&e),u.$get()}}[e.operator](f(e.right,r))},e[ke]=function(r,t){return {"||":function(){return f(r.left,t)||f(r.right,t)},"&&":function(){return f(r.left,t)&&f(r.right,t)},"??":function(){var e;return null!=(e=f(r.left,t))?e:f(r.right,t)}}[r.operator]()},e[E]=function(e,r){var t=e.object,n=e.property;return e.computed?f(t,r)[f(n,r)]:f(t,r)[n.name]},e[Me]=function(e,r){return f(e.test,r)?f(e.consequent,r):f(e.alternate,r)},e[S]=function(e,r){var t=null,n=null;if(e.callee.type===E){var o=e.callee,a=o.object,i=o.property,o=o.computed,t=f(a,r),a=o?rr[i.type](i,r):i.name;if(null==t)throw l(c.notHasSomeProperty,a,e,s.source);n=t[a];}else t=r.$find("this").$get(),n=f(e.callee,r);if("function"!=typeof n)throw l(c.notCallableFunction,n,e,s.source);return er.includes(n)&&(t=null),n.apply(t,e.arguments.map(function(e){return f(e,r)}))},e[be]=function(e,r){var t=f(e.callee,r),e=e.arguments.map(function(e){return f(e,r)});return new(t.bind.apply(t,function(e,r,t){if(t||2===arguments.length)for(var n,o=0,a=r.length;o<a;o++)!n&&o in r||((n=n||Array.prototype.slice.call(r,0,o))[o]=r[o]);return e.concat(n||Array.prototype.slice.call(r))}([void 0],e,!1)))},e[ve]=function(e,r){for(var t=0,n=e.expressions;t<n.length;t++)var o=f(n[t],r);return o},e[Oe]=function(e,r){throw f(e.argument,r)},e[Re]=function(r,t){try{return f(r.block,t)}catch(e){var n,o;if(r.handler)return n=r.handler.param,(o=new ir("block",t)).invasived=!0,o.$const(null==n?void 0:n.name,e),f(r.handler,o);throw e}finally{if(r.finalizer)return f(r.finalizer,t)}},e[Fe]=function(e,r){return f(e.body,r)},e[Ie]=function(e,r){for(var t=f(e.discriminant,r),n=new ir("switch",r),o=!1,a=0,i=e.cases;a<i.length;a++){var u=i[a];if(o=o||u.test&&t!==f(u.test,n)?o:!0){u=f(u,n);if(u===Ge)break;if(u===Ke||u===Ze)return u}}},e[Ae]=function(e,r){for(var t=0,n=e.consequent;t<n.length;t++){var o=f(n[t],r);if(o===Ge||o===Ke||o===Ze)return o}},e[Te]=function(e,r){for(;f(e.test,r);){var t=new ir("loop",r),t=(t.invasived=!0,f(e.body,t));if(t===Ge)break;if(t!==Ke&&t===Ze)return t}},e[re]=function(e,r){do{var t=new ir("loop",r),t=(t.invasived=!0,f(e.body,t));if(t===Ge)break;if(t!==Ke&&t===Ze)return t}while(f(e.test,r))},e[t]=function(e,r){return rr[Z](e,r,!0)},e[Ne]=function(n,o,e){void 0===e&&(e=!1);function r(e){var r,t=new ir("loop",o);return t.invasived=!0,i.type===A?(r=i.name,t.$declar(a,r,e)):rr[i.type](i,t,a,e),f(n.body,t)}var a=n.left.kind,i=n.left.declarations[0].id,t=f(n.right,o);if(e)for(var u,s=0;s<t.length;s++){if((u=r(t[s]))===Ge)break;if(u!==Ke&&u===Ze)return u}else for(var c in t){if((u=r(c))===Ge)break;if(u!==Ke&&u===Ze)return u}},e[me]=function(t,n){return t.quasis.map(function(e,r){return e.tail?e.value.raw:e.value.raw+f(t.expressions[r],n)}).join("")},e[_e]=function(e,r){var t=f(e.source,r),r=r.$find("$$import");if(r)return r.$get()(t);throw l(c.notHasImport,"$$import",e,s.source)},e[Pe]=function(e,r){return rr[Ne](e,r,!0)},e),tr=(nr.prototype.$set=function(e){return "const"!==this.value&&(this.value=e,!0)},nr.prototype.$get=function(){return this.value},nr);function nr(e,r){this.value=r,this.kind=e;}ur.prototype.$find=function(e){var r=this.prefix+e;return this.content.hasOwnProperty(r)?this.content[r]:this.parent?this.parent.$find(e):null},ur.prototype.$let=function(e,r){e=this.prefix+e;return !this.content[e]&&(this.content[e]=new tr("let",r),!0)},ur.prototype.$const=function(e,r){e=this.prefix+e;return !this.content[e]&&(this.content[e]=new tr("const",r),!0)},ur.prototype.$var=function(e,r){for(var e=this.prefix+e,t=this;null!==t.parent&&"function"!==t.type;)t=t.parent;return !t.content[e]&&(this.content[e]=new tr("var",r),!0)},ur.prototype.$declar=function(e,r,t){var n=this;return {var:function(){return n.$var(r,t)},let:function(){return n.$let(r,t)},const:function(){return n.$const(r,t)}}[e]()};var I,O,or,ar,ir=ur;function ur(e,r){this.content={},this.prefix="",this.invasived=!1,this.type=e,this.parent=r||null;}function f(r,e,t){t=(s=t?t:s).traceId++;s.traceStack.push(t);try{var n=function(e,r){if(rr[e.type])return r=rr[e.type](e,r),s.currentNode=e,r;throw l(c.notSupportNode,e.type,e,s.source)}(r,e);return s.traceStack.pop(),n}catch(e){if(e.isEvaluateError)throw e;if(s.traceStack[s.traceStack.length-1]===t)throw l(c.runTimeError,null==e?void 0:e.message,r,s.source);throw e}}const sr={version:"0.12.x"};sr.parse=function(e,r){O=String(e),or=O.length,lr(r),rn();var e=I.locations?[p,en()]:p,t=(Cr(),I.program||y(e)),n=!0;for(t.body||(t.body=[]);R!==Rr;){var o=zn(!0,!0);t.body.push(o),n&&In(o)&&Cn(!0),n=!1;}return M(),z(t,i)};var cr=sr.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1};function lr(e){for(var r in I={},cr)I[r]=(e&&Dn(e,r)?e:cr)[r];ar=I.sourceFile||null,zt=6<=I.ecmaVersion?_t:Mt;}sr.parseExpressionAt=function(e,r,t){return O=String(e),or=O.length,lr(t),rn(r),Cr(),W()};var p,V,fr,pr,dr,R,F,hr,mr,yr,a,vr,gr,br,wr,xr,T,kr,Er=sr.getLineInfo=function(e,r){for(var t=1,n=0;;){Qt.lastIndex=n;var o=Qt.exec(e);if(!(o&&o.index<r))break;++t,n=o.index+o[0].length;}return {line:t,column:r-n}};function $r(){this.type=R,this.value=F,this.start=V,this.end=fr,I.locations&&(this.loc=new An,this.loc.end=dr),I.ranges&&(this.range=[V,fr]);}function Cr(){vr=gr=p,I.locations&&(br=en()),wr=xr=!1,T=[],pn(),mn();}function D(e,r){var t=Er(O,e),r=(r+=" ("+t.line+":"+t.column+")",new SyntaxError(r));throw r.pos=e,r.loc=t,r.raisedAt=p,r}sr.Token=$r,sr.tokenize=function(e,r){function t(){return gr=fr,mn(),new $r}return O=String(e),or=O.length,lr(r),rn(),pn(),t.jumpTo=function(e,r){var t;if(p=e,I.locations)for(yr=1,a=Qt.lastIndex=0;(t=Qt.exec(O))&&t.index<e;)++yr,a=t.index+t[0].length;mr=!!r,pn();},t.current=function(){return new $r},"undefined"!=typeof Symbol&&(t[Symbol.iterator]=function(){return {next:function(){var e=t();return {done:e.type===Rr,value:e}}}}),t.options=I,t};var Sr,Ar=[],Ir={type:"num"},Or={type:"regexp"},Vr={type:"string"},j={type:"name"},Rr={type:"eof"},Fr={keyword:"break"},Tr={keyword:"case",beforeExpr:!0},Dr={keyword:"catch"},jr={keyword:"continue"},Ur={keyword:"debugger"},Nr={keyword:"default"},Pr={keyword:"do",isLoop:!0},qr={keyword:"else",beforeExpr:!0},Br={keyword:"finally"},Lr={keyword:"for",isLoop:!0},Mr={keyword:"function"},_r={keyword:"if"},zr={keyword:"return",beforeExpr:!0},Hr={keyword:"switch"},Yr={keyword:"throw",beforeExpr:!0},Xr={keyword:"try"},Jr={keyword:"var"},Wr={keyword:"let"},Qr={keyword:"const"},Gr={keyword:"while",isLoop:!0},Kr={keyword:"with"},Zr={keyword:"new",beforeExpr:!0},et={keyword:"this"},rt={keyword:"class"},tt={keyword:"extends",beforeExpr:!0},nt={keyword:"export"},ot={keyword:"import"},at={keyword:"yield",beforeExpr:!0},it={keyword:"null",atomValue:null},ut={keyword:"true",atomValue:!0},st={keyword:"false",atomValue:!1},ct={keyword:"in",binop:7,beforeExpr:!0},lt={break:Fr,case:Tr,catch:Dr,continue:jr,debugger:Ur,default:Nr,do:Pr,else:qr,finally:Br,for:Lr,function:Mr,if:_r,return:zr,switch:Hr,throw:Yr,try:Xr,var:Jr,let:Wr,const:Qr,while:Gr,with:Kr,null:it,true:ut,false:st,new:Zr,in:ct,instanceof:{keyword:"instanceof",binop:7,beforeExpr:!0},this:et,typeof:{keyword:"typeof",prefix:!0,beforeExpr:!0},void:{keyword:"void",prefix:!0,beforeExpr:!0},delete:{keyword:"delete",prefix:!0,beforeExpr:!0},class:rt,extends:tt,export:nt,import:ot,yield:at},ft={type:"[",beforeExpr:!0},pt={type:"]"},U={type:"{",beforeExpr:!0},N={type:"}"},P={type:"(",beforeExpr:!0},q={type:")"},B={type:",",beforeExpr:!0},L={type:";",beforeExpr:!0},dt={type:":",beforeExpr:!0},ht={type:"."},mt={type:"?",beforeExpr:!0},yt={type:"=>",beforeExpr:!0},vt={type:"template"},gt={type:"...",beforeExpr:!0},bt={type:"`"},wt={type:"${",beforeExpr:!0},xt={binop:10,beforeExpr:!0},kt={isAssign:!0,beforeExpr:!0},Et={isAssign:!0,beforeExpr:!0},$t={postfix:!0,prefix:!0,isUpdate:!0},Ct={prefix:!0,beforeExpr:!0},St={binop:1,beforeExpr:!0},At={binop:2,beforeExpr:!0},It={binop:3,beforeExpr:!0},Ot={binop:4,beforeExpr:!0},Vt={binop:5,beforeExpr:!0},Rt={binop:6,beforeExpr:!0},Ft={binop:7,beforeExpr:!0},Tt={binop:8,beforeExpr:!0},Dt={binop:9,prefix:!0,beforeExpr:!0},jt={binop:10,beforeExpr:!0},Ut={binop:10,beforeExpr:!0};for(Sr in sr.tokTypes={bracketL:ft,bracketR:pt,braceL:U,braceR:N,parenL:P,parenR:q,comma:B,semi:L,colon:dt,dot:ht,ellipsis:gt,question:mt,slash:xt,eq:kt,name:j,eof:Rr,num:Ir,regexp:Or,string:Vr,arrow:yt,template:vt,star:Ut,assign:Et,backQuote:bt,dollarBraceL:wt},lt)sr.tokTypes["_"+Sr]=lt[Sr];function Nt(r){return r=r.split(" "),e=>r.includes(e)}var Pt=Nt("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),qt=Nt("class enum extends super const export import"),Bt=Nt("implements interface let package private protected public static yield"),Lt=Nt("eval arguments"),e="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",Mt=Nt(e),_t=Nt(e+" let const class extends export import yield"),zt=Mt,Ht=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,e="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",Yt=new RegExp("["+e+"]"),Xt=new RegExp("["+e+"̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧙ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿]"),Jt=/[\n\r\u2028\u2029]/;function Wt(e){return 10===e||13===e||8232===e||8233==e}var Qt=/\r\n|[\n\r\u2028\u2029]/g,Gt=sr.isIdentifierStart=function(e){return e<65?36===e:e<91||(e<97?95===e:e<123||170<=e&&Yt.test(String.fromCharCode(e)))},Kt=sr.isIdentifierChar=function(e){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||170<=e&&Xt.test(String.fromCharCode(e))))};function Zt(e,r){this.line=e,this.column=r;}function en(){return new Zt(yr,p-a)}function rn(e){e?(p=e,a=Math.max(0,O.lastIndexOf("\n",e)),yr=O.slice(0,a).split(Jt).length):(yr=1,p=a=0),R=Rr,hr=[tn],kr=!(mr=!0),0===p&&I.allowHashBang&&"#!"===O.slice(0,2)&&fn(2);}var tn={token:"{",isExpr:!(Zt.prototype.offset=function(e){return new Zt(this.line,this.column+e)})},nn={token:"{",isExpr:!0},on={token:"${",isExpr:!0},an={token:"(",isExpr:!1},un={token:"(",isExpr:!0},sn={token:"`",isExpr:!0},cn={token:"function",isExpr:!0};function ln(){return hr[hr.length-1]}function d(e,r){fr=p,I.locations&&(dr=en());var t,n=R,o=!1;F=r,(R=e)===q||e===N?(r=hr.pop())===on?o=!0:mr=r===tn&&ln()===cn?(hr.pop(),!1):!(r&&r.isExpr):e===U?(hr.push(((r=n)===dt&&"{"==(t=ln()).token?t.isExpr:r===zr?!Jt.test(O.slice(gr,V)):r!==qr&&r!==L&&r!==Rr&&(r==U?ln()!==tn:mr))?nn:tn),mr=!0):e===wt?(hr.push(on),mr=!0):e==P?(t=n===_r||n===Lr||n===Kr||n===Gr,hr.push(t?an:un),mr=!0):e!=$t&&(mr=(!e.keyword||n!=ht)&&(e==Mr?(ln()!==tn&&hr.push(cn),!1):e===bt?(ln()===sn?hr.pop():(hr.push(sn),o=!0),!1):e.beforeExpr)),o||pn();}function fn(e){for(var r=O.charCodeAt(p+=e);p<or&&10!==r&&13!==r&&8232!==r&&8233!==r;)++p,r=O.charCodeAt(p);}function pn(){for(;p<or;){var e,r=O.charCodeAt(p);if(32===r)++p;else if(13===r)++p,10===(e=O.charCodeAt(p))&&++p,I.locations&&(++yr,a=p);else if(10===r||8232===r||8233===r)++p,I.locations&&(++yr,a=p);else if(8<r&&r<14)++p;else if(47===r)if(42===(e=O.charCodeAt(p+1))){t=o=n=void 0;var t,n=p,o=O.indexOf("*/",p+=2);if(-1===o&&D(p-2,"Unterminated comment"),p=o+2,I.locations)for(Qt.lastIndex=n;(t=Qt.exec(O))&&t.index<p;)++yr,a=t.index+t[0].length;}else {if(47!==e)break;fn(2);}else if(160===r)++p;else {if(!(5760<=r&&Ht.test(String.fromCharCode(r))))break;++p;}}}function dn(){var e=O.charCodeAt(p+1);if(mr){for(var r,t,n="",o=++p;;){or<=p&&D(o,"Unterminated regular expression");var a=O.charAt(p);if(Jt.test(a)&&D(o,"Unterminated regular expression"),r)r=!1;else {if("["===a)t=!0;else if("]"===a&&t)t=!1;else if("/"===a&&!t)break;r="\\"===a;}++p;}var i,n=O.slice(o,p),u=(++p,En()),s=n;u&&(i=/^[gmsiy]*$/,(i=6<=I.ecmaVersion?/^[gmsiyu]*$/:i).test(u)||D(o,"Invalid regular expression flag"),0<=u.indexOf("u")&&!vn&&(s=s.replace(/\\u\{([0-9a-fA-F]{5,6})\}/g,"x").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x")));try{new RegExp(s);}catch(e){e instanceof SyntaxError&&D(o,"Error parsing regular expression: "+e.message),D(e);}try{var c=new RegExp(n,u);}catch(e){c=null;}return d(Or,{pattern:n,flags:u,value:c})}return 61===e?h(Et,2):h(xt,1)}function hn(e){switch(e){case 46:var r=O.charCodeAt(p+1);if(48<=r&&r<=57)return wn(!0);var t=O.charCodeAt(p+2);return 6<=I.ecmaVersion&&46===r&&46===t?(p+=3,d(gt)):(++p,d(ht));case 40:return ++p,d(P);case 41:return ++p,d(q);case 59:return ++p,d(L);case 44:return ++p,d(B);case 91:return ++p,d(ft);case 93:return ++p,d(pt);case 123:return ++p,d(U);case 125:return ++p,d(N);case 58:return ++p,d(dt);case 63:return ++p,d(mt);case 96:return 6<=I.ecmaVersion&&(++p,d(bt));case 48:r=O.charCodeAt(p+1);if(120===r||88===r)return bn(16);if(6<=I.ecmaVersion){if(111===r||79===r)return bn(8);if(98===r||66===r)return bn(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return wn(!1);case 34:case 39:for(var n=e,o="",a=++p;;){or<=p&&D(V,"Unterminated string constant");var i=O.charCodeAt(p);if(i===n)break;92===i?(o=(o+=O.slice(a,p))+xn(),a=p):(Wt(i)&&D(V,"Unterminated string constant"),++p);}return o+=O.slice(a,p++),d(Vr,o);case 47:return dn();case 37:case 42:return t=e,61===O.charCodeAt(p+1)?h(Et,2):h(42===t?Ut:jt,1);case 124:case 38:return l=e,(f=O.charCodeAt(p+1))===l?h(124===l?St:At,2):61===f?h(Et,2):h(124===l?It:Vt,1);case 94:return 61===O.charCodeAt(p+1)?h(Et,2):h(Ot,1);case 43:case 45:return f=e,(l=O.charCodeAt(p+1))===f?45==l&&62==O.charCodeAt(p+2)&&Jt.test(O.slice(gr,p))?(fn(3),pn(),mn()):h($t,2):61===l?h(Et,2):h(Dt,1);case 60:case 62:return u=e,s=O.charCodeAt(p+1),c=1,s===u?(c=62===u&&62===O.charCodeAt(p+2)?3:2,61===O.charCodeAt(p+c)?h(Et,c+1):h(Tt,c)):33==s&&60==u&&45==O.charCodeAt(p+2)&&45==O.charCodeAt(p+3)?(fn(4),pn(),mn()):(61===s&&(c=61===O.charCodeAt(p+2)?3:2),h(Ft,c));case 61:case 33:return u=e,61===(s=O.charCodeAt(p+1))?h(Rt,61===O.charCodeAt(p+2)?3:2):61===u&&62===s&&6<=I.ecmaVersion?(p+=2,d(yt)):h(61===u?kt:Ct,1);case 126:return h(Ct,1)}var u,s,c,l,f;return !1}function mn(){if(V=p,I.locations&&(pr=en()),or<=p)return d(Rr);if(ln()!==sn){var e=O.charCodeAt(p);if(Gt(e)||92===e)return $n();var r=hn(e);if(!1===r){e=String.fromCharCode(e);if("\\"===e||Yt.test(e))return $n();D(p,"Unexpected character '"+e+"'");}return r}for(var t="",n=p;;){or<=p&&D(V,"Unterminated template");var o=O.charCodeAt(p);if(96===o||36===o&&123===O.charCodeAt(p+1))return p===V&&R===vt?36===o?(p+=2,d(wt)):(++p,d(bt)):(t+=O.slice(n,p),d(vt,t));92===o?(t=(t+=O.slice(n,p))+xn(),n=p):Wt(o)?(t+=O.slice(n,p),++p,13===o&&10===O.charCodeAt(p)?(++p,t+="\n"):t+=String.fromCharCode(o),I.locations&&(++yr,a=p),n=p):++p;}}function h(e,r){var t=O.slice(p,p+r);p+=r,d(e,t);}var yn,vn=!1;try{new RegExp("￿","u"),vn=!0;}catch(e){}function gn(e,r){for(var t=p,n=0,o=0,a=null==r?1/0:r;o<a;++o){var i=O.charCodeAt(p),i=97<=i?i-97+10:65<=i?i-65+10:48<=i&&i<=57?i-48:1/0;if(e<=i)break;++p,n=n*e+i;}return p===t||null!=r&&p-t!==r?null:n}function bn(e){p+=2;var r=gn(e);return null==r&&D(V+2,"Expected number in radix "+e),Gt(O.charCodeAt(p))&&D(p,"Identifier directly after number"),d(Ir,r)}function wn(e){var r,t=p,n=!1,o=48===O.charCodeAt(p),e=(e||null!==gn(10)||D(t,"Invalid number"),46===O.charCodeAt(p)&&(++p,gn(10),n=!0),O.charCodeAt(p)),e=(69!==e&&101!==e||(43!==(e=O.charCodeAt(++p))&&45!==e||++p,null===gn(10)&&D(t,"Invalid number"),n=!0),Gt(O.charCodeAt(p))&&D(p,"Identifier directly after number"),O.slice(t,p));return n?r=parseFloat(e):o&&1!==e.length?/[89]/.test(e)||kr?D(t,"Invalid number"):r=parseInt(e,8):r=parseInt(e,10),d(Ir,r)}function xn(){for(var e,r=O.charCodeAt(++p),t=(t=/^[0-7]+/.exec(O.slice(p,p+3)))&&t[0];t&&255<parseInt(t,8);)t=t.slice(0,-1);if(++p,t="0"===t?null:t)return kr&&D(p-2,"Octal literal in strict mode"),p+=t.length-1,String.fromCharCode(parseInt(t,8));switch(r){case 110:return "\n";case 114:return "\r";case 120:return String.fromCharCode(kn(2));case 117:return 123===O.charCodeAt(p)?(I.ecmaVersion<6&&X(),++p,e=kn(O.indexOf("}",p)-p),++p,1114111<e&&X()):e=kn(4),e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023));case 116:return "\t";case 98:return "\b";case 118:return "\v";case 102:return "\f";case 48:return "\0";case 13:10===O.charCodeAt(p)&&++p;case 10:return I.locations&&(a=p,++yr),"";default:return String.fromCharCode(r)}}function kn(e){e=gn(16,e);return null===e&&D(V,"Bad character escape sequence"),e}function En(){for(var e="",r=!(yn=!1),t=p;p<or;){var n=O.charCodeAt(p);if(Kt(n))++p;else {if(92!==n)break;yn=!0,e+=O.slice(t,p),117!=O.charCodeAt(++p)&&D(p,"Expecting Unicode escape sequence \\uXXXX"),++p;var n=kn(4),o=String.fromCharCode(n);o||D(p-1,"Invalid Unicode escape"),(r?Gt:Kt)(n)||D(p-4,"Invalid Unicode escape"),e+=o,t=p;}r=!1;}return e+O.slice(t,p)}function $n(){var e=En(),r=j;return d(r=!yn&&zt(e)?lt[e]:r,e)}function M(){vr=V,gr=fr,br=dr,mn();}function Cn(e){if(kr=e,R===Ir||R===Vr){if(p=V,I.locations)for(;p<a;)a=O.lastIndexOf("\n",a-2)+1,--yr;pn(),mn();}}function Sn(){this.type=null,this.start=V,this.end=null;}function An(){this.start=pr,(this.end=null)!==ar&&(this.source=ar);}function _(){var e=new Sn;return I.locations&&(e.loc=new An),I.directSourceFile&&(e.sourceFile=I.directSourceFile),I.ranges&&(e.range=[V,0]),e}function m(){return I.locations?[V,pr]:V}function y(e){var r=new Sn,t=e;return I.locations&&(r.loc=new An,r.loc.start=t[1],t=e[0]),r.start=t,I.directSourceFile&&(r.sourceFile=I.directSourceFile),I.ranges&&(r.range=[t,0]),r}function z(e,r){return e.type=r,e.end=gr,I.locations&&(e.loc.end=br),I.ranges&&(e.range[1]=gr),e}function In(e){return 5<=I.ecmaVersion&&e.type===ee&&e.expression.type===v&&"use strict"===e.expression.value}function H(e){return R===e&&(M(),!0)}function On(e){return R===j&&F===e}function Vn(e){return F===e&&H(j)}function Rn(e){Vn(e)||X();}function Fn(){return !I.strictSemicolons&&(R===Rr||R===N||Jt.test(O.slice(gr,V)))}function Tn(){H(L)||Fn()||X();}function Y(e){H(e)||X();}function X(e){D(null!=e?e:V,"Unexpected token");}function Dn(e,r){return Object.prototype.hasOwnProperty.call(e,r)}function jn(e,r){if(6<=I.ecmaVersion&&e)switch(e.type){case A:case b:case u:case o:break;case w:e.type=b;for(var t=0;t<e.properties.length;t++){var n=e.properties[t];"init"!==n.kind&&D(n.key.start,"Object pattern can't contain getter or setter"),jn(n.value,r);}break;case x:e.type=u,Un(e.elements,r);break;case k:"="===e.operator?e.type=o:D(e.left.end,"Only '=' operator can be used for specifying default value.");break;case E:if(!r)break;default:D(e.start,"Assigning to rvalue");}return e}function Un(e,r){if(e.length){for(var t=0;t<e.length-1;t++)jn(e[t],r);var n=e[e.length-1];switch(n.type){case $:break;case C:n.type=$;var o=n.argument;jn(o,r),o.type!==A&&o.type!==E&&o.type!==u&&X(o.start);break;default:jn(n,r);}}return e}function Nn(){var e=_();return M(),e.argument=(R===j||R===ft?Pn:X)(),z(e,$)}function Pn(){if(I.ecmaVersion<6)return G();switch(R){case j:return G();case ft:var e=_();return M(),e.elements=qn(pt,!0),z(e,u);case U:return to(!0);default:X();}}function qn(e,r){for(var t=[],n=!0;!H(e);){if(n?n=!1:Y(B),R===gt){t.push(Nn()),Y(e);break}t.push(r&&R===B?null:Bn());}return t}function Bn(e,r){if(e=e||m(),r=r||Pn(),!H(kt))return r;e=y(e);return e.operator="=",e.left=r,e.right=Q(),z(e,o)}function Ln(e,r){switch(e.type){case A:(Bt(e.name)||Lt(e.name))&&D(e.start,"Defining '"+e.name+"' in strict mode"),Dn(r,e.name)&&D(e.start,"Argument name clash in strict mode"),r[e.name]=!0;break;case b:for(var t=0;t<e.properties.length;t++)Ln(e.properties[t].value,r);break;case u:for(t=0;t<e.elements.length;t++){var n=e.elements[t];n&&Ln(n,r);}break;case $:return Ln(e.argument,r)}}function J(e,r){switch(e.type){case A:kr&&(Lt(e.name)||Bt(e.name))&&D(e.start,(r?"Binding ":"Assigning to ")+e.name+" in strict mode");break;case E:r&&D(e.start,"Binding to member expression");break;case b:for(var t=0;t<e.properties.length;t++)J(e.properties[t].value,r);break;case u:for(t=0;t<e.elements.length;t++){var n=e.elements[t];n&&J(n,r);}break;case o:J(e.left);break;case $:J(e.argument);break;default:D(e.start,"Assigning to rvalue");}}sr.Node=Sn;var Mn={kind:"loop"},_n={kind:"switch"};function zn(e,r){var t,n=R,o=_();switch(n){case Fr:case jr:var a=o,i=n.keyword,u=i==Fr.keyword;M(),H(L)||Fn()?a.label=null:R!==j?X():(a.label=G(),Tn());for(var s=0;s<T.length;++s){var c=T[s];if(null==a.label||c.name===a.label.name){if(null!=c.kind&&(u||"loop"===c.kind))break;if(a.label&&u)break}}return s===T.length&&D(a.start,"Unsyntactic "+i),z(a,u?oe:ne);case Ur:return i=o,M(),Tn(),z(i,te);case Pr:var l=o;return M(),T.push(Mn),l.body=zn(!1),T.pop(),Y(Gr),l.test=Hn(),6<=I.ecmaVersion?H(L):Tn(),z(l,re);case Lr:var f,l=o;if(M(),T.push(Mn),Y(P),R===L)return Xn(l,null);if(R===Jr||R===Wr)return d=_(),p=R.keyword,f=R===Wr,M(),Wn(d,!0,p),z(d,$e),(!(R===ct||6<=I.ecmaVersion&&On("of"))||1!==d.declarations.length||f&&d.declarations[0].init?Xn:Jn)(l,d);var p={start:0},d=W(!0,p);return R===ct||6<=I.ecmaVersion&&On("of")?(jn(d),J(d),Jn(l,d)):(p.start&&X(p.start),Xn(l,d));case Mr:return !e&&6<=I.ecmaVersion&&X(),f=o,M(),ao(f,!0);case rt:return e||X(),co(o,!0);case _r:return p=o,M(),p.test=Hn(),p.consequent=zn(!1),p.alternate=H(qr)?zn(!1):null,z(p,Ce);case zr:d=o;return wr||I.allowReturnOutsideFunction||D(V,"'return' outside of function"),M(),H(L)||Fn()?d.argument=null:(d.argument=W(),Tn()),z(d,Se);case Hr:var h,m,y,v=o;for(M(),v.discriminant=Hn(),v.cases=[],Y(U),T.push(_n);R!=N;)R===Tr||R===Nr?(y=R===Tr,h&&z(h,Ae),v.cases.push(h=_()),h.consequent=[],M(),y?h.test=W():(m&&D(vr,"Multiple default clauses"),m=!0,h.test=null),Y(dt)):(h||X(),h.consequent.push(zn(!0)));return h&&z(h,Ae),M(),T.pop(),z(v,Ie);case Yr:var g=o;return M(),Jt.test(O.slice(gr,V))&&D(gr,"Illegal newline after throw"),g.argument=W(),Tn(),z(g,Oe);case Xr:var b,g=o;return M(),g.block=Yn(),g.handler=null,R===Dr&&(b=_(),M(),Y(P),b.param=Pn(),J(b.param,!0),Y(q),b.guard=null,b.body=Yn(),g.handler=z(b,Fe)),g.guardedHandlers=Ar,g.finalizer=H(Br)?Yn():null,g.handler||g.finalizer||D(g.start,"Missing catch or finally clause"),z(g,Re);case Wr:case Qr:e||X();case Jr:return b=o,t=n.keyword,M(),Wn(b,!1,t),Tn(),z(b,$e);case Gr:return t=o,M(),t.test=Hn(),T.push(Mn),t.body=zn(!1),T.pop(),z(t,Te);case Kr:return void D(V,"with now allow");case U:return Yn();case L:return w=o,M(),z(w,De);case nt:case ot:return r||I.allowImportExportEverywhere||D(V,"'import' and 'export' may only appear at the top level"),(n===ot?function(e){M(),R===Vr?(e.specifiers=[],e.source=Zn(),e.kind=""):(e.specifiers=function(){var e=[],r=!0;if(R===j)if((t=_()).id=G(),J(t.id,!0),t.name=null,t.default=!0,e.push(z(t,ue)),!H(B))return e;if(R===Ut)return t=_(),M(),Rn("as"),t.name=G(),J(t.name,!0),e.push(z(t,ie)),e;Y(U);for(;!H(N);){if(r)r=!1;else if(Y(B),I.allowTrailingCommas&&H(N))break;var t;(t=_()).id=G(!0),t.name=Vn("as")?G():null,J(t.name||t.id,!0),t.default=!1,e.push(z(t,ue));}return e}(),Rn("from"),e.source=(R===Vr?Zn:X)());return Tn(),z(e,se)}:function(e){if(M(),R===Jr||R===Qr||R===Wr||R===Mr||R===rt)e.declaration=zn(!0),e.default=!1,e.specifiers=null,e.source=null;else if(H(Nr)){var r=Q();if(r.id)switch(r.type){case Z:r.type=K;break;case de:r.type=pe;}e.declaration=r,e.default=!0,e.specifiers=null,e.source=null,Tn();}else {var t=R===Ut;e.declaration=null,e.default=!1,e.specifiers=function(){var e=[],r=!0;if(R===Ut){var t=_();M(),e.push(z(t,le));}else for(Y(U);!H(N);){if(r)r=!1;else if(Y(B),I.allowTrailingCommas&&H(N))break;(t=_()).id=G(R===Nr),t.name=Vn("as")?G(!0):null,e.push(z(t,ce));}return e}(),Vn("from")?e.source=(R===Vr?Zn:X)():(t&&X(),e.source=null),Tn();}return z(e,fe)})(o);default:var w=F,x=W();if(n===j&&x.type===A&&H(dt)){var k=o;var E=w;var $=x;for(var C=0;C<T.length;++C)T[C].name===E&&D($.start,"Label '"+E+"' is already declared");var S=R.isLoop?"loop":R===Hr?"switch":null;return T.push({name:E,kind:S}),k.body=zn(!0),T.pop(),k.label=$,z(k,je);}else return (S=o).expression=x,Tn(),z(S,ee)}}function Hn(){Y(P);var e=W();return Y(q),e}function Yn(e){var r,t=_(),n=!0;for(t.body=[],Y(U);!H(N);){var o=zn(!0);t.body.push(o),n&&e&&In(o)&&(r=kr,Cn(kr=!0)),n=!1;}return !1===r&&Cn(!1),z(t,Ue)}function Xn(e,r){return e.init=r,Y(L),e.test=R===L?null:W(),Y(L),e.update=R===q?null:W(),Y(q),e.body=zn(!1),T.pop(),z(e,qe)}function Jn(e,r){var t=R===ct?Ne:Pe;return M(),e.left=r,e.right=W(),Y(q),e.body=zn(!1),T.pop(),z(e,t)}function Wn(e,r,t){for(e.declarations=[],e.kind=t;;){var n=_();if(n.id=Pn(),J(n.id,!0),n.init=H(kt)?Q(r):t===Qr.keyword?X():null,e.declarations.push(z(n,Be)),!H(B))break}}function W(e,r){var t=m(),n=Q(e,r);if(R!==B)return n;var o=y(t);for(o.expressions=[n];H(B);)o.expressions.push(Q(e,r));return z(o,ve)}function Q(e,r){var t=!r&&(r={start:0},!0),n=m(),o=function(e,r){var t=m(),n=function(e,r){var t=m(),n=Qn(r);return r&&r.start?n:function e(r,t,n,o){var a=R.binop;if(null!=a&&(!o||R!==ct)){var i,u,s;if(n<a)return (i=y(t)).left=r,i.operator=F,u=R,M(),s=m(),i.right=e(Qn(),s,a,o),z(i,u===St||u===At?ke:xe),e(i,t,n,o)}return r}(n,t,-1,e)}(e,r);if(r&&r.start)return n;if(H(mt))return (r=y(t)).test=n,r.consequent=Q(),Y(dt),r.alternate=Q(e),z(r,Me);return n}(e,r);return R.isAssign?((n=y(n)).operator=F,n.left=R===kt?jn(o):o,r.start=0,J(o),M(),n.right=Q(e),z(n,k)):(t&&r.start&&X(r.start),o)}function Qn(e){var r;if(R.prefix)return t=_(),r=R.isUpdate,t.operator=F,t.prefix=!0,M(),t.argument=Qn(),e&&e.start&&X(e.start),r?J(t.argument):kr&&"delete"===t.operator&&t.argument.type===A&&D(t.start,"Deleting local variable in strict mode"),z(t,r?we:Ee);var t,n=m(),o=Gn(e);if(e&&e.start)return o;for(;R.postfix&&!Fn();)(t=y(n)).operator=F,t.prefix=!1,J(t.argument=o),M(),o=z(t,we);return o}function Gn(e){var r=m(),t=Zn(e);return e&&e.start?t:Kn(t,r)}function Kn(e,r,t){var n;return H(ht)?((n=y(r)).object=e,n.property=G(!0),n.computed=!1,Kn(z(n,E),r,t)):H(ft)?((n=y(r)).object=e,n.property=W(),n.computed=!0,Y(pt),Kn(z(n,E),r,t)):!t&&H(P)?((n=y(r)).callee=e,n.arguments=lo(q,!1),Kn(z(n,S),r,t)):R===bt?((n=y(r)).tag=e,n.quasi=ro(),Kn(z(n,Ve),r,t)):e}function Zn(e){switch(R){case et:var r=_();return M(),z(r,Le);case at:if(xr){var t=_();M(),H(L)||Fn()?(t.delegate=!1,t.argument=null):(t.delegate=H(Ut),t.argument=Q());return z(t,ae);}case j:var t=m(),n=G(R!==j);return !Fn()&&H(yt)?uo(y(t),[n]):n;case Or:return (r=_()).regex={pattern:F.pattern,flags:F.flags},r.value=F.value,r.raw=O.slice(V,fr),M(),z(r,v);case Ir:case Vr:return (r=_()).value=F,r.raw=O.slice(V,fr),M(),z(r,v);case it:case ut:case st:return (r=_()).value=R.atomValue,r.raw=R.keyword,M(),z(r,v);case P:n=m();if(6<=I.ecmaVersion){M();for(var o,a,i=m(),u=[],s=!0,c={start:0};R!==q;){if(s?s=!1:Y(B),R===gt){o=V,u.push(Nn());break}R!==P||a||(a=V),u.push(Q(!1,c));}var l=m();if(Y(q),!Fn()&&H(yt))return a&&X(a),uo(y(n),u);u.length||X(vr),o&&X(o),c.start&&X(c.start),1<u.length?((f=y(i)).expressions=u,function(e,r,t){I.locations&&(e.loc.end=t[1],t=t[0]),e.type=r,e.end=t,I.ranges&&(e.range[1]=t);}(f,ve,l)):f=u[0];}else f=Hn();return I.preserveParens?((i=y(n)).expression=f,z(i,ge)):f;case ft:r=_();return M(),r.elements=lo(pt,!0,!0,e),z(r,x);case U:return to(!1,e);case Mr:r=_();return M(),ao(r,!1);case rt:return co(_(),!1);case Zr:l=_(),i=(M(),m());return l.callee=Kn(Zn(),i,!0),H(P)?l.arguments=lo(q,!1):l.arguments=Ar,z(l,be);case bt:return ro();case ot:return f=_(),M(),f.source=Zn(),z(f,_e);default:X();}var f;}function eo(){var e=_();return e.value={raw:O.slice(V,fr),cooked:F},M(),e.tail=R===bt,z(e,"TemplateElement")}function ro(){var e=_(),r=(M(),e.expressions=[],eo());for(e.quasis=[r];!r.tail;)Y(wt),e.expressions.push(W()),Y(N),e.quasis.push(r=eo());return M(),z(e,me)}function to(e,r){var t=_(),n=!0,o={};for(t.properties=[],M();!H(N);){if(n)n=!1;else if(Y(B),I.allowTrailingCommas&&H(N))break;var a,i,u=_();6<=I.ecmaVersion&&(u.method=!1,u.shorthand=!1,(e||r)&&(i=m()),e||(a=H(Ut))),no(u),H(dt)?(u.value=e?Bn():Q(!1,r),u.kind="init"):6<=I.ecmaVersion&&R===P?(e&&X(),u.kind="init",u.method=!0,u.value=io(a)):5<=I.ecmaVersion&&!u.computed&&u.key.type===A&&("get"===u.key.name||"set"===u.key.name)&&R!=B&&R!=N?((a||e)&&X(),u.kind=u.key.name,no(u),u.value=io(!1)):6<=I.ecmaVersion&&!u.computed&&u.key.type===A?(u.kind="init",e?u.value=Bn(i,u.key):R===kt&&r?(r.start||(r.start=V),u.value=Bn(i,u.key)):u.value=u.key,u.shorthand=!0):X(),!function(e,r){if(!(6<=I.ecmaVersion)){var t,n=e.key;switch(n.type){case A:t=n.name;break;case v:t=String(n.value);break;default:return}var o,a,e=e.kind||"init";Dn(r,t)?(o=r[t],a="init"!==e,(!kr&&!a||!o[e])&&a^o.init||D(n.start,"Redefinition of property")):o=r[t]={init:!1,get:!1,set:!1},o[e]=!0;}}(u,o),t.properties.push(z(u,"Property"));}return z(t,e?b:w)}function no(e){if(6<=I.ecmaVersion){if(H(ft))return e.computed=!0,e.key=W(),void Y(pt);e.computed=!1;}e.key=R===Ir||R===Vr?Zn():G(!0);}function oo(e){e.id=null,6<=I.ecmaVersion&&(e.generator=!1,e.expression=!1);}function ao(e,r,t){return oo(e),6<=I.ecmaVersion&&(e.generator=H(Ut)),!r&&R!==j||(e.id=G()),Y(P),e.params=qn(q,!1),so(e,t),z(e,r?K:Z)}function io(e){var r=_();return oo(r),Y(P),r.params=qn(q,!1),e=6<=I.ecmaVersion&&(r.generator=e,!0),so(r,e),z(r,Z)}function uo(e,r){return oo(e),e.params=Un(r,!0),so(e,!0),z(e,t)}function so(e,r){var t,n,o,r=r&&R!==U;if(r?(e.body=Q(),e.expression=!0):(t=wr,n=xr,o=T,wr=!0,xr=e.generator,T=[],e.body=Yn(!0),e.expression=!1,wr=t,xr=n,T=o),kr||!r&&e.body.body.length&&In(e.body.body[0])){var a={};e.id&&Ln(e.id,{});for(var i=0;i<e.params.length;i++)Ln(e.params[i],a);}}function co(e,r){M(),e.id=R===j?G():r?X():null,e.superClass=H(tt)?Gn():null;var t,n,o=_();for(o.body=[],Y(U);!H(N);)H(L)||(t=_(),n=H(Ut),no(t),R===P||t.computed||t.key.type!==A||"static"!==t.key.name?t.static=!1:(n&&X(),t.static=!0,n=H(Ut),no(t)),R===P||t.computed||t.key.type!==A||"get"!==t.key.name&&"set"!==t.key.name?t.kind="":(n&&X(),t.kind=t.key.name,no(t)),t.value=io(n),o.body.push(z(t,ye)));return e.body=z(o,he),z(e,r?pe:de)}function lo(e,r,t,n){for(var o,a,i=[],u=!0;!H(e);){if(u)u=!1;else if(Y(B),r&&I.allowTrailingCommas&&H(e))break;t&&R===B?i.push(null):R===gt?i.push((o=n,a=void 0,a=_(),M(),a.argument=Q(o),z(a,C))):i.push(Q(!1,n));}return i}function G(e){var r=_();return e&&"everywhere"==I.forbidReserved&&(e=!1),R===j?(!e&&(I.forbidReserved&&(3===I.ecmaVersion?Pt:qt)(F)||kr&&Bt(F))&&-1==O.slice(V,fr).indexOf("\\")&&D(V,"The keyword '"+F+"' is reserved"),r.name=F):e&&R.keyword?r.name=R.keyword:X(),M(),z(r,A)}var fo={console:console,setTimeout:setTimeout,setInterval:setInterval,clearTimeout:clearTimeout,clearInterval:clearInterval,encodeURI:encodeURI,encodeURIComponent:encodeURIComponent,decodeURI:decodeURI,decodeURIComponent:decodeURIComponent,Infinity:1/0,NaN:NaN,isFinite:isFinite,isNaN:isNaN,parseFloat:parseFloat,parseInt:parseInt,Object:Object,Boolean:Boolean,Error:Error,EvalError:EvalError,RangeError:RangeError,ReferenceError:ReferenceError,SyntaxError:SyntaxError,TypeError:TypeError,URIError:URIError,Number:Number,Math:Math,Date:Date,String:String,RegExp:RegExp,Array:Array,JSON:JSON,Promise:Promise},po=(ho.prototype.run=function(e,r){void 0===r&&(r={}),this.source=e,this.initScope(r);r=sr.parse(e,{locations:!0,ecmaVersion:6});try{f(r,this.mainScope,this);}catch(e){throw e}return this.mainScope.$find("exports").value},ho.prototype.initScope=function(r){var t=this;this.mainScope=new ir("block"),this.mainScope.$const("exports",{}),this.mainScope.$const("this",this),Object.keys(fo).forEach(function(e){t.mainScope.$const(e,fo[e]);}),Object.keys(r).forEach(function(e){t.mainScope.$const(e,r[e]);});},ho);function ho(){this.source="",this.traceId=0,this.traceStack=[],this.mainScope=new ir("block"),this.currentNode=null;}function mo(e,r){return (new po).run(e,r)}

const getOsInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    let name = 'Unknown';
    let version = 'Unknown';
    if (userAgent.indexOf('win') > -1) {
        name = 'Windows';
        if (userAgent.indexOf('windows nt 5.0') > -1) {
            version = 'Windows 2000';
        }
        else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
            version = 'Windows XP';
        }
        else if (userAgent.indexOf('windows nt 6.0') > -1) {
            version = 'Windows Vista';
        }
        else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
            version = 'Windows 7';
        }
        else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
            version = 'Windows 8';
        }
        else if (userAgent.indexOf('windows nt 6.3') > -1) {
            version = 'Windows 8.1';
        }
        else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
            version = 'Windows 10';
        }
        else {
            version = 'Unknown';
        }
    }
    else if (userAgent.indexOf('iphone') > -1) {
        name = 'iPhone';
    }
    else if (userAgent.indexOf('mac') > -1) {
        name = 'Mac';
    }
    else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
        name = 'Unix';
    }
    else if (userAgent.indexOf('linux') > -1) {
        if (userAgent.indexOf('android') > -1) {
            name = 'Android';
        }
        else {
            name = 'Linux';
        }
    }
    else {
        name = 'Unknown';
    }
    return { name, version };
};
/**
 * @description 获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:25
 * @returns {*}
 */
const getSystemInfoSync = () => {
    return {
        app: 'NARUSE',
        brand: 'PC',
        currentBattery: '100%',
        fontSizeSetting: 16,
        language: 'Chinese',
        model: 'PC',
        pixelRatio: 1.5,
        platform: 'H5',
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        statusBarHeight: 0,
        storage: null,
        system: getOsInfo().name,
        taojimuEnv: undefined,
        titleBarHeight: 0,
        version: '0.0.1',
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
    };
};
/**
 * @description 异步获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:00
 * @param {*} [{ success, fail, complete }={}]
 * @returns {*}
 */
const getSystemInfo = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete });
    return handle.success(getSystemInfoSync());
};

var system = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getSystemInfoSync: getSystemInfoSync,
    getSystemInfo: getSystemInfo
});

/** 获取缓存 */
const getItem = function getItem(key) {
    let item;
    try {
        item = JSON.parse(localStorage.getItem(key) || '');
    }
    catch (e) { }
    if (item && typeof item === 'object' && Object.keys(item).includes('data')) {
        return { result: true, data: item.data };
    }
    return { result: false };
};
/** 同步设置缓存 */
const setStorageSync = (key, data = '') => {
    if (exceptTypeSync(key, 'string', 'removeStorageSync'))
        return;
    const type = typeof data;
    let obj = {};
    if (type === 'symbol') {
        obj = { data: '' };
    }
    else {
        obj = { data };
    }
    localStorage.setItem(key, JSON.stringify(obj));
};
/** 异步设置缓存 */
const setStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'setStorage'))
        return err;
    const { key, data, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'setStorage', success, fail, complete });
    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'setStorage:fail key must be string' });
    }
    setStorageSync(key, data);
    return handle.success();
};
/** 同步删除缓存 */
const removeStorageSync = (key) => {
    if (exceptTypeSync(key, 'string', 'removeStorageSync'))
        return;
    localStorage.removeItem(key);
};
/** 异步删除缓存 */
const removeStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'removeStorage'))
        return err;
    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'removeStorage', success, fail, complete });
    if (typeof key !== 'string') {
        if (typeof key !== 'string') {
            logger.error('removeStorage:fail key must be string');
            return;
        }
    }
    removeStorageSync(key);
    return handle.success();
};
/** 同步获取缓存  */
const getStorageSync = (key) => {
    if (exceptTypeSync(key, 'string', 'getStorageSync'))
        return;
    const res = getItem(key);
    if (res.result)
        return res.data;
    return '';
};
/** 异步获取缓存  */
const getStorageInfoSync = () => {
    const res = {
        keys: Object.keys(localStorage),
        limitSize: NaN,
        currentSize: NaN,
    };
    return res;
};
/** 获取缓存信息  */
const getStorageInfo = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getStorageInfo', success, fail, complete });
    return handle.success(getStorageInfoSync());
};
/** 同步获取缓存 */
const getStorage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'getStorage'))
        return err;
    const { key, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getStorage', success, fail, complete });
    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'getStorage:fail key must be string' });
    }
    return handle.success({ data: getStorageSync(key) });
};
/** 同步清除缓存 */
const clearStorageSync = () => {
    localStorage.clear();
};
/** 异步清除缓存 */
const clearStorage = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'clearStorage', success, fail, complete });
    clearStorageSync();
    return handle.success();
};

var storage = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setStorageSync: setStorageSync,
    setStorage: setStorage,
    removeStorageSync: removeStorageSync,
    removeStorage: removeStorage,
    getStorageSync: getStorageSync,
    getStorageInfoSync: getStorageInfoSync,
    getStorageInfo: getStorageInfo,
    getStorage: getStorage,
    clearStorageSync: clearStorageSync,
    clearStorage: clearStorage
});

/**
 * @description 跳转到其他页面
 * @author CHC
 * @date 2022-03-30 18:03:08
 * @param {*} options
 * @returns {*}
 */
const navigateTo = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'navigateTo'))
        return err;
    const { url, success, fail } = options;
    const handle = new MethodHandler({ name: 'navigateTo', success, fail });
    if (typeof url !== 'string') {
        return handle.fail({ errMsg: 'url' });
    }
    window.location.href = url;
    return handle.success();
};
/**
 * @description 打开外部页面
 * @author CHC
 * @date 2022-03-30 18:03:03
 * @param {*} options
 */
const navigateToWebPage = (options) => {
    let err;
    if (err = exceptType(options, 'object', 'navigateToWebPage'))
        return err;
    const { url, success, fail } = options;
    const handle = new MethodHandler({ name: 'navigateToWebPage', success, fail });
    if (typeof url !== 'string') {
        return handle.fail({ errMsg: 'url' });
    }
    window.open(url);
    return handle.success();
};
/**
 * @description 返回路由
 * @author CHC
 * @date 2022-03-30 18:03:18
 * @param {*} options
 * @returns {*}
 */
const navigateBack = (options = {}) => {
    let err;
    if (err = exceptType(options, 'object', 'navigateBack'))
        return err;
    const { delta = 1, success, fail } = options;
    const handle = new MethodHandler({ name: 'navigateBack', success, fail });
    if (typeof delta !== 'number') {
        return handle.fail({ errMsg: 'delta must a number' });
    }
    window.history.go(-Number(delta));
    return handle.success();
};

var route = /*#__PURE__*/Object.freeze({
    __proto__: null,
    navigateTo: navigateTo,
    navigateToWebPage: navigateToWebPage,
    navigateBack: navigateBack
});

/**
 * 剪贴板部分的api参考了Chameleon项目的实现：
 *
 * setClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/setClipBoardData
 * getClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/getClipBoardData
 */
const CLIPBOARD_STORAGE_NAME = 'naruse_clipboard';
document.addEventListener('copy', () => {
    var _a;
    setStorage({
        key: CLIPBOARD_STORAGE_NAME,
        data: (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString(),
    }).catch(e => {
        console.error(e);
    });
});
/**
  * 设置系统剪贴板的内容
  */
const setClipboardData = ({ data, success, fail, complete }) => {
    const handle = new MethodHandler({ name: 'setClipboardData', success, fail, complete });
    try {
        setStorageSync(CLIPBOARD_STORAGE_NAME, data);
        /**
      * 已于 iPhone 6s Plus iOS 13.1.3 上的 Safari 测试通过
      * iOS < 10 的系统可能无法使用编程方式访问剪贴板，参考：
      * https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084
      */
        if (typeof document.execCommand === 'function') {
            const textarea = document.createElement('textarea');
            textarea.readOnly = true;
            textarea.value = data;
            textarea.style.position = 'absolute';
            textarea.style.width = '100px';
            textarea.style.left = '-10000px';
            document.body.appendChild(textarea);
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        else if (typeof window.copy === 'function') {
            window.copy(data);
        }
        else {
            throw new Error('Unsupported Function');
        }
        return handle.success();
    }
    catch (e) {
        return handle.fail({ errMsg: e.message });
    }
};
/**
  * 获取系统剪贴板的内容
  */
const getClipboardData = ({ success, fail, complete } = {}) => {
    const handle = new MethodHandler({ name: 'getClipboardData', success, fail, complete });
    try {
        const data = getStorageSync(CLIPBOARD_STORAGE_NAME);
        return handle.success({ data });
    }
    catch (e) {
        return handle.fail({ errMsg: e.message });
    }
};

var device$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setClipboardData: setClipboardData,
    getClipboardData: getClipboardData
});

var device = Object.assign({}, device$1);

function shouldBeObject(target) {
    if (target && typeof target === 'object')
        return { flag: true };
    return {
        flag: false,
        msg: getParameterError({
            correct: 'Object',
            wrong: target
        })
    };
}
function getParameterError({ name = '', para, correct, wrong }) {
    const parameter = para ? `parameter.${para}` : 'parameter';
    const errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong);
    if (name) {
        return `${name}:fail parameter error: ${parameter} should be ${correct} instead of ${errorType}`;
    }
    else {
        return `parameter error: ${parameter} should be ${correct} instead of ${errorType}`;
    }
}
function upperCaseFirstLetter(string) {
    if (typeof string !== 'string')
        return string;
    string = string.replace(/^./, match => match.toUpperCase());
    return string;
}
function findDOM(inst) {
    return document;
}

/**
 * 获取图片信息。网络图片需先配置download域名才能生效。
 */
const getImageInfo = (options) => {
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `getImageInfo:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const getBase64Image = (image) => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, 0, 0, image.width, image.height);
            return canvas.toDataURL('image/png');
        }
        catch (e) {
            console.error('getImageInfo:get base64 fail', e);
        }
    };
    const { src, success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'getImageInfo', success, fail, complete });
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = '';
        image.onload = () => {
            handle.success({
                width: image.naturalWidth,
                height: image.naturalHeight,
                path: getBase64Image(image) || src
            }, resolve);
        };
        image.onerror = (e) => {
            handle.fail({
                errMsg: e.message
            }, reject);
        };
        image.src = src;
    });
};

/**
 * previewImage api基于开源的React组件[react-wx-images-viewer](https://github.com/react-ld/react-wx-images-viewer)开发，感谢！
 */
/**
 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
 */
const previewImage = (options) => __awaiter(void 0, void 0, void 0, function* () {
    function loadImage(url, loadFail) {
        return new Promise((resolve) => {
            const item = document.createElement('taro-swiper-item-core');
            item.style.cssText = 'display:flex;align-items:start;justify-content:center;overflow-y:scroll;';
            const image = new Image();
            image.style.maxWidth = '100%';
            image.src = url;
            const div = document.createElement('div');
            div.style.cssText = 'display:flex;align-items:center;justify-content:center;max-width:100%;min-height:100%;';
            div.appendChild(image);
            item.appendChild(div);
            // Note: 等待图片加载完后返回，会导致轮播被卡住
            resolve(item);
            if (typeof loadFail === 'function') {
                image.addEventListener('error', (err) => {
                    loadFail({ errMsg: err.message });
                });
            }
        });
    }
    // options must be an Object
    const isObject = shouldBeObject(options);
    if (!isObject.flag) {
        const res = { errMsg: `previewImage:fail ${isObject.msg}` };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    const { urls = [], current = '', success, fail, complete } = options;
    const handle = new MethodHandler({ name: 'previewImage', success, fail, complete });
    const container = document.createElement('div');
    container.classList.add('preview-image');
    container.style.cssText = 'position:fixed;top:0;left:0;z-index:1050;width:100%;height:100%;overflow:hidden;outline:0;background-color:#111;';
    container.addEventListener('click', () => {
        container.remove();
    });
    const swiper = document.createElement('taro-swiper-core');
    // @ts-ignore
    swiper.full = true;
    let children = [];
    try {
        children = yield Promise.all(urls.map(e => loadImage(e, fail)));
    }
    catch (error) {
        return handle.fail({
            errMsg: error
        });
    }
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        swiper.appendChild(child);
    }
    const currentIndex = urls.indexOf(current);
    // @ts-ignore
    swiper.current = currentIndex;
    container.appendChild(swiper);
    document.body.appendChild(container);
    return handle.success();
});

var media = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getImageInfo: getImageInfo,
    previewImage: previewImage
});

class NodesRef {
    constructor(selector, querySelectorQuery, single) {
        this._component = querySelectorQuery._component;
        this._selector = selector;
        this._selectorQuery = querySelectorQuery;
        this._single = single;
    }
    context(cb) {
        const { _selector, _component, _single, _selectorQuery } = this;
        _selectorQuery._push(_selector, _component, _single, { context: !0 }, cb);
        return _selectorQuery;
    }
    node(cb) {
        const { _selector, _component, _single, _selectorQuery } = this;
        _selectorQuery._push(_selector, _component, _single, { nodeCanvasType: !0, node: !0 }, cb);
        return _selectorQuery;
    }
    boundingClientRect(cb) {
        const { _selector, _component, _single, _selectorQuery } = this;
        _selectorQuery._push(_selector, _component, _single, { id: !0, dataset: !0, rect: !0, size: !0 }, cb);
        return _selectorQuery;
    }
    scrollOffset(cb) {
        const { _selector, _component, _single, _selectorQuery } = this;
        _selectorQuery._push(_selector, _component, _single, { id: !0, dataset: !0, scrollOffset: !0 }, cb);
        return _selectorQuery;
    }
    fields(fields, cb) {
        const { _selector, _component, _single, _selectorQuery } = this;
        const { id, dataset, rect, size, scrollOffset, properties = [], computedStyle = [] } = fields;
        _selectorQuery._push(_selector, _component, _single, {
            id,
            dataset,
            rect,
            size,
            scrollOffset,
            properties,
            computedStyle
        }, cb);
        return _selectorQuery;
    }
}

function filter(fields, dom, selector) {
    if (!dom)
        return null;
    const isViewport = selector === '.taro_page';
    const { id, dataset, rect, size, scrollOffset, properties = [], computedStyle = [], nodeCanvasType, node, context } = fields;
    const res = {};
    if (nodeCanvasType && node) {
        const tagName = dom.tagName;
        res.node = {
            id: dom.id,
            $taroElement: dom
        };
        if (/^taro-canvas-core/i.test(tagName)) {
            const type = dom.type || '';
            res.nodeCanvasType = type;
            const canvas = dom.getElementsByTagName('canvas')[0];
            if (/^(2d|webgl)/i.test(type) && canvas) {
                res.node = canvas;
            }
            else {
                res.node = null;
            }
        }
        else {
            // TODO https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html
            // if (/^taro-scroll-view-core/i.test(tagName))
            res.nodeCanvasType = '';
            res.node = dom;
        }
        return res;
    }
    if (id)
        res.id = dom.id;
    if (dataset)
        res.dataset = Object.assign({}, dom.dataset);
    if (rect || size) {
        const { left, right, top, bottom, width, height } = dom.getBoundingClientRect();
        if (rect) {
            if (!isViewport) {
                res.left = left;
                res.right = right;
                res.top = top;
                res.bottom = bottom;
            }
            else {
                res.left = 0;
                res.right = 0;
                res.top = 0;
                res.bottom = 0;
            }
        }
        if (size) {
            if (!isViewport) {
                res.width = width;
                res.height = height;
            }
            else {
                res.width = dom.clientWidth;
                res.height = dom.clientHeight;
            }
        }
    }
    if (scrollOffset) {
        res.scrollLeft = dom.scrollLeft;
        res.scrollTop = dom.scrollTop;
    }
    if (properties.length) {
        properties.forEach(prop => {
            const attr = dom.getAttribute(prop);
            if (attr)
                res[prop] = attr;
        });
    }
    if (computedStyle.length) {
        const styles = window.getComputedStyle(dom);
        computedStyle.forEach(key => {
            const value = styles.getPropertyValue(key) || styles[key];
            if (value)
                res[key] = value;
        });
    }
    return res;
}
/**
 * WXML节点信息API
 * @return {Object} SelectorQuery 对象实例
 */
function queryBat(queue, cb) {
    const result = [];
    queue.forEach(item => {
        var _a;
        const { selector, single, fields, component } = item;
        // selector 的容器节点
        /* eslint-disable */
        const container = (component !== null ?
            (findDOM() || document) :
            document);
        /* eslint-enable */
        // 特殊处理 ---- 选自己
        let selectSelf = false;
        if (container !== document) {
            const $nodeList = (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector);
            if ($nodeList) {
                for (let i = 0, len = $nodeList.length; i < len; ++i) {
                    if (container === $nodeList[i]) {
                        selectSelf = true;
                        break;
                    }
                }
            }
        }
        if (single) {
            const el = selectSelf === true ? container : container.querySelector(selector);
            result.push(filter(fields, el, selector));
        }
        else {
            const $children = container.querySelectorAll(selector);
            const children = [];
            selectSelf === true && children.push(container);
            for (let i = 0, len = $children.length; i < len; ++i) {
                children.push($children[i]);
            }
            result.push(children.map(dom => filter(fields, dom)));
        }
    });
    cb(result);
}
class SelectorQuery {
    constructor() {
        this._defaultWebviewId = null;
        this._webviewId = null;
        this._queue = [];
        this._queueCb = [];
        this._component;
    }
    in(component) {
        this._component = component;
        return this;
    }
    select(selector) {
        // 小程序里跨自定义组件的后代选择器 '>>>' 在 h5 替换为普通后代选择器 '>'
        if (typeof selector === 'string')
            selector = selector.replace('>>>', '>');
        return new NodesRef(selector, this, true);
    }
    selectAll(selector) {
        // 小程序里跨自定义组件的后代选择器 '>>>' 在 h5 替换为普通后代选择器 '>'
        if (typeof selector === 'string')
            selector = selector.replace('>>>', '>');
        return new NodesRef(selector, this, false);
    }
    selectViewport() {
        return new NodesRef('.taro_page', this, true);
    }
    exec(cb) {
        queryBat(this._queue, res => {
            const _queueCb = this._queueCb;
            res.forEach((item, index) => {
                const cb = _queueCb[index];
                typeof cb === 'function' && cb.call(this, item);
            });
            typeof cb === 'function' && cb.call(this, res);
        });
        return this;
    }
    _push(selector, component, single, fields, callback = null) {
        this._queue.push({
            component,
            selector,
            single,
            fields
        });
        this._queueCb.push(callback);
    }
}

const createSelectorQuery = () => {
    return new SelectorQuery();
};
const createIntersectionObserver = temporarilyNotSupport('createIntersectionObserver');

var wxml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createSelectorQuery: createSelectorQuery,
    createIntersectionObserver: createIntersectionObserver
});

const api = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, system), storage), route), device), media), wxml);

const version = '0.1.1';
const Naruse = Object.assign(Object.assign({}, api), { Component: React.Component, createElement: naruseCreateElement, env: {
        USER_DATA_PATH: '',
        clientName: 'H5',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'H5',
    }, getDeferred,
    globalEvent,
    EventBus,
    version, unsafe_run: mo });
if (typeof window !== 'undefined') {
    window.Naruse = Naruse;
}

const _config = {
    hotPuller: () => {
        logger.error('未初始化热更新拉取，无法更新组件默认为空');
        return Promise.resolve({ code: '', ctx: {} });
    },
    baseCtx: () => {
        return {};
    },
    onRunError: (err) => {
        console.error(err);
    },
};
/**
 * @description 获取初始化
 * @author CHC
 * @date 2022-06-14 10:06:50
 * @returns {{ _config: () => Promise<{ code, ctx }>  }}
 */
const getNaruseConfig = () => {
    return _config;
};
/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 */
const naruseInit = ({ hotPuller, baseCtx, onRunError } = {}) => {
    if (hotPuller)
        _config.hotPuller = hotPuller;
    if (baseCtx)
        _config.baseCtx = baseCtx;
    if (onRunError)
        _config.onRunError = onRunError;
};

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
const getNaruseComponentFromProps = (props) => __awaiter(void 0, void 0, void 0, function* () {
    if (!props || typeof props !== 'object') {
        logger.error('无效参数，无法生成对应naruse组件');
        return;
    }
    const { hotPuller } = getNaruseConfig();
    try {
        const { code, ctx } = yield hotPuller(props);
        return getNaruseComponentFromCode(code, ctx);
    }
    catch (e) {
        logger.error('加载远程代码资源失败', e);
    }
});
/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 */
const getNaruseComponentFromCode = (code, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!code)
        return null;
    const { baseCtx: _baseCtx, onRunError } = getNaruseConfig();
    const baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx;
    // 导出变量
    let exports = {};
    try {
        exports = mo(code, Object.assign(Object.assign({ h: Naruse.createElement, Naruse }, baseCtx), ctx));
    }
    catch (err) {
        logger.error('运行时出错，自动继续', err);
        onRunError(err);
        return;
    }
    let component = null;
    // 默认导出组件存在
    if (exports.default) {
        component = exports.default;
    }
    else {
        const NaruseComponent = Naruse.Component;
        // 兼容老版组件
        const compatibleClass = function compatibleClass(...args) {
            const self = this;
            NaruseComponent.apply(this, args);
            exports.constructor && exports.constructor.call(this);
            Object.entries(exports).forEach(([key, value]) => {
                if (key === 'constructor')
                    return;
                self[key] = typeof value === 'function' ? value.bind(self) : value;
            });
        };
        compatibleClass.prototype = Object.create(NaruseComponent.prototype);
        Object.assign(compatibleClass.prototype, { constructor: compatibleClass });
        component = compatibleClass;
    }
    return component;
});
/**
 * @description 热更新容器组件
 * @author CHC
 * @date 2022-07-19 18:07:44
 * @class Container
 * @extends {Component<{}, {loaded: boolean}>}
 */
class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loaded: false };
        this.init(props);
    }
    init(props) {
        return __awaiter(this, void 0, void 0, function* () {
            this.Component = yield getNaruseComponentFromProps(props);
            if (this.Component) {
                this.setState({ loaded: true });
            }
        });
    }
    render() {
        return this.state.loaded ? Naruse.createElement(this.Component) : null;
    }
}

export { Container, Naruse, Container as default, naruseInit };
