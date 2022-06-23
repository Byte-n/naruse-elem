function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

const createLogger = name => {
  const Logger = {
    debug() {
      console.debug(`[${name}][debugger]`, ...arguments);
    },

    warn() {
      console.warn(`[${name}][warn]`, ...arguments);
    },

    info() {
      console.info(`[${name}][info]`, ...arguments);
    },

    error() {
      console.error(`[${name}][error]`, ...arguments);
    }

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

const temporarilyNotSupport = function temporarilyNotSupport(apiName) {
  return () => {
    const errMsg = `暂时不支持 API ${apiName}`;
    logger$1.error(errMsg);
    return Promise.reject({
      errMsg
    });
  };
};

/** 简易事件中心 */
class EventBus {
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

  clear() {
    this.listeners = {};
  }

}
/** 全局事件中心 */


const globalEvent = new EventBus();

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

const isEmpty = key => {
  if (key === undefined || key === '' || key === null) {
    return true;
  }

  if (typeof key === 'string') {
    key = key.replace(trimReg, '');

    if (key === '' || key === null || key === 'null' || key === undefined || key === 'undefined') {
      return true;
    }

    return false;
  } else if (typeof key === 'undefined') {
    return true;
  } else if (typeof key === 'object') {
    for (const i in key) {
      return false;
    }

    return true;
  } else if (typeof key === 'boolean') {
    return false;
  }
};
/**
 * @description 判断是否是函数
 * @author CHC
 * @date 2022-04-07 13:04:03
 * @param {*} obj
 */

const isFunc = obj => typeof obj === 'function';

/**
 * @description 处理api
 * @author CHC
 * @date 2022-04-07 12:04:21
 * @param {*} Naruse Naruse对象
 * @param {*} global 全局对象
 * @param {*} [config={}]
 */

const processApis = function processApis(Naruse, global, config = {}) {
  if (!global) return;
  const apis = config.needPromiseApis || [];
  const syncApis = config.needSyncApis || [];
  const {
    transformMeta
  } = config; // 处理所有需要promisify的api

  apis.forEach(key => {
    const originKey = key;

    Naruse[originKey] = (options = {}, ...args) => {
      let key = originKey; // 第一个参数 options 为字符串，单独处理

      if (typeof options === 'string') {
        if (args.length) {
          return global[key](options, ...args);
        }

        return global[key](options);
      } // 改变 key 或 option 字段


      if (config.transformMeta) {
        const {
          key: newKey,
          options: newOpt
        } = transformMeta(key, options);
        key = newKey;
        options = newOpt; // 新 key 可能不存在

        if (!global.hasOwnProperty(key)) {
          return temporarilyNotSupport(key)();
        }
      }
      const obj = Object.assign({}, options); // Promisify

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

const version = '0.0.7';

var logger = createLogger('naruse-element');

var NOOP = function NOOP() {};

var _config = {
  hotPuller: function hotPuller() {
    logger.error('未初始化热更新拉取，无法更新组件默认为空');
    return Promise.resolve({
      code: '',
      ctx: {}
    });
  },
  baseCtx: function baseCtx() {
    return {};
  },
  onRunError: function onRunError(err) {
    console.error(err);
  }
};
/**
 * @description 获取初始化
 * @author CHC
 * @date 2022-06-14 10:06:50
 * @returns {{ _config: () => Promise<{ code, ctx }>  }} 
 */

var getNaruseConfig = function getNaruseConfig() {
  return _config;
};
/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 */


var naruseInit = function naruseInit() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      hotPuller = _ref.hotPuller,
      baseCtx = _ref.baseCtx,
      onRunError = _ref.onRunError;

  if (hotPuller) _config.hotPuller = hotPuller;
  if (baseCtx) _config.baseCtx = baseCtx;
  if (onRunError) _config.onRunError = onRunError;
};

const types = {
  num: 'num',
  string: 'string',
  name: 'name',
  bracketL: '[',
  bracketR: ']',
  braceL: '{',
  braceR: '}',
  parenL: '(',
  parenR: ')',
  comma: ',',
  semi: ';',
  colon: ':',
  dot: '.',
  question: '?',
  eq: '=',
  logicalOR: '||',
  logicalAND: '&&',
  bitwiseOR: '|',
  bitwiseXOR: '^',
  bitwiseAND: '&',
  plusMin: '+/-',
  incDec: '++/--',
  equality: '==/!=/===/!==',
  relational: '</>/<=/>=',
  prefix: '!/~',
  modulo: '%',
  star: '*',
  slash: '/',
  assign: '_=',
  _break: 'break',
  _continue: 'continue',
  _else: 'else',
  _for: 'for',
  _function: 'function',
  _if: 'if',
  _return: 'return',
  _var: 'var',
  _const: 'const',
  _let: 'let',
  _in: 'in',
  _instanceof: 'instanceof',
  _new: 'new',
  _import: 'import',
  _null: 'null',
  _true: 'true',
  _false: 'false',
  _void: 'void',
  _typeof: 'typeof',
  _delete: 'delete',
  _try: 'try',
  _catch: 'catch',
  _throw: 'throw',
  _finally: '_finally'
};
const emptyChar = ['\n', '\t', ' ', '\r'];

const isEmptyChar = char => emptyChar.includes(char);

const tt = types;
const keywords = [tt._break, tt._continue, tt._else, tt._for, tt._function, tt._if, tt._return, tt._const, tt._let, tt._null, tt._false, tt._true, tt._var, tt._in, tt._instanceof, tt._new];
const priority = {
  [tt.logicalOR]: 1,
  [tt.logicalAND]: 2,
  [tt.bitwiseOR]: 3,
  [tt.bitwiseAND]: 5,
  [tt.equality]: 6,
  [tt.relational]: 7,
  [tt.plusMin]: 9,
  [tt.modulo]: 10,
  [tt.star]: 10,
  [tt.slash]: 10,
  [tt._in]: 7,
  [tt._instanceof]: 7
}; // 标记器

class Token {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.tokens = [];
  }

  scan() {
    while (1) {
      const code = this.input[this.pos];

      if (isEmptyChar(code)) {
        this.pos++;
        continue;
      }

      if (!code) break;
      code.match(/[a-zA-Z_$]/) ? this.readWord() : this.getTokenFromCode(code.charCodeAt());
    }

    return this.tokens;
  }

  getTokenFromCode(code) {
    switch (code) {
      case 46:
        return this.readToken_dot();

      case 40:
        ++this.pos;
        return this.ftk(tt.parenL);

      case 41:
        ++this.pos;
        return this.ftk(tt.parenR);

      case 59:
        ++this.pos;
        return this.ftk(tt.semi);

      case 63:
        ++this.pos;
        return this.ftk(tt.question);

      case 44:
        ++this.pos;
        return this.ftk(tt.comma);

      case 91:
        ++this.pos;
        return this.ftk(tt.bracketL);

      case 93:
        ++this.pos;
        return this.ftk(tt.bracketR);

      case 123:
        ++this.pos;
        return this.ftk(tt.braceL);

      case 125:
        ++this.pos;
        return this.ftk(tt.braceR);

      case 58:
        ++this.pos;
        return this.ftk(tt.colon);

      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.readNumber(code);

      case 34:
      case 39:
        return this.readString(code);

      case 37:
      case 42:
      case 47:
        return this.readToken_mult_modulo_exp(code);

      case 124:
      case 38:
        return this.readToken_pipe_amp(code);

      case 43:
      case 45:
        return this.readToken_plus_min(code);

      case 60:
      case 62:
        return this.readToken_lt_gt(code);

      case 61:
      case 33:
        return this.readToken_eq_excl(code);
    }

    ++this.pos;
    console.warn(this.pos, `Unexpected character '${code}'`);
  }

  readWord() {
    let word = '';
    let code;

    while (code = this.input[this.pos]) {
      if (code.match(/[a-zA-Z0-9\_\$]/)) {
        word += code;
        this.pos++;
      } else break;
    }

    let type = tt.name;

    if (keywords.includes(word)) {
      type = word;
    }

    return this.ftk(type, word);
  }

  readToken_lt_gt(code) {
    const next = this.gnc();
    let size = 1;

    if (next === code) {
      size = code === 62 && this.gnc(2) === 62 ? 3 : 2;
      if (this.gnc(size) === 61) return this.finishOp(tt.assign, size + 1);
      return this.finishOp(tt.bitShift, size);
    }

    if (next === 61) size = 2;
    return this.finishOp(tt.relational, size);
  }

  readNumber(code) {
    let val = 0;

    while (code > 47 && code < 58 || code === 46) {
      val++;
      code = this.gnc(val);
    }

    return this.finishOp(tt.num, parseFloat(val));
  }

  readString(code) {
    const startCode = code;
    let out = '';
    code = this.gnc();

    while (code !== startCode) {
      out += this.input[++this.pos];
      code = this.gnc();
    }

    this.pos = this.pos + 2;
    return this.ftk(tt.string, out);
  }

  readToken_mult_modulo_exp(code) {
    const next = this.gnc();
    const operator = String.fromCharCode(code);
    const tokentype = priority[operator] && operator;

    if (next === 61) {
      this.pos++;
      return this.finishOp(tt.assign, 2);
    }

    return this.finishOp(tokentype, 1);
  }

  finishOp(type, size) {
    const str = this.input.substring(this.pos, this.pos + size);
    this.pos += size;
    return this.ftk(type, str);
  }

  ftk(type, value) {
    this.tokens.push({
      type,
      value,
      start: this.pos,
      end: this.pos + (value && value.length || type.length)
    });
  }

  readToken_pipe_amp(code) {
    const next = this.gnc();
    if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
    return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
  }

  readToken_dot() {
    const next = this.gnc();
    if (next >= 48 && next <= 57) return this.readNumber(true);
    this.pos++;
    return this.ftk(tt.dot);
  }

  gnc(size = 1) {
    return this.input[this.pos + size].charCodeAt();
  }

  readToken_plus_min(code) {
    const next = this.gnc();
    if (next === code) return this.finishOp(tt.incDec, 2);
    if (next === 61) return this.finishOp(tt.assign, 2);
    return this.finishOp(tt.plusMin, 1);
  }

  readToken_eq_excl(code) {
    const next = this.gnc();
    if (next === 61) return this.finishOp(tt.equality, this.gnc(2) === 61 ? 3 : 2);
    return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
  }

} // 解析器


class Parser {
  constructor(code) {
    this.tokens = new Token(code).scan();
    this.index = -1;
  }

  parse() {
    const node = {
      body: []
    };
    this.nextToken();
    return this.parseTopLevel(node);
  }

  eat(type) {
    if (this.type === type) {
      this.next();
      return true;
    }

    return false;
  }

  nextToken() {
    this.token = this.tokens[++this.index];
    this.type = this.token && this.token.type;
    this.value = this.token && this.token.value;
    this.start = this.token && this.token.start;
    this.end = this.token && this.token.end;
  }

  finishNode(node, type) {
    node.type = type;
    node.start = this.start || 0;
    node.end = this.end || 0;
    return node;
  }

  parseTopLevel(node) {
    while (this.type) {
      const stmt = this.parseStatement(true);
      node.body.push(stmt);
    }

    return this.finishNode(node, 'Program');
  }

  parseStatement(topLevel) {
    const node = {};

    switch (this.type) {
      case tt._break:
      case tt._continue:
        return this.parseBreakContinueStatement(node, this.value);

      case tt._for:
        return this.parseForStatement(node);

      case tt._function:
        {
          this.next();
          return this.parseFunctionStatement(node);
        }

      case tt._if:
        return this.parseIfStatement(node);

      case tt._return:
        return this.parseReturnStatement(node);

      case tt._const:
      case tt._var:
      case tt._let:
        return this.parseVarStatement(node, this.value);

      case tt.braceL:
        return this.parseBlock(node);

      case tt.semi:
        return this.parseEmptyStatement(node);

      default:
        {
          const expr = this.parseExpression();
          return this.parseExpressionStatement(node, expr);
        }
    }
  }

  parseExpressionStatement(node, expr) {
    node.expression = expr;
    this.eat(tt.semi);
    return this.finishNode(node, 'ExpressionStatement');
  }

  parseEmptyStatement(node) {
    this.next();
    return this.finishNode(node, 'EmptyStatement');
  }

  parseVarStatement(node, kind) {
    this.next();
    this.parseVar(node, false, kind);
    this.eat(tt.semi);
    return this.finishNode(node, 'VariableDeclaration');
  }

  parseVar(node, isFor, kind) {
    node.declarations = [];
    node.kind = kind;

    for (;;) {
      const decl = {};
      this.parseVarId(decl, kind);

      if (this.eat(tt.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else {
        decl.init = null;
      }

      node.declarations.push(this.finishNode(decl, 'VariableDeclarator'));
      if (!this.eat(tt.comma)) break;
    }

    return node;
  }

  parseIdent() {
    const node = {};

    if (this.type === tt.name) {
      node.name = this.value;
    } else {
      this.raise('无法处理的token');
    }

    this.next();
    return this.finishNode(node, 'Identifier');
  }

  parseMaybeAssign(forInit) {
    const left = this.parseMaybeConditional(forInit);

    if (this.isAssign()) {
      const node = {};
      node.operator = this.value;
      node.left = left;
      this.next();
      node.right = this.parseMaybeAssign(forInit);
      return this.finishNode(node, 'AssignmentExpression');
    }

    return left;
  }

  parseMaybeConditional(forInit) {
    const expr = this.parseExprOps(forInit);

    if (this.eat(tt.question)) {
      const node = {};
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(tt.colon);
      node.alternate = this.parseMaybeAssign(forInit);
      return this.finishNode(node, 'ConditionalExpression');
    }

    return expr;
  }

  parseExprOps(forInit) {
    const expr = this.parseMaybeUnary(forInit);
    return this.parseExprOp(expr, -1, forInit);
  }

  parseExprOp(left, minPrec, forInit) {
    const prec = priority[this.type];

    if (prec && !forInit) {
      if (prec > minPrec) {
        const logical = this.type === tt.logicalOR || this.type === tt.logicalAND;
        const coalesce = this.type === tt.coalesce;
        const op = this.value;
        this.next();
        const right = this.parseExprOp(this.parseMaybeUnary(forInit), prec, forInit);
        const node = this.buildBinary(left, right, op, logical || coalesce);
        return this.parseExprOp(node, minPrec, forInit);
      }
    }

    return left;
  }

  buildBinary(left, right, op, logical) {
    const node = {};
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(node, logical ? 'LogicalExpression' : 'BinaryExpression');
  }

  parseMaybeUnary(forInit) {
    let expr;

    if ([tt.incDec, tt.prefix, tt.plusMin].includes(this.type)) {
      const node = {};
      const update = this.type === tt.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(forInit);
      expr = this.finishNode(node, update ? 'UpdateExpression' : 'UnaryExpression');
    } else {
      expr = this.parseExprSubscripts(forInit);

      while (this.type === tt.incDec) {
        const node = {};
        node.operator = this.value;
        node.prefix = false;
        node.argument = expr;
        this.next();
        expr = this.finishNode(node, 'UpdateExpression');
      }
    }

    return expr;
  }

  parseExprSubscripts(forInit) {
    const expr = this.parseExprAtom(forInit);
    const result = this.parseSubscripts(expr, false, forInit);
    return result;
  }

  parseSubscript(base, noCalls) {
    const computed = this.eat(tt.bracketL);

    if (computed || this.eat(tt.dot)) {
      const node = {};
      node.object = base;

      if (computed) {
        node.property = this.parseExpression();
        this.expect(tt.bracketR);
      } else {
        node.property = this.parseIdent();
      }

      node.computed = !!computed;
      base = this.finishNode(node, 'MemberExpression');
    } else if (!noCalls && this.eat(tt.parenL)) {
      const exprList = this.parseExprList(tt.parenR);
      const node = {};
      node.callee = base;
      node.arguments = exprList;
      base = this.finishNode(node, 'CallExpression');
    }

    return base;
  }

  parseExpression(forInit) {
    const expr = this.parseMaybeAssign(forInit);

    if (this.type === tt.comma) {
      const node = {};
      node.expressions = [expr];

      while (this.eat(tt.comma)) node.expressions.push(this.parseMaybeAssign(forInit));

      return this.finishNode(node, 'SequenceExpression');
    }

    return expr;
  }

  parseSubscripts(base, noCalls) {
    while (true) {
      const element = this.parseSubscript(base, noCalls);

      if (element === base) {
        return element;
      }

      base = element;
    }
  }

  parseLiteral(value) {
    const node = this.finishNode({
      value: (this.type === tt.string ? String : parseFloat)(value)
    }, 'Literal');
    this.next();
    return node;
  }

  parseExprAtom(forInit) {
    const node = {};

    switch (this.type) {
      case tt.name:
        return this.parseIdent(false);

      case tt.num:
      case tt.string:
        return this.parseLiteral(this.value);

      case tt._null:
      case tt._true:
      case tt._false:
        node.value = this.type === tt._null ? null : this.type === tt._true;
        node.raw = this.type;
        this.next();
        return this.finishNode(node, 'Literal');

      case tt.parenL:
        return this.parseParenAndDistinguishExpression(forInit);

      case tt.bracketL:
        this.next();
        node.elements = this.parseExprList(tt.bracketR);
        return this.finishNode(node, 'ArrayExpression');

      case tt.braceL:
        return this.parseObj(false);

      case tt._function:
        this.next();
        return this.parseFunctionStatement(node);

      case tt._new:
        return this.parseNew();

      default:
        this.raise(`无法处理的token${this.type}`);
    }
  }

  parseNew() {
    const node = {};
    this.next();
    node.callee = this.parseSubscripts(this.parseExprAtom(), true);
    if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR);else node.arguments = [];
    return this.finishNode(node, 'NewExpression');
  }

  parseObj(isPattern) {
    const node = {};
    let first = true;
    node.properties = [];
    this.next();

    while (!this.eat(tt.braceR)) {
      if (!first) {
        this.expect(tt.comma);
      } else first = false;

      const prop = this.parseProperty(isPattern);
      node.properties.push(prop);
    }

    return this.finishNode(node, isPattern ? 'ObjectPattern' : 'ObjectExpression');
  }

  parseProperty() {
    const prop = {};
    prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent();

    if (this.eat(tt.colon)) {
      prop.value = this.parseMaybeAssign(false);
      prop.kind = 'init';
    } else this.raise('属性名后无效属性');

    return this.finishNode(prop, 'Property');
  }

  parseParenAndDistinguishExpression() {
    return this.parseParenExpression();
  }

  parseVarId(decl) {
    decl.id = this.parseIdent();
  }

  parseReturnStatement(node) {
    this.next();
    if (this.eat(tt.semi) || this.type === tt.braceR) node.argument = null;else node.argument = this.parseExpression();
    return this.finishNode(node, 'ReturnStatement');
  }

  parseIfStatement(node) {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement();
    node.alternate = this.eat(tt._else) ? this.parseStatement() : null;
    return this.finishNode(node, 'IfStatement');
  }

  parseParenExpression() {
    this.expect(tt.parenL);
    const val = this.parseExpression();
    this.expect(tt.parenR);
    return val;
  }

  parseFunctionStatement(node) {
    node.id = this.type !== tt.name ? null : this.parseIdent();
    this.parseFunctionParams(node);
    this.parseFunctionBody(node);
    return this.finishNode(node, 'FunctionDeclaration');
  }

  parseFunctionParams(node) {
    this.expect(tt.parenL);
    node.params = this.parseBindingList(tt.parenR, false);
  }

  parseFunctionBody(node) {
    node.body = this.parseBlock(undefined);
  }

  parseBlock(node = {}) {
    node.body = []; // 支持单行代码块

    const hasL = this.eat(tt.braceL);

    while (this.type && this.type !== tt.braceR) {
      const stmt = this.parseStatement();
      node.body.push(stmt);
      if (!hasL) break;
    }

    this.next();
    return this.finishNode(node, 'BlockStatement');
  }

  parseBindingList(close) {
    const elts = [];
    let first = true;

    while (!this.eat(close)) {
      if (first) first = false;else this.expect(tt.comma);
      const elem = this.parseMaybeDefault();
      elts.push(elem);
    }

    return elts;
  }

  parseExprList(close) {
    const elts = [];
    let first = true;

    while (!this.eat(close)) {
      if (!first) {
        this.expect(tt.comma);
      } else first = false;

      elts.push(this.parseMaybeAssign(false));
    }

    return elts;
  }

  parseMaybeDefault(left) {
    left = left || this.parseIdent();
    if (!this.eat(tt.eq)) return left;
    const node = {};
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, 'AssignmentPattern');
  }

  parseBreakContinueStatement(node, keyword) {
    const isBreak = keyword === 'break';
    this.next();
    return this.finishNode(node, isBreak ? 'BreakStatement' : 'ContinueStatement');
  }

  next() {
    this.nextToken();
  }

  parseForStatement(node) {
    this.next();
    this.expect(tt.parenL);

    if (this.type === tt.semi) {
      return this.parseFor(node, null);
    }

    if ([tt._const, tt._var, tt._let].includes(this.type)) {
      const init = {
        kind: this.type
      };
      this.next();
      this.parseVar(init, true, init.kind);
      this.finishNode(init, 'VariableDeclaration');
      return this.parseFor(node, init);
    }

    const init = this.parseExpression(true);
    return this.parseFor(node, init);
  }

  isAssign() {
    return [tt.assign, tt.eq].includes(this.type);
  }

  raise(str) {
    throw new Error(str);
  }

  parseFor(node, init) {
    node.init = init;
    this.expect(tt.semi);
    node.test = this.type === tt.semi ? null : this.parseExpression();
    this.expect(tt.semi);
    node.update = this.type === tt.parenR ? null : this.parseExpression();
    this.expect(tt.parenR);
    this.parseBlock(node);
    return this.finishNode(node, 'ForStatement');
  }

  expect(type) {
    this.eat(type) || this.raise(`unsupport type${type}`);
  }

}

const _defineProperty = function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

const _typeof = obj => typeof obj;
/** 常用的polyfill 直接加入引擎 */


const babelPolyfill = {
  _defineProperty,
  typeof: _typeof
};

let anonymousId = 0;
const BREAK_SINGAL = {};
const CONTINUE_SINGAL = {};
const RETURN_SINGAL = {
  result: undefined
};
const illegalFun = [setTimeout, setInterval, clearInterval, clearTimeout];
const evaluate_map = {
  Program: (program, scope) => {
    for (const node of program.body) evaluate(node, scope);
  },
  Identifier: (node, scope) => {
    if (node.name === 'undefined') {
      return undefined;
    } // 奇怪的问题


    const $var = scope.$find(node.name);

    if ($var) {
      return $var.$get();
    }

    throw `[Error] 变量'${node.name}' 未定义`;
  },
  Literal: node => {
    return node.value;
  },
  BlockStatement: (block, scope) => {
    const new_scope = scope.invasived ? scope : new Scope('block', scope);

    for (const node of block.body) {
      const result = evaluate(node, new_scope);

      if (result === BREAK_SINGAL || result === CONTINUE_SINGAL || result === RETURN_SINGAL) {
        return result;
      }
    }
  },
  EmptyStatement: () => {},
  ExpressionStatement: (node, scope) => {
    evaluate(node.expression, scope);
  },
  ReturnStatement: (node, scope) => {
    RETURN_SINGAL.result = node.argument ? evaluate(node.argument, scope) : undefined;
    return RETURN_SINGAL;
  },
  BreakStatement: () => {
    return BREAK_SINGAL;
  },
  ContinueStatement: () => {
    return CONTINUE_SINGAL;
  },
  IfStatement: (node, scope) => {
    if (evaluate(node.test, scope)) return evaluate(node.consequent, scope);else if (node.alternate) return evaluate(node.alternate, scope);
  },
  ForStatement: (node, scope) => {
    for (const new_scope = new Scope('loop', scope), init_val = node.init ? evaluate(node.init, new_scope) : null; node.test ? evaluate(node.test, new_scope) : true; node.update ? evaluate(node.update, new_scope) : void 0) {
      const result = evaluate({
        type: 'BlockStatement',
        body: node.body
      }, new_scope);

      if (result === BREAK_SINGAL) {
        break;
      } else if (result === CONTINUE_SINGAL) {
        continue;
      } else if (result === RETURN_SINGAL) {
        return result;
      }
    }
  },
  FunctionDeclaration: (node, scope) => {
    const func = evaluate_map.FunctionExpression(node, scope);
    const {
      name: func_name
    } = node.id || {
      name: `anonymous${anonymousId++}`
    };

    if (!scope.$var(func_name, func)) {
      throw `[Error] ${func_name} 重复定义`;
    }

    return func;
  },
  VariableDeclaration: (node, scope) => {
    const {
      kind
    } = node;

    for (const declartor of node.declarations) {
      const {
        name
      } = declartor.id;
      const value = declartor.init ? evaluate(declartor.init, scope) : undefined;

      if (!scope.$declar(kind, name, value)) {
        throw `[Error] ${name} 重复定义`;
      }
    }
  },
  ThisExpression: (node, scope) => {
    const this_val = scope.$find('this');
    return this_val ? this_val.$get() : null;
  },
  ArrayExpression: (node, scope) => {
    return node.elements.map(item => evaluate(item, scope));
  },
  ObjectExpression: (node, scope) => {
    const object = {};

    for (const property of node.properties) {
      const {
        kind
      } = property;
      let key;

      if (property.key.type === 'Literal') {
        key = evaluate(property.key, scope);
      } else if (property.key.type === 'Identifier') {
        key = property.key.name;
      }

      const value = evaluate(property.value, scope);

      if (kind === 'init') {
        object[key] = value;
      } else if (kind === 'set') {
        Object.defineProperty(object, key, {
          set: value
        });
      } else if (kind === 'get') {
        Object.defineProperty(object, key, {
          get: value
        });
      }
    }

    return object;
  },
  FunctionExpression: (node, scope) => {
    function func(...args) {
      const new_scope = new Scope('function', scope);
      new_scope.invasived = true;

      for (let i = 0; i < node.params.length; i++) {
        const {
          name
        } = node.params[i];
        new_scope.$const(name, args[i]);
      }

      new_scope.$const('this', this);
      new_scope.$const('arguments', arguments);
      const result = evaluate(node.body, new_scope);

      if (result === RETURN_SINGAL) {
        return result.result;
      }
    }

    Object.defineProperty(func, "length", {
      value: node.params.length
    });
    return func;
  },
  UnaryExpression: (node, scope) => {
    return {
      '-': () => -evaluate(node.argument, scope),
      '+': () => +evaluate(node.argument, scope),
      '!': () => !evaluate(node.argument, scope),
      '~': () => ~evaluate(node.argument, scope),
      'void': () => void evaluate(node.argument, scope),
      'typeof': () => {
        if (node.argument.type === 'Identifier') {
          const $var = scope.$find(node.argument.name);
          return $var ? typeof $var.$get() : 'undefined';
        } else {
          return typeof evaluate(node.argument, scope);
        }
      },
      'delete': () => {
        if (node.argument.type === 'MemberExpression') {
          const {
            object,
            property,
            computed
          } = node.argument;

          if (computed) {
            return delete evaluate(object, scope)[evaluate(property, scope)];
          } else {
            return delete evaluate(object, scope)[property.name];
          }
        } else if (node.argument.type === 'Identifier') {
          const $this = scope.$find('this');
          if ($this) return $this.$get()[node.argument.name];
        }
      }
    }[node.operator]();
  },
  UpdateExpression: (node, scope) => {
    const {
      prefix
    } = node;
    let $var;

    if (node.argument.type === 'Identifier') {
      const {
        name
      } = node.argument;
      $var = scope.$find(name);
      if (!$var) throw `${name} 未定义`;
    } else if (node.argument.type === 'MemberExpression') {
      const {
        argument
      } = node;
      const object = evaluate(argument.object, scope);
      const property = argument.computed ? evaluate(argument.property, scope) : argument.property.name;
      $var = {
        $set(value) {
          object[property] = value;
          return true;
        },

        $get() {
          return object[property];
        }

      };
    }

    return {
      '--': v => ($var.$set(v - 1), prefix ? --v : v--),
      '++': v => ($var.$set(v + 1), prefix ? ++v : v++)
    }[node.operator](evaluate(node.argument, scope));
  },
  BinaryExpression: (node, scope) => {
    return {
      '==': (a, b) => a == b,
      '!=': (a, b) => a != b,
      '===': (a, b) => a === b,
      '!==': (a, b) => a !== b,
      '<': (a, b) => a < b,
      '<=': (a, b) => a <= b,
      '>': (a, b) => a > b,
      '>=': (a, b) => a >= b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '%': (a, b) => a % b,
      '|': (a, b) => a | b,
      '^': (a, b) => a ^ b,
      '&': (a, b) => a & b,
      in: (a, b) => a in b,
      instanceof: (a, b) => a instanceof b
    }[node.operator](evaluate(node.left, scope), evaluate(node.right, scope));
  },
  AssignmentExpression: (node, scope) => {
    let $var;

    if (node.left.type === 'Identifier') {
      const {
        name
      } = node.left;
      const $var_or_not = scope.$find(name);
      if (!$var_or_not) throw `${name} 未定义`;
      $var = $var_or_not;
    } else if (node.left.type === 'MemberExpression') {
      const {
        left
      } = node;
      const object = evaluate(left.object, scope);
      const property = left.computed ? evaluate(left.property, scope) : left.property.name;
      $var = {
        $set(value) {
          object[property] = value;
          return true;
        },

        $get() {
          return object[property];
        }

      };
    } else {
      throw '如果出现在这里，那就说明有问题了';
    }

    return {
      '=': v => ($var.$set(v), v),
      '+=': v => ($var.$set($var.$get() + v), $var.$get()),
      '-=': v => ($var.$set($var.$get() - v), $var.$get()),
      '*=': v => ($var.$set($var.$get() * v), $var.$get()),
      '/=': v => ($var.$set($var.$get() / v), $var.$get()),
      '%=': v => ($var.$set($var.$get() % v), $var.$get()),
      '|=': v => ($var.$set($var.$get() | v), $var.$get()),
      '^=': v => ($var.$set($var.$get() ^ v), $var.$get()),
      '&=': v => ($var.$set($var.$get() & v), $var.$get())
    }[node.operator](evaluate(node.right, scope));
  },
  LogicalExpression: (node, scope) => {
    return {
      '||': () => evaluate(node.left, scope) || evaluate(node.right, scope),
      '&&': () => evaluate(node.left, scope) && evaluate(node.right, scope)
    }[node.operator]();
  },
  MemberExpression: (node, scope) => {
    const {
      object,
      property,
      computed
    } = node;

    if (computed) {
      return evaluate(object, scope)[evaluate(property, scope)];
    }

    return evaluate(object, scope)[property.name];
  },
  ConditionalExpression: (node, scope) => {
    return evaluate(node.test, scope) ? evaluate(node.consequent, scope) : evaluate(node.alternate, scope);
  },
  CallExpression: (node, scope) => {
    let this_val = null;
    let func = null; // fix: ww().ww().ww()

    if (node.callee.type === 'MemberExpression') {
      const {
        object,
        property,
        computed
      } = node.callee;
      this_val = evaluate(object, scope);
      const funcName = !computed ? property.name : evaluate_map[property.type](property, scope);
      func = this_val[funcName];
      if (illegalFun.includes(func)) this_val = null;
    } else {
      this_val = scope.$find('this').$get();
      func = evaluate(node.callee, scope); // fix: setTimeout.apply({}, '');

      if (illegalFun.includes(func)) this_val = null;
    }

    return func.apply(this_val, node.arguments.map(arg => evaluate(arg, scope)));
  },
  NewExpression: (node, scope) => {
    const Func = evaluate(node.callee, scope);
    const args = node.arguments.map(arg => evaluate(arg, scope));
    return new Func(...args);
  },
  SequenceExpression: (node, scope) => {
    let last;

    for (const expr of node.expressions) {
      last = evaluate(expr, scope);
    }

    return last;
  },
  ThrowStatement: (node, scope) => {
    throw evaluate(node.argument, scope);
  },
  TryStatement: (node, scope) => {
    try {
      return evaluate(node.block, scope);
    } catch (err) {
      if (node.handler) {
        const param = node.handler.param;
        const new_scope = new Scope('block', scope);
        new_scope.invasived = true; // 标记为侵入式Scope，不用再多构造啦

        new_scope.$const(param.name, err);
        return evaluate(node.handler, new_scope);
      } else {
        throw err;
      }
    } finally {
      if (node.finalizer) return evaluate(node.finalizer, scope);
    }
  },
  CatchClause: (node, scope) => {
    return evaluate(node.body, scope);
  }
};

class ScopeVar {
  constructor(kind, value) {
    this.value = value;
    this.kind = kind;
  }

  $set(value) {
    if (this.value === 'const') {
      return false;
    }

    this.value = value;
    return true;
  }

  $get() {
    return this.value;
  }

}

class Scope {
  constructor(type, parent) {
    this.type = type;
    this.parent = parent || null;
    this.content = {};
    this.invasived = false;
    this.prefix = '';
  }

  $find(raw_name) {
    const name = this.prefix + raw_name;

    if (this.content.hasOwnProperty(name)) {
      return this.content[name];
    } else if (this.parent) {
      return this.parent.$find(raw_name);
    }

    return null;
  }

  $let(raw_name, value) {
    const name = this.prefix + raw_name;
    const $var = this.content[name];

    if (!$var) {
      this.content[name] = new ScopeVar('let', value);
      return true;
    }

    return false;
  }

  $const(raw_name, value) {
    const name = this.prefix + raw_name;
    const $var = this.content[name];

    if (!$var) {
      this.content[name] = new ScopeVar('const', value);
      return true;
    }

    return false;
  }

  $var(raw_name, value) {
    const name = this.prefix + raw_name;
    let scope = this;

    while (scope.parent !== null && scope.type !== 'function') {
      scope = scope.parent;
    }

    const $var = scope.content[name];

    if (!$var) {
      this.content[name] = new ScopeVar('var', value);
      return true;
    }

    return false;
  }

  $declar(kind, raw_name, value) {
    return {
      var: () => this.$var(raw_name, value),
      let: () => this.$let(raw_name, value),
      const: () => this.$const(raw_name, value)
    }[kind]();
  }

} // 记录每条语句的id


let traceId = 0; // 记录执行栈

const traceStack = []; // 正在执行的语句

let runingCode = '';

const findErrorCode = pos => {
  if (!pos) return runingCode;
  pos = pos < 0 ? -1 : pos;
  let headPos = pos;
  let endPos = pos;
  let headCount = 0;
  let endCount = 0;
  const endFlag = runingCode.length - 1;
  const res = [0, endFlag];

  while (!(headPos === -1 && endPos === endFlag)) {
    if (headPos !== -1) {
      // ; \r
      if ([59, 19].includes(runingCode[headPos].charCodeAt())) {
        if (headCount === 2) {
          res[0] = headPos + 1;
          headPos = -1;
        } else {
          headCount++;
          headPos++;
        }
      } else {
        headPos !== -1 && headPos--;
      }
    }

    if (endPos !== endFlag) {
      if ([59, 19].includes(runingCode[endPos].charCodeAt())) {
        if (endCount === 2) {
          res[1] = endPos;
          endPos = endFlag;
        } else {
          endCount++;
          endPos++;
        }
      } else {
        endPos++;
      }
    }
  }

  const errorCode = runingCode.slice(res[0], res[1]);
  const repeatNum = res[1] - res[0];
  return `${errorCode}\n${'^'.repeat(repeatNum > 40 ? 40 : repeatNum)}`;
};

const evaluate = (node, scope, arg) => {
  const thisId = traceId++;

  const error = err => {
    // console.log(err, thisId, traceId, traceStack)
    // 栈顶的id等于当前id，说明是当前语句
    if (traceStack[traceStack.length - 1] === thisId && err) {
      console.error(`[naruse-parser] 错误代码\n${findErrorCode(node.end - 3)}`);
      err && console.error('[naruse-parser] 错误信息', err);
      throw new Error('[naruse-parser] 代码执行错误！');
    }
  };

  traceStack.push(thisId);

  const _evalute = evaluate_map[node.type] || error();

  try {
    const res = _evalute(node, scope, arg);

    traceStack.pop();
    return res;
  } catch (e) {
    error(e);
  }
}; // 导出默认对象


const default_api = {
  console,
  setTimeout,
  setInterval,
  clearTimeout,
  clearInterval,
  encodeURI,
  encodeURIComponent,
  decodeURI,
  decodeURIComponent,
  Infinity,
  NaN,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  Object,
  Boolean,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  Number,
  Math,
  Date,
  String,
  RegExp,
  Array,
  JSON,
  Promise
};
Object.assign(default_api, babelPolyfill);
const run = (code, append_api = {}) => {
  runingCode = code;
  traceStack.length = 0;
  const scope = new Scope('block');
  scope.$const('this', undefined);

  for (const name of Object.getOwnPropertyNames(default_api)) {
    scope.$const(name, default_api[name]);
  }

  for (const name of Object.getOwnPropertyNames(append_api)) {
    scope.$const(name, append_api[name]);
  }

  const $exports = {};
  scope.$const('exports', $exports);
  const parser = new Parser(code);
  const node = parser.parse();
  evaluate(node, scope);
  return $exports;
};

/**
 * @description naruseComponent 实现
 * @author CHC
 * @date 2022-03-21 14:03:21
 * @class NaruseComponent
 */

var NaruseComponent$1 = /*#__PURE__*/function () {
  function NaruseComponent(props) {
    _classCallCheck(this, NaruseComponent);

    this.state = {};
    this.props = props;
    this.$mounted = false; // 中间件实例

    this.$updater = null;
  }

  _createClass(NaruseComponent, [{
    key: "setState",
    value: function setState(update) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NOOP;

      if (!this.$updater) {
        logger.error('小程序组件未装载完毕，无法更新！');
        return;
      }

      if (_typeof$1(update) !== 'object') {
        logger.error('setState 不支持的数据格式！', update);
        return;
      }

      if (this.state === update) return;

      var newState = _objectSpread2(_objectSpread2({}, this.state), update);

      var flag = this.$updater.shouldUpdate(this.props, newState);
      this.state = newState;
      flag && this.$updater.update(callback);
    }
  }, {
    key: "forceUpdate",
    value: function forceUpdate() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NOOP;

      if (!this.$updater) {
        logger.error('小程序组件未装载完毕，无法更新！');
        return;
      }

      this.$updater.update(callback);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {}
  }]);

  return NaruseComponent;
}();
/** 判断是否是NaruseComponent */

var isNaruseComponent = function isNaruseComponent(obj) {
  return obj instanceof NaruseComponent$1;
};

/**
 * @description 虚拟dom创建特殊处理map
 * @type {*}
 */

var vnodeSpecialMap = {
  text: function text(props, childNodes) {
    return {
      content: childNodes ? childNodes[0] : ''
    };
  }
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

var createElement = function createElement(type, props) {
  for (var _len = arguments.length, childNodes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    childNodes[_key - 2] = arguments[_key];
  }

  if (isNaruseComponent(type.prototype)) return createClassElement(type, props, childNodes);
  if (typeof type === 'function') return createFuncElement(type, props, childNodes);
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

var createClassElement = function createClassElement(type, props, childNodes) {
  props = _objectSpread2(_objectSpread2({}, props), {}, {
    children: childNodes
  }); // 先不实例化对象，等待组件装载完成后再实例化

  var component = {
    actuator: type,
    props: props
  };
  return {
    naruseType: 'naruse-element',
    component: component
  };
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


var createBaseElement = function createBaseElement(type, props, childNodes) {
  var newNode = {};
  if (vnodeSpecialMap[type]) newNode = vnodeSpecialMap[type](props, childNodes);
  childNodes = childNodes.flat && childNodes.flat(1) || childNodes;
  childNodes = childNodes.map(function (child) {
    if (typeof child === 'string' || typeof child === 'number') return {
      naruseType: 'text',
      content: child
    };
    return child;
  });

  var node = _objectSpread2(_objectSpread2({
    naruseType: type
  }, props), {}, {
    childNodes: childNodes
  }, newNode);

  return node;
};
/**
 * @description 创建一个函数式组件
 * @author CHC
 * @date 2022-03-15 12:03:45
 */


var createFuncElement = function createFuncElement(type, props, childNodes) {
  return type(_objectSpread2(_objectSpread2({}, props), {}, {
    children: childNodes
  }));
};

var apiDiff = {
  getClipboardData: {
    alias: 'getClipboard'
  },
  setClipboardData: {
    alias: 'setClipboard',
    options: {
      change: [{
        old: 'data',
        "new": 'text'
      }]
    }
  }
};
var transformMeta = function transformMeta(api, options) {
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
            options[changeItem["new"]] = options[changeItem.old];
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
    options: options
  };
};
var handleSyncApis = function handleSyncApis(key, global, args) {
  if (key === 'getStorageSync') {
    var arg1 = args[0];

    if (arg1 != null) {
      var res = global[key]({
        key: arg1
      }); // 支付宝小程序遗留bug：值可能在data或APDataStorage字段下

      var data = null;

      if (res.hasOwnProperty('data')) {
        data = res.data;
      } else if (res.hasOwnProperty('APDataStorage')) {
        data = res.APDataStorage;
      }

      return data === null ? '' : data;
    }

    return console.error('getStorageSync 传入参数错误');
  }

  if (key === 'setStorageSync') {
    var _arg = args[0];
    var arg2 = args[1];

    if (_arg != null) {
      return global[key]({
        key: _arg,
        data: arg2
      });
    }

    return console.error('setStorageSync 传入参数错误');
  }

  if (key === 'removeStorageSync') {
    var _arg2 = args[0];

    if (_arg2 != null) {
      return global[key]({
        key: _arg2
      });
    }

    return console.error('removeStorageSync 传入参数错误');
  }

  if (key === 'createSelectorQuery') {
    var query = global[key]();

    query["in"] = function () {
      return query;
    };

    return query;
  }

  return global[key].apply(global, args);
};
var needPromiseApis = ['getStorage', 'setStorage', 'removeStorage', 'clearStorage', 'getStorageInfo', 'getSystemInfo', 'navigateTo', 'navigateBack', 'setClipboard', 'getClipboard'];
var syncApis = ['getStorageSync', 'setStorageSync', 'removeStorageSync', 'clearStorageSync', 'getStorageInfoSync'];
var qnPromiseApis = ['navigateToWebPage'];
/**
 * @description 初始化alipay的api
 * @author CHC
 * @date 2022-04-07 13:04:59
 * @returns {*}
 */

var initNaruseAlipayApi = function initNaruseAlipayApi() {
  var NaruseApiInterface = {};
  processApis(NaruseApiInterface, my, {
    transformMeta: transformMeta,
    needPromiseApis: needPromiseApis,
    handleSyncApis: handleSyncApis,
    needSyncApis: syncApis
  });
  processApis(NaruseApiInterface, my.qn, {
    needPromiseApis: qnPromiseApis
  });
  return NaruseApiInterface;
};

var pageCenter = {};
/**
 * @description 获取naruse内部的页面对象
 * @author CHC
 * @date 2022-05-04 18:05:46
 * @param {Page} miniComponent
 */

var getPageInstance = function getPageInstance(miniComponent) {
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

var Page = /*#__PURE__*/function () {
  function Page(miniPage) {
    _classCallCheck(this, Page);

    // 小程序实例
    this.miniPage = miniPage; // 事件中心

    this.eventCenter = new EventBus(); // 各个原有事件

    this.oldEvents = {}; // 替换监听事件

    this.interceptEvent('onShow');
    this.interceptEvent('onHide');
    this.interceptEvent('onUnload');
    this.interceptEvent('onPullDownRefresh');
    this.interceptEvent('onPageScroll'); // this.eventCenter.on('onUnload', () => setTimeout(() => this.clear()));
  }
  /**
   * @description 拦截小程序页面事件，将事件改造为事件中心机制
   * @author CHC
   * @date 2022-05-05 10:05:43
   * @param {*} key
   * @param {*} value
   */


  _createClass(Page, [{
    key: "interceptEvent",
    value: function interceptEvent(key) {
      var _this = this;

      var selfPage = this; // 保存原有事件并进入事件中心

      selfPage.oldEvents[key] = selfPage.miniPage[key];
      var oldEvent = selfPage.miniPage[key]; // 原有事件同样挂载到事件中心

      selfPage.eventCenter.on(key, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return typeof oldEvent === 'function' && oldEvent.apply(_this.miniPage, args);
      });
      Object.defineProperty(this.miniPage, key, {
        get: function get() {
          return function () {
            return selfPage.eventCenter.emit(key);
          };
        },
        set: function set() {
          logger.error('正在修改页面事件，请勿修改，请使用Naruse.Page.on()');
        },
        enumerable: true,
        configurable: true
      });
    }
  }, {
    key: "on",
    value: function on(eventName, func) {
      this.eventCenter.on(eventName, func);
    }
  }, {
    key: "off",
    value: function off(eventName, func) {
      this.eventCenter.off(eventName, func);
    }
  }, {
    key: "route",
    get: function get() {
      return this.miniPage.route;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this2 = this;

      this.eventCenter.clear(); // 替换回对应的事件

      Object.keys(this.oldEvents).forEach(function (key) {
        _this2.miniPage[key] = _this2.oldEvents[key];
      }); // 清除引用

      this.miniPage = null;
      this.oldEvents = {};
    }
  }]);

  return Page;
}();

var withPage = function withPage(component) {
  return /*#__PURE__*/function (_NaruseComponent) {
    _inherits(_class, _NaruseComponent);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "render",
      value: function render() {
        var page = getPageInstance(this.$updater && this.$updater.component);
        var currentPage = {
          route: page.route,
          events: {
            on: page.on.bind(page),
            off: page.off.bind(page)
          }
        };
        return createElement(component, _objectSpread2(_objectSpread2({}, this.props), {}, {
          currentPage: currentPage
        }));
      }
    }]);

    return _class;
  }(NaruseComponent$1);
};

var apis = initNaruseAlipayApi(); // naruse模块内容

var Naruse = _objectSpread2(_objectSpread2(_objectSpread2({
  Component: NaruseComponent$1,
  globalEvent: globalEvent,
  EventBus: EventBus,
  env: {
    clientName: 'alipay',
    clientVersion: version,
    language: 'zh-Hans',
    platform: 'alipay'
  },
  version: version
}, my), apis), {}, {
  withPage: withPage
});
var naruseExtend = function naruseExtend(opt) {
  if (_typeof$1(opt) === 'object') {
    Object.assign(Naruse, opt);
  }
};
my.Naruse = Naruse;

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */

var getNaruseComponentFromProps = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(props) {
    var _getNaruseConfig, hotPuller, _yield$hotPuller, code, ctx;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!props || _typeof$1(props) !== 'object')) {
              _context.next = 3;
              break;
            }

            logger.error('无效参数，无法生成对应naruse组件');
            return _context.abrupt("return");

          case 3:
            _getNaruseConfig = getNaruseConfig(), hotPuller = _getNaruseConfig.hotPuller;
            _context.prev = 5;
            _context.next = 8;
            return hotPuller(props);

          case 8:
            _yield$hotPuller = _context.sent;
            code = _yield$hotPuller.code;
            ctx = _yield$hotPuller.ctx;
            return _context.abrupt("return", getNaruseComponentFromCode(code, ctx));

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](5);
            logger.error('加载远程代码资源失败', _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 14]]);
  }));

  return function getNaruseComponentFromProps(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 * @param {*} code
 * @param {*} ctx
 * @returns {*} 
 */

var getNaruseComponentFromCode = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(code, ctx) {
    var _getNaruseConfig2, _baseCtx, onRunError, baseCtx, exports, component, compatibleClass;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (code) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            _getNaruseConfig2 = getNaruseConfig(), _baseCtx = _getNaruseConfig2.baseCtx, onRunError = _getNaruseConfig2.onRunError;
            baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx; // 导出变量

            exports = {};
            _context2.prev = 5;
            exports = run(code, _objectSpread2(_objectSpread2({
              h: createElement,
              Naruse: Naruse,
              my: (typeof my === "undefined" ? "undefined" : _typeof$1(my)) === 'object' ? my : {}
            }, baseCtx), ctx));
            _context2.next = 14;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](5);
            logger.error('运行时出错，自动继续', _context2.t0);
            onRunError(_context2.t0);
            return _context2.abrupt("return");

          case 14:
            component = null; // 默认导出组件存在

            if (exports["default"]) {
              component = exports["default"];
            } else {
              // 兼容老版组件
              compatibleClass = function compatibleClass() {
                var self = this;

                for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                  args[_key] = arguments[_key];
                }

                NaruseComponent.apply(this, args);
                exports.constructor && exports.constructor.call(this);
                Object.entries(exports).forEach(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      key = _ref4[0],
                      value = _ref4[1];

                  if (key === 'constructor') return;
                  self[key] = typeof value === 'function' ? value.bind(self) : value;
                });
              };

              compatibleClass.prototype = Object.create(NaruseComponent.prototype);
              Object.assign(compatibleClass.prototype, {
                constructor: compatibleClass
              });
              component = compatibleClass;
            }

            return _context2.abrupt("return", component);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[5, 9]]);
  }));

  return function getNaruseComponentFromCode(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

/** 允许继续冒泡的事件 */

var allowPropagetionEventNames = ['onLongClick', 'onClick'];
/**
 * @description 为元素生成随机id
 * @author CHC
 * @date 2022-02-23 09:02:25
 * @param {*} randomLength
 * @returns {*}
 */

var randomId = function randomId(randomLength) {
  var idStr = Date.now().toString(36);
  idStr += Math.random().toString(36).slice(2, randomLength);
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


var getPathById = function getPathById(id, vnode) {
  var path = [];
  if (vnode.id === id) return path;
  if (!vnode.childNodes || !vnode.childNodes.length) return; // 层次遍历

  for (var i = 0; i < vnode.childNodes.length; i++) {
    if (vnode.childNodes[i].id === id) {
      path.push(i);
      return path;
    }
  }

  for (var _i = 0; _i < vnode.childNodes.length; _i++) {
    var childPath = getPathById(id, vnode.childNodes[_i]);

    if (childPath) {
      path.push(_i);

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

var getVnodeById = function getVnodeById(id, vnode) {
  var path = getPathById(id, vnode);
  if (!path) return undefined;
  if (!path.length) return vnode;
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

var initVnodeTree = function initVnodeTree(vnode, parentId) {
  var newNode = vnode;
  if (!vnode || _typeof$1(vnode) !== 'object') return {}; // 没有id的挂上id

  if (!newNode.id) newNode.id = randomId(16);
  newNode.parentId = parentId; // 递归遍历

  if (Array.isArray(newNode.childNodes)) {
    newNode.childNodes.forEach(function (node) {
      return initVnodeTree(node, newNode.id);
    });
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
  change: 'onChange'
};
/**
 * @description 事件处理中心
 * @author CHC
 * @date 2022-02-23 09:02:22
 * @param {*} event
 * @param {*} nodeTree
 * @returns {*}
 */

var eventCenter = function eventCenter(event, nodeTree) {
  // 是否继续冒泡的标志
  var stopFlag = false; // 空事件不响应

  if (!(event && event.target && event.target.id)) return; // 空节点不响应

  var eventNode = getVnodeById(event.target.id, nodeTree);
  if (!eventNode) return; // 获取事件类型

  var type = event.type;
  var reflectedEventName = eventNameMap[type]; // 不支持的事件

  if (!reflectedEventName) {
    logger.warn("".concat(type, "\u4E8B\u4EF6\u4E0D\u652F\u6301"));
  } // 冒泡事件便允许阻止冒泡


  if (allowPropagetionEventNames.includes(reflectedEventName)) {
    stopFlag = true;

    event.stopPropagation = function () {
      stopFlag = false;
    };
  } // 反射事件名称


  var responseFuc = eventNode[reflectedEventName];

  if (!(responseFuc && typeof responseFuc === 'function')) ; else {
    // logger.debug(`元素${eventNode.naruseType}:触发${reflectedEventName}事件`);
    responseFuc.call(eventNode, event);
  } // 没有截断就继续冒泡


  if (stopFlag) {
    // logger.debug(`元素${eventNode.naruseType}: 冒泡${reflectedEventName}事件`);
    eventCenter(_objectSpread2(_objectSpread2({}, event), {}, {
      target: {
        id: eventNode.parentId
      },
      narusePropagetion: true
    }), nodeTree);
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
  props: {
    component: {}
  },
  data: {
    node: {}
  },
  methods: {
    onTap: allEvents,
    onLongPress: allEvents,
    onInputInput: allEvents,
    onInputBlur: allEvents,
    onInputFocus: allEvents,
    onImageLoad: allEvents,
    onCheckboxChange: allEvents
  }
};

/**
 * @description 两个props是否完全相同
 * @author CHC
 * @date 2022-03-21 18:03:59
 * @param {*} a
 * @param {*} b
 * @returns {*}
 */

var propsEquals = function propsEquals(a, b) {
  if (Object.is(a, b) && _typeof$1(a) !== 'object') {
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

var Middware = /*#__PURE__*/function () {
  function Middware(miniappComponent, NaruseComponentActuator, props) {
    _classCallCheck(this, Middware);

    this.props = props;
    this.component = miniappComponent;

    if (NaruseComponentActuator instanceof NaruseComponent$1) {
      this.naruseComponent = NaruseComponentActuator;
    } else {
      this.naruseComponent = new NaruseComponentActuator(props);
      this.naruseComponent.props = props;
    }

    this.naruseComponent.$updater = this;
    this.fristRender = true;
    this.updating = false;
  }
  /** 执行更新 */


  _createClass(Middware, [{
    key: "update",
    value: function update() {
      var _this = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NOOP;
      var self = this;
      !this.updating && Promise.resolve().then(function () {
        _this.updating = false;

        if (!_this.naruseComponent.render) {
          logger.error('组件必须需要一个render函数');
          return;
        }

        var vnode = _this.naruseComponent.render();

        var node = initVnodeTree(vnode);

        _this.component.setData({
          node: node
        }, function () {
          _this.onUpdated.call(self);

          callback();
        });
      });
      this.updating = true;
    }
    /** 更新后 */

  }, {
    key: "onUpdated",
    value: function onUpdated() {
      if (!this.naruseComponent) return;
      var funcName = this.fristRender ? 'componentDidMount' : 'componentDidUpdate';
      this.naruseComponent[funcName] && this.naruseComponent[funcName]();
      if (this.fristRender) this.naruseComponent.$mounted = true;
      this.fristRender = false;
    }
    /** 父组件更新后是否需要更新子组件 */

  }, {
    key: "canUpdate",
    value: function canUpdate(prevProps) {
      var c = this.naruseComponent;
      var flag = this.shouldUpdate(this.props, c ? c.state : {});

      if (flag && propsEquals(prevProps, this.props)) {
        this.prevProps = prevProps;
        c.props = this.props;
        this.update();
      }
    }
    /** 是否应该刷新 */

  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(nextProps, nextState) {
      var c = this.naruseComponent;
      if (!c || typeof c.shouldComponentUpdate !== 'function') return true;
      var res = c.shouldComponentUpdate.call(c, nextProps, nextState);
      return res === undefined ? true : res;
    }
    /** 卸载时 */

  }, {
    key: "onUnMount",
    value: function onUnMount() {
      this.naruseComponent && this.naruseComponent.componentWillUnmount(); // 解绑对象

      this.component = null;
      this.naruseComponent = null;
    }
  }]);

  return Middware;
}();

var bindedPages = {}; // 扩展能力，小程序环境内特殊的api

/**
 * @description 渲染某个组件到页面上
 * @author CHC
 * @date 2022-06-14 16:06:24
 * @param {*} page
 * @param {*} Component
 */

var renderComponentOnPage = function renderComponentOnPage(route, Component) {
  globalEvent.emit('naruse.renderComponentOnPage', route, Component);
};
/**
 * @description 绑定渲染中心到组件上，一个页面只允许绑定一个
 * @author CHC
 * @date 2022-06-14 15:06:16
 * @param {*} page
 * @param {*} Component
 */


var bindRenderEventOnComponent = function bindRenderEventOnComponent(miniComponent) {
  if (!miniComponent) return;
  var route = miniComponent.$page.route;

  if (bindedPages[route]) {
    logger.error("".concat(route, "-\u5DF2\u7ECF\u7ED1\u5B9A\u4E86\u4E8B\u4EF6\u4E2D\u5FC3"));
    return;
  }

  bindedPages[route] = miniComponent;
  miniComponent._naruseEventCenter = globalEvent;
  globalEvent.on('naruse.renderComponentOnPage', function (pageName, Component) {
    if (pageName !== route) return; // 卸载已有组件

    miniComponent.$middware && miniComponent.$middware.onUnMount(); // 重新加载组件

    miniComponent.$middware = new Middware(miniComponent, Component, {});
    miniComponent.$middware.update();
  });
};
/**
 * @description 使用代码渲染组件在某个页面
 * @author CHC
 * @date 2022-06-14 16:06:46
 * @param {*} route
 * @param {*} code
 * @param {*} ctx
 */


var renderComponentOnPageWithCode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(route, code, ctx) {
    var component;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (route) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.next = 4;
            return getNaruseComponentFromCode(code, ctx);

          case 4:
            component = _context.sent;
            renderComponentOnPage(route, component);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderComponentOnPageWithCode(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * @description 初始化naruse主组件
 * @author CHC
 * @date 2022-03-21 17:03:20
 * @returns {*}
 */

var initMainComponent = function initMainComponent() {
  var _this = this;

  getNaruseComponentFromProps(this.props).then(function (component) {
    if (!component) {
      logger.warn('无远程资源，不加载组件');
      return;
    }
    _this.$middware = new Middware(_this, component, {});

    _this.$middware.update();
  })["catch"](function (err) {
    logger.error('初始化主组件失败', err);
  });
};
/**
 * @description 初始化组件
 */


var createVmContext$1 = function createVmContext() {
  try {
    // 主组件
    initMainComponent.call(this);
  } catch (error) {
    logger.error('初始化失败', error);
  }
};
/**
 * @description 创建naruse默认行为
 * @author CHC
 * @date 2022-03-15 12:03:14
 * @returns {*}
 */


var createMainBehavior = function createMainBehavior() {
  var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // 小程序组件默认minxs对象
  var naruseBehavior = _objectSpread2(_objectSpread2({}, miniappEventBehavior), {}, {
    /**
     * @description 装载完毕后
     * @author CHC
     * @date 2022-03-16 10:03:05
     */
    didMount: function didMount() {
      var _ref = this.props || {},
          _ref$unique = _ref.unique,
          unique = _ref$unique === void 0 ? false : _ref$unique; // 绑定重新渲染事件


      if (unique) bindRenderEventOnComponent(this);
      this.option = option;
      createVmContext$1.call(this);
    },

    /**
     * @description 组件更新后
     * @author CHC
     * @date 2022-03-16 10:03:21
     */
    didUpdate: function didUpdate(prevProps) {
      // 参数不同则重新创建元素
      if (!propsEquals(prevProps, this.props)) {
        // 卸载
        this.$middware && this.$middware.onUnMount(); // 重新创建

        createVmContext$1.call(this);
      }
    },

    /**
     * @description 组件卸载后
     * @author CHC
     * @date 2022-03-16 10:03:36
     */
    didUnmount: function didUnmount() {
      this.$middware && this.$middware.onUnMount();
    }
  });

  return naruseBehavior;
};

/**
 * @description 初始化子虚拟组件
 * @author CHC
 * @date 2022-03-21 16:03:28
 * @param {*} component
 */

var initSubComponent = function initSubComponent() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var actuator = args.actuator,
      props = args.props;

  if (actuator) {
    this.$middware = new Middware(this, actuator, props || {});
    this.$middware.update();
  }
};
/**
 * @description 初始化组件
 */


var createVmContext = function createVmContext() {
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


var createSubBehavior = function createSubBehavior() {
  // 小程序组件默认minxs对象
  var naruseBehavior = _objectSpread2(_objectSpread2({}, miniappEventBehavior), {}, {
    /**
     * @description 装载完毕后
     * @author CHC
     * @date 2022-03-16 10:03:05
     */
    didMount: function didMount() {
      try {
        createVmContext.call(this);
      } catch (error) {
        logger.error('子组件初始化失败', error);
      }
    },

    /**
     * @description 组件更新后
     * @author CHC
     * @date 2022-03-16 10:03:21
     */
    didUpdate: function didUpdate(prevProps) {
      if (!isEmpty(this.props.component)) {
        var _prevProps$component = prevProps.component,
            props = _prevProps$component.props,
            actuator = _prevProps$component.actuator; // FIX: 修复了当切换装载器后不会卸载组件重新渲染
        // FIX: 修复了当key发生变化后组件不会重新渲染 0615

        if (actuator === this.props.component.actuator && props.key === this.props.component.props.key) {
          this.$middware.props = this.props.component.props;
          this.$middware.canUpdate(props);
        } else {
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
    didUnmount: function didUnmount() {
      this.$middware.onUnMount();
    }
  });

  return naruseBehavior;
};

naruseExtend({
  renderComponentOnPage: renderComponentOnPage
});

export { Naruse, createMainBehavior, createSubBehavior, naruseExtend, naruseInit, renderComponentOnPageWithCode };
