import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitRadialProgress_Caption extends UIKit.Core.UIKitElement {
    constructor(dom, mediator) {
        // @ts-ignore
        super(dom, mediator);

        const print = (value) => {
            this.element.text(value);
        };

        this.Mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });
    }
}

export default UIKitRadialProgress_Caption;
