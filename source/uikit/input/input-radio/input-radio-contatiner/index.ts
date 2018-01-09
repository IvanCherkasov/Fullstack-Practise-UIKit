import * as Core from '../../../core/index';

class InputRadio_Container extends Core.Element {
    constructor (
        dom:JQuery,
        mediator: Core.Mediator,
        orientation: string,
        defaultParameters: Core.TParameters) {
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
        /*const greyCircle = $('<div>')
            .addClass('radio-grey-circle');*/
        const colorCircle = $('<div>')
            .addClass('radio-color-circle'); 
        this.dom.append(/*greyCircle,*/ colorCircle);
    }

    private applyEvents() {
        this.dom.on('click', (event) => {
            this.mediator.publish('click', event);
        });
    }
}

export default InputRadio_Container;
