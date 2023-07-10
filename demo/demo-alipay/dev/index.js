export default "var $webpack=(typeof $webpack)[0]=='u'?{}:$webpack;var $outer={};/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.\n/******/ var __webpack_modules__ = ({\n\n/***/ \"Naruse\":\n/*!*************************!*\\\n  !*** external \"Naruse\" ***!\n  \\*************************/\n/***/ (function(module) {\n\n\"use strict\";\nmodule.exports = Naruse;\n\n/***/ })\n\n/******/ });\n/************************************************************************/\n/******/ // The module cache\n/******/ var __webpack_module_cache__ = {};\n/******/ \n/******/ // The require function\n/******/ function __webpack_require__(moduleId) {\n/******/ \t// Check if module is in cache\n/******/ \tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \tif (cachedModule !== undefined) {\n/******/ \t\treturn cachedModule.exports;\n/******/ \t}\n/******/ \t// Create a new module (and put it into the cache)\n/******/ \tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t// no module.id needed\n/******/ \t\t// no module.loaded needed\n/******/ \t\texports: {}\n/******/ \t};\n/******/ \n/******/ \t// Execute the module function\n/******/ \t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \n/******/ \t// Return the exports of the module\n/******/ \treturn module.exports;\n/******/ }\n/******/ \n/******/ // expose the modules object (__webpack_modules__)\n/******/ __webpack_require__.m = __webpack_modules__;\n/******/ \n/************************************************************************/\n/******/ /* webpack/runtime/compat get default export */\n/******/ !function() {\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction() { return module['default']; } :\n/******/ \t\t\tfunction() { return module; };\n/******/ \t\t__webpack_require__.d(getter, { a: getter });\n/******/ \t\treturn getter;\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/create fake namespace object */\n/******/ !function() {\n/******/ \tvar getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };\n/******/ \tvar leafPrototypes;\n/******/ \t// create a fake namespace object\n/******/ \t// mode & 1: value is a module id, require it\n/******/ \t// mode & 2: merge all properties of value into the ns\n/******/ \t// mode & 4: return value when already ns object\n/******/ \t// mode & 16: return value when it's Promise-like\n/******/ \t// mode & 8|1: behave like require\n/******/ \t__webpack_require__.t = function(value, mode) {\n/******/ \t\tif(mode & 1) value = this(value);\n/******/ \t\tif(mode & 8) return value;\n/******/ \t\tif(typeof value === 'object' && value) {\n/******/ \t\t\tif((mode & 4) && value.__esModule) return value;\n/******/ \t\t\tif((mode & 16) && typeof value.then === 'function') return value;\n/******/ \t\t}\n/******/ \t\tvar ns = Object.create(null);\n/******/ \t\t__webpack_require__.r(ns);\n/******/ \t\tvar def = {};\n/******/ \t\tleafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];\n/******/ \t\tfor(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {\n/******/ \t\t\tObject.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });\n/******/ \t\t}\n/******/ \t\tdef['default'] = function() { return value; };\n/******/ \t\t__webpack_require__.d(ns, def);\n/******/ \t\treturn ns;\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/define property getters */\n/******/ !function() {\n/******/ \t// define getter functions for harmony exports\n/******/ \t__webpack_require__.d = function(exports, definition) {\n/******/ \t\tfor(var key in definition) {\n/******/ \t\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n/******/ \t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t}\n/******/ \t\t}\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/ensure chunk */\n/******/ !function() {\n/******/ \t__webpack_require__.f = {};\n/******/ \t// This file contains only the entry chunk.\n/******/ \t// The chunk loading function for additional chunks\n/******/ \t__webpack_require__.e = function(chunkId) {\n/******/ \t\treturn Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {\n/******/ \t\t\t__webpack_require__.f[key](chunkId, promises);\n/******/ \t\t\treturn promises;\n/******/ \t\t}, []));\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/get javascript chunk filename */\n/******/ !function() {\n/******/ \t// This function allow to reference async chunks\n/******/ \t__webpack_require__.u = function(chunkId) {\n/******/ \t\t// return url for filenames based on template\n/******/ \t\treturn \"\" + chunkId + \".js\";\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/hasOwnProperty shorthand */\n/******/ !function() {\n/******/ \t__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/load script */\n/******/ !function() {\n/******/ \t// this template just for Naruse & naruse-parser load script\n/******/ \t// It's through global variable $$import to load script\n/******/ \t// cache inProgress scripts\n/******/ \tvar inProgress = {};\n/******/ \t__webpack_require__.l = function (url, onEnd) {\n/******/ \t\tif (inProgress[url]) {\n/******/ \t\t\tinProgress[url].then(onEnd);\n/******/ \t\t\treturn;\n/******/ \t\t}\n/******/ \t\tif (typeof $$import !== 'function') {\n/******/ \t\t\tthrow new Error('$$import 函数不存在！');\n/******/ \t\t}\n/******/ \t\tinProgress[url] = $$import(url);\n/******/ \t\tinProgress[url].then(setTimeout.bind(null, onEnd));\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/make namespace object */\n/******/ !function() {\n/******/ \t// define __esModule on exports\n/******/ \t__webpack_require__.r = function(exports) {\n/******/ \t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t}\n/******/ \t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t};\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/public path */\n/******/ !function() {\n/******/ \t__webpack_require__.p = \"\";\n/******/ }();\n/******/ \n/******/ /* webpack/runtime/jsonp chunk loading */\n/******/ !function() {\n/******/ \t// no baseURI\n/******/ \t\n/******/ \t// object to store loaded and loading chunks\n/******/ \t// undefined = chunk not loaded, null = chunk preloaded/prefetched\n/******/ \t// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded\n/******/ \tvar installedChunks = {\n/******/ \t\t\"index\": 0\n/******/ \t};\n/******/ \t\n/******/ \t__webpack_require__.f.j = function(chunkId, promises) {\n/******/ \t\t\t// JSONP chunk loading for javascript\n/******/ \t\t\tvar installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;\n/******/ \t\t\tif(installedChunkData !== 0) { // 0 means \"already installed\".\n/******/ \t\n/******/ \t\t\t\t// a Promise means \"currently loading\".\n/******/ \t\t\t\tif(installedChunkData) {\n/******/ \t\t\t\t\tpromises.push(installedChunkData[2]);\n/******/ \t\t\t\t} else {\n/******/ \t\t\t\t\tif(true) { // all chunks have JS\n/******/ \t\t\t\t\t\t// setup Promise in chunk cache\n/******/ \t\t\t\t\t\tvar promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });\n/******/ \t\t\t\t\t\tpromises.push(installedChunkData[2] = promise);\n/******/ \t\n/******/ \t\t\t\t\t\t// start chunk loading\n/******/ \t\t\t\t\t\tvar url = __webpack_require__.p + __webpack_require__.u(chunkId);\n/******/ \t\t\t\t\t\t// create error before stack unwound to get useful stacktrace later\n/******/ \t\t\t\t\t\tvar error = new Error();\n/******/ \t\t\t\t\t\tvar loadingEnded = function(event) {\n/******/ \t\t\t\t\t\t\tif(__webpack_require__.o(installedChunks, chunkId)) {\n/******/ \t\t\t\t\t\t\t\tinstalledChunkData = installedChunks[chunkId];\n/******/ \t\t\t\t\t\t\t\tif(installedChunkData !== 0) installedChunks[chunkId] = undefined;\n/******/ \t\t\t\t\t\t\t\tif(installedChunkData) {\n/******/ \t\t\t\t\t\t\t\t\tvar errorType = event && (event.type === 'load' ? 'missing' : event.type);\n/******/ \t\t\t\t\t\t\t\t\tvar realSrc = event && event.target && event.target.src;\n/******/ \t\t\t\t\t\t\t\t\terror.message = 'Loading chunk ' + chunkId + ' failed.\\n(' + errorType + ': ' + realSrc + ')';\n/******/ \t\t\t\t\t\t\t\t\terror.name = 'ChunkLoadError';\n/******/ \t\t\t\t\t\t\t\t\terror.type = errorType;\n/******/ \t\t\t\t\t\t\t\t\terror.request = realSrc;\n/******/ \t\t\t\t\t\t\t\t\tinstalledChunkData[1](error);\n/******/ \t\t\t\t\t\t\t\t}\n/******/ \t\t\t\t\t\t\t}\n/******/ \t\t\t\t\t\t};\n/******/ \t\t\t\t\t\t__webpack_require__.l(url, loadingEnded, \"chunk-\" + chunkId, chunkId);\n/******/ \t\t\t\t\t} else installedChunks[chunkId] = 0;\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t};\n/******/ \t\n/******/ \t// no prefetching\n/******/ \t\n/******/ \t// no preloaded\n/******/ \t\n/******/ \t// no HMR\n/******/ \t\n/******/ \t// no HMR manifest\n/******/ \t\n/******/ \t// no on chunks loaded\n/******/ \t\n/******/ \t// install a JSONP callback for chunk loading\n/******/ \tvar webpackJsonpCallback = function(parentChunkLoadingFunction, data) {\n/******/ \t\tvar chunkIds = data[0];\n/******/ \t\tvar moreModules = data[1];\n/******/ \t\tvar runtime = data[2];\n/******/ \t\t// add \"moreModules\" to the modules object,\n/******/ \t\t// then flag all \"chunkIds\" as loaded and fire callback\n/******/ \t\tvar moduleId, chunkId, i = 0;\n/******/ \t\tif(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {\n/******/ \t\t\tfor(moduleId in moreModules) {\n/******/ \t\t\t\tif(__webpack_require__.o(moreModules, moduleId)) {\n/******/ \t\t\t\t\t__webpack_require__.m[moduleId] = moreModules[moduleId];\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t\tif(runtime) var result = runtime(__webpack_require__);\n/******/ \t\t}\n/******/ \t\tif(parentChunkLoadingFunction) parentChunkLoadingFunction(data);\n/******/ \t\tfor(;i < chunkIds.length; i++) {\n/******/ \t\t\tchunkId = chunkIds[i];\n/******/ \t\t\tif(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {\n/******/ \t\t\t\tinstalledChunks[chunkId][0]();\n/******/ \t\t\t}\n/******/ \t\t\tinstalledChunks[chunkId] = 0;\n/******/ \t\t}\n/******/ \t\n/******/ \t}\n/******/ \t\n/******/ \tvar chunkLoadingGlobal = Object($webpack)[\"wpLs\"] = Object($webpack)[\"wpLs\"] || [];\n/******/ \tchunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));\n/******/ \tchunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));\n/******/ }();\n/******/ \n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be in strict mode.\n!function() {\n\"use strict\";\n/*!**************************!*\\\n  !*** ./advert/index.tsx ***!\n  \\**************************/\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Qwer; }\n/* harmony export */ });\n/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Naruse */ \"Naruse\");\n/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Naruse__WEBPACK_IMPORTED_MODULE_0__);\nfunction _assertThisInitialized(self) {\n    if (self === void 0) {\n        throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n    }\n    return self;\n}\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n    try {\n        var info = gen[key](arg);\n        var value = info.value;\n    } catch (error) {\n        reject(error);\n        return;\n    }\n    if (info.done) {\n        resolve(value);\n    } else {\n        Promise.resolve(value).then(_next, _throw);\n    }\n}\nfunction _asyncToGenerator(fn) {\n    return function() {\n        var self = this, args = arguments;\n        return new Promise(function(resolve, reject) {\n            var gen = fn.apply(self, args);\n            function _next(value) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value);\n            }\n            function _throw(err) {\n                asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err);\n            }\n            _next(undefined);\n        });\n    };\n}\nfunction _classCallCheck(instance, Constructor) {\n    if (!(instance instanceof Constructor)) {\n        throw new TypeError(\"Cannot call a class as a function\");\n    }\n}\nfunction _defineProperties(target, props) {\n    for(var i = 0; i < props.length; i++){\n        var descriptor = props[i];\n        descriptor.enumerable = descriptor.enumerable || false;\n        descriptor.configurable = true;\n        if (\"value\" in descriptor) descriptor.writable = true;\n        Object.defineProperty(target, descriptor.key, descriptor);\n    }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n    if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) _defineProperties(Constructor, staticProps);\n    return Constructor;\n}\nfunction _getPrototypeOf(o) {\n    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n        return o.__proto__ || Object.getPrototypeOf(o);\n    };\n    return _getPrototypeOf(o);\n}\nfunction _inherits(subClass, superClass) {\n    if (typeof superClass !== \"function\" && superClass !== null) {\n        throw new TypeError(\"Super expression must either be null or a function\");\n    }\n    subClass.prototype = Object.create(superClass && superClass.prototype, {\n        constructor: {\n            value: subClass,\n            writable: true,\n            configurable: true\n        }\n    });\n    if (superClass) _setPrototypeOf(subClass, superClass);\n}\nfunction _possibleConstructorReturn(self, call) {\n    if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n        return call;\n    }\n    return _assertThisInitialized(self);\n}\nfunction _setPrototypeOf(o, p) {\n    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n        o.__proto__ = p;\n        return o;\n    };\n    return _setPrototypeOf(o, p);\n}\nvar _typeof = function(obj) {\n    \"@swc/helpers - typeof\";\n    return obj && typeof Symbol !== \"undefined\" && obj.constructor === Symbol ? \"symbol\" : typeof obj;\n};\nfunction _isNativeReflectConstruct() {\n    if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n    if (Reflect.construct.sham) return false;\n    if (typeof Proxy === \"function\") return true;\n    try {\n        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));\n        return true;\n    } catch (e) {\n        return false;\n    }\n}\nfunction _createSuper(Derived) {\n    var hasNativeReflectConstruct = _isNativeReflectConstruct();\n    return function _createSuperInternal() {\n        var Super = _getPrototypeOf(Derived), result;\n        if (hasNativeReflectConstruct) {\n            var NewTarget = _getPrototypeOf(this).constructor;\n            result = Reflect.construct(Super, arguments, NewTarget);\n        } else {\n            result = Super.apply(this, arguments);\n        }\n        return _possibleConstructorReturn(this, result);\n    };\n}\nvar __generator = undefined && undefined.__generator || function(thisArg, body) {\n    var f, y, t, g, _ = {\n        label: 0,\n        sent: function() {\n            if (t[0] & 1) throw t[1];\n            return t[1];\n        },\n        trys: [],\n        ops: []\n    };\n    return g = {\n        next: verb(0),\n        \"throw\": verb(1),\n        \"return\": verb(2)\n    }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() {\n        return this;\n    }), g;\n    function verb(n) {\n        return function(v) {\n            return step([\n                n,\n                v\n            ]);\n        };\n    }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while(_)try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [\n                op[0] & 2,\n                t.value\n            ];\n            switch(op[0]){\n                case 0:\n                case 1:\n                    t = op;\n                    break;\n                case 4:\n                    _.label++;\n                    return {\n                        value: op[1],\n                        done: false\n                    };\n                case 5:\n                    _.label++;\n                    y = op[1];\n                    op = [\n                        0\n                    ];\n                    continue;\n                case 7:\n                    op = _.ops.pop();\n                    _.trys.pop();\n                    continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {\n                        _ = 0;\n                        continue;\n                    }\n                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {\n                        _.label = op[1];\n                        break;\n                    }\n                    if (op[0] === 6 && _.label < t[1]) {\n                        _.label = t[1];\n                        t = op;\n                        break;\n                    }\n                    if (t && _.label < t[2]) {\n                        _.label = t[2];\n                        _.ops.push(op);\n                        break;\n                    }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop();\n                    continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) {\n            op = [\n                6,\n                e\n            ];\n            y = 0;\n        } finally{\n            f = t = 0;\n        }\n        if (op[0] & 5) throw op[1];\n        return {\n            value: op[0] ? op[1] : void 0,\n            done: true\n        };\n    }\n};\n\nvar Qwer = function(Component) {\n    \"use strict\";\n    _inherits(Qwer, Component);\n    var _super = _createSuper(Qwer);\n    function Qwer() {\n        _classCallCheck(this, Qwer);\n        return _super.apply(this, arguments);\n    }\n    _createClass(Qwer, [\n        {\n            key: \"componentDidMount\",\n            value: function componentDidMount() {\n                return _asyncToGenerator(function() {\n                    var qq;\n                    return __generator(this, function(_state) {\n                        switch(_state.label){\n                            case 0:\n                                return [\n                                    4,\n                                    __webpack_require__.e(/*! import() */ \"advert_qwer_css\").then(__webpack_require__.t.bind(__webpack_require__, /*! ./qwer.css */ \"./advert/qwer.css\", 23))\n                                ];\n                            case 1:\n                                qq = _state.sent();\n                                console.log(\"ccc\", qq.ccc);\n                                return [\n                                    2\n                                ];\n                        }\n                    });\n                })();\n            }\n        },\n        {\n            key: \"render\",\n            value: function render() {\n                return Naruse.createElement(\"view\", null, \"123\");\n            }\n        }\n    ]);\n    return Qwer;\n}(Naruse__WEBPACK_IMPORTED_MODULE_0__.Component);\n\n\n}();\n$outer = __webpack_exports__;\nfor(var i in $outer)exports[i] = $outer[i];"