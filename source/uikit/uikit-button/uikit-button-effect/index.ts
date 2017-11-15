import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitButton_Effect extends UIKit.Core.UIKitComponent{

    constructor(element: any, mediator) {
        super(element, mediator);
        this.init();
    }

    protected init() {
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
        super.init();
    }
}

export default UIKitButton_Effect;
