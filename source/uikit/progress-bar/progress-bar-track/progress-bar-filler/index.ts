import './index.styl';
import * as UIKit from '../../../uikit-core/index';

class ProgressBar_Filler extends UIKit.Core.Component {
    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        const mediatorModelValue = (modelData) => {
            if (this.type === UIKit.Core.Types.HORIZONTAL) {
                this.element.css('width', `${modelData.value}%`);
            } else if (this.type === UIKit.Core.Types.VERTICAL) {
                this.element.css('height', `${modelData.value}%`);
            }
        };
        this.mediator.subscribe('model.value', mediatorModelValue);
        super.initialize();
    }
}

export default ProgressBar_Filler;
