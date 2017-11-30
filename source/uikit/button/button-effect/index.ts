import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Button_Effect extends UIKit.Core.Component{

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        this.mediator.subscribe('button.click', (event) => {
            const target = $(event.currentTarget);
            const offset = target.offset();
            const x = event.pageX - offset.left;
            const y = event.pageY - offset.top;
            this.element.removeClass('animate');
            const size = Math.max(target.outerWidth(), target.outerHeight());
            this.element
                .css('top', y - size / 2)
                .css('left', x  - size / 2)
                .css('width', size)
                .css('height', size);
            this.element.addClass('animate');
        });
        super.initialize();
    }
}

export default Button_Effect;
