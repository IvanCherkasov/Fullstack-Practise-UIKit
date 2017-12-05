import './themes/index';
import * as UIKit from '../uikit-core/index';
import RadialProgress_Caption from './radial-progress-caption/index';

interface IElements {
    caption: RadialProgress_Caption;
}

class RadialProgress extends UIKit.Core.Component {

    private elements: IElements;

    constructor(dom: JQuery) {
        super(dom);
        if (!this.dom.hasClass('uikit-radial-progress')) {
            throw new ReferenceError('Элемент не является радиальным прогресс баром');
        }
        this.initialize();
    }

    protected initialize() {
        const model = new RadialProgress_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        this.mediator.setData(
            'model.minimum',
            Number(this.dom.attr('data-minimum')));
        this.mediator.setData(
            'model.maximum',
            Number(this.dom.attr('data-maximum')));

        this.mediator.subscribe('model.value', (modelData) => {
            this.dom.attr('data-value', modelData.value);
        });

        this.mediator.subscribe('model.minimum', (modelData) => {
            this.dom.attr('data-minimum', modelData.minimum);
        });

        this.mediator.subscribe('model.maximum', (modelData) => {
            this.dom.attr('data-maximum', modelData.maximum);
        });


        this.elements = {
            caption: new RadialProgress_Caption(
                this.dom.find('.uikit-radial-progress-caption'),
                this.mediator,
                this.type),
        };

        const mediatorSubscribeModelValue = (modelData) => {
            const itemRight = this.dom.find('.progress-right');
            const itemLeft = this.dom.find('.progress-left');
            const percent = Math.abs(modelData.value - modelData.minimum) /
                (modelData.maximum - modelData.minimum) * 100;
            const value = Math.round(((percent * (360)) / 100));
            if (value <= 180 && value >= 0) {
                itemRight.css('transform', 'rotate(' + value + 'deg)');
                itemLeft.css('transform', 'rotate(180deg)');
            } else if (value <= 360 && value > 180) {
                itemRight.css('transform', 'rotate(180deg)');
                itemLeft.css('transform', 'rotate(' + value + 'deg)');
            }
        };
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.dom.on('dragstart', () => {
            return false;
        });

        this.dom.on('selectstart', () => {
            return false;
        });

        this.value = Number(this.dom.attr('data-value'));

        super.initialize();
    }

    public get value():number {
        return this.mediator.getData('model.value');
    }

    public set value(value: number) {
        this.mediator.setData('model.value', value);
    }
}

class RadialProgress_Model extends UIKit.Core.Model {
    constructor() {
        super({
            value: 0,
            minimum: 0,
            maximum: 0,
        });
    }

    public getData(property: string): {[key: string]: string} {
        switch (property){
            case 'value':
                return this.data.value;
            case 'minimum':
                return this.data.minimum;
            case 'maximum':
                return this.data.maximum;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
        switch (property){
            case 'value':
                const value = UIKit.Core.Math.clamp(
                    data,
                    this.data.minimum,
                    this.data.maximum);
                this.data.value = value;
                return true;
            case 'minimum':
                this.data.minimum = data;
                return true;
            case 'maximum':
                this.data.maximum = data;
                return true;
            default:
                return false;
        }
    }
}

export default RadialProgress;
