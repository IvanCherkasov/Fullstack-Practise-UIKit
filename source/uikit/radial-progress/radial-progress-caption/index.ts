import './index.styl';
import * as UIKit from '../../uikit-core/index';

class RadialProgress_Caption extends UIKit.Core.Element {
    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        const print = (value) => {
            this.dom.text(value);
        };

        this.mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });

        super.initialize();
    }
}

export default RadialProgress_Caption;
