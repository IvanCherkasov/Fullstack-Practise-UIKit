import * as Core from '../../../core/index';

class InputSearch_Btn extends Core.Element {
    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        defaultParameters?: Core.TParameters,
    ) {
        super(dom, mediator, orientation, defaultParameters);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.dom.empty();
        const mag = $('<div>')
            .addClass('uikit-input-search-mag');
        this.dom.append(mag);
    }

    private applyEvents() {
        this.dom.on('click', () => {
            this.mediator.publish('search.started');
        });
    }
}

export default InputSearch_Btn;
