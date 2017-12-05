import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Slider_Input extends UIKit.Core.Element {
    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        const mediatorSubscribeModelValue = (modelData) => {
            const val = parseInt((this.dom.val()) as string, 10);
            if (val !== NaN) {
                this.dom.val(modelData.value);
            } else {
                if (modelData.value !== val) {
                    this.dom.val(modelData.value);
                }
            }
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        const changeUikitSliderInputCallback = () => {
            if (this.dom.val()) {
                const val = parseInt((this.dom.val()) as string, 10);
                if (val !== NaN) {
                    if (val !== this.mediator.getData('model.value')) {
                        this.mediator.setData('model.value', val);
                    }
                }
            }
        };
        this.dom.on(
            'change.uikit.slider.input',
            changeUikitSliderInputCallback);

        super.initialize();
    }
}

export default Slider_Input;
