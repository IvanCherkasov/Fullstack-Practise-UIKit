import * as Core from '../../core/index';
import * as _ from 'lodash';
import InputCheckbox_Container from './input-checkbox-container/index';
import './themes/index';

class InputCheckbox extends Core.Component {

    private domInput: JQuery;
    private container: InputCheckbox_Container;

    private parametersObject: Core.TParameters = {
        'checked': 'false',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new InputCheckbox_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        this.dom.attr('data-checked', 'false');
        const checked = (this.parametersObject['checked'] === 'true');
        if (checked) {
            this.checked = true;
        }
    }

    protected build() {
        const label = $(this.dom).find('label').filter(':first').clone();
        this.dom.empty();
        if (label) {
            this.dom.append(label);
        }
        this.dom.addClass('uikit-input-checkbox');
        this.domInput = $('<input>')
            .attr('type', 'checkbox');
        const domCheckboxContainer = $('<div>')
            .addClass('uikit-input-checkbox-container');
        this.dom.append(this.domInput, domCheckboxContainer);
        this.container = new InputCheckbox_Container(
            domCheckboxContainer,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
        );
    }

    private applyEvents() {
        this.domInput.on('change', () => {
            const val = this.domInput.is(':checked');
            this.dom.attr('data-checked', `${val}`);
        });

        const mediatorClick = (event) => {
            this.checked = !this.checked;
        };
        this.mediator.subscribe('click', mediatorClick); // вызывается контейнером

        const parametersChecked = (checked: string) => {
            this.checked = (checked === 'true');
        };
        this.mediator.subscribe('parameters.checked', parametersChecked);
    }

    public set checked(value: boolean) {
        this.domInput.prop('checked', value).change();
    }

    public get checked(): boolean {
        return this.domInput.is(':checked');
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

class InputCheckbox_Model extends Core.Model {
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

export default InputCheckbox;
