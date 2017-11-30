import UIKit from '../../index';

const progressBar1 = new UIKit.RadialProgress($('#uikit-radial-progress-id-1'));
const progressBar2 = new UIKit.RadialProgress($('#uikit-radial-progress-id-2'));
const progressBar3 = new UIKit.RadialProgress($('#uikit-radial-progress-id-3'));
const select = $('#radial-progress-id-1');
const input = $('#radial-progress-input');

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

input.on('change', () => {
    if (input.val()) {
        const val = parseInt(input.val(), 10);
        if (!Number.isNaN(val)) {
            if (val !== progressBar1.value) {
                progressBar1.value = val;
            }
        }
    }
});
