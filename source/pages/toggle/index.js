import UIKit from '../../index';

const toggle1 = new UIKit.Toggle($('#uikit-toggle-id-1'));
const toggle2 = new UIKit.Toggle($('#uikit-toggle-id-2'));
const toggle3 = new UIKit.Toggle($('#uikit-toggle-id-3'));
const toggle4 = new UIKit.Toggle($('#uikit-toggle-id-4'));

const select = $('#style-select-id');

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
