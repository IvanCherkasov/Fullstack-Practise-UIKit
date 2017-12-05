import './index.styl';
import * as UIKit from  '../../../uikit-core/index';
import Slider from '../../index';
import Slider_Upper from './slider-upper/index';

interface IElements {
    upper: Slider_Upper;
}

class Slider_Thumb extends UIKit.Core.Element {

    private storageIsDrag: boolean = false;
    private storageIsHover: boolean = false;

    private elements: IElements;
    private clamp = UIKit.Core.Math.clamp;

    constructor(
        dom: JQuery,
        mediator: UIKit.Core.Mediator,
        type: string) {
            super(dom, mediator, type);
            this.initialize();
    }

    protected initialize() {

        this.elements = {
            upper: new Slider_Upper(
            this.dom.find('.uikit-slider-thumb-upper'),
            this.mediator,
            this.type),
        };

        this.dom.on('mouseenter.uikit.slider.thumb', () => {
            this.storageIsHover = true;
            this.mediator.publish('thumb.hover', true);
        });

        this.dom.on('mouseleave.uikit.slider.thumb', () => {
            this.storageIsHover = false;
            this.mediator.publish('thumb.hover', false);
        });

        const mediatorSubscribeModelValue = (modelData) => {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            const percent = Math.abs(modelData.value - minimum) / (maximum - minimum) * 100;
            if (this.type === Slider.TYPES.HORIZONTAL) {
                const position = Math.round(((percent * (coordinateSystem.width)) / 100));
                this.moveThumb(position);
            } else if (this.type === Slider.TYPES.VERTICAL) {
                const position = Math.round(((percent * (coordinateSystem.height)) / 100));
                this.moveThumb(position);
            }
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.dom.on('mousedown.uikit.slider.thumb', (event) => {
            this.startDrag();
            event.stopPropagation();
        });

        super.initialize();
    }

    private calculateValue(position: number): number {
        const coordinateSystem = this.mediator.getData('model.coordinateSystem');
        const minimum: number = this.mediator.getData('model.minimum');
        const maximum: number = this.mediator.getData('model.maximum');
        let percent: number = 0;

        if (this.type === Slider.TYPES.HORIZONTAL) {
            percent = (100 / coordinateSystem.width) * position;
        } else if (this.type === Slider.TYPES.VERTICAL) {
            percent = (100 / coordinateSystem.height) * position;
            percent = 100 - percent;
        }
        const value: number = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
        return value;
    }

    private moveThumb(position) {
        if (position >= 0) {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            if (this.type === Slider.TYPES.HORIZONTAL) {
                const percent = (100 / coordinateSystem.width) * (position);
                const maximum = (100 / coordinateSystem.xMax) *
                (coordinateSystem.xMax - (this.dom.width() / 2));
                const minimum = (100 / coordinateSystem.width) * this.dom.width();
                this.dom.css('left', this.clamp(percent, -minimum, maximum) + '%');
            } else if (this.type === Slider.TYPES.VERTICAL) {
                const percent = (100 / coordinateSystem.height) * (position);
                const maximum = (100 / coordinateSystem.yMax) *
                (coordinateSystem.yMax + (this.dom.width()));
                const minimum = (100 / coordinateSystem.height) * this.dom.width() / 2;
                this.dom.css('top', (100 - this.clamp(percent, -minimum, maximum)) + '%');
            }
        }
    }

    private startDrag() {
        this.storageIsDrag = true;
        const coordinateSystem = this.mediator.getData('model.coordinateSystem');
        const documentMousemove = (event) => {
            if (this.type === Slider.TYPES.HORIZONTAL) {
                const position = event.pageX - coordinateSystem.xMin;
                const value = this.calculateValue(position);
                if (value !== this.mediator.getData('model.value')) {
                    this.mediator.setData('model.value', value);
                }
            } else if (this.type === Slider.TYPES.VERTICAL) {
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
            this.storageIsDrag = false;
        };
        $(document).on('mouseup.uikit.slider.thumb', documentMouseup);
    }
}

export default Slider_Thumb;
