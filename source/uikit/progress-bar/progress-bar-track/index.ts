import * as UIKit from '../../uikit-core/index';
import ProgressBar from '../index';
import ProgressBar_Caption from './progress-bar-caption/index';
import ProgressBar_Filler from './progress-bar-filler/index';

interface IElements {
    caption: ProgressBar_Caption;
    filler: ProgressBar_Filler;
}

class ProgressBar_Track extends UIKit.Core.Element {

    private components: IElements;

    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {

        this.components = {
            caption: new ProgressBar_Caption(
                this.dom.find('.uikit-progress-bar-caption'),
                this.mediator,
                this.type),
            filler: new ProgressBar_Filler(
                this.dom.find('.uikit-progress-bar-filler'),
                this.mediator,
                this.type),
        };

        super.initialize();
    }
}

export default ProgressBar_Track;
