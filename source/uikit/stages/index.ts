import './index.styl';
import * as UIKit from '../uikit-core/index';
import Stages_Track from './stages-track/index';

interface IElements {
    track: Stages_Track;
}

class Stages extends UIKit.Core.Component {

    public static readonly TYPES = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    private storageInvert: boolean = false;
    private components: IElements;

    constructor(dom: JQuery) {
        super(dom);
        if (!this.dom.hasClass('uikit-stages')) {
            throw new ReferenceError('Элемент не является stages');
        }
        this.initialize();
    }

    protected initialize(): void {

        this.types = new UIKit.Core.Types(Stages.TYPES);
        const type = this.dom.attr('data-type');
        if (this.types.contains(type)) {
            this.type = type;
        } else {
            this.type = Stages.TYPES.HORIZONTAL;
        }

        this.storageInvert = (this.dom.attr('data-invert') === 'true');
        if (this.storageInvert) {
            this.dom.addClass('invert');
        } else {
            this.dom.removeClass('invert');
        }

        const model = new Stages_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        const stages = Number(this.dom.attr('data-stages'));
        let stage = Number(this.dom.attr('data-stage'));
        this.mediator.setData('model.stages', stages);

        if (stage < 1) {
            stage = 1;
        }

        if (stage >= stages) {
            stage = stages;
        }

        const mediatorSubscribeModelStage = (modelData) => {
            this.dom.attr('data-stage', modelData.stage);
        };

        const mediatorSubscribeModelStages = (modelData) => {
            this.dom.attr('data-stage', modelData.stage);
        };

        this.mediator.subscribe('model.stage', mediatorSubscribeModelStage);
        this.mediator.subscribe('model.stages', mediatorSubscribeModelStages);

        this.components = {
            track: new Stages_Track(
                this.dom.find('.uikit-stages-track'),
                this.mediator,
                this.type,
                this.storageInvert),
        };

        this.noRebuild = false;
        const mediatorStagesInvertDirection = () => {
            this.dom.attr('data-invert', `${!this.storageInvert}`);
            this.rebuild();
        };
        this.mediator.subscribe('stages.invertDirection', mediatorStagesInvertDirection);

        setTimeout(
            () => {
                this.mediator.setData('model.stage', stage);
            },
            0);

        this.dom.on('dragstart', () => {
            return false;
        });

        this.dom.on('selectstart', () => {
            return false;
        });

        super.initialize();
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

class Stages_Model extends UIKit.Core.Model {
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
                localData = UIKit.Core.Math.clamp(localData, 0, this.data.stages);
                this.data.stage = localData;
                return true;
            default:
                return false;
        }
    }
}

export default Stages;
