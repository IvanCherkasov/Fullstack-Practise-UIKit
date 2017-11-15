import './index.styl';
import UIKit from '../../../uikit-core/index';

class UIKitInputText_Caption extends UIKit.Core.UIKitComponent {
    constructor(element, mediator) {
        super(element, mediator);
        this.init();
    }

    protected init() {
        const mediatorSubscribeIndicatorStatus = (value) => {
            if (value) {
                this.element.text(this.element.attr('ok'));
            } else {
                this.element.text(this.element.attr('error'));
            }
        };

        this.mediator.subscribe(
            'indicator.status',
            mediatorSubscribeIndicatorStatus);
        super.init();
    }
}

export default UIKitInputText_Caption;
