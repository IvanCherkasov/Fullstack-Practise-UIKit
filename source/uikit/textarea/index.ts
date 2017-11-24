import './index.styl';
import * as UIKit from '../uikit-core/index';

class Textarea extends UIKit.Core.Element {

    private caption: string;

    constructor(element: any) {
        super(element);
        if (!this.element.hasClass('uikit-textarea')) {
            throw new ReferenceError('Элемент не является многострочный полем ввода uikit');
        }
        this.initialize();
    }

    protected initialize() {
        this.caption = this.element.attr('caption');
        const model = new Textarea_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        const focusInCallback = () => {
            const value = this.element.val();
            if (typeof value === 'string') {
                if (value === this.caption) {
                this.element.val('');
                }
            }
        };

        const focusOutCallback = () => {
            let value = this.element.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.element.val(this.caption);
                }
            }
        };

        this.element.focusin(focusInCallback);
        this.element.focusout(focusOutCallback);

        const mediatorSubscribeModelText = (modelData) => {
            this.element.val(modelData.text);
        };

        this.mediator.subscribe('model.text', mediatorSubscribeModelText);
        super.initialize();
    }

    public get text(): string {
        return this.mediator.getData('model.text');
    }
}

class Textarea_Model extends UIKit.Core.Model {
    constructor() {
        super({
            text: '',
        });
    }

    public getData(property: string) {
        switch (property){
            case 'text':
                return this.data.text;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any) {
        switch (property) {
            case 'text':
                this.data.text = data;
                return true;
            default:
                return false;
        }
    }
}

export default Textarea;
