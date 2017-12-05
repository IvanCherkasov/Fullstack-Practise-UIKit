import * as UIKit from '../../uikit-core/index';

class Button_Caption extends UIKit.Core.Element{

    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        this.mediator.subscribe('button.caption', (caption) => {
            this.dom.text(caption);
        });
        super.initialize();
    }
}

export default Button_Caption;
