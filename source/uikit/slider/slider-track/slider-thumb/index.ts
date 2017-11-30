import './index.styl';
import * as UIKit from  '../../../uikit-core/index';
import Slider_Upper from './slider-upper/index';

interface IComponents {
    upper: Slider_Upper;
}

class Slider_Thumb extends UIKit.Core.Component {

    private storageIsDrag: boolean = false;
    private storageIsHover: boolean = false;

    private components: IComponents;
    private clamp = UIKit.Core.Math.clamp;

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {

        this.components = {
            upper: new Slider_Upper(
            this.element.find('.uikit-slider-thumb-upper'),
            this.mediator,
            this.type),
        };

        this.element.on('mouseenter.uikit.slider.thumb', () => {
            this.storageIsHover = true;
            this.mediator.publish('thumb.hover', true);
        });

        this.element.on('mouseleave.uikit.slider.thumb', () => {
            this.storageIsHover = false;
            this.mediator.publish('thumb.hover', false);
        });

        const mediatorSubscribeModelValue = (modelData) => {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            const minimum = this.mediator.getData('model.minimum');
            const maximum = this.mediator.getData('model.maximum');
            const percent = Math.abs(modelData.value - minimum) / (maximum - minimum) * 100;
            if (this.type === UIKit.Core.Types.HORIZONTAL) {
                const position = Math.round(((percent * (coordinateSystem.width)) / 100));
                this.moveThumb(position);
            } else if (this.type === UIKit.Core.Types.VERTICAL) {
                const position = Math.round(((percent * (coordinateSystem.height)) / 100));
                this.moveThumb(position);
            }
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.element.on('mousedown.uikit.slider.thumb', (event) => {
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

        if (this.type === UIKit.Core.Types.HORIZONTAL) {
            percent = (100 / coordinateSystem.width) * position;
        } else if (this.type === UIKit.Core.Types.VERTICAL) {
            percent = (100 / coordinateSystem.height) * position;
            percent = 100 - percent;
        }
        const value: number = Math.round(((percent * (maximum - minimum)) / 100) + minimum);
        return value;
    }

    private moveThumb(position) {
        if (position >= 0) {
            const coordinateSystem = this.mediator.getData('model.coordinateSystem');
            if (this.type === UIKit.Core.Types.HORIZONTAL) {
                const percent = (100 / coordinateSystem.width) * (position);
                const maximum = (100 / coordinateSystem.xMax) *
                (coordinateSystem.xMax - (this.element.width() / 2));
                const minimum = (100 / coordinateSystem.width) * this.element.width();
                this.element.css('left', this.clamp(percent, -minimum, maximum) + '%');
            } else if (this.type === UIKit.Core.Types.VERTICAL) {
                const percent = (100 / coordinateSystem.height) * (position);
                const maximum = (100 / coordinateSystem.yMax) *
                (coordinateSystem.yMax + (this.element.width()));
                const minimum = (100 / coordinateSystem.height) * this.element.width() / 2;
                this.element.css('top', (100 - this.clamp(percent, -minimum, maximum)) + '%');
            }
        }
    }

    private startDrag() {
        this.storageIsDrag = true;
        const coordinateSystem = this.mediator.getData('model.coordinateSystem');
        const documentMousemove = (event) => {
            if (this.type === UIKit.Core.Types.HORIZONTAL) {
                const position = event.pageX - coordinateSystem.xMin;
                const value = this.calculateValue(position);
                if (value !== this.mediator.getData('model.value')) {
                    this.mediator.setData('model.value', value);
                }
            } else if (this.type === UIKit.Core.Types.VERTICAL) {
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
