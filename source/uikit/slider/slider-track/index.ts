import './index.styl';
import * as UIKit from '../../uikit-core/index';
import Slider_Fill from './slider-fill/index';
import Slider_Thumb from './slider-thumb/index';

interface IComponents {
    fill: Slider_Fill;
    thumb: Slider_Thumb;
}

class Slider_Track extends UIKit.Core.Component {

    private components: IComponents;
    private storage: {[key: string]: any};

    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.storage = {
            isDrag: false,
        };
        this.initialize();
    }

    protected initialize() {
        this.mediator.setData('model.coordinateSystem', this.element);

        this.components = {
            fill: new Slider_Fill(
            this.element.find('.uikit-slider-fill'),
            this.mediator,
            this.type),

            thumb: new Slider_Thumb(
            this.element.find('.uikit-slider-thumb'),
            this.mediator,
            this.type),
        };

        const startDrag = () => {
                this.storage.isDrag = true;
                const documentOnMousemove = (event) => {
                    const coordinateSystem = this.mediator.getData('model.coordinateSystem');
                    const minimum = this.mediator.getData('model.minimum');
                    const maximum = this.mediator.getData('model.maximum');
                    let position: number = 0;
                    let percent: number = 0;
                    if (this.type === UIKit.Core.Types.HORIZONTAL) {
                        position = event.pageX - coordinateSystem.xMin;
                        percent = (100 / (coordinateSystem.width)) * position;
                    } else if (this.type === UIKit.Core.Types.VERTICAL) {
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
            if (this.type === UIKit.Core.Types.HORIZONTAL) {
                position = event.pageX - coordinateSystem.xMin;
                percent = (100 / (coordinateSystem.width)) * position;
            } else if (this.type === UIKit.Core.Types.VERTICAL) {
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

        super.initialize();
    }
}

export default Slider_Track;
