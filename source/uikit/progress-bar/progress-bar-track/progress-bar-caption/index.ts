import * as UIKit from '../../../uikit-core/index';

class ProgressBar_Caption extends UIKit.Core.Element {
    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        const mediatorModelValue = (modelData) => {
            this.dom.text(`${modelData.value}%`);
        };
        this.mediator.subscribe('model.value',mediatorModelValue);
        super.initialize();
    }
}

export default ProgressBar_Caption;
