import './index.styl';
import * as UIKit from '../../uikit-core/index';
import ProgressBar_Caption from './progress-bar-caption/index';
import ProgressBar_Filler from './progress-bar-filler/index';

interface IComponent {
    caption: ProgressBar_Caption;
    filler: ProgressBar_Filler;
}

class ProgressBar_Track extends UIKit.Core.Component {

    private components: IComponent;

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {

        this.components = {
            caption: new ProgressBar_Caption(
                this.element.find('.uikit-progress-bar-caption'),
                this.mediator,
                this.type,
            ),
            filler: new ProgressBar_Filler(
                this.element.find('.uikit-progress-bar-filler'),
                this.mediator,
                this.type,
            ),
        };

        super.initialize();
    }
}

export default ProgressBar_Track;
