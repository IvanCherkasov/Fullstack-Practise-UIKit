import * as Core from '../../../core/index';
import * as _ from 'lodash';

class InputCheckbox_Container extends Core.Element {
    constructor(
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
        this.applyEvents();
    }

    protected build() {
        this.dom.empty();
        /*const domGreyCheck = $('<div>')
            .addClass('checkbox-grey-check');*/
        const domColorCheck = $('<div>')
            .addClass('checkbox-color-check');
        this.dom.append(domColorCheck/*, domGreyCheck*/);
    }

    private applyEvents() {
        this.dom.on('click', (event) => {
            this.mediator.publish('click', event);
        });
    }
}

export default InputCheckbox_Container;
