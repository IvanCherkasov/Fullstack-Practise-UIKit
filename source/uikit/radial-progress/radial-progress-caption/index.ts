import './index.styl';
import * as UIKit from '../../uikit-core/index';

class RadialProgress_Caption extends UIKit.Core.Component {
    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        const print = (value) => {
            this.element.text(value);
        };

        this.mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });

        super.initialize();
    }
}

export default RadialProgress_Caption;
