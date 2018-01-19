import * as Core from '../../core/index';
import * as _ from 'lodash';
import './themes/index';

class InputTextarea extends Core.Component {

    private domTextarea: JQuery;

    public static readonly VARIANTS = {
        'regular': 'regular',
        'none': 'none',
        'fullsize': 'fullsize',
    };

    protected parametersObject: Core.TParameters = {
        'text': '',
        'shadow-text': '',
        'cols': '20',
        'rows': '2',
        'resizeble': 'false',
        'variant': 'none',
    };

    constructor(dom: JQuery, parameters: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }

        const model = new InputTextarea_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();

        this.availableVariants = new Core.Orientations(InputTextarea.VARIANTS);
        this.variant = this.parametersObject['variant'];
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        this.dom.attr('data-shadow-text', this.parametersObject['shadow-text']);
        this.domTextarea.val(this.dom.attr('data-shadow-text'));
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-input-textarea');
        this.domTextarea = $('<textarea>')
            .attr('cols', this.parametersObject['cols'])
            .attr('rows', this.parametersObject['rows'])
            .attr('data-resizeble', this.parametersObject['resizeble']);
        this.dom.append(this.domTextarea);
    }

    private applyEvents() {
        const mediatorShadowText = (shadowText) => {
            if (shadowText) {
                const oldShText = this.dom.attr('data-shadow-text');
                this.dom.attr('data-shadow-text', shadowText);
                if (this.domTextarea.val() === oldShText) {
                    this.domTextarea.val(shadowText);
                }
            }
        };
        this.mediator.subscribe('parameters.shadow-text', mediatorShadowText);

        const inputFocusInCallback = () => {
            const value = this.domTextarea.val();
            if (typeof value === 'string') {
                if (value === this.dom.attr('data-shadow-text')) {
                    this.domTextarea.val('');
                }
            }
        };

        const inputFocusOutCallback = () => {
            let value = this.domTextarea.val();
            if (typeof value === 'string') {
                value = value.trim();
                if (value === '') {
                    this.domTextarea.val(this.dom.attr('data-shadow-text'));
                }
            }
        };

        this.domTextarea.on('focusin', inputFocusInCallback);
        this.domTextarea.on('focusout', inputFocusOutCallback);

        const mediatorModelText = (modelData) => {
            _.merge(this.parametersObject, { 'text': `${modelData.text}` });
            if (modelData.text !== this.domTextarea.val()) {
                this.domTextarea.val(modelData.text);
            }
        };
        this.mediator.subscribe('model.text', mediatorModelText);

        this.domTextarea.on('change', (event) => {
            this.text = this.domTextarea.val() as string;
            this.mediator.publish('change', event, this.domTextarea.val());
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
                    case 'text':
                        this.text = newParams[current];
                        break;
                    case 'variant':
                        this.variant = newParams[current];
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }

    public get text(): string {
        return this.mediator.getData('model.text');
    }

    public set text(value: string) {
        if (this.text !== value) {
            this.mediator.setData('model.text', value);
        }
    }
}

class InputTextarea_Model extends Core.Model {
    constructor() {
        super({
            text: '',
        });
    }

    public getData(property: string): any {
        switch (property){
            case 'text':
                return this.data.text;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        switch (property){
            case 'text':
                if (typeof data === 'string') {
                    this.data.text = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

export default InputTextarea;
