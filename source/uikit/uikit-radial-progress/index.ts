import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitRadialProgress_Caption from './uikit-radial-progress-caption/index';

class UIKitRadialProgress extends UIKit.Core.UIKitElement {

    private model;
    private caption: UIKitRadialProgress_Caption;

    constructor(element) {
        // @ts-ignore
        super(element);
        if (!this.element.hasClass('uikit-radial-progress')) {
            throw new ReferenceError('Элемент не является радиальным прогресс баром');
        }

        this.model = new UIKitRadialProgress_Model();
        this.Mediator = new UIKit.Core.UIKitMediator(this.model);
        this.Mediator.setData(
            'model.minimum',
            Number(this.element.attr('minimum')));
        this.Mediator.setData(
            'model.maximum',
            Number(this.element.attr('maximum')));

        this.Mediator.subscribe('model.value', (modelData) => {
            this.element.attr('value', modelData.value);
        });

        this.Mediator.subscribe('model.minimum', (modelData) => {
            this.element.attr('minimum', modelData.minimum);
        });

        this.Mediator.subscribe('model.maximum', (modelData) => {
            this.element.attr('maximum', modelData.maximum);
        });

        this.caption = new UIKitRadialProgress_Caption(
            this.element.find('.uikit-radial-progress-caption'),
            this.Mediator);

        const mediatorSubscribeModelValue = (modelData) => {
            const itemRight = this.element.find('.progress-right');
            const itemLeft = this.element.find('.progress-left');
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
        this.Mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.element.on('dragstart', () => {
            return false;
        });

        this.element.on('selectstart', () => {
            return false;
        });

        this.value = Number(this.element.attr('value'));
    }

    public get value():number {
        return this.Mediator.getData('model.value');
    }

    public set value(value: number) {
        this.Mediator.setData('model.value', value);
    }
}

class UIKitRadialProgress_Model extends UIKit.Core.UIKitModel {
    constructor() {
        // @ts-ignore
        super({
            _value: 0,
            _minimum: 0,
            _maximum: 0,
            get value() {
                return this._value;
            },
            get minimum() {
                return this._minimum;
            },
            get maximum() {
                return this._maximum;
            },
        });
    }

    public getData(property: string): any {
        switch (property){
            case 'value':
                return this.Data.value;
            case 'minimum':
                return this.Data.minimum;
            case 'maximum':
                return this.Data.maximum;
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
            default:
                return false;
        }
    }
}

UIKit.Core.UIKitRadialProgress = UIKitRadialProgress;
