import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitSlider_Input from './uikit-slider-input/index';
import UIKitSlider_Track from './uikit-slider-track/index';
import UIKitSlider_Rule from './uikit-slider-rule/index';

class UIKitSlider extends UIKit.Core.UIKitElement {

    private innerObjects: any[];

    constructor(element) {
        super(element);
        if (!this.element.hasClass('uikit-slider')) {
            throw new ReferenceError('Элемент не является слайдером');
        }
        this.init();
    }

    protected init(): void {

        let type = this.types.HORIZONTAL;
        if (this.element.attr('type') !== undefined) {
            if (this.element.attr('type') !== '') {
                if (this.types[this.element.attr('type')]) {
                    type = this.element.attr('type');
                }
            }
        }
        this.initTypes(this.types, type);

        const middleWare = [];
        const model = new UIKitSlider_Model();
        this.mediator = new UIKit.Core.UIKitMediator(model);
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

        this.innerObjects.push(
            new UIKitSlider_Track(
            this.element.find('.uikit-slider-track'),
            this.mediator,
            this.types,
            this.type));

        this.innerObjects.push(
            new UIKitSlider_Rule(
            this.element.find('.uikit-slider-rule'),
            this.mediator,
            this.types,
            this.type));

        this.innerObjects.push(
            new UIKitSlider_Input(
            this.element.find('.uikit-slider-input'),
            this.mediator,
            this.types,
            this.type));

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

        super.init();
    }

    public get types() {
        return {
            HORIZONTAL: 'horizontal',
            VERTICAL: 'vertical',
        };
    }
}

class UIKitSlider_Model extends UIKit.Core.UIKitModel {
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
                return this.data.coordinateSystem;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
        switch (property){
            case 'value':
                const value = UIKit.Core.UIKitMath.clamp(
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
                const cs = new UIKit.Core.UIKitCoordinateSystem(data);
                this.data.cs = cs;
                return true;
            default:
                return false;
        }
    }
}

export default UIKitSlider;
