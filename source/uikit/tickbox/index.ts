import * as Core from '../core/index';
import * as _ from 'lodash';
import Tickbox_Inner from './tickbox-inner/index';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

class Tickbox extends Core.Component {
    
    private parametersObject: Core.TParameters = {
        'checked': false,
    };

    private inner: Tickbox_Inner;

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new Tickbox_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.dom.empty();
        this.checkParams();
        this.dom.addClass('uikit-tickbox');
        this.dom.append(template.clone());
        this.inner = new Tickbox_Inner(
            this.dom.find('.uikit-tickbox-inner'),
            this.mediator,
            this.orientation,
            _.clone(this.parametersObject));
    }

    private checkParams() {
        if (this.parametersObject.checked === true) {
            this.dom.attr('data-checked', 'true');
        } else if (this.dom.attr('data-checked') === 'true') {
            this.parametersObject.checked = true;
        } else {
            this.dom.attr('data-checked', 'false');
        }
    }

    private applyEvents() {
        const mediatorModelChecked = (modelData) => {
            this.dom.attr('data-checked', `${modelData.checked}`);
            this.parametersObject['checked'] = modelData.checked;
        };
        this.mediator.subscribe('model.checked', mediatorModelChecked);
    }

    public get checked(): boolean {
        return this.mediator.getData('model.checked');
    }

    public set checked(value: boolean) {
        this.mediator.setData('model.checked', value);
    }

    public get parameters(): Core.TParameters {
        return _.cloneDeep(this.parametersObject);
    }

    public set parameters(newParams: Core.TParameters) {
        _.merge(this.parametersObject, newParams);
        const keys = Object.keys(newParams);
        keys.map((current) => {
            switch (current) {
                case 'checked':
                    this.mediator.setData('model.checked', `${newParams[current] === true}`);
                    break;
                default:
                    this.mediator.publish(`parameters.${current}`, newParams[current]);
            }
        });
    }
}

class Tickbox_Model extends Core.Model {
    constructor() {
        super({
            checked: false,
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

export default Tickbox;
