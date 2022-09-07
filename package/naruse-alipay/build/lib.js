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

const version = '0.0.7';

var logger = createLogger('naruse-element');
var NOOP = function () { };

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

var n=function(e,r){return (n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r;}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);})(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function t(){this.constructor=e;}n(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t);}const A="Identifier",v="Literal",i="Program",g="Property",K="FunctionDeclaration",Z="FunctionExpression",ee="ExpressionStatement",b="ObjectPattern",u="ArrayPattern",o="AssignmentPattern",w="ObjectExpression",x="ArrayExpression",k="AssignmentExpression",E="MemberExpression",$="RestElement",C="SpreadElement",re="DoWhileStatement",te="DebuggerStatement",ne="ContinueStatement",oe="BreakStatement",S="CallExpression",ae="YieldExpression",ie="ImportBatchSpecifier",ue="ImportSpecifier",se="ImportDeclaration",ce="ExportSpecifier",le="ExportBatchSpecifier",fe="ExportDeclaration",pe="ClassDeclaration",de="ClassExpression",he="ClassBody",t="ArrowFunctionExpression",me="TemplateLiteral",ye="MethodDefinition",ve="SequenceExpression",ge="ParenthesizedExpression",be="NewExpression",we="UpdateExpression",xe="BinaryExpression",ke="LogicalExpression",Ee="UnaryExpression",$e="VariableDeclaration",Ce="IfStatement",Se="ReturnStatement",Ae="SwitchCase",Ie="SwitchStatement",Oe="ThrowStatement",Ve="TaggedTemplateExpression",Re="TryStatement",Fe="CatchClause",Te="WhileStatement",De="EmptyStatement",je="LabeledStatement",Ue="BlockStatement",Ne="ForInStatement",Pe="ForOfStatement",qe="ForStatement",Be="VariableDeclarator",Le="ThisExpression",Me="ConditionalExpression",_e="ImportExpression";r(Xe,ze=Error);var ze,He,Ye,e=Xe;function Xe(){var e=null!==ze&&ze.apply(this,arguments)||this;return e.isEvaluateError=!0,e}function Je(){return null!==He&&He.apply(this,arguments)||this}function We(){return null!==Ye&&Ye.apply(this,arguments)||this}r(Je,He=e),r(We,Ye=e);var s,c={notYetDefined:[1e3,"未定义的变量: %0",We],duplicateDefinition:[1001,"变量重复定义: %0",We],notCallableFunction:[1002,"不是可调用的函数: %0",We],notSupportNode:[1003,"尚未支持的node类型: %0",e],notHasSomeProperty:[1004,"对象不存在对应属性: %0",We],runTimeError:[1005,"运行错误 %0",e],deconstructNotArray:[1006,"解构应为一个数组: %0",We],deconstructNotObject:[1007,"解构应为一个对象: %0",We],notHasImport:[1008,"未初始化函数: %0",We]},l=function(e,r,t,n){var r=e[1].replace("%0",String(r)),o=(t&&n&&(o=t.loc,n=n.slice(t.start,t.end),n="错误代码: ".concat(n),o&&(n+=" [".concat(o.start.line,":").concat(o.start.column,"-").concat(o.end.line,":").concat(o.end.column,"]")),r="".concat(r," \n ").concat(n)),new e[2](r));return o.nodeLoc=t,o},Qe=0,Ge={},Ke={},Ze={result:void 0},er=[setTimeout,setInterval,clearInterval,clearTimeout],rr=((e={})[i]=function(e,r){for(var t=0,n=e.body;t<n.length;t++)f(n[t],r);},e[A]=function(e,r){if("undefined"!==e.name){r=r.$find(e.name);if(r)return r.$get();throw l(c.notYetDefined,e.name,e,s.source)}},e[v]=function(e){return e.value},e[Ue]=function(e,r){for(var t=r.invasived?r:new ir("block",r),n=0,o=e.body;n<o.length;n++){var a=f(o[n],t);if(a===Ge||a===Ke||a===Ze)return a}},e[De]=function(){},e[ee]=function(e,r){f(e.expression,r);},e[Se]=function(e,r){return Ze.result=e.argument?f(e.argument,r):void 0,Ze},e[oe]=function(){return Ge},e[ne]=function(){return Ke},e[Ce]=function(e,r){return f(e.test,r)?f(e.consequent,r):e.alternate?f(e.alternate,r):void 0},e[qe]=function(e,r){var t=new ir("loop",r);for(e.init&&f(e.init,t);!e.test||f(e.test,t);e.update&&f(e.update,t)){var n=f({type:"BlockStatement",body:e.body},t);if(n===Ge)break;if(n!==Ke&&n===Ze)return n}},e[K]=function(e,r){var t=rr[Z](e,r),n=(e.id||{name:"anonymous".concat(Qe++)}).name;if(r.$var(n,t))return t;throw l(c.duplicateDefinition,n,e,s.source)},e[$e]=function(e,r){for(var t=e.kind,n=0,o=e.declarations;n<o.length;n++){var a=o[n],i=a.id,a=a.init,a=a?f(a,r):void 0;if(i.type===A){var u=i.name;if(!r.$declar(t,u,a))throw l(c.duplicateDefinition,u,e,s.source)}else rr[i.type](i,r,t,a);}},e[u]=function(n,o,a,i){var e=n.elements;if(!Array.isArray(i))throw l(c.deconstructNotArray,i,n,s.source);e.forEach(function(e,r){if(e)if(e.type===A){var t=e.name;if(!o.$declar(a,t,i[r]))throw l(c.duplicateDefinition,t,n,s.source)}else rr[e.type](e,o,a,i[r]);});},e[b]=function(n,o,a,i){n.properties.forEach(function(e){if(e.type===g){var r=e.key,t=e.value,e=e.computed?f(r,o):r.name;if(t.type===A){r=t.name;if(!o.$declar(a,r,i[e]))throw l(c.duplicateDefinition,r,n,s.source)}else rr[t.type](t,o,a,i[e]);}});},e[o]=function(e,r,t,n){var o=e.left,a=e.right,a=void 0===n?f(a,r):n;if(o.type===A){n=o.name;if(!r.$declar(t,n,a))throw l(c.duplicateDefinition,n,e,s.source)}else rr[o.type](o,r,t,a);},e[Le]=function(e,r){r=r.$find("this");return r?r.$get():null},e[x]=function(e,r){return e.elements.map(function(e){return e?f(e,r):null})},e[w]=function(e,r){for(var t={},n=0,o=e.properties;n<o.length;n++){var a=o[n];if(a.type!==g)throw l(c.notSupportNode,a.type,e,s.source);var i=a.kind,u=void 0,a=(a.computed||a.key.type===v?u=f(a.key,r):a.key.type===A&&(u=a.key.name),f(a.value,r));"init"===i?t[u]=a:"set"===i?Object.defineProperty(t,u,{set:a}):"get"===i&&Object.defineProperty(t,u,{get:a});}return t},e[Z]=function(t,a,i){function e(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var o=new ir("function",a);if(o.invasived=!0,t.params.forEach(function(e,r){var t;e.type===A?(t=e.name,o.$var(t,n[r])):rr[e.type](e,o,"var",n[r]);}),i){var r=a.$find("this").$get();if(o.$const("this",r||null),r=f(t.body,o),t.body.type!==Ue)return r}else o.$const("this",this),o.$const("arguments",arguments),r=f(t.body,o);if(r===Ze)return r.result}return (i=void 0===i?!1:i)&&Object.defineProperty(e,"prototype",{value:void 0}),Object.defineProperty(e,"length",{value:t.params.length}),Object.defineProperty(e,"toString",{value:function(){return s.source.slice(t.start,t.end)}}),e},e[Ee]=function(n,o){return {"-":function(){return -f(n.argument,o)},"+":function(){return +f(n.argument,o)},"!":function(){return !f(n.argument,o)},"~":function(){return ~f(n.argument,o)},void:function(){f(n.argument,o);},typeof:function(){var e;return n.argument.type===A?(e=o.$find(n.argument.name))?typeof e.$get():"undefined":typeof f(n.argument,o)},delete:function(){var e,r;if(n.argument.type===E)return e=(t=n.argument).object,r=t.property,t.computed?delete f(e,o)[f(r,o)]:delete f(e,o)[r.name];if(n.argument.type===A){var t=o.$find("this");if(t)return t.$get()[n.argument.name]}}}[n.operator]()},e[we]=function(e,r){var t,n,o=e.prefix;if(e.argument.type===A){var a,i=e.argument.name;if(!(a=r.$find(i)))throw l(c.notYetDefined,i,e,s.source)}else e.argument.type===E&&(i=e.argument,t=f(i.object,r),n=i.computed?f(i.property,r):i.property.name,a={$set:function(e){return t[n]=e,!0},$get:function(){return t[n]}});return {"--":function(e){return a.$set(e-1),o?--e:e--},"++":function(e){return a.$set(e+1),o?++e:e++}}[e.operator](f(e.argument,r))},e[xe]=function(e,r){return {"==":function(e,r){return e==r},"!=":function(e,r){return e!=r},"===":function(e,r){return e===r},"!==":function(e,r){return e!==r},"<":function(e,r){return e<r},"<=":function(e,r){return e<=r},">":function(e,r){return r<e},">=":function(e,r){return r<=e},"+":function(e,r){return e+r},"-":function(e,r){return e-r},"*":function(e,r){return e*r},"**":function(e,r){return Math.pow(e,r)},"/":function(e,r){return e/r},"%":function(e,r){return e%r},"|":function(e,r){return e|r},"^":function(e,r){return e^r},"&":function(e,r){return e&r},"<<":function(e,r){return e<<r},">>":function(e,r){return e>>r},">>>":function(e,r){return e>>>r},in:function(e,r){return e in r},instanceof:function(e,r){return e instanceof r}}[e.operator](f(e.left,r),f(e.right,r))},e[k]=function(e,r){var t=e.left;if(t.type===A){var n=t.name,o=r.$find(n);if(!o)throw l(c.notYetDefined,n,e,s.source);u=o;}else {if(t.type!==E)throw l(c.notSupportNode,t.type,e,s.source);var n=t.object,o=t.property,t=t.computed,a=f(n,r),i=t?f(o,r):o.name,u={$set:function(e){return a[i]=e,!0},$get:function(){return a[i]}};}return {"=":function(e){return u.$set(e),e},"+=":function(e){return u.$set(u.$get()+e),u.$get()},"-=":function(e){return u.$set(u.$get()-e),u.$get()},"*=":function(e){return u.$set(u.$get()*e),u.$get()},"**=":function(e){return u.$set(Math.pow(u.$get(),e)),u.$get()},"/=":function(e){return u.$set(u.$get()/e),u.$get()},"%=":function(e){return u.$set(u.$get()%e),u.$get()},"|=":function(e){return u.$set(u.$get()|e),u.$get()},"<<=":function(e){return u.$set(u.$get()<<e),u.$get()},">>=":function(e){return u.$set(u.$get()>>e),u.$get()},">>>=":function(e){return u.$set(u.$get()>>>e),u.$get()},"^=":function(e){return u.$set(u.$get()^e),u.$get()},"&=":function(e){return u.$set(u.$get()&e),u.$get()}}[e.operator](f(e.right,r))},e[ke]=function(r,t){return {"||":function(){return f(r.left,t)||f(r.right,t)},"&&":function(){return f(r.left,t)&&f(r.right,t)},"??":function(){var e;return null!=(e=f(r.left,t))?e:f(r.right,t)}}[r.operator]()},e[E]=function(e,r){var t=e.object,n=e.property;return e.computed?f(t,r)[f(n,r)]:f(t,r)[n.name]},e[Me]=function(e,r){return f(e.test,r)?f(e.consequent,r):f(e.alternate,r)},e[S]=function(e,r){var t=null,n=null;if(e.callee.type===E){var o=e.callee,a=o.object,i=o.property,o=o.computed,t=f(a,r),a=o?rr[i.type](i,r):i.name;if(null==t)throw l(c.notHasSomeProperty,a,e,s.source);n=t[a];}else t=r.$find("this").$get(),n=f(e.callee,r);if("function"!=typeof n)throw l(c.notCallableFunction,n,e,s.source);return er.includes(n)&&(t=null),n.apply(t,e.arguments.map(function(e){return f(e,r)}))},e[be]=function(e,r){var t=f(e.callee,r),e=e.arguments.map(function(e){return f(e,r)});return new(t.bind.apply(t,function(e,r,t){if(t||2===arguments.length)for(var n,o=0,a=r.length;o<a;o++)!n&&o in r||((n=n||Array.prototype.slice.call(r,0,o))[o]=r[o]);return e.concat(n||Array.prototype.slice.call(r))}([void 0],e,!1)))},e[ve]=function(e,r){for(var t=0,n=e.expressions;t<n.length;t++)var o=f(n[t],r);return o},e[Oe]=function(e,r){throw f(e.argument,r)},e[Re]=function(r,t){try{return f(r.block,t)}catch(e){var n,o;if(r.handler)return n=r.handler.param,(o=new ir("block",t)).invasived=!0,o.$const(null==n?void 0:n.name,e),f(r.handler,o);throw e}finally{if(r.finalizer)return f(r.finalizer,t)}},e[Fe]=function(e,r){return f(e.body,r)},e[Ie]=function(e,r){for(var t=f(e.discriminant,r),n=new ir("switch",r),o=!1,a=0,i=e.cases;a<i.length;a++){var u=i[a];if(o=o||u.test&&t!==f(u.test,n)?o:!0){u=f(u,n);if(u===Ge)break;if(u===Ke||u===Ze)return u}}},e[Ae]=function(e,r){for(var t=0,n=e.consequent;t<n.length;t++){var o=f(n[t],r);if(o===Ge||o===Ke||o===Ze)return o}},e[Te]=function(e,r){for(;f(e.test,r);){var t=new ir("loop",r),t=(t.invasived=!0,f(e.body,t));if(t===Ge)break;if(t!==Ke&&t===Ze)return t}},e[re]=function(e,r){do{var t=new ir("loop",r),t=(t.invasived=!0,f(e.body,t));if(t===Ge)break;if(t!==Ke&&t===Ze)return t}while(f(e.test,r))},e[t]=function(e,r){return rr[Z](e,r,!0)},e[Ne]=function(n,o,e){void 0===e&&(e=!1);function r(e){var r,t=new ir("loop",o);return t.invasived=!0,i.type===A?(r=i.name,t.$declar(a,r,e)):rr[i.type](i,t,a,e),f(n.body,t)}var a=n.left.kind,i=n.left.declarations[0].id,t=f(n.right,o);if(e)for(var u,s=0;s<t.length;s++){if((u=r(t[s]))===Ge)break;if(u!==Ke&&u===Ze)return u}else for(var c in t){if((u=r(c))===Ge)break;if(u!==Ke&&u===Ze)return u}},e[me]=function(t,n){return t.quasis.map(function(e,r){return e.tail?e.value.raw:e.value.raw+f(t.expressions[r],n)}).join("")},e[_e]=function(e,r){var t=f(e.source,r),r=r.$find("$$import");if(r)return r.$get()(t);throw l(c.notHasImport,"$$import",e,s.source)},e[Pe]=function(e,r){return rr[Ne](e,r,!0)},e),tr=(nr.prototype.$set=function(e){return "const"!==this.value&&(this.value=e,!0)},nr.prototype.$get=function(){return this.value},nr);function nr(e,r){this.value=r,this.kind=e;}ur.prototype.$find=function(e){var r=this.prefix+e;return this.content.hasOwnProperty(r)?this.content[r]:this.parent?this.parent.$find(e):null},ur.prototype.$let=function(e,r){e=this.prefix+e;return !this.content[e]&&(this.content[e]=new tr("let",r),!0)},ur.prototype.$const=function(e,r){e=this.prefix+e;return !this.content[e]&&(this.content[e]=new tr("const",r),!0)},ur.prototype.$var=function(e,r){for(var e=this.prefix+e,t=this;null!==t.parent&&"function"!==t.type;)t=t.parent;return !t.content[e]&&(this.content[e]=new tr("var",r),!0)},ur.prototype.$declar=function(e,r,t){var n=this;return {var:function(){return n.$var(r,t)},let:function(){return n.$let(r,t)},const:function(){return n.$const(r,t)}}[e]()};var I,O,or,ar,ir=ur;function ur(e,r){this.content={},this.prefix="",this.invasived=!1,this.type=e,this.parent=r||null;}function f(r,e,t){t=(s=t?t:s).traceId++;s.traceStack.push(t);try{var n=function(e,r){if(rr[e.type])return r=rr[e.type](e,r),s.currentNode=e,r;throw l(c.notSupportNode,e.type,e,s.source)}(r,e);return s.traceStack.pop(),n}catch(e){if(e.isEvaluateError)throw e;if(s.traceStack[s.traceStack.length-1]===t)throw l(c.runTimeError,null==e?void 0:e.message,r,s.source);throw e}}const sr={version:"0.12.x"};sr.parse=function(e,r){O=String(e),or=O.length,lr(r),rn();var e=I.locations?[p,en()]:p,t=(Cr(),I.program||y(e)),n=!0;for(t.body||(t.body=[]);R!==Rr;){var o=zn(!0,!0);t.body.push(o),n&&In(o)&&Cn(!0),n=!1;}return M(),z(t,i)};var cr=sr.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1};function lr(e){for(var r in I={},cr)I[r]=(e&&Dn(e,r)?e:cr)[r];ar=I.sourceFile||null,zt=6<=I.ecmaVersion?_t:Mt;}sr.parseExpressionAt=function(e,r,t){return O=String(e),or=O.length,lr(t),rn(r),Cr(),W()};var p,V,fr,pr,dr,R,F,hr,mr,yr,a,vr,gr,br,wr,xr,T,kr,Er=sr.getLineInfo=function(e,r){for(var t=1,n=0;;){Qt.lastIndex=n;var o=Qt.exec(e);if(!(o&&o.index<r))break;++t,n=o.index+o[0].length;}return {line:t,column:r-n}};function $r(){this.type=R,this.value=F,this.start=V,this.end=fr,I.locations&&(this.loc=new An,this.loc.end=dr),I.ranges&&(this.range=[V,fr]);}function Cr(){vr=gr=p,I.locations&&(br=en()),wr=xr=!1,T=[],pn(),mn();}function D(e,r){var t=Er(O,e),r=(r+=" ("+t.line+":"+t.column+")",new SyntaxError(r));throw r.pos=e,r.loc=t,r.raisedAt=p,r}sr.Token=$r,sr.tokenize=function(e,r){function t(){return gr=fr,mn(),new $r}return O=String(e),or=O.length,lr(r),rn(),pn(),t.jumpTo=function(e,r){var t;if(p=e,I.locations)for(yr=1,a=Qt.lastIndex=0;(t=Qt.exec(O))&&t.index<e;)++yr,a=t.index+t[0].length;mr=!!r,pn();},t.current=function(){return new $r},"undefined"!=typeof Symbol&&(t[Symbol.iterator]=function(){return {next:function(){var e=t();return {done:e.type===Rr,value:e}}}}),t.options=I,t};var Sr,Ar=[],Ir={type:"num"},Or={type:"regexp"},Vr={type:"string"},j={type:"name"},Rr={type:"eof"},Fr={keyword:"break"},Tr={keyword:"case",beforeExpr:!0},Dr={keyword:"catch"},jr={keyword:"continue"},Ur={keyword:"debugger"},Nr={keyword:"default"},Pr={keyword:"do",isLoop:!0},qr={keyword:"else",beforeExpr:!0},Br={keyword:"finally"},Lr={keyword:"for",isLoop:!0},Mr={keyword:"function"},_r={keyword:"if"},zr={keyword:"return",beforeExpr:!0},Hr={keyword:"switch"},Yr={keyword:"throw",beforeExpr:!0},Xr={keyword:"try"},Jr={keyword:"var"},Wr={keyword:"let"},Qr={keyword:"const"},Gr={keyword:"while",isLoop:!0},Kr={keyword:"with"},Zr={keyword:"new",beforeExpr:!0},et={keyword:"this"},rt={keyword:"class"},tt={keyword:"extends",beforeExpr:!0},nt={keyword:"export"},ot={keyword:"import"},at={keyword:"yield",beforeExpr:!0},it={keyword:"null",atomValue:null},ut={keyword:"true",atomValue:!0},st={keyword:"false",atomValue:!1},ct={keyword:"in",binop:7,beforeExpr:!0},lt={break:Fr,case:Tr,catch:Dr,continue:jr,debugger:Ur,default:Nr,do:Pr,else:qr,finally:Br,for:Lr,function:Mr,if:_r,return:zr,switch:Hr,throw:Yr,try:Xr,var:Jr,let:Wr,const:Qr,while:Gr,with:Kr,null:it,true:ut,false:st,new:Zr,in:ct,instanceof:{keyword:"instanceof",binop:7,beforeExpr:!0},this:et,typeof:{keyword:"typeof",prefix:!0,beforeExpr:!0},void:{keyword:"void",prefix:!0,beforeExpr:!0},delete:{keyword:"delete",prefix:!0,beforeExpr:!0},class:rt,extends:tt,export:nt,import:ot,yield:at},ft={type:"[",beforeExpr:!0},pt={type:"]"},U={type:"{",beforeExpr:!0},N={type:"}"},P={type:"(",beforeExpr:!0},q={type:")"},B={type:",",beforeExpr:!0},L={type:";",beforeExpr:!0},dt={type:":",beforeExpr:!0},ht={type:"."},mt={type:"?",beforeExpr:!0},yt={type:"=>",beforeExpr:!0},vt={type:"template"},gt={type:"...",beforeExpr:!0},bt={type:"`"},wt={type:"${",beforeExpr:!0},xt={binop:10,beforeExpr:!0},kt={isAssign:!0,beforeExpr:!0},Et={isAssign:!0,beforeExpr:!0},$t={postfix:!0,prefix:!0,isUpdate:!0},Ct={prefix:!0,beforeExpr:!0},St={binop:1,beforeExpr:!0},At={binop:2,beforeExpr:!0},It={binop:3,beforeExpr:!0},Ot={binop:4,beforeExpr:!0},Vt={binop:5,beforeExpr:!0},Rt={binop:6,beforeExpr:!0},Ft={binop:7,beforeExpr:!0},Tt={binop:8,beforeExpr:!0},Dt={binop:9,prefix:!0,beforeExpr:!0},jt={binop:10,beforeExpr:!0},Ut={binop:10,beforeExpr:!0};for(Sr in sr.tokTypes={bracketL:ft,bracketR:pt,braceL:U,braceR:N,parenL:P,parenR:q,comma:B,semi:L,colon:dt,dot:ht,ellipsis:gt,question:mt,slash:xt,eq:kt,name:j,eof:Rr,num:Ir,regexp:Or,string:Vr,arrow:yt,template:vt,star:Ut,assign:Et,backQuote:bt,dollarBraceL:wt},lt)sr.tokTypes["_"+Sr]=lt[Sr];function Nt(r){return r=r.split(" "),e=>r.includes(e)}var Pt=Nt("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),qt=Nt("class enum extends super const export import"),Bt=Nt("implements interface let package private protected public static yield"),Lt=Nt("eval arguments"),e="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",Mt=Nt(e),_t=Nt(e+" let const class extends export import yield"),zt=Mt,Ht=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,e="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",Yt=new RegExp("["+e+"]"),Xt=new RegExp("["+e+"̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧙ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿]"),Jt=/[\n\r\u2028\u2029]/;function Wt(e){return 10===e||13===e||8232===e||8233==e}var Qt=/\r\n|[\n\r\u2028\u2029]/g,Gt=sr.isIdentifierStart=function(e){return e<65?36===e:e<91||(e<97?95===e:e<123||170<=e&&Yt.test(String.fromCharCode(e)))},Kt=sr.isIdentifierChar=function(e){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||170<=e&&Xt.test(String.fromCharCode(e))))};function Zt(e,r){this.line=e,this.column=r;}function en(){return new Zt(yr,p-a)}function rn(e){e?(p=e,a=Math.max(0,O.lastIndexOf("\n",e)),yr=O.slice(0,a).split(Jt).length):(yr=1,p=a=0),R=Rr,hr=[tn],kr=!(mr=!0),0===p&&I.allowHashBang&&"#!"===O.slice(0,2)&&fn(2);}var tn={token:"{",isExpr:!(Zt.prototype.offset=function(e){return new Zt(this.line,this.column+e)})},nn={token:"{",isExpr:!0},on={token:"${",isExpr:!0},an={token:"(",isExpr:!1},un={token:"(",isExpr:!0},sn={token:"`",isExpr:!0},cn={token:"function",isExpr:!0};function ln(){return hr[hr.length-1]}function d(e,r){fr=p,I.locations&&(dr=en());var t,n=R,o=!1;F=r,(R=e)===q||e===N?(r=hr.pop())===on?o=!0:mr=r===tn&&ln()===cn?(hr.pop(),!1):!(r&&r.isExpr):e===U?(hr.push(((r=n)===dt&&"{"==(t=ln()).token?t.isExpr:r===zr?!Jt.test(O.slice(gr,V)):r!==qr&&r!==L&&r!==Rr&&(r==U?ln()!==tn:mr))?nn:tn),mr=!0):e===wt?(hr.push(on),mr=!0):e==P?(t=n===_r||n===Lr||n===Kr||n===Gr,hr.push(t?an:un),mr=!0):e!=$t&&(mr=(!e.keyword||n!=ht)&&(e==Mr?(ln()!==tn&&hr.push(cn),!1):e===bt?(ln()===sn?hr.pop():(hr.push(sn),o=!0),!1):e.beforeExpr)),o||pn();}function fn(e){for(var r=O.charCodeAt(p+=e);p<or&&10!==r&&13!==r&&8232!==r&&8233!==r;)++p,r=O.charCodeAt(p);}function pn(){for(;p<or;){var e,r=O.charCodeAt(p);if(32===r)++p;else if(13===r)++p,10===(e=O.charCodeAt(p))&&++p,I.locations&&(++yr,a=p);else if(10===r||8232===r||8233===r)++p,I.locations&&(++yr,a=p);else if(8<r&&r<14)++p;else if(47===r)if(42===(e=O.charCodeAt(p+1))){t=o=n=void 0;var t,n=p,o=O.indexOf("*/",p+=2);if(-1===o&&D(p-2,"Unterminated comment"),p=o+2,I.locations)for(Qt.lastIndex=n;(t=Qt.exec(O))&&t.index<p;)++yr,a=t.index+t[0].length;}else {if(47!==e)break;fn(2);}else if(160===r)++p;else {if(!(5760<=r&&Ht.test(String.fromCharCode(r))))break;++p;}}}function dn(){var e=O.charCodeAt(p+1);if(mr){for(var r,t,n="",o=++p;;){or<=p&&D(o,"Unterminated regular expression");var a=O.charAt(p);if(Jt.test(a)&&D(o,"Unterminated regular expression"),r)r=!1;else {if("["===a)t=!0;else if("]"===a&&t)t=!1;else if("/"===a&&!t)break;r="\\"===a;}++p;}var i,n=O.slice(o,p),u=(++p,En()),s=n;u&&(i=/^[gmsiy]*$/,(i=6<=I.ecmaVersion?/^[gmsiyu]*$/:i).test(u)||D(o,"Invalid regular expression flag"),0<=u.indexOf("u")&&!vn&&(s=s.replace(/\\u\{([0-9a-fA-F]{5,6})\}/g,"x").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x")));try{new RegExp(s);}catch(e){e instanceof SyntaxError&&D(o,"Error parsing regular expression: "+e.message),D(e);}try{var c=new RegExp(n,u);}catch(e){c=null;}return d(Or,{pattern:n,flags:u,value:c})}return 61===e?h(Et,2):h(xt,1)}function hn(e){switch(e){case 46:var r=O.charCodeAt(p+1);if(48<=r&&r<=57)return wn(!0);var t=O.charCodeAt(p+2);return 6<=I.ecmaVersion&&46===r&&46===t?(p+=3,d(gt)):(++p,d(ht));case 40:return ++p,d(P);case 41:return ++p,d(q);case 59:return ++p,d(L);case 44:return ++p,d(B);case 91:return ++p,d(ft);case 93:return ++p,d(pt);case 123:return ++p,d(U);case 125:return ++p,d(N);case 58:return ++p,d(dt);case 63:return ++p,d(mt);case 96:return 6<=I.ecmaVersion&&(++p,d(bt));case 48:r=O.charCodeAt(p+1);if(120===r||88===r)return bn(16);if(6<=I.ecmaVersion){if(111===r||79===r)return bn(8);if(98===r||66===r)return bn(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return wn(!1);case 34:case 39:for(var n=e,o="",a=++p;;){or<=p&&D(V,"Unterminated string constant");var i=O.charCodeAt(p);if(i===n)break;92===i?(o=(o+=O.slice(a,p))+xn(),a=p):(Wt(i)&&D(V,"Unterminated string constant"),++p);}return o+=O.slice(a,p++),d(Vr,o);case 47:return dn();case 37:case 42:return t=e,61===O.charCodeAt(p+1)?h(Et,2):h(42===t?Ut:jt,1);case 124:case 38:return l=e,(f=O.charCodeAt(p+1))===l?h(124===l?St:At,2):61===f?h(Et,2):h(124===l?It:Vt,1);case 94:return 61===O.charCodeAt(p+1)?h(Et,2):h(Ot,1);case 43:case 45:return f=e,(l=O.charCodeAt(p+1))===f?45==l&&62==O.charCodeAt(p+2)&&Jt.test(O.slice(gr,p))?(fn(3),pn(),mn()):h($t,2):61===l?h(Et,2):h(Dt,1);case 60:case 62:return u=e,s=O.charCodeAt(p+1),c=1,s===u?(c=62===u&&62===O.charCodeAt(p+2)?3:2,61===O.charCodeAt(p+c)?h(Et,c+1):h(Tt,c)):33==s&&60==u&&45==O.charCodeAt(p+2)&&45==O.charCodeAt(p+3)?(fn(4),pn(),mn()):(61===s&&(c=61===O.charCodeAt(p+2)?3:2),h(Ft,c));case 61:case 33:return u=e,61===(s=O.charCodeAt(p+1))?h(Rt,61===O.charCodeAt(p+2)?3:2):61===u&&62===s&&6<=I.ecmaVersion?(p+=2,d(yt)):h(61===u?kt:Ct,1);case 126:return h(Ct,1)}var u,s,c,l,f;return !1}function mn(){if(V=p,I.locations&&(pr=en()),or<=p)return d(Rr);if(ln()!==sn){var e=O.charCodeAt(p);if(Gt(e)||92===e)return $n();var r=hn(e);if(!1===r){e=String.fromCharCode(e);if("\\"===e||Yt.test(e))return $n();D(p,"Unexpected character '"+e+"'");}return r}for(var t="",n=p;;){or<=p&&D(V,"Unterminated template");var o=O.charCodeAt(p);if(96===o||36===o&&123===O.charCodeAt(p+1))return p===V&&R===vt?36===o?(p+=2,d(wt)):(++p,d(bt)):(t+=O.slice(n,p),d(vt,t));92===o?(t=(t+=O.slice(n,p))+xn(),n=p):Wt(o)?(t+=O.slice(n,p),++p,13===o&&10===O.charCodeAt(p)?(++p,t+="\n"):t+=String.fromCharCode(o),I.locations&&(++yr,a=p),n=p):++p;}}function h(e,r){var t=O.slice(p,p+r);p+=r,d(e,t);}var yn,vn=!1;try{new RegExp("￿","u"),vn=!0;}catch(e){}function gn(e,r){for(var t=p,n=0,o=0,a=null==r?1/0:r;o<a;++o){var i=O.charCodeAt(p),i=97<=i?i-97+10:65<=i?i-65+10:48<=i&&i<=57?i-48:1/0;if(e<=i)break;++p,n=n*e+i;}return p===t||null!=r&&p-t!==r?null:n}function bn(e){p+=2;var r=gn(e);return null==r&&D(V+2,"Expected number in radix "+e),Gt(O.charCodeAt(p))&&D(p,"Identifier directly after number"),d(Ir,r)}function wn(e){var r,t=p,n=!1,o=48===O.charCodeAt(p),e=(e||null!==gn(10)||D(t,"Invalid number"),46===O.charCodeAt(p)&&(++p,gn(10),n=!0),O.charCodeAt(p)),e=(69!==e&&101!==e||(43!==(e=O.charCodeAt(++p))&&45!==e||++p,null===gn(10)&&D(t,"Invalid number"),n=!0),Gt(O.charCodeAt(p))&&D(p,"Identifier directly after number"),O.slice(t,p));return n?r=parseFloat(e):o&&1!==e.length?/[89]/.test(e)||kr?D(t,"Invalid number"):r=parseInt(e,8):r=parseInt(e,10),d(Ir,r)}function xn(){for(var e,r=O.charCodeAt(++p),t=(t=/^[0-7]+/.exec(O.slice(p,p+3)))&&t[0];t&&255<parseInt(t,8);)t=t.slice(0,-1);if(++p,t="0"===t?null:t)return kr&&D(p-2,"Octal literal in strict mode"),p+=t.length-1,String.fromCharCode(parseInt(t,8));switch(r){case 110:return "\n";case 114:return "\r";case 120:return String.fromCharCode(kn(2));case 117:return 123===O.charCodeAt(p)?(I.ecmaVersion<6&&X(),++p,e=kn(O.indexOf("}",p)-p),++p,1114111<e&&X()):e=kn(4),e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023));case 116:return "\t";case 98:return "\b";case 118:return "\v";case 102:return "\f";case 48:return "\0";case 13:10===O.charCodeAt(p)&&++p;case 10:return I.locations&&(a=p,++yr),"";default:return String.fromCharCode(r)}}function kn(e){e=gn(16,e);return null===e&&D(V,"Bad character escape sequence"),e}function En(){for(var e="",r=!(yn=!1),t=p;p<or;){var n=O.charCodeAt(p);if(Kt(n))++p;else {if(92!==n)break;yn=!0,e+=O.slice(t,p),117!=O.charCodeAt(++p)&&D(p,"Expecting Unicode escape sequence \\uXXXX"),++p;var n=kn(4),o=String.fromCharCode(n);o||D(p-1,"Invalid Unicode escape"),(r?Gt:Kt)(n)||D(p-4,"Invalid Unicode escape"),e+=o,t=p;}r=!1;}return e+O.slice(t,p)}function $n(){var e=En(),r=j;return d(r=!yn&&zt(e)?lt[e]:r,e)}function M(){vr=V,gr=fr,br=dr,mn();}function Cn(e){if(kr=e,R===Ir||R===Vr){if(p=V,I.locations)for(;p<a;)a=O.lastIndexOf("\n",a-2)+1,--yr;pn(),mn();}}function Sn(){this.type=null,this.start=V,this.end=null;}function An(){this.start=pr,(this.end=null)!==ar&&(this.source=ar);}function _(){var e=new Sn;return I.locations&&(e.loc=new An),I.directSourceFile&&(e.sourceFile=I.directSourceFile),I.ranges&&(e.range=[V,0]),e}function m(){return I.locations?[V,pr]:V}function y(e){var r=new Sn,t=e;return I.locations&&(r.loc=new An,r.loc.start=t[1],t=e[0]),r.start=t,I.directSourceFile&&(r.sourceFile=I.directSourceFile),I.ranges&&(r.range=[t,0]),r}function z(e,r){return e.type=r,e.end=gr,I.locations&&(e.loc.end=br),I.ranges&&(e.range[1]=gr),e}function In(e){return 5<=I.ecmaVersion&&e.type===ee&&e.expression.type===v&&"use strict"===e.expression.value}function H(e){return R===e&&(M(),!0)}function On(e){return R===j&&F===e}function Vn(e){return F===e&&H(j)}function Rn(e){Vn(e)||X();}function Fn(){return !I.strictSemicolons&&(R===Rr||R===N||Jt.test(O.slice(gr,V)))}function Tn(){H(L)||Fn()||X();}function Y(e){H(e)||X();}function X(e){D(null!=e?e:V,"Unexpected token");}function Dn(e,r){return Object.prototype.hasOwnProperty.call(e,r)}function jn(e,r){if(6<=I.ecmaVersion&&e)switch(e.type){case A:case b:case u:case o:break;case w:e.type=b;for(var t=0;t<e.properties.length;t++){var n=e.properties[t];"init"!==n.kind&&D(n.key.start,"Object pattern can't contain getter or setter"),jn(n.value,r);}break;case x:e.type=u,Un(e.elements,r);break;case k:"="===e.operator?e.type=o:D(e.left.end,"Only '=' operator can be used for specifying default value.");break;case E:if(!r)break;default:D(e.start,"Assigning to rvalue");}return e}function Un(e,r){if(e.length){for(var t=0;t<e.length-1;t++)jn(e[t],r);var n=e[e.length-1];switch(n.type){case $:break;case C:n.type=$;var o=n.argument;jn(o,r),o.type!==A&&o.type!==E&&o.type!==u&&X(o.start);break;default:jn(n,r);}}return e}function Nn(){var e=_();return M(),e.argument=(R===j||R===ft?Pn:X)(),z(e,$)}function Pn(){if(I.ecmaVersion<6)return G();switch(R){case j:return G();case ft:var e=_();return M(),e.elements=qn(pt,!0),z(e,u);case U:return to(!0);default:X();}}function qn(e,r){for(var t=[],n=!0;!H(e);){if(n?n=!1:Y(B),R===gt){t.push(Nn()),Y(e);break}t.push(r&&R===B?null:Bn());}return t}function Bn(e,r){if(e=e||m(),r=r||Pn(),!H(kt))return r;e=y(e);return e.operator="=",e.left=r,e.right=Q(),z(e,o)}function Ln(e,r){switch(e.type){case A:(Bt(e.name)||Lt(e.name))&&D(e.start,"Defining '"+e.name+"' in strict mode"),Dn(r,e.name)&&D(e.start,"Argument name clash in strict mode"),r[e.name]=!0;break;case b:for(var t=0;t<e.properties.length;t++)Ln(e.properties[t].value,r);break;case u:for(t=0;t<e.elements.length;t++){var n=e.elements[t];n&&Ln(n,r);}break;case $:return Ln(e.argument,r)}}function J(e,r){switch(e.type){case A:kr&&(Lt(e.name)||Bt(e.name))&&D(e.start,(r?"Binding ":"Assigning to ")+e.name+" in strict mode");break;case E:r&&D(e.start,"Binding to member expression");break;case b:for(var t=0;t<e.properties.length;t++)J(e.properties[t].value,r);break;case u:for(t=0;t<e.elements.length;t++){var n=e.elements[t];n&&J(n,r);}break;case o:J(e.left);break;case $:J(e.argument);break;default:D(e.start,"Assigning to rvalue");}}sr.Node=Sn;var Mn={kind:"loop"},_n={kind:"switch"};function zn(e,r){var t,n=R,o=_();switch(n){case Fr:case jr:var a=o,i=n.keyword,u=i==Fr.keyword;M(),H(L)||Fn()?a.label=null:R!==j?X():(a.label=G(),Tn());for(var s=0;s<T.length;++s){var c=T[s];if(null==a.label||c.name===a.label.name){if(null!=c.kind&&(u||"loop"===c.kind))break;if(a.label&&u)break}}return s===T.length&&D(a.start,"Unsyntactic "+i),z(a,u?oe:ne);case Ur:return i=o,M(),Tn(),z(i,te);case Pr:var l=o;return M(),T.push(Mn),l.body=zn(!1),T.pop(),Y(Gr),l.test=Hn(),6<=I.ecmaVersion?H(L):Tn(),z(l,re);case Lr:var f,l=o;if(M(),T.push(Mn),Y(P),R===L)return Xn(l,null);if(R===Jr||R===Wr)return d=_(),p=R.keyword,f=R===Wr,M(),Wn(d,!0,p),z(d,$e),(!(R===ct||6<=I.ecmaVersion&&On("of"))||1!==d.declarations.length||f&&d.declarations[0].init?Xn:Jn)(l,d);var p={start:0},d=W(!0,p);return R===ct||6<=I.ecmaVersion&&On("of")?(jn(d),J(d),Jn(l,d)):(p.start&&X(p.start),Xn(l,d));case Mr:return !e&&6<=I.ecmaVersion&&X(),f=o,M(),ao(f,!0);case rt:return e||X(),co(o,!0);case _r:return p=o,M(),p.test=Hn(),p.consequent=zn(!1),p.alternate=H(qr)?zn(!1):null,z(p,Ce);case zr:d=o;return wr||I.allowReturnOutsideFunction||D(V,"'return' outside of function"),M(),H(L)||Fn()?d.argument=null:(d.argument=W(),Tn()),z(d,Se);case Hr:var h,m,y,v=o;for(M(),v.discriminant=Hn(),v.cases=[],Y(U),T.push(_n);R!=N;)R===Tr||R===Nr?(y=R===Tr,h&&z(h,Ae),v.cases.push(h=_()),h.consequent=[],M(),y?h.test=W():(m&&D(vr,"Multiple default clauses"),m=!0,h.test=null),Y(dt)):(h||X(),h.consequent.push(zn(!0)));return h&&z(h,Ae),M(),T.pop(),z(v,Ie);case Yr:var g=o;return M(),Jt.test(O.slice(gr,V))&&D(gr,"Illegal newline after throw"),g.argument=W(),Tn(),z(g,Oe);case Xr:var b,g=o;return M(),g.block=Yn(),g.handler=null,R===Dr&&(b=_(),M(),Y(P),b.param=Pn(),J(b.param,!0),Y(q),b.guard=null,b.body=Yn(),g.handler=z(b,Fe)),g.guardedHandlers=Ar,g.finalizer=H(Br)?Yn():null,g.handler||g.finalizer||D(g.start,"Missing catch or finally clause"),z(g,Re);case Wr:case Qr:e||X();case Jr:return b=o,t=n.keyword,M(),Wn(b,!1,t),Tn(),z(b,$e);case Gr:return t=o,M(),t.test=Hn(),T.push(Mn),t.body=zn(!1),T.pop(),z(t,Te);case Kr:return void D(V,"with now allow");case U:return Yn();case L:return w=o,M(),z(w,De);case nt:case ot:return r||I.allowImportExportEverywhere||D(V,"'import' and 'export' may only appear at the top level"),(n===ot?function(e){M(),R===Vr?(e.specifiers=[],e.source=Zn(),e.kind=""):(e.specifiers=function(){var e=[],r=!0;if(R===j)if((t=_()).id=G(),J(t.id,!0),t.name=null,t.default=!0,e.push(z(t,ue)),!H(B))return e;if(R===Ut)return t=_(),M(),Rn("as"),t.name=G(),J(t.name,!0),e.push(z(t,ie)),e;Y(U);for(;!H(N);){if(r)r=!1;else if(Y(B),I.allowTrailingCommas&&H(N))break;var t;(t=_()).id=G(!0),t.name=Vn("as")?G():null,J(t.name||t.id,!0),t.default=!1,e.push(z(t,ue));}return e}(),Rn("from"),e.source=(R===Vr?Zn:X)());return Tn(),z(e,se)}:function(e){if(M(),R===Jr||R===Qr||R===Wr||R===Mr||R===rt)e.declaration=zn(!0),e.default=!1,e.specifiers=null,e.source=null;else if(H(Nr)){var r=Q();if(r.id)switch(r.type){case Z:r.type=K;break;case de:r.type=pe;}e.declaration=r,e.default=!0,e.specifiers=null,e.source=null,Tn();}else {var t=R===Ut;e.declaration=null,e.default=!1,e.specifiers=function(){var e=[],r=!0;if(R===Ut){var t=_();M(),e.push(z(t,le));}else for(Y(U);!H(N);){if(r)r=!1;else if(Y(B),I.allowTrailingCommas&&H(N))break;(t=_()).id=G(R===Nr),t.name=Vn("as")?G(!0):null,e.push(z(t,ce));}return e}(),Vn("from")?e.source=(R===Vr?Zn:X)():(t&&X(),e.source=null),Tn();}return z(e,fe)})(o);default:var w=F,x=W();if(n===j&&x.type===A&&H(dt)){var k=o;var E=w;var $=x;for(var C=0;C<T.length;++C)T[C].name===E&&D($.start,"Label '"+E+"' is already declared");var S=R.isLoop?"loop":R===Hr?"switch":null;return T.push({name:E,kind:S}),k.body=zn(!0),T.pop(),k.label=$,z(k,je);}else return (S=o).expression=x,Tn(),z(S,ee)}}function Hn(){Y(P);var e=W();return Y(q),e}function Yn(e){var r,t=_(),n=!0;for(t.body=[],Y(U);!H(N);){var o=zn(!0);t.body.push(o),n&&e&&In(o)&&(r=kr,Cn(kr=!0)),n=!1;}return !1===r&&Cn(!1),z(t,Ue)}function Xn(e,r){return e.init=r,Y(L),e.test=R===L?null:W(),Y(L),e.update=R===q?null:W(),Y(q),e.body=zn(!1),T.pop(),z(e,qe)}function Jn(e,r){var t=R===ct?Ne:Pe;return M(),e.left=r,e.right=W(),Y(q),e.body=zn(!1),T.pop(),z(e,t)}function Wn(e,r,t){for(e.declarations=[],e.kind=t;;){var n=_();if(n.id=Pn(),J(n.id,!0),n.init=H(kt)?Q(r):t===Qr.keyword?X():null,e.declarations.push(z(n,Be)),!H(B))break}}function W(e,r){var t=m(),n=Q(e,r);if(R!==B)return n;var o=y(t);for(o.expressions=[n];H(B);)o.expressions.push(Q(e,r));return z(o,ve)}function Q(e,r){var t=!r&&(r={start:0},!0),n=m(),o=function(e,r){var t=m(),n=function(e,r){var t=m(),n=Qn(r);return r&&r.start?n:function e(r,t,n,o){var a=R.binop;if(null!=a&&(!o||R!==ct)){var i,u,s;if(n<a)return (i=y(t)).left=r,i.operator=F,u=R,M(),s=m(),i.right=e(Qn(),s,a,o),z(i,u===St||u===At?ke:xe),e(i,t,n,o)}return r}(n,t,-1,e)}(e,r);if(r&&r.start)return n;if(H(mt))return (r=y(t)).test=n,r.consequent=Q(),Y(dt),r.alternate=Q(e),z(r,Me);return n}(e,r);return R.isAssign?((n=y(n)).operator=F,n.left=R===kt?jn(o):o,r.start=0,J(o),M(),n.right=Q(e),z(n,k)):(t&&r.start&&X(r.start),o)}function Qn(e){var r;if(R.prefix)return t=_(),r=R.isUpdate,t.operator=F,t.prefix=!0,M(),t.argument=Qn(),e&&e.start&&X(e.start),r?J(t.argument):kr&&"delete"===t.operator&&t.argument.type===A&&D(t.start,"Deleting local variable in strict mode"),z(t,r?we:Ee);var t,n=m(),o=Gn(e);if(e&&e.start)return o;for(;R.postfix&&!Fn();)(t=y(n)).operator=F,t.prefix=!1,J(t.argument=o),M(),o=z(t,we);return o}function Gn(e){var r=m(),t=Zn(e);return e&&e.start?t:Kn(t,r)}function Kn(e,r,t){var n;return H(ht)?((n=y(r)).object=e,n.property=G(!0),n.computed=!1,Kn(z(n,E),r,t)):H(ft)?((n=y(r)).object=e,n.property=W(),n.computed=!0,Y(pt),Kn(z(n,E),r,t)):!t&&H(P)?((n=y(r)).callee=e,n.arguments=lo(q,!1),Kn(z(n,S),r,t)):R===bt?((n=y(r)).tag=e,n.quasi=ro(),Kn(z(n,Ve),r,t)):e}function Zn(e){switch(R){case et:var r=_();return M(),z(r,Le);case at:if(xr){var t=_();M(),H(L)||Fn()?(t.delegate=!1,t.argument=null):(t.delegate=H(Ut),t.argument=Q());return z(t,ae);}case j:var t=m(),n=G(R!==j);return !Fn()&&H(yt)?uo(y(t),[n]):n;case Or:return (r=_()).regex={pattern:F.pattern,flags:F.flags},r.value=F.value,r.raw=O.slice(V,fr),M(),z(r,v);case Ir:case Vr:return (r=_()).value=F,r.raw=O.slice(V,fr),M(),z(r,v);case it:case ut:case st:return (r=_()).value=R.atomValue,r.raw=R.keyword,M(),z(r,v);case P:n=m();if(6<=I.ecmaVersion){M();for(var o,a,i=m(),u=[],s=!0,c={start:0};R!==q;){if(s?s=!1:Y(B),R===gt){o=V,u.push(Nn());break}R!==P||a||(a=V),u.push(Q(!1,c));}var l=m();if(Y(q),!Fn()&&H(yt))return a&&X(a),uo(y(n),u);u.length||X(vr),o&&X(o),c.start&&X(c.start),1<u.length?((f=y(i)).expressions=u,function(e,r,t){I.locations&&(e.loc.end=t[1],t=t[0]),e.type=r,e.end=t,I.ranges&&(e.range[1]=t);}(f,ve,l)):f=u[0];}else f=Hn();return I.preserveParens?((i=y(n)).expression=f,z(i,ge)):f;case ft:r=_();return M(),r.elements=lo(pt,!0,!0,e),z(r,x);case U:return to(!1,e);case Mr:r=_();return M(),ao(r,!1);case rt:return co(_(),!1);case Zr:l=_(),i=(M(),m());return l.callee=Kn(Zn(),i,!0),H(P)?l.arguments=lo(q,!1):l.arguments=Ar,z(l,be);case bt:return ro();case ot:return f=_(),M(),f.source=Zn(),z(f,_e);default:X();}var f;}function eo(){var e=_();return e.value={raw:O.slice(V,fr),cooked:F},M(),e.tail=R===bt,z(e,"TemplateElement")}function ro(){var e=_(),r=(M(),e.expressions=[],eo());for(e.quasis=[r];!r.tail;)Y(wt),e.expressions.push(W()),Y(N),e.quasis.push(r=eo());return M(),z(e,me)}function to(e,r){var t=_(),n=!0,o={};for(t.properties=[],M();!H(N);){if(n)n=!1;else if(Y(B),I.allowTrailingCommas&&H(N))break;var a,i,u=_();6<=I.ecmaVersion&&(u.method=!1,u.shorthand=!1,(e||r)&&(i=m()),e||(a=H(Ut))),no(u),H(dt)?(u.value=e?Bn():Q(!1,r),u.kind="init"):6<=I.ecmaVersion&&R===P?(e&&X(),u.kind="init",u.method=!0,u.value=io(a)):5<=I.ecmaVersion&&!u.computed&&u.key.type===A&&("get"===u.key.name||"set"===u.key.name)&&R!=B&&R!=N?((a||e)&&X(),u.kind=u.key.name,no(u),u.value=io(!1)):6<=I.ecmaVersion&&!u.computed&&u.key.type===A?(u.kind="init",e?u.value=Bn(i,u.key):R===kt&&r?(r.start||(r.start=V),u.value=Bn(i,u.key)):u.value=u.key,u.shorthand=!0):X(),!function(e,r){if(!(6<=I.ecmaVersion)){var t,n=e.key;switch(n.type){case A:t=n.name;break;case v:t=String(n.value);break;default:return}var o,a,e=e.kind||"init";Dn(r,t)?(o=r[t],a="init"!==e,(!kr&&!a||!o[e])&&a^o.init||D(n.start,"Redefinition of property")):o=r[t]={init:!1,get:!1,set:!1},o[e]=!0;}}(u,o),t.properties.push(z(u,"Property"));}return z(t,e?b:w)}function no(e){if(6<=I.ecmaVersion){if(H(ft))return e.computed=!0,e.key=W(),void Y(pt);e.computed=!1;}e.key=R===Ir||R===Vr?Zn():G(!0);}function oo(e){e.id=null,6<=I.ecmaVersion&&(e.generator=!1,e.expression=!1);}function ao(e,r,t){return oo(e),6<=I.ecmaVersion&&(e.generator=H(Ut)),!r&&R!==j||(e.id=G()),Y(P),e.params=qn(q,!1),so(e,t),z(e,r?K:Z)}function io(e){var r=_();return oo(r),Y(P),r.params=qn(q,!1),e=6<=I.ecmaVersion&&(r.generator=e,!0),so(r,e),z(r,Z)}function uo(e,r){return oo(e),e.params=Un(r,!0),so(e,!0),z(e,t)}function so(e,r){var t,n,o,r=r&&R!==U;if(r?(e.body=Q(),e.expression=!0):(t=wr,n=xr,o=T,wr=!0,xr=e.generator,T=[],e.body=Yn(!0),e.expression=!1,wr=t,xr=n,T=o),kr||!r&&e.body.body.length&&In(e.body.body[0])){var a={};e.id&&Ln(e.id,{});for(var i=0;i<e.params.length;i++)Ln(e.params[i],a);}}function co(e,r){M(),e.id=R===j?G():r?X():null,e.superClass=H(tt)?Gn():null;var t,n,o=_();for(o.body=[],Y(U);!H(N);)H(L)||(t=_(),n=H(Ut),no(t),R===P||t.computed||t.key.type!==A||"static"!==t.key.name?t.static=!1:(n&&X(),t.static=!0,n=H(Ut),no(t)),R===P||t.computed||t.key.type!==A||"get"!==t.key.name&&"set"!==t.key.name?t.kind="":(n&&X(),t.kind=t.key.name,no(t)),t.value=io(n),o.body.push(z(t,ye)));return e.body=z(o,he),z(e,r?pe:de)}function lo(e,r,t,n){for(var o,a,i=[],u=!0;!H(e);){if(u)u=!1;else if(Y(B),r&&I.allowTrailingCommas&&H(e))break;t&&R===B?i.push(null):R===gt?i.push((o=n,a=void 0,a=_(),M(),a.argument=Q(o),z(a,C))):i.push(Q(!1,n));}return i}function G(e){var r=_();return e&&"everywhere"==I.forbidReserved&&(e=!1),R===j?(!e&&(I.forbidReserved&&(3===I.ecmaVersion?Pt:qt)(F)||kr&&Bt(F))&&-1==O.slice(V,fr).indexOf("\\")&&D(V,"The keyword '"+F+"' is reserved"),r.name=F):e&&R.keyword?r.name=R.keyword:X(),M(),z(r,A)}var fo={console:console,setTimeout:setTimeout,setInterval:setInterval,clearTimeout:clearTimeout,clearInterval:clearInterval,encodeURI:encodeURI,encodeURIComponent:encodeURIComponent,decodeURI:decodeURI,decodeURIComponent:decodeURIComponent,Infinity:1/0,NaN:NaN,isFinite:isFinite,isNaN:isNaN,parseFloat:parseFloat,parseInt:parseInt,Object:Object,Boolean:Boolean,Error:Error,EvalError:EvalError,RangeError:RangeError,ReferenceError:ReferenceError,SyntaxError:SyntaxError,TypeError:TypeError,URIError:URIError,Number:Number,Math:Math,Date:Date,String:String,RegExp:RegExp,Array:Array,JSON:JSON,Promise:Promise},po=(ho.prototype.run=function(e,r){void 0===r&&(r={}),this.source=e,this.initScope(r);r=sr.parse(e,{locations:!0,ecmaVersion:6});try{f(r,this.mainScope,this);}catch(e){throw e}return this.mainScope.$find("exports").value},ho.prototype.initScope=function(r){var t=this;this.mainScope=new ir("block"),this.mainScope.$const("exports",{}),this.mainScope.$const("this",this),Object.keys(fo).forEach(function(e){t.mainScope.$const(e,fo[e]);}),Object.keys(r).forEach(function(e){t.mainScope.$const(e,r[e]);});},ho);function ho(){this.source="",this.traceId=0,this.traceStack=[],this.mainScope=new ir("block"),this.currentNode=null;}function mo(e,r){return (new po).run(e,r)}

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
        var flag = this.$updater.shouldUpdate(this.props, this.state);
        flag && this.$updater.update(callback);
    };
    NaruseComponent.prototype.componentDidMount = function () { };
    NaruseComponent.prototype.componentDidUpdate = function () { };
    NaruseComponent.prototype.componentWillUnmount = function () { };
    NaruseComponent.prototype.render = function () { };
    return NaruseComponent;
}());
/** 判断是否是NaruseComponent */
var isNaruseComponent = function (obj) { return obj instanceof NaruseComponent; };

