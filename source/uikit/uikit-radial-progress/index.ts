import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitRadialProgress_Caption from './uikit-radial-progress-caption/index';

class UIKitRadialProgress extends UIKit.Core.UIKitElement {

    private innerObjects: any[];

    constructor(element) {
        super(element);
        if (!this.element.hasClass('uikit-radial-progress')) {
            throw new ReferenceError('Элемент не является радиальным прогресс баром');
        }
        this.init();
    }

    protected init() {
        const model = new UIKitRadialProgress_Model();
        this.mediator = new UIKit.Core.UIKitMediator(model);
        this.mediator.setData(
            'model.minimum',
            Number(this.element.attr('minimum')));
        this.mediator.setData(
            'model.maximum',
            Number(this.element.attr('maximum')));

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
            new UIKitRadialProgress_Caption(
            this.element.find('.uikit-radial-progress-caption'),
            this.mediator));

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
        this.mediator.subscribe('model.value', mediatorSubscribeModelValue);

        this.element.on('dragstart', () => {
            return false;
        });

        this.element.on('selectstart', () => {
            return false;
        });

        this.value = Number(this.element.attr('value'));

        super.init();
    }

    public get value():number {
        return this.mediator.getData('model.value');
    }

    public set value(value: number) {
        this.mediator.setData('model.value', value);
    }
}

class UIKitRadialProgress_Model extends UIKit.Core.UIKitModel {
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
            default:
                return false;
        }
    }
}

export default UIKitRadialProgress;
