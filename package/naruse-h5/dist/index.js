import React from 'react';

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
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

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

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray$1(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var createLogger = function (name) {
    return {
        debug: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.debug.apply(console, __spreadArray$1(["[".concat(name, "][debugger]")], args, false));
        },
        warn: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn.apply(console, __spreadArray$1(["[".concat(name, "][warn]")], args, false));
        },
        info: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.info.apply(console, __spreadArray$1(["[".concat(name, "][info]")], args, false));
        },
        error: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error.apply(console, __spreadArray$1(["[".concat(name, "][error]")], args, false));
        },
    };
};
var initVersionLogger = function (name, version) {
    console.log("%c naruse %c ".concat(name, " v").concat(version, " %c"), 'background:#17c0eb ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff', 'background:#7158e2 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff', 'background:transparent');
};

var logger$1 = createLogger('naurse-error');
/**
 * @description 期望为某个类型，异步版
 * @author CHC
 * @date 2022-03-30 15:03:05
 * @param {*} { obj, type, name }
 * @returns {*}
 */
var exceptType = function (obj, type, name) {
    if (typeof obj !== type) {
        var res = { errMsg: "".concat(name, ":fail must has a ").concat(type) };
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
var exceptTypeSync = function (obj, type, name) {
    if (typeof obj !== type) {
        logger$1.error("".concat(name, ":fail must has a ").concat(type));
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
var temporarilyNotSupport = function temporarilyNotSupport(apiName) {
    return function () {
        var errMsg = "\u6682\u65F6\u4E0D\u652F\u6301 API ".concat(apiName);
        logger$1.error(errMsg);
        return Promise.reject({ errMsg: errMsg });
    };
};

var mitt = function (n) {
    if (n === void 0) { n = new Map(); }
    return {
        all: n = n || new Map,
        on: function (e, t) {
            var _this = this;
            var i = n.get(e);
            i ? i.push(t) : n.set(e, [t]);
            return function () {
                _this.off(e, t);
            };
        },
        off: function (e, t) {
            var i = n.get(e);
            i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : n.set(e, []));
        },
        emit: function (e) {
            var t = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                t[_i - 1] = arguments[_i];
            }
            var i = n.get(e);
            i && i.slice().map(function (n) {
                n.apply(void 0, t);
            }), (i = n.get("*")) && i.slice().map(function (n) {
                typeof n === 'function' && n.apply(void 0, __spreadArray$1([e], t, false));
            });
        },
        once: function (event, fun) {
            var i = n.get(event);
            var funcs = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                fun.apply(void 0, args);
                var i = n.get(event);
                i && i.splice(i.indexOf(funcs) >>> 0, 1);
            };
            i ? i.push(funcs) : n.set(event, [funcs]);
        },
        clear: function () {
            n.clear();
        }
    };
};
/** 全局事件中心 */
var globalEvent = mitt();
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

var MethodHandler = /** @class */ (function () {
    function MethodHandler(_a) {
        var name = _a.name, success = _a.success, fail = _a.fail, complete = _a.complete;
        this.methodName = name;
        this.__success = success;
        this.__fail = fail;
        this.__complete = complete;
    }
    /** 成功 */
    MethodHandler.prototype.success = function (res, resolve) {
        if (res === void 0) { res = {}; }
        if (resolve === void 0) { resolve = Promise.resolve.bind(Promise); }
        if (!res.errMsg) {
            res.errMsg = "".concat(this.methodName, ":ok");
        }
        typeof this.__success === 'function' && this.__success(res);
        typeof this.__complete === 'function' && this.__complete(res);
        return resolve(res);
    };
    /** 失败 */
    MethodHandler.prototype.fail = function (res, reject) {
        if (res === void 0) { res = {}; }
        if (reject === void 0) { reject = Promise.reject.bind(Promise); }
        if (!res.errMsg) {
            res.errMsg = "".concat(this.methodName, ":fail");
        }
        else {
            res.errMsg = "".concat(this.methodName, ":fail ").concat(res.errMsg);
        }
        console.error(res.errMsg);
        typeof this.__fail === 'function' && this.__fail(res);
        typeof this.__complete === 'function' && this.__complete(res);
        return reject(res);
    };
    return MethodHandler;
}());

/**
 * 去掉前后 空格/空行/tab 的正则 预先定义 避免在函数中重复构造
 * @type {RegExp}
 */
var trimReg = /(^\s*)|(\s*$)/g;
/**
  * 判断一个东西是不是空 空格 空字符串 undefined 长度为0的数组及对象会被认为是空的
  * @param key
  * @returns {boolean}
  */
var isEmpty = function (key) {
    if (key === undefined || key === '' || key === null) {
        return true;
    }
    if (typeof (key) === 'string') {
        key = key.replace(trimReg, '');
        if (key === '' || key === null || key === 'null' || key === undefined || key === 'undefined') {
            return true;
        }
        return false;
    }
    else if (typeof (key) === 'undefined') {
        return true;
    }
    else if (typeof (key) === 'object') {
        // @ts-ignore
        for (var i in key) {
            return false;
        }
        return true;
    }
    else if (typeof (key) === 'boolean') {
        return false;
    }
};
/** 移除对象的中空值 */
function removeObjectNullValue(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    Object.keys(obj)
        .forEach(function (k) {
        if (isEmpty(obj[k])) {
            delete obj[k];
        }
    });
    return obj;
}
/** 转JSON,对Error特殊处理，且忽略 function、bigint、symbol */
var safeToJSON = function (obj) {
    // ERROR
    if (obj instanceof Error) {
        return JSON.stringify({ name: obj.name, message: obj.message, stack: obj.stack });
    }
    // 存储所有对象，判断是有循环引用
    var cache = [];
    return JSON.stringify(obj, function (key, value) {
        if (typeof value === 'function' || typeof value === 'bigint' || typeof value === 'symbol') {
            return;
        }
        // object
        if (typeof value === 'object') {
            // 循环引用了
            if (cache.indexOf(value) !== -1) {
                return "$circular:".concat(key);
            }
            cache.push(value);
            // 空数组
        }
        // number || boolean || object || null || undefined
        return value;
    });
};

var deferMap = {};
var getDeferPromise = function () {
    var resolve, reject;
    var promise = new Promise(function (res, rej) {
        resolve = res;
        reject = rej;
    });
    // @ts-ignore
    promise.resolve = resolve;
    // @ts-ignore
    promise.reject = reject;
    return promise;
};
var proxyObject = function (obj) {
    if (typeof Proxy !== 'function') {
        return obj;
    }
    return new Proxy(obj, {
        get: function (target, key) {
            if (!target[key]) {
                // @ts-ignore
                return obj[key] = getDeferPromise();
            }
            return obj[key];
        }
    });
};
var getDeferred = function (key) {
    if (!key) {
        return proxyObject(deferMap);
    }
    if (deferMap[key]) {
        return deferMap[key];
    }
    else {
        return deferMap[key] = getDeferPromise();
    }
};

/** 错误来源，该枚举的值为 LoggerLanding 的 key */
var RunningCodeErrorSource;
(function (RunningCodeErrorSource) {
    RunningCodeErrorSource["errorCenter"] = "errorCenter";
    RunningCodeErrorSource["tryCatch"] = "tryCatch";
})(RunningCodeErrorSource || (RunningCodeErrorSource = {}));

var logger = createLogger('naruse-h5');

function baseEventProps(e) {
    return {
        type: e.type,
        /** 阻止冒泡 */
        stopPropagation: function () {
            e.stopPropagation();
        },
        // 真正触发事件的元素
        target: e.target,
        // 当前元素（冒泡）
        currentTarget: e.currentTarget,
    };
}
var reflectEventMap = {
    /** 点击事件处理 */
    click: function (e) {
        return __assign(__assign({}, baseEventProps(e)), { type: 'click', detail: {
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
            } });
    },
    /** 加载完毕 */
    load: function (e) {
        return __assign(__assign({}, baseEventProps(e)), { type: 'load', detail: {
                width: e.target.width,
                height: e.target.height,
            } });
    },
    /** 聚焦 */
    focus: function (e) {
        return __assign(__assign({}, baseEventProps(e)), { type: 'foucs', detail: { value: e.target.value } });
    },
    /** 失焦 */
    blur: function (e) {
        return __assign(__assign({}, baseEventProps(e)), { type: 'blur', detail: { value: e.target.value } });
    },
    /** 按键 */
    keydown: function (e) {
        var value = e.target.value;
        var keyCode = e.keyCode || e.code;
        return __assign(__assign({}, baseEventProps(e)), { type: 'keydown', detail: {
                value: value,
                cursor: value.length,
                keyCode: keyCode,
            } });
    },
    /** 输入 */
    input: function (e) {
        return __assign(__assign({}, baseEventProps(e)), { type: 'input', detail: e.detail });
    },
    /** 动效结束 */
    transitionend: function (e) {
        return __assign(__assign({}, baseEventProps(e)), { type: 'transitionEnd', detail: {
                elapsedTime: e.elapsedTime,
                propertyName: e.propertyName,
            } });
    },
    mouseup: function (e) {
        return __assign(__assign({}, this.click(e)), { type: 'mouseUp' });
    },
    mousedown: function (e) {
        return __assign(__assign({}, this.click(e)), { type: 'mouseDown' });
    },
    touchend: function (e) {
        return commonTouchEventCreater(e);
    },
    touchmove: function (e) {
        return commonTouchEventCreater(e);
    },
    touchstart: function (e) {
        return commonTouchEventCreater(e);
    },
    change: function (e, data) {
        return __assign(__assign({}, baseEventProps(e)), data);
    },
    changing: function (e, data) {
        return __assign(__assign({}, baseEventProps(e)), data);
    },
};
/** 事件名称对应处理名称 */
var reflectEventNameMap = {
    click: 'onClick',
    load: 'onLoad',
    focus: 'onFocus',
    blur: 'onBlur',
    keydown: 'onKeyDown',
    input: 'onInput',
    transitionend: 'onTransitionEnd',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    touchstart: "onTouchStart",
    touchmove: "onTouchMove",
    touchend: "onTouchEnd",
    change: "onChange",
    changing: "onChanging"
};
/**
 * @description 通用事件处理
 * @author CHC
 * @date 2022-03-18 16:03:45
 * @param {React.SyntheticEvent} e
 */
var commonEventHander = function (e, data) {
    if (data === void 0) { data = null; }
    var type = data ? data.type : e.type;
    var key = reflectEventNameMap[type];
    var handler = this.props[key];
    if (!handler || typeof handler !== 'function')
        return;
    var event = reflectEventMap[type];
    var res = reflectEventMap[type](e, data);
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
var commonMouseEventCreater = function (event) {
    var altKey = event.altKey, ctrlKey = event.ctrlKey, shiftKey = event.shiftKey, clientX = event.clientX, clientY = event.clientY, pageX = event.pageX, pageY = event.pageY, screenX = event.screenX, screenY = event.screenY, stopPropagation = event.stopPropagation, type = event.type; event.nativeEvent; var target = event.target, currentTarget = event.currentTarget;
    return {
        type: type,
        detail: {
            altKey: altKey,
            ctrlKey: ctrlKey,
            shiftKey: shiftKey,
            clientX: clientX,
            clientY: clientY,
            pageX: pageX,
            pageY: pageY,
            screenX: screenX,
            screenY: screenY,
        },
        stopPropagation: stopPropagation,
        timeStamp: new Date().getTime(),
        // 真正触发事件的元素
        target: target,
        // 当前元素（冒泡）
        currentTarget: currentTarget
    };
};
/**
 * 创建一个 TouchEvent 对象
 * @param event{React.TouchEvent<T, TouchEvent>}
 */
var commonTouchEventCreater = function (event) {
    var type = event.type, changedTouches = event.changedTouches, targetTouches = event.targetTouches, touches = event.touches, detail = event.detail, target = event.target, stopPropagation = event.stopPropagation;
    return __assign(__assign({}, baseEventProps(event)), { type: type, 
        // 涉及当前(引发)事件的触摸点的列表
        changedTouches: changedTouches, 
        // 当前对象上所有触摸点的列表;
        targetTouches: targetTouches, 
        // 当前屏幕上所有触摸点的列表;
        touches: touches, detail: detail, // 此值是一个数值，可能会有用
        // 真正触发事件的元素
        target: target, stopPropagation: stopPropagation });
};

var cssStyle$4 = {"a-button":{"display":"block","outline":"0","WebkitAppearance":"none","boxSizing":"border-box","padding":"0","textAlign":"center","fontSize":"18px","height":"47px","lineHeight":"47px","borderRadius":"2px","overflow":"hidden","textOverflow":"ellipsis","wordBreak":"break-word","whiteSpace":"nowrap","color":"#000","backgroundColor":"#fff","border":"1px solid #eee"},"active":{"backgroundColor":"#ddd","color":"rgba(0,0,0,.3)"},"disabled":{"color":"rgba(0,0,0,.6)","backgroundColor":"rgba(255,255,255,.6)"}};

/**
 * 判断是否是 animation 名称
 */
var isNaruseAnimaitonName = function (name) { return name && name.substring(0, 19) === 'naruse-h5-poly-fill'; };
/**
 * 获取props中以 'data-' 开头的属性
 * @param props
 */
var getPropsDataSet = function (props) { return Object.keys(props || {}).reduce(function (per, cur) {
    if (cur.indexOf('data-') === 0) {
        per[cur] = props[cur];
    }
    return per;
}, {}); };
var basePropsKey = ['id', 'className', 'style'];
var basePropsKeyU = ['Id', 'ClassName', 'Style'];
var getBaseProps = function (props, keyPrefix) {
    if (keyPrefix === void 0) { keyPrefix = ''; }
    var obj = {};
    var keys = keyPrefix ? basePropsKeyU : basePropsKey;
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (props[keyPrefix + key] === undefined) {
            continue;
        }
        obj[key] = props[key];
    }
    return obj;
};
/**
 * 解析 字符串参数，类型： k=v&k=v&k=v&...
 * 前面没有 ‘？’
 * @param url
 */
function parseURLParam(url) {
    if (url === void 0) { url = ''; }
    if (!url) {
        return {};
    }
    var split = url.split('&');
    var res = {};
    for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
        var item = split_1[_i];
        var kv = item.split('=');
        res[kv[0]] = kv[1];
    }
    return res;
}

var h$d = React.createElement;
var Button = /** @class */ (function (_super) {
    __extends$1(Button, _super);
    function Button() {
        var _this = _super.call(this) || this;
        _this.touch = false;
        _this.state = { hover: false, active: false };
        _this.touch = false;
        return _this;
    }
    /** 当开始点击时 */
    Button.prototype.onTouchStart = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStartTime, hoverStartTime = _b === void 0 ? 20 : _b;
        if (disabled)
            return;
        this.touch = true;
        setTimeout(function () {
            _this.setState({ hover: true });
        }, hoverStartTime);
    };
    /** 点击结束时 */
    Button.prototype.onTouchEnd = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStayTime, hoverStayTime = _b === void 0 ? 70 : _b;
        if (disabled) {
            return;
        }
        this.touch = false;
        setTimeout(function () {
            if (!_this.touch) {
                _this.setState({ hover: false });
            }
        }, hoverStayTime);
    };
    /** 当开始点击时 */
    Button.prototype.onActiveStart = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStartTime, hoverStartTime = _b === void 0 ? 20 : _b;
        if (disabled)
            return;
        this.touch = true;
        setTimeout(function () {
            _this.setState({ active: true });
        }, hoverStartTime);
    };
    /** 点击结束时 */
    Button.prototype.onActiveEnd = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStayTime, hoverStayTime = _b === void 0 ? 70 : _b;
        if (disabled) {
            return;
        }
        this.touch = false;
        setTimeout(function () {
            if (!_this.touch) {
                _this.setState({ active: false });
            }
        }, hoverStayTime);
    };
    Button.prototype.render = function () {
        var _a = this.props, type = _a.type, disabled = _a.disabled, style = _a.style, className = _a.className, hoverStyle = _a.hoverStyle, activeStyle = _a.activeStyle, other = __rest(_a, ["type", "disabled", "style", "className", "hoverStyle", "activeStyle"]);
        var _b = this.state, hover = _b.hover, active = _b.active;
        var conStyle = __assign(__assign(__assign(__assign(__assign({}, cssStyle$4['a-button']), (type ? cssStyle$4[type] : {})), style), (hover ? hoverStyle : {})), (active ? __assign(__assign({}, cssStyle$4.active), activeStyle) : {}));
        return (h$d("button", __assign({ onMouseEnter: this.onTouchStart.bind(this), onMouseLeave: this.onTouchEnd.bind(this), style: conStyle, disabled: disabled, className: className, onClick: commonEventHander.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onTransitionEnd: commonEventHander.bind(this) }, getPropsDataSet(other)), this.props.children));
    };
    return Button;
}(React.Component));

var h$c = React.createElement;
var Checkbox = /** @class */ (function (_super) {
    __extends$1(Checkbox, _super);
    function Checkbox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (e) {
            var onChange = _this.props.onChange;
            onChange && commonEventHander.call(_this, e);
        };
        return _this;
    }
    Checkbox.prototype.render = function () {
        var _a = this.props, id = _a.id, checked = _a.checked, value = _a.value, disabled = _a.disabled, children = _a.children, style = __rest(_a, ["id", "checked", "value", "disabled", "children"]);
        return (h$c("label", __assign({ style: __assign({}, style), htmlFor: id }, getBaseProps(this.props, "label")),
            h$c("input", __assign({}, getBaseProps(this.props), { type: "checkbox", value: value, checked: checked, disabled: disabled, onChange: this.onChange })),
            children));
    };
    return Checkbox;
}(React.Component));

var cssStyle$3 = {"img-empty":{"opacity":"0"},"naruseImg":{"display":"inline-block","overflow":"hidden","position":"relative","fontSize":"0"},"naruseImg__widthfix":{"height":"100%"},"scaletofill":{"objectFit":"contain","width":"100%","height":"100%"},"aspectfit":{"objectFit":"contain","width":"100%","height":"100%"},"aspectfill":{"objectFit":"cover","width":"100%","height":"100%"},"widthfix":{"width":"100%"},"top":{"width":"100%"},"bottom":{"width":"100%","position":"absolute","bottom":"0"},"left":{"height":"100%"},"right":{"position":"absolute","height":"100%","right":"0"},"topright":{"position":"absolute","right":"0"},"bottomleft":{"position":"absolute","bottom":"0"},"bottomright":{"position":"absolute","right":"0","bottom":"0"}};

function withPage(Comp) {
    return /** @class */ (function (_super) {
        __extends$1(WithPageComponent, _super);
        function WithPageComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithPageComponent.prototype.render = function () {
            var page = getCurrentPageInstance();
            var hashs = location.hash.split('?');
            var currentPage = {
                route: hashs[0],
                param: parseURLParam(hashs[1]),
                events: {
                    on: page.on.bind(page),
                    off: page.off.bind(page),
                    once: page.once.bind(page),
                },
            };
            return naruseCreateElement(Comp, __assign(__assign({}, this.props), { currentPage: currentPage }));
        };
        return WithPageComponent;
    }(React.Component));
}
var pages = [];
// 获取当前页面的对象
function getCurrentPageInstance() {
    var hash = location.hash.substring(1);
    if (pages[hash]) {
        return pages[hash];
    }
    pages[hash] = new Page();
    return pages[hash];
}
// 页面可用生命周期函数
var PageEventKey = { onShow: 'onShow', onHide: 'onHide', onPageScroll: 'onPageScroll' };
var PageEventKeys = Object.keys(PageEventKey);
var Page = /** @class */ (function () {
    function Page() {
        // @ts-ignore 事件中心
        this.eventCenter = new EventBus();
    }
    /**
     * 检查 event 、 callback 是否合理
     * @param event
     * @param callback
     */
    Page.prototype.eventCheck = function (event, callback) {
        if (PageEventKeys.indexOf(event) === -1) {
            return false;
        }
        return typeof callback === 'function';
    };
    Page.prototype.on = function (event, callback) {
        if (!this.eventCheck(event, callback)) {
            return;
        }
        this.eventCenter.on(event, callback);
    };
    Page.prototype.off = function (event, callback) {
        if (PageEventKeys.indexOf(event) === -1) {
            return;
        }
        this.eventCenter.off(event, callback);
    };
    Page.prototype.once = function (event, callback) {
        if (!this.eventCheck(event, callback)) {
            return;
        }
        this.eventCenter.once(event, callback);
    };
    // 触发指定 事件
    Page.prototype.call = function (eventName, e) {
        this.eventCenter.emit(eventName, e);
    };
    return Page;
}());
/**
 * 兼容获取浏览器滚动条位置 ，
 */
var getScroll = function () {
    if (currentPageContainer === window || currentPageContainer === document.body || currentPageContainer === document.documentElement) {
        return {
            scrollTop: document.body.scrollTop || document.documentElement.scrollTop || 0,
            scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft || 0
        };
    }
    return {
        scrollTop: currentPageContainer.scrollTop,
        scrollLeft: currentPageContainer.scrollLeft,
    };
};
/**
 * 监听地址栏的hash变化
 */
window.addEventListener('hashchange', function (event) {
    var keys = Object.keys(pages);
    if (keys.length === 0) {
        return;
    }
    var _a = event.oldURL, oldURL = _a === void 0 ? '' : _a, _b = event.newURL, newURL = _b === void 0 ? '' : _b;
    // 隐藏
    var prePage = pages[oldURL.split('#')[1]];
    prePage && prePage.call(PageEventKey.onHide);
    // 显示
    var cur = pages[newURL.split('#')[1]];
    cur && cur.call(PageEventKey.onShow);
});
function onPageScrollEvent() {
    var keys = Object.keys(pages);
    if (keys.length === 0) {
        return;
    }
    var hash = location.hash.substring(1);
    pages[hash] && pages[hash].call(PageEventKey.onPageScroll, getScroll());
}
// 默认window
var currentPageContainer = null;
function withPageInit(_a) {
    var _b = _a.pageContainer, pageContainer = _b === void 0 ? window : _b;
    if (pageContainer && pageContainer !== currentPageContainer) {
        // 切换事件 对象
        currentPageContainer && currentPageContainer.removeEventListener('scroll', onPageScrollEvent);
        pageContainer.addEventListener('scroll', onPageScrollEvent);
        currentPageContainer = pageContainer;
    }
}

var _config = {
    hotPuller: function () {
        logger.error('未初始化热更新拉取，无法更新组件默认为空');
        return Promise.resolve({ code: '', ctx: {} });
    },
    baseCtx: function () {
        return {};
    },
    onRunError: function (err) {
        console.error(err);
    },
    // 自定义 rpx 的单位转换
    convertRpx: function (rpx) { return (rpx / 2 * 1.4).toFixed(1); },
    hotImport: function (_path, _ctx) {
        logger.error('hotImport 函数尚未初始化！');
        return Promise.resolve('');
    },
    unsafeEnabled: {
        compatibleWeexElement: false,
        compatibleWeexElementLog: false,
    }
};
/**
 * @description 获取初始化
 * @author CHC
 * @date 2022-06-14 10:06:50
 * @returns {{ _config: () => Promise<{ code, ctx }>  }}
 */
var getNaruseConfig = function () {
    return _config;
};
/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 * @param newConfig
 */
var naruseInit = function (newConfig) {
    var unsafeEnabled = newConfig.unsafeEnabled;
    delete newConfig.unsafeEnabled;
    Object.assign(_config, newConfig);
    Object.assign(_config.unsafeEnabled, unsafeEnabled);
    var pageContainer = _config.pageContainer;
    withPageInit({ pageContainer: pageContainer });
};

var h$b = React.createElement;
var _Image = /** @class */ (function (_super) {
    __extends$1(_Image, _super);
    function _Image(props) {
        var _this = _super.call(this, props) || this;
        /** 当图片加载完毕 */
        _this.imageOnLoad = function (event) {
            commonEventHander.call(_this, event);
        };
        var compatibleWeexElement = getNaruseConfig().unsafeEnabled.compatibleWeexElement;
        _this.state = { isLoaded: false, imageSize: {}, visible: !compatibleWeexElement };
        _this.imageOnLoad = _this.imageOnLoad.bind(_this);
        _this.observer = {};
        _this.ref = null;
        _this.naturalSize = null;
        return _this;
    }
    _Image.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.lazyLoad) {
            this.observer = new IntersectionObserver(function (entries) {
                // 异步 api 关系
                if (entries[entries.length - 1].isIntersecting) {
                    _this.setState({ isLoaded: true }, function () {
                        _this.ref && (_this.ref.src = _this.props.src);
                    });
                }
            }, { rootMargin: '300px 0px' });
            this.observer.observe(this.ref);
        }
        this.computeNaturalSize(function () {
            _this.adaptationWeex();
            _this.setState({ visible: true });
        });
    };
    _Image.prototype.computeNaturalSize = function (callback) {
        var _this = this;
        var image = new Image();
        image.src = this.props.src;
        image.onload = function () {
            _this.naturalSize = { width: image.width, height: image.height };
            callback(true);
        };
        image.onerror = function () {
            callback(false);
            _this.naturalSize = null;
        };
        image.onabort = function () {
            callback(false);
            _this.naturalSize = null;
        };
    };
    _Image.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var _a, _b, _c, _d;
        if (prevProps.src != this.props.src) {
            this.computeNaturalSize(function () {
                _this.adaptationWeex();
            });
        }
        else if (((_a = prevProps.style) === null || _a === void 0 ? void 0 : _a.width) !== ((_b = this.props.style) === null || _b === void 0 ? void 0 : _b.width)
            || ((_c = prevProps.style) === null || _c === void 0 ? void 0 : _c.height) !== ((_d = this.props.style) === null || _d === void 0 ? void 0 : _d.height)) {
            this.adaptationWeex();
        }
    };
    _Image.prototype.adaptationWeex = function () {
        var _a = this.props, _b = _a.style, style = _b === void 0 ? {} : _b, mode = _a.mode;
        var _c = getNaruseConfig(), _d = _c.unsafeEnabled, compatibleWeexElement = _d.compatibleWeexElement, compatibleWeexElementLog = _d.compatibleWeexElementLog, convertRpx = _c.convertRpx;
        if (compatibleWeexElementLog) {
            console.log('compatibleWeexElement:', this.props, this.naturalSize);
        }
        if (compatibleWeexElement
            && (style.height == undefined && style.width === undefined)
            && this.naturalSize) {
            switch (mode) {
                case 'widthFix':
                    this.setState({
                        imageSize: {
                            maxWidth: convertRpx(this.naturalSize.width) + 'px',
                        }
                    });
                    return;
                case 'heightFix':
                    this.setState({
                        imageSize: {
                            maxHeight: convertRpx(this.naturalSize.height) + 'px',
                        }
                    });
                    return;
            }
        }
        else {
            this.setState({ imageSize: {} });
        }
    };
    _Image.prototype.componentWillUnmount = function () {
        this.observer.disconnect && this.observer.disconnect();
    };
    _Image.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, src = _a.src, _b = _a.style, style = _b === void 0 ? {} : _b, mode = _a.mode, onError = _a.onError, imgProps = _a.imgProps, id = _a.id, other = __rest(_a, ["className", "src", "style", "mode", "onError", "imgProps", "id"]);
        var _c = this.state, imageSize = _c.imageSize, visible = _c.visible;
        if (!visible) {
            return null;
        }
        var divStyle = __assign(__assign({}, cssStyle$3.naruseImg), (mode === 'widthFix' ? cssStyle$3.naruseImg__widthfix : {}));
        var imgStyle = cssStyle$3[(mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')];
        return (h$b("div", { onClick: commonEventHander.bind(this), className: className, style: __assign(__assign({}, divStyle), style) },
            h$b("img", __assign({ key: 'img', ref: function (img) { return (_this.ref = img); }, id: id, style: __assign(__assign({}, imageSize), imgStyle), src: src, onLoad: this.imageOnLoad, onError: onError, onTransitionEnd: commonEventHander.bind(this) }, imgProps, getPropsDataSet(other)))));
    };
    return _Image;
}(React.Component));

var h$a = React.createElement;
/** 是否是支持的type */
var getTrueType = function getTrueType(type, confirmType, password) {
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
var fixControlledValue = function fixControlledValue(value) {
    return value !== null && value !== void 0 ? value : '';
};
var Input = /** @class */ (function (_super) {
    __extends$1(Input, _super);
    function Input() {
        var _this = _super.call(this) || this;
        /** 聚焦 */
        _this.handleFocus = commonEventHander.bind(_this);
        /** 脱焦 */
        _this.handleBlur = commonEventHander.bind(_this);
        /** 改变 */
        _this.handleChange = commonEventHander.bind(_this);
        /** 按下 */
        _this.handleKeyDown = function (e) {
            var value = e.target.value;
            var keyCode = e.keyCode || e.code;
            commonEventHander.call(_this, e);
            keyCode === 13 && _this.props.onConfirm && _this.props.onConfirm({ value: value });
        };
        _this.ref = null;
        _this.isOnComposition = false;
        _this.onInputExcuted = false;
        _this.el = {};
        _this.state = { _value: '' };
        return _this;
    }
    Input.prototype.componentDidMount = function () {
        var _this = this;
        var _a;
        if (this.props.type === 'file') {
            this.fileListener = function (e) {
                _this.props.onInput && _this.props.onInput(e);
            };
            (_a = this.ref) === null || _a === void 0 ? void 0 : _a.addEventListener('change', this.fileListener);
        }
        Object.defineProperty(this.el, 'value', {
            get: function () { var _a; return (_a = _this.ref) === null || _a === void 0 ? void 0 : _a.value; },
            set: function (value) {
                _this.setState({
                    _value: value,
                });
            },
            configurable: true,
        });
        setTimeout(function () { var _a; return _this.props.focus && ((_a = _this.ref) === null || _a === void 0 ? void 0 : _a.focus()); });
    };
    /** 输入 */
    Input.prototype.handleInput = function (e) {
        e.stopPropagation();
        var _a = this.props, type = _a.type, maxlength = _a.maxlength, confirmType = _a.confirmType, password = _a.password;
        var value = e.target.value;
        var inputType = getTrueType(type, confirmType, password);
        if (inputType === 'number' && value && maxlength <= value.length) {
            value = value.substring(0, maxlength);
            e.target.value = value;
        }
        this._value = value;
        this.setState({ _value: value });
        commonEventHander.call(this, {
            type: 'input', detail: {
                value: value,
                cursor: value.length,
            }
        });
    };
    Input.prototype.render = function () {
        var _this = this;
        var _a = this.props, type = _a.type, password = _a.password, placeholder = _a.placeholder, disabled = _a.disabled, maxlength = _a.maxlength, confirmType = _a.confirmType, name = _a.name, className = _a.className, value = _a.value, controlled = _a.controlled, other = __rest(_a, ["type", "password", "placeholder", "disabled", "maxlength", "confirmType", "name", "className", "value", "controlled"]);
        var _value = this.state._value;
        return (h$a("input", __assign({ ref: function (input) {
                _this.ref = input;
            }, className: className, 
            // 受控则只使用外部值，非受控优先使用外部值
            value: fixControlledValue(controlled ? value : (value !== null && value !== void 0 ? value : _value)), type: getTrueType(type, confirmType, password), placeholder: placeholder, disabled: disabled, maxLength: maxlength, name: name, onInput: this.handleInput.bind(this), onFocus: this.handleFocus.bind(this), onBlur: this.handleBlur.bind(this), onChange: this.handleChange.bind(this), onKeyDown: this.handleKeyDown.bind(this) }, getPropsDataSet(other))));
    };
    return Input;
}(React.Component));

var cssStyle$2 = {"text":{"MozUserSelect":"none","WebkitUserSelect":"none","MsUserSelect":"none","userSelect":"none"},"textSelectable":{"MozUserSelect":"text","WebkitUserSelect":"text","MsUserSelect":"text","userSelect":"text"}};

var h$9 = React.createElement;
var Text = /** @class */ (function (_super) {
    __extends$1(Text, _super);
    function Text() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hover: false
        };
        _this.touch = false;
        return _this;
    }
    /** 当开始点击时 */
    Text.prototype.onTouchStart = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStartTime, hoverStartTime = _b === void 0 ? 20 : _b;
        if (disabled)
            return;
        this.touch = true;
        setTimeout(function () {
            _this.setState({ hover: true });
        }, hoverStartTime);
    };
    /** 点击结束时 */
    Text.prototype.onTouchEnd = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStayTime, hoverStayTime = _b === void 0 ? 70 : _b;
        if (disabled) {
            return;
        }
        this.touch = false;
        setTimeout(function () {
            if (!_this.touch) {
                _this.setState({ hover: false });
            }
        }, hoverStayTime);
    };
    Text.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, id = _a.id, _b = _a.selectable, selectable = _b === void 0 ? false : _b, style = _a.style, hoverStyle = _a.hoverStyle, other = __rest(_a, ["className", "id", "selectable", "style", "hoverStyle"]);
        var hover = this.state.hover;
        var cls = __assign(__assign(__assign(__assign({}, cssStyle$2.text), (selectable ? cssStyle$2.textSelectable : {})), style), (hover ? hoverStyle : {}));
        return (h$9("span", __assign({ id: id, ref: function (ref) { return _this.ref = ref; }, onMouseEnter: this.onTouchStart.bind(this), onMouseLeave: this.onTouchEnd.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), style: cls, className: className, onClick: commonEventHander.bind(this) }, getPropsDataSet(other)), this.props.children));
    };
    return Text;
}(React.Component));

