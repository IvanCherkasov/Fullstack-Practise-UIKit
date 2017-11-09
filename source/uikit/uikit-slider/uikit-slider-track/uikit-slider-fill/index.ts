import './index.styl';
import UIKit from '../../../uikit-core/index';
import UIKitSlider_Filled from './uikit-slider-filled/index';

class UIKitSlider_Fill extends UIKit.Core.UIKitElement {

    private filled: UIKitSlider_Filled;

    constructor (element, mediator, type) {
        // @ts-ignore
        super(element, mediator, type);
        this.filled = new UIKitSlider_Filled(
            this.element.find('.uikit-slider-filled'),
            this.Mediator,
            this.Type);

        this.stylize(this.Type);
    }
}

export default UIKitSlider_Fill;