/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */
var vnodeSpecialMap = {
    text: function (props, childNodes) {
        return { content: childNodes ? childNodes[0] : '' };
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
        if (typeof child === 'string' || typeof child === 'number')
            return { naruseType: 'text', content: child };
        return child;
    });
    var node = (__assign(__assign(__assign({ naruseType: type }, props), { childNodes: childNodes }), newNode));
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
            if (res.hasOwnProperty('data')) {
                data = res.data;
            }
            else if (res.hasOwnProperty('APDataStorage')) {
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
// naruse模块内容
var Naruse = __assign(__assign(__assign({ Component: NaruseComponent, getDeferred: getDeferred, globalEvent: globalEvent, EventBus: EventBus, env: {
        clientName: 'alipay',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'alipay',
    }, version: version }, my), apis), { withPage: withPage, unsafe_run: mo });
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
            exports = mo(code, __assign(__assign({ h: createElement, Naruse: Naruse, my: typeof my === 'object' ? my : {} }, baseCtx), ctx));
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

// naruse事件中心
/** 允许继续冒泡的事件 */
var allowPropagetionEventNames = ['onLongClick', 'onClick'];
/**
 * @description 为元素生成随机id
 * @author CHC
 * @date 2022-02-23 09:02:25
 * @param {*} randomLength
 * @returns {*}
 */
var randomId = function (randomLength) {
    var idStr = Date.now().toString(36);
    idStr += (Math.random()).toString(36)
        .slice(2, randomLength);
    return idStr;
};
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
    // 没有id的挂上id
    if (!newNode.id)
        newNode.id = randomId(16);
    newNode.parentId = parentId;
    // 递归遍历
    if (Array.isArray(newNode.childNodes)) {
        newNode.childNodes.forEach(function (node) { return initVnodeTree(node, newNode.id); });
    }
    return newNode;
};
/**
 * 小程序事件映射表
 */
