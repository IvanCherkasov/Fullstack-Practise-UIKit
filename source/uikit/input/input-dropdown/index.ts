import * as Core from '../../core/index';
import * as _ from 'lodash';
import InputDropdown_Container from './dropdown-container/index'; 
import InputDropdown_Button from './dropdown-button/index';
import './themes/index';

class InputDropdown extends Core.Component {

    private button: InputDropdown_Button;
    private container: InputDropdown_Container;
    private domInput: JQuery;
    private storageItems: {value: string, caption: string}[];

    private parametersObject: Core.TParameters = {
        'name': '',
        'form': '',
        'selected': '',
        'items': [],
    };

    constructor(dom: JQuery, parameters: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
            this.storageItems = this.parametersObject['items'];
        }
        const model = new InputDropdown_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();

        this.dom.attr('data-block-visible', 'false');
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        this.domInput.attr('name', this.parametersObject['name']);
        this.domInput.attr('form', this.parametersObject['form']);

        this.selected = this.parametersObject['selected'];
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-input-dropdown');
        this.domInput = $('<select>');
        const domButton = $('<div>')
            .addClass('uikit-input-dropdown-button');
        const domDropdownContainer = $('<div>')
            .addClass('uikit-input-dropdown-container');
        this.dom.append(this.domInput, domDropdownContainer, domButton);
        this.container = new InputDropdown_Container(
            domDropdownContainer,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
            this.storageItems,
        );
        this.button = new InputDropdown_Button(
            domButton,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
        );
        this.applyItems();
    }

    private applyEvents() {
        const mediatorLiClick = (event, item) => {
            this.domInput.val(item.value).change();
        };
        this.mediator.subscribe('li.click', mediatorLiClick);

        const mediatorModelSelected = (modelData) => {
            if (this.items.indexOf(modelData.selected) > -1) {
                this.domInput.val(modelData.selected.value).change();
            } else {
                this.domInput.val([]).change();
            }
        };
        this.mediator.subscribe('model.selected', mediatorModelSelected);

        this.domInput.on('change', (event) => {
            this.mediator.publish('input.change', event);
        });

        this.dom.on('click', (event) => {
            const visible = (this.dom.attr('data-block-visible') === 'false');
            if (visible) {
                $(document).on('click.uikit.dropdown', () => {
                    this.dom.attr('data-block-visible', `false`);
                    $(document).off('click.uikit.dropdown');
                });
            }
            this.dom.attr('data-block-visible', `${visible}`);
            event.stopPropagation();
        });
    }

    private applyItems() {
        this.domInput.empty();
        this.storageItems.map((item) => {
            const option = $('<option>').attr('value', item.value).text(item.caption);
            this.domInput.append(option);
        });
    }

    private get items(): {value: string, caption: string}[] {
        return this.storageItems;
    }

    private set items(list: {value: string, caption: string}[]) {
        this.storageItems = list;
        this.isBuilded = false;
        this.build();
        this.isBuilded = true;
    }

    private get selected(): string {
        return this.mediator.getData('model.selected').value;
    }

    private set selected(value: string) {
        let item: {value: string, caption: string} = { value: '', caption: '' };
        $.each(this.items, (index, val) => {
            if (val.value === value) {
                item = val;
                return false;
            }
        });
        this.mediator.setData('model.selected', item);
    }

    public get parameters(): Core.TParameters {
        return _.cloneDeep(this.parametersObject);
    }

    public set parameters(newParams: Core.TParameters) {
        _.merge(this.parametersObject, newParams);
        const keys = Object.keys(newParams);
        keys.map((current) => {
            switch (current) {
                case 'items':
                    this.items = newParams[current];
                    break;
                default:
                    this.mediator.publish(`parameters.${current}`, newParams[current]);
            }
        });
    }
}

class InputDropdown_Model extends Core.Model {
    constructor() {
        super({
            selected: {
                value: '',
                caption: '',
            },
        });
    }

    public getData(property: string): any {
        switch (property) {
            case 'selected':
                return this.data.selected;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        switch (property) {
            case 'selected':
                this.data.selected = data;
                return true;
            default:
                return false;
        }
    }
}

export default InputDropdown;
