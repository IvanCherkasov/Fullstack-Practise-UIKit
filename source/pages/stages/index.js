import UIKit from '../../index';

const stages1 = new UIKit.Stages($('#uikit-stages-id-1'));
const stages2 = new UIKit.Stages($('#uikit-stages-id-2'));
const stages3 = new UIKit.Stages($('#uikit-stages-id-3'));
const stages4 = new UIKit.Stages($('#uikit-stages-id-4'));
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
    if (stages2.type === UIKit.Stages.TYPES.HORIZONTAL) {
        stages2.type = UIKit.Stages.TYPES.VERTICAL;
    } else if (stages2.type === UIKit.Stages.TYPES.VERTICAL) {
        stages2.type = UIKit.Stages.TYPES.HORIZONTAL;
    }
});

invert1.on('click', () => {
    stages2.invertDirection();
});

UIKit.Core.ThemeController.getAll().map((theme) => {
    const option = $('<option>', {
        value: theme,
        text: theme,
    });
    select.append(option);
    return theme;
});

select.on('change', () => {
    UIKit.Core.ThemeController.changeTheme(select.val());
});
