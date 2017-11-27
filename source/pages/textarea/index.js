import UIKit from '../../index';

const textAreas = [];
$('.uikit-textarea').each((i, item) => {
    textAreas.push(new UIKit.Textarea($(item)));
});
