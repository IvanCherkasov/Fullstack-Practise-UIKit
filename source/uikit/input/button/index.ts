import * as Core from '../../core/index';
import Button_Caption from './button-caption/index';
import Button_Effect from './button-effect/index';
import './themes/index';

class Button extends Core.Element {

    private caption: Button_Caption;
    private effect: Button_Effect;

    constructor(
        dom: JQuery, 
        mediator: Core.Mediator, 
        type: string, 
        defaultParameters?: Core.TParameters) {
            super(dom, mediator, type, defaultParameters);
            this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
    }

    protected build() {
        this.dom.empty();
        
        const domEffect = $('<div>')
            .addClass('uikit-button-effect');
        const domCaption = $('<div>')
            .addClass('uikit-button-caption')
            .addClass('no-select');
        this.dom.append(domCaption, domEffect);

        this.caption = new Button_Caption(
            domCaption,
            this.mediator,
            this.orientation,
            this.defaultParameters,
        );

        this.effect = new Button_Effect(
            domEffect,
            this.mediator,
            this.orientation,
            this.defaultParameters,
        );
    }
}

export default Button;
