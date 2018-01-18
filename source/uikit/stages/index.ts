import './themes/index';
import * as Core from '../core/index';
import * as _ from 'lodash';
import Stages_Track from './stages-track/index';

interface IElements {
    track: Stages_Track;
}

class Stages extends Core.Component {

    public static readonly ORIENTATIONS = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    private storageInvert: boolean = false;
    private elements: IElements;

    private parametersObject: Core.TParameters = {
        'stage': 1,
        'maximum': 1,
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new Stages_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize(): void {
        this.isBuilded = false;
        this.acceptOrientation(Stages.ORIENTATIONS, Stages.ORIENTATIONS.HORIZONTAL);
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
        this.acceptValues();
        this.orientationChangingNeedRebuild = true;
    }

    private checkInputParams() {
        if (this.parametersObject['maximum'] > 1) {
            this.dom.attr('data-maximum', `${this.parametersObject['maximum']}`);
        } else if (this.dom.attr('data-maximum')) {
            this.parametersObject['maximum'] = parseInt(this.dom.attr('data-maximum'), 10);
        }
    }

    protected build() {
        this.checkInputParams();
        this.mediator.setData('model.maximum', this.parametersObject['maximum']);
        const track = this.dom.find('.uikit-stages-track');
        this.elements = {
            track: new Stages_Track(
                track,
                this.mediator,
                this.orientation,
                _.cloneDeep(this.parametersObject),
                this.storageInvert),
        };
    }

    private acceptEvents() {
        const mediatorSubscribeModelStage = (modelData) => {
            this.dom.attr('data-stage', modelData.stage);
        };
        this.mediator.subscribe('model.stage', mediatorSubscribeModelStage);

        const mediatorStagesInvertDirection = () => {
            // this.dom.attr('data-invert', `${!this.storageInvert}`);
            // this.initialize();
        };
        this.mediator.subscribe('stages.invertDirection', mediatorStagesInvertDirection);

        this.dom.on('dragstart', () => {
            return false;
        });
        this.dom.on('selectstart', () => {
            return false;
        });
    }

    private acceptValues() {
        const stage = Core.Math.clamp(
            Number(this.dom.attr('data-stage')), 1, this.parametersObject['maximum']);
        this.mediator.setData('model.stage', stage);
    }

    public get stage(): number {
        return this.mediator.getData('model.stage');
    }

    public set stage(value: number) {
        this.mediator.setData('model.stage', value);
    }

    public invertDirection() {
        this.mediator.publish('stages.invertDirection');
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
                    case 'stage':
                        this.mediator.setData('model.stage', newParams[current]);
                    case 'maximum':
                        // ignore
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class Stages_Model extends Core.Model {
    constructor() {
        super({
            maximum: 1,
            stage: 1,
        });
    }

    public getData(property: string) {
        switch (property){
            case 'maximum':
                return this.data.maximum;
            case 'stage':
                return this.data.stage;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        let localData = data;
        switch (property){
            case 'maximum':
                if (localData < 1) localData = 1;
                this.data.maximum = localData;
                return true;
            case 'stage':
                localData = Core.Math.clamp(localData, 1, this.data.maximum);
                this.data.stage = localData;
                return true;
            default:
                return false;
        }
    }
}

export default Stages;
