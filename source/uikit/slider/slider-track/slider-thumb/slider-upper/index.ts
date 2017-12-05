import './index.styl';
import * as UIKit from '../../../../uikit-core/index';

class Slider_Upper extends UIKit.Core.Element {
    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {
        const div = this.dom.find('div.no-select');
        let timerId: NodeJS.Timer;

        const disable = () => {
            this.dom.removeClass('show');
        };

        const print = (value) => {
            div.text(value);
        };

        const show = () => {
            clearTimeout(timerId);
            this.dom.addClass('show');
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
