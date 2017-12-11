webpackJsonp([1],{

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uikit__ = __webpack_require__(4);


const stages1 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.create($('#uikit-stages-id-1'));
const stages2 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.create($('#uikit-stages-id-2'));
const stages3 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.create($('#uikit-stages-id-3'));
const stages4 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.create($('#uikit-stages-id-4'));
const input1 = $('#uikit-stages-input-id-1');
const input2 = $('#uikit-stages-input-id-2');
const select = $('#style-select-id');
const submit1 = $('#uikit-stages-submit-id-1');
const invert1 = $('#uikit-stages-submit-id-2');

input1.on('change', () => {
    if (input1.val()) {
        const value = parseInt(input1.val(), 10);
        if (!Number.isNaN(value)) {
            stages1.stage = value;
        }
    }
});

input2.on('change', () => {
    if (input2.val()) {
        const value = parseInt(input2.val(), 10);
        if (!Number.isNaN(value)) {
            stages2.stage = value;
        }
    }
});

submit1.on('click', () => {
    if (stages2.type === __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.TYPES.HORIZONTAL) {
        stages2.type = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.TYPES.VERTICAL;
    } else if (stages2.type === __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.TYPES.VERTICAL) {
        stages2.type = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Stages.TYPES.HORIZONTAL;
    }
});

invert1.on('click', () => {
    stages2.invertDirection();
});

__WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Core.ThemeController.getAll().map(theme => {
    const option = $('<option>', {
        value: theme,
        text: theme
    });
    select.append(option);
    return theme;
});

select.on('change', () => {
    __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Core.ThemeController.changeTheme(select.val());
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ })

},[152]);