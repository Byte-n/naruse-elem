"use strict";
require("../common.js");
require("../runtime.js");

(my["webpackJsonp"] = my["webpackJsonp"] || []).push([["/cc/index"],{

/***/ "../../node_modules/.pnpm/babel-loader@8.2.1_5gfccicuqyfmuaxis3rjolnab4/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!./demo/pages/cc/index.js":
/*!**************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/babel-loader@8.2.1_5gfccicuqyfmuaxis3rjolnab4/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!./demo/pages/cc/index.js ***!
  \**************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Demo; }
/* harmony export */ });
/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Naruse */ "Naruse");
/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Naruse__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common */ "./demo/common.js");
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
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
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
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
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
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
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
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
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}


var Demo = /*#__PURE__*/function (_Naruse$Component) {
  _inherits(Demo, _Naruse$Component);
  var _super = _createSuper(Demo);
  function Demo() {
    _classCallCheck(this, Demo);
    return _super.apply(this, arguments);
  }
  _createClass(Demo, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;
      console.log('componentDidMount');
      setTimeout(function () {
        _this.setState({
          a: 1
        });
      }, 1000);
    }
  }, {
    key: "cc",
    value: function cc() {
      console.log('cc', _common__WEBPACK_IMPORTED_MODULE_1__.cc);
    }
  }, {
    key: "render",
    value: function render() {
      return '你好';
    }
  }]);
  return Demo;
}((Naruse__WEBPACK_IMPORTED_MODULE_0___default().Component));


/***/ }),

/***/ "./demo/pages/cc/index.js":
/*!********************************!*\
  !*** ./demo/pages/cc/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Naruse */ "Naruse");
/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Naruse__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_babel_loader_8_2_1_5gfccicuqyfmuaxis3rjolnab4_node_modules_babel_loader_lib_index_js_ruleSet_1_rules_0_use_0_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/.pnpm/babel-loader@8.2.1_5gfccicuqyfmuaxis3rjolnab4/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!./index.js */ "../../node_modules/.pnpm/babel-loader@8.2.1_5gfccicuqyfmuaxis3rjolnab4/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!./demo/pages/cc/index.js");


var config = {}
var inst = (0,Naruse__WEBPACK_IMPORTED_MODULE_0__.createMiniFactory)('page', _node_modules_pnpm_babel_loader_8_2_1_5gfccicuqyfmuaxis3rjolnab4_node_modules_babel_loader_lib_index_js_ruleSet_1_rules_0_use_0_index_js__WEBPACK_IMPORTED_MODULE_1__["default"], config)

/***/ }),

/***/ "Naruse":
/*!*********************************************!*\
  !*** external "../../naruse-alipay/lib.js" ***!
  \*********************************************/
/***/ (function(module) {

module.exports = require("../../naruse-alipay/lib.js");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["common"], function() { return __webpack_exec__("./demo/pages/cc/index.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);;