var h$8 = React.createElement;
var View = /** @class */ (function (_super) {
    __extends$1(View, _super);
    function View() {
        var _this = _super.call(this) || this;
        _this.mounted = false;
        _this.touch = false;
        _this.hasFirstAppear = false;
        _this.state = {
            hover: false
        };
        return _this;
    }
    View.prototype.componentDidMount = function () {
        this.mounted = true;
        // 等待装载完毕后再启动animation
        this.updateAnimation();
        this.updateAppear();
    };
    View.prototype.componentDidUpdate = function () {
        this.updateAnimation();
        this.updateAppear();
    };
    View.prototype.updateAnimation = function () {
        var _this = this;
        var animation = this.props.animation;
        if (animation !== this.lastAnimationName && isNaruseAnimaitonName(animation)) {
            // 等待组件彻底装载完毕后再启动animation，否则会出现动画不生效的情况
            clearTimeout(this.animationTimer);
            this.animationTimer = setTimeout(function () { var _a; return (_a = _this.ref) === null || _a === void 0 ? void 0 : _a.setAttribute('data-animation', animation); });
            this.lastAnimationName = animation;
        }
    };
    View.prototype.updateAppear = function () {
        var _a = this.props, onAppear = _a.onAppear, onDisappear = _a.onDisappear, onFirstAppear = _a.onFirstAppear;
        var hasAppear = onAppear || onDisappear || onFirstAppear;
        if (hasAppear && this.ref) {
            var isOnlyFirst = onFirstAppear && !onAppear && !onDisappear;
            if (isOnlyFirst && this.hasFirstAppear)
                return;
            // 开始观察
            this.startObserver(isOnlyFirst);
        }
    };
    View.prototype.startObserver = function (isOnlyFirst) {
        var _this = this;
        if (this.observer)
            return;
        if (window.IntersectionObserver === undefined) {
            console.warn('IntersectionObserver is not supported in this browser, please use polyfill.');
            return;
        }
        this.observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var _a;
                if (entry.intersectionRatio >= 0.5) {
                    _this.props.onAppear && _this.props.onAppear();
                    if (_this.props.onFirstAppear) {
                        if (_this.hasFirstAppear)
                            return;
                        _this.props.onFirstAppear();
                    }
                    if (isOnlyFirst) {
                        (_a = _this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
                        _this.observer = undefined;
                    }
                    _this.hasFirstAppear = true;
                }
                else {
                    // 没有展示过的不会触发消失事件
                    if (!_this.hasFirstAppear)
                        return;
                    _this.props.onDisappear && _this.props.onDisappear();
                }
            });
        }, {
            threshold: [0.5]
        });
        this.observer.observe(this.ref);
    };
    View.prototype.componentWillUnmount = function () {
        var _a, _b;
        this.mounted = false;
        // 清除动画
        clearTimeout(this.hoverTimer);
        clearTimeout(this.animationTimer);
        // 清除观察
        (_b = (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.observer = undefined;
    };
    /** 当开始点击时 */
    View.prototype.onTouchStart = function (event) {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStartTime, hoverStartTime = _b === void 0 ? 20 : _b, onTouchStart = _a.onTouchStart;
        if (disabled || !this.mounted)
            return;
        this.touch = true;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(function () {
            _this.setState({ hover: true });
        }, hoverStartTime);
        event && onTouchStart && onTouchStart(commonTouchEventCreater(event));
    };
    /** 点击结束时 */
    View.prototype.onTouchEnd = function (event) {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStayTime, hoverStayTime = _b === void 0 ? 70 : _b, onTouchEnd = _a.onTouchEnd;
        if (disabled || !this.mounted)
            return;
        this.touch = false;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(function () {
            if (!_this.touch) {
                _this.setState({ hover: false });
            }
        }, hoverStayTime);
        event && onTouchEnd && onTouchEnd(commonTouchEventCreater(event));
    };
    View.prototype.onMouseEnter = function (event) {
        var onMouseEnter = this.props.onMouseEnter;
        onMouseEnter && onMouseEnter(commonMouseEventCreater(event));
        this.onTouchStart();
    };
    View.prototype.onMouseMove = function (event) {
        var onMouseMove = this.props.onMouseMove;
        onMouseMove && onMouseMove(commonMouseEventCreater(event));
    };
    View.prototype.onMouseLeave = function (event) {
        var onMouseLeave = this.props.onMouseLeave;
        onMouseLeave && onMouseLeave(commonMouseEventCreater(event));
        this.onTouchEnd();
    };
    View.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, hoverStyle = _a.hoverStyle, id = _a.id, other = __rest(_a, ["className", "style", "hoverStyle", "id"]);
        var hover = this.state.hover;
        var conStyle = __assign(__assign({}, style), (hover ? hoverStyle : {}));
        return (h$8("div", __assign({ id: id, ref: function (ref) { return _this.ref = ref; }, onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), onMouseMove: this.onMouseMove.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchMove: commonEventHander.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onTransitionEnd: commonEventHander.bind(this), onMouseDown: commonEventHander.bind(this), onMouseUp: commonEventHander.bind(this), className: className, style: conStyle, onClick: commonEventHander.bind(this) }, getPropsDataSet(other)), this.props.children));
    };
    return View;
}(React.Component));

var cssStyle$1 = {"scroll":{"WebkitOverflowScrolling":"auto"},"scroll::-webkit-scrollbar":{"display":"none"},"scroll-view":{"overflow":"hidden"}};

var h$7 = React.createElement;
function throttle(fn, threshold, scope) {
    if (threshold === void 0) { threshold = 250; }
    var lastTime = 0;
    var deferTimer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var context = scope || this;
        var now = Date.now();
        if (now - lastTime > threshold) {
            fn.apply(this, args);
            lastTime = now;
        }
        else {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                lastTime = now;
                fn.apply(context, args);
            }, threshold);
        }
    };
}
function easeOutScroll(from, to, callback) {
    if (from === void 0) { from = 0; }
    if (to === void 0) { to = 0; }
    if (from === to || typeof from !== 'number') {
        return;
    }
    var change = to - from;
    var dur = 500;
    var sTime = +new Date();
    function linear(t, b, c, d) {
        return (c * t) / d + b;
    }
    var isLarger = to >= from;
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
    (_a = document.querySelector("#".concat(id))) === null || _a === void 0 ? void 0 : _a.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
    });
}
function scrollVertical(top, isAnimation) {
    var _this = this;
    if (isAnimation) {
        easeOutScroll(this._scrollTop, top, function (pos) {
            if (_this.container)
                _this.container.scrollTop = pos;
        });
    }
    else {
        if (this.container)
            this.container.scrollTop = top;
    }
    this._scrollTop = top;
}
function scrollHorizontal(left, isAnimation) {
    var _this = this;
    if (isAnimation) {
        easeOutScroll(this._scrollLeft, left, function (pos) {
            if (_this.container)
                _this.container.scrollLeft = pos;
        });
    }
    else {
        if (this.container)
            this.container.scrollLeft = left;
    }
    this._scrollLeft = left;
}
var scrollBar$1 = document.createElement('style');
scrollBar$1.type = 'text/css';
scrollBar$1.id = '_theOnlyScrollBar';
scrollBar$1.innerHTML = "\n    ._scrollView::-webkit-scrollbar {\n        display: none\n    }\n";
var head$1 = document.getElementsByTagName('head').item(0);
if (!document.getElementById('_theOnlyScrollBar')) {
    head$1 === null || head$1 === void 0 ? void 0 : head$1.append(scrollBar$1);
}
var ScrollView = /** @class */ (function (_super) {
    __extends$1(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scrollTop = undefined;
        _this._scrollLeft = undefined;
        _this.container = null;
        _this.ref = null;
        _this.onTouchMove = function (e) {
            e.stopPropagation();
        };
        return _this;
    }
    ScrollView.prototype.componentDidMount = function () {
        this.handleScroll(this.props, true);
        this.updateAnimation();
    };
    ScrollView.prototype.componentDidUpdate = function () {
        this.handleScroll(this.props);
        this.updateAnimation();
    };
    ScrollView.prototype.updateAnimation = function () {
        var _this = this;
        var animation = this.props.animation;
        if (animation !== this.lastAnimationName) {
            // 等待组件彻底装载完毕后再启动animation，否则会出现动画不生效的情况
            setTimeout(function () { var _a; return (_a = _this.container) === null || _a === void 0 ? void 0 : _a.setAttribute('data-animation', animation); });
            this.lastAnimationName = animation;
        }
    };
    ScrollView.prototype.handleScroll = function (props, isInit) {
        var _this = this;
        if (isInit === void 0) { isInit = false; }
        if (props.scrollIntoView &&
            typeof props.scrollIntoView === 'string' &&
            document &&
            document.querySelector &&
            document.querySelector("#".concat(props.scrollIntoView))) {
            if (isInit) {
                setTimeout(function () { return scrollIntoView(props.scrollIntoView); }, 500);
            }
            else {
                scrollIntoView(props.scrollIntoView);
            }
        }
        else {
            var isAnimation_1 = 'scrollWithAnimation' in props;
            // Y 轴滚动
            if (props.scrollY && typeof props.scrollTop === 'number' && props.scrollTop !== this._scrollTop) {
                if (isInit) {
                    setTimeout(function () { return scrollVertical.bind(_this)(props.scrollTop, isAnimation_1); }, 10);
                }
                else {
                    scrollVertical.bind(this)(props.scrollTop, isAnimation_1);
                }
            }
            // X 轴滚动
            if (props.scrollX && typeof props.scrollLeft === 'number' && props.scrollLeft !== this._scrollLeft) {
                if (isInit) {
                    setTimeout(function () { return scrollHorizontal.bind(_this)(props.scrollLeft, isAnimation_1); }, 10);
                }
                else {
                    scrollHorizontal.bind(this)(props.scrollLeft, isAnimation_1);
                }
            }
        }
    };
    ScrollView.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, scrollX = _a.scrollX, scrollY = _a.scrollY, onScroll = _a.onScroll, onScrollToUpper = _a.onScrollToUpper, onScrollToLower = _a.onScrollToLower, onTouchMove = _a.onTouchMove, animation = _a.animation, id = _a.id, other = __rest(_a, ["className", "style", "scrollX", "scrollY", "onScroll", "onScrollToUpper", "onScrollToLower", "onTouchMove", "animation", "id"]);
        var _c = this.props, upperThreshold = _c.upperThreshold, lowerThreshold = _c.lowerThreshold;
        upperThreshold = upperThreshold ? Number(upperThreshold) : 0;
        lowerThreshold = lowerThreshold ? Number(lowerThreshold) : 0;
        var scrollWhere = {
            overflowX: (scrollX ? 'scroll' : 'hidden'),
            overflowY: (scrollY ? 'scroll' : 'hidden'),
        };
        var upperAndLower = function (e) {
            if (!_this.container)
                return;
            var _a = _this.container, offsetWidth = _a.offsetWidth, offsetHeight = _a.offsetHeight, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, scrollWidth = _a.scrollWidth;
            // 滚动到距离顶部/左边多远就触发事件
            if (onScrollToLower &&
                ((_this.props.scrollY && offsetHeight + scrollTop + lowerThreshold >= scrollHeight) ||
                    (_this.props.scrollX && offsetWidth + scrollLeft + lowerThreshold >= scrollWidth))) {
                onScrollToLower(e);
            }
            if (onScrollToUpper &&
                ((_this.props.scrollY && scrollTop <= upperThreshold) || (_this.props.scrollX && scrollLeft <= upperThreshold))) {
                onScrollToUpper(e);
            }
        };
        var upperAndLowerThrottle = throttle(upperAndLower, 200);
        var _onScroll = function (e) {
            var _a = _this.container, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, scrollWidth = _a.scrollWidth;
            _this._scrollLeft = scrollLeft;
            _this._scrollTop = scrollTop;
            Object.defineProperty(e, 'detail', {
                enumerable: true,
                writable: true,
                value: {
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop,
                    scrollHeight: scrollHeight,
                    scrollWidth: scrollWidth,
                }
            });
            var event = { type: 'scroll', detail: {
                    scrollLeft: scrollLeft,
                    scrollTop: scrollTop,
                    scrollHeight: scrollHeight,
                    scrollWidth: scrollWidth,
                }, timestamp: new Date().getTime() };
            upperAndLowerThrottle(event);
            onScroll && onScroll(event);
        };
        var _onTouchMove = function (e) {
            onTouchMove ? onTouchMove(e) : _this.onTouchMove(e);
        };
        return (h$7("div", __assign({ id: id, "data-animation": animation, className: "".concat(className, " _scrollView"), ref: function (container) {
                _this.container = container;
                _this.ref = container;
            }, style: __assign(__assign(__assign({}, cssStyle$1.scroll), style), scrollWhere), onScroll: _onScroll, onTouchMove: _onTouchMove, onTransitionEnd: commonEventHander.bind(this) }, getPropsDataSet(other)), this.props.children));
    };
    return ScrollView;
}(React.Component));
ScrollView.defaultProps = {
    scrollX: false,
    scrollY: false,
    upperThreshold: 50,
    lowerThreshold: 50,
    scrollWithAnimation: false,
};

var cssStyle = {"taroTextarea":{"display":"block","appearance":"none","cursor":"auto","lineHeight":"1.5","resize":"none","outline":"none"}};

var h$6 = React.createElement;
var scrollBar = document.createElement('style');
scrollBar.type = 'text/css';
scrollBar.id = '_theOnlytextarea';
scrollBar.innerHTML = "\n    .taroTextareaCore {\n        &:focus {\n            outline: none;\n          }\n    }\n    .taroTextareaCore::-webkit-scrollbar {\n        display: none\n    }\n";
var head = document.getElementsByTagName('head').item(0);
if (!document.getElementById('_theOnlytextarea')) {
    head.append(scrollBar);
}
var Textarea = /** @class */ (function (_super) {
    __extends$1(Textarea, _super);
    function Textarea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ref = null;
        _this.el = null;
        _this.value = '';
        _this.line = 1;
        _this.handleLineChange = function () {
            var line = _this.getNumberOfLines();
            if (line !== _this.line) {
                _this.line = line;
                _this.ref.rows = line;
            }
        };
        _this.getNumberOfLines = function () {
            var ta = _this.ref, style = window.getComputedStyle ? window.getComputedStyle(ta) : ta.style, 
            // This will get the line-height only if it is set in the css,
            // otherwise it's "normal"
            taLineHeight = parseInt(style.lineHeight, 10), 
            // Get the scroll height of the textarea
            taHeight = _this.calculateContentHeight(ta, taLineHeight), 
            // calculate the number of lines
            numberOfLines = Math.ceil(taHeight / taLineHeight);
            return numberOfLines;
        };
        _this.calculateContentHeight = function (ta, scanAmount) {
            var cta = getComputedStyle(ta);
            var origHeight = ta.style.height, height = ta.offsetHeight, scrollHeight = parseFloat(cta.height), overflow = ta.style.overflow, originMinHeight = ta.style.minHeight || null;
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
        return _this;
    }
    Textarea.prototype.componentDidMount = function () {
        var _a = this.props.value, value = _a === void 0 ? '' : _a;
        if (value != '') {
            this.ref.value = value;
        }
    };
    Textarea.prototype.render = function () {
        var _this = this;
        var _a = this.props, style = _a.style, placeholder = _a.placeholder, disabled = _a.disabled, maxLength = _a.maxLength, autoFocus = _a.autoFocus, autoHeight = _a.autoHeight, name = _a.name, nativeProps = _a.nativeProps, onInput = _a.onInput, onFocus = _a.onFocus, onBlur = _a.onBlur, onConfirm = _a.onConfirm, other = __rest(_a, ["style", "placeholder", "disabled", "maxLength", "autoFocus", "autoHeight", "name", "nativeProps", "onInput", "onFocus", "onBlur", "onConfirm"]);
        var otherProps = {};
        if (autoHeight) {
            otherProps.rows = this.line;
            cssStyle.taroTextarea.height = 'auto';
        }
        var _onInput = function (e) {
            var value = _this.ref.value;
            var event = {
                type: 'input', detail: {
                    value: value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onInput && onInput(event);
            if (autoHeight)
                _this.handleLineChange();
        };
        var _onFocus = function (e) {
            var value = _this.ref.value;
            var event = {
                type: 'focus', detail: {
                    value: value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onFocus && onFocus(event);
        };
        var _onBlur = function (e) {
            var value = _this.ref.value;
            var event = {
                type: 'blur', detail: {
                    value: value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onBlur && onBlur(event);
        };
        var _onConfirm = function (e) {
            if (e.keyCode === 13) {
                var value = _this.ref.value;
                var event_1 = {
                    type: 'confirm', detail: {
                        value: value,
                        cursor: value.length,
                    }, timestamp: new Date().getTime()
                };
                onConfirm && onConfirm(event_1);
            }
        };
        return (h$6("textarea", __assign({ ref: function (input) {
                if (input) {
                    _this.ref = input;
                }
            }, style: __assign(__assign({}, style), cssStyle.taroTextarea), className: 'taroTextareaCore', placeholder: placeholder, name: name, disabled: !!disabled, maxLength: maxLength, autoFocus: autoFocus, onInput: _onInput, onFocus: _onFocus, onBlur: _onBlur, onKeyUp: _onConfirm }, getPropsDataSet(other), nativeProps, otherProps)));
    };
    return Textarea;
}(React.Component));
Textarea.defaultProps = {
    disabled: false,
    maxlength: 140,
    readonly: false,
    focus: false,
    autoHeight: false,
    showCount: true,
    controlled: false,
};

var dist = {};

Object.defineProperty(dist, '__esModule', { value: true });

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

var isProduction = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }
  if (isProduction) {
    throw new Error(prefix);
  }
  throw new Error(prefix + ": " + (message || ''));
}

invariant(typeof Symbol === 'function' && Symbol["for"], 'react-class-hooks needs Symbols!');

// Separate objects for better debugging.
var MAGIC_STATES = Symbol["for"]('States');
var MAGIC_EFFECTS = Symbol["for"]('Effects');
var MAGIC_MEMOS = Symbol["for"]('Memos');
var MAGIC_REFS = Symbol["for"]('Refs');
var MAGIC_STACKS = Symbol["for"]('Stacks');
var mustFristInit = function mustFristInit() {
  throw new Error('You must call reactLikeHooksInit first!');
};
var defaultConfig = {
  isOrginReact: false,
  getDispatcher: mustFristInit,
  getSelfComponent: mustFristInit
};
function getMagicSelf() {
  invariant(defaultConfig.getSelfComponent(), 'You are using Hooks outside of "render" Component Method!');
  return defaultConfig.getSelfComponent();
}
function checkSymbol(name, keySymbol) {
  invariant(_typeof(keySymbol) === 'symbol', "".concat(name, " - Expected a Symbol for key!"));
}

/**
 * @description 初始化 react like hooks
 * @author CHC
 * @date 2023-03-22 20:03:49
 * @param {*} FacotoryObject
 * @param {*} specialCurrentObjectPath
 * @param {boolean} [isOrginReact=false]
 */
var reactLikeHooksInit = function reactLikeHooksInit(_ref) {
  var getDispatcher = _ref.getDispatcher,
    getSelfComponent = _ref.getSelfComponent,
    _ref$isOrginReact = _ref.isOrginReact,
    isOrginReact = _ref$isOrginReact === void 0 ? false : _ref$isOrginReact;
  defaultConfig.getDispatcher = getDispatcher;
  defaultConfig.getSelfComponent = getSelfComponent;
  defaultConfig.isOrginReact = isOrginReact;
};

function MagicStack(StackName) {
  var _this = this;
  this.name = StackName;
  this.symbol = Symbol("".concat(this.name, ".Stack"));
  // this.cleanSymbol = Symbol(`${this.name}.Stack.Cleaner`);
  this.keys = [];
  this.getKey = function (stackIndex) {
    var len = _this.keys.length;
    // create if not exist
    if (stackIndex > len) {
      for (var i = len; i < stackIndex; i += 1) _this.keys.push(Symbol("".concat(_this.name, "-").concat(i)));
    }
    return _this.keys[stackIndex - 1];
  };
}
function useMagicStack(magicStack, hook) {
  // inject next renders stack counter cleaner
  var self = getMagicSelf();
  if (!self[MAGIC_STACKS]) {
    self[MAGIC_STACKS] = {};
    var renderFunc = self.render.bind(self);
    self.render = function () {
      Object.getOwnPropertySymbols(self[MAGIC_STACKS]).forEach(function (k) {
        self[MAGIC_STACKS][k] = 0;
      });
      return renderFunc.apply(void 0, arguments);
    };
  }

  // stack counter init
  if (!self[MAGIC_STACKS][magicStack.symbol]) {
    self[MAGIC_STACKS][magicStack.symbol] = 0;
  }

  // stack counter update
  self[MAGIC_STACKS][magicStack.symbol] += 1;
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  return hook.apply(void 0, [magicStack.getKey(self[MAGIC_STACKS][magicStack.symbol])].concat(args));
}

function createHook(stackName, hook) {
  var stack = new MagicStack(stackName);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args && args.length && _typeof(args[0]) === 'symbol') return hook.apply(void 0, args);
    return useMagicStack.apply(void 0, [stack, hook].concat(args));
  };
}
function createNamedHook(name, hook) {
  var keySymbol = Symbol(name);
  return hook.bind(null, keySymbol);
}

function setDevToolsHookState(name, state) {
}

function useClassStateKey(keySymbol, initialValue) {
  checkSymbol('useClassStateKey', keySymbol);
  var self = getMagicSelf();

  // first time Render && first Hook
  if (!self[MAGIC_STATES]) self[MAGIC_STATES] = {};

  // first time Render -> assign initial Value and create Setter
  if (!self[MAGIC_STATES].hasOwnProperty(keySymbol)) {
    self[MAGIC_STATES][keySymbol] = {
      value: typeof initialValue === 'function' ? initialValue() : initialValue,
      setValue: function setValue(value, callback) {
        var newState = typeof value === 'function' ? value(self[MAGIC_STATES][keySymbol].value) : value;
        if (self[MAGIC_STATES][keySymbol].value !== newState) {
          self[MAGIC_STATES][keySymbol].value = newState;
          if (self.updater.isMounted(self)) {
            self.updater.enqueueForceUpdate(self, callback);
          }
        }
      }
    };
  }
  var _self$MAGIC_STATES$ke = self[MAGIC_STATES][keySymbol],
    value = _self$MAGIC_STATES$ke.value,
    setValue = _self$MAGIC_STATES$ke.setValue;
  setDevToolsHookState(keySymbol.description);
  return [value, setValue];
}

var useClassState = createHook('States', useClassStateKey);
useClassState.create = function (name) {
  return createNamedHook(name, useClassStateKey);
};
useClassState.createStack = function (stackName) {
  return createHook(stackName, useClassStateKey);
};

function inputsArrayEqual(inputs, prevInputs) {
  invariant(inputs.length === prevInputs.length, 'Hooks inputs array length should be constant between renders!');

  // Object.is polyfill
  for (var i = 0; i < inputs.length; i += 1) {
    var val1 = inputs[i];
    var val2 = prevInputs[i];
    if (!(val1 === val2 && (val1 !== 0 || 1 / val1 === 1 / val2) || val1 !== val1 && val2 !== val2)) {
      // eslint-disable-line
      return false;
    }
  }
  return true;
}

var useClassEffectKey = function useClassEffectKey(keySymbol, creator, inputs) {
  var onlyDidUpdate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  checkSymbol('useClassEffect', keySymbol);
  invariant(typeof creator === 'function', 'Creator should be a function!');
  invariant(!inputs || Array.isArray(inputs), 'inputs should be an array!');
  var self = getMagicSelf();

  // create MAGIC_EFFECTS if not exists
  if (!self[MAGIC_EFFECTS]) self[MAGIC_EFFECTS] = {};

  // First Render -> Assign creator, inputs and inject methods
  // TODO didCatch
  if (!self[MAGIC_EFFECTS].hasOwnProperty(keySymbol)) {
    self[MAGIC_EFFECTS][keySymbol] = {
      creator: creator,
      inputs: inputs
    };
    if (!onlyDidUpdate) {
      // inject componentDidMount
      var didMount = typeof self.componentDidMount === 'function' ? self.componentDidMount.bind(self) : undefined;
      self.componentDidMount = function () {
        if (didMount) didMount();
        self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator();
        // save last executed inputs
        self[MAGIC_EFFECTS][keySymbol].prevInputs = self[MAGIC_EFFECTS][keySymbol].inputs;
        invariant(!self[MAGIC_EFFECTS][keySymbol].cleaner || typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function', 'useClassEffect return (Effect Cleaner) should be Function or Void !');
      };
    }

    // inject componentDidUpdate
    var didUpdate = typeof self.componentDidUpdate === 'function' ? self.componentDidUpdate.bind(self) : undefined;
    self.componentDidUpdate = function () {
      if (didUpdate) didUpdate.apply(void 0, arguments);

      // execute if no inputs || inputs array has values and values changed
      var execute = !self[MAGIC_EFFECTS][keySymbol].inputs || !inputsArrayEqual(self[MAGIC_EFFECTS][keySymbol].inputs, self[MAGIC_EFFECTS][keySymbol].prevInputs);
      if (execute) {
        if (typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function') self[MAGIC_EFFECTS][keySymbol].cleaner();
        self[MAGIC_EFFECTS][keySymbol].cleaner = self[MAGIC_EFFECTS][keySymbol].creator();
        // save last executed inputs!
        self[MAGIC_EFFECTS][keySymbol].prevInputs = self[MAGIC_EFFECTS][keySymbol].inputs;
        invariant(!self[MAGIC_EFFECTS][keySymbol].cleaner || typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function', 'useClassEffect return (Effect Cleaner) should be Function or Void !');
      }
    };

    // inject componentWillUnmount
    var unmount = typeof self.componentWillUnmount === 'function' ? self.componentWillUnmount.bind(self) : undefined;
    self.componentWillUnmount = function () {
      if (unmount) unmount();
      if (typeof self[MAGIC_EFFECTS][keySymbol].cleaner === 'function') self[MAGIC_EFFECTS][keySymbol].cleaner();
    };
  } else {
    // next renders
    self[MAGIC_EFFECTS][keySymbol].creator = creator;
    self[MAGIC_EFFECTS][keySymbol].inputs = inputs;
  }
};

var useClassEffect = createHook('Effects', useClassEffectKey);
useClassEffect.create = function (name) {
  return createNamedHook(name, useClassEffectKey);
};
useClassEffect.createStack = function (stackName) {
  return createHook(stackName, useClassEffectKey);
};

var useClassMemoKey = function useClassMemoKey(keySymbol, creator, inputs) {
  checkSymbol('useClassMemo', keySymbol);
  invariant(typeof creator === 'function', 'Creator should be a function!');
  invariant(!inputs || Array.isArray(inputs), 'inputs should be an array!');
  var self = getMagicSelf();

  // create magic Memos if not exists
  if (!self[MAGIC_MEMOS]) self[MAGIC_MEMOS] = {};

  // First Render -> assign creator, inputs, value
  if (!self[MAGIC_MEMOS].hasOwnProperty(keySymbol)) {
    self[MAGIC_MEMOS][keySymbol] = {
      creator: creator,
      inputs: inputs,
      value: creator()
    };
  } else {
    // next renders
    var execute = false;
    if (!inputs) {
      if (creator !== self[MAGIC_MEMOS][keySymbol].creator) {
        execute = true;
      }
    } else {
      execute = !inputsArrayEqual(inputs, self[MAGIC_MEMOS][keySymbol].inputs);
    }
    if (execute) {
      self[MAGIC_MEMOS][keySymbol] = {
        creator: creator,
        inputs: inputs,
        value: creator()
      };
    }
  }
  var returnValue = self[MAGIC_MEMOS][keySymbol].value;
  setDevToolsHookState(keySymbol.description);
  return returnValue;
};
var useClassMemo = createHook('Memos', useClassMemoKey);
useClassMemo.create = function (name) {
  return createNamedHook(name, useClassMemoKey);
};
useClassMemo.createStack = function (stackName) {
  return createHook(stackName, useClassMemoKey);
};

function useClassCallbackKey(keySymbol, callback, inputs) {
  return useClassMemoKey(keySymbol, function () {
    return callback;
  }, inputs);
}
var useClassCallback = createHook('Callbacks', useClassCallbackKey);
useClassCallback.create = function (name) {
  return createNamedHook(name, useClassCallbackKey);
};
useClassCallback.createStack = function (stackName) {
  return createHook(stackName, useClassCallbackKey);
};

var useClassReducerKey = function useClassReducerKey(keySymbol, reducer, initialState) {
  var stateSetState = useClassStateKey(keySymbol, initialState);
  var state = stateSetState[0];
  var setState = stateSetState[1];
  function dispatch(action) {
    var nextState = reducer(state, action);
    setState(nextState);
  }
  return [state, dispatch];
};
var useClassReducer = createHook('Reducers', useClassReducerKey);
useClassReducer.create = function (name) {
  return createNamedHook(name, useClassReducerKey);
};

function useClassRefKey(keySymbol, initialValue) {
  checkSymbol('useClassRefKey', keySymbol);
  var self = getMagicSelf();

  // first time Render && first Hook
  if (!self[MAGIC_REFS]) self[MAGIC_REFS] = {};

  // first time Render -> assign initial Value
  if (!self[MAGIC_REFS].hasOwnProperty(keySymbol)) {
    var ref = {
      current: initialValue
    };
    Object.seal(ref);
    self[MAGIC_REFS][keySymbol] = ref;
  }
  var returnValue = self[MAGIC_REFS][keySymbol];
  setDevToolsHookState(keySymbol.description);
  return returnValue;
}

var useClassRef = createHook('Refs', useClassRefKey);
useClassRef.create = function (name) {
  return createNamedHook(name, useClassRefKey);
};
useClassRef.createStack = function (stackName) {
  return createHook(stackName, useClassRefKey);
};

// poly 15 ref
var refCallback = function refCallback(refObject) {
  return function (ref) {
    refObject.current = ref;
  };
};

var useClassLayoutEffect = useClassEffect;

var reactLikeHooksInit_1 = dist.reactLikeHooksInit = reactLikeHooksInit;
dist.refCallback = refCallback;
var useCallback = dist.useCallback = useClassCallback;
var useEffect = dist.useEffect = useClassEffect;
var useLayoutEffect = dist.useLayoutEffect = useClassLayoutEffect;
var useMemo = dist.useMemo = useClassMemo;
var useReducer = dist.useReducer = useClassReducer;
var useRef = dist.useRef = useClassRef;
var useState = dist.useState = useClassState;

var Hooks = {
    useCallback: useCallback,
    useEffect: useEffect,
    useLayoutEffect: useLayoutEffect,
    useMemo: useMemo,
    useReducer: useReducer,
    useState: useState,
    useRef: useRef,
};
// 判断 react 是否支持 hooks，如果不支持则使用 react-like-hooks
if (React.useState) {
    Hooks = {
        useCallback: React.useCallback,
        useEffect: React.useEffect,
        useLayoutEffect: React.useLayoutEffect,
        useMemo: React.useMemo,
        useReducer: React.useReducer,
        useState: React.useState,
        useRef: React.useRef,
    };
}
else {
    // inject None effects
    React.PureComponent.prototype.componentDidMount = function () { };
    React.Component.prototype.componentDidMount = function () { };
    // 初始化
    reactLikeHooksInit_1({
        // @ts-ignore
        getSelfComponent: function () {
            var _a, _b, _c;
            // @ts-ignore
            return (_c = (_b = (_a = React === null || React === void 0 ? void 0 : React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _a === void 0 ? void 0 : _a.ReactCurrentOwner) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c._instance;
        },
        getDispatcher: function () { return null; },
    });
}
var getHooks = function () {
    return Hooks;
};
/**
 * 将函数组件转换为类组件
 */
var functionalizae = function (fn) {
    return /** @class */ (function (_super) {
        __extends$1(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            return fn(this.props);
        };
        return class_1;
    }(React.Component));
};

var h$5 = React.createElement;
var WebView = /** @class */ (function (_super) {
    __extends$1(WebView, _super);
    function WebView() {
        var _this = _super.call(this) || this;
        _this.mounted = false;
        _this.touch = false;
        _this.hasFirstAppear = false;
        _this.state = {
            hover: false
        };
        return _this;
    }
    WebView.prototype.componentDidMount = function () {
        this.mounted = true;
        // 等待装载完毕后再启动animation
        this.updateAnimation();
        this.updateAppear();
    };
    WebView.prototype.componentDidUpdate = function () {
        this.updateAnimation();
        this.updateAppear();
    };
    WebView.prototype.updateAnimation = function () {
        var _this = this;
        var animation = this.props.animation;
        if (animation !== this.lastAnimationName && isNaruseAnimaitonName(animation)) {
            // 等待组件彻底装载完毕后再启动animation，否则会出现动画不生效的情况
            clearTimeout(this.animationTimer);
            this.animationTimer = setTimeout(function () { var _a; return (_a = _this.ref) === null || _a === void 0 ? void 0 : _a.setAttribute('data-animation', animation); });
            this.lastAnimationName = animation;
        }
    };
    WebView.prototype.updateAppear = function () {
        var _a = this.props, onAppear = _a.onAppear, onDisappear = _a.onDisappear, onFirstAppear = _a.onFirstAppear;
        var hasAppear = onAppear || onDisappear || onFirstAppear;
        if (hasAppear && this.ref) {
            var isOnlyFirst = onFirstAppear && !onAppear && !onDisappear;
            if (isOnlyFirst && this.hasFirstAppear)
                return;
            // 开始观察
            this.startObserver(isOnlyFirst);
        }
    };
    WebView.prototype.startObserver = function (isOnlyFirst) {
        var _this = this;
        if (this.observer)
            return;
        if (window.IntersectionObserver === undefined) {
            console.warn('IntersectionObserver is not supported in this browser, please use polyfill.');
            return;
        }
        this.observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var _a;
                if (entry.intersectionRatio >= 0.5) {
                    _this.props.onAppear && _this.props.onAppear();
                    if (_this.props.onFirstAppear) {
                        if (_this.hasFirstAppear)
                            return;
                        _this.props.onFirstAppear();
                    }
                    if (isOnlyFirst) {
                        (_a = _this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
                        _this.observer = undefined;
                    }
                    _this.hasFirstAppear = true;
                }
                else {
                    // 没有展示过的不会触发消失事件
                    if (!_this.hasFirstAppear)
                        return;
                    _this.props.onDisappear && _this.props.onDisappear();
                }
            });
        }, {
            threshold: [0.5]
        });
        this.observer.observe(this.ref);
    };
    WebView.prototype.componentWillUnmount = function () {
        var _a, _b;
        this.mounted = false;
        // 清除动画
        clearTimeout(this.hoverTimer);
        clearTimeout(this.animationTimer);
        // 清除观察
        (_b = (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect) === null || _b === void 0 ? void 0 : _b.call(_a);
        this.observer = undefined;
    };
    /** 当开始点击时 */
    WebView.prototype.onTouchStart = function (event) {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStartTime, hoverStartTime = _b === void 0 ? 20 : _b, onTouchStart = _a.onTouchStart;
        if (disabled || !this.mounted)
            return;
        this.touch = true;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(function () {
            _this.setState({ hover: true });
        }, hoverStartTime);
        event && onTouchStart && onTouchStart(commonTouchEventCreater(event));
    };
    /** 点击结束时 */
    WebView.prototype.onTouchEnd = function (event) {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, _b = _a.hoverStayTime, hoverStayTime = _b === void 0 ? 70 : _b, onTouchEnd = _a.onTouchEnd;
        if (disabled || !this.mounted)
            return;
        this.touch = false;
        clearTimeout(this.hoverTimer);
        this.hoverTimer = setTimeout(function () {
            if (!_this.touch) {
                _this.setState({ hover: false });
            }
        }, hoverStayTime);
        event && onTouchEnd && onTouchEnd(commonTouchEventCreater(event));
    };
    WebView.prototype.onMouseEnter = function (event) {
        var onMouseEnter = this.props.onMouseEnter;
        onMouseEnter && onMouseEnter(commonMouseEventCreater(event));
        this.onTouchStart();
    };
    WebView.prototype.onMouseMove = function (event) {
        var onMouseMove = this.props.onMouseMove;
        onMouseMove && onMouseMove(commonMouseEventCreater(event));
    };
    WebView.prototype.onMouseLeave = function (event) {
        var onMouseLeave = this.props.onMouseLeave;
        onMouseLeave && onMouseLeave(commonMouseEventCreater(event));
        this.onTouchEnd();
    };
    WebView.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, hoverStyle = _a.hoverStyle, id = _a.id, src = _a.src, other = __rest(_a, ["className", "style", "hoverStyle", "id", "src"]);
        var hover = this.state.hover;
        var conStyle = __assign(__assign({}, style), (hover ? hoverStyle : {}));
        return (h$5("iframe", __assign({ id: id, ref: function (ref) { return _this.ref = ref; }, onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), onMouseMove: this.onMouseMove.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchMove: commonEventHander.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onTransitionEnd: commonEventHander.bind(this), onMouseDown: commonEventHander.bind(this), onMouseUp: commonEventHander.bind(this), className: className, style: conStyle, onClick: commonEventHander.bind(this), onBlur: commonEventHander.bind(this), onFocus: commonEventHander.bind(this), onLoad: commonEventHander.bind(this), src: src }, getPropsDataSet(other)), this.props.children));
    };
    return WebView;
}(React.Component));

var h$4 = React.createElement;
/** 单选框 */
var Radio = /** @class */ (function (_super) {
    __extends$1(Radio, _super);
    function Radio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = commonEventHander.bind(_this);
        _this.setRef = function (ref) { return _this.ref = ref; };
        return _this;
    }
    Radio.prototype.render = function () {
        var _a = this.props, value = _a.value, checked = _a.checked, disabled = _a.disabled, id = _a.id, children = _a.children;
        return (h$4("label", __assign({ htmlFor: id }, getBaseProps(this.props, 'label')),
            h$4("input", __assign({}, getBaseProps(this.props), { ref: this.setRef, type: "radio", value: value, checked: checked, onChange: this.onChange, disabled: disabled })),
            children));
    };
    return Radio;
}(React.Component));

var h$3 = React.createElement;
/** 单选框组 */
var RadioGroup = /** @class */ (function (_super) {
    __extends$1(RadioGroup, _super);
    function RadioGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { value: null };
        _this.setRef = function (ref) { return _this.ref = ref; };
        _this.onChange = function (e) {
            var value = e.target.value;
            _this.setState({ value: value });
            var data = {
                type: 'change',
                detail: {
                    value: value,
                }
            };
            commonEventHander.call(_this, e, data);
        };
        return _this;
    }
    RadioGroup.prototype.componentDidMount = function () {
        var _a;
        var children = this.props.children;
        children = children.filter(function (val) { return typeof val === 'object' && val; });
        var value = ((_a = children.find(function (val) { return val.props.checked; })) === null || _a === void 0 ? void 0 : _a.props.value) || children[0].props.value;
        this.setState({ value: value });
    };
    RadioGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, name = _a.name;
        return (h$3("span", __assign({}, getBaseProps(this.props), { ref: this.setRef }), children.map(function (val) {
            if (typeof val != 'object' || !val) {
                return val;
            }
            return __assign(__assign({}, val), { props: __assign(__assign({}, val.props), { name: name, onChange: _this.onChange, checked: val.props.value === _this.state.value }) });
        })));
    };
    return RadioGroup;
}(React.Component));

