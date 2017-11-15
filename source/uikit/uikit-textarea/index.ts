import './index.styl';
import UIKit from '../uikit-core/index';

class UIKitTextarea extends UIKit.Core.UIKitElement {

    private caption: string;

    constructor(element: any) {
        super(element);
        if (!this.element.hasClass('uikit-textarea')) {
            throw new ReferenceError('Элемент не является многострочный полем ввода uikit');
        }
        this.init();
    }

    protected init() {
        this.caption = this.element.attr('caption');
        const model = new UIKitTextarea_Model();
        this.mediator = new UIKit.Core.UIKitMediator(model);

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
    }

    public get text(): string {
        return this.mediator.getData('model.text');
    }
}

class UIKitTextarea_Model extends UIKit.Core.UIKitModel {
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

export default UIKitTextarea;
