import './index.styl';
import UIKit from '../../uikit-core/index';
import UIKitSlider_Fill from './uikit-slider-fill/index';
import UIKitSlider_Thumb from './uikit-slider-thumb/index';

class UIKitSlider_Track extends UIKit.Core.UIKitElement {

    private innerObjects: any[];

    constructor(element, mediator, type) {
        super(element, mediator, type);
        this.storage['isDrag'] = false;
        this.init();
    }

    protected init() {
        this.mediator.setData('model.coordinateSystem', this.element);

        this.innerObjects.push(
            new UIKitSlider_Fill(
            this.element.find('.uikit-slider-fill'),
            this.mediator,
            this.type));

        this.innerObjects.push(
            new UIKitSlider_Thumb(
            this.element.find('.uikit-slider-thumb'),
            this.mediator,
            this.type));

        const startDrag = () => {
                this.storage.isDrag = true;
                const documentOnMousemove = (event) => {
                    const coordinateSystem = this.mediator.getData('model.coordinateSystem');
                    const minimum = this.mediator.getData('model.minimum');
                    const maximum = this.mediator.getData('model.maximum');
                    let position: number = 0;
                    let percent: number = 0;
                    if (this.type === 'horizontal') {
                        position = event.pageX - coordinateSystem.xMin;
                        percent = (100 / (coordinateSystem.width)) * position;
                    } else if (this.type === 'vertical') {
                        position = event.pageY - coordinateSystem.yMin;
                        percent = (100 / (coordinateSystem.height)) * position;
                        percent = 100 - percent;
                    }
                    const value = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
                    if (value !== this.mediator.getData('model.value')) {
                        this.mediator.setData('model.value', value);
                    }
                };
                $(document).on('mousemove.uikit.slider.track', documentOnMousemove);
                const documentMouseup = () => {
                    $(document).off('mousemove.uikit.slider.track');
                    $(document).off('mouseup.uikit.slider.track');
                    this.storage.isDrag = false;
                };
                $(document).on('mouseup.uikit.slider.track', documentMouseup);
        };

        const elementMousedown = (event) => {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            let position = 0;
            let percent = 0 ;
            if (this.type === 'horizontal') {
                position = event.pageX - coordinateSystem.xMin;
                percent = (100 / (coordinateSystem.width)) * position;
            } else if (this.type === 'vertical') {
                position = event.pageY - coordinateSystem.yMin;
                percent = (100 / (coordinateSystem.height)) * position;
                percent = 100 - percent;
            }
            const value = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
            this.mediator.setData('model.value', value);
            startDrag();
        };
        this.element.on('mousedown.uikit.slider.track', elementMousedown);

        this.element.on('mouseenter.uikit.slider.track', () => {
            this.mediator.publish('track.hover', true);
        });

        super.init();
    }
}

export default UIKitSlider_Track;
