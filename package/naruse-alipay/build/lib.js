import { run } from 'naruse-parser';

/*! *****************************************************************************
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
/* global Reflect, Promise */

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
        while (_) try {
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

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

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

const initVersionLogger = (name, version) => {
    console.log(
        `%c naruse %c ${name} v${version} %c`,
        'background:#17c0eb ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
        'background:#7158e2 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
        'background:transparent'
      );
};

const logger$1 = createLogger('naurse-error');


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
        once: function (event, fun) {
            var i = n.get(event);
            const funcs = (...args) => {
                fun(...args);
                var i = n.get(event);
                i && i.splice(i.indexOf(funcs) >>> 0, 1);
            };
            i ? i.push(funcs) : n.set(event, [funcs]);
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

/**
 * 去掉前后 空格/空行/tab 的正则 预先定义 避免在函数中重复构造
 * @type {RegExp}
 */
const trimReg = /(^\s*)|(\s*$)/g;

/**
  * 判断一个东西是不是空 空格 空字符串 undefined 长度为0的数组及对象会被认为是空的
  * @param key
  * @returns {boolean}
  */
const isEmpty = (key) => {
    if (key === undefined || key === '' || key === null) {
        return true;
    }
    if (typeof (key) === 'string') {
        key = key.replace(trimReg, '');
        if (key === '' || key === null || key === 'null' || key === undefined || key === 'undefined') {
            return true;
        }
        return false;
    } else if (typeof (key) === 'undefined') {
        return true;
    } else if (typeof (key) === 'object') {
        for (const i in key) {
            return false;
        }
        return true;
    } else if (typeof (key) === 'boolean') {
        return false;
    }
};


/**
 * @description 判断是否是函数
 * @author CHC
 * @date 2022-04-07 13:04:03
 * @param {*} obj
 */
const isFunc = (obj) => typeof obj === 'function';

const isObj = (obj) => obj !== null &&  typeof obj === 'object';

/**
 * @description 是否是一个空对象
 * @author CHC
 * @date 2022-10-12 14:10:29
 */
const isEmptyObj = (o) => {
    for (let i in o) {
        return false;
    }
    return true;
};

/**
 * @description 处理api
 * @author CHC
 * @date 2022-04-07 12:04:21
 * @param {*} Naruse Naruse对象
 * @param {*} global 全局对象
 * @param {*} [config={}]
 */
const processApis = function processApis (Naruse, global, config = {}) {
    if (!global) return;

    const apis = config.needPromiseApis || [];
    const syncApis = config.needSyncApis || [];

    const { transformMeta } = config;

    // 处理所有需要promisify的api
    apis.forEach(key => {
        const originKey = key;
        Naruse[originKey] = (options = {}, ...args) => {
            let key = originKey;

            // 第一个参数 options 为字符串，单独处理
            if (typeof options === 'string') {
                if (args.length) {
                    return global[key](options, ...args);
                }
                return global[key](options);
            }

            // 改变 key 或 option 字段
            if (config.transformMeta) {
                const { key: newKey, options: newOpt } = transformMeta(key, options);
                key = newKey;
                options = newOpt;
                // 新 key 可能不存在
                if (!global.hasOwnProperty(key)) {
                    return temporarilyNotSupport(key)();
                }
            }
            const obj = Object.assign({}, options);


            // Promisify
            const p = new Promise((resolve, reject) => {
                obj.success = res => {
                    isFunc(options.success) && options.success(res);
                    resolve(res);
                };
                obj.fail = res => {
                    isFunc(options.fail) && options.fail(res);
                    reject(res);
                };
                obj.complete = res => {
                    isFunc(options.complete) && options.complete(res);
                };
                if (args.length) {
                    global[key](obj, ...args);
                } else {
                    global[key](obj);
                }
            });

            return p;
        };
    });

    syncApis.forEach(key => {
        if (typeof global[key] === 'function') {
            Naruse[key] = (...args) => {
                if (config.handleSyncApis) {
                    return config.handleSyncApis(key, global, args);
                }
                return global[key].apply(global, args);
            };
        } else {
            Naruse[key] = global[key];
        }
    });
};

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

var logger = createLogger('naruse-element');
var NOOP = function () { };
/**
 * @description 两个props是否完全相同
 * @author CHC
 * @date 2022-03-21 18:03:59
 * @param {*} a
 * @param {*} b
 * @returns {*}
 */
var propsEquals = function (a, b) {
    if (Object.is(a, b) && typeof a !== 'object') {
        return true;
    }
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
};

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
 */
var naruseInit = function (_a) {
    var _b = _a === void 0 ? {} : _a, hotPuller = _b.hotPuller, baseCtx = _b.baseCtx, onRunError = _b.onRunError;
    if (hotPuller)
        _config.hotPuller = hotPuller;
    if (baseCtx)
        _config.baseCtx = baseCtx;
    if (onRunError)
        _config.onRunError = onRunError;
};

/**
 * @description naruseComponent 实现
 * @author CHC
 * @date 2022-03-21 14:03:21
 * @class NaruseComponent
 */
var NaruseComponent = /** @class */ (function () {
    function NaruseComponent(props) {
        this.state = {};
        this.props = props;
        this.$mounted = false;
        // 中间件实例
        this.$updater = null;
    }
    NaruseComponent.prototype.setState = function (update, callback) {
        if (callback === void 0) { callback = NOOP; }
        if (!this.$updater) {
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        if (typeof update !== 'object') {
            logger.error('setState 不支持的数据格式！', update);
            return;
        }
        if (this.state === update)
            return;
        var newState = __assign(__assign({}, this.state), update);
        var flag = this.$updater.shouldUpdate(this.props, newState);
        this.state = newState;
        flag && this.$updater.update(callback);
    };
    NaruseComponent.prototype.forceUpdate = function (callback) {
        if (callback === void 0) { callback = NOOP; }
        if (!this.$updater) {
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        this.$updater.update(callback);
    };
    // @ts-ignore
    NaruseComponent.prototype.shouldComponentUpdate = function () { };
    NaruseComponent.prototype.componentDidMount = function () { };
    NaruseComponent.prototype.componentDidUpdate = function () { };
    NaruseComponent.prototype.componentWillUnmount = function () { };
    // @ts-ignore
    NaruseComponent.prototype.render = function () { };
    return NaruseComponent;
}());
/** 判断是否是NaruseComponent */
var isNaruseComponent = function (obj) { return obj instanceof NaruseComponent; };

var uid = 0;
/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */
var vnodeSpecialMap = {
    text: function (props, childNodes) {
        var id = "_n_".concat(uid++);
        return { naruseType: 'text', content: childNodes.join(''), id: id, _uid: id };
    },
};
/**
 * @description 模拟react的创建虚拟节点
 * @author CHC
 * @date 2022-02-23 15:02:03
 * @param {*} type 组件类型
 * @param {*} props 组件属性
 * @param {*} childNodes 子节点
 * @returns {*}
 */
var createElement = function (type, props) {
    var childNodes = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        childNodes[_i - 2] = arguments[_i];
    }
    if (isNaruseComponent(type.prototype))
        return createClassElement(type, props, childNodes);
    if (typeof type === 'function')
        return createFuncElement(type, props, childNodes);
    return createBaseElement(type, props, childNodes);
};
/**
 * @description 创建新的naruse组件
 * @author CHC
 * @date 2022-03-21 12:03:04
 * @param {*} type
 * @param {*} props
 * @param {*} childNodes
 */
var createClassElement = function (type, props, childNodes) {
    props = __assign(__assign({}, props), { children: childNodes });
    // 先不实例化对象，等待组件装载完成后再实例化
    var component = { actuator: type, props: props };
    return { naruseType: 'naruse-element', component: component };
};
/**
 * @description 创建基础节点
 * @author CHC
 * @date 2022-03-21 12:03:16
 * @param {*} type
 * @param {*} props
 * @param {*} childNodes
 * @returns {*}
 */
var createBaseElement = function (type, props, childNodes) {
    var newNode = {};
    if (vnodeSpecialMap[type])
        newNode = vnodeSpecialMap[type](props, childNodes);
    childNodes = (childNodes.flat && childNodes.flat(1)) || childNodes;
    childNodes = childNodes.map(function (child) {
        if (typeof child === 'string' || typeof child === 'number') {
            var id = "_n_".concat(uid++);
            return { naruseType: 'text', content: child, id: id, _uid: id };
        }
        return child;
    });
    var node = (__assign(__assign(__assign({ naruseType: type }, props), { childNodes: childNodes }), newNode));
    if (!node.id) {
        node.id = node._uid = "_n_".concat(uid++);
    }
    return node;
};
/**
 * @description 创建一个函数式组件
 * @author CHC
 * @date 2022-03-15 12:03:45
 */
var createFuncElement = function (type, props, childNodes) {
    return type(__assign(__assign({}, props), { children: childNodes }));
};

var apiDiff = {
    getClipboardData: { alias: 'getClipboard' },
    setClipboardData: {
        alias: 'setClipboard',
        options: {
            change: [{
                    old: 'data',
                    new: 'text',
                }],
        },
    },
};
var transformMeta = function (api, options) {
    var apiAlias = api;
    Object.keys(apiDiff).forEach(function (item) {
        var apiItem = apiDiff[item];
        if (api === item) {
            if (apiItem.alias) {
                apiAlias = apiItem.alias;
            }
            if (apiItem.options) {
                var change = apiItem.options.change;
                var set = apiItem.options.set;
                if (change) {
                    change.forEach(function (changeItem) {
                        options[changeItem.new] = options[changeItem.old];
                    });
                }
                if (set) {
                    set.forEach(function (setItem) {
                        options[setItem.key] = typeof setItem.value === 'function' ? setItem.value(options) : setItem.value;
                    });
                }
            }
        }
    });
    return {
        key: apiAlias,
        options: options,
    };
};
var handleSyncApis = function handleSyncApis(key, global, args) {
    if (key === 'getStorageSync') {
        var arg1 = args[0];
        if (arg1 != null) {
            var res = global[key]({ key: arg1 });
            // 支付宝小程序遗留bug：值可能在data或APDataStorage字段下
            var data = null;
            if (res && res.hasOwnProperty('data')) {
                data = res.data;
            }
            else if (res && res.hasOwnProperty('APDataStorage')) {
                data = res.APDataStorage;
            }
            return data === null ? '' : data;
        }
        return console.error('getStorageSync 传入参数错误');
    }
    if (key === 'setStorageSync') {
        var arg1 = args[0];
        var arg2 = args[1];
        if (arg1 != null) {
            return global[key]({
                key: arg1,
                data: arg2,
            });
        }
        return console.error('setStorageSync 传入参数错误');
    }
    if (key === 'removeStorageSync') {
        var arg1 = args[0];
        if (arg1 != null) {
            return global[key]({ key: arg1 });
        }
        return console.error('removeStorageSync 传入参数错误');
    }
    if (key === 'createSelectorQuery') {
        var query_1 = global[key]();
        query_1.in = function () {
            return query_1;
        };
        return query_1;
    }
    return global[key].apply(global, args);
};
var needPromiseApis = [
    'getStorage',
    'setStorage',
    'removeStorage',
    'clearStorage',
    'getStorageInfo',
    'getSystemInfo',
    'navigateTo',
    'navigateBack',
    'setClipboard',
    'getClipboard',
    'getImageInfo',
];
var syncApis = [
    'getStorageSync',
    'setStorageSync',
    'removeStorageSync',
    'clearStorageSync',
    'getStorageInfoSync',
];
var qnPromiseApis = [
    'navigateToWebPage',
];
/**
 * @description 初始化alipay的api
 * @author CHC
 * @date 2022-04-07 13:04:59
 * @returns {*}
 */
var initNaruseAlipayApi = function () {
    var NaruseApiInterface = {};
    processApis(NaruseApiInterface, my, {
        transformMeta: transformMeta,
        needPromiseApis: needPromiseApis,
        handleSyncApis: handleSyncApis,
        needSyncApis: syncApis,
    });
    processApis(NaruseApiInterface, my.qn, { needPromiseApis: qnPromiseApis });
    return NaruseApiInterface;
};

// 放置页面相关的处理
var pageCenter = {};
var ALLOW_EVENT = [
    'onLoad',
    'onShow',
    'onReady',
    'onHide',
    'onUnload',
    'onShareAppMessage',
    'onTitleClick',
    'onOptionMenuClick',
    'onPullDownRefresh',
    'onTabItemTap',
    'onPageScroll',
    'onReachBottom'
];
/**
 * @description 获取naruse内部的页面对象
 * @author CHC
 * @date 2022-05-04 18:05:46
 * @param {Page} miniComponent
 */
var getPageInstance = function (miniComponent) {
    if (!miniComponent) {
        logger.error('无效组件');
        return;
    }
    var id = miniComponent.$page && miniComponent.$page.$id;
    if (!id) {
        logger.error('无效页面id');
        return;
    }
    if (!pageCenter[id]) {
        pageCenter[id] = new Page(miniComponent.$page);
        return pageCenter[id];
    }
    return pageCenter[id];
};
/**
 * @description Naruse内部的Page实例
 * @author CHC
 * @date 2022-05-04 18:05:45
 * @class Page
 */
var Page = /** @class */ (function () {
    function Page(miniPage) {
        // 小程序实例
        this.miniPage = miniPage;
        // 事件中心
        this.eventCenter = new EventBus();
        // 各个原有事件
        this.oldEvents = {};
        // this.eventCenter.on('onUnload', () => setTimeout(() => this.clear()));
        this.hasBind = {};
    }
    /**
     * @description 拦截小程序页面事件，将事件改造为事件中心机制
     * @author CHC
     * @date 2022-05-05 10:05:43
     * @param {*} key
     * @param {*} value
     */
    Page.prototype.interceptEvent = function (key) {
        var _this = this;
        var selfPage = this;
        // 保存原有事件并进入事件中心
        selfPage.oldEvents[key] = selfPage.miniPage[key];
        var oldEvent = selfPage.miniPage[key];
        // 原有事件同样挂载到事件中心
        selfPage.eventCenter.on(key, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return typeof oldEvent === 'function' && oldEvent.apply(_this.miniPage, args);
        });
        Object.defineProperty(this.miniPage, key, {
            get: function () {
                return function () {
                    var _a;
                    var arg = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        arg[_i] = arguments[_i];
                    }
                    return (_a = selfPage.eventCenter).emit.apply(_a, __spreadArray([key], arg, false));
                };
            },
            set: function () {
                logger.error('正在修改页面事件，请勿修改，请使用Naruse.Page.on()');
            },
            enumerable: true,
            configurable: true,
        });
    };
    Page.prototype.on = function (eventName, func) {
        if (!ALLOW_EVENT.includes(eventName)) {
            logger.error("\u65E0\u6548\u7ED1\u5B9A\u4E8B\u4EF6\u540D-".concat(eventName));
            return;
        }
        // 使用时再绑定
        if (!this.hasBind[eventName]) {
            this.interceptEvent(eventName);
            this.hasBind[eventName] = true;
        }
        this.eventCenter.on(eventName, func);
    };
    Page.prototype.off = function (eventName, func) {
        this.eventCenter.off(eventName, func);
    };
    Object.defineProperty(Page.prototype, "route", {
        get: function () {
            return this.miniPage.route;
        },
        enumerable: false,
        configurable: true
    });
    Page.prototype.clear = function () {
        var _this = this;
        this.eventCenter.clear();
        // 替换回对应的事件
        Object.keys(this.oldEvents).forEach(function (key) {
            _this.miniPage[key] = _this.oldEvents[key];
        });
        // 清除引用
        this.miniPage = null;
        this.oldEvents = {};
    };
    return Page;
}());

var withPage = function (component) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.render = function () {
            var page = getPageInstance(this.$updater && this.$updater.component);
            var currentPage = {
                route: page.route,
                events: {
                    on: page.on.bind(page),
                    off: page.off.bind(page),
                },
            };
            return createElement(component, __assign(__assign({}, this.props), { currentPage: currentPage }));
        };
        return class_1;
    }(NaruseComponent));
};

