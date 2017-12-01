import UIKit from '../../index';

const select = $('#styles-id');

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

const formElems = [];
formElems.push(new UIKit.InputText($('#form-ui-input-name-id')));
formElems.push(new UIKit.InputText($('#form-ui-input-email-id')));
formElems.push(new UIKit.Textarea($('#form-ui-textarea-id')));
formElems.push(new UIKit.Button($('#form-ui-btn-id')));
