import * as Core from '../../../core/index';
import InputToggle from '../index';

class InputToggle_Thumb extends Core.Element {
    constructor(
        dom: JQuery, 
        mediator: Core.Mediator, 
        orientation: string, 
        defaultParameters: Core.TParameters) {
            super(dom, mediator, orientation, defaultParameters);
            this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-toggle-thumb');
        const domCircle = $('<div>').addClass('circle');
        this.dom.append(domCircle);
    }

    private acceptEvents() {
        /* empty */
    }
}

export default InputToggle_Thumb;
