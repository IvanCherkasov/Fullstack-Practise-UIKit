import './themes/index';
import * as Core from '../core/index';
import Stages_Track from './stages-track/index';

interface IElements {
    track: Stages_Track;
}

class Stages extends Core.Component {

    public static readonly TYPES = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    public static create(dom: JQuery): Stages {
        return new Stages(dom);
    }

    private storageInvert: boolean = false;
    private elements: IElements;

    constructor(dom: JQuery) {
        super(dom);
        if (!this.dom.hasClass('uikit-stages')) {
            this.dom.addClass('uikit-stages');
        }
        const model = new Stages_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize(): void {
        this.isBuilded = false;
        this.acceptType(Stages.TYPES, Stages.TYPES.HORIZONTAL);
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
        this.acceptValues();
        this.typeChangingNeedRebuild = true;
    }

    protected build() {
        this.dom.empty();
        const track = $('<div>')
            .addClass('uikit-stages-track');
        this.dom.append(track);
        const attributes: object = Core.Utils.getAllAttributes(this.dom);
        this.elements = {
            track: new Stages_Track(
                track,
                this.mediator,
                this.type,
                attributes,
                this.storageInvert),
        };
    }

    private acceptEvents() {
        const mediatorSubscribeModelStage = (modelData) => {
            this.dom.attr('data-stage', modelData.stage);
        };
        const mediatorSubscribeModelStages = (modelData) => {
            this.dom.attr('data-stage', modelData.stage);
        };
        this.mediator.subscribe('model.stage', mediatorSubscribeModelStage);
        this.mediator.subscribe('model.stages', mediatorSubscribeModelStages);

        const mediatorStagesInvertDirection = () => {
            this.dom.attr('data-invert', `${!this.storageInvert}`);
            this.initialize();
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
        const stages = Number(this.dom.attr('data-stages'));
        const stage = Core.Math.clamp(Number(this.dom.attr('data-stage')), 1, stages);
        setTimeout(
            () => {
                this.mediator.setData('model.stages', stages);
                this.mediator.setData('model.stage', stage);
            },
            0);
    }

    protected initialigfgze(): void {
        // Заменить на [data-invert="true"]
        this.storageInvert = (this.dom.attr('data-invert') === 'true');
        if (this.storageInvert) {
            this.dom.addClass('invert');
        } else {
            this.dom.removeClass('invert');
        }
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
}

class Stages_Model extends Core.Model {
    constructor() {
        super({
            stages: 0,
            stage: 0,
        });
    }

    public getData(property: string) {
        switch (property){
            case 'stages':
                return this.data.stages;
            case 'stage':
                return this.data.stage;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        let localData = data;
        switch (property){
            case 'stages':
                if (localData < 1) localData = 1;
                this.data.stages = localData;
                return true;
            case 'stage':
                localData = Core.Math.clamp(localData, 0, this.data.stages);
                this.data.stage = localData;
                return true;
            default:
                return false;
        }
    }
}

export default Stages;
