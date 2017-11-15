import './index.styl';
import UIKit from '../../uikit-core/index';
import UIKitInputText_Caption from './uikit-indicator-caption/index';

class UIKitInputText_Indicator extends UIKit.Core.UIKitComponent {

    private innerObjects: any[];

    constructor(element, mediator) {
        super(element, mediator);
        this.init();
    }

    protected init() {
        this.innerObjects.push(
            new UIKitInputText_Caption(
            this.element.find('.uikit-indicator-caption'),
            this.mediator));

        const meditorSubscribeIndicatorStatus = (value) => {
            if (value) {
                this.element.addClass('indicator-ok');
            } else {
                this.element.removeClass('indicator-ok');
            }
        };

        const meditorSubscribeIndicatorEnabled = (value) => {
            this.enabled = value;
        };

        this.mediator.subscribe(
            'indicator.status',
            meditorSubscribeIndicatorStatus);

        this.mediator.subscribe(
            'indicator.enabled',
            meditorSubscribeIndicatorEnabled);
        super.init();
    }
}

export default UIKitInputText_Indicator;
