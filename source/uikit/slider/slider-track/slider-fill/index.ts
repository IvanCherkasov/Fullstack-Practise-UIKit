import './index.styl';
import * as UIKit from '../../../uikit-core/index';
import Slider_Filled from './slider-filled/index';

interface IComponents {
    filled: Slider_Filled;
}

class Slider_Fill extends UIKit.Core.Component {

    private components: IComponents;

    constructor (element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {

        this.components = {
            filled: new Slider_Filled(
            this.element.find('.uikit-slider-filled'),
            this.mediator,
            this.type),
        };

        super.initialize();
    }
}

export default Slider_Fill;
