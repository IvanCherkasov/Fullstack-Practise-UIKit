import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitButton_Caption extends UIKit.Core.UIKitComponent{
    constructor(element: any, mediator) {
        super(element, mediator);
        this.init();
    }

    protected init() {
        this.mediator.subscribe('button.caption', (caption) => {
            this.element.text(caption);
        });
        super.init();
    }
}

export default UIKitButton_Caption;
