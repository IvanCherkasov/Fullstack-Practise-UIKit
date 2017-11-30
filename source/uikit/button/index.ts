import './index.styl';
import * as UIKit from '../uikit-core/index';
import Button_Caption from './button-caption/index';
import Button_Effect from './button-effect/index';

interface IComponent {
    caption: Button_Caption;
    effect: Button_Effect;
}

class Button extends UIKit.Core.Element{

    private components: IComponent;

    constructor(element: JQuery) {
        super(element);
        this.initialize();
    }

    protected initialize() {
        const model = new Button_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.components = {
            caption: new Button_Caption(
                this.element.find('.uikit-button-caption'),
                this.mediator,
                this.type),

            effect: new Button_Effect(
                this.element.find('.uikit-button-effect'),
                this.mediator,
                this.type),
        };

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

        this.caption = this.element.attr('data-caption');

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
