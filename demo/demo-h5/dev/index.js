var $webpack=(typeof $webpack)[0]=='u'?{}:$webpack;var $outer={};/******/ // runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ var __webpack_modules__ = ({

/***/ "Naruse":
/*!*************************!*\
  !*** external "Naruse" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = Naruse;

/***/ }),

/***/ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_array_like_to_array.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_array_like_to_array.js ***!
  \*********************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_array_like_to_array": function() { return /* binding */ _array_like_to_array; }
/* harmony export */ });
/* unused harmony export _ */
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
}



/***/ }),

/***/ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_array_with_holes.js":
/*!******************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_array_with_holes.js ***!
  \******************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_array_with_holes": function() { return /* binding */ _array_with_holes; }
/* harmony export */ });
/* unused harmony export _ */
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}



/***/ }),

/***/ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js":
/*!*************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js ***!
  \*************************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_iterable_to_array_limit": function() { return /* binding */ _iterable_to_array_limit; }
/* harmony export */ });
/* unused harmony export _ */
function _iterable_to_array_limit(arr, i) {
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



/***/ }),

/***/ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_non_iterable_rest.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_non_iterable_rest.js ***!
  \*******************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_non_iterable_rest": function() { return /* binding */ _non_iterable_rest; }
/* harmony export */ });
/* unused harmony export _ */
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}



/***/ }),

/***/ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_sliced_to_array.js":
/*!*****************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_sliced_to_array.js ***!
  \*****************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": function() { return /* binding */ _sliced_to_array; }
/* harmony export */ });
/* unused harmony export _sliced_to_array */
/* harmony import */ var _array_with_holes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_array_with_holes.js */ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_array_with_holes.js");
/* harmony import */ var _iterable_to_array_limit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_iterable_to_array_limit.js */ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_iterable_to_array_limit.js");
/* harmony import */ var _non_iterable_rest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_non_iterable_rest.js */ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_non_iterable_rest.js");
/* harmony import */ var _unsupported_iterable_to_array_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_unsupported_iterable_to_array.js */ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js");





function _sliced_to_array(arr, i) {
    return (0,_array_with_holes_js__WEBPACK_IMPORTED_MODULE_0__._array_with_holes)(arr) || (0,_iterable_to_array_limit_js__WEBPACK_IMPORTED_MODULE_1__._iterable_to_array_limit)(arr, i) || (0,_unsupported_iterable_to_array_js__WEBPACK_IMPORTED_MODULE_2__._unsupported_iterable_to_array)(arr, i) || (0,_non_iterable_rest_js__WEBPACK_IMPORTED_MODULE_3__._non_iterable_rest)();
}



/***/ }),

/***/ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js":
/*!*******************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_unsupported_iterable_to_array.js ***!
  \*******************************************************************************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_unsupported_iterable_to_array": function() { return /* binding */ _unsupported_iterable_to_array; }
/* harmony export */ });
/* unused harmony export _ */
/* harmony import */ var _array_like_to_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_array_like_to_array.js */ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_array_like_to_array.js");


function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return (0,_array_like_to_array_js__WEBPACK_IMPORTED_MODULE_0__._array_like_to_array)(o, minLen);

    var n = Object.prototype.toString.call(o).slice(8, -1);

    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_array_like_to_array_js__WEBPACK_IMPORTED_MODULE_0__._array_like_to_array)(o, minLen);
}



/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ !function() {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function() { return module['default']; } :
/******/ 			function() { return module; };
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ !function() {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ }();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**************************!*\
  !*** ./advert/index.tsx ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ App; }
/* harmony export */ });
/* harmony import */ var _swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swc/helpers/_/_sliced_to_array */ "../../node_modules/.pnpm/registry.npmmirror.com+@swc+helpers@0.4.36/node_modules/@swc/helpers/esm/_sliced_to_array.js");
/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Naruse */ "Naruse");
/* harmony import */ var Naruse__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(Naruse__WEBPACK_IMPORTED_MODULE_0__);


function App() {
    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_1__._)((0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useState)(), 2), value = _useState[0], setValue = _useState[1];
    (0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        setInterval(function() {
            setValue(Math.random());
        }, 2000);
    }, []);
    return Naruse.createElement("view", null, Naruse.createElement("view", null, "A: ", value), Naruse.createElement(B, null), Naruse.createElement(Counter, null));
}
function B() {
    (0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        return function() {
            console.error("unmount");
        };
    }, []);
    return Naruse.createElement("view", null, "每次渲染我并不会被卸载");
}
function Counter() {
    var _useState = (0,_swc_helpers_sliced_to_array__WEBPACK_IMPORTED_MODULE_1__._)((0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useState)(0), 2), count = _useState[0], setCount = _useState[1];
    var add = (0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function() {
        return setCount(count + 1);
    }, [
        count
    ]);
    var sub = (0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function() {
        return setCount(count - 1);
    }, [
        count
    ]);
    (0,Naruse__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function() {
        console.log("count", count);
    }, [
        count
    ]);
    return Naruse.createElement("view", null, Naruse.createElement("view", null, "计数器示例"), Naruse.createElement("view", null, count), Naruse.createElement("view", {
        style: {
            display: "flex",
            width: 120
        }
    }, Naruse.createElement("button", {
        onClick: add,
        style: {
            flex: 1
        }
    }, "++"), Naruse.createElement("button", {
        onClick: sub,
        style: {
            flex: 1
        }
    }, "--")));
}

}();
$outer = __webpack_exports__;
for(var i in $outer)exports[i] = $outer[i];