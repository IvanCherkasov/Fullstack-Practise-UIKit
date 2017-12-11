import * as Core from '../../core/index';

class Button_Caption extends Core.Element{
    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        type: string,
        attributes: object) {
            super(dom, mediator, type, attributes);
            this.initialize();
    }

    private initialize () {
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
    }

    private acceptEvents() {
        this.mediator.subscribe('button.caption', (caption) => {
            this.dom.text(caption);
        });
    }

    protected build() {
        this.dom.empty();
    }
}

export default Button_Caption;
