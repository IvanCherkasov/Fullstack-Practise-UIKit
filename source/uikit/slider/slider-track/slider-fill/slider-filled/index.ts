import './index.styl';
import * as UIKit from '../../../../uikit-core/index';

class Slider_Filled extends UIKit.Core.Component {
    constructor(element, mediator, type) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        const clamp = UIKit.Core.Math.clamp;
        const moveFilled = (position: number) => {
            let percent = 0;
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_HORIZONTAL) > -1) {
                percent = (100 / coordinateSystem.width) * position;
                this.element.css('width', clamp(percent, 0, 100) + '%');
            } else if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_VERTICAL) > -1) {
                percent = (100 / coordinateSystem.height) * position;
                this.element.css('height', (clamp(percent, 0, 100)) + '%');
            }
        };

        const mediatorSubscribeModelValue = (modelData) => {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            let percent = Math.abs(modelData.value - minimum) / (maximum - minimum);
            percent *= 100;
            let position = 0;
            if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_HORIZONTAL) > -1) {
                position = Math.round(((percent * (coordinateSystem.width)) / 100));
            } else if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_VERTICAL) > -1) {
                position = Math.round(((percent * (coordinateSystem.height)) / 100));
            }
            moveFilled(position);
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        super.initialize();
    }
}

export default Slider_Filled;