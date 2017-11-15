import './index.styl';
import UIKit from '../../../uikit-core/index';
import UIKitSlider_Filled from './uikit-slider-filled/index';

class UIKitSlider_Fill extends UIKit.Core.UIKitElement {

    private innerObjects: any[];

    constructor (element, mediator, type) {
        super(element, mediator, type);
        this.init();
    }

    protected init() {
        this.innerObjects.push(
            new UIKitSlider_Filled(
            this.element.find('.uikit-slider-filled'),
            this.mediator,
            this.type));

        super.init();
    }
}

export default UIKitSlider_Fill;
