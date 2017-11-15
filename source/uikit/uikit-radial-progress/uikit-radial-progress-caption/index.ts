import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitRadialProgress_Caption extends UIKit.Core.UIKitComponent {
    constructor(dom, mediator) {
        super(dom, mediator);
        this.init();
    }

    protected init() {
        const print = (value) => {
            this.element.text(value);
        };

        this.mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });

        this.init();
    }
}

export default UIKitRadialProgress_Caption;
