import * as Core from '../../core/index';
import * as _ from 'lodash';
import './themes/index';
import InputText_Indicator from './input-text-indicator/index';

class InputText extends Core.Component {

    private indicator: InputText_Indicator;
    private domInput: JQuery;

    // type TParameters = {[key: string]: string; def in Core
    protected parametersObject: Core.TParameters = {
        'text': '',
        'shadow-text': '',
        'indicator.status': 'false',
        'indicator.enabled': 'false',
        'indicator.caption.enabled': 'false',
        'indicator.caption.error': 'error',
        'indicator.caption.ok': 'thanks',
    };

    constructor (dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        this.initialize();
    }

    protected initialize() {
        const model = new InputText_Model();
        this.mediator = new Core.Mediator(model);
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        this.dom.attr('data-shadow-text', this.parametersObject['shadow-text']);
        this.domInput.val(this.dom.attr('data-shadow-text'));
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-input-text');
        this.domInput = $('<input>').attr('type', 'text');
        const domIndicator = $('<div>').addClass('uikit-indicator');
        this.dom.append(this.domInput, domIndicator);
        this.indicator = new InputText_Indicator(
            domIndicator,
            this.mediator,
            this.orientation,
            this.parametersObject,
        );
    }

    private applyEvents() {
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

        const mediatorSubscribeModelText = (modelData) => {
            _.merge(this.parametersObject, { 'text': `${modelData.text}` });
            if (modelData.text !== this.domInput.val()) {
                this.domInput.val(modelData.text);
            }
        };
        this.mediator.subscribe('model.text', mediatorSubscribeModelText);

        this.domInput.on('change', (event) => {
            this.text = this.domInput.val() as string;
            this.mediator.publish('change', event, this.domInput.val());
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

class InputText_Model extends Core.Model {
    constructor() {
        super({
            text: '',
        });
    }

    public getData(property: string): {[key: string]: string} {
        switch (property){
            case 'text':
                return this.data.text;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
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

export default InputText;
