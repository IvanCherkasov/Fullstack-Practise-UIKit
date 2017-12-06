import './themes/index';
import * as UIKit from '../uikit-core/index';
import Button_Caption from './button-caption/index';
import Button_Effect from './button-effect/index';

// Заменить IsUIKit на добавление класса uikit если он не надйен.

interface IElements {
    caption: Button_Caption;
    effect: Button_Effect;
}

class Button extends UIKit.Core.Component{

    private elements: IElements;

    constructor(dom: JQuery) {
        super(dom);
        this.initialize();
    }

    protected initialize() {
        const model = new Button_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.elements = {
            caption: new Button_Caption(
                this.dom.find('.uikit-button-caption'),
                this.mediator,
                this.type),

            effect: new Button_Effect(
                this.dom.find('.uikit-button-effect'),
                this.mediator,
                this.type),
        };

        this.dom.on('click', (event) => {
            this.mediator.publish('button.click', event);
            this.mediator.publish('click', this, event);
            event.stopPropagation();
        });

        this.dom.on('mouseenter', () => {
            this.mediator.publish('button.hover', true);
        });

        this.dom.on('mouseleave', () => {
            this.mediator.publish('button.hover', false);
        });

        this.caption = this.dom.attr('data-caption');

        super.initialize();
    }

    public set caption(value: string) {
        this.mediator.publish('button.caption', value);
    }
}

class Button_Model extends UIKit.Core.Model{
    constructor() {
        super();
    }
}

export default Button;
