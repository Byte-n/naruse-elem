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

var n=function(e,r){return (n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,r){e.__proto__=r;}||function(e,r){for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t]);})(e,r)};function r(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function t(){this.constructor=e;}n(e,r),e.prototype=null===r?Object.create(r):(t.prototype=r.prototype,new t);}const A="Identifier",b="Literal",i="Program",k="Property",Q="FunctionDeclaration",K="FunctionExpression",Z="ExpressionStatement",s="ObjectPattern",u="ArrayPattern",o="AssignmentPattern",x="ObjectExpression",w="ArrayExpression",E="AssignmentExpression",S="MemberExpression",$="RestElement",C="SpreadElement",ee="DoWhileStatement",re="DebuggerStatement",te="ContinueStatement",ne="BreakStatement",oe="CallExpression",ae="YieldExpression",ie="ImportBatchSpecifier",ue="ImportSpecifier",se="ImportDeclaration",ce="ExportSpecifier",le="ExportBatchSpecifier",fe="ExportDeclaration",pe="ClassDeclaration",de="ClassExpression",he="ClassBody",t="ArrowFunctionExpression",me="TemplateLiteral",ve="MethodDefinition",ye="SequenceExpression",ge="ParenthesizedExpression",be="NewExpression",ke="UpdateExpression",xe="BinaryExpression",we="LogicalExpression",Ee="UnaryExpression",Se="VariableDeclaration",$e="IfStatement",Ce="ReturnStatement",Ae="SwitchCase",Ie="SwitchStatement",Ve="ThrowStatement",Oe="TaggedTemplateExpression",Fe="TryStatement",Re="CatchClause",De="WhileStatement",Te="EmptyStatement",je="LabeledStatement",Ue="BlockStatement",Ne="ForInStatement",Pe="ForOfStatement",Be="ForStatement",qe="VariableDeclarator",Le="ThisExpression",Me="ConditionalExpression",_e="ImportExpression";r(Xe,ze=Error);var ze,He,Ye,e=Xe;function Xe(){var e=null!==ze&&ze.apply(this,arguments)||this;return e.isEvaluateError=!0,e}function Ge(){return null!==He&&He.apply(this,arguments)||this}function Je(){return null!==Ye&&Ye.apply(this,arguments)||this}r(Ge,He=e),r(Je,Ye=e);function We(e){return e.generator}function Qe(e,r){return We(e)&&r===tr}function Ke(e){return e===rr}var c={notYetDefined:[1e3,"未定义的变量: %0",Je],duplicateDefinition:[1001,"变量重复定义: %0",Je],notCallableFunction:[1002,"不是可调用的函数: %0",Je],notSupportNode:[1003,"尚未支持的node类型: %0",e],notHasSomeProperty:[1004,"对象不存在对应属性: %0",Je],runTimeError:[1005,"运行错误 %0",e],deconstructNotArray:[1006,"解构应为一个数组: %0",Je],deconstructNotObject:[1007,"解构应为一个对象: %0",Je],notHasImport:[1008,"未初始化函数: %0",Je],notGeneratorFunction:[1009,"无法在非迭代函数内使用yield: %0",Je]},l=function(e,r,t,n){var r=e[1].replace("%0",String(r)),o=(t&&n&&(o=t.loc,n=n.slice(t.start,t.end),n="错误代码: ".concat(n),o&&(n+=" [".concat(o.start.line,":").concat(o.start.column,"-").concat(o.end.line,":").concat(o.end.column,"]")),r="".concat(r," \n ").concat(n)),new e[2](r));return o.nodeLoc=t,o},Ze={},er={},rr={result:void 0},tr={result:void 0},nr=(or.prototype.$set=function(e){return "const"!==this.value&&(this.value=e,!0)},or.prototype.$get=function(){return this.value},or);function or(e,r){this.value=r,this.kind=e;}function ar(e,r){var t={index:0},n=function(){},e=(We(r)&&(t=r.generatorStack.getStack(),n=r.generatorStack.saveStackData.bind(r.generatorStack)),e(t,n));return We(r)&&r.generatorStack.popStack(),e}ur.prototype.pushValue=function(e){this.running&&this.yieldBackValues.push({value:e}),this.running=!0;},ur.prototype.getValue=function(){var e=this.yieldBackValues[this.currentIndex];if(e)return this.currentIndex++,e;this.currentIndex=0;},ur.prototype.getStack=function(){var e=this.runnerStack[this.currentStackIndex];if(e)return e;return this.runnerStack.push(e),{index:0}},ur.prototype.popStack=function(){this.currentStackIndex--,this.runnerStack.pop();},ur.prototype.saveStackData=function(e,r){this.runnerStack[this.runnerStack.length-1][e]=r;};var ir=ur;function ur(){this.runnerStack=[],this.yieldBackValues=[],this.running=!1,this.currentIndex=0,this.currentStackIndex=0;}cr.prototype.$find=function(e){var r=this.prefix+e;return this.content.hasOwnProperty(r)?this.content[r]:this.parent?this.parent.$find(e):null},cr.prototype.$let=function(e,r){e=this.prefix+e;return !this.content[e]&&(this.content[e]=new nr("let",r),!0)},cr.prototype.$const=function(e,r){e=this.prefix+e;return !this.content[e]&&(this.content[e]=new nr("const",r),!0)},cr.prototype.$var=function(e,r){for(var e=this.prefix+e,t=this;null!==t.parent&&"function"!==t.type;)t=t.parent;return !t.content[e]&&(this.content[e]=new nr("var",r),!0)},cr.prototype.$declar=function(e,r,t){var n=this;return {var:function(){return n.$var(r,t)},let:function(){return n.$let(r,t)},const:function(){return n.$const(r,t)}}[e]()};var sr=cr;function cr(e,r,t){void 0===t&&(t=!1),this.content={},this.prefix="",this.invasive=!1,this.type=e,this.parent=r||null,this.generator=t,this.generatorStack=new ir;}var f,I,V,lr,fr,pr=0,dr=[setTimeout,setInterval,clearInterval,clearTimeout],p=((e={})[i]=function(e,r){for(var t=0,n=e.body;t<n.length;t++){var o=n[t];d(o,r);}},e[A]=function(e,r){if("undefined"!==e.name){r=r.$find(e.name);if(r)return r.$get();throw l(c.notYetDefined,e.name,e,f.source)}},e[b]=function(e){return e.value},e[Ue]=function(o,a){return ar(function(e){for(var r=a.invasive?a:new sr("block",a),t=o.body;e.index<t.length;e.index++){var n=t[e.index],n=d(n,r);if(Qe(a,n)||Ke(n)||n===er||n===Ze)return n}},a)},e[Te]=function(){},e[Z]=function(e,r){return d(e.expression,r)},e[Ce]=function(e,r){return rr.result=e.argument?d(e.argument,r):void 0,rr},e[ne]=function(){return Ze},e[te]=function(){return er},e[$e]=function(e,r){return d(e.test,r)?d(e.consequent,r):e.alternate?d(e.alternate,r):void 0},e[Be]=function(e,r){var t=new sr("loop",r);for(e.init&&d(e.init,t);!e.test||d(e.test,t);e.update&&d(e.update,t)){var n=d({type:"BlockStatement",body:e.body},t);if(n===Ze)break;if(n!==er&&n===rr)return n}},e[Q]=function(e,r){var t=p[K](e,r),n=(e.id||{name:"anonymous".concat(pr++)}).name;if(r.$var(n,t))return t;throw l(c.duplicateDefinition,n,e,f.source)},e[Se]=function(a,i){var u=a.kind;return ar(function(e){for(var r=a.declarations;e.index<r.length;e.index++){var t=r[e.index],n=t.id,t=t.init,t=t?d(t,i):void 0;if(Qe(i,t))return t;if(n.type===A){var o=n.name;if(!i.$declar(u,o,t))throw l(c.duplicateDefinition,o,a,f.source)}else {o=p[n.type](n,i,u,t);if(Qe(i,o))return o}}},i)},e[u]=function(n,o,a,i){var e=n.elements;if(!Array.isArray(i))throw l(c.deconstructNotArray,i,n,f.source);e.forEach(function(e,r){if(e)if(e.type===A){var t=e.name;if(!o.$declar(a,t,i[r]))throw l(c.duplicateDefinition,t,n,f.source)}else p[e.type](e,o,a,i[r]);});},e[s]=function(n,o,a,i){n.properties.forEach(function(e){if(e.type===k){var r=e.key,t=e.value,e=e.computed?d(r,o):r.name;if(t.type===A){r=t.name;if(!o.$declar(a,r,i[e]))throw l(c.duplicateDefinition,r,n,f.source)}else p[t.type](t,o,a,i[e]);}});},e[o]=function(e,r,t,n){var o=e.left,a=e.right,a=void 0===n?d(a,r):n;if(o.type===A){n=o.name;if(!r.$declar(t,n,a))throw l(c.duplicateDefinition,n,e,f.source)}else p[o.type](o,r,t,a);},e[Le]=function(e,r){r=r.$find("this");return r?r.$get():null},e[w]=function(e,r){return e.elements.map(function(e){return e?d(e,r):null})},e[x]=function(e,r){for(var t={},n=0,o=e.properties;n<o.length;n++){var a=o[n];if(a.type!==k)throw l(c.notSupportNode,a.type,e,f.source);var i=a.kind,u=a.computed,s=void 0,u=(a.key.type===b||u?s=d(a.key,r):a.key.type===A&&(s=a.key.name),d(a.value,r));"init"===i?t[s]=u:"set"===i?Object.defineProperty(t,s,{set:u}):"get"===i&&Object.defineProperty(t,s,{get:u});}return t},e[K]=function(a,i,t){var e;return void 0===t&&(t=!1),e=a.generator?function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var o=new sr("function",i,!0),t=(o.invasive=!0,a.params.forEach(function(e,r){var t;e.type===A?(t=e.name,o.$var(t,n[r])):p[e.type](e,o,"var",n[r]);}),o.$const("this",this),o.$const("arguments",arguments),!1);return {next:function(e){if(t)return {value:void 0,done:!0};null!=(r=o.generatorStack)&&r.pushValue(e);var r=d(a.body,o);return Qe(o,r)?{value:r.result,done:!1}:Ke(r)?(t=!0,{value:r.result,done:!0}):void 0}}}:function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];var o=new sr("function",i);if(o.invasive=!0,a.params.forEach(function(e,r){var t;e.type===A?(t=e.name,o.$var(t,n[r])):p[e.type](e,o,"var",n[r]);}),t){var r=i.$find("this").$get();if(o.$const("this",r||null),r=d(a.body,o),a.body.type!==Ue)return r}else o.$const("this",this),o.$const("arguments",arguments),r=d(a.body,o);if(r===rr)return r.result},t&&Object.defineProperty(e,"prototype",{value:void 0}),Object.defineProperty(e,"length",{value:a.params.length}),Object.defineProperty(e,"toString",{value:function(){return f.source.slice(a.start,a.end)}}),e},e[Ee]=function(n,o){return {"-":function(){return -d(n.argument,o)},"+":function(){return +d(n.argument,o)},"!":function(){return !d(n.argument,o)},"~":function(){return ~d(n.argument,o)},void:function(){d(n.argument,o);},typeof:function(){var e;return n.argument.type===A?(e=o.$find(n.argument.name))?typeof e.$get():"undefined":typeof d(n.argument,o)},delete:function(){var e,r;if(n.argument.type===S)return e=(t=n.argument).object,r=t.property,t.computed?delete d(e,o)[d(r,o)]:delete d(e,o)[r.name];if(n.argument.type===A){var t=o.$find("this");if(t)return t.$get()[n.argument.name]}}}[n.operator]()},e[ke]=function(e,r){var t,n,o=e.prefix;if(e.argument.type===A){var a,i=e.argument.name;if(!(a=r.$find(i)))throw l(c.notYetDefined,i,e,f.source)}else e.argument.type===S&&(i=e.argument,t=d(i.object,r),n=i.computed?d(i.property,r):i.property.name,a={$set:function(e){return t[n]=e,!0},$get:function(){return t[n]}});return {"--":function(e){return a.$set(e-1),o?--e:e--},"++":function(e){return a.$set(e+1),o?++e:e++}}[e.operator](d(e.argument,r))},e[xe]=function(e,r){return {"==":function(e,r){return e==r},"!=":function(e,r){return e!=r},"===":function(e,r){return e===r},"!==":function(e,r){return e!==r},"<":function(e,r){return e<r},"<=":function(e,r){return e<=r},">":function(e,r){return r<e},">=":function(e,r){return r<=e},"+":function(e,r){return e+r},"-":function(e,r){return e-r},"*":function(e,r){return e*r},"**":function(e,r){return Math.pow(e,r)},"/":function(e,r){return e/r},"%":function(e,r){return e%r},"|":function(e,r){return e|r},"^":function(e,r){return e^r},"&":function(e,r){return e&r},"<<":function(e,r){return e<<r},">>":function(e,r){return e>>r},">>>":function(e,r){return e>>>r},in:function(e,r){return e in r},instanceof:function(e,r){return e instanceof r}}[e.operator](d(e.left,r),d(e.right,r))},e[E]=function(e,r){var t=e.left;if(t.type===A){var n=t.name,o=r.$find(n);if(!o)throw l(c.notYetDefined,n,e,f.source);u=o;}else {if(t.type!==S)throw l(c.notSupportNode,t.type,e,f.source);var n=t.object,o=t.property,t=t.computed,a=d(n,r),i=t?d(o,r):o.name,u={$set:function(e){return a[i]=e,!0},$get:function(){return a[i]}};}return {"=":function(e){return u.$set(e),e},"+=":function(e){return u.$set(u.$get()+e),u.$get()},"-=":function(e){return u.$set(u.$get()-e),u.$get()},"*=":function(e){return u.$set(u.$get()*e),u.$get()},"**=":function(e){return u.$set(Math.pow(u.$get(),e)),u.$get()},"/=":function(e){return u.$set(u.$get()/e),u.$get()},"%=":function(e){return u.$set(u.$get()%e),u.$get()},"|=":function(e){return u.$set(u.$get()|e),u.$get()},"<<=":function(e){return u.$set(u.$get()<<e),u.$get()},">>=":function(e){return u.$set(u.$get()>>e),u.$get()},">>>=":function(e){return u.$set(u.$get()>>>e),u.$get()},"^=":function(e){return u.$set(u.$get()^e),u.$get()},"&=":function(e){return u.$set(u.$get()&e),u.$get()}}[e.operator](d(e.right,r))},e[we]=function(r,t){return {"||":function(){return d(r.left,t)||d(r.right,t)},"&&":function(){return d(r.left,t)&&d(r.right,t)},"??":function(){var e;return null!=(e=d(r.left,t))?e:d(r.right,t)}}[r.operator]()},e[S]=function(e,r){var t=e.object,n=e.property;return e.computed?d(t,r)[d(n,r)]:d(t,r)[n.name]},e[Me]=function(e,r){return d(e.test,r)?d(e.consequent,r):d(e.alternate,r)},e[oe]=function(e,r){var t=null,n=null;if(e.callee.type===S){var o=e.callee,a=o.object,i=o.property,o=o.computed,t=d(a,r),a=o?p[i.type](i,r):i.name;if(null==t)throw l(c.notHasSomeProperty,a,e,f.source);n=t[a];}else t=r.$find("this").$get(),n=d(e.callee,r);if("function"!=typeof n)throw l(c.notCallableFunction,n,e,f.source);return dr.includes(n)&&(t=null),n.apply(t,e.arguments.map(function(e){return d(e,r)}))},e[be]=function(e,r){var t=d(e.callee,r),e=e.arguments.map(function(e){return d(e,r)});return new(t.bind.apply(t,function(e,r,t){if(t||2===arguments.length)for(var n,o=0,a=r.length;o<a;o++)!n&&o in r||((n=n||Array.prototype.slice.call(r,0,o))[o]=r[o]);return e.concat(n||Array.prototype.slice.call(r))}([void 0],e,!1)))},e[ye]=function(e,r){for(var t=0,n=e.expressions;t<n.length;t++)var o=n[t],a=d(o,r);return a},e[Ve]=function(e,r){throw d(e.argument,r)},e[Fe]=function(r,t){try{return d(r.block,t)}catch(e){var n,o;if(r.handler)return n=r.handler.param,(o=new sr("block",t)).invasive=!0,o.$const(null==n?void 0:n.name,e),d(r.handler,o);throw e}finally{if(r.finalizer)return d(r.finalizer,t)}},e[Re]=function(e,r){return d(e.body,r)},e[Ie]=function(e,r){for(var t=d(e.discriminant,r),n=new sr("switch",r),o=!1,a=0,i=e.cases;a<i.length;a++){var u=i[a];if(o=o||u.test&&t!==d(u.test,n)?o:!0){u=d(u,n);if(u===Ze)break;if(u===er||u===rr)return u}}},e[Ae]=function(e,r){for(var t=0,n=e.consequent;t<n.length;t++){var o=n[t],o=d(o,r);if(o===Ze||o===er||o===rr)return o}},e[De]=function(e,r){for(;d(e.test,r);){var t=new sr("loop",r),t=(t.invasive=!0,d(e.body,t));if(t===Ze)break;if(t!==er&&t===rr)return t}},e[ee]=function(e,r){do{var t=new sr("loop",r),t=(t.invasive=!0,d(e.body,t));if(t===Ze)break;if(t!==er&&t===rr)return t}while(d(e.test,r))},e[t]=function(e,r){return p[K](e,r,!0)},e[Ne]=function(n,o,e){void 0===e&&(e=!1);function r(e){var r,t=new sr("loop",o);return t.invasive=!0,i.type===A?(r=i.name,t.$declar(a,r,e)):p[i.type](i,t,a,e),d(n.body,t)}var a=n.left.kind,i=n.left.declarations[0].id,t=d(n.right,o);if(e)for(var u,s=0;s<t.length;s++){if((u=r(t[s]))===Ze)break;if(u!==er&&u===rr)return u}else for(var c in t){if((u=r(c))===Ze)break;if(u!==er&&u===rr)return u}},e[me]=function(t,n){return t.quasis.map(function(e,r){return e.tail?e.value.raw:e.value.raw+d(t.expressions[r],n)}).join("")},e[_e]=function(e,r){var t=d(e.source,r),r=r.$find("$$import");if(r)return r.$get()(t);throw l(c.notHasImport,"$$import",e,f.source)},e[Pe]=function(e,r){return p[Ne](e,r,!0)},e[ae]=function(e,r){if(!We(r))throw l(c.notGeneratorFunction,"",e,f.source);var t=null==(t=r.generatorStack)?void 0:t.getValue();return t?t.value:(tr.result=d(e.argument,r),tr)},e),d=function(r,e,t){t=(f=t?t:f).traceId++;f.traceStack.push(t);try{var n=function(e,r){if(!p[e.type])throw l(c.notSupportNode,e.type,e,f.source);r=p[e.type](e,r);return f.currentNode=e,r}(r,e);return f.traceStack.pop(),n}catch(e){if(e.isEvaluateError)throw e;if(f.traceStack[f.traceStack.length-1]===t)throw l(c.runTimeError,null==e?void 0:e.message,r,f.source);throw e}};const hr={version:"0.12.x"};hr.parse=function(e,r){V=String(e),lr=V.length,vr(r),sn();var e=I.locations?[h,un()]:h,t=(Fr(),I.program||g(e)),n=!0;for(t.body||(t.body=[]);F!==Nr;){var o=Wn(!0,!0);t.body.push(o),n&&Tn(o)&&Fn(!0),n=!1;}return M(),z(t,i)};var mr=hr.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,allowReturnOutsideFunction:!1,allowImportExportEverywhere:!1,allowHashBang:!1,locations:!1,ranges:!1,program:null,sourceFile:null,directSourceFile:null,preserveParens:!1};function vr(e){for(var r in I={},mr)I[r]=(e&&qn(e,r)?e:mr)[r];fr=I.sourceFile||null,Wt=6<=I.ecmaVersion?Jt:Gt;}hr.parseExpressionAt=function(e,r,t){return V=String(e),lr=V.length,vr(t),sn(r),Fr(),to()};var h,O,yr,gr,br,F,R,kr,xr,wr,a,Er,Sr,$r,Cr,Ar,D,Ir,Vr=hr.getLineInfo=function(e,r){for(var t=1,n=0;;){tn.lastIndex=n;var o=tn.exec(e);if(!(o&&o.index<r))break;++t,n=o.index+o[0].length;}return {line:t,column:r-n}};function Or(){this.type=F,this.value=R,this.start=O,this.end=yr,I.locations&&(this.loc=new Dn,this.loc.end=br),I.ranges&&(this.range=[O,yr]);}function Fr(){Er=Sr=h,I.locations&&($r=un()),Cr=Ar=!1,D=[],gn(),xn();}function T(e,r){var t=Vr(V,e),r=(r+=" ("+t.line+":"+t.column+")",new SyntaxError(r));throw r.pos=e,r.loc=t,r.raisedAt=h,r}hr.Token=Or,hr.tokenize=function(e,r){function t(){return Sr=yr,xn(),new Or}return V=String(e),lr=V.length,vr(r),sn(),gn(),t.jumpTo=function(e,r){var t;if(h=e,I.locations)for(wr=1,a=tn.lastIndex=0;(t=tn.exec(V))&&t.index<e;)++wr,a=t.index+t[0].length;xr=!!r,gn();},t.current=function(){return new Or},"undefined"!=typeof Symbol&&(t[Symbol.iterator]=function(){return {next:function(){var e=t();return {done:e.type===Nr,value:e}}}}),t.options=I,t};var Rr,Dr=[],Tr={type:"num"},jr={type:"regexp"},Ur={type:"string"},j={type:"name"},Nr={type:"eof"},Pr={keyword:"break"},Br={keyword:"case",beforeExpr:!0},qr={keyword:"catch"},Lr={keyword:"continue"},Mr={keyword:"debugger"},_r={keyword:"default"},zr={keyword:"do",isLoop:!0},Hr={keyword:"else",beforeExpr:!0},Yr={keyword:"finally"},Xr={keyword:"for",isLoop:!0},Gr={keyword:"function"},Jr={keyword:"if"},Wr={keyword:"return",beforeExpr:!0},Qr={keyword:"switch"},Kr={keyword:"throw",beforeExpr:!0},Zr={keyword:"try"},et={keyword:"var"},rt={keyword:"let"},tt={keyword:"const"},nt={keyword:"while",isLoop:!0},ot={keyword:"with"},at={keyword:"new",beforeExpr:!0},it={keyword:"this"},ut={keyword:"class"},st={keyword:"extends",beforeExpr:!0},ct={keyword:"export"},lt={keyword:"import"},ft={keyword:"yield",beforeExpr:!0},pt={keyword:"null",atomValue:null},dt={keyword:"true",atomValue:!0},ht={keyword:"false",atomValue:!1},mt={keyword:"in",binop:7,beforeExpr:!0},vt={break:Pr,case:Br,catch:qr,continue:Lr,debugger:Mr,default:_r,do:zr,else:Hr,finally:Yr,for:Xr,function:Gr,if:Jr,return:Wr,switch:Qr,throw:Kr,try:Zr,var:et,let:rt,const:tt,while:nt,with:ot,null:pt,true:dt,false:ht,new:at,in:mt,instanceof:{keyword:"instanceof",binop:7,beforeExpr:!0},this:it,typeof:{keyword:"typeof",prefix:!0,beforeExpr:!0},void:{keyword:"void",prefix:!0,beforeExpr:!0},delete:{keyword:"delete",prefix:!0,beforeExpr:!0},class:ut,extends:st,export:ct,import:lt,yield:ft},yt={type:"[",beforeExpr:!0},gt={type:"]"},U={type:"{",beforeExpr:!0},N={type:"}"},P={type:"(",beforeExpr:!0},B={type:")"},q={type:",",beforeExpr:!0},L={type:";",beforeExpr:!0},bt={type:":",beforeExpr:!0},kt={type:"."},xt={type:"?",beforeExpr:!0},wt={type:"=>",beforeExpr:!0},Et={type:"template"},St={type:"...",beforeExpr:!0},$t={type:"`"},Ct={type:"${",beforeExpr:!0},At={binop:10,beforeExpr:!0},It={isAssign:!0,beforeExpr:!0},Vt={isAssign:!0,beforeExpr:!0},Ot={postfix:!0,prefix:!0,isUpdate:!0},Ft={prefix:!0,beforeExpr:!0},Rt={binop:1,beforeExpr:!0},Dt={binop:2,beforeExpr:!0},Tt={binop:3,beforeExpr:!0},jt={binop:4,beforeExpr:!0},Ut={binop:5,beforeExpr:!0},Nt={binop:6,beforeExpr:!0},Pt={binop:7,beforeExpr:!0},Bt={binop:8,beforeExpr:!0},qt={binop:9,prefix:!0,beforeExpr:!0},Lt={binop:10,beforeExpr:!0},Mt={binop:10,beforeExpr:!0};for(Rr in hr.tokTypes={bracketL:yt,bracketR:gt,braceL:U,braceR:N,parenL:P,parenR:B,comma:q,semi:L,colon:bt,dot:kt,ellipsis:St,question:xt,slash:At,eq:It,name:j,eof:Nr,num:Tr,regexp:jr,string:Ur,arrow:wt,template:Et,star:Mt,assign:Vt,backQuote:$t,dollarBraceL:Ct},vt)hr.tokTypes["_"+Rr]=vt[Rr];function _t(r){return r=r.split(" "),e=>r.includes(e)}var zt=_t("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),Ht=_t("class enum extends super const export import"),Yt=_t("implements interface let package private protected public static yield"),Xt=_t("eval arguments"),e="break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",Gt=_t(e),Jt=_t(e+" let const class extends export import yield"),Wt=Gt,Qt=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,e="ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙա-ևא-תװ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࢠ-ࢲऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᧁ-ᧇᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᳵᳶᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々-〇〡-〩〱-〵〸-〼ぁ-ゖゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞭꞰꞱꟷ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭟꭤꭥꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ",Kt=new RegExp("["+e+"]"),Zt=new RegExp("["+e+"̀-ͯ҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࣤ-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ଁ-ଃ଼ା-ୄେୈୋ-୍ୖୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఃా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഁ-ഃാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ංඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ູົຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏ᦰ-ᧀᧈᧉ᧐-᧙ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭ᳲ-᳴᳸᳹᷀-᷵᷼-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧꢀꢁꢴ-꣄꣐-꣙꣠-꣱꤀-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︭︳︴﹍-﹏０-９＿]"),en=/[\n\r\u2028\u2029]/;function rn(e){return 10===e||13===e||8232===e||8233==e}var tn=/\r\n|[\n\r\u2028\u2029]/g,nn=hr.isIdentifierStart=function(e){return e<65?36===e:e<91||(e<97?95===e:e<123||170<=e&&Kt.test(String.fromCharCode(e)))},on=hr.isIdentifierChar=function(e){return e<48?36===e:e<58||!(e<65)&&(e<91||(e<97?95===e:e<123||170<=e&&Zt.test(String.fromCharCode(e))))};function an(e,r){this.line=e,this.column=r;}function un(){return new an(wr,h-a)}function sn(e){e?(h=e,a=Math.max(0,V.lastIndexOf("\n",e)),wr=V.slice(0,a).split(en).length):(wr=1,h=a=0),F=Nr,kr=[cn],Ir=!(xr=!0),0===h&&I.allowHashBang&&"#!"===V.slice(0,2)&&yn(2);}var cn={token:"{",isExpr:!(an.prototype.offset=function(e){return new an(this.line,this.column+e)})},ln={token:"{",isExpr:!0},fn={token:"${",isExpr:!0},pn={token:"(",isExpr:!1},dn={token:"(",isExpr:!0},hn={token:"`",isExpr:!0},mn={token:"function",isExpr:!0};function vn(){return kr[kr.length-1]}function m(e,r){yr=h,I.locations&&(br=un());var t,n=F,o=!1;R=r,(F=e)===B||e===N?(r=kr.pop())===fn?o=!0:xr=r===cn&&vn()===mn?(kr.pop(),!1):!(r&&r.isExpr):e===U?(kr.push(((r=n)===bt&&"{"==(t=vn()).token?t.isExpr:r===Wr?!en.test(V.slice(Sr,O)):r!==Hr&&r!==L&&r!==Nr&&(r==U?vn()!==cn:xr))?ln:cn),xr=!0):e===Ct?(kr.push(fn),xr=!0):e==P?(t=n===Jr||n===Xr||n===ot||n===nt,kr.push(t?pn:dn),xr=!0):e!=Ot&&(xr=(!e.keyword||n!=kt)&&(e==Gr?(vn()!==cn&&kr.push(mn),!1):e===$t?(vn()===hn?kr.pop():(kr.push(hn),o=!0),!1):e.beforeExpr)),o||gn();}function yn(e){for(var r=V.charCodeAt(h+=e);h<lr&&10!==r&&13!==r&&8232!==r&&8233!==r;)++h,r=V.charCodeAt(h);}function gn(){for(;h<lr;){var e,r=V.charCodeAt(h);if(32===r)++h;else if(13===r)++h,10===(e=V.charCodeAt(h))&&++h,I.locations&&(++wr,a=h);else if(10===r||8232===r||8233===r)++h,I.locations&&(++wr,a=h);else if(8<r&&r<14)++h;else if(47===r)if(42===(e=V.charCodeAt(h+1))){t=o=n=void 0;var t,n=h,o=V.indexOf("*/",h+=2);if(-1===o&&T(h-2,"Unterminated comment"),h=o+2,I.locations)for(tn.lastIndex=n;(t=tn.exec(V))&&t.index<h;)++wr,a=t.index+t[0].length;}else {if(47!==e)break;yn(2);}else if(160===r)++h;else {if(!(5760<=r&&Qt.test(String.fromCharCode(r))))break;++h;}}}function bn(){var e=V.charCodeAt(h+1);if(xr){for(var r,t,n="",o=++h;;){lr<=h&&T(o,"Unterminated regular expression");var a=V.charAt(h);if(en.test(a)&&T(o,"Unterminated regular expression"),r)r=!1;else {if("["===a)t=!0;else if("]"===a&&t)t=!1;else if("/"===a&&!t)break;r="\\"===a;}++h;}var i,n=V.slice(o,h),u=(++h,Vn()),s=n;u&&(i=/^[gmsiy]*$/,(i=6<=I.ecmaVersion?/^[gmsiyu]*$/:i).test(u)||T(o,"Invalid regular expression flag"),0<=u.indexOf("u")&&!En&&(s=s.replace(/\\u\{([0-9a-fA-F]{5,6})\}/g,"x").replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,"x")));try{new RegExp(s);}catch(e){e instanceof SyntaxError&&T(o,"Error parsing regular expression: "+e.message),T(e);}try{var c=new RegExp(n,u);}catch(e){c=null;}return m(jr,{pattern:n,flags:u,value:c})}return 61===e?v(Vt,2):v(At,1)}function kn(e){switch(e){case 46:var r=V.charCodeAt(h+1);if(48<=r&&r<=57)return Cn(!0);var t=V.charCodeAt(h+2);return 6<=I.ecmaVersion&&46===r&&46===t?(h+=3,m(St)):(++h,m(kt));case 40:return ++h,m(P);case 41:return ++h,m(B);case 59:return ++h,m(L);case 44:return ++h,m(q);case 91:return ++h,m(yt);case 93:return ++h,m(gt);case 123:return ++h,m(U);case 125:return ++h,m(N);case 58:return ++h,m(bt);case 63:return ++h,m(xt);case 96:return 6<=I.ecmaVersion&&(++h,m($t));case 48:r=V.charCodeAt(h+1);if(120===r||88===r)return $n(16);if(6<=I.ecmaVersion){if(111===r||79===r)return $n(8);if(98===r||66===r)return $n(2)}case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return Cn(!1);case 34:case 39:for(var n=e,o="",a=++h;;){lr<=h&&T(O,"Unterminated string constant");var i=V.charCodeAt(h);if(i===n)break;92===i?(o=(o+=V.slice(a,h))+An(),a=h):(rn(i)&&T(O,"Unterminated string constant"),++h);}return o+=V.slice(a,h++),m(Ur,o);case 47:return bn();case 37:case 42:return t=e,61===V.charCodeAt(h+1)?v(Vt,2):v(42===t?Mt:Lt,1);case 124:case 38:return l=e,(f=V.charCodeAt(h+1))===l?v(124===l?Rt:Dt,2):61===f?v(Vt,2):v(124===l?Tt:Ut,1);case 94:return 61===V.charCodeAt(h+1)?v(Vt,2):v(jt,1);case 43:case 45:return f=e,(l=V.charCodeAt(h+1))===f?45==l&&62==V.charCodeAt(h+2)&&en.test(V.slice(Sr,h))?(yn(3),gn(),xn()):v(Ot,2):61===l?v(Vt,2):v(qt,1);case 60:case 62:return u=e,s=V.charCodeAt(h+1),c=1,s===u?(c=62===u&&62===V.charCodeAt(h+2)?3:2,61===V.charCodeAt(h+c)?v(Vt,c+1):v(Bt,c)):33==s&&60==u&&45==V.charCodeAt(h+2)&&45==V.charCodeAt(h+3)?(yn(4),gn(),xn()):(61===s&&(c=61===V.charCodeAt(h+2)?3:2),v(Pt,c));case 61:case 33:return u=e,61===(s=V.charCodeAt(h+1))?v(Nt,61===V.charCodeAt(h+2)?3:2):61===u&&62===s&&6<=I.ecmaVersion?(h+=2,m(wt)):v(61===u?It:Ft,1);case 126:return v(Ft,1)}var u,s,c,l,f;return !1}function xn(){if(O=h,I.locations&&(gr=un()),lr<=h)return m(Nr);if(vn()!==hn){var e=V.charCodeAt(h);if(nn(e)||92===e)return On();var r=kn(e);if(!1===r){e=String.fromCharCode(e);if("\\"===e||Kt.test(e))return On();T(h,"Unexpected character '"+e+"'");}return r}for(var t="",n=h;;){lr<=h&&T(O,"Unterminated template");var o=V.charCodeAt(h);if(96===o||36===o&&123===V.charCodeAt(h+1))return h===O&&F===Et?36===o?(h+=2,m(Ct)):(++h,m($t)):(t+=V.slice(n,h),m(Et,t));92===o?(t=(t+=V.slice(n,h))+An(),n=h):rn(o)?(t+=V.slice(n,h),++h,13===o&&10===V.charCodeAt(h)?(++h,t+="\n"):t+=String.fromCharCode(o),I.locations&&(++wr,a=h),n=h):++h;}}function v(e,r){var t=V.slice(h,h+r);h+=r,m(e,t);}var wn,En=!1;try{new RegExp("￿","u"),En=!0;}catch(e){}function Sn(e,r){for(var t=h,n=0,o=0,a=null==r?1/0:r;o<a;++o){var i=V.charCodeAt(h),i=97<=i?i-97+10:65<=i?i-65+10:48<=i&&i<=57?i-48:1/0;if(e<=i)break;++h,n=n*e+i;}return h===t||null!=r&&h-t!==r?null:n}function $n(e){h+=2;var r=Sn(e);return null==r&&T(O+2,"Expected number in radix "+e),nn(V.charCodeAt(h))&&T(h,"Identifier directly after number"),m(Tr,r)}function Cn(e){var r,t=h,n=!1,o=48===V.charCodeAt(h),e=(e||null!==Sn(10)||T(t,"Invalid number"),46===V.charCodeAt(h)&&(++h,Sn(10),n=!0),V.charCodeAt(h)),e=(69!==e&&101!==e||(43!==(e=V.charCodeAt(++h))&&45!==e||++h,null===Sn(10)&&T(t,"Invalid number"),n=!0),nn(V.charCodeAt(h))&&T(h,"Identifier directly after number"),V.slice(t,h));return n?r=parseFloat(e):o&&1!==e.length?/[89]/.test(e)||Ir?T(t,"Invalid number"):r=parseInt(e,8):r=parseInt(e,10),m(Tr,r)}function An(){for(var e,r=V.charCodeAt(++h),t=(t=/^[0-7]+/.exec(V.slice(h,h+3)))&&t[0];t&&255<parseInt(t,8);)t=t.slice(0,-1);if(++h,t="0"===t?null:t)return Ir&&T(h-2,"Octal literal in strict mode"),h+=t.length-1,String.fromCharCode(parseInt(t,8));switch(r){case 110:return "\n";case 114:return "\r";case 120:return String.fromCharCode(In(2));case 117:return 123===V.charCodeAt(h)?(I.ecmaVersion<6&&X(),++h,e=In(V.indexOf("}",h)-h),++h,1114111<e&&X()):e=In(4),e<=65535?String.fromCharCode(e):String.fromCharCode(55296+(e-65536>>10),56320+(e-65536&1023));case 116:return "\t";case 98:return "\b";case 118:return "\v";case 102:return "\f";case 48:return "\0";case 13:10===V.charCodeAt(h)&&++h;case 10:return I.locations&&(a=h,++wr),"";default:return String.fromCharCode(r)}}function In(e){e=Sn(16,e);return null===e&&T(O,"Bad character escape sequence"),e}function Vn(){for(var e="",r=!(wn=!1),t=h;h<lr;){var n=V.charCodeAt(h);if(on(n))++h;else {if(92!==n)break;wn=!0,e+=V.slice(t,h),117!=V.charCodeAt(++h)&&T(h,"Expecting Unicode escape sequence \\uXXXX"),++h;var n=In(4),o=String.fromCharCode(n);o||T(h-1,"Invalid Unicode escape"),(r?nn:on)(n)||T(h-4,"Invalid Unicode escape"),e+=o,t=h;}r=!1;}return e+V.slice(t,h)}function On(){var e=Vn(),r=j;return m(r=!wn&&Wt(e)?vt[e]:r,e)}function M(){Er=O,Sr=yr,$r=br,xn();}function Fn(e){if(Ir=e,F===Tr||F===Ur){if(h=O,I.locations)for(;h<a;)a=V.lastIndexOf("\n",a-2)+1,--wr;gn(),xn();}}function Rn(){this.type=null,this.start=O,this.end=null;}function Dn(){this.start=gr,(this.end=null)!==fr&&(this.source=fr);}function _(){var e=new Rn;return I.locations&&(e.loc=new Dn),I.directSourceFile&&(e.sourceFile=I.directSourceFile),I.ranges&&(e.range=[O,0]),e}function y(){return I.locations?[O,gr]:O}function g(e){var r=new Rn,t=e;return I.locations&&(r.loc=new Dn,r.loc.start=t[1],t=e[0]),r.start=t,I.directSourceFile&&(r.sourceFile=I.directSourceFile),I.ranges&&(r.range=[t,0]),r}function z(e,r){return e.type=r,e.end=Sr,I.locations&&(e.loc.end=$r),I.ranges&&(e.range[1]=Sr),e}function Tn(e){return 5<=I.ecmaVersion&&e.type===Z&&e.expression.type===b&&"use strict"===e.expression.value}function H(e){return F===e&&(M(),!0)}function jn(e){return F===j&&R===e}function Un(e){return R===e&&H(j)}function Nn(e){Un(e)||X();}function Pn(){return !I.strictSemicolons&&(F===Nr||F===N||en.test(V.slice(Sr,O)))}function Bn(){H(L)||Pn()||X();}function Y(e){H(e)||X();}function X(e){T(null!=e?e:O,"Unexpected token");}function qn(e,r){return Object.prototype.hasOwnProperty.call(e,r)}function Ln(e,r){if(6<=I.ecmaVersion&&e)switch(e.type){case A:case s:case u:case o:break;case x:e.type=s;for(var t=0;t<e.properties.length;t++){var n=e.properties[t];"init"!==n.kind&&T(n.key.start,"Object pattern can't contain getter or setter"),Ln(n.value,r);}break;case w:e.type=u,Mn(e.elements,r);break;case E:"="===e.operator?e.type=o:T(e.left.end,"Only '=' operator can be used for specifying default value.");break;case S:if(!r)break;default:T(e.start,"Assigning to rvalue");}return e}function Mn(e,r){if(e.length){for(var t=0;t<e.length-1;t++)Ln(e[t],r);var n=e[e.length-1];switch(n.type){case $:break;case C:n.type=$;var o=n.argument;Ln(o,r),o.type!==A&&o.type!==S&&o.type!==u&&X(o.start);break;default:Ln(n,r);}}return e}function _n(){var e=_();return M(),e.argument=(F===j||F===yt?zn:X)(),z(e,$)}function zn(){if(I.ecmaVersion<6)return W();switch(F){case j:return W();case yt:var e=_();return M(),e.elements=Hn(gt,!0),z(e,u);case U:return co(!0);default:X();}}function Hn(e,r){for(var t=[],n=!0;!H(e);){if(n?n=!1:Y(q),F===St){t.push(_n()),Y(e);break}t.push(r&&F===q?null:Yn());}return t}function Yn(e,r){if(e=e||y(),r=r||zn(),!H(It))return r;e=g(e);return e.operator="=",e.left=r,e.right=J(),z(e,o)}function Xn(e,r){switch(e.type){case A:(Yt(e.name)||Xt(e.name))&&T(e.start,"Defining '"+e.name+"' in strict mode"),qn(r,e.name)&&T(e.start,"Argument name clash in strict mode"),r[e.name]=!0;break;case s:for(var t=0;t<e.properties.length;t++)Xn(e.properties[t].value,r);break;case u:for(t=0;t<e.elements.length;t++){var n=e.elements[t];n&&Xn(n,r);}break;case $:return Xn(e.argument,r)}}function G(e,r){switch(e.type){case A:Ir&&(Xt(e.name)||Yt(e.name))&&T(e.start,(r?"Binding ":"Assigning to ")+e.name+" in strict mode");break;case S:r&&T(e.start,"Binding to member expression");break;case s:for(var t=0;t<e.properties.length;t++)G(e.properties[t].value,r);break;case u:for(t=0;t<e.elements.length;t++){var n=e.elements[t];n&&G(n,r);}break;case o:G(e.left);break;case $:G(e.argument);break;default:T(e.start,"Assigning to rvalue");}}hr.Node=Rn;var Gn={kind:"loop"},Jn={kind:"switch"};function Wn(e,r){var t,n=F,o=_();switch(n){case Pr:case Lr:var a=o,i=n.keyword,u=i==Pr.keyword;M(),H(L)||Pn()?a.label=null:F!==j?X():(a.label=W(),Bn());for(var s=0;s<D.length;++s){var c=D[s];if(null==a.label||c.name===a.label.name){if(null!=c.kind&&(u||"loop"===c.kind))break;if(a.label&&u)break}}return s===D.length&&T(a.start,"Unsyntactic "+i),z(a,u?ne:te);case Mr:return i=o,M(),Bn(),z(i,re);case zr:var l=o;return M(),D.push(Gn),l.body=Wn(!1),D.pop(),Y(nt),l.test=Qn(),6<=I.ecmaVersion?H(L):Bn(),z(l,ee);case Xr:var f,l=o;if(M(),D.push(Gn),Y(P),F===L)return Zn(l,null);if(F===et||F===rt)return d=_(),p=F.keyword,f=F===rt,M(),ro(d,!0,p),z(d,Se),(!(F===mt||6<=I.ecmaVersion&&jn("of"))||1!==d.declarations.length||f&&d.declarations[0].init?Zn:eo)(l,d);var p={start:0},d=to(!0,p);return F===mt||6<=I.ecmaVersion&&jn("of")?(Ln(d),G(d),eo(l,d)):(p.start&&X(p.start),Zn(l,d));case Gr:return !e&&6<=I.ecmaVersion&&X(),f=o,M(),po(f,!0);case ut:return e||X(),yo(o,!0);case Jr:return p=o,M(),p.test=Qn(),p.consequent=Wn(!1),p.alternate=H(Hr)?Wn(!1):null,z(p,$e);case Wr:d=o;return Cr||I.allowReturnOutsideFunction||T(O,"'return' outside of function"),M(),H(L)||Pn()?d.argument=null:(d.argument=to(),Bn()),z(d,Ce);case Qr:var h,m,v,y=o;for(M(),y.discriminant=Qn(),y.cases=[],Y(U),D.push(Jn);F!=N;)F===Br||F===_r?(v=F===Br,h&&z(h,Ae),y.cases.push(h=_()),h.consequent=[],M(),v?h.test=to():(m&&T(Er,"Multiple default clauses"),m=!0,h.test=null),Y(bt)):(h||X(),h.consequent.push(Wn(!0)));return h&&z(h,Ae),M(),D.pop(),z(y,Ie);case Kr:var g=o;return M(),en.test(V.slice(Sr,O))&&T(Sr,"Illegal newline after throw"),g.argument=to(),Bn(),z(g,Ve);case Zr:var b,g=o;return M(),g.block=Kn(),g.handler=null,F===qr&&(b=_(),M(),Y(P),b.param=zn(),G(b.param,!0),Y(B),b.guard=null,b.body=Kn(),g.handler=z(b,Re)),g.guardedHandlers=Dr,g.finalizer=H(Yr)?Kn():null,g.handler||g.finalizer||T(g.start,"Missing catch or finally clause"),z(g,Fe);case rt:case tt:e||X();case et:return b=o,t=n.keyword,M(),ro(b,!1,t),Bn(),z(b,Se);case nt:return t=o,M(),t.test=Qn(),D.push(Gn),t.body=Wn(!1),D.pop(),z(t,De);case ot:return void T(O,"with now allow");case U:return Kn();case L:return k=o,M(),z(k,Te);case ct:case lt:return r||I.allowImportExportEverywhere||T(O,"'import' and 'export' may only appear at the top level"),(n===lt?function(e){M(),F===Ur?(e.specifiers=[],e.source=io(),e.kind=""):(e.specifiers=function(){var e=[],r=!0;if(F===j)if((t=_()).id=W(),G(t.id,!0),t.name=null,t.default=!0,e.push(z(t,ue)),!H(q))return e;if(F===Mt)return t=_(),M(),Nn("as"),t.name=W(),G(t.name,!0),e.push(z(t,ie)),e;Y(U);for(;!H(N);){if(r)r=!1;else if(Y(q),I.allowTrailingCommas&&H(N))break;var t;(t=_()).id=W(!0),t.name=Un("as")?W():null,G(t.name||t.id,!0),t.default=!1,e.push(z(t,ue));}return e}(),Nn("from"),e.source=(F===Ur?io:X)());return Bn(),z(e,se)}:function(e){if(M(),F===et||F===tt||F===rt||F===Gr||F===ut)e.declaration=Wn(!0),e.default=!1,e.specifiers=null,e.source=null;else if(H(_r)){var r=J();if(r.id)switch(r.type){case K:r.type=Q;break;case de:r.type=pe;}e.declaration=r,e.default=!0,e.specifiers=null,e.source=null,Bn();}else {var t=F===Mt;e.declaration=null,e.default=!1,e.specifiers=function(){var e=[],r=!0;if(F===Mt){var t=_();M(),e.push(z(t,le));}else for(Y(U);!H(N);){if(r)r=!1;else if(Y(q),I.allowTrailingCommas&&H(N))break;(t=_()).id=W(F===_r),t.name=Un("as")?W(!0):null,e.push(z(t,ce));}return e}(),Un("from")?e.source=(F===Ur?io:X)():(t&&X(),e.source=null),Bn();}return z(e,fe)})(o);default:var k=R,x=to();if(n===j&&x.type===A&&H(bt)){var w=o;var E=k;var S=x;for(var $=0;$<D.length;++$)D[$].name===E&&T(S.start,"Label '"+E+"' is already declared");var C=F.isLoop?"loop":F===Qr?"switch":null;return D.push({name:E,kind:C}),w.body=Wn(!0),D.pop(),w.label=S,z(w,je);}else return (C=o).expression=x,Bn(),z(C,Z)}}function Qn(){Y(P);var e=to();return Y(B),e}function Kn(e){var r,t=_(),n=!0;for(t.body=[],Y(U);!H(N);){var o=Wn(!0);t.body.push(o),n&&e&&Tn(o)&&(r=Ir,Fn(Ir=!0)),n=!1;}return !1===r&&Fn(!1),z(t,Ue)}function Zn(e,r){return e.init=r,Y(L),e.test=F===L?null:to(),Y(L),e.update=F===B?null:to(),Y(B),e.body=Wn(!1),D.pop(),z(e,Be)}function eo(e,r){var t=F===mt?Ne:Pe;return M(),e.left=r,e.right=to(),Y(B),e.body=Wn(!1),D.pop(),z(e,t)}function ro(e,r,t){for(e.declarations=[],e.kind=t;;){var n=_();if(n.id=zn(),G(n.id,!0),n.init=H(It)?J(r):t===tt.keyword?X():null,e.declarations.push(z(n,qe)),!H(q))break}}function to(e,r){var t=y(),n=J(e,r);if(F!==q)return n;var o=g(t);for(o.expressions=[n];H(q);)o.expressions.push(J(e,r));return z(o,ye)}function J(e,r){var t=!r&&(r={start:0},!0),n=y(),o=function(e,r){var t=y(),n=function(e,r){var t=y(),n=no(r);return r&&r.start?n:function e(r,t,n,o){var a=F.binop;if(null!=a&&(!o||F!==mt)){var i,u,s;if(n<a)return (i=g(t)).left=r,i.operator=R,u=F,M(),s=y(),i.right=e(no(),s,a,o),z(i,u===Rt||u===Dt?we:xe),e(i,t,n,o)}return r}(n,t,-1,e)}(e,r);if(r&&r.start)return n;if(H(xt))return (r=g(t)).test=n,r.consequent=J(),Y(bt),r.alternate=J(e),z(r,Me);return n}(e,r);return F.isAssign?((n=g(n)).operator=R,n.left=F===It?Ln(o):o,r.start=0,G(o),M(),n.right=J(e),z(n,E)):(t&&r.start&&X(r.start),o)}function no(e){var r;if(F.prefix)return t=_(),r=F.isUpdate,t.operator=R,t.prefix=!0,M(),t.argument=no(),e&&e.start&&X(e.start),r?G(t.argument):Ir&&"delete"===t.operator&&t.argument.type===A&&T(t.start,"Deleting local variable in strict mode"),z(t,r?ke:Ee);var t,n=y(),o=oo(e);if(e&&e.start)return o;for(;F.postfix&&!Pn();)(t=g(n)).operator=R,t.prefix=!1,G(t.argument=o),M(),o=z(t,ke);return o}function oo(e){var r=y(),t=io(e);return e&&e.start?t:ao(t,r)}function ao(e,r,t){var n;return H(kt)?((n=g(r)).object=e,n.property=W(!0),n.computed=!1,ao(z(n,S),r,t)):H(yt)?((n=g(r)).object=e,n.property=to(),n.computed=!0,Y(gt),ao(z(n,S),r,t)):!t&&H(P)?((n=g(r)).callee=e,n.arguments=go(B,!1),ao(z(n,oe),r,t)):F===$t?((n=g(r)).tag=e,n.quasi=so(),ao(z(n,Oe),r,t)):e}function io(e){switch(F){case it:var r=_();return M(),z(r,Le);case ft:if(Ar){var t=_();M(),H(L)||Pn()?(t.delegate=!1,t.argument=null):(t.delegate=H(Mt),t.argument=J());return z(t,ae);}case j:var t=y(),n=W(F!==j);return !Pn()&&H(wt)?mo(g(t),[n]):n;case jr:return (r=_()).regex={pattern:R.pattern,flags:R.flags},r.value=R.value,r.raw=V.slice(O,yr),M(),z(r,b);case Tr:case Ur:return (r=_()).value=R,r.raw=V.slice(O,yr),M(),z(r,b);case pt:case dt:case ht:return (r=_()).value=F.atomValue,r.raw=F.keyword,M(),z(r,b);case P:n=y();if(6<=I.ecmaVersion){M();for(var o,a,i=y(),u=[],s=!0,c={start:0};F!==B;){if(s?s=!1:Y(q),F===St){o=O,u.push(_n());break}F!==P||a||(a=O),u.push(J(!1,c));}var l=y();if(Y(B),!Pn()&&H(wt))return a&&X(a),mo(g(n),u);u.length||X(Er),o&&X(o),c.start&&X(c.start),1<u.length?((f=g(i)).expressions=u,function(e,r,t){I.locations&&(e.loc.end=t[1],t=t[0]),e.type=r,e.end=t,I.ranges&&(e.range[1]=t);}(f,ye,l)):f=u[0];}else f=Qn();return I.preserveParens?((i=g(n)).expression=f,z(i,ge)):f;case yt:r=_();return M(),r.elements=go(gt,!0,!0,e),z(r,w);case U:return co(!1,e);case Gr:r=_();return M(),po(r,!1);case ut:return yo(_(),!1);case at:l=_(),i=(M(),y());return l.callee=ao(io(),i,!0),H(P)?l.arguments=go(B,!1):l.arguments=Dr,z(l,be);case $t:return so();case lt:return f=_(),M(),f.source=io(),z(f,_e);default:X();}var f;}function uo(){var e=_();return e.value={raw:V.slice(O,yr),cooked:R},M(),e.tail=F===$t,z(e,"TemplateElement")}function so(){var e=_(),r=(M(),e.expressions=[],uo());for(e.quasis=[r];!r.tail;)Y(Ct),e.expressions.push(to()),Y(N),e.quasis.push(r=uo());return M(),z(e,me)}function co(e,r){var t=_(),n=!0,o={};for(t.properties=[],M();!H(N);){if(n)n=!1;else if(Y(q),I.allowTrailingCommas&&H(N))break;var a,i,u=_();6<=I.ecmaVersion&&(u.method=!1,u.shorthand=!1,(e||r)&&(i=y()),e||(a=H(Mt))),lo(u),H(bt)?(u.value=e?Yn():J(!1,r),u.kind="init"):6<=I.ecmaVersion&&F===P?(e&&X(),u.kind="init",u.method=!0,u.value=ho(a)):5<=I.ecmaVersion&&!u.computed&&u.key.type===A&&("get"===u.key.name||"set"===u.key.name)&&F!=q&&F!=N?((a||e)&&X(),u.kind=u.key.name,lo(u),u.value=ho(!1)):6<=I.ecmaVersion&&!u.computed&&u.key.type===A?(u.kind="init",e?u.value=Yn(i,u.key):F===It&&r?(r.start||(r.start=O),u.value=Yn(i,u.key)):u.value=u.key,u.shorthand=!0):X(),!function(e,r){if(!(6<=I.ecmaVersion)){var t,n=e.key;switch(n.type){case A:t=n.name;break;case b:t=String(n.value);break;default:return}var o,a,e=e.kind||"init";qn(r,t)?(o=r[t],a="init"!==e,(!Ir&&!a||!o[e])&&a^o.init||T(n.start,"Redefinition of property")):o=r[t]={init:!1,get:!1,set:!1},o[e]=!0;}}(u,o),t.properties.push(z(u,"Property"));}return z(t,e?s:x)}function lo(e){if(6<=I.ecmaVersion){if(H(yt))return e.computed=!0,e.key=to(),Y(gt);e.computed=!1;}e.key=F===Tr||F===Ur?io():W(!0);}function fo(e){e.id=null,6<=I.ecmaVersion&&(e.generator=!1,e.expression=!1);}function po(e,r,t){return fo(e),6<=I.ecmaVersion&&(e.generator=H(Mt)),!r&&F!==j||(e.id=W()),Y(P),e.params=Hn(B,!1),vo(e,t),z(e,r?Q:K)}function ho(e){var r=_();return fo(r),Y(P),r.params=Hn(B,!1),e=6<=I.ecmaVersion&&(r.generator=e,!0),vo(r,e),z(r,K)}function mo(e,r){return fo(e),e.params=Mn(r,!0),vo(e,!0),z(e,t)}function vo(e,r){var t,n,o,r=r&&F!==U;if(r?(e.body=J(),e.expression=!0):(t=Cr,n=Ar,o=D,Cr=!0,Ar=e.generator,D=[],e.body=Kn(!0),e.expression=!1,Cr=t,Ar=n,D=o),Ir||!r&&e.body.body.length&&Tn(e.body.body[0])){var a={};e.id&&Xn(e.id,{});for(var i=0;i<e.params.length;i++)Xn(e.params[i],a);}}function yo(e,r){M(),e.id=F===j?W():r?X():null,e.superClass=H(st)?oo():null;var t,n,o=_();for(o.body=[],Y(U);!H(N);)H(L)||(t=_(),n=H(Mt),lo(t),F===P||t.computed||t.key.type!==A||"static"!==t.key.name?t.static=!1:(n&&X(),t.static=!0,n=H(Mt),lo(t)),F===P||t.computed||t.key.type!==A||"get"!==t.key.name&&"set"!==t.key.name?t.kind="":(n&&X(),t.kind=t.key.name,lo(t)),t.value=ho(n),o.body.push(z(t,ve)));return e.body=z(o,he),z(e,r?pe:de)}function go(e,r,t,n){for(var o,a,i=[],u=!0;!H(e);){if(u)u=!1;else if(Y(q),r&&I.allowTrailingCommas&&H(e))break;t&&F===q?i.push(null):F===St?i.push((o=n,a=void 0,a=_(),M(),a.argument=J(o),z(a,C))):i.push(J(!1,n));}return i}function W(e){var r=_();return e&&"everywhere"==I.forbidReserved&&(e=!1),F===j?(!e&&(I.forbidReserved&&(3===I.ecmaVersion?zt:Ht)(R)||Ir&&Yt(R))&&-1==V.slice(O,yr).indexOf("\\")&&T(O,"The keyword '"+R+"' is reserved"),r.name=R):e&&F.keyword?r.name=F.keyword:X(),M(),z(r,A)}var bo={console:console,setTimeout:setTimeout,setInterval:setInterval,clearTimeout:clearTimeout,clearInterval:clearInterval,encodeURI:encodeURI,encodeURIComponent:encodeURIComponent,decodeURI:decodeURI,decodeURIComponent:decodeURIComponent,Infinity:1/0,NaN:NaN,isFinite:isFinite,isNaN:isNaN,parseFloat:parseFloat,parseInt:parseInt,Object:Object,Boolean:Boolean,Error:Error,EvalError:EvalError,RangeError:RangeError,ReferenceError:ReferenceError,SyntaxError:SyntaxError,TypeError:TypeError,URIError:URIError,Number:Number,Math:Math,Date:Date,String:String,RegExp:RegExp,Array:Array,JSON:JSON,Promise:Promise},ko=(xo.prototype.run=function(e,r){void 0===r&&(r={}),this.source=e,this.initScope(r);r=hr.parse(e,{locations:!0,ecmaVersion:6});try{d(r,this.mainScope,this);}catch(e){throw e}return this.mainScope.$find("exports").value},xo.prototype.initScope=function(r){var t=this;this.mainScope=new sr("block"),this.mainScope.$const("exports",{}),this.mainScope.$const("this",this),Object.keys(bo).forEach(function(e){t.mainScope.$const(e,bo[e]);}),Object.keys(r).forEach(function(e){t.mainScope.$const(e,r[e]);});},xo);function xo(){this.source="",this.traceId=0,this.traceStack=[],this.mainScope=new sr("block"),this.currentNode=null;}function wo(e,r){return (new ko).run(e,r)}

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
        return { naruseType: 'text', content: childNodes, id: id, _uid: id };
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
var version = "0.3.0";
initVersionLogger('naruse-alipay', version);
// naruse模块内容
var Naruse = __assign(__assign(__assign({ Component: NaruseComponent, createElement: createElement, getDeferred: getDeferred, globalEvent: globalEvent, EventBus: EventBus, env: {
        clientName: 'alipay',
        clientVersion: version,
        language: 'zh-Hans',
        platform: 'alipay',
    }, version: version }, my), apis), { withPage: withPage, unsafe_run: wo });
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
            exports = wo(code, __assign(__assign({ h: createElement, Naruse: Naruse, my: typeof my === 'object' ? my : {} }, baseCtx), ctx));
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
 * @description 简单的o(n^2)diff操作，同时更新node
 * @author CHC
 * @date 2022-10-11 14:10:32
 * @param {*} newVnode 新生成的vnode
 * @param {*} oldVnode 旧的vnode
 * @param {Middware} middware 中间件
 * @param {string} [path=''] 小程序内部data路径
 * @returns {*}
 */
var vnodeDiff = function (newVnode, oldVnode, newParentNode, oldParentNode, path, diffRes) {
    var _a;
    if (path === void 0) { path = 'node'; }
    if (diffRes === void 0) { diffRes = {}; }
    var res = diffRes;
    if (newVnode === oldVnode)
        return res;
    // just null
    if (!newVnode) {
        res[path] = {};
        return res;
    }
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
var allowPropagetionEventNames = ['onLongClick', 'onClick'];
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
var methodsTags = ['tap', 'input', 'blur', 'focus', 'load', 'change', 'confirm', 'keyBoardHeightChange', 'scroll', 'scrollToUpper', 'scrollToLower', 'touchStart', 'touchMove', 'touchEnd', 'touchCancel'];
var methodTagTransformMap = {
    'tap': 'click',
    'longPress': 'longClick'
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
