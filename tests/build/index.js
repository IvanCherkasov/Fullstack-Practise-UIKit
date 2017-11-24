/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
var TSlider = /** @class */ (function () {
    function TSlider() {
    }
    TSlider.HORIZONTAL = 'horizontal';
    TSlider.VERTICAL = 'vertical';
    return TSlider;
}());
console.log(TSlider);
console.log(TSlider.HORIZONTAL);
console.log(TSlider.VERTICAL);
console.log(TSlider['VERTICAL']);
console.log(TSlider['HORIZONTAL']);
console.log('по индексу ', TSlider[0]);
console.log(Object.keys(TSlider));
console.log(Object.keys(TSlider).length);
var List = /** @class */ (function () {
    function List() {
        this.items = [];
    }
    List.prototype.add = function (item) {
        this.items.push(item);
    };
    List.prototype.get = function (index) {
        return this.items[index];
    };
    return List;
}());

var comp = new List();
comp.add('hello');
comp.add('world');
console.log(comp);
console.log(comp.get(0));
var Types;
(function (Types) {
    Types[Types["ORIENTATION_HORIZONTAL"] = 2] = "ORIENTATION_HORIZONTAL";
    Types[Types["ORIENTATION_VERTICAL"] = 3] = "ORIENTATION_VERTICAL";
    Types[Types["DIRECTION_LEFT"] = 4] = "DIRECTION_LEFT";
    Types[Types["DIRECTION_RIGHT"] = 5] = "DIRECTION_RIGHT";
    Types[Types["DIRECTION_UP"] = 6] = "DIRECTION_UP";
    Types[Types["DIRECTION_DOWN"] = 7] = "DIRECTION_DOWN";
})(Types || (Types = {}));
var t1 = Types.DIRECTION_DOWN | Types.ORIENTATION_HORIZONTAL;
var t2 = Types.ORIENTATION_HORIZONTAL;
var t3 = Types.ORIENTATION_HORIZONTAL | Types.DIRECTION_RIGHT;
// console.log(t1 & Types.DIRECTION_DOWN);
// console.log(t1 & Types.ORIENTATION_HORIZONTAL);
if (t2 & Types.DIRECTION_LEFT) {
    console.log(t2 & Types.DIRECTION_LEFT, true);
}
else {
    console.log(t2 & Types.DIRECTION_LEFT, false);
}
if (t1 & Types.DIRECTION_LEFT) {
    console.log(t1 & Types.DIRECTION_LEFT, true);
}
else {
    console.log(t1 & Types.DIRECTION_LEFT, false);
}
// console.log(t3 & t2);


/***/ })
/******/ ]);