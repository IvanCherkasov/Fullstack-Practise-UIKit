webpackJsonp([0],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_styl__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_uikit__ = __webpack_require__(3);


var btnKit = new __WEBPACK_IMPORTED_MODULE_1_uikit__["default"].Button($('#uikit-button-id'));
var btnKit2 = new __WEBPACK_IMPORTED_MODULE_1_uikit__["default"].Button($('#uikit-button-id-2'));
var btnKit3 = new __WEBPACK_IMPORTED_MODULE_1_uikit__["default"].Button($('#uikit-button-id-3'));
var btnKit4 = new __WEBPACK_IMPORTED_MODULE_1_uikit__["default"].Button($('#uikit-button-id-4'));
var select = $('#style-select-id');
__WEBPACK_IMPORTED_MODULE_1_uikit__["default"].Core.ThemeController.getAll().map(function (theme) {
    var option = $('<option>', {
        value: theme,
        text: theme,
    });
    select.append(option);
    return theme;
});
select.on('change', function () {
    __WEBPACK_IMPORTED_MODULE_1_uikit__["default"].Core.ThemeController.changeTheme(select.val());
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),

/***/ 127:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[126]);