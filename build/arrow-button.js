webpackJsonp([2],{

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uikit__ = __webpack_require__(3);

$('#uikit-arrow-button-id-4').on('click', function () {
});
var arrowButton1 = new __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].ArrowButton($('#uikit-arrow-button-id-1'));
var arrowButton4 = new __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].ArrowButton($('#uikit-arrow-button-id-4'));
var checkbox = $('#arrow-button-checkbox-id-4');
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
checkbox.on('change', function () {
    arrowButton4.enabled = checkbox.is(':checked');
});

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ })

},[125]);