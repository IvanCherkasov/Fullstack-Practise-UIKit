import './index.styl';
import * as UIKit from '../../uikit-core/index';

class InputText_Input extends UIKit.Core.Component {

    private storageCaption: string = '';

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        this.storageCaption = this.element.attr('caption');

        const focusInCallback = () => {
            const value = this.element.val();
            if (typeof value === 'string') {
                if (value === this.storageCaption) {
                    this.element.val('');
                }
            }
        };

        const focusOutCallback = () => {
            let value = this.element.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.element.val(this.storageCaption);
                }
            }
        };

        this.element.focusin(focusInCallback);
        this.element.focusout(focusOutCallback);

        const mediatorSubscribeModelText = (modelData) => {
            if (modelData.text !== this.element.val()) {
                this.element.val(modelData.text);
            }
        };

        this.mediator.subscribe('model.text', mediatorSubscribeModelText);

        super.initialize();
    }
}

export default InputText_Input;
