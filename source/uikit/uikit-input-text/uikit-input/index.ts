import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitInputText_Input extends UIKit.Core.UIKitElement {

    private caption: string;

    constructor(element, mediator, type?) {
        // @ts-ignore
        super(element, mediator, type);

        this.caption = this.element.attr('caption');

        const focusInCallback = () => {
            const value = this.element.val();
            if (typeof value === 'string') {
                if (value === this.caption) {
                    this.element.val('');
                }
            }
        };

        const focusOutCallback = () => {
            let value = this.element.val();
			if (typeof value === 'string') {
				value = value.trim();
				if (value === '') {
					this.element.val(this.caption);
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

        this.Mediator.subscribe('model.text', mediatorSubscribeModelText);
    }
}

export default UIKitInputText_Input;
