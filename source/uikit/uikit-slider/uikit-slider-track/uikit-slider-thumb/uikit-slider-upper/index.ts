import './index.styl';
import UIKit from '../../../../uikit-core/index';

class UIKitSlider_Upper extends UIKit.Core.UIKitElement {
    constructor(dom, mediator, type) {
        // @ts-ignore
        super(dom, mediator, type);
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

        this.Mediator.subscribe('model.value', (modelData) => {
            print(modelData.value);
        });

        this.Mediator.subscribe('thumb.hover', (value) => {
            if (value) {
                show();
            }
        });

        this.Mediator.subscribe('model.value', () => {
            show();
        });

        this.stylize(this.Type);
    }
}

export default UIKitSlider_Upper;
