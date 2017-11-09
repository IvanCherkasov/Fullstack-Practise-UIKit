import './index.styl';
import UIKit from '../../uikit-core/index';
import UIKitSlider_Fill from './uikit-slider-fill/index';
import UIKitSlider_Thumb from './uikit-slider-thumb/index';

class UIKitSlider_Track extends UIKit.Core.UIKitElement {

    private isDrag: boolean = false;
    private fill: UIKitSlider_Fill;
    private thumb: UIKitSlider_Thumb;

    constructor(element, mediator, type) {
        // @ts-ignore
        super(element, mediator, type);
        this.Mediator.setData('model.coordinateSystem', this.element);

        this.fill = new UIKitSlider_Fill(
            this.element.find('.uikit-slider-fill'),
            this.Mediator,
            this.Type);

        this.thumb = new UIKitSlider_Thumb(
            this.element.find('.uikit-slider-thumb'),
            this.Mediator,
            this.Type);

        const startDrag = () => {
                this.isDrag = true;
                const documentOnMousemove = (event) => {
                    const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
                    const minimum = this.Mediator.getData('model.minimum');
                    const maximum = this.Mediator.getData('model.maximum');
                    let position: number = 0;
                    let percent: number = 0;
                    if (this.Type === 'horizontal') {
                        position = event.pageX - coordinateSystem.xMin;
                        percent = (100 / (coordinateSystem.width)) * position;
                    } else if (this.Type === 'vertical') {
                        position = event.pageY - coordinateSystem.yMin;
                        percent = (100 / (coordinateSystem.height)) * position;
                        percent = 100 - percent;
                    }
                    const value = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
                    if (value !== this.Mediator.getData('model.value')) {
                        this.Mediator.setData('model.value', value);
                    }
                };
                $(document).on('mousemove.uikit.slider.track', documentOnMousemove);
                const documentMouseup = () => {
                    $(document).off('mousemove.uikit.slider.track');
                    $(document).off('mouseup.uikit.slider.track');
                    this.isDrag = false;
                };
                $(document).on('mouseup.uikit.slider.track', documentMouseup);
        };

        const elementMousedown = (event) => {
            const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
            const minimum = this.Mediator.getData('model.minimum');
            const maximum = this.Mediator.getData('model.maximum');
            let position = 0;
            let percent = 0 ;
            if (this.Type === 'horizontal') {
                position = event.pageX - coordinateSystem.xMin;
                percent = (100 / (coordinateSystem.width)) * position;
            } else if (this.Type === 'vertical') {
                position = event.pageY - coordinateSystem.yMin;
                percent = (100 / (coordinateSystem.height)) * position;
                percent = 100 - percent;
            }
            const value = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
            this.Mediator.setData('model.value', value);
            startDrag();
        };
        this.element.on('mousedown.uikit.slider.track', elementMousedown);

        this.element.on('mouseenter.uikit.slider.track', () => {
            this.Mediator.publish('track.hover', true);
        });

        this.stylize(this.Type);
    }
}

export default UIKitSlider_Track;
