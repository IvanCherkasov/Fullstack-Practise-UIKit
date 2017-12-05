import './index.styl';
import * as UIKit from '../../uikit-core/index';

class InputText_Input extends UIKit.Core.Element {

    private storageCaption: string = '';

    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        this.storageCaption = this.dom.attr('caption');

        const focusInCallback = () => {
            const value = this.dom.val();
            if (typeof value === 'string') {
                if (value === this.storageCaption) {
                    this.dom.val('');
                }
            }
        };

        const focusOutCallback = () => {
            let value = this.dom.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.dom.val(this.storageCaption);
                }
            }
        };

        this.dom.focusin(focusInCallback);
        this.dom.focusout(focusOutCallback);

        const mediatorSubscribeModelText = (modelData) => {
            if (modelData.text !== this.dom.val()) {
                this.dom.val(modelData.text);
            }
        };

        this.mediator.subscribe('model.text', mediatorSubscribeModelText);

        super.initialize();
    }
}

export default InputText_Input;
