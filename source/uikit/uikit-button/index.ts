import './index.styl';
import UIKit from '../uikit-core/index';
import UIKitButton_Caption from './uikit-button-caption/index';
import UIKitButton_Effect from './uikit-button-effect/index';

class UIKitButton extends UIKit.Core.UIKitElement{

    private model: any;
    private innerObjects: any[];

    constructor(element: any) {
        super(element);
        this.init();
    }

    protected init() {
        this.model = new UIKitButton_Model();
        this.mediator = new UIKit.Core.UIKitMediator(this.model);

        this.innerObjects.push(
            new UIKitButton_Caption(
                this.element.find('.uikit-button-caption'),
                this.mediator));

        this.innerObjects.push(
            new UIKitButton_Effect(
                this.element.find('.uikit-button-effect'),
                this.mediator));

        this.element.on('click', (event) => {
            this.mediator.publish('button.click', event);
            event.stopPropagation();
        });

        this.element.on('mouseenter', () => {
            this.mediator.publish('button.hover', true);
        });

        this.element.on('mouseleave', () => {
            this.mediator.publish('button.hover', false);
        });

        this.caption = this.element.attr('caption');

        super.init();
    }

    public set caption(value: string) {
        this.mediator.publish('button.caption', value);
    }
}

class UIKitButton_Model extends UIKit.Core.UIKitModel{
    constructor() {
        super();
    }
}

export default UIKitButton;
