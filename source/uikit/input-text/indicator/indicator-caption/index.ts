import './index.styl';
import * as UIKit from '../../../uikit-core/index';

class InputText_Caption extends UIKit.Core.Component {
    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
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
        super.initialize();
    }
}

export default InputText_Caption;
