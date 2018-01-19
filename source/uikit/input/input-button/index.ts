import * as Core from '../../core/index';
import * as _ from 'lodash';
import Button from '../button/index';

class InputButton extends Core.Component {

    public static readonly VARIANTS = {
        'none': 'none',
        'error': 'error',
        'regular': 'regular',
        'regularError': 'regular.error',
        'event': 'event',
        'event.orangered': 'event.orangered',
        'event.aqua': 'event.aqua',
    };

    private button: Button;

    protected parametersObject: Core.TParameters = {
        'caption': 'Button',
        'variant': '',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new InputButton_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(InputButton.VARIANTS);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
        this.variant = this.parametersObject['variant'];
    }

    protected build() {
        this.dom.empty();
        const domInput = $('<input>')
            .attr('type', 'button');
        this.dom.addClass('uikit-button');
        this.button = new Button(
            this.dom,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
        );
        this.dom.append(domInput);
    }

    private applyEvents() {
        this.dom.on('click', (event) => {
            this.mediator.publish('click', event);
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
                    case 'variant':
                        this.variant = newParams[current];
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class InputButton_Model extends Core.Model{
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

export default InputButton;
