import ProgressBar from '../../index';
import * as UIKit from '../../../uikit-core/index';

class ProgressBar_Filler extends UIKit.Core.Element {
    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        const mediatorModelValue = (modelData) => {
            if (this.type === ProgressBar.TYPES.HORIZONTAL) {
                this.dom.css('width', `${modelData.value}%`);
            } else if (this.type === ProgressBar.TYPES.VERTICAL) {
                this.dom.css('height', `${modelData.value}%`);
            }
        };
        this.mediator.subscribe('model.value', mediatorModelValue);
        super.initialize();
    }
}

export default ProgressBar_Filler;
