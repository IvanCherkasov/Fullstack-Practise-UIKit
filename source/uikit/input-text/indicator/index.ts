import './index.styl';
import * as UIKit from '../../uikit-core/index';
import InputText_Caption from './indicator-caption/index';

interface IComponents {
    caption: InputText_Caption;
}

class InputText_Indicator extends UIKit.Core.Component {

    private components: IComponents;

    constructor(element, mediator) {
        super(element, mediator);
        this.initialize();
    }

    protected initialize() {

        this.components = {
            caption: new InputText_Caption(
            this.element.find('.uikit-indicator-caption'),
            this.mediator),
        };

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
        super.initialize();
    }

    public set status(value: boolean) {
        if (this.mediator) {
            this.mediator.publish('indicator.status', value);
        }
    }
}

export default InputText_Indicator;
