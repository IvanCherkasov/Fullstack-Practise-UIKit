import * as Core from '../../core/index';
import * as _ from 'lodash';
import InputRadio_Container from './input-radio-contatiner/index';
import './themes/index';

class InputRadio extends Core.Component {

    private domInput: JQuery;
    private container: InputRadio_Container;

    private parametersObject: Core.TParameters = {
        'checked': 'false',
        'name': '',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new InputRadio_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
        
        this.domInput.attr('name', this.parametersObject['name']);
        this.dom.attr('data-checked', 'false');
        const defaultChecked = (this.parametersObject['checked'] === 'true');
        if (defaultChecked) {
            this.check();
        }
    }

    protected build() {
        const label = $($(this.dom).find('label').filter(':first')).clone();
        this.dom.empty();
        if (label) {
            this.dom.append(label);
        }
        this.dom.addClass('uikit-input-radio');
        this.domInput = $('<input>')
            .attr('type', 'radio');
        const domRadioContainer = $('<div>')
            .addClass('uikit-input-radio-container');
        this.dom.append(this.domInput, domRadioContainer);
        this.container = new InputRadio_Container(
            domRadioContainer,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
        );
    }

    private applyEvents() {
        this.mediator.subscribe('click', () => {
            if (!this.checked) {
                this.check();
            }
        });
        
        this.domInput.change(() => {
            const val = this.domInput.is(':checked');
            this.parametersObject['checked'] = `${val}`;
            this.dom.attr('data-checked', `${val}`);
        });

        const parametersName = (name) => {
            this.domInput.attr('name', name);
        };
        this.mediator.subscribe('parameters.name', parametersName);
    }

    public get checked(): boolean {
        return this.domInput.is(':checked');
    }

    public check() {
        this.domInput.prop('checked', true);
        $(`.uikit-input-radio input[name=${this.parametersObject['name']}]`)
            .map((index, item) => {
                $(item).change();
        });
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

class InputRadio_Model extends Core.Model {
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

export default InputRadio;
