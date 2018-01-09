webpackJsonp([2],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uikit__ = __webpack_require__(4);

// text
var inputText = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-text-id-1'), { 'shadow-text': 'text', 'indicator.enabled': 'true' });
inputText.parameters = {
    'indicator.status': 'false',
};
// toggle
var inputToggle = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-toggle-id-2'), { 'checked': 'true' });
var inputToggleVertical = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-toggle-id-3'), { 'checked': 'false' });
inputToggleVertical.orientation = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Inputs.InputToggle.ORIENTATIONS.VERTICAL;
var inputButton = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-button-id-4'), { 'caption': 'button lol' });
inputButton.parameters = {
    'caption': 'Button',
    'variant': __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Inputs.InputButton.VARIANTS.regularError,
};
var inputSubmit = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-submit-id-5'));
inputSubmit.parameters = {
    'variant': __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Inputs.InputSubmit.VARIANTS.regular,
};
var inputTextarea = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-textarea-id-6'), { 'shadow-text': 'shadow-text-textarea' });
var inputTextareaRegular = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-textarea-id-7'), { 'shadow-text': 'shadow-text-textarea' });
inputTextareaRegular.variant = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Inputs.InputTextarea.VARIANTS.regular;
var inputTextareaFullsize = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-textarea-id-8'), { 'shadow-text': 'shadow-text-textarea' });
inputTextareaFullsize.variant = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Inputs.InputTextarea.VARIANTS.fullsize;
var inputRadio = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-radio-id-9'), { 'name': 'test' });
var inputRadio1 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-radio-id-10'), { 'name': 'test' });
var inputRadio2 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-radio-id-11'), { 'name': 'test' });
var inputCheckbox = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-checkbox-id-12'));
var inputCheckbox1 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-checkbox-id-13'));
var inputCheckbox2 = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-checkbox-id-14'));
var inputSearch = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-search-id-15'), {
    'shadow-text': 'Search',
    'error-message': 'Can\'t find...',
    'name': 'search-test',
});
$('#input-search-error').on('click', function (event) {
    inputSearch.parameters = { 'error': "" + $(event.target).is(':checked') };
});
var inputDropdown = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-dropdown-id-16'), {
    'name': 'test-dropdown',
    'form': 'test-form',
    'items': [
        {
            value: 'veg_tomato',
            caption: 'Tomato',
        },
        {
            value: 'veg_potato',
            caption: 'Potato',
        },
        {
            value: 'veg_corn',
            caption: 'Corn',
        },
        {
            value: 'veg_cucumber',
            caption: 'Cucumber',
        },
    ],
});
var inputArrowLeft = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-arrow-id-17'), { 'variant': 'left' });
var inputArrowRight = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-arrow-id-18'), { 'variant': 'right' });
var inputArrowLeftDis = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-arrow-id-19'), { 'variant': 'left' });
inputArrowLeftDis.enabled = false;
var inputArrowRightDis = __WEBPACK_IMPORTED_MODULE_0_uikit__["default"].Input.create($('#input-arrow-id-20'), { 'variant': 'right' });
inputArrowRightDis.enabled = false;

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ })

},[136]);