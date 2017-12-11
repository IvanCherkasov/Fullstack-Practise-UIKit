import * as Core from '../../core/index';

class Button_Effect extends Core.Element{

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        type: string,
        attributes: object) {
            super(dom, mediator, type, attributes);
            this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
    }

    private acceptEvents() {
        const mediatorButtonClick = (event) => {
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
        this.mediator.subscribe('button.click', mediatorButtonClick);
    }

    protected build() {
        this.dom.empty();
    }
}

export default Button_Effect;
