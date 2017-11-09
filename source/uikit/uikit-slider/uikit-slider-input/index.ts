import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitSlider_Input extends UIKit.Core.UIKitElement {
    constructor(element, mediator, type) {
        // @ts-ignore
        super(element, mediator, type);

        const mediatorSubscribeModelValue = (modelData) => {
            const val = parseInt(this.element.val(), 10);
            if (val !== NaN) {
                this.element.val(modelData.value);
            } else {
                if (modelData.value !== val) {
                    this.element.val(modelData.value);
                }
            }
        };
        this.Mediator.subscribe('model.value', mediatorSubscribeModelValue);

        const changeUikitSliderInputCallback = () => {
            if (this.element.val()) {
                const val = parseInt(this.element.val(), 10);
                if (val !== NaN) {
                    if (val !== this.Mediator.getData('model.value')) {
                        this.Mediator.setData('model.value', val);
                    }
                }
            }
        };
        this.element.on(
            'change.uikit.slider.input',
            changeUikitSliderInputCallback);

        this.stylize(this.Type);
    }
}

export default UIKitSlider_Input;