var h$2 = React.createElement;
/** 复选框组 */
var CheckBoxGroup = /** @class */ (function (_super) {
    __extends$1(CheckBoxGroup, _super);
    function CheckBoxGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selectValue: [] };
        _this.setRef = function (ref) { return (_this.ref = ref); };
        _this.onChange = function (e) {
            e.stopPropagation();
            var onChange = _this.props.onChange;
            var selectValue = _this.state.selectValue;
            var _a = e.target, checked = _a.checked, value = _a.value;
            var changeSelectValue = checked
                ? __spreadArray$1(__spreadArray$1([], selectValue, true), [value], false) : selectValue.filter(function (item) { return item !== value; });
            _this.setState({ selectValue: changeSelectValue });
            var data = {
                type: "change",
                detail: {
                    value: changeSelectValue,
                },
            };
            onChange && commonEventHander.call(_this, e, data);
        };
        return _this;
    }
    CheckBoxGroup.prototype.componentDidMount = function () {
        var children = this.props.children;
        children = children.filter(function (val) { return typeof val === "object" && val; });
        var selectValue = children
            .filter(function (el) { return el.props.checked; })
            .map(function (el) { var _a; return (_a = el.props) === null || _a === void 0 ? void 0 : _a.value; });
        this.setState({ selectValue: selectValue });
    };
    CheckBoxGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, name = _a.name;
        var selectValue = this.state.selectValue;
        return (h$2("span", __assign({ ref: this.setRef }, getBaseProps(this.props)), children.map(function (val) {
            if (typeof val != "object" || !val) {
                return val;
            }
            return __assign(__assign({}, val), { props: __assign(__assign({}, val.props), { name: name, onChange: _this.onChange, checked: selectValue.some(function (item) { return item === val.props.value; }) }) });
        })));
    };
    return CheckBoxGroup;
}(React.Component));

var style$1 = {"switch":{"position":"relative","display":"inline-block","width":"50px","height":"30px","borderRadius":"30px","cursor":"pointer","transition":"background-color 0.2s","boxShadow":"2px 1px #eee, 1px -1px #eee, -1px 1px #eee, -1px -1px #eee"},"input":{"opacity":"0","width":"0","height":"0"},"slider":{"position":"absolute","top":"2px","left":"0px","width":"26px","height":"26px","backgroundColor":"#fff","borderRadius":"50%","transition":"transform 0.2s"},"switchMask":{"cursor":"not-allowed","position":"absolute","top":"-1px","left":"-1px","width":"52px","height":"32px","backgroundColor":"rgba(255, 255, 255, 0.6)","borderRadius":"30px","zIndex":"10"}};

var h$1 = React.createElement;
var Switch = /** @class */ (function (_super) {
    __extends$1(Switch, _super);
    function Switch(props) {
        var _this = _super.call(this, props) || this;
        /**
         * @description 更新
         * @param e {SwitchProps}
         */
        _this.onChange = function (e) {
            e.stopPropagation();
            var onChange = _this.props.onChange;
            var checked = e.target.checked;
            var data = {
                type: "change",
                detail: {
                    value: checked,
                },
            };
            onChange && commonEventHander.call(_this, e, data);
            _this.setState({ checked: checked });
        };
        _this.state = {
            checked: false,
        };
        return _this;
    }
    /**
     * @description 初始化
     */
    Switch.prototype.componentDidMount = function () {
        var checked = this.props.checked;
        this.setState({ checked: checked });
    };
    Switch.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.disabled, disabled = _b === void 0 ? false : _b, _c = _a.color, color = _c === void 0 ? "#ff5000" : _c;
        var _d = this.state.checked, checked = _d === void 0 ? false : _d;
        return (h$1("label", __assign({ ref: function (el) { return (_this.switchEl = el); }, style: __assign(__assign({}, style$1.switch), { background: checked ? color : "#fff" }) }, getBaseProps(this.props)),
            h$1(Checkbox, { disabled: disabled, style: style$1.input, checked: checked, onChange: this.onChange }),
            h$1("span", { ref: function (el) { return (_this.sliderEl = el); }, style: __assign(__assign({}, style$1.slider), { transform: "translateX(".concat(checked ? 22 : 0, "px)"), boxShadow: checked ? "" : "2px 2px 3px #c2c2c2" }) }),
            disabled && h$1("span", { style: style$1.switchMask })));
    };
    return Switch;
}(React.Component));

var style = {"slider":{"position":"relative","display":"flex","justifyContent":"center","alignItems":"center"},"sliderContainer":{"cursor":"pointer","flex":"1","minWidth":"0","position":"relative","backgroundColor":"#ddd","borderRadius":"3px"},"slideActiveValue":{"zIndex":"2"},"sliderThumb":{"position":"absolute","width":"20px","height":"20px","backgroundColor":"#fff","border":"2px solid #ff5000","borderRadius":"50%","cursor":"pointer","zIndex":"2"},"valueDisplay":{"textAlign":"center","fontSize":"16px","color":"#999","zIndex":"1"},"sliderMask":{"cursor":"not-allowed","position":"absolute","width":"100%","height":"100%","backgroundColor":"rgba(255, 255, 255, 0.5)","borderRadius":"3px","zIndex":"10"}};

var h = React.createElement;
var Slider = /** @class */ (function (_super) {
    __extends$1(Slider, _super);
    function Slider(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseLeave = function (e) {
            e.stopPropagation();
            var isDragging = _this.state.isDragging;
            isDragging && _this.onMouseUp(e);
        };
        /**
         * 鼠标按下
         * @param e
         */
        _this.onMouseDown = function (e) {
            e.stopPropagation();
            _this.setState({
                mouseClientX: e.clientX,
                isDragging: true,
            });
            _this.sliderThumbEl.addEventListener("mousemove", _this.onMouseMove);
            _this.sliderThumbEl.addEventListener("mouseup", _this.onMouseUp);
            _this.startDragStyle();
        };
        /**
         * 鼠标移动
         * @param e
         */
        _this.onMouseMove = function (e) {
            e.stopPropagation();
            var _a = _this.props, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.step, step = _d === void 0 ? 1 : _d, _e = _a.handleSize, handleSize = _e === void 0 ? 18 : _e, onChanging = _a.onChanging;
            var _f = _this.state, mouseClientX = _f.mouseClientX, value = _f.value;
            var width = _this.sliderContainerEl.getBoundingClientRect().width;
            // 计算x偏移量
            var diffValue = e.clientX - mouseClientX;
            // 计算当前值
            var currentValue = Math.round((diffValue / width) * (max - min)) + value;
            if (currentValue <= min)
                currentValue = min;
            if (currentValue >= max)
                currentValue = max;
            var left = "calc(".concat(((currentValue - min) / (max - min)) * 100, "% - ").concat(handleSize / 2, "px)");
            if (step <= 0)
                return;
            if (currentValue % step === 0) {
                _this.sliderProgressBarEl.style.width = "calc(".concat(((currentValue - min) / (max - min)) * 100, "%)");
                _this.sliderThumbEl.style.left = left;
                _this.valueDisplayEl.textContent = currentValue;
                var data = {
                    type: "changing",
                    detail: { value: currentValue },
                };
                onChanging && commonEventHander.call(_this, e, data);
            }
        };
        /**
         * 释放鼠标
         * @param e
         */
        _this.onMouseUp = function (e) {
            e.stopPropagation();
            var onChange = _this.props.onChange;
            var currentValue = Number(_this.valueDisplayEl.textContent);
            _this.endDragStyle();
            _this.setState({
                value: currentValue,
                isDragging: false,
            });
            var data = {
                type: "change",
                detail: { value: currentValue },
            };
            onChange && commonEventHander.call(_this, e, data);
            // 移除事件
            _this.sliderThumbEl.removeEventListener("mousemove", _this.onMouseMove);
            _this.sliderThumbEl.removeEventListener("mouseup", _this.onMouseUp);
        };
        /**
         * 拖拽滑块元素开始样式
         * @returns
         */
        _this.startDragStyle = function () {
            var handleColor = _this.props.handleColor;
            if (!handleColor) {
                _this.sliderThumbEl.style.backgroundColor = "#ff5000";
            }
        };
        /**
         * 拖拽滑块元素结束样式
         * @returns
         */
        _this.endDragStyle = function () {
            var handleColor = _this.props.handleColor;
            if (!handleColor) {
                _this.sliderThumbEl.style.backgroundColor = "#fff";
            }
        };
        /**
         * 点击跳转到指定位置
         * @returns
         */
        _this.setSliderValue = function (e) {
            var isDragging = _this.state.isDragging;
            if (isDragging)
                return;
            var _a = _this.props, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, onChange = _a.onChange;
            var _d = e.target.getBoundingClientRect(), left = _d.left, width = _d.width;
            var offsetX = e.clientX - left; // 鼠标相对于滑动条的水平偏移
            var percentage = offsetX / width; // 计算百分比
            var newValue = Math.round(percentage * (max - min) + min); // 转换为数值
            _this.setState({ value: newValue });
            var data = {
                type: "change",
                detail: { value: newValue },
            };
            onChange && commonEventHander.call(_this, e, data);
        };
        var currentValue = 0;
        var _a = _this.props, _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d;
        if (value < min || value > max) {
            currentValue = value > max ? max : min;
        }
        else {
            currentValue = value;
        }
        _this.state = {
            value: currentValue,
            mouseClientX: 0,
            isDragging: false,
        };
        return _this;
    }
    Slider.prototype.render = function () {
        var _this = this;
        var value = this.state.value;
        var _a = this.props, _b = _a.min, min = _b === void 0 ? 0 : _b, _c = _a.max, max = _c === void 0 ? 100 : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.showValue, showValue = _e === void 0 ? false : _e, _f = _a.activeColor, activeColor = _f === void 0 ? "#ff5000" : _f, _g = _a.backgroundColor, backgroundColor = _g === void 0 ? "#ddd" : _g, _h = _a.handleColor, handleColor = _h === void 0 ? "#fff" : _h, _j = _a.handleSize, handleSize = _j === void 0 ? 18 : _j, _k = _a.trackSize, trackSize = _k === void 0 ? 2 : _k;
        return (h("div", __assign({ style: style.slider, onMouseLeave: this.onMouseLeave }, getBaseProps(this.props)),
            h("div", { ref: function (self) { return (_this.sliderContainerEl = self); }, style: __assign(__assign({}, style.sliderContainer), { backgroundColor: backgroundColor, height: trackSize }), onMouseUp: this.setSliderValue },
                h("div", { ref: function (self) { return (_this.sliderProgressBarEl = self); }, style: __assign(__assign({}, style.slideActiveValue), { backgroundColor: activeColor, height: trackSize, width: "calc(".concat(((value - min) / (max - min)) * 100, "%)") }) }),
                h("div", { ref: function (self) { return (_this.sliderThumbEl = self); }, style: __assign(__assign({}, style.sliderThumb), { backgroundColor: handleColor, borderColor: activeColor, width: handleSize, height: handleSize, top: "calc(50% - ".concat(2 + handleSize / 2, "px)"), left: "calc(".concat(((value - min) / (max - min)) * 100, "% - ").concat(handleSize / 2, "px)") }), onMouseDown: this.onMouseDown })),
            h("div", { ref: function (self) { return (_this.valueDisplayEl = self); }, style: __assign(__assign({}, style.valueDisplay), { width: showValue ? "30px" : 0, marginLeft: showValue ? "8px" : 0, opacity: showValue ? 1 : 0 }) }, value),
            disabled && h("div", { style: style.sliderMask })));
    };
    return Slider;
}(React.Component));

/** 组件映射表 */
var componentReflectMap = {
    button: Button,
    checkbox: Checkbox,
    'checkbox-group': CheckBoxGroup,
    image: _Image,
    input: Input,
    text: Text,
    view: View,
    'scroll-view': ScrollView,
    textarea: Textarea,
    'web-view': WebView,
    'radio': Radio,
    'radio-group': RadioGroup,
    switch: Switch,
    slider: Slider
};
/**
 * @description 拦截下来的react.createElement
 * @author CHC
 * @date 2022-03-17 17:03:42
 * @param {*} type
 * @param {*} props
 * @param {*} children
 */
var naruseCreateElement = function (type, props) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    transformRpx(props);
    if (typeof type === 'string') {
        var Component_1 = componentReflectMap[type];
        if (!Component_1) {
            logger.warn('不支持的组件类型', type);
            return naruseCreateElement('view', undefined, "\u4E0D\u652F\u6301\u7684\u7EC4\u4EF6\u7C7B\u578B-".concat(type));
        }
        return React.createElement.apply(void 0, __spreadArray$1([Component_1, props], children, false));
    }
    if (type.prototype instanceof React.Component) {
        return React.createElement.apply(void 0, __spreadArray$1([type, props], children, false));
    }
    if (typeof type === 'function') {
        props && (props.children = children);
        if (React.useState) {
            return React.createElement(type, props);
        }
        return React.createElement(functionalizae(type), props);
    }
    logger.warn('不支持的组件类型', type);
};
var rpxReg = /([\d.]+)\s?rpx/g;
var parsePx = function (val) {
    if (typeof val !== 'string')
        return val;
    var matchRes = val.match(rpxReg);
    var convertRpx = getNaruseConfig().convertRpx;
    if (!matchRes)
        return val;
    matchRes.forEach(function (item) {
        var num = parseFloat(item);
        // 按照手机和电脑的比例进行换算
        val = val.replace(item, "".concat(convertRpx(num), "px"));
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
var transformRpx = function (props) {
    if (props === void 0) { props = {}; }
    if (!props)
        return;
    var style = props.style;
    if (style && typeof style === 'object') {
        for (var key in style) {
            style[key] = parsePx(style[key]);
        }
    }
};

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
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var Identifier = "Identifier";
var Literal = "Literal";
var Program = "Program";
var Property = "Property";
var FunctionDeclaration = "FunctionDeclaration";
var FunctionExpression = "FunctionExpression";
var ExpressionStatement = "ExpressionStatement";
var ObjectPattern = "ObjectPattern";
var ArrayPattern = "ArrayPattern";
var AssignmentPattern = "AssignmentPattern";
var ObjectExpression = "ObjectExpression";
var ArrayExpression = "ArrayExpression";
var AssignmentExpression = "AssignmentExpression";
var MemberExpression = "MemberExpression";
var RestElement = "RestElement";
var SpreadElement = "SpreadElement";
var DoWhileStatement = "DoWhileStatement";
var DebuggerStatement = "DebuggerStatement";
var ContinueStatement = "ContinueStatement";
var BreakStatement = "BreakStatement";
var CallExpression = "CallExpression";
var YieldExpression = "YieldExpression";
var ImportBatchSpecifier = "ImportBatchSpecifier";
var ImportSpecifier = "ImportSpecifier";
var ImportDeclaration = "ImportDeclaration";
var ExportSpecifier = "ExportSpecifier";
var ExportBatchSpecifier = "ExportBatchSpecifier";
var ExportDeclaration = "ExportDeclaration";
var ClassDeclaration = "ClassDeclaration";
var ClassExpression = "ClassExpression";
var ClassBody = "ClassBody";
var TemplateElement = "TemplateElement";
var ArrowFunctionExpression = "ArrowFunctionExpression";
var TemplateLiteral = "TemplateLiteral";
var MethodDefinition = "MethodDefinition";
var SequenceExpression = "SequenceExpression";
var ParenthesizedExpression = "ParenthesizedExpression";
var NewExpression = "NewExpression";
var UpdateExpression = "UpdateExpression";
var BinaryExpression = "BinaryExpression";
var LogicalExpression = "LogicalExpression";
var UnaryExpression = "UnaryExpression";
var VariableDeclaration = "VariableDeclaration";
var IfStatement = "IfStatement";
var ReturnStatement = "ReturnStatement";
var SwitchCase = "SwitchCase";
var SwitchStatement = "SwitchStatement";
var ThrowStatement = "ThrowStatement";
var TaggedTemplateExpression = "TaggedTemplateExpression";
var TryStatement = "TryStatement";
var CatchClause = "CatchClause";
var WhileStatement = "WhileStatement";
var EmptyStatement = "EmptyStatement";
var LabeledStatement = "LabeledStatement";
var BlockStatement = "BlockStatement";
var ForInStatement = "ForInStatement";
var ForOfStatement = "ForOfStatement";
var ForStatement = "ForStatement";
var VariableDeclarator = "VariableDeclarator";
var ThisExpression = "ThisExpression";
var ConditionalExpression = "ConditionalExpression";
var ImportExpression = "ImportExpression";

// 当前执行作用域是否在迭代函数下
var isGeneratorFunction = function (scope) { return scope.generator; };
var isYieldResult = function (scope, value) { return isGeneratorFunction(scope) && value === YIELD_SIGNAL; };
var isReturnResult = function (value) { return value === RETURN_SIGNAL; };
var isContinueResult = function (value) { return value === CONTINUE_SIGNAL; };
var isBreakResult = function (value) { return value === BREAK_SIGNAL; };
/**
 * 是否是函数提升语句
 */
var isPromoteStatement = function (value) {
    return value.type === FunctionDeclaration;
};
/**
 * 是否是变量提升语句
 */
var isVarPromoteStatement = function (value) {
    return (value === null || value === void 0 ? void 0 : value.type) === VariableDeclaration && value.kind === 'var';
};
var BREAK_SIGNAL = {};
var CONTINUE_SIGNAL = {};
var RETURN_SIGNAL = { result: undefined };
var YIELD_SIGNAL = { result: undefined };
var THIS = 'this';

var ScopeVar = /** @class */ (function () {
    function ScopeVar(kind, value, reDeclare) {
        if (reDeclare === void 0) { reDeclare = false; }
        this.reDeclare = false;
        this.value = value;
        this.kind = kind;
        this.reDeclare = reDeclare;
    }
    ScopeVar.prototype.$set = function (value) {
        if (this.kind === 'const' && !this.reDeclare) {
            throw new Error('const value can not be changed');
        }
        this.value = value;
        this.reDeclare = false;
        return true;
    };
    ScopeVar.prototype.$get = function () {
        return this.value;
    };
    return ScopeVar;
}());
var indexGeneratorStackDecorate = function (fn, scope) {
    var data = { index: 0 };
    var saveData = function () { };
    // 入栈
    if (isGeneratorFunction(scope)) {
        data = scope.generatorStack.getStack();
        saveData = scope.generatorStack.saveStackData.bind(scope.generatorStack);
    }
    var result = fn(data, saveData);
    // 出栈
    if (isGeneratorFunction(scope)) {
        scope.generatorStack.popStack();
    }
    return result;
};
/** 用于保存迭代函数的栈 */
var GeneratorStack = /** @class */ (function () {
    function GeneratorStack() {
        this.runnerStack = [];
        this.yieldBackValues = [];
        this.running = false;
        this.currentIndex = 0;
        this.currentStackIndex = 0;
    }
    GeneratorStack.prototype.pushValue = function (value) {
        if (this.running)
            this.yieldBackValues.push({ value: value });
        this.running = true;
    };
    GeneratorStack.prototype.getValue = function () {
        var value = this.yieldBackValues[this.currentIndex];
        if (value) {
            this.currentIndex++;
            return value;
        }
        this.currentIndex = 0;
    };
    GeneratorStack.prototype.getStack = function () {
        var runner = this.runnerStack[this.currentStackIndex];
        if (runner)
            return runner;
        var newRunner = { index: 0 };
        this.runnerStack.push(runner);
        return newRunner;
    };
    GeneratorStack.prototype.popStack = function () {
        this.currentStackIndex--;
        this.runnerStack.pop();
    };
    GeneratorStack.prototype.saveStackData = function (key, value) {
        this.runnerStack[this.runnerStack.length - 1][key] = value;
    };
    return GeneratorStack;
}());
var Scope = /** @class */ (function () {
    function Scope(type, parent, generator) {
        if (generator === void 0) { generator = false; }
        this.content = {};
        this.prefix = '';
        // 标记为侵入式Scope，不用再多构造啦
        this.invasive = false;
        this.type = type;
        this.parent = parent || null;
        this.generator = generator;
        this.generatorStack = new GeneratorStack();
    }
    Scope.prototype.$find = function (raw_name) {
        var name = this.prefix + raw_name;
        if (this.content.hasOwnProperty(name)) {
            return this.content[name];
        }
        else if (this.parent) {
            return this.parent.$find(raw_name);
        }
        return null;
    };
    Scope.prototype.$let = function (raw_name, value) {
        var name = this.prefix + raw_name;
        var $var = this.content[name];
        if (!$var) {
            this.content[name] = new ScopeVar('let', value);
            return true;
        }
        return false;
    };
    Scope.prototype.$const = function (raw_name, value) {
        var name = this.prefix + raw_name;
        var $var = this.content[name];
        if (!$var || ($var instanceof ScopeVar && $var.reDeclare)) {
            this.content[name] = new ScopeVar('const', value);
            return true;
        }
        return false;
    };
    Scope.prototype.$var = function (raw_name, value, canReDeclare) {
        if (canReDeclare === void 0) { canReDeclare = false; }
        var name = this.prefix + raw_name;
        var scope = this.getClosetSomeScope("function" /* ScopeType.Function */);
        var $var = scope.content[name];
        if (!$var) {
            this.content[name] = new ScopeVar('var', value, canReDeclare);
            return true;
            // #fix var 不允许重复声明
        }
        else if ($var instanceof ScopeVar) {
            $var.$set(value);
            return true;
        }
        return false;
    };
    Scope.prototype.$declar = function (kind, raw_name, value, canReDeclare) {
        var _this = this;
        if (canReDeclare === void 0) { canReDeclare = false; }
        return ({
            var: function () { return _this.$var(raw_name, value, canReDeclare); },
            let: function () { return _this.$let(raw_name, value); },
            const: function () { return _this.$const(raw_name, value); },
        })[kind]();
    };
    /**
     * 获取最近的某种类型作用域
     */
    Scope.prototype.getClosetSomeScope = function (type) {
        var scope = this;
        while (scope.parent !== null && scope.type !== type) {
            scope = scope.parent;
        }
        return scope;
    };
    return Scope;
}());
/**
 * 获取当前顶层作用域的 runner
 */
var getScopeRunner = function (scope) {
    return scope.getClosetSomeScope("program" /* ScopeType.Program */).runner;
};

var EvaluateError = /** @class */ (function (_super) {
    __extends(EvaluateError, _super);
    function EvaluateError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEvaluateError = true;
        return _this;
    }
    return EvaluateError;
}(Error));
/** @class */ ((function (_super) {
    __extends(EvaluateSyntaxError, _super);
    function EvaluateSyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EvaluateSyntaxError;
})(EvaluateError));
var EvaluateReferenceError = /** @class */ (function (_super) {
    __extends(EvaluateReferenceError, _super);
    function EvaluateReferenceError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EvaluateReferenceError;
}(EvaluateError));
var errorMessageList = {
    notYetDefined: [1000, "未定义的变量: %0", EvaluateReferenceError],
    duplicateDefinition: [1001, "变量重复定义: %0", EvaluateReferenceError],
    notCallableFunction: [1002, "不是可调用的函数: %0", EvaluateReferenceError],
    notSupportNode: [1003, "尚未支持的node类型: %0", EvaluateError],
    notHasSomeProperty: [1004, "对象不存在对应属性: %0", EvaluateReferenceError],
    runTimeError: [1005, "运行错误 %0", EvaluateError],
    deconstructNotArray: [1006, "解构应为一个数组: %0", EvaluateReferenceError],
    deconstructNotObject: [1007, "解构应为一个对象: %0", EvaluateReferenceError],
    notHasImport: [1008, "未初始化函数: %0", EvaluateReferenceError],
    notGeneratorFunction: [1009, "无法在非迭代函数内使用yield: %0", EvaluateReferenceError],
};
var createError = function (msg, value, node, scope) {
    var _a;
    var source = (_a = getScopeRunner(scope)) === null || _a === void 0 ? void 0 : _a.source;
    var message = msg[1].replace("%0", String(value));
    if (node && source) {
        var errorNodeLoc = node.loc;
        var errorCode = source.slice(node.start, node.end);
        var errorMsg = "\u9519\u8BEF\u4EE3\u7801: ".concat(errorCode);
        if (errorNodeLoc) {
            errorMsg += " [".concat(errorNodeLoc.start.line, ":").concat(errorNodeLoc.start.column, "-").concat(errorNodeLoc.end.line, ":").concat(errorNodeLoc.end.column, "]");
        }
        message = "".concat(message, " \n ").concat(errorMsg);
    }
    var err = new msg[2](message);
    return err.nodeLoc = node, err;
};

var _a, _b;
var anonymousId = 0;
var ObjectDefineProperty = Object.defineProperty;
var illegalFun = [setTimeout, setInterval, clearInterval, clearTimeout];
var isUndefinedOrNull = function (val) { return val === void 0 || val === null; };
/**
 * 提炼 for语句中的变量提升
 * k: 语句
 * v: 对应的属性名
 */
var RefineForPromoteNameMap = (_a = {},
    _a[ForStatement] = 'init',
    _a[ForInStatement] = 'left',
    _a[ForOfStatement] = 'left',
    _a);
/**
 * 提炼非函数声明语句，并执行函数声明语句 与 初始化 var 变量
 */
var refinePromteStatements = function (nodes, scope) {
    var nonPromoteList = [];
    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        // function 声明语句 提升到作用域顶部直接执行
        if (isPromoteStatement(node)) {
            evaluate(node, scope);
        }
        else {
            // 如果是 var 则需要先声明变量为 undefined
            if (isVarPromoteStatement(node))
                evaluate_map[VariableDeclaration](node, scope, true);
            // for,forin,forof 循环中的 var 声明语句也需要提升
            if (RefineForPromoteNameMap[node.type]) {
                var initNode = node[RefineForPromoteNameMap[node.type]];
                if (isVarPromoteStatement(initNode))
                    evaluate_map[VariableDeclaration](initNode, scope, true);
            }
            nonPromoteList.push(node);
        }
    }
    return nonPromoteList;
};
var evaluate_map = (_b = {},
    _b[Program] = function (program, scope) {
        var list = program.body;
        var nonFunctionList = refinePromteStatements(list, scope);
        for (var _i = 0, nonFunctionList_1 = nonFunctionList; _i < nonFunctionList_1.length; _i++) {
            var node = nonFunctionList_1[_i];
            evaluate(node, scope);
        }
    },
    _b[Identifier] = function (node, scope) {
        if (node.name === 'undefined') {
            return undefined;
        }
        var $var = scope.$find(node.name);
        if ($var) {
            return $var.$get();
        }
        throw createError(errorMessageList.notYetDefined, node.name, node, scope);
    },
    _b[Literal] = function (node) {
        return node.value;
    },
    _b[BlockStatement] = function (block, scope) {
        return indexGeneratorStackDecorate(function (stackData) {
            var new_scope = scope.invasive ? scope : new Scope("block" /* ScopeType.Block */, scope);
            var list = block.body;
            // 提炼语句需要提升到父级作用域
            var nonFunctionList = refinePromteStatements(list, new_scope);
            for (; stackData.index < nonFunctionList.length; stackData.index++) {
                var node = nonFunctionList[stackData.index];
                var result = evaluate(node, new_scope);
                if (isYieldResult(scope, result)
                    || isReturnResult(result)
                    || isContinueResult(result)
                    || isBreakResult(result))
                    return result;
            }
        }, scope);
    },
    _b[EmptyStatement] = function () { },
    _b[ExpressionStatement] = function (node, scope) {
        return evaluate(node.expression, scope);
    },
    _b[ReturnStatement] = function (node, scope) {
        RETURN_SIGNAL.result = node.argument ? evaluate(node.argument, scope) : undefined;
        return RETURN_SIGNAL;
    },
    _b[BreakStatement] = function () {
        return BREAK_SIGNAL;
    },
    _b[ContinueStatement] = function () {
        return CONTINUE_SIGNAL;
    },
    _b[IfStatement] = function (node, scope) {
        if (evaluate(node.test, scope))
            return evaluate(node.consequent, scope);
        else if (node.alternate)
            return evaluate(node.alternate, scope);
    },
    _b[ForStatement] = function (node, scope) {
        var new_scope = new Scope("loop" /* ScopeType.Loop */, scope); 
        // 只有 var 变量才会被提高到上一作用域
        node.init ? evaluate(node.init, isVarPromoteStatement(node.init) ? scope : new_scope) : null;
        for (; node.test ? evaluate(node.test, new_scope) : true; node.update ? evaluate(node.update, new_scope) : void (0)) {
            var result = evaluate(node.body, new_scope);
            if (isReturnResult(result))
                return result;
            else if (isContinueResult(result))
                continue;
            else if (isBreakResult(result))
                break;
        }
    },
    _b[FunctionDeclaration] = function (node, scope) {
        var func = evaluate_map[FunctionExpression](node, scope);
        if (!scope.$var(func.name, func)) {
            throw createError(errorMessageList.duplicateDefinition, func.name, node, scope);
        }
        return func;
    },
    _b[VariableDeclaration] = function (node, scope, isVarPromote) {
        if (isVarPromote === void 0) { isVarPromote = false; }
        var kind = node.kind;
        return indexGeneratorStackDecorate(function (stackData) {
            var list = node.declarations;
            for (; stackData.index < list.length; stackData.index++) {
                var declaration = list[stackData.index];
                var id = declaration.id, init = declaration.init;
                // 如果是变量提升语句，需要先声明一个 undefined 变量，等待后续的重新赋值语句
                var value = !isVarPromote && init ? evaluate(init, scope) : undefined;
                // 迭代器变量中断
                if (isYieldResult(scope, value))
                    return value;
                // 正常流程
                if (id.type === Identifier) {
                    var name_1 = id.name;
                    // 如果作用域提升时变量已经存在，则不需要再次声明
                    if (isVarPromote && scope.$find(name_1) !== null)
                        continue;
                    if (!scope.$declar(kind, name_1, value)) {
                        throw createError(errorMessageList.duplicateDefinition, name_1, node, scope);
                    }
                }
                else {
                    var result = evaluate_map[id.type](id, scope, kind, value);
                    if (isYieldResult(scope, result))
                        return result;
                }
            }
        }, scope);
    },
    _b[ArrayPattern] = function (node, scope, kind, value) {
        var elements = node.elements;
        if (!Array.isArray(value)) {
            throw createError(errorMessageList.deconstructNotArray, value, node, scope);
        }
        elements.forEach(function (element, index) {
            if (!element)
                return;
            if (element.type === Identifier) {
                var name_2 = element.name;
                if (!kind)
                    kind = 'var';
                if (!scope.$declar(kind, name_2, value[index])) {
                    throw createError(errorMessageList.duplicateDefinition, name_2, node, scope);
                }
            }
            else {
                evaluate_map[element.type](element, scope, kind, value[index]);
            }
        });
    },
    _b[ObjectPattern] = function (node, scope, kind, object) {
        var properties = node.properties;
        properties.forEach(function (property) {
            if (property.type === Property) {
                var _a = property, key = _a.key, value = _a.value, computed = _a.computed;
                var newKey = computed ? evaluate(key, scope) : key.name;
                if (value.type === Identifier) {
                    var name_3 = value.name;
                    if (!scope.$declar(kind, name_3, object[newKey])) {
                        throw createError(errorMessageList.duplicateDefinition, name_3, node, scope);
                    }
                }
                else {
                    evaluate_map[value.type](value, scope, kind, object[newKey]);
                }
            }
        });
    },
    _b[AssignmentPattern] = function (node, scope, kind, init) {
        var left = node.left, right = node.right;
        var value = init === void 0 ? evaluate(right, scope) : init;
        if (left.type === Identifier) {
            var name_4 = left.name;
            if (!scope.$declar(kind, name_4, value)) {
                throw createError(errorMessageList.duplicateDefinition, name_4, node, scope);
            }
        }
        else {
            evaluate_map[left.type](left, scope, kind, value);
        }
    },
    _b[ThisExpression] = function (node, scope) {
        var this_val = scope.$find(THIS);
        return this_val ? this_val.$get() : null;
    },
    _b[ArrayExpression] = function (node, scope) {
        return node.elements.map(function (item) { return item ? evaluate(item, scope) : null; });
    },
    _b[ObjectExpression] = function (node, scope) {
        var object = {};
        for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
            var property = _a[_i];
            if (property.type === Property) {
                var kind = property.kind, computed = property.computed;
                // fix: { 1: 1 }
                var key = void 0;
                if (property.key.type === Literal || computed) {
                    key = evaluate(property.key, scope);
                }
                else if (property.key.type === Identifier) {
                    key = property.key.name;
                }
                var value = evaluate(property.value, scope);
                if (kind === 'init') {
                    object[key] = value;
                }
                else if (kind === 'set') {
                    ObjectDefineProperty(object, key, { set: value });
                }
                else if (kind === 'get') {
                    ObjectDefineProperty(object, key, { get: value });
                }
            }
            else {
                throw createError(errorMessageList.notSupportNode, property.type, node, scope);
            }
        }
        return object;
    },
    _b[FunctionExpression] = function (node, scope, isArrowFunction) {
        if (isArrowFunction === void 0) { isArrowFunction = false; }
        var func;
        var func_name = (node.id || { name: "anonymous".concat(anonymousId++) }).name;
        if (node.generator) {
            func = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var new_scope = new Scope("function" /* ScopeType.Function */, scope, true);
                new_scope.invasive = true;
                new_scope.$const(THIS, this);
                new_scope.$const('arguments', arguments);
                new_scope.$var(func_name, func, true);
                node.params.forEach(function (param, index) {
                    if (param.type === Identifier) {
                        var name_5 = param.name;
                        new_scope.$var(name_5, args[index]);
                    }
                    else {
                        evaluate_map[param.type](param, new_scope, 'var', args[index]);
                    }
                });
                var completed = false;
                var next = function (arg) {
                    var _a;
                    if (completed)
                        return { value: undefined, done: true };
                    (_a = new_scope.generatorStack) === null || _a === void 0 ? void 0 : _a.pushValue(arg);
                    var result = evaluate(node.body, new_scope);
                    if (isYieldResult(new_scope, result)) {
                        return { value: result.result, done: false };
                    }
                    if (isReturnResult(result)) {
                        completed = true;
                        return { value: result.result, done: true };
                    }
                };
                return { next: next };
            };
        }
        else {
            func = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var new_scope = new Scope("function" /* ScopeType.Function */, scope);
                new_scope.invasive = true;
                // fix: 修复在非 block 作用域中使用函数名调用函数时，函数名指向错误的问题
                // fix: 修复了当函数中出现与函数名相同的的形参时会导致形参会取到当前函数
                new_scope.$var(func_name, func, true);
                node.params.forEach(function (param, index) {
                    if (param.type === Identifier) {
                        var name_6 = param.name;
                        new_scope.$var(name_6, args[index]);
                    }
                    else {
                        evaluate_map[param.type](param, new_scope, 'var', args[index]);
                    }
                });
                var result;
                if (isArrowFunction) {
                    var parent_scope = scope.$find(THIS).$get();
                    new_scope.$const(THIS, parent_scope ? parent_scope : null);
                    result = evaluate(node.body, new_scope);
                    if (node.body.type !== BlockStatement) {
                        return result;
                    }
                }
                else {
                    new_scope.$const(THIS, this);
                    new_scope.$const('arguments', arguments);
                    result = evaluate(node.body, new_scope);
                }
                if (result === RETURN_SIGNAL) {
                    return result.result;
                }
            };
        }
        // 箭头函数的prototype属性指向的是父函数的prototype属性
        if (isArrowFunction) {
            ObjectDefineProperty(func, "prototype", { value: undefined });
        }
        // 矫正属性
        ObjectDefineProperty(func, "length", { value: node.params.length });
        // @ts-ignore
        ObjectDefineProperty(func, "toString", { value: function () { return getScopeRunner(scope).source.slice(node.start, node.end); }, configurable: true });
        // 矫正name属性
        ObjectDefineProperty(func, "name", { value: func_name, configurable: true });
        return func;
    },
    _b[UnaryExpression] = function (node, scope) {
        var _a;
        var sk = 'typeof';
        return (_a = {
                '-': function () { return -evaluate(node.argument, scope); },
                '+': function () { return +evaluate(node.argument, scope); },
                '!': function () { return !evaluate(node.argument, scope); },
                '~': function () { return ~evaluate(node.argument, scope); },
                'void': function () { return void evaluate(node.argument, scope); },
                'delete': function () {
                    if (node.argument.type === MemberExpression) {
                        var _a = node.argument, object = _a.object, property = _a.property, computed = _a.computed;
                        if (computed) {
                            return delete evaluate(object, scope)[evaluate(property, scope)];
                        }
                        else {
                            // @ts-ignore
                            return delete evaluate(object, scope)[(property).name];
                        }
                    }
                    else if (node.argument.type === Identifier) {
                        var $this = scope.$find(THIS);
                        // @ts-ignore
                        if ($this)
                            return $this.$get()[node.argument.name];
                    }
                }
            },
            // 部分老版本 babel 会将 typeof 函数修改为同名的 _typeof 函数，导致循环调用最后栈溢出
            // 使用特殊的 key 来区分
            _a[sk] = function () {
                if (node.argument.type === Identifier) {
                    var $var = scope.$find(node.argument.name);
                    return $var ? typeof $var.$get() : 'undefined';
                }
                else {
                    return typeof evaluate(node.argument, scope);
                }
            },
            _a)[node.operator]();
    },
    _b[UpdateExpression] = function (node, scope) {
        var prefix = node.prefix;
        var $var;
        if (node.argument.type === Identifier) {
            var name_7 = node.argument.name;
            $var = scope.$find(name_7);
            if (!$var)
                throw createError(errorMessageList.notYetDefined, name_7, node, scope);
        }
        else if (node.argument.type === MemberExpression) {
            var argument = node.argument;
            var object_1 = evaluate(argument.object, scope);
            var property_1 = argument.computed
                ? evaluate(argument.property, scope)
                : (argument.property).name;
            $var = {
                $set: function (value) {
                    object_1[property_1] = value;
                    return true;
                },
                $get: function () {
                    return object_1[property_1];
                },
            };
        }
        return ({
            '--': function (v) { return ($var.$set(v - 1), (prefix ? --v : v--)); },
            '++': function (v) { return ($var.$set(v + 1), (prefix ? ++v : v++)); },
        })[node.operator](evaluate(node.argument, scope));
    },
    _b[BinaryExpression] = function (node, scope) {
        return ({
            '==': function (a, b) { return a == b; },
            '!=': function (a, b) { return a != b; },
            '===': function (a, b) { return a === b; },
            '!==': function (a, b) { return a !== b; },
            '<': function (a, b) { return a < b; },
            '<=': function (a, b) { return a <= b; },
            '>': function (a, b) { return a > b; },
            '>=': function (a, b) { return a >= b; },
            '+': function (a, b) { return a + b; },
            '-': function (a, b) { return a - b; },
            '*': function (a, b) { return a * b; },
            '**': function (a, b) { return Math.pow(a, b); },
            '/': function (a, b) { return a / b; },
            '%': function (a, b) { return a % b; },
            '|': function (a, b) { return a | b; },
            '^': function (a, b) { return a ^ b; },
            '&': function (a, b) { return a & b; },
            '<<': function (a, b) { return a << b; },
            '>>': function (a, b) { return a >> b; },
            '>>>': function (a, b) { return a >>> b; },
            in: function (a, b) { return a in b; },
            instanceof: function (a, b) { return a instanceof b; },
        })[node.operator](evaluate(node.left, scope), evaluate(node.right, scope));
    },
    _b[AssignmentExpression] = function (node, scope) {
        var $var;
        var left = node.left;
        if (left.type === Identifier) {
            var name_8 = left.name;
            var $var_or_not = scope.$find(name_8);
            if (!$var_or_not)
                throw createError(errorMessageList.notYetDefined, name_8, node, scope);
            $var = $var_or_not;
        }
        else if (left.type === MemberExpression) {
            var _a = left, object = _a.object, property = _a.property, computed = _a.computed;
            var newObject_1 = evaluate(object, scope);
            var newProperty_1 = computed
                ? evaluate(property, scope)
                : property.name;
            $var = {
                $set: function (value) {
                    newObject_1[newProperty_1] = value;
                    return true;
                },
                $get: function () {
                    return newObject_1[newProperty_1];
                },
            };
        }
        else {
            throw createError(errorMessageList.notSupportNode, left.type, node, scope);
        }
        return ({
            '=': function (v) { return ($var.$set(v), v); },
            '+=': function (v) { return ($var.$set($var.$get() + v), $var.$get()); },
            '-=': function (v) { return ($var.$set($var.$get() - v), $var.$get()); },
            '*=': function (v) { return ($var.$set($var.$get() * v), $var.$get()); },
            '**=': function (v) { return ($var.$set(Math.pow($var.$get(), v)), $var.$get()); },
            '/=': function (v) { return ($var.$set($var.$get() / v), $var.$get()); },
            '%=': function (v) { return ($var.$set($var.$get() % v), $var.$get()); },
            '|=': function (v) { return ($var.$set($var.$get() | v), $var.$get()); },
            '<<=': function (v) { return ($var.$set($var.$get() << v), $var.$get()); },
            '>>=': function (v) { return ($var.$set($var.$get() >> v), $var.$get()); },
            '>>>=': function (v) { return ($var.$set($var.$get() >>> v), $var.$get()); },
            '^=': function (v) { return ($var.$set($var.$get() ^ v), $var.$get()); },
            '&=': function (v) { return ($var.$set($var.$get() & v), $var.$get()); },
        })[node.operator](evaluate(node.right, scope));
    },
    _b[LogicalExpression] = function (node, scope) {
        return ({
            '||': function () { return evaluate(node.left, scope) || evaluate(node.right, scope); },
            '&&': function () { return evaluate(node.left, scope) && evaluate(node.right, scope); },
            '??': function () { var _a; return (_a = evaluate(node.left, scope)) !== null && _a !== void 0 ? _a : evaluate(node.right, scope); },
        })[node.operator]();
    },
    _b[MemberExpression] = function (node, scope) {
        var object = node.object, property = node.property, computed = node.computed;
        if (computed) {
            return evaluate(object, scope)[evaluate(property, scope)];
        }
        return evaluate(object, scope)[property.name];
    },
    _b[ConditionalExpression] = function (node, scope) {
        return (evaluate(node.test, scope)
            ? evaluate(node.consequent, scope)
            : evaluate(node.alternate, scope));
    },
    _b[CallExpression] = function (node, scope) {
        var this_val = null;
        var func = null;
        // fix: ww().ww().ww()
        if (node.callee.type === MemberExpression) {
            var _a = (node.callee), object = _a.object, property = _a.property, computed = _a.computed;
            this_val = evaluate(object, scope);
            // @ts-ignore
            var funcName = !computed ? property.name : evaluate_map[property.type](property, scope);
            if (isUndefinedOrNull(this_val))
                throw createError(errorMessageList.notHasSomeProperty, funcName, node, scope);
            func = this_val[funcName];
        }
        else {
            this_val = scope.$find(THIS).$get();
            func = evaluate(node.callee, scope);
        }
        if (typeof func !== 'function')
            throw createError(errorMessageList.notCallableFunction, func, node, scope);
        // fix: setTimeout.apply({}, '');
        if (illegalFun.includes(func))
            this_val = null;
        return func.apply(this_val, node.arguments.map(function (arg) { return evaluate(arg, scope); }));
    },
    _b[NewExpression] = function (node, scope) {
        var Func = evaluate(node.callee, scope);
        var args = node.arguments.map(function (arg) { return evaluate(arg, scope); });
        return new (Func.bind.apply(Func, __spreadArray([void 0], args, false)))();
    },
    _b[SequenceExpression] = function (node, scope) {
        var last;
        for (var _i = 0, _a = node.expressions; _i < _a.length; _i++) {
            var expr = _a[_i];
            last = evaluate(expr, scope);
        }
        return last;
    },
    _b[ThrowStatement] = function (node, scope) {
        throw evaluate(node.argument, scope);
    },
    _b[TryStatement] = function (node, scope) {
        try {
            return evaluate(node.block, scope);
        }
        catch (err) {
            if (node.handler) {
                var param = node.handler.param;
                var new_scope = new Scope("block" /* ScopeType.Block */, scope);
                new_scope.invasive = true;
                new_scope.$const(param === null || param === void 0 ? void 0 : param.name, err);
                return evaluate(node.handler, new_scope);
            }
            else {
                throw err;
            }
        }
        finally {
            // fix: 当 finally 中存在 return 时 会覆盖 try 里的返回值，导致返回值错误
            if (node.finalizer) {
                var res = evaluate(node.finalizer, scope);
                if (isReturnResult(res))
                    return res;
            }
        }
    },
    _b[CatchClause] = function (node, scope) {
        return evaluate(node.body, scope);
    },
    _b[SwitchStatement] = function (node, scope) {
        var discriminant = evaluate(node.discriminant, scope);
        var new_scope = new Scope("switch" /* ScopeType.Switch */, scope);
        var matched = false;
        for (var _i = 0, _a = node.cases; _i < _a.length; _i++) {
            var $case = _a[_i];
            // 进行匹配相应的 case
            if (!matched &&
                (!$case.test || discriminant === evaluate($case.test, new_scope))) {
                matched = true;
            }
            if (matched) {
                var result = evaluate($case, new_scope);
                if (isBreakResult(result)) {
                    break;
                }
                else if (isReturnResult(result) || isContinueResult(result)) {
                    return result;
                }
            }
        }
    },
    _b[SwitchCase] = function (node, scope) {
        for (var _i = 0, _a = node.consequent; _i < _a.length; _i++) {
            var stmt = _a[_i];
            var result = evaluate(stmt, scope);
            if (isReturnResult(result) || isBreakResult(result) || isContinueResult(result)) {
                return result;
            }
        }
    },
    _b[WhileStatement] = function (node, scope) {
        while (evaluate(node.test, scope)) {
            var new_scope = new Scope("loop" /* ScopeType.Loop */, scope);
            new_scope.invasive = true;
            var result = evaluate(node.body, new_scope);
            if (isBreakResult(result)) {
                break;
            }
            else if (isContinueResult(result)) {
                continue;
            }
            else if (isReturnResult(result)) {
                return result;
            }
        }
    },
    _b[DoWhileStatement] = function (node, scope) {
        do {
            var new_scope = new Scope("loop" /* ScopeType.Loop */, scope);
            new_scope.invasive = true;
            var result = evaluate(node.body, new_scope);
            if (result === BREAK_SIGNAL) {
                break;
            }
            else if (result === CONTINUE_SIGNAL) {
                continue;
            }
            else if (result === RETURN_SIGNAL) {
                return result;
            }
        } while (evaluate(node.test, scope));
    },
    _b[ArrowFunctionExpression] = function (node, scope) {
        return evaluate_map[FunctionExpression](node, scope, true);
    },
    _b[ForInStatement] = function (node, scope, isForOf) {
        if (isForOf === void 0) { isForOf = false; }
        var kind = node.left.kind;
        var id = kind ? node.left.declarations[0].id : node.left;
        var forInit = function (value) {
            var new_scope = new Scope("loop" /* ScopeType.Loop */, scope);
            new_scope.invasive = true;
            if (id.type === Identifier) {
                var name_9 = id.name;
                // fix: 修复了 in 或者 of 可能提前声明变量的问题
                // let i; for (i in [1, 2, 3]) {  };
                var newKind = kind || 'var';
                new_scope.$declar(newKind, name_9, value);
            }
            else {
                evaluate_map[id.type](id, new_scope, kind, value);
            }
            return evaluate(node.body, new_scope);
        };
        var init = evaluate(node.right, scope);
        if (isForOf) {
            for (var index = 0; index < init.length; index++) {
                var result = forInit(init[index]);
                if (isBreakResult(result)) {
                    break;
                }
                else if (isContinueResult(result)) {
                    continue;
                }
                else if (isReturnResult(result)) {
                    return result;
                }
            }
        }
        else {
            for (var value in init) {
                var result = forInit(value);
                if (isBreakResult(result)) {
                    break;
                }
                else if (isContinueResult(result)) {
                    continue;
                }
                else if (isReturnResult(result)) {
                    return result;
                }
            }
        }
    },
    _b[TemplateLiteral] = function (node, scope) {
        var result = node.quasis.map(function (quasi, index) {
            if (!quasi.tail)
                return quasi.value.raw + evaluate(node.expressions[index], scope);
            return quasi.value.raw;
        });
        return result.join('');
    },
    _b[ImportExpression] = function (node, scope) {
        var source = evaluate(node.source, scope);
        var importer = scope.$find('$$import');
        if (!importer)
            throw createError(errorMessageList.notHasImport, '$$import', node, scope);
        return importer.$get()(source);
    },
    _b[ForOfStatement] = function (node, scope) {
        return evaluate_map[ForInStatement](node, scope, true);
    },
    _b[YieldExpression] = function (node, scope) {
        var _a;
        if (!isGeneratorFunction(scope))
            throw createError(errorMessageList.notGeneratorFunction, '', node, scope);
        var value = (_a = scope.generatorStack) === null || _a === void 0 ? void 0 : _a.getValue();
        if (value)
            return value.value;
        YIELD_SIGNAL.result = evaluate(node.argument, scope);
        return YIELD_SIGNAL;
    },
    _b);
