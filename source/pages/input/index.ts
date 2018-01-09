import UIKit from 'uikit';

// text
const inputText = UIKit.Input.create(
    $('#input-text-id-1'), { 'shadow-text': 'text', 'indicator.enabled': 'true' });

inputText.parameters = {
    'indicator.status': 'false',
};

// toggle
const inputToggle = UIKit.Input.create(
    $('#input-toggle-id-2'), { 'checked': 'true' });

const inputToggleVertical = UIKit.Input.create(
    $('#input-toggle-id-3'), { 'checked': 'false' });
inputToggleVertical.orientation = UIKit.Inputs.InputToggle.ORIENTATIONS.VERTICAL;


const inputButton = UIKit.Input.create(
    $('#input-button-id-4'), { 'caption': 'button lol' });
inputButton.parameters = {
    'caption': 'Button',
    'variant': UIKit.Inputs.InputButton.VARIANTS.regularError,
};

const inputSubmit = UIKit.Input.create(
    $('#input-submit-id-5'));
inputSubmit.parameters = {
    'variant': UIKit.Inputs.InputSubmit.VARIANTS.regular,
};

const inputTextarea = UIKit.Input.create(
    $('#input-textarea-id-6'), { 'shadow-text': 'shadow-text-textarea' });

const inputTextareaRegular = UIKit.Input.create(
    $('#input-textarea-id-7'), { 'shadow-text': 'shadow-text-textarea' });
inputTextareaRegular.variant = UIKit.Inputs.InputTextarea.VARIANTS.regular;

const inputTextareaFullsize = UIKit.Input.create(
    $('#input-textarea-id-8'), { 'shadow-text': 'shadow-text-textarea' });
inputTextareaFullsize.variant = UIKit.Inputs.InputTextarea.VARIANTS.fullsize;

const inputRadio = UIKit.Input.create(
    $('#input-radio-id-9'), { 'name': 'test' });

const inputRadio1 = UIKit.Input.create(
    $('#input-radio-id-10'), { 'name': 'test' });

const inputRadio2 = UIKit.Input.create(
    $('#input-radio-id-11'), { 'name': 'test' });



const inputCheckbox = UIKit.Input.create(
    $('#input-checkbox-id-12'));

const inputCheckbox1 = UIKit.Input.create(
    $('#input-checkbox-id-13'));

const inputCheckbox2 = UIKit.Input.create(
    $('#input-checkbox-id-14'));

const inputSearch = UIKit.Input.create(
    $('#input-search-id-15'), { 
        'shadow-text': 'Search', 
        'error-message': 'Can\'t find...', 
        'name': 'search-test',
    });

$('#input-search-error').on('click', (event) => {
    inputSearch.parameters = { 'error': `${$(event.target).is(':checked')}` };
});

const inputDropdown = UIKit.Input.create(
$('#input-dropdown-id-16'), {
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

const inputArrowLeft = UIKit.Input.create(
    $('#input-arrow-id-17'), { 'variant':'left' });

const inputArrowRight = UIKit.Input.create(
    $('#input-arrow-id-18'), { 'variant': 'right' });

const inputArrowLeftDis = UIKit.Input.create(
    $('#input-arrow-id-19'), { 'variant':'left' });
inputArrowLeftDis.enabled = false;

const inputArrowRightDis = UIKit.Input.create(
    $('#input-arrow-id-20'), { 'variant':'right' });
inputArrowRightDis.enabled = false;
