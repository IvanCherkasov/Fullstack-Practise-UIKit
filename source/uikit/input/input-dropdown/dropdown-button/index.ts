import * as Core from '../../../core/index';

class InputDropdown_Button extends Core.Element {

    constructor (
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        defaultParameters: Core.TParameters,
        ) {
        super(dom, mediator, orientation, defaultParameters);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
    }

    protected build() {
        this.dom.empty();
        const domArrow = $('<div>')
            .addClass('uikit-input-dropdown-button-arrow');
        this.dom.append(domArrow);
    }
}

export default InputDropdown_Button;