var _evaluate = function (node, scope) {
    var func = evaluate_map[node.type];
    if (!func)
        throw createError(errorMessageList.notSupportNode, node.type, node, scope);
    var res = evaluate_map[node.type](node, scope);
    return res;
};
var evaluate = function (node, scope) {
    var runner = getScopeRunner(scope);
    var thisId = runner.traceId++;
    runner.traceStack.push(thisId);
    try {
        return _evaluate(node, scope);
    }
    catch (err) {
        // 错误已经冒泡到栈定了，触发错误收集处理
        if (runner.traceStack[0] === thisId) {
            runner.onError(err);
        }
        // 错误已经处理过了，直接抛出
        if (err.isEvaluateError) {
            throw err;
        }
        throw createError(errorMessageList.runTimeError, err === null || err === void 0 ? void 0 : err.message, node, scope);
    }
    finally {
        runner.traceStack.pop();
    }
};

// this module is clone from acorn@0.12.0 with some modifications
// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api], with the caveat that inline XML is not recognized.
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API
function getNewAcorn() {
    var acorn = {};
    acorn.version = "0.12.x";
    var options, input, inputLen, sourceFile;
    acorn.parse = function (inpt, opts) {
        input = String(inpt);
        inputLen = input.length;
        setOptions(opts);
        initTokenState();
        var startPos = options.locations ? [tokPos, curPosition()] : tokPos;
        initParserState();
        return parseTopLevel(options.program || startNodeAt(startPos));
    };
    // A second optional argument can be given to further configure
    // the parser process. These options are recognized:
    var defaultOptions = acorn.defaultOptions = {
        // `ecmaVersion` indicates the ECMAScript version to parse. Must
        // be either 3, or 5, or 6. This influences support for strict
        // mode, the set of reserved words, support for getters and
        // setters and other features.
        ecmaVersion: 5,
        // Turn on `strictSemicolons` to prevent the parser from doing
        // automatic semicolon insertion.
        strictSemicolons: false,
        // When `allowTrailingCommas` is false, the parser will not allow
        // trailing commas in array and object literals.
        allowTrailingCommas: true,
        // By default, reserved words are not enforced. Enable
        // `forbidReserved` to enforce them. When this option has the
        // value "everywhere", reserved words and keywords can also not be
        // used as property names.
        forbidReserved: false,
        // When enabled, a return at the top level is not considered an
        // error.
        allowReturnOutsideFunction: false,
        // When enabled, import/export statements are not constrained to
        // appearing at the top of the program.
        allowImportExportEverywhere: false,
        // When enabled, hashbang directive in the beginning of file
        // is allowed and treated as a line comment.
        allowHashBang: false,
        // When `locations` is on, `loc` properties holding objects with
        // `start` and `end` properties in `{line, column}` form (with
        // line being 1-based and column 0-based) will be attached to the
        // nodes.
        locations: false,
        // Nodes have their start and end characters offsets recorded in
        // `start` and `end` properties (directly on the node, rather than
        // the `loc` object, which holds line/column data. To also add a
        // [semi-standardized][range] `range` property holding a `[start,
        // end]` array with the same numbers, set the `ranges` option to
        // `true`.
        //
        // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
        ranges: false,
        // It is possible to parse multiple files into a single AST by
        // passing the tree produced by parsing the first file as
        // `program` option in subsequent parses. This will add the
        // toplevel forms of the parsed file to the `Program` (top) node
        // of an existing parse tree.
        program: null,
        // When `locations` is on, you can pass this to record the source
        // file in every node's `loc` object.
        sourceFile: null,
        // This value, if given, is stored in every node, whether
        // `locations` is on or off.
        directSourceFile: null,
        // When enabled, parenthesized expressions are represented by
        // (non-standard) ParenthesizedExpression nodes
        preserveParens: false
    };
    // This function tries to parse a single expression at a given
    // offset in a string. Useful for parsing mixed-language formats
    // that embed JavaScript expressions.
    acorn.parseExpressionAt = function (inpt, pos, opts) {
        input = String(inpt);
        inputLen = input.length;
        setOptions(opts);
        initTokenState(pos);
        initParserState();
        return parseExpression();
    };
    function setOptions(opts) {
        options = {};
        for (var opt in defaultOptions)
            options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
        sourceFile = options.sourceFile || null;
        isKeyword = options.ecmaVersion >= 6 ? isEcma6Keyword : isEcma5AndLessKeyword;
    }
    // The `getLineInfo` function is mostly useful when the
    // `locations` option is off (for performance reasons) and you
    // want to find the line/column position for a given character
    // offset. `input` should be the code string that the offset refers
    // into.
    var getLineInfo = function (input, offset) {
        for (var line = 1, cur = 0;;) {
            lineBreak.lastIndex = cur;
            var match = lineBreak.exec(input);
            if (match && match.index < offset) {
                ++line;
                cur = match.index + match[0].length;
            }
            else
                break;
        }
        return {
            line: line,
            column: offset - cur
        };
    };
    function Token() {
        this.type = tokType;
        this.value = tokVal;
        this.start = tokStart;
        this.end = tokEnd;
        if (options.locations) {
            this.loc = new SourceLocation();
            this.loc.end = tokEndLoc;
        }
        if (options.ranges)
            this.range = [tokStart, tokEnd];
    }
    // Acorn is organized as a tokenizer and a recursive-descent parser.
    // The `tokenize` export provides an interface to the tokenizer.
    // Because the tokenizer is optimized for being efficiently used by
    // the Acorn parser itself, this interface is somewhat crude and not
    // very modular. Performing another parse or call to `tokenize` will
    // reset the internal state, and invalidate existing tokenizers.
    acorn.tokenize = function (inpt, opts) {
        input = String(inpt);
        inputLen = input.length;
        setOptions(opts);
        initTokenState();
        skipSpace();
        function getToken() {
            lastEnd = tokEnd;
            readToken();
            return new Token();
        }
        getToken.jumpTo = function (pos, exprAllowed) {
            tokPos = pos;
            if (options.locations) {
                tokCurLine = 1;
                tokLineStart = lineBreak.lastIndex = 0;
                var match;
                while ((match = lineBreak.exec(input)) && match.index < pos) {
                    ++tokCurLine;
                    tokLineStart = match.index + match[0].length;
                }
            }
            tokExprAllowed = !!exprAllowed;
            skipSpace();
        };
        getToken.current = function () {
            return new Token();
        };
        if (typeof Symbol !== 'undefined') {
            getToken[Symbol.iterator] = function () {
                return {
                    next: function () {
                        var token = getToken();
                        return {
                            done: token.type === _eof,
                            value: token
                        };
                    }
                };
            };
        }
        getToken.options = options;
        return getToken;
    };
    // State is kept in (closure-)global variables. We already saw the
    // `options`, `input`, and `inputLen` variables above.
    // The current position of the tokenizer in the input.
    var tokPos;
    // The start and end offsets of the current token.
    var tokStart, tokEnd;
    // When `options.locations` is true, these hold objects
    // containing the tokens start and end line/column pairs.
    var tokStartLoc, tokEndLoc;
    // The type and value of the current token. Token types are objects,
    // named by variables against which they can be compared, and
    // holding properties that describe them (indicating, for example,
    // the precedence of an infix operator, and the original name of a
    // keyword token). The kind of value that's held in `tokVal` depends
    // on the type of the token. For literals, it is the literal value,
    // for operators, the operator name, and so on.
    var tokType;
    var tokVal;
    // Internal state for the tokenizer. To distinguish between division
    // operators and regular expressions, it remembers whether the last
    // token was one that is allowed to be followed by an expression. In
    // some cases, notably after ')' or '}' tokens, the situation
    // depends on the context before the matching opening bracket, so
    // tokContext keeps a stack of information about current bracketed
    // forms.
    var tokContext, tokExprAllowed;
    // When `options.locations` is true, these are used to keep
    // track of the current line, and know when a new line has been
    // entered.
    var tokCurLine, tokLineStart;
    // These store the position of the previous token, which is useful
    // when finishing a node and assigning its `end` position.
    var lastStart, lastEnd, lastEndLoc;
    // This is the parser's state. `inFunction` is used to reject
    // `return` statements outside of functions, `inGenerator` to
    // reject `yield`s outside of generators, `labels` to verify
    // that `break` and `continue` have somewhere to jump to, and
    // `strict` indicates whether strict mode is on.
    var inFunction, inGenerator, labels, strict;
    function initParserState() {
        lastStart = lastEnd = tokPos;
        if (options.locations)
            lastEndLoc = curPosition();
        inFunction = inGenerator = false;
        labels = [];
        skipSpace();
        readToken();
    }
    // This function is used to raise exceptions on parse errors. It
    // takes an offset integer (into the current `input`) to indicate
    // the location of the error, attaches the position to the end
    // of the error message, and then raises a `SyntaxError` with that
    // message.
    var ParserError = /** @class */ (function (_super) {
        __extends(ParserError, _super);
        function ParserError(message, pos, loc, raisedAt) {
            var _this_1 = _super.call(this, message) || this;
            _this_1.pos = pos;
            _this_1.loc = loc;
            _this_1.raisedAt = raisedAt;
            return _this_1;
        }
        return ParserError;
    }(SyntaxError));
    function raise(pos, message) {
        if (pos instanceof Error) {
            throw pos;
        }
        var loc = getLineInfo(input, pos);
        message += " (" + loc.line + ":" + loc.column + ")";
        throw new ParserError(message, pos, loc, tokPos);
    }
    // Reused empty array added for node fields that are always empty.
    var empty = [];
    // ## Token types
    // The assignment of fine-grained, information-carrying type objects
    // allows the tokenizer to store the information it has about a
    // token in a way that is very cheap for the parser to look up.
    // All token type variables start with an underscore, to make them
    // easy to recognize.
    // These are the general types. The `type` property is only used to
    // make them recognizeable when debugging.
    var _num = {
        type: "num"
    }, _regexp = {
        type: "regexp"
    }, _string = {
        type: "string"
    };
    var _name = {
        type: "name"
    }, _eof = {
        type: "eof"
    };
    // Keyword tokens. The `keyword` property (also used in keyword-like
    // operators) indicates that the token originated from an
    // identifier-like word, which is used when parsing property names.
    //
    // The `beforeExpr` property is used to disambiguate between regular
    // expressions and divisions. It is set on all token types that can
    // be followed by an expression (thus, a slash after them would be a
    // regular expression).
    //
    // `isLoop` marks a keyword as starting a loop, which is important
    // to know when parsing a label, in order to allow or disallow
    // continue jumps to that label.
    var _break = {
        keyword: "break"
    }, _case = {
        keyword: "case",
        beforeExpr: true
    }, _catch = {
        keyword: "catch"
    };
    var _continue = {
        keyword: "continue"
    }, _debugger = {
        keyword: "debugger"
    }, _default = {
        keyword: "default"
    };
    var _do = {
        keyword: "do",
        isLoop: true
    }, _else = {
        keyword: "else",
        beforeExpr: true
    };
    var _finally = {
        keyword: "finally"
    }, _for = {
        keyword: "for",
        isLoop: true
    }, _function = {
        keyword: "function"
    };
    var _if = {
        keyword: "if"
    }, _return = {
        keyword: "return",
        beforeExpr: true
    }, _switch = {
        keyword: "switch"
    };
    var _throw = {
        keyword: "throw",
        beforeExpr: true
    }, _try = {
        keyword: "try"
    }, _var = {
        keyword: "var"
    };
    var _let = {
        keyword: "let"
    }, _const = {
        keyword: "const"
    };
    var _while = {
        keyword: "while",
        isLoop: true
    }, _with = {
        keyword: "with"
    }, _new = {
        keyword: "new",
        beforeExpr: true
    };
    var _this = {
        keyword: "this"
    };
    var _class = {
        keyword: "class"
    }, _extends = {
        keyword: "extends",
        beforeExpr: true
    };
    var _export = {
        keyword: "export"
    }, _import = {
        keyword: "import"
    };
    var _yield = {
        keyword: "yield",
        beforeExpr: true
    };
    // The keywords that denote values.
    var _null = {
        keyword: "null",
        atomValue: null
    }, _true = {
        keyword: "true",
        atomValue: true
    };
    var _false = {
        keyword: "false",
        atomValue: false
    };
    // Some keywords are treated as regular operators. `in` sometimes
    // (when parsing `for`) needs to be tested against specifically, so
    // we assign a variable name to it for quick comparing.
    var _in = {
        keyword: "in",
        binop: 7,
        beforeExpr: true
    };
    // Map keyword names to token types.
    var keywordTypes = {
        "break": _break,
        "case": _case,
        "catch": _catch,
        "continue": _continue,
        "debugger": _debugger,
        "default": _default,
        "do": _do,
        "else": _else,
        "finally": _finally,
        "for": _for,
        "function": _function,
        "if": _if,
        "return": _return,
        "switch": _switch,
        "throw": _throw,
        "try": _try,
        "var": _var,
        "let": _let,
        "const": _const,
        "while": _while,
        "with": _with,
        "null": _null,
        "true": _true,
        "false": _false,
        "new": _new,
        "in": _in,
        "instanceof": {
            keyword: "instanceof",
            binop: 7,
            beforeExpr: true
        },
        "this": _this,
        "typeof": {
            keyword: "typeof",
            prefix: true,
            beforeExpr: true
        },
        "void": {
            keyword: "void",
            prefix: true,
            beforeExpr: true
        },
        "delete": {
            keyword: "delete",
            prefix: true,
            beforeExpr: true
        },
        "class": _class,
        "extends": _extends,
        "export": _export,
        "import": _import,
        "yield": _yield
    };
    // Punctuation token types. Again, the `type` property is purely for debugging.
    var _bracketL = {
        type: "[",
        beforeExpr: true
    }, _bracketR = {
        type: "]"
    }, _braceL = {
        type: "{",
        beforeExpr: true
    };
    var _braceR = {
        type: "}"
    }, _parenL = {
        type: "(",
        beforeExpr: true
    }, _parenR = {
        type: ")"
    };
    var _comma = {
        type: ",",
        beforeExpr: true
    }, _semi = {
        type: ";",
        beforeExpr: true
    };
    var _colon = {
        type: ":",
        beforeExpr: true
    }, _dot = {
        type: "."
    }, _question = {
        type: "?",
        beforeExpr: true
    };
    var _arrow = {
        type: "=>",
        beforeExpr: true
    }, _template = {
        type: "template"
    };
    var _ellipsis = {
        type: "...",
        beforeExpr: true
    };
    var _backQuote = {
        type: "`"
    }, _dollarBraceL = {
        type: "${",
        beforeExpr: true
    };
    // Operators. These carry several kinds of properties to help the
    // parser use them properly (the presence of these properties is
    // what categorizes them as operators).
    //
    // `binop`, when present, specifies that this operator is a binary
    // operator, and will refer to its precedence.
    //
    // `prefix` and `postfix` mark the operator as a prefix or postfix
    // unary operator. `isUpdate` specifies that the node produced by
    // the operator should be of type UpdateExpression rather than
    // simply UnaryExpression (`++` and `--`).
    //
    // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
    // binary operators with a very low precedence, that should result
    // in AssignmentExpression nodes.
    var _slash = {
        binop: 10,
        beforeExpr: true
    }, _eq = {
        isAssign: true,
        beforeExpr: true
    };
    var _assign = {
        isAssign: true,
        beforeExpr: true
    };
    var _incDec = {
        postfix: true,
        prefix: true,
        isUpdate: true
    }, _prefix = {
        prefix: true,
        beforeExpr: true
    };
    var _logicalOR = {
        binop: 1,
        beforeExpr: true
    };
    var _logicalAND = {
        binop: 2,
        beforeExpr: true
    };
    var _bitwiseOR = {
        binop: 3,
        beforeExpr: true
    };
    var _bitwiseXOR = {
        binop: 4,
        beforeExpr: true
    };
    var _bitwiseAND = {
        binop: 5,
        beforeExpr: true
    };
    var _equality = {
        binop: 6,
        beforeExpr: true
    };
    var _relational = {
        binop: 7,
        beforeExpr: true
    };
    var _bitShift = {
        binop: 8,
        beforeExpr: true
    };
    var _plusMin = {
        binop: 9,
        prefix: true,
        beforeExpr: true
    };
    var _modulo = {
        binop: 10,
        beforeExpr: true
    };
    // '*' may be multiply or have special meaning in ES6
    var _star = {
        binop: 10,
        beforeExpr: true
    };
    // Provide access to the token types for external users of the
    // tokenizer.
    acorn.tokTypes = {
        bracketL: _bracketL,
        bracketR: _bracketR,
        braceL: _braceL,
        braceR: _braceR,
        parenL: _parenL,
        parenR: _parenR,
        comma: _comma,
        semi: _semi,
        colon: _colon,
        dot: _dot,
        ellipsis: _ellipsis,
        question: _question,
        slash: _slash,
        eq: _eq,
        name: _name,
        eof: _eof,
        num: _num,
        regexp: _regexp,
        string: _string,
        arrow: _arrow,
        template: _template,
        star: _star,
        assign: _assign,
        backQuote: _backQuote,
        dollarBraceL: _dollarBraceL
    };
    for (var kw in keywordTypes)
        acorn.tokTypes["_" + kw] = keywordTypes[kw];
    // This is a trick taken from Esprima. It turns out that, on
    // non-Chrome browsers, to check whether a string is in a set, a
    // predicate containing a big ugly `switch` statement is faster than
    // a regular expression, and on Chrome the two are about on par.
    // This function uses `eval` (non-lexical) to produce such a
    // predicate from a space-separated string of words.
    //
    // It starts by sorting the words by length.
    function makePredicate(words) {
        var newWords = String(words).split(" ");
        return function (str) { return newWords.includes(str); };
    }
    // The ECMAScript 3 reserved word list.
    var isReservedWord3 = makePredicate("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile");
    // ECMAScript 5 reserved words.
    var isReservedWord5 = makePredicate("class enum extends super const export import");
    // The additional reserved words in strict mode.
    var isStrictReservedWord = makePredicate("implements interface let package private protected public static yield");
    // The forbidden variable names in strict mode.
    var isStrictBadIdWord = makePredicate("eval arguments");
    // And the keywords.
    var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
    var isEcma5AndLessKeyword = makePredicate(ecma5AndLessKeywords);
    var isEcma6Keyword = makePredicate(ecma5AndLessKeywords + " let const class extends export import yield");
    var isKeyword = isEcma5AndLessKeyword;
    // ## Character categories
    // Big ugly regular expressions that match characters in the
    // whitespace, identifier, and identifier-start categories. These
    // are only applied when a character is found to actually have a
    // code point above 128.
    // Generated by `tools/generate-identifier-regex.js`.
    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
    var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
    var nonASCIIidentifierChars = "\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E4-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19B0-\u19C0\u19C8\u19C9\u19D0-\u19D9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFC-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
    var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
    var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    // Whether a single character denotes a newline.
    var newline = /[\n\r\u2028\u2029]/;
    function isNewLine(code) {
        return code === 10 || code === 13 || code === 0x2028 || code == 0x2029;
    }
    // Matches a whole line break (where CRLF is considered a single
    // line break). Used to count lines.
    var lineBreak = /\r\n|[\n\r\u2028\u2029]/g;
    // Test whether a given character code starts an identifier.
    var isIdentifierStart = function (code) {
        if (code < 65)
            return code === 36;
        if (code < 91)
            return true;
        if (code < 97)
            return code === 95;
        if (code < 123)
            return true;
        return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
    };
    // Test whether a given character is part of an identifier.
    var isIdentifierChar = function (code) {
        if (code < 48)
            return code === 36;
        if (code < 58)
            return true;
        if (code < 65)
            return false;
        if (code < 91)
            return true;
        if (code < 97)
            return code === 95;
        if (code < 123)
            return true;
        return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
    };
    // ## Tokenizer
    // These are used when `options.locations` is on, for the
    // `tokStartLoc` and `tokEndLoc` properties.
    function Position(line, col) {
        this.line = line;
        this.column = col;
    }
    Position.prototype.offset = function (n) {
        return new Position(this.line, this.column + n);
    };
    function curPosition() {
        return new Position(tokCurLine, tokPos - tokLineStart);
    }
    // Reset the token state. Used at the start of a parse.
    function initTokenState(pos) {
        if (pos) {
            tokPos = pos;
            tokLineStart = Math.max(0, input.lastIndexOf("\n", pos));
            tokCurLine = input.slice(0, tokLineStart).split(newline).length;
        }
        else {
            tokCurLine = 1;
            tokPos = tokLineStart = 0;
        }
        tokType = _eof;
        tokContext = [b_stat];
        tokExprAllowed = true;
        strict = false;
        if (tokPos === 0 && options.allowHashBang && input.slice(0, 2) === '#!') {
            skipLineComment(2);
        }
    }
    // The algorithm used to determine whether a regexp can appear at a
    // given point in the program is loosely based on sweet.js' approach.
    // See https://github.com/mozilla/sweet.js/wiki/design
    var b_stat = {
        token: "{",
        isExpr: false
    }, b_expr = {
        token: "{",
        isExpr: true
    }, b_tmpl = {
        token: "${",
        isExpr: true
    };
    var p_stat = {
        token: "(",
        isExpr: false
    }, p_expr = {
        token: "(",
        isExpr: true
    };
    var q_tmpl = {
        token: "`",
        isExpr: true
    }, f_expr = {
        token: "function",
        isExpr: true
    };
    function curTokContext() {
        return tokContext[tokContext.length - 1];
    }
    function braceIsBlock(prevType) {
        var parent;
        if (prevType === _colon && (parent = curTokContext()).token == "{")
            return !parent.isExpr;
        if (prevType === _return)
            return newline.test(input.slice(lastEnd, tokStart));
        if (prevType === _else || prevType === _semi || prevType === _eof)
            return true;
        if (prevType == _braceL)
            return curTokContext() === b_stat;
        return !tokExprAllowed;
    }
    // Called at the end of every token. Sets `tokEnd`, `tokVal`, and
    // maintains `tokContext` and `tokExprAllowed`, and skips the space
    // after the token, so that the next one's `tokStart` will point at
    // the right position.
    function finishToken(type, val) {
        tokEnd = tokPos;
        if (options.locations)
            tokEndLoc = curPosition();
        var prevType = tokType, preserveSpace = false;
        tokType = type;
        tokVal = val;
        // Update context info
        if (type === _parenR || type === _braceR) {
            var out = tokContext.pop();
            if (out === b_tmpl) {
                preserveSpace = true;
            }
            else if (out === b_stat && curTokContext() === f_expr) {
                tokContext.pop();
                tokExprAllowed = false;
            }
            else {
                tokExprAllowed = !(out && out.isExpr);
            }
        }
        else if (type === _braceL) {
            tokContext.push(braceIsBlock(prevType) ? b_stat : b_expr);
            tokExprAllowed = true;
        }
        else if (type === _dollarBraceL) {
            tokContext.push(b_tmpl);
            tokExprAllowed = true;
        }
        else if (type == _parenL) {
            var statementParens = prevType === _if || prevType === _for || prevType === _with || prevType === _while;
            tokContext.push(statementParens ? p_stat : p_expr);
            tokExprAllowed = true;
        }
        else if (type == _incDec) ;
        else if (type.keyword && prevType == _dot) {
            tokExprAllowed = false;
        }
        else if (type == _function) {
            if (curTokContext() !== b_stat) {
                tokContext.push(f_expr);
            }
            tokExprAllowed = false;
        }
        else if (type === _backQuote) {
            if (curTokContext() === q_tmpl) {
                tokContext.pop();
            }
            else {
                tokContext.push(q_tmpl);
                preserveSpace = true;
            }
            tokExprAllowed = false;
        }
        else {
            tokExprAllowed = type.beforeExpr;
        }
        if (!preserveSpace)
            skipSpace();
    }
    function skipBlockComment() {
        var start = tokPos, end = input.indexOf("*/", tokPos += 2);
        if (end === -1)
            raise(tokPos - 2, "Unterminated comment");
        tokPos = end + 2;
        if (options.locations) {
            lineBreak.lastIndex = start;
            var match;
            while ((match = lineBreak.exec(input)) && match.index < tokPos) {
                ++tokCurLine;
                tokLineStart = match.index + match[0].length;
            }
        }
    }
    function skipLineComment(startSkip) {
        var ch = input.charCodeAt(tokPos += startSkip);
        while (tokPos < inputLen && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233) {
            ++tokPos;
            ch = input.charCodeAt(tokPos);
        }
    }
    // Called at the start of the parse and after every token. Skips
    // whitespace and comments, and.
    function skipSpace() {
        while (tokPos < inputLen) {
            var ch = input.charCodeAt(tokPos);
            if (ch === 32) { // ' '
                ++tokPos;
            }
            else if (ch === 13) {
                ++tokPos;
                var next = input.charCodeAt(tokPos);
                if (next === 10) {
                    ++tokPos;
                }
                if (options.locations) {
                    ++tokCurLine;
                    tokLineStart = tokPos;
                }
            }
            else if (ch === 10 || ch === 8232 || ch === 8233) {
                ++tokPos;
                if (options.locations) {
                    ++tokCurLine;
                    tokLineStart = tokPos;
                }
            }
            else if (ch > 8 && ch < 14) {
                ++tokPos;
            }
            else if (ch === 47) { // '/'
                var next = input.charCodeAt(tokPos + 1);
                if (next === 42) { // '*'
                    skipBlockComment();
                }
                else if (next === 47) { // '/'
                    skipLineComment(2);
                }
                else
                    break;
            }
            else if (ch === 160) { // '\xa0'
                ++tokPos;
            }
            else if (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                ++tokPos;
            }
            else {
                break;
            }
        }
    }
    // ### Token reading
    // This is the function that is called to fetch the next token. It
    // is somewhat obscure, because it works in character codes rather
    // than characters, and because operator parsing has been inlined
    // into it.
    //
    // All in the name of speed.
    //
    function readToken_dot() {
        var next = input.charCodeAt(tokPos + 1);
        if (next >= 48 && next <= 57)
            return readNumber(true);
        var next2 = input.charCodeAt(tokPos + 2);
        if (options.ecmaVersion >= 6 && next === 46 && next2 === 46) { // 46 = dot '.'
            tokPos += 3;
            return finishToken(_ellipsis);
        }
        else {
            ++tokPos;
            return finishToken(_dot);
        }
    }
    function readToken_slash() {
        var next = input.charCodeAt(tokPos + 1);
        if (tokExprAllowed) {
            ++tokPos;
            return readRegexp();
        }
        if (next === 61)
            return finishOp(_assign, 2);
        return finishOp(_slash, 1);
    }
    function readToken_mult_modulo(code) {
        var next = input.charCodeAt(tokPos + 1);
        if (next === 61)
            return finishOp(_assign, 2);
        return finishOp(code === 42 ? _star : _modulo, 1);
    }
    function readToken_pipe_amp(code) {
        var next = input.charCodeAt(tokPos + 1);
        if (next === code)
            return finishOp(code === 124 ? _logicalOR : _logicalAND, 2);
        if (next === 61)
            return finishOp(_assign, 2);
        return finishOp(code === 124 ? _bitwiseOR : _bitwiseAND, 1);
    }
    function readToken_caret() {
        var next = input.charCodeAt(tokPos + 1);
        if (next === 61)
            return finishOp(_assign, 2);
        return finishOp(_bitwiseXOR, 1);
    }
    function readToken_plus_min(code) {
        var next = input.charCodeAt(tokPos + 1);
        if (next === code) {
            if (next == 45 && input.charCodeAt(tokPos + 2) == 62 &&
                newline.test(input.slice(lastEnd, tokPos))) {
                // A `-->` line comment
                skipLineComment(3);
                skipSpace();
                return readToken();
            }
            return finishOp(_incDec, 2);
        }
        if (next === 61)
            return finishOp(_assign, 2);
        return finishOp(_plusMin, 1);
    }
    function readToken_lt_gt(code) {
        var next = input.charCodeAt(tokPos + 1);
        var size = 1;
        if (next === code) {
            size = code === 62 && input.charCodeAt(tokPos + 2) === 62 ? 3 : 2;
            if (input.charCodeAt(tokPos + size) === 61)
                return finishOp(_assign, size + 1);
            return finishOp(_bitShift, size);
        }
        if (next == 33 && code == 60 && input.charCodeAt(tokPos + 2) == 45 &&
            input.charCodeAt(tokPos + 3) == 45) {
            // `<!--`, an XML-style comment that should be interpreted as a line comment
            skipLineComment(4);
            skipSpace();
            return readToken();
        }
        if (next === 61)
            size = input.charCodeAt(tokPos + 2) === 61 ? 3 : 2;
        return finishOp(_relational, size);
    }
    function readToken_eq_excl(code) {
        var next = input.charCodeAt(tokPos + 1);
        if (next === 61)
            return finishOp(_equality, input.charCodeAt(tokPos + 2) === 61 ? 3 : 2);
        if (code === 61 && next === 62 && options.ecmaVersion >= 6) { // '=>'
            tokPos += 2;
            return finishToken(_arrow);
        }
        return finishOp(code === 61 ? _eq : _prefix, 1);
    }
    function getTokenFromCode(code) {
        switch (code) {
            // The interpretation of a dot depends on whether it is followed
            // by a digit or another two dots.
            case 46: // '.'
                return readToken_dot();
            // Punctuation tokens.
            case 40:
                ++tokPos;
                return finishToken(_parenL);
            case 41:
                ++tokPos;
                return finishToken(_parenR);
            case 59:
                ++tokPos;
                return finishToken(_semi);
            case 44:
                ++tokPos;
                return finishToken(_comma);
            case 91:
                ++tokPos;
                return finishToken(_bracketL);
            case 93:
                ++tokPos;
                return finishToken(_bracketR);
            case 123:
                ++tokPos;
                return finishToken(_braceL);
            case 125:
                ++tokPos;
                return finishToken(_braceR);
            case 58:
                ++tokPos;
                return finishToken(_colon);
            case 63:
                ++tokPos;
                return finishToken(_question);
            case 96: // '`'
                if (options.ecmaVersion >= 6) {
                    ++tokPos;
                    return finishToken(_backQuote);
                }
                else {
                    return false;
                }
            case 48: // '0'
                var next = input.charCodeAt(tokPos + 1);
                if (next === 120 || next === 88)
                    return readRadixNumber(16); // '0x', '0X' - hex number
                if (options.ecmaVersion >= 6) {
                    if (next === 111 || next === 79)
                        return readRadixNumber(8); // '0o', '0O' - octal number
                    if (next === 98 || next === 66)
                        return readRadixNumber(2); // '0b', '0B' - binary number
                }
            // Anything else beginning with a digit is an integer, octal
            // number, or float.
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: // 1-9
                return readNumber(false);
            // Quotes produce strings.
            case 34:
            case 39: // '"', "'"
                return readString(code);
            // Operators are parsed inline in tiny state machines. '=' (61) is
            // often referred to. `finishOp` simply skips the amount of
            // characters it is given as second argument, and returns a token
            // of the type given by its first argument.
            case 47: // '/'
                return readToken_slash();
            case 37:
            case 42: // '%*'
                return readToken_mult_modulo(code);
            case 124:
            case 38: // '|&'
                return readToken_pipe_amp(code);
            case 94: // '^'
                return readToken_caret();
            case 43:
            case 45: // '+-'
                return readToken_plus_min(code);
            case 60:
            case 62: // '<>'
                return readToken_lt_gt(code);
            case 61:
            case 33: // '=!'
                return readToken_eq_excl(code);
            case 126: // '~'
                return finishOp(_prefix, 1);
        }
        return false;
    }
    function readToken() {
        tokStart = tokPos;
        if (options.locations)
            tokStartLoc = curPosition();
        if (tokPos >= inputLen)
            return finishToken(_eof);
        if (curTokContext() === q_tmpl) {
            return readTmplToken();
        }
        var code = input.charCodeAt(tokPos);
        // Identifier or keyword. '\uXXXX' sequences are allowed in
        // identifiers, so '\' also dispatches to that.
        if (isIdentifierStart(code) || code === 92 /* '\' */)
            return readWord();
        var tok = getTokenFromCode(code);
        if (tok === false) {
            // If we are here, we either found a non-ASCII identifier
            // character, or something that's entirely disallowed.
            var ch = String.fromCharCode(code);
            if (ch === "\\" || nonASCIIidentifierStart.test(ch))
                return readWord();
            raise(tokPos, "Unexpected character '" + ch + "'");
        }
        return tok;
    }
    function finishOp(type, size) {
        var str = input.slice(tokPos, tokPos + size);
        tokPos += size;
        finishToken(type, str);
    }
    var regexpUnicodeSupport = false;
    try {
        new RegExp("\uffff", "u");
        regexpUnicodeSupport = true;
    }
    catch (e) { }
    // Parse a regular expression. Some context-awareness is necessary,
    // since a '/' inside a '[]' set does not end the expression.
    function readRegexp() {
        var content = "", escaped, inClass, start = tokPos;
        for (;;) {
            if (tokPos >= inputLen)
                raise(start, "Unterminated regular expression");
            var ch = input.charAt(tokPos);
            if (newline.test(ch))
                raise(start, "Unterminated regular expression");
            if (!escaped) {
                if (ch === "[")
                    inClass = true;
                else if (ch === "]" && inClass)
                    inClass = false;
                else if (ch === "/" && !inClass)
                    break;
                escaped = ch === "\\";
            }
            else
                escaped = false;
            ++tokPos;
        }
        var content = input.slice(start, tokPos);
        ++tokPos;
        // Need to use `readWord1` because '\uXXXX' sequences are allowed
        // here (don't ask).
        var mods = readWord1();
        var tmp = content;
        if (mods) {
            var validFlags = /^[gmsiy]*$/;
            if (options.ecmaVersion >= 6)
                validFlags = /^[gmsiyu]*$/;
            if (!validFlags.test(mods))
                raise(start, "Invalid regular expression flag");
            if (mods.indexOf('u') >= 0 && !regexpUnicodeSupport) {
                // Replace each astral symbol and every Unicode code point
                // escape sequence that represents such a symbol with a single
                // ASCII symbol to avoid throwing on regular expressions that
                // are only valid in combination with the `/u` flag.
                tmp = tmp
                    .replace(/\\u\{([0-9a-fA-F]{5,6})\}/g, "x")
                    .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
            }
        }
        // Detect invalid regular expressions.
        try {
            new RegExp(tmp);
        }
        catch (e) {
            if (e instanceof SyntaxError)
                raise(start, "Error parsing regular expression: " + e.message);
            raise(e);
        }
        // Get a regular expression object for this pattern-flag pair, or `null` in
        // case the current environment doesn't support the flags it uses.
        try {
            var value = new RegExp(content, mods);
        }
        catch (err) {
            value = null;
        }
        // @ts-ignore
        return finishToken(_regexp, {
            pattern: content,
            flags: mods,
            value: value
        });
    }
    // Read an integer in the given radix. Return null if zero digits
    // were read, the integer value otherwise. When `len` is given, this
    // will return `null` unless the integer has exactly `len` digits.
    function readInt(radix, len) {
        var start = tokPos, total = 0;
        for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
            var code = input.charCodeAt(tokPos), val;
            if (code >= 97)
                val = code - 97 + 10; // a
            else if (code >= 65)
                val = code - 65 + 10; // A
            else if (code >= 48 && code <= 57)
                val = code - 48; // 0-9
            else
                val = Infinity;
            if (val >= radix)
                break;
            ++tokPos;
            total = total * Number(radix) + val;
        }
        if (tokPos === start || len != null && tokPos - start !== len)
            return null;
        return total;
    }
    function readRadixNumber(radix) {
        tokPos += 2; // 0x
        var val = readInt(radix);
        if (val == null)
            raise(tokStart + 2, "Expected number in radix " + radix);
        if (isIdentifierStart(input.charCodeAt(tokPos)))
            raise(tokPos, "Identifier directly after number");
        return finishToken(_num, val);
    }
    // Read an integer, octal integer, or floating-point number.
    function readNumber(startsWithDot) {
        var start = tokPos, isFloat = false, octal = input.charCodeAt(tokPos) === 48;
        if (!startsWithDot && readInt(10) === null)
            raise(start, "Invalid number");
        if (input.charCodeAt(tokPos) === 46) {
            ++tokPos;
            readInt(10);
            isFloat = true;
        }
        var next = input.charCodeAt(tokPos);
        if (next === 69 || next === 101) { // 'eE'
            next = input.charCodeAt(++tokPos);
            if (next === 43 || next === 45)
                ++tokPos; // '+-'
            if (readInt(10) === null)
                raise(start, "Invalid number");
            isFloat = true;
        }
        if (isIdentifierStart(input.charCodeAt(tokPos)))
            raise(tokPos, "Identifier directly after number");
        var str = input.slice(start, tokPos), val;
        if (isFloat)
            val = parseFloat(str);
        else if (!octal || str.length === 1)
            val = parseInt(str, 10);
        else if (/[89]/.test(str) || strict)
            raise(start, "Invalid number");
        else
            val = parseInt(str, 8);
        return finishToken(_num, val);
    }
    // Read a string value, interpreting backslash-escapes.
    function readCodePoint() {
        var ch = input.charCodeAt(tokPos), code;
        if (ch === 123) {
            if (options.ecmaVersion < 6)
                unexpected();
            ++tokPos;
            code = readHexChar(input.indexOf('}', tokPos) - tokPos);
            ++tokPos;
            if (code > 0x10FFFF)
                unexpected();
        }
        else {
            code = readHexChar(4);
        }
        // UTF-16 Encoding
        if (code <= 0xFFFF) {
            return String.fromCharCode(code);
        }
        var cu1 = ((code - 0x10000) >> 10) + 0xD800;
        var cu2 = ((code - 0x10000) & 1023) + 0xDC00;
        return String.fromCharCode(cu1, cu2);
    }
    function readString(quote) {
        var out = "", chunkStart = ++tokPos;
        for (;;) {
            if (tokPos >= inputLen)
                raise(tokStart, "Unterminated string constant");
            var ch = input.charCodeAt(tokPos);
            if (ch === quote)
                break;
            if (ch === 92) { // '\'
                out += input.slice(chunkStart, tokPos);
                out += readEscapedChar();
                chunkStart = tokPos;
            }
            else {
                if (isNewLine(ch))
                    raise(tokStart, "Unterminated string constant");
                ++tokPos;
            }
        }
        out += input.slice(chunkStart, tokPos++);
        return finishToken(_string, out);
    }
    // Reads template string tokens.
    function readTmplToken() {
        var out = "", chunkStart = tokPos;
        for (;;) {
            if (tokPos >= inputLen)
                raise(tokStart, "Unterminated template");
            var ch = input.charCodeAt(tokPos);
            if (ch === 96 || ch === 36 && input.charCodeAt(tokPos + 1) === 123) { // '`', '${'
                if (tokPos === tokStart && tokType === _template) {
                    if (ch === 36) {
                        tokPos += 2;
                        return finishToken(_dollarBraceL);
                    }
                    else {
                        ++tokPos;
                        return finishToken(_backQuote);
                    }
                }
                out += input.slice(chunkStart, tokPos);
                return finishToken(_template, out);
            }
            if (ch === 92) { // '\'
                out += input.slice(chunkStart, tokPos);
                out += readEscapedChar();
                chunkStart = tokPos;
            }
            else if (isNewLine(ch)) {
                out += input.slice(chunkStart, tokPos);
                ++tokPos;
                if (ch === 13 && input.charCodeAt(tokPos) === 10) {
                    ++tokPos;
                    out += "\n";
                }
                else {
                    out += String.fromCharCode(ch);
                }
                if (options.locations) {
                    ++tokCurLine;
                    tokLineStart = tokPos;
                }
                chunkStart = tokPos;
            }
            else {
                ++tokPos;
            }
        }
    }
    // Used to read escaped characters
    function readEscapedChar() {
        var ch = input.charCodeAt(++tokPos);
        var octal = /^[0-7]+/.exec(input.slice(tokPos, tokPos + 3));
        if (octal)
            octal = octal[0];
        while (octal && parseInt(octal, 8) > 255)
            octal = octal.slice(0, -1);
        if (octal === "0")
            octal = null;
        ++tokPos;
        if (octal) {
            if (strict)
                raise(tokPos - 2, "Octal literal in strict mode");
            tokPos += octal.length - 1;
            return String.fromCharCode(parseInt(octal, 8));
        }
        else {
            switch (ch) {
                case 110:
                    return "\n"; // 'n' -> '\n'
                case 114:
                    return "\r"; // 'r' -> '\r'
                case 120:
                    return String.fromCharCode(readHexChar(2)); // 'x'
                case 117:
                    return readCodePoint(); // 'u'
                case 116:
                    return "\t"; // 't' -> '\t'
                case 98:
                    return "\b"; // 'b' -> '\b'
                case 118:
                    return "\u000b"; // 'v' -> '\u000b'
                case 102:
                    return "\f"; // 'f' -> '\f'
                case 48:
                    return "\0"; // 0 -> '\0'
                case 13:
                    if (input.charCodeAt(tokPos) === 10)
                        ++tokPos; // '\r\n'
                case 10: // ' \n'
                    if (options.locations) {
                        tokLineStart = tokPos;
                        ++tokCurLine;
                    }
                    return "";
                default:
                    return String.fromCharCode(ch);
            }
        }
    }
    // Used to read character escape sequences ('\x', '\u', '\U').
    function readHexChar(len) {
        var n = readInt(16, len);
        if (n === null)
            raise(tokStart, "Bad character escape sequence");
        return n;
    }
    // Used to signal to callers of `readWord1` whether the word
    // contained any escape sequences. This is needed because words with
    // escape sequences must not be interpreted as keywords.
    var containsEsc;
    // Read an identifier, and return it as a string. Sets `containsEsc`
    // to whether the word contained a '\u' escape.
    //
    // Incrementally adds only escaped chars, adding other chunks as-is
    // as a micro-optimization.
    function readWord1() {
        containsEsc = false;
        var word = "", first = true, chunkStart = tokPos;
        while (tokPos < inputLen) {
            var ch = input.charCodeAt(tokPos);
            if (isIdentifierChar(ch)) {
                ++tokPos;
            }
            else if (ch === 92) { // "\"
                containsEsc = true;
                word += input.slice(chunkStart, tokPos);
                if (input.charCodeAt(++tokPos) != 117) // "u"
                    raise(tokPos, "Expecting Unicode escape sequence \\uXXXX");
                ++tokPos;
                var esc = readHexChar(4);
                var escStr = String.fromCharCode(esc);
                if (!escStr)
                    raise(tokPos - 1, "Invalid Unicode escape");
                if (!(first ? isIdentifierStart(esc) : isIdentifierChar(esc)))
                    raise(tokPos - 4, "Invalid Unicode escape");
                word += escStr;
                chunkStart = tokPos;
            }
            else {
                break;
            }
            first = false;
        }
        return word + input.slice(chunkStart, tokPos);
    }
    // Read an identifier or keyword token. Will check for reserved
    // words when necessary.
    function readWord() {
        var word = readWord1();
        var type = _name;
        if (!containsEsc && isKeyword(word))
            type = keywordTypes[word];
        return finishToken(type, word);
    }
    // ## Parser
    // A recursive descent parser operates by defining functions for all
    // syntactic elements, and recursively calling those, each function
    // advancing the input stream and returning an AST node. Precedence
    // of constructs (for example, the fact that `!x[1]` means `!(x[1])`
    // instead of `(!x)[1]` is handled by the fact that the parser
    // function that parses unary prefix operators is called first, and
    // in turn calls the function that parses `[]` subscripts — that
    // way, it'll receive the node for `x[1]` already parsed, and wraps
    // *that* in the unary operator node.
    //
    // Acorn uses an [operator precedence parser][opp] to handle binary
    // operator precedence, because it is much more compact than using
    // the technique outlined above, which uses different, nesting
    // functions to specify precedence, for all of the ten binary
    // precedence levels that JavaScript defines.
    //
    // [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser
    // ### Parser utilities
    // Continue to the next token.
    function next() {
        lastStart = tokStart;
        lastEnd = tokEnd;
        lastEndLoc = tokEndLoc;
        readToken();
    }
    // Enter strict mode. Re-reads the next number or string to
    // please pedantic tests ("use strict"; 010; -- should fail).
    function setStrict(strct) {
        strict = strct;
        if (tokType !== _num && tokType !== _string)
            return;
        tokPos = tokStart;
        if (options.locations) {
            while (tokPos < tokLineStart) {
                tokLineStart = input.lastIndexOf("\n", tokLineStart - 2) + 1;
                --tokCurLine;
            }
        }
        skipSpace();
        readToken();
    }
    // Start an AST node, attaching a start offset.
    function Node() {
        this.type = null;
        this.start = tokStart;
        this.end = null;
    }
    function SourceLocation() {
        this.start = tokStartLoc;
        this.end = null;
        if (sourceFile !== null)
            this.source = sourceFile;
    }
    function startNode() {
        var node = new Node();
        if (options.locations)
            node.loc = new SourceLocation();
        if (options.directSourceFile)
            node.sourceFile = options.directSourceFile;
        if (options.ranges)
            node.range = [tokStart, 0];
        return node;
    }
    // Sometimes, a node is only started *after* the token stream passed
    // its start position. The functions below help storing a position
    // and creating a node from a previous position.
    function storeCurrentPos() {
        return options.locations ? [tokStart, tokStartLoc] : tokStart;
    }
    function startNodeAt(pos) {
        var node = new Node(), start = pos;
        if (options.locations) {
            node.loc = new SourceLocation();
            node.loc.start = start[1];
            start = pos[0];
        }
        node.start = start;
        if (options.directSourceFile)
            node.sourceFile = options.directSourceFile;
        if (options.ranges)
            node.range = [start, 0];
        return node;
    }
    // Finish an AST node, adding `type` and `end` properties.
    function finishNode(node, type) {
        node.type = type;
        node.end = lastEnd;
        if (options.locations)
            node.loc.end = lastEndLoc;
        if (options.ranges)
            node.range[1] = lastEnd;
        return node;
    }
    // Finish node at given position
    function finishNodeAt(node, type, pos) {
        if (options.locations) {
            node.loc.end = pos[1];
            pos = pos[0];
        }
        node.type = type;
        node.end = pos;
        if (options.ranges)
            node.range[1] = pos;
        return node;
    }
    // Test whether a statement node is the string literal `"use strict"`.
    function isUseStrict(stmt) {
        return options.ecmaVersion >= 5 && stmt.type === ExpressionStatement &&
            stmt.expression.type === Literal && stmt.expression.value === "use strict";
    }
    // Predicate that tests whether the next token is of the given
    // type, and if yes, consumes it as a side effect.
    function eat(type) {
        if (tokType === type) {
            next();
            return true;
        }
        else {
            return false;
        }
    }
    // Tests whether parsed token is a contextual keyword.
    function isContextual(name) {
        return tokType === _name && tokVal === name;
    }
    // Consumes contextual keyword if possible.
    function eatContextual(name) {
        return tokVal === name && eat(_name);
    }
    // Asserts that following token is given contextual keyword.
    function expectContextual(name) {
        if (!eatContextual(name))
            unexpected();
    }
    // Test whether a semicolon can be inserted at the current position.
    function canInsertSemicolon() {
        return !options.strictSemicolons &&
            (tokType === _eof || tokType === _braceR || newline.test(input.slice(lastEnd, tokStart)));
    }
    // Consume a semicolon, or, failing that, see if we are allowed to
    // pretend that there is a semicolon at this position.
    function semicolon() {
        if (!eat(_semi) && !canInsertSemicolon())
            unexpected();
    }
    // Expect a token of a given type. If found, consume it, otherwise,
    // raise an unexpected token error.
    function expect(type) {
        eat(type) || unexpected();
    }
    // Raise an unexpected token error.
    function unexpected(pos) {
        raise(pos != null ? pos : tokStart, "Unexpected token");
    }
    // Checks if hash object has a property.
    function has(obj, propName) {
        return Object.prototype.hasOwnProperty.call(obj, propName);
    }
    // Convert existing expression atom to assignable pattern
    // if possible.
    function toAssignable(node, isBinding) {
        if (options.ecmaVersion >= 6 && node) {
            switch (node.type) {
                case Identifier:
                case ObjectPattern:
                case ArrayPattern:
                case AssignmentPattern:
                    break;
                case ObjectExpression:
                    node.type = ObjectPattern;
                    for (var i = 0; i < node.properties.length; i++) {
                        var prop = node.properties[i];
                        if (prop.kind !== "init")
                            raise(prop.key.start, "Object pattern can't contain getter or setter");
                        toAssignable(prop.value, isBinding);
                    }
                    break;
                case ArrayExpression:
                    node.type = ArrayPattern;
                    toAssignableList(node.elements, isBinding);
                    break;
                case AssignmentExpression:
                    if (node.operator === "=") {
                        node.type = AssignmentPattern;
                    }
                    else {
                        raise(node.left.end, "Only '=' operator can be used for specifying default value.");
                    }
                    break;
                case MemberExpression:
                    if (!isBinding)
                        break;
                default:
                    raise(node.start, "Assigning to rvalue");
            }
        }
        return node;
    }
    // Convert list of expression atoms to binding list.
    function toAssignableList(exprList, isBinding) {
        if (exprList.length) {
            for (var i = 0; i < exprList.length - 1; i++) {
                toAssignable(exprList[i], isBinding);
            }
            var last = exprList[exprList.length - 1];
            switch (last.type) {
                case RestElement:
                    break;
                case SpreadElement:
                    last.type = RestElement;
                    var arg = last.argument;
                    toAssignable(arg, isBinding);
                    if (arg.type !== Identifier && arg.type !== MemberExpression && arg.type !== ArrayPattern)
                        unexpected(arg.start);
                    break;
                default:
                    toAssignable(last, isBinding);
            }
        }
        return exprList;
    }
    // Parses spread element.
    function parseSpread(refShorthandDefaultPos) {
        var node = startNode();
        next();
        node.argument = parseMaybeAssign(refShorthandDefaultPos);
        return finishNode(node, SpreadElement);
    }
    function parseRest() {
        var node = startNode();
        next();
        node.argument = tokType === _name || tokType === _bracketL ? parseBindingAtom() : unexpected();
        return finishNode(node, RestElement);
    }
    // Parses lvalue (assignable) atom.
    function parseBindingAtom() {
        if (options.ecmaVersion < 6)
            return parseIdent();
        switch (tokType) {
            case _name:
                return parseIdent();
            case _bracketL:
                var node = startNode();
                next();
                node.elements = parseBindingList(_bracketR, true);
                return finishNode(node, ArrayPattern);
            case _braceL:
                return parseObj(true);
            default:
                unexpected();
        }
    }
    function parseBindingList(close, allowEmpty) {
        var elts = [], first = true;
        while (!eat(close)) {
            first ? first = false : expect(_comma);
            if (tokType === _ellipsis) {
                elts.push(parseRest());
                expect(close);
                break;
            }
            elts.push(allowEmpty && tokType === _comma ? null : parseMaybeDefault());
        }
        return elts;
    }
    // Parses assignment pattern around given atom if possible.
    function parseMaybeDefault(startPos, left) {
        startPos = startPos || storeCurrentPos();
        left = left || parseBindingAtom();
        if (!eat(_eq))
            return left;
        var node = startNodeAt(startPos);
        node.operator = "=";
        node.left = left;
        node.right = parseMaybeAssign();
        return finishNode(node, AssignmentPattern);
    }
    // Verify that argument names are not repeated, and it does not
    // try to bind the words `eval` or `arguments`.
    function checkFunctionParam(param, nameHash) {
        switch (param.type) {
            case Identifier:
                if (isStrictReservedWord(param.name) || isStrictBadIdWord(param.name))
                    raise(param.start, "Defining '" + param.name + "' in strict mode");
                if (has(nameHash, param.name))
                    raise(param.start, "Argument name clash in strict mode");
                nameHash[param.name] = true;
                break;
            case ObjectPattern:
                for (var i = 0; i < param.properties.length; i++)
                    checkFunctionParam(param.properties[i].value, nameHash);
                break;
            case ArrayPattern:
                for (var i = 0; i < param.elements.length; i++) {
                    var elem = param.elements[i];
                    if (elem)
                        checkFunctionParam(elem, nameHash);
                }
                break;
            case RestElement:
                return checkFunctionParam(param.argument, nameHash);
        }
    }
    // Check if property name clashes with already added.
    // Object/class getters and setters are not allowed to clash —
    // either with each other or with an init property — and in
    // strict mode, init properties are also not allowed to be repeated.
    function checkPropClash(prop, propHash) {
        if (options.ecmaVersion >= 6)
            return;
        var key = prop.key, name;
        switch (key.type) {
            case Identifier:
                name = key.name;
                break;
            case Literal:
                name = String(key.value);
                break;
            default:
                return;
        }
        var kind = prop.kind || "init", other;
        if (has(propHash, name)) {
            other = propHash[name];
            var isGetSet = kind !== "init";
            if ((strict || isGetSet) && other[kind] || !(+isGetSet ^ other.init))
                raise(key.start, "Redefinition of property");
        }
        else {
            other = propHash[name] = {
                init: false,
                get: false,
                set: false
            };
        }
        other[kind] = true;
    }
    // Verify that a node is an lval — something that can be assigned
    // to.
    function checkLVal(expr, isBinding) {
        switch (expr.type) {
            case Identifier:
                if (strict && (isStrictBadIdWord(expr.name) || isStrictReservedWord(expr.name)))
                    raise(expr.start, (isBinding ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
                break;
            case MemberExpression:
                if (isBinding)
                    raise(expr.start, "Binding to member expression");
                break;
            case ObjectPattern:
                for (var i = 0; i < expr.properties.length; i++)
                    checkLVal(expr.properties[i].value, isBinding);
                break;
            case ArrayPattern:
                for (var i = 0; i < expr.elements.length; i++) {
                    var elem = expr.elements[i];
                    if (elem)
                        checkLVal(elem, isBinding);
                }
                break;
            case AssignmentPattern:
                checkLVal(expr.left);
                break;
            case RestElement:
                checkLVal(expr.argument);
                break;
            default:
                raise(expr.start, "Assigning to rvalue");
        }
    }
    // ### Statement parsing
    // Parse a program. Initializes the parser, reads any number of
    // statements, and wraps them in a Program node.  Optionally takes a
    // `program` argument.  If present, the statements will be appended
    // to its body instead of creating a new node.
    function parseTopLevel(node) {
        var first = true;
        if (!node.body)
            node.body = [];
        while (tokType !== _eof) {
            var stmt = parseStatement(true, true);
            node.body.push(stmt);
            if (first && isUseStrict(stmt))
                setStrict(true);
            first = false;
        }
        next();
        return finishNode(node, Program);
    }
    var loopLabel = {
        kind: "loop"
    }, switchLabel = {
        kind: "switch"
    };
    // Parse a single statement.
    //
    // If expecting a statement and finding a slash operator, parse a
    // regular expression literal. This is to handle cases like
    // `if (foo) /blah/.exec(foo);`, where looking at the previous token
    // does not help.
    function parseStatement(declaration, topLevel) {
        var starttype = tokType, node = startNode();
        // Most types of statements are recognized by the keyword they
        // start with. Many are trivial to parse, some require a bit of
        // complexity.
        switch (starttype) {
            case _break:
            case _continue:
                return parseBreakContinueStatement(node, starttype.keyword);
            case _debugger:
                return parseDebuggerStatement(node);
            case _do:
                return parseDoStatement(node);
            case _for:
                return parseForStatement(node);
            case _function:
                if (!declaration && options.ecmaVersion >= 6)
                    unexpected();
                return parseFunctionStatement(node);
            case _class:
                if (!declaration)
                    unexpected();
                return parseClass(node, true);
            case _if:
                return parseIfStatement(node);
            case _return:
                return parseReturnStatement(node);
            case _switch:
                return parseSwitchStatement(node);
            case _throw:
                return parseThrowStatement(node);
            case _try:
                return parseTryStatement(node);
            case _let:
            case _const:
                if (!declaration)
                    unexpected(); // NOTE: falls through to _var
            case _var:
                return parseVarStatement(node, starttype.keyword);
            case _while:
                return parseWhileStatement(node);
            case _with:
                return parseWithStatement();
            case _braceL:
                return parseBlock(); // no point creating a function for this
            case _semi:
                return parseEmptyStatement(node);
            case _export:
            case _import:
                if (!topLevel && !options.allowImportExportEverywhere)
                    raise(tokStart, "'import' and 'export' may only appear at the top level");
                return starttype === _import ? parseImport(node) : parseExport(node);
            // If the statement does not start with a statement keyword or a
            // brace, it's an ExpressionStatement or LabeledStatement. We
            // simply start parsing an expression, and afterwards, if the
            // next token is a colon and the expression was a simple
            // Identifier node, we switch to interpreting it as a label.
            default:
                var maybeName = tokVal, expr = parseExpression();
                if (starttype === _name && expr.type === Identifier && eat(_colon))
                    return parseLabeledStatement(node, maybeName, expr);
                else
                    return parseExpressionStatement(node, expr);
        }
    }
    function parseBreakContinueStatement(node, keyword) {
        var isBreak = keyword == _break.keyword;
        next();
        if (eat(_semi) || canInsertSemicolon())
            node.label = null;
        else if (tokType !== _name)
            unexpected();
        else {
            node.label = parseIdent();
            semicolon();
        }
        // Verify that there is an actual destination to break or
        // continue to.
        for (var i = 0; i < labels.length; ++i) {
            var lab = labels[i];
            if (node.label == null || lab.name === node.label.name) {
                if (lab.kind != null && (isBreak || lab.kind === "loop"))
                    break;
                if (node.label && isBreak)
                    break;
            }
        }
        if (i === labels.length)
            raise(node.start, "Unsyntactic " + keyword);
        return finishNode(node, isBreak ? BreakStatement : ContinueStatement);
    }
    function parseDebuggerStatement(node) {
        next();
        semicolon();
        return finishNode(node, DebuggerStatement);
    }
    function parseDoStatement(node) {
        next();
        labels.push(loopLabel);
        node.body = parseStatement(false);
        labels.pop();
        expect(_while);
        node.test = parseParenExpression();
        if (options.ecmaVersion >= 6)
            eat(_semi);
        else
            semicolon();
        return finishNode(node, DoWhileStatement);
    }
    // Disambiguating between a `for` and a `for`/`in` or `for`/`of`
    // loop is non-trivial. Basically, we have to parse the init `var`
    // statement or expression, disallowing the `in` operator (see
    // the second parameter to `parseExpression`), and then check
    // whether the next token is `in` or `of`. When there is no init
    // part (semicolon immediately after the opening parenthesis), it
    // is a regular `for` loop.
    function parseForStatement(node) {
        next();
        labels.push(loopLabel);
        expect(_parenL);
        if (tokType === _semi)
            return parseFor(node, null);
        if (tokType === _var || tokType === _let) {
            var init = startNode(), varKind = tokType.keyword, isLet = tokType === _let;
            next();
            parseVar(init, true, varKind);
            finishNode(init, VariableDeclaration);
            if ((tokType === _in || (options.ecmaVersion >= 6 && isContextual("of"))) && init.declarations.length === 1 &&
                !(isLet && init.declarations[0].init))
                return parseForIn(node, init);
            return parseFor(node, init);
        }
        var refShorthandDefaultPos = {
            start: 0
        };
        var init = parseExpression(true, refShorthandDefaultPos);
        if (tokType === _in || (options.ecmaVersion >= 6 && isContextual("of"))) {
            toAssignable(init);
            checkLVal(init);
            return parseForIn(node, init);
        }
        else if (refShorthandDefaultPos.start) {
            unexpected(refShorthandDefaultPos.start);
        }
        return parseFor(node, init);
    }
    function parseFunctionStatement(node) {
        next();
        return parseFunction(node, true);
    }
    function parseIfStatement(node) {
        next();
        node.test = parseParenExpression();
        node.consequent = parseStatement(false);
        node.alternate = eat(_else) ? parseStatement(false) : null;
        return finishNode(node, IfStatement);
    }
    function parseReturnStatement(node) {
        if (!inFunction && !options.allowReturnOutsideFunction)
            raise(tokStart, "'return' outside of function");
        next();
        // In `return` (and `break`/`continue`), the keywords with
        // optional arguments, we eagerly look for a semicolon or the
        // possibility to insert one.
        if (eat(_semi) || canInsertSemicolon())
            node.argument = null;
        else {
            node.argument = parseExpression();
            semicolon();
        }
        return finishNode(node, ReturnStatement);
    }
    function parseSwitchStatement(node) {
        next();
        node.discriminant = parseParenExpression();
        node.cases = [];
        expect(_braceL);
        labels.push(switchLabel);
        // Statements under must be grouped (by label) in SwitchCase
        // nodes. `cur` is used to keep the node that we are currently
        // adding statements to.
        for (var cur, sawDefault; tokType != _braceR;) {
            if (tokType === _case || tokType === _default) {
                var isCase = tokType === _case;
                if (cur)
                    finishNode(cur, SwitchCase);
                node.cases.push(cur = startNode());
                cur.consequent = [];
                next();
                if (isCase)
                    cur.test = parseExpression();
                else {
                    if (sawDefault)
                        raise(lastStart, "Multiple default clauses");
                    sawDefault = true;
                    cur.test = null;
                }
                expect(_colon);
            }
            else {
                if (!cur)
                    unexpected();
                cur.consequent.push(parseStatement(true));
            }
        }
        if (cur)
            finishNode(cur, SwitchCase);
        next(); // Closing brace
        labels.pop();
        return finishNode(node, SwitchStatement);
    }
    function parseThrowStatement(node) {
        next();
        if (newline.test(input.slice(lastEnd, tokStart)))
            raise(lastEnd, "Illegal newline after throw");
        node.argument = parseExpression();
        semicolon();
        return finishNode(node, ThrowStatement);
    }
    function parseTryStatement(node) {
        next();
        node.block = parseBlock();
        node.handler = null;
        if (tokType === _catch) {
            var clause = startNode();
            next();
            expect(_parenL);
            clause.param = parseBindingAtom();
            checkLVal(clause.param, true);
            expect(_parenR);
            clause.guard = null;
            clause.body = parseBlock();
            node.handler = finishNode(clause, CatchClause);
        }
        node.guardedHandlers = empty;
        node.finalizer = eat(_finally) ? parseBlock() : null;
        if (!node.handler && !node.finalizer)
            raise(node.start, "Missing catch or finally clause");
        return finishNode(node, TryStatement);
    }
    function parseVarStatement(node, kind) {
        next();
        parseVar(node, false, kind);
        semicolon();
        return finishNode(node, VariableDeclaration);
    }
    function parseWhileStatement(node) {
        next();
        node.test = parseParenExpression();
        labels.push(loopLabel);
        node.body = parseStatement(false);
        labels.pop();
        return finishNode(node, WhileStatement);
    }
    function parseWithStatement() {
        raise(tokStart, "with now allow");
    }
    function parseEmptyStatement(node) {
        next();
        return finishNode(node, EmptyStatement);
    }
    function parseLabeledStatement(node, maybeName, expr) {
        for (var i = 0; i < labels.length; ++i)
            if (labels[i].name === maybeName)
                raise(expr.start, "Label '" + maybeName + "' is already declared");
        var kind = tokType.isLoop ? "loop" : tokType === _switch ? "switch" : null;
        labels.push({
            name: maybeName,
            kind: kind
        });
        node.body = parseStatement(true);
        labels.pop();
        node.label = expr;
        return finishNode(node, LabeledStatement);
    }
    function parseExpressionStatement(node, expr) {
        node.expression = expr;
        semicolon();
        return finishNode(node, ExpressionStatement);
    }
    // Used for constructs like `switch` and `if` that insist on
    // parentheses around their expression.
    function parseParenExpression() {
        expect(_parenL);
        var val = parseExpression();
        expect(_parenR);
        return val;
    }
    // Parse a semicolon-enclosed block of statements, handling `"use
    // strict"` declarations when `allowStrict` is true (used for
    // function bodies).
    function parseBlock(allowStrict) {
        var node = startNode(), first = true, oldStrict;
        node.body = [];
        expect(_braceL);
        while (!eat(_braceR)) {
            var stmt = parseStatement(true);
            node.body.push(stmt);
            if (first && allowStrict && isUseStrict(stmt)) {
                oldStrict = strict;
                setStrict(strict = true);
            }
            first = false;
        }
        if (oldStrict === false)
            setStrict(false);
        return finishNode(node, BlockStatement);
    }
    // Parse a regular `for` loop. The disambiguation code in
    // `parseStatement` will already have parsed the init statement or
    // expression.
    function parseFor(node, init) {
        node.init = init;
        expect(_semi);
        node.test = tokType === _semi ? null : parseExpression();
        expect(_semi);
        node.update = tokType === _parenR ? null : parseExpression();
        expect(_parenR);
        node.body = parseStatement(false);
        labels.pop();
        return finishNode(node, ForStatement);
    }
    // Parse a `for`/`in` and `for`/`of` loop, which are almost
    // same from parser's perspective.
    function parseForIn(node, init) {
        var type = tokType === _in ? ForInStatement : ForOfStatement;
        next();
        node.left = init;
        node.right = parseExpression();
        expect(_parenR);
        node.body = parseStatement(false);
        labels.pop();
        return finishNode(node, type);
    }
    // Parse a list of variable declarations.
    function parseVar(node, noIn, kind) {
        node.declarations = [];
        node.kind = kind;
        for (;;) {
            var decl = startNode();
            decl.id = parseBindingAtom();
            checkLVal(decl.id, true);
            decl.init = eat(_eq) ? parseMaybeAssign(noIn) : (kind === _const.keyword ? unexpected() : null);
            node.declarations.push(finishNode(decl, VariableDeclarator));
            if (!eat(_comma))
                break;
        }
        return node;
    }
    // ### Expression parsing
    // These nest, from the most general expression type at the top to
    // 'atomic', nondivisible expression types at the bottom. Most of
    // the functions will simply let the function(s) below them parse,
    // and, *if* the syntactic construct they handle is present, wrap
    // the AST node that the inner parser gave them in another node.
    // Parse a full expression. The optional arguments are used to
    // forbid the `in` operator (in for loops initalization expressions)
    // and provide reference for storing '=' operator inside shorthand
    // property assignment in contexts where both object expression
    // and object pattern might appear (so it's possible to raise
    // delayed syntax error at correct position).
    function parseExpression(noIn, refShorthandDefaultPos) {
        var start = storeCurrentPos();
        var expr = parseMaybeAssign(noIn, refShorthandDefaultPos);
        if (tokType === _comma) {
            var node = startNodeAt(start);
            node.expressions = [expr];
            while (eat(_comma))
                node.expressions.push(parseMaybeAssign(noIn, refShorthandDefaultPos));
            return finishNode(node, SequenceExpression);
        }
        return expr;
    }
    // Parse an assignment expression. This includes applications of
    // operators like `+=`.
    function parseMaybeAssign(noIn, refShorthandDefaultPos) {
        var failOnShorthandAssign;
        if (!refShorthandDefaultPos) {
            refShorthandDefaultPos = {
                start: 0
            };
            failOnShorthandAssign = true;
        }
        else {
            failOnShorthandAssign = false;
        }
        var start = storeCurrentPos();
        var left = parseMaybeConditional(noIn, refShorthandDefaultPos);
        if (tokType.isAssign) {
            var node = startNodeAt(start);
            node.operator = tokVal;
            node.left = tokType === _eq ? toAssignable(left) : left;
            refShorthandDefaultPos.start = 0; // reset because shorthand default was used correctly
            checkLVal(left);
            next();
            node.right = parseMaybeAssign(noIn);
            return finishNode(node, AssignmentExpression);
        }
        else if (failOnShorthandAssign && refShorthandDefaultPos.start) {
            unexpected(refShorthandDefaultPos.start);
        }
        return left;
    }
    // Parse a ternary conditional (`?:`) operator.
    function parseMaybeConditional(noIn, refShorthandDefaultPos) {
        var start = storeCurrentPos();
        var expr = parseExprOps(noIn, refShorthandDefaultPos);
        if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
        if (eat(_question)) {
            var node = startNodeAt(start);
            node.test = expr;
            node.consequent = parseMaybeAssign();
            expect(_colon);
            node.alternate = parseMaybeAssign(noIn);
            return finishNode(node, ConditionalExpression);
        }
        return expr;
    }
    // Start the precedence parser.
    function parseExprOps(noIn, refShorthandDefaultPos) {
        var start = storeCurrentPos();
        var expr = parseMaybeUnary(refShorthandDefaultPos);
        if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
        return parseExprOp(expr, start, -1, noIn);
    }
    // Parse binary operators with the operator precedence parsing
    // algorithm. `left` is the left-hand side of the operator.
    // `minPrec` provides context that allows the function to stop and
    // defer further parser to one of its callers when it encounters an
    // operator that has a lower precedence than the set it is parsing.
    function parseExprOp(left, leftStart, minPrec, noIn) {
        var prec = tokType.binop;
        if (prec != null && (!noIn || tokType !== _in)) {
            if (prec > minPrec) {
                var node = startNodeAt(leftStart);
                node.left = left;
                node.operator = tokVal;
                var op = tokType;
                next();
                var start = storeCurrentPos();
                node.right = parseExprOp(parseMaybeUnary(), start, prec, noIn);
                finishNode(node, (op === _logicalOR || op === _logicalAND) ? LogicalExpression : BinaryExpression);
                return parseExprOp(node, leftStart, minPrec, noIn);
            }
        }
        return left;
    }
    // Parse unary operators, both prefix and postfix.
    function parseMaybeUnary(refShorthandDefaultPos) {
        if (tokType.prefix) {
            var node = startNode(), update = tokType.isUpdate;
            node.operator = tokVal;
            node.prefix = true;
            next();
            node.argument = parseMaybeUnary();
            if (refShorthandDefaultPos && refShorthandDefaultPos.start)
                unexpected(refShorthandDefaultPos.start);
            if (update)
                checkLVal(node.argument);
            else if (strict && node.operator === "delete" &&
                node.argument.type === Identifier)
                raise(node.start, "Deleting local variable in strict mode");
            return finishNode(node, update ? UpdateExpression : UnaryExpression);
        }
        var start = storeCurrentPos();
        var expr = parseExprSubscripts(refShorthandDefaultPos);
        if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
        while (tokType.postfix && !canInsertSemicolon()) {
            var node = startNodeAt(start);
            node.operator = tokVal;
            node.prefix = false;
            node.argument = expr;
            checkLVal(expr);
            next();
            expr = finishNode(node, UpdateExpression);
        }
        return expr;
    }
    // Parse call, dot, and `[]`-subscript expressions.
    function parseExprSubscripts(refShorthandDefaultPos) {
        var start = storeCurrentPos();
        var expr = parseExprAtom(refShorthandDefaultPos);
        if (refShorthandDefaultPos && refShorthandDefaultPos.start)
            return expr;
        return parseSubscripts(expr, start);
    }
    function parseSubscripts(base, start, noCalls) {
        if (eat(_dot)) {
            var node = startNodeAt(start);
            node.object = base;
            node.property = parseIdent(true);
            node.computed = false;
            return parseSubscripts(finishNode(node, MemberExpression), start, noCalls);
        }
        else if (eat(_bracketL)) {
            var node = startNodeAt(start);
            node.object = base;
            node.property = parseExpression();
            node.computed = true;
            expect(_bracketR);
            return parseSubscripts(finishNode(node, MemberExpression), start, noCalls);
        }
        else if (!noCalls && eat(_parenL)) {
            var node = startNodeAt(start);
            node.callee = base;
            node.arguments = parseExprList(_parenR, false);
            return parseSubscripts(finishNode(node, CallExpression), start, noCalls);
        }
        else if (tokType === _backQuote) {
            var node = startNodeAt(start);
            node.tag = base;
            node.quasi = parseTemplate();
            return parseSubscripts(finishNode(node, TaggedTemplateExpression), start, noCalls);
        }
        return base;
    }
    // Parse an atomic expression — either a single token that is an
    // expression, an expression started by a keyword like `function` or
    // `new`, or an expression wrapped in punctuation like `()`, `[]`,
    // or `{}`.
    function parseExprAtom(refShorthandDefaultPos) {
        switch (tokType) {
            case _this:
                var node = startNode();
                next();
                return finishNode(node, ThisExpression);
            case _yield:
                if (inGenerator)
                    return parseYield();
            case _name:
                var start = storeCurrentPos();
                var id = parseIdent(tokType !== _name);
                if (!canInsertSemicolon() && eat(_arrow)) {
                    return parseArrowExpression(startNodeAt(start), [id]);
                }
                return id;
            case _regexp:
                var node = startNode();
                node.regex = {
                    pattern: tokVal.pattern,
                    flags: tokVal.flags
                };
                node.value = tokVal.value;
                node.raw = input.slice(tokStart, tokEnd);
                next();
                return finishNode(node, Literal);
            case _num:
            case _string:
                var node = startNode();
                node.value = tokVal;
                node.raw = input.slice(tokStart, tokEnd);
                next();
                return finishNode(node, Literal);
            case _null:
            case _true:
            case _false:
                var node = startNode();
                node.value = tokType.atomValue;
                node.raw = tokType.keyword;
                next();
                return finishNode(node, Literal);
            case _parenL:
                return parseParenAndDistinguishExpression();
            case _bracketL:
                var node = startNode();
                next();
                node.elements = parseExprList(_bracketR, true, true, refShorthandDefaultPos);
                return finishNode(node, ArrayExpression);
            case _braceL:
                return parseObj(false, refShorthandDefaultPos);
            case _function:
                var node = startNode();
                next();
                return parseFunction(node, false);
            case _class:
                return parseClass(startNode(), false);
            case _new:
                return parseNew();
            case _backQuote:
                return parseTemplate();
            case _import:
                return parseImportExpression();
            default:
                unexpected();
        }
    }
    function parseImportExpression() {
        var node = startNode();
        next();
        node.source = parseExprAtom();
        return finishNode(node, ImportExpression);
    }
    function parseParenAndDistinguishExpression() {
        var start = storeCurrentPos(), val;
        if (options.ecmaVersion >= 6) {
            next();
            var innerStart = storeCurrentPos(), exprList = [], first = true;
            var refShorthandDefaultPos = {
                start: 0
            }, spreadStart, innerParenStart;
            while (tokType !== _parenR) {
                first ? first = false : expect(_comma);
                if (tokType === _ellipsis) {
                    spreadStart = tokStart;
                    exprList.push(parseRest());
                    break;
                }
                else {
                    if (tokType === _parenL && !innerParenStart) {
                        innerParenStart = tokStart;
                    }
                    exprList.push(parseMaybeAssign(false, refShorthandDefaultPos));
                }
            }
            var innerEnd = storeCurrentPos();
            expect(_parenR);
            if (!canInsertSemicolon() && eat(_arrow)) {
                if (innerParenStart)
                    unexpected(innerParenStart);
                return parseArrowExpression(startNodeAt(start), exprList);
            }
            if (!exprList.length)
                unexpected(lastStart);
            if (spreadStart)
                unexpected(spreadStart);
            if (refShorthandDefaultPos.start)
                unexpected(refShorthandDefaultPos.start);
            if (exprList.length > 1) {
                val = startNodeAt(innerStart);
                val.expressions = exprList;
                finishNodeAt(val, SequenceExpression, innerEnd);
            }
            else {
                val = exprList[0];
            }
        }
        else {
            val = parseParenExpression();
        }
        if (options.preserveParens) {
            var par = startNodeAt(start);
            par.expression = val;
            return finishNode(par, ParenthesizedExpression);
        }
        else {
            return val;
        }
    }
    // New's precedence is slightly tricky. It must allow its argument
    // to be a `[]` or dot subscript expression, but not a call — at
    // least, not without wrapping it in parentheses. Thus, it uses the
    function parseNew() {
        var node = startNode();
        next();
        var start = storeCurrentPos();
        node.callee = parseSubscripts(parseExprAtom(), start, true);
        if (eat(_parenL))
            node.arguments = parseExprList(_parenR, false);
        else
            node.arguments = empty;
        return finishNode(node, NewExpression);
    }
    // Parse template expression.
    function parseTemplateElement() {
        var elem = startNode();
        elem.value = {
            raw: input.slice(tokStart, tokEnd),
            cooked: tokVal
        };
        next();
        elem.tail = tokType === _backQuote;
        return finishNode(elem, TemplateElement);
    }
    function parseTemplate() {
        var node = startNode();
        next();
        node.expressions = [];
        var curElt = parseTemplateElement();
        node.quasis = [curElt];
        while (!curElt.tail) {
            expect(_dollarBraceL);
            node.expressions.push(parseExpression());
            expect(_braceR);
            node.quasis.push(curElt = parseTemplateElement());
        }
        next();
        return finishNode(node, TemplateLiteral);
    }
    // Parse an object literal or binding pattern.
    function parseObj(isPattern, refShorthandDefaultPos) {
        var node = startNode(), first = true, propHash = {};
        node.properties = [];
        next();
        while (!eat(_braceR)) {
            if (!first) {
                expect(_comma);
                if (options.allowTrailingCommas && eat(_braceR))
                    break;
            }
            else
                first = false;
            var prop = startNode(), isGenerator, start;
            if (options.ecmaVersion >= 6) {
                prop.method = false;
                prop.shorthand = false;
                if (isPattern || refShorthandDefaultPos) {
                    start = storeCurrentPos();
                }
                if (!isPattern) {
                    isGenerator = eat(_star);
                }
            }
            parsePropertyName(prop);
            if (eat(_colon)) {
                prop.value = isPattern ? parseMaybeDefault() : parseMaybeAssign(false, refShorthandDefaultPos);
                prop.kind = "init";
            }
            else if (options.ecmaVersion >= 6 && tokType === _parenL) {
                if (isPattern)
                    unexpected();
                prop.kind = "init";
                prop.method = true;
                prop.value = parseMethod(isGenerator);
            }
            else if (options.ecmaVersion >= 5 && !prop.computed && prop.key.type === Identifier &&
                (prop.key.name === "get" || prop.key.name === "set") &&
                (tokType != _comma && tokType != _braceR)) {
                if (isGenerator || isPattern)
                    unexpected();
                prop.kind = prop.key.name;
                parsePropertyName(prop);
                prop.value = parseMethod(false);
            }
            else if (options.ecmaVersion >= 6 && !prop.computed && prop.key.type === Identifier) {
                prop.kind = "init";
                if (isPattern) {
                    prop.value = parseMaybeDefault(start, prop.key);
                }
                else if (tokType === _eq && refShorthandDefaultPos) {
                    if (!refShorthandDefaultPos.start)
                        refShorthandDefaultPos.start = tokStart;
                    prop.value = parseMaybeDefault(start, prop.key);
                }
                else {
                    prop.value = prop.key;
                }
                prop.shorthand = true;
            }
            else
                unexpected();
            checkPropClash(prop, propHash);
            node.properties.push(finishNode(prop, "Property"));
        }
        return finishNode(node, isPattern ? ObjectPattern : ObjectExpression);
    }
    function parsePropertyName(prop) {
        if (options.ecmaVersion >= 6) {
            if (eat(_bracketL)) {
                prop.computed = true;
                prop.key = parseExpression();
                expect(_bracketR);
                return;
            }
            else {
                prop.computed = false;
            }
        }
        prop.key = (tokType === _num || tokType === _string) ? parseExprAtom() : parseIdent(true);
    }
    // Initialize empty function node.
    function initFunction(node) {
        node.id = null;
        if (options.ecmaVersion >= 6) {
            node.generator = false;
            node.expression = false;
        }
    }
    // Parse a function declaration or literal (depending on the
    // `isStatement` parameter).
    function parseFunction(node, isStatement, allowExpressionBody) {
        initFunction(node);
        if (options.ecmaVersion >= 6) {
            node.generator = eat(_star);
        }
        if (isStatement || tokType === _name) {
            node.id = parseIdent();
        }
        expect(_parenL);
        node.params = parseBindingList(_parenR, false);
        parseFunctionBody(node, allowExpressionBody);
        return finishNode(node, isStatement ? FunctionDeclaration : FunctionExpression);
    }
    // Parse object or class method.
    function parseMethod(isGenerator) {
        var node = startNode();
        initFunction(node);
        expect(_parenL);
        node.params = parseBindingList(_parenR, false);
        var allowExpressionBody;
        if (options.ecmaVersion >= 6) {
            node.generator = isGenerator;
            allowExpressionBody = true;
        }
        else {
            allowExpressionBody = false;
        }
        parseFunctionBody(node, allowExpressionBody);
        return finishNode(node, FunctionExpression);
    }
    // Parse arrow function expression with given parameters.
    function parseArrowExpression(node, params) {
        initFunction(node);
        node.params = toAssignableList(params, true);
        parseFunctionBody(node, true);
        return finishNode(node, ArrowFunctionExpression);
    }
    // Parse function body and check parameters.
    function parseFunctionBody(node, allowExpression) {
        var isExpression = allowExpression && tokType !== _braceL;
        if (isExpression) {
            node.body = parseMaybeAssign();
            node.expression = true;
        }
        else {
            // Start a new scope with regard to labels and the `inFunction`
            // flag (restore them to their old value afterwards).
            var oldInFunc = inFunction, oldInGen = inGenerator, oldLabels = labels;
            inFunction = true;
            inGenerator = node.generator;
            labels = [];
            node.body = parseBlock(true);
            node.expression = false;
            inFunction = oldInFunc;
            inGenerator = oldInGen;
            labels = oldLabels;
        }
        // If this is a strict mode function, verify that argument names
        // are not repeated, and it does not try to bind the words `eval`
        // or `arguments`.
        if (strict || !isExpression && node.body.body.length && isUseStrict(node.body.body[0])) {
            var nameHash = {};
            if (node.id)
                checkFunctionParam(node.id, {});
            for (var i = 0; i < node.params.length; i++)
                checkFunctionParam(node.params[i], nameHash);
        }
    }
    // Parse a class declaration or literal (depending on the
    // `isStatement` parameter).
    function parseClass(node, isStatement) {
        next();
        node.id = tokType === _name ? parseIdent() : isStatement ? unexpected() : null;
        node.superClass = eat(_extends) ? parseExprSubscripts() : null;
        var classBody = startNode();
        classBody.body = [];
        expect(_braceL);
        while (!eat(_braceR)) {
            if (eat(_semi))
                continue;
            var method = startNode();
            var isGenerator = eat(_star);
            parsePropertyName(method);
            if (tokType !== _parenL && !method.computed && method.key.type === Identifier &&
                method.key.name === "static") {
                if (isGenerator)
                    unexpected();
                method['static'] = true;
                isGenerator = eat(_star);
                parsePropertyName(method);
            }
            else {
                method['static'] = false;
            }
            if (tokType !== _parenL && !method.computed && method.key.type === Identifier &&
                (method.key.name === "get" || method.key.name === "set")) {
                if (isGenerator)
                    unexpected();
                method.kind = method.key.name;
                parsePropertyName(method);
            }
            else {
                method.kind = "";
            }
            method.value = parseMethod(isGenerator);
            classBody.body.push(finishNode(method, MethodDefinition));
        }
        node.body = finishNode(classBody, ClassBody);
        return finishNode(node, isStatement ? ClassDeclaration : ClassExpression);
    }
    // Parses a comma-separated list of expressions, and returns them as
    // an array. `close` is the token type that ends the list, and
    // `allowEmpty` can be turned on to allow subsequent commas with
    // nothing in between them to be parsed as `null` (which is needed
    // for array literals).
    function parseExprList(close, allowTrailingComma, allowEmpty, refShorthandDefaultPos) {
        var elts = [], first = true;
        while (!eat(close)) {
            if (!first) {
                expect(_comma);
                if (allowTrailingComma && options.allowTrailingCommas && eat(close))
                    break;
            }
            else
                first = false;
            if (allowEmpty && tokType === _comma) {
                elts.push(null);
            }
            else {
                if (tokType === _ellipsis)
                    elts.push(parseSpread(refShorthandDefaultPos));
                else
                    elts.push(parseMaybeAssign(false, refShorthandDefaultPos));
            }
        }
        return elts;
    }
    // Parse the next token as an identifier. If `liberal` is true (used
    // when parsing properties), it will also convert keywords into
    // identifiers.
    function parseIdent(liberal) {
        var node = startNode();
        if (liberal && options.forbidReserved == "everywhere")
            liberal = false;
        if (tokType === _name) {
            if (!liberal &&
                (options.forbidReserved &&
                    (options.ecmaVersion === 3 ? isReservedWord3 : isReservedWord5)(tokVal) ||
                    strict && isStrictReservedWord(tokVal)) &&
                input.slice(tokStart, tokEnd).indexOf("\\") == -1)
                raise(tokStart, "The keyword '" + tokVal + "' is reserved");
            node.name = tokVal;
        }
        else if (liberal && tokType.keyword) {
            node.name = tokType.keyword;
        }
        else {
            unexpected();
        }
        next();
        return finishNode(node, Identifier);
    }
    // Parses module export declaration.
    function parseExport(node) {
        next();
        // export var|const|let|function|class ...;
        if (tokType === _var || tokType === _const || tokType === _let || tokType === _function || tokType === _class) {
            node.declaration = parseStatement(true);
            node['default'] = false;
            node.specifiers = null;
            node.source = null;
        }
        else 
        // export default ...;
        if (eat(_default)) {
            var expr = parseMaybeAssign();
            if (expr.id) {
                switch (expr.type) {
                    case FunctionExpression:
                        expr.type = FunctionDeclaration;
                        break;
                    case ClassExpression:
                        expr.type = ClassDeclaration;
                        break;
                }
            }
            node.declaration = expr;
            node['default'] = true;
            node.specifiers = null;
            node.source = null;
            semicolon();
        }
        else {
            // export * from '...';
            // export { x, y as z } [from '...'];
            var isBatch = tokType === _star;
            node.declaration = null;
            node['default'] = false;
            node.specifiers = parseExportSpecifiers();
            if (eatContextual("from")) {
                node.source = tokType === _string ? parseExprAtom() : unexpected();
            }
            else {
                if (isBatch)
                    unexpected();
                node.source = null;
            }
            semicolon();
        }
        return finishNode(node, ExportDeclaration);
    }
    // Parses a comma-separated list of module acorn.
    function parseExportSpecifiers() {
        var nodes = [], first = true;
        if (tokType === _star) {
            // export * from '...'
            var node = startNode();
            next();
            nodes.push(finishNode(node, ExportBatchSpecifier));
        }
        else {
            // export { x, y as z } [from '...']
            expect(_braceL);
            while (!eat(_braceR)) {
                if (!first) {
                    expect(_comma);
                    if (options.allowTrailingCommas && eat(_braceR))
                        break;
                }
                else
                    first = false;
                var node = startNode();
                node.id = parseIdent(tokType === _default);
                node.name = eatContextual("as") ? parseIdent(true) : null;
                nodes.push(finishNode(node, ExportSpecifier));
            }
        }
        return nodes;
    }
    // Parses import declaration.
    function parseImport(node) {
        next();
        // import '...';
        if (tokType === _string) {
            node.specifiers = [];
            node.source = parseExprAtom();
            node.kind = "";
        }
        else {
            node.specifiers = parseImportSpecifiers();
            expectContextual("from");
            node.source = tokType === _string ? parseExprAtom() : unexpected();
        }
        semicolon();
        return finishNode(node, ImportDeclaration);
    }
    // Parses a comma-separated list of module imports.
    function parseImportSpecifiers() {
        var nodes = [], first = true;
        if (tokType === _name) {
            // import defaultObj, { x, y as z } from '...'
            var node = startNode();
            node.id = parseIdent();
            checkLVal(node.id, true);
            node.name = null;
            node['default'] = true;
            nodes.push(finishNode(node, ImportSpecifier));
            if (!eat(_comma))
                return nodes;
        }
        if (tokType === _star) {
            var node = startNode();
            next();
            expectContextual("as");
            node.name = parseIdent();
            checkLVal(node.name, true);
            nodes.push(finishNode(node, ImportBatchSpecifier));
            return nodes;
        }
        expect(_braceL);
        while (!eat(_braceR)) {
            if (!first) {
                expect(_comma);
                if (options.allowTrailingCommas && eat(_braceR))
                    break;
            }
            else
                first = false;
            var node = startNode();
            node.id = parseIdent(true);
            node.name = eatContextual("as") ? parseIdent() : null;
            checkLVal(node.name || node.id, true);
            node['default'] = false;
            nodes.push(finishNode(node, ImportSpecifier));
        }
        return nodes;
    }
    // Parses yield expression inside generator.
    function parseYield() {
        var node = startNode();
        next();
        if (eat(_semi) || canInsertSemicolon()) {
            node.delegate = false;
            node.argument = null;
        }
        else {
            node.delegate = eat(_star);
            node.argument = parseMaybeAssign();
        }
        return finishNode(node, YieldExpression);
    }
    return acorn;
}
getNewAcorn();

// 导出默认对象
var default_api = {
    console: console,
    setTimeout: setTimeout,
    setInterval: setInterval,
    clearTimeout: clearTimeout,
    clearInterval: clearInterval,
    encodeURI: encodeURI,
    encodeURIComponent: encodeURIComponent,
    decodeURI: decodeURI,
    decodeURIComponent: decodeURIComponent,
    Infinity: Infinity,
    NaN: NaN,
    isFinite: isFinite,
    isNaN: isNaN,
    parseFloat: parseFloat,
    parseInt: parseInt,
    Object: Object,
    Boolean: Boolean,
    Error: Error,
    EvalError: EvalError,
    RangeError: RangeError,
    ReferenceError: ReferenceError,
    SyntaxError: SyntaxError,
    TypeError: TypeError,
    URIError: URIError,
    Number: Number,
    Math: Math,
    Date: Date,
    String: String,
    RegExp: RegExp,
    Array: Array,
    JSON: JSON,
    Promise: Promise,
};
if (typeof Symbol !== 'undefined') {
    default_api['Symbol'] = Symbol;
}
var Runner = /** @class */ (function () {
    function Runner() {
        this.source = '';
        this.traceId = 0;
        this.traceStack = [];
        this.currentNode = null;
        this.ast = null;
        this.mainScope = new Scope("program" /* ScopeType.Program */);
    }
    /** 错误收集中心 */
    Runner.prototype.onError = function (err) {
        // console.error(err);
    };
    Runner.prototype.run = function (code, injectObject, onError) {
        if (injectObject === void 0) { injectObject = {}; }
        this.source = code;
        this.onError = onError || this.onError;
        this.initScope(injectObject);
        this.parserAst(code);
        try {
            evaluate(this.ast, this.mainScope);
        }
        catch (err) {
            throw err;
        }
        return this.mainScope.$find('exports').value;
    };
    Runner.prototype.initScope = function (injectObject) {
        var _this = this;
        var exports = {};
        this.mainScope = new Scope("program" /* ScopeType.Program */);
        this.mainScope.$var('exports', exports);
        this.mainScope.$const(THIS, this);
        Object.keys(default_api).forEach(function (name) {
            _this.mainScope.$var(name, default_api[name]);
        });
        Object.keys(injectObject).forEach(function (name) {
            _this.mainScope.$var(name, injectObject[name]);
        });
        this.mainScope.runner = this;
    };
    Runner.prototype.parserAst = function (code) {
        this.ast = getNewAcorn().parse(code, { locations: true, ecmaVersion: 6 });
        return this.ast;
    };
    return Runner;
}());

var run = function (code, injectObject, onError) {
    var runner = new Runner();
    return runner.run(code, injectObject, onError);
};

/**
 * getOsInfo().name 映射未 platform
 */
var OSNameToPlatformMap = {
    Windows: 'Windows',
    iPhone: 'iOS',
    Mac: 'Mac',
    Android: 'Android',
    Unix: '',
    Linux: '',
    Unknown: '',
};
/**
 * 根据 getOsInfo 获取当前系统平台
 * @return {'Android'|'iOS'|'Windows'|'Mac'|''}
 */
var getOSPlatform = function () {
    var name = getOsInfo().name;
    return OSNameToPlatformMap[name];
};
var getOSModel = function () {
    switch (getOSPlatform()) {
        case 'iOS':
        case 'Android':
            return 'MB';
        default: // Unix, Linux, Unknown,Windows,Mac
            return 'PC';
    }
};
var getOsInfo = function () {
    var userAgent = navigator.userAgent.toLowerCase();
    var name = 'Unknown';
    var version = 'Unknown';
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
    return { name: name, version: version };
};
/**
 * @description 获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:25
 * @returns {*}
 */
var getSystemInfoSync = function () {
    return {
        app: 'NARUSE',
        brand: 'PC',
        currentBattery: '100%',
        fontSizeSetting: 16,
        language: 'Chinese',
        model: getOSModel(),
        pixelRatio: 1.5,
        platform: getOSPlatform(),
        screenHeight: window.screen.height,
        screenWidth: window.screen.width,
        statusBarHeight: 0,
        storage: null,
        system: getOsInfo().name,
        taojimuEnv: undefined,
        titleBarHeight: 0,
        version: '0.0.1',
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    };
};
/**
 * @description 异步获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:00
 * @param {*} [{ success, fail, complete }={}]
 * @returns {*}
 */
var getSystemInfo = function (_a) {
    var _b = _a === void 0 ? {} : _a, success = _b.success, fail = _b.fail, complete = _b.complete;
    var handle = new MethodHandler({ name: 'getStorageInfo', success: success, fail: fail, complete: complete });
    return handle.success(getSystemInfoSync());
};

var system = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getSystemInfoSync: getSystemInfoSync,
    getSystemInfo: getSystemInfo
});