var apis = initNaruseAlipayApi();
// @ts-ignore
var version = "0.3.3";
initVersionLogger('naruse-alipay', version);
// naruse模块内容
var Naruse = __assign(__assign(__assign({ Component: NaruseComponent, createElement: createElement, getDeferred: getDeferred, globalEvent: globalEvent, EventBus: EventBus, env: {
        clientName: 'alipay',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'alipay',
    }, version: version }, my), apis), { withPage: withPage, unsafe_run: run });
var naruseExtend = function (opt) {
    if (typeof opt === 'object') {
        Object.assign(Naruse, opt);
    }
};
my.Naruse = Naruse;

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */
var getNaruseComponentFromProps = function (props) { return __awaiter(void 0, void 0, void 0, function () {
    var hotPuller, _a, code, ctx, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!props || typeof props !== 'object') {
                    logger.error('无效参数，无法生成对应naruse组件');
                    return [2 /*return*/];
                }
                hotPuller = getNaruseConfig().hotPuller;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, hotPuller(props)];
            case 2:
                _a = _b.sent(), code = _a.code, ctx = _a.ctx;
                return [2 /*return*/, getNaruseComponentFromCode(code, ctx)];
            case 3:
                e_1 = _b.sent();
                logger.error('加载远程代码资源失败', e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 * @param {*} code
 * @param {*} ctx
 * @returns {*}
 */
var getNaruseComponentFromCode = function (code, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _baseCtx, onRunError, baseCtx, exports, component, NaruseComponent_1, compatibleClass;
    return __generator(this, function (_b) {
        if (!code)
            return [2 /*return*/];
        _a = getNaruseConfig(), _baseCtx = _a.baseCtx, onRunError = _a.onRunError;
        baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx;
        exports = {};
        try {
            exports = run(code, __assign(__assign({ h: createElement, Naruse: Naruse, my: typeof my === 'object' ? my : {} }, baseCtx), ctx));
        }
        catch (err) {
            logger.error('运行时出错，自动继续', err);
            onRunError(err);
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
 * @description 简单的o(n^2)diff操作，记录需要更新的node
 * @author CHC
 * @date 2022-10-11 14:10:32
 * @returns {*}
 */
var vnodeDiff = function (newVnode, oldVnode, newParentNode, oldParentNode, path, diffRes) {
    var _a;
    if (path === void 0) { path = 'node'; }
    if (diffRes === void 0) { diffRes = {}; }
    var res = diffRes;
    // just null
    if (!newVnode || isEmptyObj(newVnode)) {
        res[path] = {};
        return res;
    }
    // fix: 复用节点后diff失效的问题，单纯的使用指针判断是否相等在复用节点时会出现问题
    // 完全相同的对象并不一定内容一定相同
    // if (newVnode === oldVnode ) {
    //     return res;
    // }
    // 继承父组件id
    if (oldParentNode) {
        newVnode.parentId = oldParentNode.id;
    }
    if (!oldVnode) {
        res[path] = newVnode;
        return res;
    }
    // 非自定义id组件时，继承id
    if (!isCustomIdNode(newVnode)) {
        newVnode._uid = newVnode.id = oldVnode.id;
    }
    // key & type
    if (newVnode.key !== oldVnode.key
        || newVnode.naruseType !== oldVnode.naruseType) {
        res[path] = newVnode;
        return res;
    }
    // naruse-element 单独判断
    if (newVnode.naruseType === 'naruse-element' && newVnode.component) {
        if (newVnode.component.actuator === ((_a = oldVnode.component) === null || _a === void 0 ? void 0 : _a.actuator)) {
            var propsChnages_1 = vnodePropsDiff(newVnode.component.props, oldVnode.component.props);
            Object.keys(propsChnages_1).forEach(function (key) {
                res["".concat(path, ".component.props.").concat(key)] = propsChnages_1[key];
            });
        }
        else {
            res[path] = newVnode;
            return res;
        }
    }
    else {
        // 普通元素的props判断
        var propsChnages_2 = vnodePropsDiff(newVnode, oldVnode);
        Object.keys(propsChnages_2).forEach(function (key) {
            res["".concat(path, ".").concat(key)] = propsChnages_2[key];
        });
        diffVnodeChildren(newVnode, oldVnode, "".concat(path, ".childNodes"), res);
    }
    return res;
};
/**
 * @description 子节点数组之间进行diff
 * @author CHC
 * @date 2022-10-11 15:10:18
 */
var diffVnodeChildren = function (newNode, oldNode, path, diffRes) {
    if (path === void 0) { path = 'node'; }
    if (diffRes === void 0) { diffRes = {}; }
    var i, oldVNode, childVNode;
    var oldChildren = __spreadArray([], ((oldNode && oldNode.childNodes) || []), true);
    var oldChildrenLength = oldChildren.length;
    var newChildNodes = __spreadArray([], (newNode && newNode.childNodes) || [], true);
    if (!newChildNodes.length) {
        if (oldChildrenLength) {
            diffRes[path] = [];
        }
        return;
    }
    if (!oldChildrenLength) {
        return diffRes[path] = newChildNodes;
    }
    // 当新的列表长度小于旧列表时，直接重新设置整个列表，因为小程序的data list只支持增不支持减
    if (newChildNodes.length < oldChildrenLength) {
        return diffRes[path] = newChildNodes;
    }
    // just same length will diff
    for (i = 0; i < newChildNodes.length; i++) {
        childVNode = newChildNodes[i];
        if (childVNode == null || typeof childVNode == 'boolean') {
            childVNode = null;
        }
        else if (typeof childVNode == 'string' ||
            typeof childVNode == 'number' ||
            typeof childVNode == 'bigint') {
            childVNode = createElement('text', null, childVNode);
        }
        else if (Array.isArray(childVNode)) {
            childVNode = createElement('fragment', null, childVNode);
        }
        oldVNode = oldChildren[i];
        if (oldVNode == null || typeof oldVNode == 'boolean') {
            oldVNode = null;
        }
        if (!childVNode) {
            if (childVNode !== oldVNode) {
                diffRes["".concat(path, "[").concat(i, "]")] = null;
            }
            continue;
        }
        // Morph the old element into the new one, but don't append it to the dom yet
        vnodeDiff(childVNode, oldVNode, newNode, oldNode, "".concat(path, "[").concat(i, "]"), diffRes);
    }
};
/** 需要跳过的属性名 */
var skipPropsKeys = ['naruseType', 'key', 'childNodes'];
/**
 * @description shallow props diff
 * @author CHC
 * @date 2022-10-11 15:10:52
 */
var vnodePropsDiff = function (newVnode, oldVnode) {
    var res = {};
    if (!oldVnode)
        return res;
    // change
    for (var newPropKey in newVnode) {
        if (skipPropsKeys.includes(newPropKey))
            continue;
        var newPropValue = newVnode[newPropKey];
        var oldPropValue = oldVnode[newPropKey];
        if (newPropValue !== oldPropValue) {
            if (newPropKey === 'style'
                && isObj(newPropValue)
                && isObj(oldPropValue)
                && isEmptyObj(vnodePropsDiff(newPropValue, oldPropValue))) {
                continue;
            }
            res[newPropKey] = newPropValue;
        }
    }
    // remove
    for (var oldPropKey in oldVnode) {
        if (skipPropsKeys.includes(oldPropKey))
            continue;
        if (!(oldPropKey in newVnode)) {
            res[oldPropKey] = undefined;
        }
    }
    return res;
};
var isCustomIdNode = function (node) { return !node._uid; };

// naruse事件中心
/** 允许继续冒泡的事件 */
var allowPropagetionEventNames = [
    'onClick',
    'onLongClick',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'onTransitionEnd',
    'onAnimationStart',
    'onAnimationIteration',
    'onAnimationEnd',
];
/**
 * @description 获取节点的路径
 * @author CHC
 * @date 2022-02-23 09:02:32
 * @param {*} id
 * @param {*} vnode
 * @returns {*}
 */
var getPathById = function (id, vnode) {
    var path = [];
    if (!vnode)
        return;
    if (vnode.id === id)
        return path;
    if (!vnode.childNodes || !vnode.childNodes.length)
        return;
    // 层次遍历
    for (var i = 0; i < vnode.childNodes.length; i++) {
        if (vnode.childNodes[i] && vnode.childNodes[i].id === id) {
            path.push(i);
            return path;
        }
    }
    for (var i = 0; i < vnode.childNodes.length; i++) {
        var childPath = getPathById(id, vnode.childNodes[i]);
        if (childPath) {
            path.push(i);
            for (var j = 0; j < childPath.length; j++) {
                path.push(childPath[j]);
            }
            return path;
        }
    }
};
/**
 * @description 获取节点
 * @author CHC
 * @date 2022-02-23 09:02:02
 * @param {*} id
 * @param {*} vnode
 * @returns {*}
 */
var getVnodeById = function (id, vnode) {
    var path = getPathById(id, vnode);
    if (!path)
        return undefined;
    if (!path.length)
        return vnode;
    var node = vnode;
    path.forEach(function (index) {
        node = node.childNodes[index];
    });
    return node;
};
/**
 * @description 初始化节点
 * @author CHC
 * @date 2022-02-23 09:02:49
 * @param {*} vnode
 * @param {*} environments
 * @param {*} parentId
 * @returns {*}
 */
var initVnodeTree = function (vnode, parentId) {
    var newNode = vnode;
    if (!vnode || typeof vnode !== 'object')
        return {};
    newNode.parentId = parentId;
    // 递归遍历
    if (Array.isArray(newNode.childNodes)) {
        newNode.childNodes.forEach(function (node) { return initVnodeTree(node, newNode.id); });
    }
    return newNode;
};
/**
 * @description 事件分发中心
 * @author CHC
 * @date 2022-03-15 14:03:55
 * @param {*} props
 */
var allEvents = function allEvents(props) {
    eventCenter(props, this.data.node);
};
/**
 * 小程序事件映射表
 */
var eventNameMap = {};
var methodsTags = [
    'tap',
    'longTap',
    'input',
    'blur',
    'focus',
    'load',
    'change',
    'confirm',
    'keyBoardHeightChange',
    'scroll',
    'scrollToUpper',
    'scrollToLower',
    'touchStart',
    'touchMove',
    'touchEnd',
    'touchCancel',
    'transitionEnd'
];
var methodTagTransformMap = {
    'tap': 'click',
    'longTap': 'longClick'
};
var transformFirstApha = function (item) { return 'on' + item.slice(0, 1).toLocaleUpperCase() + item.slice(1); };
var methods = {};
methodsTags.forEach(function (item) {
    var eventName = transformFirstApha(item);
    methods[eventName] = allEvents;
    eventNameMap[item] = transformFirstApha(methodTagTransformMap[item] || item);
});
/**
 * @description 事件处理中心
 * @author CHC
 * @date 2022-02-23 09:02:22
 * @param {*} event
 * @param {*} nodeTree
 * @returns {*}
 */
var eventCenter = function (event, nodeTree) {
    // 是否继续冒泡的标志
    var stopFlag = false;
    // 空事件不响应
    if (!(event && event.target && event.target.id))
        return;
    // 空节点不响应
    var eventNode = getVnodeById(event.target.id, nodeTree);
    event.naruseTarget = eventNode;
    if (!eventNode)
        return;
    // 获取事件类型
    var type = event.type;
    var reflectedEventName = eventNameMap[type];
    // 不支持的事件
    if (!reflectedEventName) {
        logger.warn("".concat(type, "\u4E8B\u4EF6\u4E0D\u652F\u6301"));
    }
    // 冒泡事件便允许阻止冒泡
    if (allowPropagetionEventNames.includes(reflectedEventName)) {
        stopFlag = true;
        event.stopPropagation = function () {
            stopFlag = false;
        };
    }
    // 反射事件名称
    var responseFuc = eventNode[reflectedEventName];
    if (!(responseFuc && typeof responseFuc === 'function')) ;
    else {
        // logger.debug(`元素${eventNode.naruseType}:触发${reflectedEventName}事件`);
        responseFuc.call(eventNode, event);
    }
    // 没有截断就继续冒泡
    if (stopFlag) {
        // logger.debug(`元素${eventNode.naruseType}: 冒泡${reflectedEventName}事件`);
        eventCenter(__assign(__assign({}, event), { target: { id: eventNode.parentId }, narusePropagetion: true }), nodeTree);
    }
};
/**
 * @description 小程序组件事件绑定
 * @type {*}
 * */
var miniappEventBehavior = {
    props: { component: {} },
    data: { node: {} },
    methods: methods,
};

/**
 * @description 承接小程序组件与NaruseComponent的桥梁，将小程序组件的生命周期映射到naruseComponent上，同时将naruseComponet的行为映射到小程序组件上
 * @author CHC
 * @date 2022-03-21 12:03:54
 * @class ReactMiddware
 * @note 因为是先创建的naruseComponent组件实例，后创建的中间件，所以采用后绑定
 */
var Middware = /** @class */ (function () {
    function Middware(miniappComponent, NaruseComponentActuator, props) {
        this.fristRender = true;
        this.updating = false;
        /** diff修改队列 */
        this.diffQueue = {};
        this.props = props;
        this.component = miniappComponent;
        if (NaruseComponentActuator instanceof NaruseComponent) {
            this.naruseComponent = NaruseComponentActuator;
        }
        else {
            this.naruseComponent = new NaruseComponentActuator(props);
            this.naruseComponent.props = props;
        }
        this.naruseComponent.$updater = this;
    }
    /** 执行更新 */
    Middware.prototype.update = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = NOOP; }
        var self = this;
        !this.updating && Promise.resolve().then(function () {
            _this.updating = false;
            // fix: maybe has unmounted
            if (!_this.naruseComponent) {
                logger.error('you are updating a has unmounted component, please check you code');
                return;
            }
            if (!_this.naruseComponent.render) {
                logger.error('the NaruseComponent must have a render function');
                return;
            }
            var vnode = _this.naruseComponent.render();
            // console.time('diff 花费时间');
            initVnodeTree(vnode);
            var diff = vnodeDiff(vnode, _this.fristRender ? null : _this.component.data.node);
            var updatedCallBack = function () {
                // console.log('data', JSON.parse(JSON.stringify(this.component.data.node)));
                _this.lastUpdateNode = vnode;
                _this.onUpdated.call(self);
                callback();
            };
            // console.timeEnd('diff 花费时间');
            // console.log('new data', JSON.parse(JSON.stringify(vnode)));
            // console.log('old data', JSON.parse(JSON.stringify(this.component.data.node)));
            // console.log('diff data', JSON.parse(JSON.stringify(diff)));
            // diff 存在结果才会重新渲染
            if (!isEmptyObj(diff)) {
                _this.component.setData(diff, updatedCallBack);
            }
            else {
                updatedCallBack();
            }
        });
        this.updating = true;
    };
    /** 更新后 */
    Middware.prototype.onUpdated = function () {
        if (!this.naruseComponent)
            return;
        var funcName = this.fristRender ? 'componentDidMount' : 'componentDidUpdate';
        this.naruseComponent[funcName] && this.naruseComponent[funcName]();
        if (this.fristRender)
            this.naruseComponent.$mounted = true;
        this.fristRender = false;
    };
    /** 父组件更新后是否需要更新子组件 */
    Middware.prototype.canUpdate = function (prevProps) {
        var c = this.naruseComponent;
        var flag = this.shouldUpdate(this.props, c.state);
        if (flag && !propsEquals(prevProps, this.props)) {
            this.prevProps = prevProps;
            c.props = this.props;
            this.update();
        }
    };
    /** 是否应该刷新 */
    Middware.prototype.shouldUpdate = function (nextProps, nextState) {
        var c = this.naruseComponent;
        if (!c || typeof c.shouldComponentUpdate !== 'function')
            return true;
        var res = c.shouldComponentUpdate.call(c, nextProps, nextState);
        return res === undefined ? true : res;
    };
    /** 卸载时 */
    Middware.prototype.onUnMount = function (isMiniComponentUnmount) {
        if (isMiniComponentUnmount === void 0) { isMiniComponentUnmount = false; }
        this.naruseComponent && this.naruseComponent.componentWillUnmount();
        // 解绑对象
        // fix: 修复当naruse组件卸载时把小程序组件一起卸载导致后续渲染失败
        if (isMiniComponentUnmount) {
            this.component = null;
        }
        // fix: 修复naruseComponent为空的情况
        if (this.naruseComponent) {
            this.naruseComponent.$updater = null;
        }
        this.naruseComponent = null;
    };
    return Middware;
}());

var bindedPages = {};
// 扩展能力，小程序环境内特殊的api
/**
 * @description 渲染某个组件到页面上
 * @author CHC
 * @date 2022-06-14 16:06:24
 * @param {*} page
 * @param {*} Component
 */
var renderComponentOnPage = function (route, Component) {
    globalEvent.emit('naruse.renderComponentOnPage', route, Component);
};
/**
 * @description 绑定渲染中心到组件上，一个页面只允许绑定一个
 * @author CHC
 * @date 2022-06-14 15:06:16
 * @param {*} page
 * @param {*} Component
 */
var bindRenderEventOnComponent = function (miniComponent) {
    if (!miniComponent)
        return;
    var route = miniComponent.$page.route;
    if (bindedPages[route]) {
        logger.error("".concat(route, "-\u5DF2\u7ECF\u7ED1\u5B9A\u4E86\u4E8B\u4EF6\u4E2D\u5FC3"));
        return;
    }
    bindedPages[route] = miniComponent;
    miniComponent._naruseEventCenter = globalEvent;
    globalEvent.on('naruse.renderComponentOnPage', function (pageName, Component) {
        if (pageName !== route)
            return;
        // 卸载已有组件
        miniComponent.$middware && miniComponent.$middware.onUnMount();
        // 重新加载组件
        miniComponent.$middware = new Middware(miniComponent, Component, {});
        miniComponent.$middware.update();
    });
};
/**
 * @description 当主页面关闭时卸载某个页面组件
 * @author CHC
 * @date 2022-08-02 10:08:59
 * @param {*} miniComponent
 */
var uninstallMainComponentOnSomePage = function (miniComponent) {
    if (!miniComponent)
        return;
    var route = miniComponent.$page.route;
    if (!bindedPages[route])
        return;
    delete bindedPages[route];
    miniComponent._naruseEventCenter = null;
};
/**
 * @description 使用代码渲染组件在某个页面
 * @author CHC
 * @date 2022-06-14 16:06:46
 * @param {*} route
 * @param {*} code
 * @param {*} ctx
 */
var renderComponentOnPageWithCode = function (route, code, ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var component;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!route)
                    return [2 /*return*/];
                return [4 /*yield*/, getNaruseComponentFromCode(code, ctx)];
            case 1:
                component = _a.sent();
                renderComponentOnPage(route, component);
                return [2 /*return*/];
        }
    });
}); };

