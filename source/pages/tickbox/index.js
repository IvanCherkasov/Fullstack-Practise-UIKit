import UIKit from '../../index';

const tickbox1 = new UIKit.Tickbox($('#uikit-tickbox-id-1'));
const tickbox2 = new UIKit.Tickbox($('#uikit-tickbox-id-2'));
const tickbox3 = new UIKit.Tickbox($('#uikit-tickbox-id-3'));

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

$('#uikit-tickbox-submit-id-1').click(() => {
    console.log(tickbox3.checked);
    if (tickbox3.checked) {
        tickbox3.checked = false;
    } else {
        tickbox3.checked = true;
    }
});