/** 获取缓存 */
var getItem = function getItem(key) {
    var item;
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
var setStorageSync = function (key, data) {
    if (data === void 0) { data = ''; }
    if (exceptTypeSync(key, 'string', 'removeStorageSync'))
        return;
    var type = typeof data;
    var obj = {};
    if (type === 'symbol') {
        obj = { data: '' };
    }
    else {
        obj = { data: data };
    }
    localStorage.setItem(key, JSON.stringify(obj));
};
/** 异步设置缓存 */
var setStorage = function (options) {
    var err;
    if (err = exceptType(options, 'object', 'setStorage'))
        return err;
    var key = options.key, data = options.data, success = options.success, fail = options.fail, complete = options.complete;
    var handle = new MethodHandler({ name: 'setStorage', success: success, fail: fail, complete: complete });
    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'setStorage:fail key must be string' });
    }
    setStorageSync(key, data);
    return handle.success();
};
/** 同步删除缓存 */
var removeStorageSync = function (key) {
    if (exceptTypeSync(key, 'string', 'removeStorageSync'))
        return;
    localStorage.removeItem(key);
};
/** 异步删除缓存 */
var removeStorage = function (options) {
    var err;
    if (err = exceptType(options, 'object', 'removeStorage'))
        return err;
    var key = options.key, success = options.success, fail = options.fail, complete = options.complete;
    var handle = new MethodHandler({ name: 'removeStorage', success: success, fail: fail, complete: complete });
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
var getStorageSync = function (key) {
    if (exceptTypeSync(key, 'string', 'getStorageSync'))
        return;
    var res = getItem(key);
    if (res.result)
        return res.data;
    return '';
};
/** 异步获取缓存  */
var getStorageInfoSync = function () {
    var res = {
        keys: Object.keys(localStorage),
        limitSize: NaN,
        currentSize: NaN,
    };
    return res;
};
/** 获取缓存信息  */
var getStorageInfo = function (_a) {
    var _b = _a === void 0 ? {} : _a, success = _b.success, fail = _b.fail, complete = _b.complete;
    var handle = new MethodHandler({ name: 'getStorageInfo', success: success, fail: fail, complete: complete });
    return handle.success(getStorageInfoSync());
};
/** 同步获取缓存 */
var getStorage = function (options) {
    var err;
    if (err = exceptType(options, 'object', 'getStorage'))
        return err;
    var key = options.key, success = options.success, fail = options.fail, complete = options.complete;
    var handle = new MethodHandler({ name: 'getStorage', success: success, fail: fail, complete: complete });
    if (typeof key !== 'string') {
        return handle.fail({ errMsg: 'getStorage:fail key must be string' });
    }
    return handle.success({ data: getStorageSync(key) });
};
/** 同步清除缓存 */
var clearStorageSync = function () {
    localStorage.clear();
};
/** 异步清除缓存 */
var clearStorage = function (_a) {
    var _b = _a === void 0 ? {} : _a, success = _b.success, fail = _b.fail, complete = _b.complete;
    var handle = new MethodHandler({ name: 'clearStorage', success: success, fail: fail, complete: complete });
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
var navigateTo = function (options) {
    var err;
    if (err = exceptType(options, 'object', 'navigateTo'))
        return err;
    var url = options.url, success = options.success, fail = options.fail;
    var handle = new MethodHandler({ name: 'navigateTo', success: success, fail: fail });
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
var navigateToWebPage = function (options) {
    var err;
    if (err = exceptType(options, 'object', 'navigateToWebPage'))
        return err;
    var url = options.url, success = options.success, fail = options.fail;
    var handle = new MethodHandler({ name: 'navigateToWebPage', success: success, fail: fail });
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
var navigateBack = function (options) {
    if (options === void 0) { options = {}; }
    var err;
    if (err = exceptType(options, 'object', 'navigateBack'))
        return err;
    var _a = options.delta, delta = _a === void 0 ? 1 : _a, success = options.success, fail = options.fail;
    var handle = new MethodHandler({ name: 'navigateBack', success: success, fail: fail });
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
var CLIPBOARD_STORAGE_NAME = 'naruse_clipboard';
document.addEventListener('copy', function () {
    var _a;
    setStorage({
        key: CLIPBOARD_STORAGE_NAME,
        data: (_a = window.getSelection()) === null || _a === void 0 ? void 0 : _a.toString(),
    }).catch(function (e) {
        console.error(e);
    });
});
/**
  * 设置系统剪贴板的内容
  */
var setClipboardData = function (_a) {
    var data = _a.data, success = _a.success, fail = _a.fail, complete = _a.complete;
    var handle = new MethodHandler({ name: 'setClipboardData', success: success, fail: fail, complete: complete });
    try {
        setStorageSync(CLIPBOARD_STORAGE_NAME, data);
        /**
      * 已于 iPhone 6s Plus iOS 13.1.3 上的 Safari 测试通过
      * iOS < 10 的系统可能无法使用编程方式访问剪贴板，参考：
      * https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084
      */
        if (typeof document.execCommand === 'function') {
            var textarea = document.createElement('textarea');
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
var getClipboardData = function (_a) {
    var _b = _a === void 0 ? {} : _a, success = _b.success, fail = _b.fail, complete = _b.complete;
    var handle = new MethodHandler({ name: 'getClipboardData', success: success, fail: fail, complete: complete });
    try {
        var data = getStorageSync(CLIPBOARD_STORAGE_NAME);
        return handle.success({ data: data });
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

var device = __assign({}, device$1);

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
function getParameterError(_a) {
    var _b = _a.name, name = _b === void 0 ? '' : _b, para = _a.para, correct = _a.correct, wrong = _a.wrong;
    var parameter = para ? "parameter.".concat(para) : 'parameter';
    var errorType = upperCaseFirstLetter(wrong === null ? 'Null' : typeof wrong);
    if (name) {
        return "".concat(name, ":fail parameter error: ").concat(parameter, " should be ").concat(correct, " instead of ").concat(errorType);
    }
    else {
        return "parameter error: ".concat(parameter, " should be ").concat(correct, " instead of ").concat(errorType);
    }
}
function upperCaseFirstLetter(string) {
    if (typeof string !== 'string')
        return string;
    string = string.replace(/^./, function (match) { return match.toUpperCase(); });
    return string;
}
function findDOM(inst) {
    return document;
}
function inlineStyle(style) {
    var res = '';
    for (var attr in style)
        res += "".concat(attr, ": ").concat(style[attr], ";");
    if (res.indexOf('display: flex;') >= 0)
        res += 'display: -webkit-box;display: -webkit-flex;';
    res = res.replace(/transform:(.+?);/g, function (s, $1) { return "".concat(s, "-webkit-transform:").concat($1, ";"); });
    res = res.replace(/flex-direction:(.+?);/g, function (s, $1) { return "".concat(s, "-webkit-flex-direction:").concat($1, ";"); });
    return res;
}

/**
 * 获取图片信息。网络图片需先配置download域名才能生效。
 */
var getImageInfo = function (options) {
    // options must be an Object
    var isObject = shouldBeObject(options);
    if (!isObject.flag) {
        var res = { errMsg: "getImageInfo:fail ".concat(isObject.msg) };
        console.error(res.errMsg);
        return Promise.reject(res);
    }
    var getBase64Image = function (image) {
        try {
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            var ctx = canvas.getContext('2d');
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, 0, 0, image.width, image.height);
            return canvas.toDataURL('image/png');
        }
        catch (e) {
            console.error('getImageInfo:get base64 fail', e);
        }
    };
    var src = options.src, success = options.success, fail = options.fail, complete = options.complete;
    var handle = new MethodHandler({ name: 'getImageInfo', success: success, fail: fail, complete: complete });
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.crossOrigin = '';
        image.onload = function () {
            handle.success({
                width: image.naturalWidth,
                height: image.naturalHeight,
                path: getBase64Image(image) || src
            }, resolve);
        };
        image.onerror = function (e) {
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
var previewImage = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    function loadImage(url, loadFail) {
        return new Promise(function (resolve) {
            var item = document.createElement('taro-swiper-item-core');
            item.style.cssText = 'display:flex;align-items:start;justify-content:center;overflow-y:scroll;';
            var image = new Image();
            image.style.maxWidth = '100%';
            image.src = url;
            var div = document.createElement('div');
            div.style.cssText = 'display:flex;align-items:center;justify-content:center;max-width:100%;min-height:100%;';
            div.appendChild(image);
            item.appendChild(div);
            // Note: 等待图片加载完后返回，会导致轮播被卡住
            resolve(item);
            if (typeof loadFail === 'function') {
                image.addEventListener('error', function (err) {
                    loadFail({ errMsg: err.message });
                });
            }
        });
    }
    var isObject, res, _a, urls, _b, current, success, fail, complete, handle, container, swiper, children, error_1, i, child, currentIndex;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                isObject = shouldBeObject(options);
                if (!isObject.flag) {
                    res = { errMsg: "previewImage:fail ".concat(isObject.msg) };
                    console.error(res.errMsg);
                    return [2 /*return*/, Promise.reject(res)];
                }
                _a = options.urls, urls = _a === void 0 ? [] : _a, _b = options.current, current = _b === void 0 ? '' : _b, success = options.success, fail = options.fail, complete = options.complete;
                handle = new MethodHandler({ name: 'previewImage', success: success, fail: fail, complete: complete });
                container = document.createElement('div');
                container.classList.add('preview-image');
                container.style.cssText = 'position:fixed;top:0;left:0;z-index:1050;width:100%;height:100%;overflow:hidden;outline:0;background-color:#111;';
                container.addEventListener('click', function () {
                    container.remove();
                });
                swiper = document.createElement('taro-swiper-core');
                // @ts-ignore
                swiper.full = true;
                children = [];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(urls.map(function (e) { return loadImage(e, fail); }))];
            case 2:
                children = _c.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                return [2 /*return*/, handle.fail({
                        errMsg: error_1
                    })];
            case 4:
                for (i = 0; i < children.length; i++) {
                    child = children[i];
                    swiper.appendChild(child);
                }
                currentIndex = urls.indexOf(current);
                // @ts-ignore
                swiper.current = currentIndex;
                container.appendChild(swiper);
                document.body.appendChild(container);
                return [2 /*return*/, handle.success()];
        }
    });
}); };

var media = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getImageInfo: getImageInfo,
    previewImage: previewImage
});

var NodesRef = /** @class */ (function () {
    function NodesRef(selector, querySelectorQuery, single) {
        this._component = querySelectorQuery._component;
        this._selector = selector;
        this._selectorQuery = querySelectorQuery;
        this._single = single;
    }
    NodesRef.prototype.context = function (cb) {
        var _a = this, _selector = _a._selector, _component = _a._component, _single = _a._single, _selectorQuery = _a._selectorQuery;
        _selectorQuery._push(_selector, _component, _single, { context: !0 }, cb);
        return _selectorQuery;
    };
    NodesRef.prototype.node = function (cb) {
        var _a = this, _selector = _a._selector, _component = _a._component, _single = _a._single, _selectorQuery = _a._selectorQuery;
        _selectorQuery._push(_selector, _component, _single, { nodeCanvasType: !0, node: !0 }, cb);
        return _selectorQuery;
    };
    NodesRef.prototype.boundingClientRect = function (cb) {
        var _a = this, _selector = _a._selector, _component = _a._component, _single = _a._single, _selectorQuery = _a._selectorQuery;
        _selectorQuery._push(_selector, _component, _single, { id: !0, dataset: !0, rect: !0, size: !0 }, cb);
        return _selectorQuery;
    };
    NodesRef.prototype.scrollOffset = function (cb) {
        var _a = this, _selector = _a._selector, _component = _a._component, _single = _a._single, _selectorQuery = _a._selectorQuery;
        _selectorQuery._push(_selector, _component, _single, { id: !0, dataset: !0, scrollOffset: !0 }, cb);
        return _selectorQuery;
    };
    NodesRef.prototype.fields = function (fields, cb) {
        var _a = this, _selector = _a._selector, _component = _a._component, _single = _a._single, _selectorQuery = _a._selectorQuery;
        var id = fields.id, dataset = fields.dataset, rect = fields.rect, size = fields.size, scrollOffset = fields.scrollOffset, _b = fields.properties, properties = _b === void 0 ? [] : _b, _c = fields.computedStyle, computedStyle = _c === void 0 ? [] : _c;
        _selectorQuery._push(_selector, _component, _single, {
            id: id,
            dataset: dataset,
            rect: rect,
            size: size,
            scrollOffset: scrollOffset,
            properties: properties,
            computedStyle: computedStyle
        }, cb);
        return _selectorQuery;
    };
    return NodesRef;
}());

function filter(fields, dom, selector) {
    if (!dom)
        return null;
    var isViewport = selector === '.taro_page';
    var id = fields.id, dataset = fields.dataset, rect = fields.rect, size = fields.size, scrollOffset = fields.scrollOffset, _a = fields.properties, properties = _a === void 0 ? [] : _a, _b = fields.computedStyle, computedStyle = _b === void 0 ? [] : _b, nodeCanvasType = fields.nodeCanvasType, node = fields.node; fields.context;
    var res = {};
    if (nodeCanvasType && node) {
        var tagName = dom.tagName;
        res.node = {
            id: dom.id,
            $taroElement: dom
        };
        if (/^taro-canvas-core/i.test(tagName)) {
            var type = dom.type || '';
            res.nodeCanvasType = type;
            var canvas = dom.getElementsByTagName('canvas')[0];
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
        var _c = dom.getBoundingClientRect(), left = _c.left, right = _c.right, top_1 = _c.top, bottom = _c.bottom, width = _c.width, height = _c.height;
        if (rect) {
            if (!isViewport) {
                res.left = left;
                res.right = right;
                res.top = top_1;
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
        properties.forEach(function (prop) {
            var attr = dom.getAttribute(prop);
            if (attr)
                res[prop] = attr;
        });
    }
    if (computedStyle.length) {
        var styles_1 = window.getComputedStyle(dom);
        computedStyle.forEach(function (key) {
            var value = styles_1.getPropertyValue(key) || styles_1[key];
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
    var result = [];
    queue.forEach(function (item) {
        var _a;
        var selector = item.selector, single = item.single, fields = item.fields, component = item.component;
        // selector 的容器节点
        /* eslint-disable */
        var container = (component !== null ?
            (findDOM() || document) :
            document);
        /* eslint-enable */
        // 特殊处理 ---- 选自己
        var selectSelf = false;
        if (container !== document) {
            var $nodeList = (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector);
            if ($nodeList) {
                for (var i = 0, len = $nodeList.length; i < len; ++i) {
                    if (container === $nodeList[i]) {
                        selectSelf = true;
                        break;
                    }
                }
            }
        }
        if (single) {
            var el = selectSelf === true ? container : container.querySelector(selector);
            result.push(filter(fields, el, selector));
        }
        else {
            var $children = container.querySelectorAll(selector);
            var children = [];
            selectSelf === true && children.push(container);
            for (var i = 0, len = $children.length; i < len; ++i) {
                children.push($children[i]);
            }
            result.push(children.map(function (dom) { return filter(fields, dom); }));
        }
    });
    cb(result);
}
var SelectorQuery = /** @class */ (function () {
    function SelectorQuery() {
        this._defaultWebviewId = null;
        this._webviewId = null;
        this._queue = [];
        this._queueCb = [];
        this._component;
    }
    SelectorQuery.prototype.in = function (component) {
        this._component = component;
        return this;
    };
    SelectorQuery.prototype.select = function (selector) {
        // 小程序里跨自定义组件的后代选择器 '>>>' 在 h5 替换为普通后代选择器 '>'
        if (typeof selector === 'string')
            selector = selector.replace('>>>', '>');
        return new NodesRef(selector, this, true);
    };
    SelectorQuery.prototype.selectAll = function (selector) {
        // 小程序里跨自定义组件的后代选择器 '>>>' 在 h5 替换为普通后代选择器 '>'
        if (typeof selector === 'string')
            selector = selector.replace('>>>', '>');
        return new NodesRef(selector, this, false);
    };
    SelectorQuery.prototype.selectViewport = function () {
        return new NodesRef('.taro_page', this, true);
    };
    SelectorQuery.prototype.exec = function (cb) {
        var _this = this;
        queryBat(this._queue, function (res) {
            var _queueCb = _this._queueCb;
            res.forEach(function (item, index) {
                var cb = _queueCb[index];
                typeof cb === 'function' && cb.call(_this, item);
            });
            typeof cb === 'function' && cb.call(_this, res);
        });
        return this;
    };
    SelectorQuery.prototype._push = function (selector, component, single, fields, callback) {
        if (callback === void 0) { callback = null; }
        this._queue.push({
            component: component,
            selector: selector,
            single: single,
            fields: fields
        });
        this._queueCb.push(callback);
    };
    return SelectorQuery;
}());

var createSelectorQuery = function () {
    return new SelectorQuery();
};
var createIntersectionObserver = temporarilyNotSupport('createIntersectionObserver');

var wxml = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createSelectorQuery: createSelectorQuery,
    createIntersectionObserver: createIntersectionObserver
});

// copy from taro animation  https://github.com/NervJS/taro/blob/next/packages/taro-h5/src/api/ui/animation/index.ts
/**
 * H5 下的 styleSheet 操作
 * @author leeenx
 */
var StyleSheet = /** @class */ (function () {
    function StyleSheet() {
        var _this = this;
        this.$style = null;
        this.sheet = null;
        this.appendStyleSheet = function () {
            if (_this.$style) {
                var head = document.getElementsByTagName('head')[0];
                _this.$style.setAttribute('type', 'text/css');
                _this.$style.setAttribute('data-type', 'Taro');
                head.appendChild(_this.$style);
                _this.sheet = _this.$style.sheet;
            }
            if (_this.sheet && !('insertRule' in _this.sheet)) {
                console.warn('当前浏览器不支持 stylesheet.insertRule 接口');
            }
        };
        // 添加样式命令
        this.add = function (cssText, index) {
            var _a;
            if (index === void 0) { index = 0; }
            if (_this.sheet === null) {
                // $style 未插入到 DOM
                _this.appendStyleSheet();
            }
            (_a = _this.sheet) === null || _a === void 0 ? void 0 : _a.insertRule(cssText, index);
        };
        this.$style = document.createElement('style');
    }
    return StyleSheet;
}());
var styleSheet = new StyleSheet();
// 监听事件
var TRANSITION_END = 'transitionend';
var TRANSFORM = 'transform';
var $detect = document.createElement('div');
$detect.style.cssText = '-webkit-animation-name:webkit;-moz-animation-name:moz;-ms-animation-name:ms;animation-name:standard;';
if ($detect.style['animation-name'] === 'standard') {
    // 支持标准写法
    TRANSITION_END = 'transitionend';
    TRANSFORM = 'transform';
}
else if ($detect.style['-webkit-animation-name'] === 'webkit') {
    // webkit 前缀
    TRANSITION_END = 'webkitTransitionEnd';
    TRANSFORM = '-webkit-transform';
}
else if ($detect.style['-moz-animation-name'] === 'moz') {
    // moz 前缀
    TRANSITION_END = 'mozTransitionEnd';
    TRANSFORM = '-moz-transform';
}
else if ($detect.style['-ms-animation-name'] === 'ms') {
    // ms 前缀
    TRANSITION_END = 'msTransitionEnd';
    TRANSFORM = '-ms-transform';
}
var animId = 0;
var Animation = /** @class */ (function () {
    function Animation(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.duration, duration = _c === void 0 ? 400 : _c, _d = _b.delay, delay = _d === void 0 ? 0 : _d, _e = _b.timingFunction, timingFunction = _e === void 0 ? 'linear' : _e, _f = _b.transformOrigin, transformOrigin = _f === void 0 ? '50% 50% 0' : _f, _g = _b.unit, unit = _g === void 0 ? 'px' : _g;
        var _this = this;
        // 属性组合
        this.rules = [];
        // transform 对象
        this.transform = ["".concat(TRANSFORM, ":")];
        // 组合动画
        this.steps = [];
        // 动画 map ----- 永久保留
        this.animationMap = {};
        // animationMap 的长度
        this.animationMapCount = 0;
        // 默认值
        this.setDefault(duration, delay, timingFunction, transformOrigin);
        this.unit = unit;
        var animAttr = 'data-animation';
        // 动画 id
        this.id = ++animId;
        // 监听事件
        document.body.addEventListener(TRANSITION_END, function (e) {
            var target = e.target;
            var animData = target.getAttribute(animAttr);
            // 没有动画存在
            if (animData === null)
                return;
            var _a = animData.split('__'), animName = _a[0], animPath = _a[1];
            if (animName === "naruse-h5-poly-fill/".concat(_this.id, "/create-animation")) {
                var _b = animPath.split('--'), animIndex = _b[0], _c = _b[1], __stepIndex = _c === void 0 ? 0 : _c;
                var stepIndex = Number(__stepIndex);
                // 动画总的关键帧
                var animStepsCount = _this.animationMap["".concat(animName, "__").concat(animIndex)];
                var animStepsMaxIndex = animStepsCount - 1;
                if (stepIndex < animStepsMaxIndex) {
                    target.setAttribute(animAttr, "".concat(animName, "__").concat(animIndex, "--").concat(stepIndex + 1));
                }
            }
        });
    }
    Animation.prototype.transformUnit = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var ret = [];
        args.forEach(function (each) {
            ret.push(isNaN(each) ? each : "".concat(each).concat(_this.unit));
        });
        return ret;
    };
    // 设置默认值
    Animation.prototype.setDefault = function (duration, delay, timingFunction, transformOrigin) {
        this.DEFAULT = { duration: duration, delay: delay, timingFunction: timingFunction, transformOrigin: transformOrigin };
    };
    Animation.prototype.matrix = function (a, b, c, d, tx, ty) {
        this.transform.push("matrix(".concat(a, ", ").concat(b, ", ").concat(c, ", ").concat(d, ", ").concat(tx, ", ").concat(ty, ")"));
        return this;
    };
    Animation.prototype.matrix3d = function (a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4) {
        this.transform.push("matrix3d(".concat(a1, ", ").concat(b1, ", ").concat(c1, ", ").concat(d1, ", ").concat(a2, ", ").concat(b2, ", ").concat(c2, ", ").concat(d2, ", ").concat(a3, ", ").concat(b3, ", ").concat(c3, ", ").concat(d3, ", ").concat(a4, ", ").concat(b4, ", ").concat(c4, ", ").concat(d4, ")"));
        return this;
    };
    Animation.prototype.rotate = function (angle) {
        this.transform.push("rotate(".concat(angle, "deg)"));
        return this;
    };
    Animation.prototype.rotate3d = function (x, y, z, angle) {
        if (typeof y !== 'number') {
            this.transform.push("rotate3d(".concat(x, ")"));
        }
        else {
            this.transform.push("rotate3d(".concat(x, ", ").concat(y || 0, ", ").concat(z || 0, ", ").concat(angle || 0, "deg)"));
        }
        return this;
    };
    Animation.prototype.rotateX = function (angle) {
        this.transform.push("rotateX(".concat(angle, "deg)"));
        return this;
    };
    Animation.prototype.rotateY = function (angle) {
        this.transform.push("rotateY(".concat(angle, "deg)"));
        return this;
    };
    Animation.prototype.rotateZ = function (angle) {
        this.transform.push("rotateZ(".concat(angle, "deg)"));
        return this;
    };
    Animation.prototype.scale = function (x, y) {
        this.transform.push("scale(".concat([x, y].filter(Boolean).join(','), ")"));
        return this;
    };
    Animation.prototype.scale3d = function (x, y, z) {
        this.transform.push("scale3d(".concat(x, ", ").concat(y, ", ").concat(z, ")"));
        return this;
    };
    Animation.prototype.scaleX = function (scale) {
        this.transform.push("scaleX(".concat(scale, ")"));
        return this;
    };
    Animation.prototype.scaleY = function (scale) {
        this.transform.push("scaleY(".concat(scale, ")"));
        return this;
    };
    Animation.prototype.scaleZ = function (scale) {
        this.transform.push("scaleZ(".concat(scale, ")"));
        return this;
    };
    Animation.prototype.skew = function (x, y) {
        this.transform.push("skew(".concat(x, ", ").concat(y, ")"));
        return this;
    };
    Animation.prototype.skewX = function (angle) {
        this.transform.push("skewX(".concat(angle, ")"));
        return this;
    };
    Animation.prototype.skewY = function (angle) {
        this.transform.push("skewY(".concat(angle, ")"));
        return this;
    };
    Animation.prototype.translate = function (x, y) {
        var _a;
        _a = this.transformUnit(x, y), x = _a[0], y = _a[1];
        this.transform.push("translate(".concat(x, ", ").concat(y, ")"));
        return this;
    };
    Animation.prototype.translate3d = function (x, y, z) {
        var _a;
        _a = this.transformUnit(x, y, z), x = _a[0], y = _a[1], z = _a[2];
        this.transform.push("translate3d(".concat(x, ", ").concat(y, ", ").concat(z, ")"));
        return this;
    };
    Animation.prototype.translateX = function (translate) {
        translate = this.transformUnit(translate)[0];
        this.transform.push("translateX(".concat(translate, ")"));
        return this;
    };
    Animation.prototype.translateY = function (translate) {
        translate = this.transformUnit(translate)[0];
        this.transform.push("translateY(".concat(translate, ")"));
        return this;
    };
    Animation.prototype.translateZ = function (translate) {
        translate = this.transformUnit(translate)[0];
        this.transform.push("translateZ(".concat(translate, ")"));
        return this;
    };
    Animation.prototype.opacity = function (value) {
        this.rules.push("opacity: ".concat(value));
        return this;
    };
    Animation.prototype.backgroundColor = function (value) {
        this.rules.push("background-color: ".concat(value));
        return this;
    };
    Animation.prototype.width = function (value) {
        value = this.transformUnit(value)[0];
        this.rules.push("width: ".concat(value));
        return this;
    };
    Animation.prototype.height = function (value) {
        value = this.transformUnit(value)[0];
        this.rules.push("height: ".concat(value));
        return this;
    };
    Animation.prototype.top = function (value) {
        value = this.transformUnit(value)[0];
        this.rules.push("top: ".concat(value));
        return this;
    };
    Animation.prototype.right = function (value) {
        value = this.transformUnit(value)[0];
        this.rules.push("right: ".concat(value));
        return this;
    };
    Animation.prototype.bottom = function (value) {
        value = this.transformUnit(value)[0];
        this.rules.push("bottom: ".concat(value));
        return this;
    };
    Animation.prototype.left = function (value) {
        value = this.transformUnit(value)[0];
        this.rules.push("left: ".concat(value));
        return this;
    };
    // 关键帧载入
    Animation.prototype.step = function (arg) {
        if (arg === void 0) { arg = {}; }
        var DEFAULT = this.DEFAULT;
        var _a = arg.duration, duration = _a === void 0 ? DEFAULT.duration : _a, _b = arg.delay, delay = _b === void 0 ? DEFAULT.delay : _b, _c = arg.timingFunction, timingFunction = _c === void 0 ? DEFAULT.timingFunction : _c, _d = arg.transformOrigin, transformOrigin = _d === void 0 ? DEFAULT.transformOrigin : _d;
        // 生成一条 transition 动画
        this.steps.push([
            this.rules.map(function (rule) { return "".concat(rule, "!important"); }).join(';'),
            "".concat(this.transform.join(' '), "!important"),
            "".concat(TRANSFORM, "-origin: ").concat(transformOrigin),
            "transition: all ".concat(duration, "ms ").concat(timingFunction, " ").concat(delay, "ms")
        ]
            .filter(function (item) { return item !== '' && item !== "".concat(TRANSFORM, ":"); })
            .join(';'));
        // 清空 rules 和 transform
        this.rules = [];
        this.transform = ["".concat(TRANSFORM, ":")];
        return this;
    };
    // 创建底层数据
    Animation.prototype.createAnimationData = function () {
        var animIndex = "naruse-h5-poly-fill/".concat(this.id, "/create-animation__").concat(this.animationMapCount++);
        // 记录动画分几个 step
        this.animationMap[animIndex] = this.steps.length;
        // 吐出 step
        this.steps.forEach(function (step, index) {
            var selector = index === 0
                ? "[data-animation=\"".concat(animIndex, "\"]")
                : "[data-animation=\"".concat(animIndex, "--").concat(index, "\"]");
            styleSheet.add("".concat(selector, " { ").concat(step, " }"));
        });
        // 清空 steps
        this.steps = [];
        return animIndex;
    };
    // 动画数据产出
    Animation.prototype.export = function () {
        return this.createAnimationData();
    };
    return Animation;
}());
// h5 的 createAnimation
var createAnimation = function (option) {
    return new Animation(option);
};

var animation = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createAnimation: createAnimation
});

var Toast = /** @class */ (function () {
    function Toast() {
        this.options = {
            title: '',
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false
        };
        this.style = {
            maskStyle: {
                position: 'fixed',
                'z-index': '1000',
                top: '0',
                right: '0',
                left: '0',
                bottom: '0'
            },
            toastStyle: {
                'z-index': '5000',
                'box-sizing': 'border-box',
                display: 'flex',
                'flex-direction': 'column',
                'justify-content': 'center',
                '-webkit-justify-content': 'center',
                position: 'fixed',
                top: '50%',
                left: '50%',
                'min-width': '120px',
                'max-width': '200px',
                'min-height': '120px',
                padding: '15px',
                transform: 'translate(-50%, -50%)',
                'border-radius': '5px',
                'text-align': 'center',
                'line-height': '1.6',
                color: '#FFFFFF',
                background: 'rgba(17, 17, 17, 0.7)'
            },
            successStyle: {
                margin: '6px auto',
                width: '38px',
                height: '38px',
                background: 'transparent url(data:image/svg+xml;base64,PHN2ZyB0PSIxNjM5NTQ4OTYzMjA0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQzNDgiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cGF0aCBkPSJNMjE5Ljk1MiA1MTIuNTc2bDIxMC40MzIgMjEwLjQzMi00NS4yNDggNDUuMjU2LTIxMC40MzItMjEwLjQzMnoiIHAtaWQ9IjQzNDkiIGZpbGw9IiNmZmZmZmYiPjwvcGF0aD48cGF0aCBkPSJNNzk5LjY3MiAyNjIuMjY0bDQ1LjI1NiA0NS4yNTYtNDYwLjQ2NCA0NjAuNDY0LTQ1LjI1Ni00NS4yNTZ6IiBwLWlkPSI0MzUwIiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+) no-repeat',
                'background-size': '100%'
            },
            errrorStyle: {
                margin: '6px auto',
                width: '38px',
                height: '38px',
                background: 'transparent url(data:image/svg+xml;base64,PHN2ZyB0PSIxNjM5NTUxMDU1MTgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE0MDc2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTUxMiA2NEMyNjQuNTggNjQgNjQgMjY0LjU4IDY0IDUxMnMyMDAuNTggNDQ4IDQ0OCA0NDggNDQ4LTIwMC41OCA0NDgtNDQ4Uzc1OS40MiA2NCA1MTIgNjR6IG0wIDc1MmEzNiAzNiAwIDEgMSAzNi0zNiAzNiAzNiAwIDAgMS0zNiAzNnogbTUxLjgzLTU1MS45NUw1NDggNjM2YTM2IDM2IDAgMCAxLTcyIDBsLTE1LjgzLTM3MS45NWMtMC4xLTEuMzMtMC4xNy0yLjY4LTAuMTctNC4wNWE1MiA1MiAwIDAgMSAxMDQgMGMwIDEuMzctMC4wNyAyLjcyLTAuMTcgNC4wNXoiIHAtaWQ9IjE0MDc3IiBmaWxsPSIjZmZmZmZmIj48L3BhdGg+PC9zdmc+) no-repeat',
                'background-size': '100%'
            },
            loadingStyle: {
                margin: '6px auto',
                width: '38px',
                height: '38px',
                '-webkit-animation': 'taroLoading 1s steps(12, end) infinite',
                animation: 'taroLoading 1s steps(12, end) infinite',
                background: 'transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat',
                'background-size': '100%'
            },
            imageStyle: {
                margin: '6px auto',
                width: '40px',
                height: '40px',
                background: 'transparent no-repeat',
                'background-size': '100%'
            },
            textStyle: {
                margin: '0',
                'font-size': '16px'
            }
        };
    }
    Toast.prototype.create = function (options, _type) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (_type === void 0) { _type = 'toast'; }
        // style
        var _a = this.style, maskStyle = _a.maskStyle, toastStyle = _a.toastStyle, successStyle = _a.successStyle, errrorStyle = _a.errrorStyle, loadingStyle = _a.loadingStyle, imageStyle = _a.imageStyle, textStyle = _a.textStyle;
        // configuration
        var config = __assign(__assign(__assign({}, this.options), options), { _type: _type });
        // wrapper
        this.el = document.createElement('div');
        this.el.className = 'taro__toast';
        this.el.style.opacity = '0';
        this.el.style.transition = 'opacity 0.1s linear';
        // mask
        this.mask = document.createElement('div');
        this.mask.setAttribute('style', inlineStyle(maskStyle));
        this.mask.style.display = config.mask ? 'block' : 'none';
        // icon
        this.icon = document.createElement('p');
        if (config.image) {
            this.icon.setAttribute('style', inlineStyle(__assign(__assign({}, imageStyle), { 'background-image': "url(".concat(config.image, ")") })));
        }
        else {
            var iconStyle = config.icon === 'loading' ? loadingStyle : config.icon === 'error' ? errrorStyle : successStyle;
            this.icon.setAttribute('style', inlineStyle(__assign(__assign({}, iconStyle), (config.icon === 'none' ? { display: 'none' } : {}))));
        }
        // toast
        this.toast = document.createElement('div');
        this.toast.setAttribute('style', inlineStyle(__assign(__assign({}, toastStyle), (config.icon === 'none' ? {
            'min-height': '0',
            padding: '10px 15px'
        } : {}))));
        // title
        this.title = document.createElement('p');
        this.title.setAttribute('style', inlineStyle(textStyle));
        this.title.textContent = config.title;
        // result
        this.toast.appendChild(this.icon);
        this.toast.appendChild(this.title);
        this.el.appendChild(this.mask);
        this.el.appendChild(this.toast);
        // show immediately
        document.body.appendChild(this.el);
        setTimeout(function () { _this.el.style.opacity = '1'; }, 0);
        this.type = config._type;
        // disappear after duration
        config.duration >= 0 && this.hide(config.duration, this.type);
        return '';
    };
    Toast.prototype.show = function (options, _type) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (_type === void 0) { _type = 'toast'; }
        var config = __assign(__assign(__assign({}, this.options), options), { _type: _type });
        if (this.hideOpacityTimer)
            clearTimeout(this.hideOpacityTimer);
        if (this.hideDisplayTimer)
            clearTimeout(this.hideDisplayTimer);
        // title
        this.title.textContent = config.title || '';
        // mask
        this.mask.style.display = config.mask ? 'block' : 'none';
        // image
        var _a = this.style, toastStyle = _a.toastStyle, successStyle = _a.successStyle, errrorStyle = _a.errrorStyle, loadingStyle = _a.loadingStyle, imageStyle = _a.imageStyle;
        if (config.image) {
            this.icon.setAttribute('style', inlineStyle(__assign(__assign({}, imageStyle), { 'background-image': "url(".concat(config.image, ")") })));
        }
        else {
            if (!config.image && config.icon) {
                var iconStyle = config.icon === 'loading' ? loadingStyle : config.icon === 'error' ? errrorStyle : successStyle;
                this.icon.setAttribute('style', inlineStyle(__assign(__assign({}, iconStyle), (config.icon === 'none' ? { display: 'none' } : {}))));
            }
        }
        // toast
        this.toast.setAttribute('style', inlineStyle(__assign(__assign({}, toastStyle), (config.icon === 'none' ? {
            'min-height': '0',
            padding: '10px 15px'
        } : {}))));
        // show
        this.el.style.display = 'block';
        setTimeout(function () { _this.el.style.opacity = '1'; }, 0);
        this.type = config._type;
        // disappear after duration
        config.duration >= 0 && this.hide(config.duration, this.type);
        return '';
    };
    Toast.prototype.hide = function (duration, type) {
        var _this = this;
        if (duration === void 0) { duration = 0; }
        if (this.type !== type)
            return;
        if (this.hideOpacityTimer)
            clearTimeout(this.hideOpacityTimer);
        if (this.hideDisplayTimer)
            clearTimeout(this.hideDisplayTimer);
        this.hideOpacityTimer = setTimeout(function () {
            _this.el.style.opacity = '0';
            _this.hideDisplayTimer = setTimeout(function () { _this.el.style.display = 'none'; }, 100);
        }, duration);
    };
    return Toast;
}());

// 交互
var status = 'default';
// inject necessary style
function init(doc) {
    if (status === 'ready')
        return;
    var taroStyle = doc.createElement('style');
    taroStyle.textContent = '@font-face{font-weight:normal;font-style:normal;font-family:"taro";src:url("data:application/x-font-ttf;charset=utf-8;base64, AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJWs0t/AAABfAAAAFZjbWFwqVgGvgAAAeAAAAGGZ2x5Zph7qG0AAANwAAAAdGhlYWQRFoGhAAAA4AAAADZoaGVhCCsD7AAAALwAAAAkaG10eAg0AAAAAAHUAAAADGxvY2EADAA6AAADaAAAAAhtYXhwAQ4AJAAAARgAAAAgbmFtZYrphEEAAAPkAAACVXBvc3S3shtSAAAGPAAAADUAAQAAA+gAAABaA+gAAAAAA+gAAQAAAAAAAAAAAAAAAAAAAAMAAQAAAAEAAADih+FfDzz1AAsD6AAAAADXB57LAAAAANcHnssAAP/sA+gDOgAAAAgAAgAAAAAAAAABAAAAAwAYAAEAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQK8AZAABQAIAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABAAHjqCAPoAAAAWgPoABQAAAABAAAAAAAAA+gAAABkAAAD6AAAAAAABQAAAAMAAAAsAAAABAAAAV4AAQAAAAAAWAADAAEAAAAsAAMACgAAAV4ABAAsAAAABgAEAAEAAgB46gj//wAAAHjqCP//AAAAAAABAAYABgAAAAEAAgAAAQYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAKAAAAAAAAAACAAAAeAAAAHgAAAABAADqCAAA6ggAAAACAAAAAAAAAAwAOgABAAD/7AAyABQAAgAANzMVFB4UKAAAAAABAAAAAAO7AzoAFwAAEy4BPwE+AR8BFjY3ATYWFycWFAcBBiInPQoGBwUHGgzLDCELAh0LHwsNCgr9uQoeCgGzCyEOCw0HCZMJAQoBvgkCCg0LHQv9sQsKAAAAAAAAEgDeAAEAAAAAAAAAHQAAAAEAAAAAAAEABAAdAAEAAAAAAAIABwAhAAEAAAAAAAMABAAoAAEAAAAAAAQABAAsAAEAAAAAAAUACwAwAAEAAAAAAAYABAA7AAEAAAAAAAoAKwA/AAEAAAAAAAsAEwBqAAMAAQQJAAAAOgB9AAMAAQQJAAEACAC3AAMAAQQJAAIADgC/AAMAAQQJAAMACADNAAMAAQQJAAQACADVAAMAAQQJAAUAFgDdAAMAAQQJAAYACADzAAMAAQQJAAoAVgD7AAMAAQQJAAsAJgFRCiAgQ3JlYXRlZCBieSBmb250LWNhcnJpZXIKICB3ZXVpUmVndWxhcndldWl3ZXVpVmVyc2lvbiAxLjB3ZXVpR2VuZXJhdGVkIGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0Lmh0dHA6Ly9mb250ZWxsby5jb20ACgAgACAAQwByAGUAYQB0AGUAZAAgAGIAeQAgAGYAbwBuAHQALQBjAGEAcgByAGkAZQByAAoAIAAgAHcAZQB1AGkAUgBlAGcAdQBsAGEAcgB3AGUAdQBpAHcAZQB1AGkAVgBlAHIAcwBpAG8AbgAgADEALgAwAHcAZQB1AGkARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwECAQMBBAABeAd1bmlFQTA4AAAAAAA=") format("truetype");}@-webkit-keyframes taroLoading{0%{-webkit-transform:rotate3d(0, 0, 1, 0deg);}100%{-webkit-transform:rotate3d(0, 0, 1, 360deg);transform:rotate3d(0, 0, 1, 360deg);}}@keyframes taroLoading{0%{-webkit-transform:rotate3d(0, 0, 1, 0deg);}100%{-webkit-transform:rotate3d(0, 0, 1, 360deg);transform:rotate3d(0, 0, 1, 360deg);}}.taro-modal__foot:after {content: "";position: absolute;left: 0;top: 0;right: 0;height: 1px;border-top: 1px solid #D5D5D6;color: #D5D5D6;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);} .taro-model__btn:active {background-color: #EEEEEE}.taro-model__btn:not(:first-child):after {content: "";position: absolute;left: 0;top: 0;width: 1px;bottom: 0;border-left: 1px solid #D5D5D6;color: #D5D5D6;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleX(0.5);transform: scaleX(0.5);}.taro-actionsheet__cell:not(:first-child):after {content: "";position: absolute;left: 0;top: 0;right: 0;height: 1px;border-top: 1px solid #e5e5e5;color: #e5e5e5;-webkit-transform-origin: 0 0;transform-origin: 0 0;-webkit-transform: scaleY(0.5);transform: scaleY(0.5);}';
    doc.querySelector('head').appendChild(taroStyle);
    status = 'ready';
}
var toast = new Toast();
var showToast = function (options) {
    if (options === void 0) { options = { title: '' }; }
    init(document);
    options = Object.assign({
        title: '',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: false
    }, options);
    var success = options.success, fail = options.fail, complete = options.complete;
    var handle = new MethodHandler({ name: 'showToast', success: success, fail: fail, complete: complete });
    if (typeof options.title !== 'string') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'title',
                correct: 'String',
                wrong: options.title
            })
        });
    }
    if (typeof options.duration !== 'number') {
        return handle.fail({
            errMsg: getParameterError({
                para: 'duration',
                correct: 'Number',
                wrong: options.duration
            })
        });
    }
    if (options.image && typeof options.image !== 'string')
        options.image = '';
    options.mask = !!options.mask;
    var errMsg = '';
    if (!toast.el) {
        errMsg = toast.create(options, 'toast');
    }
    else {
        errMsg = toast.show(options, 'toast');
    }
    return handle.success({ errMsg: errMsg });
};
var hideToast = function (_a) {
    var _b = _a === void 0 ? {} : _a, success = _b.success, fail = _b.fail, complete = _b.complete;
    var handle = new MethodHandler({ name: 'hideToast', success: success, fail: fail, complete: complete });
    if (!toast.el)
        return handle.success();
    toast.hide(0, 'toast');
    return handle.success();
};

