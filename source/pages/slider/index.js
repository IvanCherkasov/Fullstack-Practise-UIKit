import UIKit from '../../index';

const sliderHor = new UIKit.Slider($('#uikit-slider-id'));
const sliderHorhor = new UIKit.Slider($('#uikit-slider-id-hor'));
const sliderVer = new UIKit.Slider($('#uikit-slider-id-vertical'));
const sliderVerT = new UIKit.Slider($('#uikit-slider-id-verticalt'));
const sliderVerTh = new UIKit.Slider($('#uikit-slider-id-verticalth'));

const select = $('#slider-styles-id');

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

$('#slider-change-btn-id').click(() => {
    if (sliderVer.type === UIKit.Core.Types.HORIZONTAL) {
        sliderVer.type = UIKit.Core.Types.VERTICAL;
    } else if (sliderVer.type === UIKit.Core.Types.VERTICAL) {
        sliderVer.type = UIKit.Core.Types.HORIZONTAL;
    }
});
