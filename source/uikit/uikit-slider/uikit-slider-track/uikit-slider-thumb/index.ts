import './index.styl';
import UIKit from  '../../../uikit-core/index';
import UIKitSlider_Upper from './uikit-slider-upper/index';

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement {

    private isDrag: boolean = false;
    private isHover: boolean = false;
    private upper: UIKitSlider_Upper;

    constructor(element, mediator, type) {
        // @ts-ignore
        super(element, mediator, type);
        const clamp = UIKit.Core.UIKitMath.Clamp;
        const calculateValue = (position) => {
            const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
            const minimum = this.Mediator.getData('model.minimum');
            const maximum = this.Mediator.getData('model.maximum');
            let percent = 0;

            if (this.Type === 'horizontal') {
                percent = (100 / coordinateSystem.width) * position;
            } else if (this.Type === 'vertical') {
                percent = (100 / coordinateSystem.height) * position;
                percent = 100 - percent;
            }
            const value = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
            return value;
        };

        const moveThumb = (position) => {
            if (position >= 0) {
                const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
                if (this.Type === 'horizontal') {
                    const percent = (100 / coordinateSystem.width) * (position);
                    const maximum = (100 / coordinateSystem.xMax) *
                    (coordinateSystem.xMax - (this.element.width() / 2));
                    const minimum = (100 / coordinateSystem.width) * this.element.width();
                    this.element.css('left', clamp(percent, -minimum, maximum) + '%');
                } else if (this.Type === 'vertical') {
                    const percent = (100 / coordinateSystem.height) * (position);
                    const maximum = (100 / coordinateSystem.yMax) *
                    (coordinateSystem.yMax + (this.element.width()));
                    const minimum = (100 / coordinateSystem.height) * this.element.width() / 2;
                    this.element.css('top', (100 - clamp(percent, -minimum, maximum)) + '%');
                }
            }
        };

        const startDrag = () => {
            this.isDrag = true;
            const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
            const documentMousemove = (event) => {
                if (this.Type === 'horizontal') {
                    const position = event.pageX - coordinateSystem.xMin;
                    const value = calculateValue(position);
                    if (value !== this.Mediator.getData('model.value')) {
                        this.Mediator.setData('model.value', value);
                    }
                } else if (this.Type === 'vertical') {
                    const position = event.pageY - coordinateSystem.yMin;
                    const value = calculateValue(position);
                    if (value !== this.Mediator.getData('model.value')) {
                        this.Mediator.setData('model.value', value);
                    }
                }
            };
            $(document).on('mousemove.uikit.slider.thumb', documentMousemove);
            const documentMouseup = () => {
                $(document).off('mousemove.uikit.slider.thumb');
                $(document).off('mouseup.uikit.slider.thumb');
                this.isDrag = false;
            };
            $(document).on('mouseup.uikit.slider.thumb', documentMouseup);
        };

        this.upper = new UIKitSlider_Upper(
            this.element.find('.uikit-slider-thumb-upper'),
            this.Mediator,
            this.Type);

        this.element.on('mouseenter.uikit.slider.thumb', () => {
            this.isHover = true;
            this.Mediator.publish('thumb.hover', true);
        });

        this.element.on('mouseleave.uikit.slider.thumb', () => {
            this.isHover = false;
            this.Mediator.publish('thumb.hover', false);
        });

        const mediatorSubscribeModelValue = (modelData) => {
            const coordinateSystem = this.Mediator.getData('model.coordinateSystem');
            const minimum = this.Mediator.getData('model.minimum');
            const maximum = this.Mediator.getData('model.maximum');
            const percent = Math.abs(modelData.value - minimum) / (maximum - minimum) * 100;
            if (this.Type === 'horizontal') {
                const position = Math.round(((percent * (coordinateSystem.width)) / 100));
                moveThumb(position);
            } else if (this.Type === 'vertical') {
                const position = Math.round(((percent * (coordinateSystem.height)) / 100));
                moveThumb(position);
            }
        };
        this.Mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.element.on('mousedown.uikit.slider.thumb', (event) => {
            startDrag();
            event.stopPropagation();
        });

        this.stylize(this.Type);
    }
}

export default UIKitSlider_Thumb;