var uiInteraction = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hideToast: hideToast,
    showToast: showToast
});

var api = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, system), storage), route), device), media), wxml), animation), uiInteraction);

/** 插件 的 生命周期 */
var PluginMethod;
(function (PluginMethod) {
    PluginMethod["apply"] = "Plugin.apply";
    PluginMethod["onError"] = "Plugin.onError";
})(PluginMethod || (PluginMethod = {}));
/** 日志等级 */
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["debug"] = "debug";
    LoggerLevel["info"] = "info";
    LoggerLevel["warn"] = "warn";
    LoggerLevel["error"] = "error";
    LoggerLevel["none"] = "none";
})(LoggerLevel || (LoggerLevel = {}));
/** 日志的触发起源地 */
var LoggerLanding;
(function (LoggerLanding) {
    /** naruse error center */
    LoggerLanding["errorCenter"] = "error-center";
    /** try-catch run */
    LoggerLanding["tryCatch"] = "try-catch";
    /** 线上 */
    LoggerLanding["production"] = "production";
    /** 开发时 */
    LoggerLanding["development"] = "development";
})(LoggerLanding || (LoggerLanding = {}));
/** LoggerInfo 中 key 到 梦想埋点参数 key 的映射 */
var LoggerInfoKeyMap = {
    action: 'p',
    event: 'e',
    userNick: 'n',
    level: 'm1',
    appName: 'm2',
    landing: 'm3',
    vipEndTime: 'm4',
    adVer: 'm5',
    template_type: 'm6',
    systemInfo: 'm7',
    info: 'm9',
    pid: 'd1',
    cid: 'd2',
    vipFlag: 'd3',
};
// type ValueOf<T> = T[keyof T];
// type RequestParamsKey = ValueOf<typeof LoggerInfoKeyMap>;

