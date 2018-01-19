import * as Core from '../../core/index';
import * as _ from 'lodash';
import './themes/index';
import InputToggle_Thumb from './toggle-thumb/index';

class InputToggle extends Core.Component {

    private domThumb: JQuery;
    private domInput: JQuery;
    private thumb: InputToggle_Thumb;

    public static readonly ORIENTATIONS = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    protected parametersObject: Core.TParameters = {
        'checked': 'false',
        'text.enabled': 'true',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        this.initialize();
    }

    protected initialize() {
        const model = new InputToggle_Model();
        this.mediator = new Core.Mediator(model);
        this.acceptOrientation(InputToggle.ORIENTATIONS, InputToggle.ORIENTATIONS.HORIZONTAL);
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
        this.setDefaults();
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-toggle');
        const domLeftDummy = $('<div>').addClass('left-dummy');
        const domRightDummy = $('<div>').addClass('right-dummy');
        const domTextLeft = $('<div>').addClass('text-left').addClass('no-select').text('ON');
        const domTextRight = $('<div>').addClass('text-right').addClass('no-select').text('OFF');
        this.domInput = $('<input>').attr('type', 'checkbox');
        this.domThumb = $('<div>');
        this.dom.append(
            this.domInput, 
            domLeftDummy, 
            domRightDummy, 
            domTextLeft, 
            domTextRight, 
            this.domThumb);
        this.thumb = new InputToggle_Thumb(
            this.domThumb,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
        );
    }

    private acceptEvents() {
        const mediatorSubscribeModelChecked = (modelData) => {
            this.dom.attr('data-checked', `${modelData.checked}`);
            if (this.checked !== modelData.checked) {
                _.merge(this.parametersObject, { 'checked': `${modelData.checked}` });
                this.mediator.publish('checked', modelData.checked);
            }
        };
        this.mediator.subscribe('model.checked', mediatorSubscribeModelChecked);

        const parametersTextEnabled = (isTextEnabledStr) => {
            this.dom.attr('data-text-enabled', isTextEnabledStr);
        };
        this.mediator.subscribe('parameters.text.enalbed', parametersTextEnabled);

        this.dom.on('click', (event) => {
            this.checked = !this.checked;
            this.mediator.publish('click', event);
        });
    }

    private setDefaults() {
        setTimeout(() => {
            this.checked = (this.parametersObject['checked'] === 'true');
            this.dom.attr('data-text-enabled', this.parametersObject['text.enabled']);
            },     0);
    }

    public get checked(): boolean {
        return this.mediator.getData('model.checked');
    }

    public set checked(value: boolean) {
        (this.domInput.get()[0] as HTMLInputElement).checked = value;
        this.mediator.setData('model.checked', value);
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
                    case 'checked':
                        this.checked = (newParams[current] === 'true');
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class InputToggle_Model extends Core.Model{
    constructor() {
        super({
            ckecked: false,
        });
    }

    public getData(property:string) {
        switch (property) {
            case 'checked':
                return this.data.checked;
            default:
                return undefined;
        }
    }

    public setData(property:string, data:any) {
        switch (property) {
            case 'checked':
                if (typeof data === 'boolean') {
                    this.data.checked = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

export default InputToggle;
