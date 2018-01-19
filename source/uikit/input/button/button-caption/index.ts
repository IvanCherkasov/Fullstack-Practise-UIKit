import * as Core from '../../../core/index';

class Button_Caption extends Core.Element {
    constructor(
        dom: JQuery, 
        mediator: Core.Mediator, 
        orientation: string, 
        defaultParameters?: Core.TParameters) {
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
        this.dom.text(this.defaultParameters['caption']);
    }

    private applyEvents() {
        const mediatorParametersCaption = (captionText) => {
            this.dom.text(captionText);
        };
        this.mediator.subscribe('parameters.caption', mediatorParametersCaption);
    }
}

export default Button_Caption;