var log$1 = createLogger('naruse-plugin');

/**
 * 插件,很明显，它是一个插件，它可以做点什么。你必须继承此类，来实现插件
 */
var Plugin = /** @class */ (function () {
    function Plugin(_config) {
        var _newTarget = this.constructor;
        /** 插件名称标识 */
        this.name = '';
        if (_newTarget === Plugin) {
            throw new Error('Plugin 是一个抽象类，不能被实例化');
        }
    }
    /** 在广告代码运行前，获取到有效的广告数据后 */
    Plugin.prototype.apply = function (_params) {
    };
    /** 解析广告代码错误时、运行广告代码错误时 */
    Plugin.prototype.onError = function (_params) {
    };
    return Plugin;
}());
/** 插件的所有方法 */
var PluginMethodList = ['apply', 'onError'];
/** 所有的插件 */
var plugins = {};
// @ts-ignore
var pluginEvent = new EventBus();
/** 使用全局事件中心 注册插件的生命周期 */
PluginMethodList.forEach(function (method) {
    pluginEvent.on(PluginMethod[method], function (params) {
        var keys = Object.keys(plugins);
        log$1.info("PluginMethod[".concat(method, "]"), keys.length, params);
        keys.forEach(function (key) {
            typeof plugins[key][method] === 'function' && plugins[key][method](params);
        });
    });
});
/** 注册一个插件 */
function registerPlugin$1(name, pluginConstructor, firstParam) {
    var params = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        params[_i - 3] = arguments[_i];
    }
    // 构造对象
    var plugin = new (pluginConstructor.bind.apply(pluginConstructor, __spreadArray$1([void 0, firstParam], params, false)))();
    if (plugin[name]) {
        throw new Error("".concat(name, " \u6B64\u63D2\u4EF6\uFF0C\u5DF2\u7ECF\u6CE8\u518C\u8FC7\u4E86"));
    }
    plugins[name] = plugin;
    plugin.name = name;
    return plugin;
}

