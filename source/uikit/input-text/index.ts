import './index.styl';
import * as UIKit from '../uikit-core/index';
import InputText_Input from './input/index';
import InputText_Indicator from './indicator/index';

interface IComponents {
    input: InputText_Input;
    indicator: InputText_Indicator;
}

class InputText extends UIKit.Core.Element {

    private components: IComponents;

    constructor(element) {
        super(element);
        if (!this.element.hasClass('uikit-input-text')) {
            throw new ReferenceError('Элемент не является полем ввода UIKit');
        }
        this.initialize();
    }

    protected initialize() {
        const model = new InputText_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.components = {
            input: new InputText_Input(
                this.element.find('input'),
                this.mediator),
            indicator: new InputText_Indicator(
                this.element.find('.uikit-indicator'),
                this.mediator),
        };

        if (this.element.attr('indicator') === 'true') {
            this.indicator.enabled = true;
        } else {
            this.indicator.enabled = false;
        }

        this.indicator.status = true;
        super.initialize();
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

class InputText_Model extends UIKit.Core.Model {
    constructor() {
        super({
            text: '',
        });
    }

    public getData(property: string): {[key: string]: string} {
        switch (property){
            case 'text':
                return this.data.text;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
        switch (property){
            case 'text':
                if (typeof data === 'string') {
                    this.data.text = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

export default InputText;
