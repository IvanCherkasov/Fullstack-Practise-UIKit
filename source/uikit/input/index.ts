import * as Core from '../core/index';
import InputText from './input-text/index';
import InputToggle from './toggle/index';
import InputButton from './input-button/index';
import InputSubmit from './input-submit/index';
import InputTextarea from './input-textarea/index';
import InputRadio from './input-radio/index';
import InputCheckbox from './input-checkbox/index';
import InputSearch from './input-search/index';
import InputDropdown from './input-dropdown/index';
import InputArrow from './input-arrow-button/index';

class Input {
    public static create(dom: JQuery, params?: Core.TParameters): Core.Component {
        let attributeType: string = dom.attr('data-type');
        if (!attributeType) {
            dom.attr('data-type', 'text');
            attributeType = 'text';
        }

        switch (attributeType) {
            case 'text':
                return new InputText(dom, params);
            case 'toggle':
                return new InputToggle(dom, params);
            case 'checkbox':
                return new InputCheckbox(dom, params);
            case 'radio':
                return new InputRadio(dom, params);
            case 'button':
                return new InputButton(dom, params);
            case 'submit':
                return new InputSubmit(dom, params);
            case 'textarea':
                return new InputTextarea(dom, params);
            case 'search':
                return new InputSearch(dom, params);
            case 'dropdown':
                return new InputDropdown(dom, params);
            case 'select':
                return new InputDropdown(dom, params);
            case 'arrow':
                return new InputArrow(dom, params);
            default:
                console.error(dom, `тип не распознан; data-type=${attributeType}`);
                return undefined;
        }
    }

    constructor() {
        return undefined;
    }
}

export default Input;