// 所有日志等级，顺序 按优先级升序（none 这个...最高，啥也不显示）
var levels = [LoggerLevel.debug, LoggerLevel.info, LoggerLevel.warn, LoggerLevel.error, LoggerLevel.none];
/** 获取空广告 */
var nullAdData = function () { return ({
    creative_id: undefined,
    creative_name: "null data",
    dest_url: "",
    group_id: 0,
    img_path: "",
    img_size: "",
    pid: undefined,
    pid_name: "",
    plan_id: 0,
    primary_class: "",
    secondary_class: "",
    template_type: "",
    user_define: { body: undefined },
    version: ""
}); };
var log = createLogger('naruser-plugin/logger');
/** 日志发送类 */
var LoggerPlus = /** @class */ (function () {
    /**
     * 构造日志对象
     * @param adData     广告数据
     * @param landing    日志触发源头
     * @param adVer      广告版本
     * @param coverLoggerInfoToRequestParamInterface LoggerInfo 转为 请求参数的函数
     * @param publicInfo 初始化日志公共属性的参数
     */
    function LoggerPlus(_a, publicInfo) {
        var adData = _a.adData, landing = _a.landing, adVer = _a.adVer;
        /** 日志的公共信息 */
        this._publicInfo = {
            action: 'advert-template-logger',
            appName: "",
            landing: undefined,
            systemInfo: "",
            userNick: "",
            vipEndTime: "",
            vipFlag: 0
        };
        /** 日志的网络请求接口 */
        this._logNetworkInterface = function () {
            throw new Error('未初始化 LoggerPlugin logInterface');
        };
        // 当前日志等级
        this._curLoggerLevel = LoggerLevel.debug;
        /** 将LoggerInfo 转为 请求参数的接口 */
        this.coverLoggerInfoToRequestParamInterface = null;
        if (!(adData !== null && typeof adData === 'object')) {
            throw new Error('构造日志对象错误: adData 必须是一个对象');
        }
        // 初始化 公共属性
        this.updatePublicInfo(publicInfo, false);
        // 初始化 私有属性
        var creative_name = adData.creative_name, template_type = adData.template_type, creative_id = adData.creative_id, pid = adData.pid;
        this._info = {
            landing: landing,
            template_type: template_type,
            /** 二级分类 发送 时指定， 默认创意名称 */
            event: creative_name,
            /** 日志等级 发送 时指定 */
            level: LoggerLevel.debug,
            /** 广告系统版本 */
            adVer: adVer,
            /** m9 日志信息 */
            info: {},
            /** 广告位 */
            pid: Number(pid),
            /** 创意id */
            cid: Number(creative_id)
        };
        // 移除空值
        removeObjectNullValue(this._info);
    }
    /** 解析公共属性 */
    LoggerPlus.prototype.updatePublicInfo = function (_a, ignoredNull) {
        var level = _a.level, landing = _a.landing, appName = _a.appName, userInfo = _a.userInfo, systemInfo = _a.systemInfo, logInterface = _a.logInterface, coverLoggerInfoToRequestParamInterface = _a.coverLoggerInfoToRequestParamInterface;
        if (ignoredNull === void 0) { ignoredNull = true; }
        var userNick = userInfo.userNick, vipEndTime = userInfo.vipEndTime, vipFlag = userInfo.vipFlag;
        var obj = {
            userNick: userNick,
            appName: appName,
            landing: landing,
            vipEndTime: vipEndTime,
            systemInfo: systemInfo,
            vipFlag: vipFlag,
        };
        ignoredNull && removeObjectNullValue(obj);
        // 日志等级
        if (levels.includes(level)) {
            this._curLoggerLevel = level;
        }
        // 日志 网络接口
        if (typeof logInterface === 'function') {
            this._logNetworkInterface = logInterface;
        }
        this.coverLoggerInfoToRequestParamInterface = coverLoggerInfoToRequestParamInterface;
        Object.assign(this._publicInfo, obj);
    };
    /** 再此日志对象基础上，创建一个新的日志对象 */
    LoggerPlus.prototype.clone = function (info, ignoredNull) {
        if (ignoredNull === void 0) { ignoredNull = true; }
        // 不允许修改 action
        delete info.action;
        if (ignoredNull) {
            removeObjectNullValue(info);
        }
        // 构造一份原本的
        var obj = __assign(__assign({}, this._publicInfo), { logInterface: this._logNetworkInterface, level: this._curLoggerLevel });
        // 覆盖上去
        Object.assign(obj, info);
        var adVer = this._info.adVer;
        // 构造日志类
        var loggerPlus = new LoggerPlus(
        // 先使用空公共信息
        {
            adData: nullAdData(),
            landing: LoggerLanding.production,
            adVer: adVer
        }, {
            appName: obj.appName,
            landing: obj.landing,
            level: obj.level,
            logInterface: obj.logInterface,
            systemInfo: obj.systemInfo,
            userInfo: { userNick: obj.userNick, vipEndTime: obj.vipEndTime, vipFlag: obj.vipFlag },
            coverLoggerInfoToRequestParamInterface: this.coverLoggerInfoToRequestParamInterface,
        });
        // 公共 私有 信息 部分。
        loggerPlus._info = __assign({}, this._info);
        return loggerPlus;
    };
    /**
     * 发送日志
     * @param level 日志等级
     * @param event 事件名称
     * @param args 参数
     */
    LoggerPlus.prototype._request = function (level, event) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!this.isCanLog(level)) {
            log.debug.apply(log, __spreadArray$1(['忽略日志：', level, event], args, false));
            return;
        }
        if (typeof this._logNetworkInterface !== 'function') {
            // 按理来说，在初始化时 initAdLoggerPublicInfo 没报错，这里不可能为空
            throw new Error('logNetworkInterface 不是一个函数');
        }
        var info = __assign(__assign(__assign({}, this._publicInfo), (this._info)), { event: event, level: level, info: args });
        // 转换
        var requestParams = typeof this.coverLoggerInfoToRequestParamInterface === 'function' ?
            this.coverLoggerInfoToRequestParamInterface(info) :
            coverLoggerInfoToRequestParam(info);
        // 调用接口发送
        this._logNetworkInterface(this.encode(requestParams), this.encodeValue(requestParams), info);
        log.debug('发送日志：', level, event, info);
    };
    /** 将obj转 get 请求的字符串，并进行 url 编码 */
    LoggerPlus.prototype.encode = function (obj) {
        var res = this.encodeValue(obj);
        return Object.keys(res)
            .map(function (key) { return "".concat(key, "=").concat(res[key]); })
            .join('&');
    };
    /**
     * 将 obj 的 value 编码成字符串
     * @param obj
     */
    LoggerPlus.prototype.encodeValue = function (obj) {
        var res = {};
        Object.keys(obj)
            .forEach(function (key) {
            var value = obj[key];
            if (typeof value === 'object') {
                res[key] = encodeURIComponent(safeToJSON(value));
                return;
            }
            if (typeof value === 'function') {
                // 不会有人传递一个函数吧
                res[key] = encodeURIComponent("[function-".concat(value.name, "]:").concat(value.toString()));
                return;
            }
            res[key] = encodeURIComponent(value);
        });
        return res;
    };
    /** debug 日志 */
    LoggerPlus.prototype.debug = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._request.apply(this, __spreadArray$1([LoggerLevel.debug, event], args, false));
    };
    /** info 日志 */
    LoggerPlus.prototype.info = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._request.apply(this, __spreadArray$1([LoggerLevel.info, event], args, false));
    };
    /** warn 日志 */
    LoggerPlus.prototype.warn = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._request.apply(this, __spreadArray$1([LoggerLevel.warn, event], args, false));
    };
    /** error 日志 */
    LoggerPlus.prototype.error = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this._request.apply(this, __spreadArray$1([LoggerLevel.error, event], args, false));
    };
    /** 是否可打印 level 级别的日志 */
    LoggerPlus.prototype.isCanLog = function (level) {
        var _this = this;
        var index = levels.findIndex(function (v) { return v === level; });
        var curIndex = levels.findIndex(function (v) { return v === _this._curLoggerLevel; });
        // level 级别 >= _curLoggerLevel 才能发送
        return index >= curIndex;
    };
    return LoggerPlus;
}());
/** 将 LoggerInfo 转为 LoggerRequestParams */
function coverLoggerInfoToRequestParam(info) {
    return Object.keys(info).reduce(function (res, k) {
        res[LoggerInfoKeyMap[k]] = info[k];
        return res;
    }, {});
}

var getNullAdData = function () {
    return {
        creative_id: 0,
        creative_name: "creative_name",
        dest_url: "",
        group_id: 0,
        img_path: "",
        img_size: "",
        pid: 0,
        pid_name: "",
        plan_id: 0,
        primary_class: "",
        secondary_class: "",
        template_type: "template_type",
        user_define: { body: {} },
        version: ""
    };
};
/**
 * 日志插件，将 管理 日志 的公共属性参数，负责将日志对象注入到公共系统中
 */
var LoggerPlugin = /** @class */ (function (_super) {
    __extends$1(LoggerPlugin, _super);
    function LoggerPlugin(first, _a) {
        var level = _a.level, landing = _a.landing, appName = _a.appName, userInfo = _a.userInfo, logInterface = _a.logInterface, systemInfo = _a.systemInfo, coverLoggerInfoToRequestParamInterface = _a.coverLoggerInfoToRequestParamInterface;
        var _this = _super.call(this, first) || this;
        /** 日志的公共信息 参数 */
        _this._initParams = {
            appName: "",
            level: LoggerLevel.debug,
            logInterface: function (_paramsStr, _params, _loggerInfo) {
                throw new Error('未初始化 LoggerPlugin logInterface');
            },
            systemInfo: {},
            userInfo: { userNick: "", vipEndTime: "", vipFlag: 0 }
        };
        // 一小波，错误提示
        if (typeof appName !== 'string') {
            throw new Error('initAdLoggerPublicInfo: appName 必须是一个字符串');
        }
        if (typeof userInfo !== "object") {
            throw new Error('initAdLoggerPublicInfo: userInfo 必须是一个对象');
        }
        if (typeof logInterface !== 'function') {
            throw new Error('initAdLoggerPublicInfo: logInterface 必须是一个函数');
        }
        if (typeof systemInfo !== "object") {
            throw new Error('initAdLoggerPublicInfo: systemInfo 必须是一个对象');
        }
        if (typeof landing !== "string") {
            throw new Error('initAdLoggerPublicInfo: landing 必须是一个字符串');
        }
        if (coverLoggerInfoToRequestParamInterface && typeof coverLoggerInfoToRequestParamInterface !== "function") {
            throw new Error('initAdLoggerPublicInfo: coverLoggerInfoToRequestParamInterface 必须是一个函数');
        }
        _this.constructorFirstParams = first;
        _this.updatePublicInfo({ level: level, landing: landing, appName: appName, userInfo: userInfo, logInterface: logInterface, systemInfo: systemInfo, coverLoggerInfoToRequestParamInterface: coverLoggerInfoToRequestParamInterface }, false);
        return _this;
    }
    /** 修改参数 */
    LoggerPlugin.prototype.updatePublicInfo = function (params, ignoredNull) {
        if (ignoredNull === void 0) { ignoredNull = true; }
        log$1.info('updatePublicInfo: params = ', params, 'ignoredNull = ', ignoredNull);
        (ignoredNull) && removeObjectNullValue(params);
        Object.assign(this._initParams, params);
        var config = this.constructorFirstParams.config;
        var baseCtx = config.baseCtx();
        // 修改公共信息之后，也要重新初始化 默认的 logger
        // 注入默认的 日志对象.(预加载代码，不会触发插件的生命周期)
        baseCtx.$logger = new LoggerPlus({
            adData: getNullAdData(),
            landing: LoggerLanding.production,
            adVer: baseCtx.$adVersion || '0.0.0',
        }, this._initParams);
        // 优先才有 准确的 logger
        var logger = this.$logger || baseCtx.$logger;
        logger.updatePublicInfo(params, ignoredNull);
    };
    LoggerPlugin.prototype.apply = function (_a) {
        var context = _a.context;
        var $adImport = context.$adImport, $adVersion = context.$adVersion;
        var adData = $adImport.adData;
        /** 注入 日志对象 */
        this.$logger = new LoggerPlus({
            adData: adData.results[0],
            adVer: $adVersion,
        }, this._initParams);
        context.$logger = this.$logger;
        log$1.info('apply: context = ', context);
    };
    LoggerPlugin.prototype.onError = function (_a) {
        var context = _a.context, error = _a.error, source = _a.source;
        var $logger = context.$logger;
        // 打印错误日志
        $logger.clone({ landing: LoggerLanding[source] })
            .error("".concat(error.name, "-").concat(error.message), error);
    };
    return LoggerPlugin;
}(Plugin));

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
var getNaruseComponentFromProps = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    var hotPuller, _a, code, ctx, _props, e_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!props || typeof props !== 'object') {
                    logger.error('无效参数，无法生成对应naruse组件');
                    return [2 /*return*/];
                }
                hotPuller = getNaruseConfig().hotPuller;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                return [4 /*yield*/, hotPuller(props)];
            case 2:
                _a = _c.sent(), code = _a.code, ctx = _a.ctx, _props = _a.props;
                _b = {};
                return [4 /*yield*/, getNaruseComponentFromCode(code, ctx)];
            case 3: return [2 /*return*/, (_b.Component = _c.sent(),
                    _b.props = _props,
                    _b)];
            case 4:
                e_1 = _c.sent();
                logger.error('加载远程代码资源失败', e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 */
var getNaruseComponentFromCode = function (code, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var naruseConfig, _baseCtx, onRunError, hotImport, baseCtx, $webpack, $$import, context, onErrorHandler, params, executeCode, exports, component, NaruseComponent_1, compatibleClass;
    return __generator(this, function (_a) {
        if (!code)
            return [2 /*return*/, null];
        naruseConfig = getNaruseConfig();
        _baseCtx = naruseConfig.baseCtx, onRunError = naruseConfig.onRunError, hotImport = naruseConfig.hotImport;
        baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx;
        $webpack = {};
        $$import = function (path) { return __awaiter(void 0, void 0, void 0, function () {
            var code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, hotImport(path, context)];
                    case 1:
                        code = _a.sent();
                        return [2 /*return*/, executeCode(code)];
                }
            });
        }); };
        context = __assign(__assign(__assign({ h: Naruse.createElement, Naruse: Naruse }, baseCtx), ctx), { 
            // 热加载导入
            $$import: $$import, $webpack: $webpack });
        onErrorHandler = function (source, error) {
            var params = { config: naruseConfig, context: context, error: error, source: source };
            pluginEvent.emit(PluginMethod.onError, params);
            onRunError(error, source);
        };
        params = { config: naruseConfig, context: context };
        pluginEvent.emit(PluginMethod.apply, params);
        executeCode = function (code) { return run(code, context, onErrorHandler.bind(null, RunningCodeErrorSource.errorCenter)); };
        exports = {};
        try {
            exports = executeCode(code);
        }
        catch (err) {
            logger.error('运行时出错，自动继续', err);
            onErrorHandler(RunningCodeErrorSource.tryCatch, err);
            return [2 /*return*/];
        }
        component = null;
        // 默认导出组件存在
        if (exports.default) {
            component = exports.default;
        }
        else {
            NaruseComponent_1 = Naruse.Component;
            compatibleClass = function compatibleClass() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                NaruseComponent_1.apply(this, args);
                exports.constructor && exports.constructor.call(this);
                Object.entries(exports).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (key === 'constructor')
                        return;
                    self[key] = typeof value === 'function' ? value.bind(self) : value;
                });
            };
            compatibleClass.prototype = Object.create(NaruseComponent_1.prototype);
            Object.assign(compatibleClass.prototype, { constructor: compatibleClass });
            component = compatibleClass;
        }
        return [2 /*return*/, component];
    });
}); };
/**
 * @description 热更新容器组件
 * @author CHC
 * @date 2022-07-19 18:07:44
 * @class Container
 * @extends {Component<{}, {loaded: boolean}>}
 */
var Container = /** @class */ (function (_super) {
    __extends$1(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { loaded: false };
        _this.init(props);
        // 传递给子组件的props
        _this._props = {};
        return _this;
    }
    Container.prototype.init = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getNaruseComponentFromProps(props)];
                    case 1:
                        result = _a.sent();
                        this.Component = result === null || result === void 0 ? void 0 : result.Component;
                        this._props = result === null || result === void 0 ? void 0 : result.props;
                        if (this.Component) {
                            this.setState({ loaded: true });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Container.prototype.render = function () {
        // @ts-ignore
        return this.state.loaded ? Naruse.createElement(this.Component, this._props) : null;
    };
    return Container;
}(React.Component));

// @ts-ignore
var version = "0.9.0";
initVersionLogger('naruse-h5', version);
var runCodeWithNaruse = function (code, ctx) { return getNaruseComponentFromCode(code, ctx); };
var Naruse = __assign(__assign(__assign({}, api), getHooks()), { Component: React.Component, createElement: naruseCreateElement, env: {
        USER_DATA_PATH: '',
        clientName: 'H5',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'H5',
    }, getDeferred: getDeferred, globalEvent: globalEvent, EventBus: EventBus, version: version, unsafe_run: run, runCodeWithNaruse: runCodeWithNaruse, withPage: withPage, cloneElement: React.cloneElement, isValidElement: React.isValidElement, Children: React.Children });
if (typeof window !== 'undefined') {
    // @ts-ignore
    window.Naruse = Naruse;
}
function naruseExtend(object) {
    if (typeof object !== 'object') {
        return false;
    }
    Object.assign(Naruse, object);
    return true;
}

var registerPlugin = function (name, plugin) {
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    var config = getNaruseConfig();
    return registerPlugin$1.apply(void 0, __spreadArray$1([name, plugin, { config: config }], params, false));
};

export { Container, LoggerLanding, LoggerLevel, LoggerPlugin, LoggerPlus, Naruse, Plugin, Container as default, naruseExtend, naruseInit, registerPlugin };
