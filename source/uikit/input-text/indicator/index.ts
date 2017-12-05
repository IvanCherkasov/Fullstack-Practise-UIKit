import './index.styl';
import * as UIKit from '../../uikit-core/index';
import InputText_Caption from './indicator-caption/index';

interface IElements {
    caption: InputText_Caption;
}

class InputText_Indicator extends UIKit.Core.Element {

    private elements: IElements;

    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {

        this.elements = {
            caption: new InputText_Caption(
            this.dom.find('.uikit-indicator-caption'),
            this.mediator,
            this.type),
        };

        const meditorSubscribeIndicatorStatus = (value) => {
            if (value) {
                this.dom.addClass('status-ok');
            } else {
                this.dom.removeClass('status-ok');
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
