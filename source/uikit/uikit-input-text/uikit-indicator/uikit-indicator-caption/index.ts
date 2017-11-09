import './index.styl';
import UIKit from '../../../uikit-core/index';

class UIKitInputText_Caption extends UIKit.Core.UIKitElement {
    constructor(element, mediator, type?) {
        // @ts-ignore
        super(element, mediator, type);

        const mediatorSubscribeIndicatorStatus = (value) => {
            if (value) {
                this.element.text(this.element.attr('ok'));
            } else {
                this.element.text(this.element.attr('error'));
            }
        };

        this.Mediator.subscribe(
            'indicator.status',
            mediatorSubscribeIndicatorStatus);
    }
}

export default UIKitInputText_Caption;
