import UIKit from '../../index';

const inputs = [];
$('.uikit-input-text').each((i, item) => {
    try {
        inputs.push(new UIKit.InputText($(item)));
    } catch (e) {
        console.error(e);
    }
});

inputs[2].indicator.status = false;
$('#checkbox-id-1').on('change', (event) => {
    if ($(event.target).is(':checked')) {
        inputs[inputs.length - 1].indicator.enabled = true;
    } else {
        inputs[inputs.length - 1].indicator.enabled = false;
    }
});
