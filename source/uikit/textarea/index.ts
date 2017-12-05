import './index.styl';
import * as UIKit from '../uikit-core/index';

class Textarea extends UIKit.Core.Component {

    private storageCaption: string = '';

    constructor(dom: JQuery) {
        super(dom);
        if (!this.dom.hasClass('uikit-textarea')) {
            throw new ReferenceError('Элемент не является многострочный полем ввода uikit');
        }
        this.initialize();
    }

    protected initialize() {
        this.storageCaption = this.dom.attr('caption');
        const model = new Textarea_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        const focusInCallback = () => {
            const value = this.dom.val();
            if (typeof value === 'string') {
                if (value === this.storageCaption) {
                this.dom.val('');
                }
            }
        };

        const focusOutCallback = () => {
            let value = this.dom.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.dom.val(this.storageCaption);
                }
            }
        };

        this.dom.focusin(focusInCallback);
        this.dom.focusout(focusOutCallback);

        const mediatorSubscribeModelText = (modelData) => {
            this.dom.val(modelData.text);
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
