import * as Core from '../../core/index';
import * as _ from 'lodash';
import InputSearch_Btn from './input-search-btn/index';
import './themes/index';

class InputSearch extends Core.Component {

    private domInput: JQuery;
    private button: InputSearch_Btn;

    private parametersObject: Core.TParameters = {
        'text': '',
        'shadow-text': '',
        'error-message': '',
        'name': '',
        'error': 'false',
    };

    constructor (dom: JQuery, parameters: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new InputSearch_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
        this.domInput.attr('name', this.parametersObject['name']);
        this.dom.attr('data-shadow-text', this.parametersObject['shadow-text']);
        this.domInput.val(this.dom.attr('data-shadow-text'));
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-input-search');
        this.domInput = $('<input>')
            .attr('type', 'search');
        const searchBtn = $('<div>')
            .addClass('uikit-input-search-btn');
        this.dom.append(this.domInput, searchBtn);
        this.button = new InputSearch_Btn(
            searchBtn,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
        );
    }

    private applyEvents() {
        this.domInput.keypress((event) => {
            if (event.which === 13) {
                this.mediator.publish('search.started');
            }
        });

        const mediatorSubscribeShadowText = (shadowText) => {
            if (shadowText) {
                const oldShText = this.dom.attr('data-shadow-text');
                this.dom.attr('data-shadow-text', shadowText);
                if (this.domInput.val() === oldShText) {
                    this.domInput.val(shadowText);
                }
            }
        };
        this.mediator.subscribe('parameters.shadow-text', mediatorSubscribeShadowText);

        const inputFocusInCallback = () => {
            const value = this.domInput.val();
            if (typeof value === 'string') {
                if (value === this.dom.attr('data-shadow-text')) {
                    this.domInput.val('');
                }
            }
        };

        const inputFocusOutCallback = () => {
            let value = this.domInput.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.domInput.val(this.dom.attr('data-shadow-text'));
                }
            }
        };
        this.domInput.on('focusin', inputFocusInCallback);
        this.domInput.on('focusout', inputFocusOutCallback);

        const domValueChange = () => {
            this.parametersObject['text'] = this.domInput.val() as string;
        };
        this.domInput.on('change', domValueChange);

        const parametersError = (error) => {
            this.error = (error === 'true');
        };
        this.mediator.subscribe('parameters.error', parametersError);

        this.domInput.on('change', (event) => {
            this.mediator.publish('change', event, this.domInput.val());
        });
    }

    public get text(): string {
        return this.domInput.val() as string;
    }

    public set text(value:string) {
        if (value !== this.text) {
            this.domInput.val(value);
        }
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

    public set error(value: boolean) {
        this.dom.attr('data-error', `${value}`);
        this.parametersObject['error'] = `${value}`;
    }

    public get error(): boolean {
        return (this.dom.attr('data-error') === 'true');
    }
}

class InputSearch_Model extends Core.Model {
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

export default InputSearch;
