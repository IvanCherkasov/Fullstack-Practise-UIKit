import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitSlider_Input from './uikit-slider-input/index';
import UIKitSlider_Track from './uikit-slider-track/index';
import UIKitSlider_Rule from './uikit-slider-rule/index';

class UIKitSlider extends UIKit.Core.UIKitElement {

    private model;
    private input: UIKitSlider_Input;
    private track: UIKitSlider_Track;
    private rule: UIKitSlider_Rule;

    constructor(element) {
        // @ts-ignore
        super(element);
        if (!this.element.hasClass('uikit-slider')) {
            throw new ReferenceError('Элемент не является слайдером');
        }

        this.Type = 'horizontal';
        this.TypesList = ['horizontal', 'vertical'];
        if (this.element.attr('type') !== undefined) {
            if (this.element.attr('type') !== '') {
                if (this.TypesList.indexOf(this.element.attr('type')) > -1) {
                    this.Type = this.element.attr('type');
                }
            }
        }

        this._init();
    }

    protected _init(): void {
        let middleWare = [];
        this.model = new UIKitSlider_Model();
        this.Mediator = new UIKit.Core.UIKitMediator(this.model);
        this.Mediator.setData('model.minimum', Number(this.element.attr('minimum')));
        this.Mediator.setData('model.maximum', Number(this.element.attr('maximum')));

        this.Mediator.subscribe('model.value', (modelData) => {
            this.element.attr('value', modelData.value);
        });

        this.Mediator.subscribe('model.minimum', (modelData) => {
            this.element.attr('minimum', modelData.minimum);
        });

        this.Mediator.subscribe('model.maximum', (modelData) => {
            this.element.attr('maximum', modelData.maximum);
        });

        this.track = new UIKitSlider_Track(
            this.element.find('.uikit-slider-track'),
            this.Mediator,
            this.Type);

        this.rule = new UIKitSlider_Rule(
            this.element.find('.uikit-slider-rule'),
            this.Mediator,
            this.Type);

        this.input = new UIKitSlider_Input(
            this.element.find('.uikit-slider-input'),
            this.Mediator,
            this.Type);

        setTimeout(
            () => {
                this.Mediator.setData(
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

        this.stylize(this.Type);
    }
}

class UIKitSlider_Model extends UIKit.Core.UIKitModel {
    constructor() {
        // @ts-ignore
        super({
            _value: 0,
            _minimum: 0,
            _maximum: 0,
            _cs: null,
            get value(): number {
                return this._value;
            },
            get minimum(): number {
                return this._minimum;
            },
            get maximum(): number {
                return this._maximum;
            },
            get coordinateSystem() {
                return this._cs;
            },
        });
    }

    public getData(property: string):any {
        switch (property){
            case 'value':
                return this.Data.value;
            case 'minimum':
                return this.Data.minimum;
            case 'maximum':
                return this.Data.maximum;
            case 'coordinateSystem':
                return this.Data.coordinateSystem;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
        switch (property){
            case 'value':
                const value = UIKit.Core.UIKitMath.Clamp(
                    data,
                    this.Data.minimum,
                    this.Data.maximum);
                this.Data._value = value;
                return true;
            case 'minimum':
                this.Data._minimum = data;
                return true;
            case 'maximum':
                this.Data._maximum = data;
                return true;
            case 'coordinateSystem':
                const cs = new UIKit.Core.UIKitCoordinateSystem(data);
                this.Data._cs = cs;
                return true;
            default:
                return false;
        }
    }
}

UIKit.Core.UIKitSlider = UIKitSlider;
