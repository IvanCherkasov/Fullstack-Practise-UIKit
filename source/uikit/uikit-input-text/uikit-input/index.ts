import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitInputText_Input extends UIKit.Core.UIKitComponent {

    constructor(element, mediator) {
        super(element, mediator);

        this.storage = {
            caption: '',
        };

        this.init();
    }

    protected init() {
        this.storage.caption = this.element.attr('caption');

        const focusInCallback = () => {
            const value = this.element.val();
            if (typeof value === 'string') {
                if (value === this.storage.caption) {
                    this.element.val('');
                }
            }
        };

        const focusOutCallback = () => {
            let value = this.element.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.element.val(this.storage.caption);
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

        super.init();
    }
}

export default UIKitInputText_Input;
