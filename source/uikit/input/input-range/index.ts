import * as Core from '../../core/index';
import * as _ from 'lodash';
import Range_Track from './track/index';
import Range_Rule from './rule/index';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

class Range extends Core.Component {

    private track: Range_Track;
    private rule: Range_Rule;

    public static readonly ORIENTATIONS = {
        'horisontal': 'horisontal',
        'vertical': 'vertical',
    };

    private parametersObject: Core.TParameters = {
        'value': 0,
        'minimum': NaN,
        'maximum': NaN,
        'orientation': 'horisontal',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new Range_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
        this.applyValue();
    }

    protected build() {
        this.dom.empty();
        this.checkParams();
        this.dom.append(template.clone());
        this.track = new Range_Track(
            this.dom.find('.uikit-range-track'),
            this.mediator,
            this.orientation,
            _.clone(this.parametersObject),
        );
        this.rule = new Range_Rule(
            this.dom.find('.uikit-range-rule'),
            this.mediator,
            this.orientation,
            _.clone(this.parametersObject),
        );
    }

    private checkParams() {
        if (this.parametersObject['minimum'] !== NaN) {
            this.dom.attr('data-minimum', `${this.parametersObject['minimum']}`);
        } else if (this.dom.attr('data-minimum')) {
            this.parametersObject['minimum'] = parseInt(this.dom.attr('data-minimum'), 10);
        } else {
            this.parametersObject['minimum'] = 0;
            this.dom.attr('data-minimum', `0`);
        }

        if (this.parametersObject['maximum'] !== NaN) {
            this.dom.attr('data-maximum', `${this.parametersObject['maximum']}`);
        } else if (this.dom.attr('data-maximum')) {
            this.parametersObject['maximum'] = parseInt(this.dom.attr('data-maximum'), 10);
        } else {
            this.parametersObject['maximum'] = 100;
            this.dom.attr('data-maximum', `100`);
        }

        this.mediator.setData('model.minimum', this.parametersObject['minimum']);
        this.mediator.setData('model.maximum', this.parametersObject['maximum']);
    }

    private applyEvents() {

    }

    private applyValue() {

    }
}

class Range_Model extends Core.Model {
    constructor() {
        super({
            value: 0,
            minimum: NaN,
            maximum: NaN,
            cs: null,
        });
    }

    public getData(property: string):any {
        switch (property){
            case 'value':
                return this.data.value;
            case 'minimum':
                return this.data.minimum;
            case 'maximum':
                return this.data.maximum;
            case 'coordinateSystem':
                return this.data.cs;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
        switch (property){
            case 'value':
                const value = Core.Math.clamp(
                    data,
                    this.data.minimum,
                    this.data.maximum);
                this.data.value = value;
                return true;
            case 'minimum':
                this.data.minimum = data;
                return true;
            case 'maximum':
                this.data.maximum = data;
                return true;
            case 'coordinateSystem':
                const cs = new Core.CoordinateSystem(data);
                this.data.cs = cs;
                return true;
            default:
                return false;
        }
    }
}

export default Range;
