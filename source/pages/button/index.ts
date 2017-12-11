import UIKit from 'uikit';

const btnKit = UIKit.Button.create($('#uikit-button-id'));
const btnKit2 = UIKit.Button.create($('#uikit-button-id-2'));
const btnKit3 = UIKit.Button.create($('#uikit-button-id-3'));
const btnKit4 = UIKit.Button.create($('#uikit-button-id-4'));
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
