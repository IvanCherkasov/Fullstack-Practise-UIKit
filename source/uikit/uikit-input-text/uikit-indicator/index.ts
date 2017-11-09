import './index.styl';
import UIKit from '../../uikit-core/index';
import UIKitInputText_Caption from './uikit-indicator-caption/index';

class UIKitInputText_Indicator extends UIKit.Core.UIKitElement {

    private caption: UIKitInputText_Caption;

    constructor(element, mediator, type?) {
        // @ts-ignore
        super(element, mediator, type);

        this.caption = new UIKitInputText_Caption(
            this.element.find('.uikit-indicator-caption'),
            this.Mediator);

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

        mediator.subscribe(
            'indicator.status',
            meditorSubscribeIndicatorStatus);

        mediator.subscribe(
            'indicator.enabled',
            meditorSubscribeIndicatorEnabled);
    }
}

export default UIKitInputText_Indicator;
