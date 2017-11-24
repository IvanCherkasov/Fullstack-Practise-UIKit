import './index.styl';
import * as UIKit from '../uikit-core/index';
import Stages_Track from './stages-track/index';

interface IComponents {
    track: Stages_Track;
}

class Stages extends UIKit.Core.Element {

    private components: IComponents;

    constructor(element) {
        super(element);
        if (!this.element.hasClass('uikit-stages')) {
            throw new ReferenceError('Элемент не является stages');
        }
        this.initialize();
    }

    protected initialize(): void {
        this.storage = {
            invert: false,
        };

        if (this.element.attr('invert') !== undefined) {
            if (this.element.attr('invert') !== '') {
                const isTrueSet = (this.element.attr('invert') === 'true');
                if (isTrueSet) {
                    this.storage.invert = true;
                }
            }
        }

        this.type = [UIKit.Core.Types.ORIENTATION_HORIZONTAL];
        if (this.element.attr('data-type').toLowerCase() === 'vertical') {
            this.type = [UIKit.Core.Types.ORIENTATION_VERTICAL];
        }

        const model = new Stages_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        const stages = Number(this.element.attr('stages'));
        let stage = Number(this.element.attr('stage'));
        this.mediator.setData('model.stages', stages);

        if (stage < 1) {
            stage = 1;
        }

        if (stage >= stages) {
            stage = stages;
        }

        const mediatorSubscribeModelStage = (modelData) => {
            this.element.attr('stage', modelData.stage);
        };

        const mediatorSubscribeModelStages = (modelData) => {
            this.element.attr('stage', modelData.stage);
        };

        this.mediator.subscribe('model.stage', mediatorSubscribeModelStage);
        this.mediator.subscribe('model.stages', mediatorSubscribeModelStages);

        this.components = {
            track: new Stages_Track(
                this.element.find('.uikit-stages-track'),
                this.mediator,
                this.type,
                this.invert),
        };

        setTimeout(
            () => {
                this.mediator.setData('model.stage', stage);
            },
            0);

        this.element.on('dragstart', () => {
            return false;
        });

        this.element.on('selectstart', () => {
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

    public get invert(): boolean {
        return this.storage.invert;
    }

    public set invert(value: boolean) {
        if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_VERTICAL) > -1) {
            this.storage.invert = value;
            this.rebuild();
        }
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
