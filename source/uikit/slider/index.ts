import './index.styl';
import * as UIKit from '../uikit-core/index';
import Slider_Input from './slider-input/index';
import Slider_Track from './slider-track/index';
import Slider_Rule from './slider-rule/index';

class Types extends UIKit.Core.Types {
    public static readonly HORIZONTAL: string = 'horizontal';
    public static readonly VERTICAL: string = 'vertical';
}

interface IElements {
    input: Slider_Input;
    track: Slider_Track;
    rule: Slider_Rule;
}

class Slider extends UIKit.Core.Component {

    public static readonly TYPES = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    private elements: IElements;

    constructor(dom: JQuery) {
        super(dom);
        if (!this.dom.hasClass('uikit-slider')) {
            throw new ReferenceError('Элемент не является слайдером');
        }
        this.initialize();
    }

    protected initialize(): void {

        this.types = new UIKit.Core.Types(Slider.TYPES);
        const type = this.dom.attr('data-type');
        console.log(`type = ${type}; contains: ${this.types.contains(type)}`);
        if (this.types.contains(type)) {
            this.type = type;
        } else {
            this.type = Slider.TYPES.HORIZONTAL;
        }

        const middleWare = [];
        const model = new Slider_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        this.mediator.setData('model.minimum', Number(this.dom.attr('minimum')));
        this.mediator.setData('model.maximum', Number(this.dom.attr('maximum')));

        this.mediator.subscribe('model.value', (modelData) => {
            this.dom.attr('value', modelData.value);
        });

        this.mediator.subscribe('model.minimum', (modelData) => {
            this.dom.attr('minimum', modelData.minimum);
        });

        this.mediator.subscribe('model.maximum', (modelData) => {
            this.dom.attr('maximum', modelData.maximum);
        });

        this.noRebuild = false;

        this.elements = {
            input: new Slider_Input(
            this.dom.find('.uikit-slider-input'),
            this.mediator,
            this.type),

            track: new Slider_Track(
            this.dom.find('.uikit-slider-track'),
            this.mediator,
            this.type),

            rule:  new Slider_Rule(
            this.dom.find('.uikit-slider-rule'),
            this.mediator,
            this.type),
        };

        setTimeout(
            () => {
                this.mediator.setData(
                    'model.value',
                    Number(this.dom.attr('value')));
            },
            0);

        this.dom.on('dragstart', () => {
            return false;
        });

        this.dom.on('selectstart', () => {
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
