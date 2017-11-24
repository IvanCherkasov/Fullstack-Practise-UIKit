import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Slider_Input extends UIKit.Core.Component {
    constructor(element, mediator, type?) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        const mediatorSubscribeModelValue = (modelData) => {
            const val = parseInt((this.element.val()) as string, 10);
            if (val !== NaN) {
                this.element.val(modelData.value);
            } else {
                if (modelData.value !== val) {
                    this.element.val(modelData.value);
                }
            }
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        const changeUikitSliderInputCallback = () => {
            if (this.element.val()) {
                const val = parseInt((this.element.val()) as string, 10);
                if (val !== NaN) {
                    if (val !== this.mediator.getData('model.value')) {
                        this.mediator.setData('model.value', val);
                    }
                }
            }
        };
        this.element.on(
            'change.uikit.slider.input',
            changeUikitSliderInputCallback);

        super.initialize();
    }
}

export default Slider_Input;
