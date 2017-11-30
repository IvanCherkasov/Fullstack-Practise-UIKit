import './index.styl';
import * as UIKit from '../../../uikit-core/index';

class ProgressBar_Caption extends UIKit.Core.Component {
    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        const mediatorModelValue = (modelData) => {
            this.element.text(`${modelData.value}%`);
        };
        this.mediator.subscribe('model.value',mediatorModelValue);
        super.initialize();
    }
}

export default ProgressBar_Caption;
