import * as Core from '../../../core/index';

class Button_Effect extends Core.Element {
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
    }

    private applyEvents() {
        const mediatorClick = (event) => {
            const target = $(event.currentTarget);
            const offset = target.offset();
            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;
            this.dom.removeClass('animate');
            const size = Math.max(target.outerWidth(), target.outerHeight());
            this.dom
                .css('top', y - size / 2)
                .css('left', x  - size / 2)
                .css('width', size)
                .css('height', size);
            this.dom.addClass('animate');
        };
        this.mediator.subscribe('click', mediatorClick);
    }
}

export default Button_Effect;
