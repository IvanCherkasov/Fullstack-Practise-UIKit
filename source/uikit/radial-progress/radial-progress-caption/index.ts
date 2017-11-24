import './index.styl';
import * as UIKit from '../../uikit-core/index';

class RadialProgress_Caption extends UIKit.Core.Component {
    constructor(dom, mediator) {
        super(dom, mediator);
        this.initialize();
    }

    protected initialize() {
        const print = (value) => {
            this.element.text(value);
        };

        this.mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });

        this.initialize();
    }
}

export default RadialProgress_Caption;