var eventNameMap = {
    tap: 'onClick',
    longPress: 'onLongClick',
    input: 'onChange',
    blur: 'onBlur',
    focus: 'onFocus',
    load: 'onLoad',
    change: 'onChange',
};
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
 * @description 事件分发中心
 * @author CHC
 * @date 2022-03-15 14:03:55
 * @param {*} props
 */
var allEvents = function allEvents(props) {
    eventCenter(props, this.data.node);
};
/**
 * @description 小程序组件事件绑定
 * @type {*}
 * */
var miniappEventBehavior = {
    props: { component: {} },
    data: { node: {} },
    methods: {
        onTap: allEvents,
        onLongPress: allEvents,
        onInputInput: allEvents,
        onInputBlur: allEvents,
        onInputFocus: allEvents,
        onImageLoad: allEvents,
        onCheckboxChange: allEvents,
    },
};

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
/**
 * @description 承接小程序组件与NaruseComponent的桥梁，将小程序组件的生命周期映射到naruseComponent上，同时将naruseComponet的行为映射到小程序组件上
 * @author CHC
 * @date 2022-03-21 12:03:54
 * @class ReactMiddware
 * @note 因为是先创建的naruseComponent组件实例，后创建的中间件，所以采用后绑定
 */
var Middware = /** @class */ (function () {
    function Middware(miniappComponent, NaruseComponentActuator, props) {
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
        this.fristRender = true;
        this.updating = false;
    }
    /** 执行更新 */
    Middware.prototype.update = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = NOOP; }
        var self = this;
        !this.updating && Promise.resolve().then(function () {
            _this.updating = false;
            if (!_this.naruseComponent.render) {
                logger.error('组件必须需要一个render函数');
                return;
            }
            var vnode = _this.naruseComponent.render();
            var node = initVnodeTree(vnode);
            _this.component.setData({ node: node }, function () {
                _this.onUpdated.call(self);
                callback();
            });
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
    Middware.prototype.onUnMount = function () {
        this.naruseComponent && this.naruseComponent.componentWillUnmount();
        // 解绑对象
        this.component = null;
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
            this.$middware.onUnMount();
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
            this.$middware.onUnMount();
        } });
    return naruseBehavior;
};

naruseExtend({ renderComponentOnPage: renderComponentOnPage });

export { Naruse, createMainBehavior, createSubBehavior, naruseExtend, naruseInit, renderComponentOnPageWithCode };
