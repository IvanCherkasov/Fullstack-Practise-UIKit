import * as Core from '../../core/index';
import * as _ from 'lodash';
import './themes/index';

class InputArrowButton extends Core.Component {

    private domInput: JQuery;

    private parametersObject: Core.TParameters = {
        'name': '',
        'type': 'button', // submit, button
        'form': '',
        'variant': 'left',
    };

    private static readonly VARIANTS = {
        'left': 'left',
        'right': 'right',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new InputArrowButton_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(InputArrowButton.VARIANTS);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        this.domInput.attr('type', this.parametersObject['type']);
        this.variant = this.parametersObject['variant'];
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-input-arrow-button');
        this.domInput = $('<input>');
        const domArrow = $('<div>')
            .addClass('uikit-input-arrow-button-arrow');
        this.dom.append(this.domInput, domArrow);
    }

    private applyEvents() {
        this.dom.on('click', (event) => { 
            if (this.enabled) {
                this.mediator.publish('click', event);
            }
        });

        const mediatorParametersName = (name) => {
            this.domInput.attr('name', name);
        };
        this.mediator.subscribe('parameters.name', mediatorParametersName);

        const mediatorParametersType = (type) => {
            if (type === 'submit') {
                this.domInput.attr('type', 'submit');
            } else {
                this.domInput.attr('type', 'button');
            }
        };
        this.mediator.subscribe('parameters.type', mediatorParametersType);

        const mediatorParametersForm = (form) => {
            this.domInput.attr('form', form);
        };
        this.mediator.subscribe('parameters.form', mediatorParametersForm);
    }

    public get parameters(): Core.TParameters {
        return _.cloneDeep(this.parametersObject);
    }

    public set parameters(newParams: Core.TParameters) {
        _.merge(this.parametersObject, newParams);
        const keys = Object.keys(newParams);
        keys.map((current) => {
            if (typeof newParams[current] === 'string') {
                switch (current) {
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class InputArrowButton_Model extends Core.Model{
    constructor() {
        super({
        });
    }

    public getData(property: string): any {
        return undefined;
    }

    public setData(property: string, data: any): boolean {
        return false;
    }
}

export default InputArrowButton;
