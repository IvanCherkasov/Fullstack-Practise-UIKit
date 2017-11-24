import './index.styl';
import * as UIKit from '../uikit-core/index';

class ArrowButton extends UIKit.Core.Element{

    constructor(element: JQuery) {
        super(element);
        this.initialize();
    }

    protected initialize() {

        // применение типа отложено до инициализации (super.initialize())
        this.type = [UIKit.Core.Types.DIRECTION_LEFT];
        if (this.element.attr('data-type').toLowerCase() === 'right') {
            this.type = [UIKit.Core.Types.DIRECTION_RIGHT];
        }

        const model = new ArrowButton_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        const midiatorElementType = (type: number[]) => {
            if (type.indexOf(UIKit.Core.Types.DIRECTION_LEFT) > -1) {
                this.element.removeClass('right');
                this.element.addClass('left');
            } else if (type.indexOf(UIKit.Core.Types.DIRECTION_RIGHT) > -1) {
                this.element.removeClass('left');
                this.element.addClass('right');
            }
        };

        this.mediator.subscribe('element.type', midiatorElementType);
        super.initialize();
    }


}

class ArrowButton_Model extends UIKit.Core.Model{
    constructor() {
        super();
    }
}

export default ArrowButton;