/**
 * @description 初始化naruse主组件
 * @author CHC
 * @date 2022-03-21 17:03:20
 * @returns {*}
 */
var initMainComponent = function () {
    var _this = this;
    getNaruseComponentFromProps(this.props)
        .then(function (component) {
        if (!component) {
            logger.warn('无远程资源，不加载组件');
            return;
        }
        _this.$middware = new Middware(_this, component, {});
        _this.$middware.update();
    })
        .catch(function (err) {
        logger.error('初始化主组件失败', err);
    });
};
/**
 * @description 初始化组件
 */
var createVmContext$1 = function () {
    try {
        // 主组件
        initMainComponent.call(this);
    }
    catch (error) {
        logger.error('初始化失败', error);
    }
};
/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */
var createMainBehavior = function (option) {
    if (option === void 0) { option = {}; }
    // 小程序组件默认minxs对象
    var naruseBehavior = __assign(__assign({}, miniappEventBehavior), { 
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount: function () {
            var _a = (this.props || {}).unique, unique = _a === void 0 ? false : _a;
            // 绑定重新渲染事件
            if (unique)
                bindRenderEventOnComponent(this);
            this.option = option;
            createVmContext$1.call(this);
        }, 
        /**
         * @description 组件更新后
         * @author CHC
         * @date 2022-03-16 10:03:21
         */
        didUpdate: function (prevProps) {
            // 参数不同则重新创建元素
            if (!propsEquals(prevProps, this.props)) {
                // 卸载
                this.$middware && this.$middware.onUnMount();
                // 重新创建
                createVmContext$1.call(this);
            }
        }, 
        /**
         * @description 组件卸载后
         * @author CHC
         * @date 2022-03-16 10:03:36
         */
        didUnmount: function () {
            if (!this.$middware)
                return;
            uninstallMainComponentOnSomePage(this);
            this.$middware.onUnMount(true);
        } });
    return naruseBehavior;
};

