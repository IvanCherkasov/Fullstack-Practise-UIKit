import UIKit from '../../index';

const bar1 = new UIKit.ProgressBar($('#uikit-progress-bar-1-h'));
const bar2 = new UIKit.ProgressBar($('#uikit-progress-bar-2-v'));
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

$('#uikit-submit-id-1').click(() => {
    if (bar2.type === UIKit.ProgressBar.TYPES.HORIZONTAL) {
        bar2.type = UIKit.ProgressBar.TYPES.VERTICAL;
    } else if (bar2.type === UIKit.ProgressBar.TYPES.VERTICAL) {
        bar2.type = UIKit.ProgressBar.TYPES.HORIZONTAL;
    }
});

const input1 = $('#input-text-progress');
input1.on('change', () => {
    if (input1.val()) {
        const value = parseInt(input1.val(), 10);
        if (!Number.isNaN(value)) {
            bar2.value = value;
        }
    }
});
