import './index.styl';
import * as UIKit from '../../../uikit-core/index';
import Slider_Filled from './slider-filled/index';

interface IElements {
    filled: Slider_Filled;
}

class Slider_Fill extends UIKit.Core.Element {

    private elements: IElements;

    constructor (
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {

        this.elements = {
            filled: new Slider_Filled(
            this.dom.find('.uikit-slider-filled'),
            this.mediator,
            this.type),
        };

        super.initialize();
    }
}

export default Slider_Fill;
