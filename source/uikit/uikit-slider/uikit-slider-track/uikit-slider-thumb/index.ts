import './index.styl';
import UIKit from  '../../../uikit-core/index';
import UIKitSlider_Upper from './uikit-slider-upper/index';

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement {

    private innerObjects: any[];
    private clamp = UIKit.Core.UIKitMath.clamp;

    constructor(element, mediator, type) {
        super(element, mediator, type);
        this.storage['isDrag'] = false;
        this.storage['isHover'] = false;
        this.init();
    }

    protected init() {
        this.innerObjects.push(
            new UIKitSlider_Upper(
            this.element.find('.uikit-slider-thumb-upper'),
            this.mediator,
            this.type));

        this.element.on('mouseenter.uikit.slider.thumb', () => {
            this.storage.isHover = true;
            this.mediator.publish('thumb.hover', true);
        });

        this.element.on('mouseleave.uikit.slider.thumb', () => {
            this.storage.isHover = false;
            this.mediator.publish('thumb.hover', false);
        });

        const mediatorSubscribeModelValue = (modelData) => {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            const percent = Math.abs(modelData.value - minimum) / (maximum - minimum) * 100;
            if (this.type === 'horizontal') {
                const position = Math.round(((percent * (coordinateSystem.width)) / 100));
                this.moveThumb(position);
            } else if (this.type === 'vertical') {
                const position = Math.round(((percent * (coordinateSystem.height)) / 100));
                this.moveThumb(position);
            }
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.element.on('mousedown.uikit.slider.thumb', (event) => {
            this.startDrag();
            event.stopPropagation();
        });

        super.init();
    }

    private calculateValue(position: number): number {
        const coordinateSystem = this.mediator.getData('model.coordinateSystem');
        const minimum: number = this.mediator.getData('model.minimum');
        const maximum: number = this.mediator.getData('model.maximum');
        let percent: number = 0;

        if (this.type === 'horizontal') {
            percent = (100 / coordinateSystem.width) * position;
        } else if (this.type === 'vertical') {
            percent = (100 / coordinateSystem.height) * position;
            percent = 100 - percent;
        }
        const value: number = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
        return value;
    }

    private moveThumb(position) {
        if (position >= 0) {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            if (this.type === 'horizontal') {
                const percent = (100 / coordinateSystem.width) * (position);
                const maximum = (100 / coordinateSystem.xMax) *
                (coordinateSystem.xMax - (this.element.width() / 2));
                const minimum = (100 / coordinateSystem.width) * this.element.width();
                this.element.css('left', this.clamp(percent, -minimum, maximum) + '%');
            } else if (this.type === 'vertical') {
                const percent = (100 / coordinateSystem.height) * (position);
                const maximum = (100 / coordinateSystem.yMax) *
                (coordinateSystem.yMax + (this.element.width()));
                const minimum = (100 / coordinateSystem.height) * this.element.width() / 2;
                this.element.css('top', (100 - this.clamp(percent, -minimum, maximum)) + '%');
            }
        }
    }

    private startDrag() {
        this.storage.isDrag = true;
        const coordinateSystem = this.mediator.getData('model.coordinateSystem');
        const documentMousemove = (event) => {
            if (this.type === 'horizontal') {
                const position = event.pageX - coordinateSystem.xMin;
                const value = this.calculateValue(position);
                if (value !== this.mediator.getData('model.value')) {
                    this.mediator.setData('model.value', value);
                }
            } else if (this.type === 'vertical') {
                const position = event.pageY - coordinateSystem.yMin;
                const value = this.calculateValue(position);
                if (value !== this.mediator.getData('model.value')) {
                    this.mediator.setData('model.value', value);
                }
            }
        };
        $(document).on('mousemove.uikit.slider.thumb', documentMousemove);
        const documentMouseup = () => {
            $(document).off('mousemove.uikit.slider.thumb');
            $(document).off('mouseup.uikit.slider.thumb');
            this.storage.isDrag = false;
        };
        $(document).on('mouseup.uikit.slider.thumb', documentMouseup);
    }
}

export default UIKitSlider_Thumb;
