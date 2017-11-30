import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Button_Caption extends UIKit.Core.Component{

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        this.mediator.subscribe('button.caption', (caption) => {
            this.element.text(caption);
        });
        super.initialize();
    }
}

export default Button_Caption;
