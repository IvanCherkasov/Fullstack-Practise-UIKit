import './index.styl';
import UIKit from '../../../../uikit-core/index';

class UIKitSlider_Filled extends UIKit.Core.UIKitElement {
    constructor(element, mediator, type) {
        // @ts-ignore
        super(element, mediator, type);
        const clamp = UIKit.Core.UIKitMath.Clamp;
        const moveFilled = (position: number) => {
            let percent = 0;
            const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
            if (this.Type === 'horizontal') {
                percent = (100 / coordinateSystem.width) * position;
                this.element.css('width', clamp(percent, 0, 100) + '%');
            } else if (this.Type === 'vertical') {
                percent = (100 / coordinateSystem.height) * position;
                this.element.css('height', (clamp(percent, 0, 100)) + '%');
            }
        };

        const mediatorSubscribeModelValue = (modelData) => {
            const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
            const minimum = this.Mediator.getData('model.minimum');
            const maximum = this.Mediator.getData('model.maximum');
            let percent = Math.abs(modelData.value - minimum) / (maximum - minimum);
            percent *= 100;
            let position = 0;
            if (this.Type === 'horizontal') {
                position = Math.round(((percent * (coordinateSystem.width)) / 100));
            } else if (this.Type === 'vertical') {
                position = Math.round(((percent * (coordinateSystem.height)) / 100));
            }
            moveFilled(position);
        };
        this.Mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.stylize(this.Type);
    }
}

export default UIKitSlider_Filled;
