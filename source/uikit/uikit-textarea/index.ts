import './index.styl';
import UIKit from '../uikit-core/index';

class UIKitTextarea extends UIKit.Core.UIKitElement {

    public mediator;
    public model;

    private caption: string;

    constructor(element: any) {
        // @ts-ignore
        super(element);
        if (!this.element.hasClass('uikit-textarea')) {
            throw new ReferenceError('Элемент не является многострочный полем ввода uikit');
        }
        this.caption = this.element.attr('caption');
        this.model = new UIKitTextarea_Model();
        this.mediator = new UIKit.Core.UIKitMediator(this.model);

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
        return this.Mediator.getData('model.text');
    }
}

class UIKitTextarea_Model extends UIKit.Core.UIKitModel {
    constructor() {
        // @ts-ignore
        super({
            _text: '',
            get text() {
                return this._text;
            },
        });
    }

    public getData(property: string) {
        switch (property){
            case 'text':
                return this.Data.text;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any) {
        switch (property) {
            case 'text':
                this.Data._text = data;
                return true;
            default:
                return false;
        }
    }
}

UIKit.Core.UIKitTextarea = UIKitTextarea;
