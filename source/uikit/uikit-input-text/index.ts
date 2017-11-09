import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitInputText_Input from './uikit-input/index';
import UIKitInputText_Indicator from './uikit-indicator/index';

class UIKitInputText extends UIKit.Core.UIKitElement {

    private model;
    private mediator;
    private input: UIKitInputText_Input;
    private Indicator: UIKitInputText_Indicator;

    constructor(element) {
        // @ts-ignore
        super(element);
        if (!this.element.hasClass('uikit-input-text')) {
            throw new ReferenceError('Элемент не является полем ввода UIKit');
        }

        this.model = new UIKitInputText_Model();
        this.mediator = new UIKit.Core.UIKitMediator(this.model);

        this.input = new UIKitInputText_Input(
            this.element.find('input'),
            this.mediator);

        this.Indicator = new UIKitInputText_Indicator(
            this.element.find('.uikit-indicator'),
            this.mediator);

        if (this.element.attr('indicator') === 'true') {
            this.indicator.enabled = true;
        } else {
            this.indicator.enabled = false;
        }

        this.indicator.status = true;
    }

    public get text(): string {
        return this.mediator.getData('model.text');
    }

    public set text(value: string) {
        this.mediator.setData('model.text', value);
    }

    get indicator(): any {
        const mediator = this.mediator;
        return {
            set enabled(value: boolean) {
                mediator.publish('indicator.enabled', value);
            },
            set status(value: boolean) {
                mediator.publish('indicator.status', value);
            },
        };
    }
}

class UIKitInputText_Model extends UIKit.Core.UIKitModel {
    constructor() {
        // @ts-ignore
        super({
            _text: '',
            get text() {
                return this._text;
            },
        });
    }

    public getData(property) {
        switch (property){
            case 'text':
                return this.Data.text;
            default:
                return undefined;
        }
    }

    public setData(property, data) {
        switch (property){
            case 'text':
                if (typeof data === 'string') {
                    this.Data._text = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

UIKit.Core.UIKitInputText = UIKitInputText;
