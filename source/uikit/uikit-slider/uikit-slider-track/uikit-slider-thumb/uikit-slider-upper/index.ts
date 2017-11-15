import './index.styl';
import UIKit from '../../../../uikit-core/index';

class UIKitSlider_Upper extends UIKit.Core.UIKitElement {
    constructor(dom, mediator, type) {
        super(dom, mediator, type);
        this.init();
    }

    protected init() {
        const div = this.element.find('div.no-select');
        let timerId: NodeJS.Timer;

        const disable = () => {
            this.element.removeClass('show');
        };

        const print = (value) => {
            div.text(value);
        };

        const show = () => {
            clearTimeout(timerId);
            this.element.addClass('show');
            timerId = setTimeout(disable, 1000);
        };

        this.mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });

        this.mediator.subscribe('thumb.hover', (value) => {
            if (value) {
                show();
            }
        });

        this.mediator.subscribe('model.value', () => {
            show();
        });

        super.init();
    }
}

export default UIKitSlider_Upper;