/**
 * @description 初始化子虚拟组件
 * @author CHC
 * @date 2022-03-21 16:03:28
 * @param {*} component
 */
var initSubComponent = function (args) {
    if (args === void 0) { args = {}; }
    var actuator = args.actuator, props = args.props;
    if (actuator) {
        this.$middware = new Middware(this, actuator, props || {});
        this.$middware.update();
    }
};
/**
 * @description 初始化组件
 */
var createVmContext = function () {
    // 子组件
    if (!isEmpty(this.props.component)) {
        initSubComponent.call(this, this.props.component);
        return;
    }
    logger.error('无效空naruse组件');
};
/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */
var createSubBehavior = function () {
    // 小程序组件默认minxs对象
    var naruseBehavior = __assign(__assign({}, miniappEventBehavior), { 
        /**
         * @description 装载完毕后
         * @author CHC
         * @date 2022-03-16 10:03:05
         */
        didMount: function () {
            try {
                createVmContext.call(this);
            }
            catch (error) {
                logger.error('子组件初始化失败', error);
            }
        }, 
        /**
         * @description 组件更新后
         * @author CHC
         * @date 2022-03-16 10:03:21
         */
        didUpdate: function (prevProps) {
            if (!isEmpty(this.props.component)) {
                var _a = prevProps.component, props = _a.props, actuator = _a.actuator;
                // FIX: 修复了当切换装载器后不会卸载组件重新渲染
                // FIX: 修复了当key发生变化后组件不会重新渲染 0615
                if (actuator === this.props.component.actuator && props.key === this.props.component.props.key) {
                    this.$middware.props = this.props.component.props;
                    this.$middware.canUpdate(props);
                }
                else {
                    this.$middware.onUnMount();
                    initSubComponent.call(this, this.props.component);
                }
            }
        }, 
        /**
         * @description 组件卸载后
         * @author CHC
         * @date 2022-03-16 10:03:36
         */
        didUnmount: function () {
            if (!this.$middware)
                return;
            this.$middware.onUnMount(true);
        } });
    return naruseBehavior;
};

naruseExtend({ renderComponentOnPage: renderComponentOnPage });

export { Naruse, createMainBehavior, createSubBehavior, naruseExtend, naruseInit, renderComponentOnPageWithCode };
