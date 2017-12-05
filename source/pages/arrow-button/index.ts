import UIKit from 'uikit';

$('#uikit-arrow-button-id-4').on('click', () => {
});

const arrowButton1 = new UIKit.ArrowButton($('#uikit-arrow-button-id-1'));
const arrowButton4 = new UIKit.ArrowButton($('#uikit-arrow-button-id-4'));
const checkbox = $('#arrow-button-checkbox-id-4');
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
    UIKit.Core.ThemeController.changeTheme(select.val() as string);
});

checkbox.on('change', () => {
    arrowButton4.enabled = checkbox.is(':checked');
});
