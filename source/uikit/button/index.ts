import './themes/index';
import * as Core from '../core/index';
import Button_Caption from './button-caption/index';
import Button_Effect from './button-effect/index';

interface IElements {
    caption: Button_Caption;
    effect: Button_Effect;
}

class Button extends Core.Component{

    public static create(dom: JQuery): Button {
        return new Button(dom);
    }
    public static readonly VARIANTS = {
        ERROR: 'error',
        ACCEPT: 'accept',
    };

    private elements: IElements;

    constructor(dom: JQuery) {
        super(dom);
        const model = new Button_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.acceptVariants();
        this.acceptEvents();
        this.acceptValues();
    }

    protected build() {
        this.dom.empty();
        const attributes: object = Core.Utils.getAllAttributes(this.dom);

        const btnCaption = $('<div>')
            .addClass('uikit-button-caption')
            .addClass('no-select');
        this.dom.append(btnCaption);

        const btnEffect = $('<div>')
            .addClass('uikit-button-effect');
        this.dom.append(btnEffect);

        this.elements = {
            caption: new Button_Caption(
                btnCaption,
                this.mediator,
                this.type,
                attributes),

            effect: new Button_Effect(
                btnEffect,
                this.mediator,
                this.type,
                attributes),
        };
    }

    private acceptVariants() {
        this.availableVariants = new Core.Types(Button.VARIANTS);
    }

    private acceptEvents() {
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
    }

    private acceptValues() {
        this.caption = this.dom.attr('data-caption');
    }

    public set caption(value: string) {
        this.mediator.publish('button.caption', value);
    }
}

class Button_Model extends Core.Model{
    constructor() {
        super();
    }

    public getData(property: string): any {
        return undefined;
    }

    public setData(property: string, data: any): boolean {
        return false;
    }
}

export default Button;
