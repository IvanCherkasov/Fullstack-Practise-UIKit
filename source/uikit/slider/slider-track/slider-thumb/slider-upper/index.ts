import './index.styl';
import * as UIKit from '../../../../uikit-core/index';

class Slider_Upper extends UIKit.Core.Component {
    constructor(dom, mediator, type) {
        super(dom, mediator, type);
        this.initialize();
    }

    protected initialize() {
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

        super.initialize();
    }
}

export default Slider_Upper;
