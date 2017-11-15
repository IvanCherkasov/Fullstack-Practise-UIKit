import './index.styl';
import UIKit from '../uikit-core/index';

class UIKitArrowButton extends UIKit.Core.UIKitElement{

    private model: any;

    constructor(element: JQuery) {
        super(element);
        this.init();
    }

    protected init() {

        let type = UIKit.Core.ElementTypes.TArrowButton.LEFT;
        /*if (this.element.attr('type') !== undefined) {
            if (this.element.attr('type') !== '') {
                if (this.types[this.element.attr('type')]) {
                    type = this.element.attr('type');
                }
            }
        }*/
        this.initTypes(UIKit.Core.ElementTypes.TArrowButton, type);

        this.model = new UIKitArrowButton_Model();
        this.mediator = new UIKit.Core.UIKitMediator(this.model);

        // смена типа не приводит к перестроению элемента
        this.noRebuild = true;
        super.init();
    }
}

class UIKitArrowButton_Model extends UIKit.Core.UIKitModel{
    constructor() {
        super();
    }
}

export default UIKitArrowButton;
