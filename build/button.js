webpackJsonp([1],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uikit__ = __webpack_require__(3);

var btnKit = new __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Button($('#uikit-button-id'));
var btnKit2 = new __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Button($('#uikit-button-id-2'));
var btnKit3 = new __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Button($('#uikit-button-id-3'));
var btnKit4 = new __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Button($('#uikit-button-id-4'));
var select = $('#style-select-id');
__WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Core.ThemeController.getAll().map(function (theme) {
    var option = $('<option>', {
        value: theme,
        text: theme,
    });
    select.append(option);
    return theme;
});
select.on('change', function () {
    __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Core.ThemeController.changeTheme(select.val());
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ })

},[131]);