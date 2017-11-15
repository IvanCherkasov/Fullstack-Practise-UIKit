import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitInputText_Input from './uikit-input/index';
import UIKitInputText_Indicator from './uikit-indicator/index';

class UIKitInputText extends UIKit.Core.UIKitElement {

    private innerObjects: any[];

    constructor(element) {
        super(element);
        if (!this.element.hasClass('uikit-input-text')) {
            throw new ReferenceError('Элемент не является полем ввода UIKit');
        }
        this.init();
    }

    protected init() {
        const model = new UIKitInputText_Model();
        this.mediator = new UIKit.Core.UIKitMediator(model);

        this.innerObjects.push(
            new UIKitInputText_Input(
                this.element.find('input'),
                this.mediator));

        this.innerObjects.push(
            new UIKitInputText_Indicator(
                this.element.find('.uikit-indicator'),
                this.mediator));

        if (this.element.attr('indicator') === 'true') {
            this.innerObjects[1].enabled = true;
        } else {
            this.innerObjects[1].enabled = false;
        }

        this.innerObjects[1].status = true;
        super.init();
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

export default UIKitInputText;
