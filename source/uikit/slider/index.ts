import './index.styl';
import * as UIKit from '../uikit-core/index';
import Slider_Input from './slider-input/index';
import Slider_Track from './slider-track/index';
import Slider_Rule from './slider-rule/index';

interface IComponents {
    input: Slider_Input;
    track: Slider_Track;
    rule: Slider_Rule;
}

class Slider extends UIKit.Core.Element {

    private components: IComponents;

    constructor(element: JQuery) {
        super(element);
        if (!this.element.hasClass('uikit-slider')) {
            throw new ReferenceError('Элемент не является слайдером');
        }
        this.initialize();
    }

    protected initialize(): void {

        const type: string = this.element.attr('data-type');
        this.type = UIKit.Core.Types.HORIZONTAL;
        if (type) {
            this.type = type;
        }

        const middleWare = [];
        const model = new Slider_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        this.mediator.setData('model.minimum', Number(this.element.attr('minimum')));
        this.mediator.setData('model.maximum', Number(this.element.attr('maximum')));

        this.mediator.subscribe('model.value', (modelData) => {
            this.element.attr('value', modelData.value);
        });

        this.mediator.subscribe('model.minimum', (modelData) => {
            this.element.attr('minimum', modelData.minimum);
        });

        this.mediator.subscribe('model.maximum', (modelData) => {
            this.element.attr('maximum', modelData.maximum);
        });

        this.noRebuild = false;

        this.components = {
            input: new Slider_Input(
            this.element.find('.uikit-slider-input'),
            this.mediator,
            this.type),

            track: new Slider_Track(
            this.element.find('.uikit-slider-track'),
            this.mediator,
            this.type),

            rule:  new Slider_Rule(
            this.element.find('.uikit-slider-rule'),
            this.mediator,
            this.type),
        };

        setTimeout(
            () => {
                this.mediator.setData(
                    'model.value',
                    Number(this.element.attr('value')));
            },
            0);

        this.element.on('dragstart', () => {
            return false;
        });

        this.element.on('selectstart', () => {
            return false;
        });

        super.initialize();
    }
}

class Slider_Model extends UIKit.Core.Model {
    constructor() {
        super({
            value: 0,
            minimum: 0,
            maximum: 0,
            cs: null,
        });
    }

    public getData(property: string):any {
        switch (property){
            case 'value':
                return this.data.value;
            case 'minimum':
                return this.data.minimum;
            case 'maximum':
                return this.data.maximum;
            case 'coordinateSystem':
                return this.data.cs;
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
            case 'coordinateSystem':
                const cs = new UIKit.Core.CoordinateSystem(data);
                this.data.cs = cs;
                return true;
            default:
                return false;
        }
    }
}

export default Slider;
