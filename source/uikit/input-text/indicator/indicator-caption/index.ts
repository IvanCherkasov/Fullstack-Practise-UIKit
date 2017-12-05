import './index.styl';
import * as UIKit from '../../../uikit-core/index';

class InputText_Caption extends UIKit.Core.Element {
    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        const mediatorSubscribeIndicatorStatus = (value) => {
            if (value) {
                this.dom.text(this.dom.attr('ok'));
            } else {
                this.dom.text(this.dom.attr('error'));
            }
        };

        this.mediator.subscribe(
            'indicator.status',
            mediatorSubscribeIndicatorStatus);
        super.initialize();
    }
}

export default InputText_Caption;
