import './index.styl';
import UIKitStages_Track from './uikit-stages-track/index';
import UIKit from '../uikit-core/index';

class UIKitStages extends UIKit.Core.UIKitElement {

    private innerObjects: any[];

    constructor(element) {
        super(element);
        if (!this.element.hasClass('uikit-stages')) {
            throw new ReferenceError('Элемент не является stages');
        }

        this.storage = {
            invert: false,
        };
        
        this.init();
    }

    protected init(): void {
        if (this.element.attr('invert') !== undefined) {
            if (this.element.attr('invert') !== '') {
                const isTrueSet = (this.element.attr('invert') === 'true');
                if (isTrueSet) {
                    this.storage.invert = true;
                }
            }
        }

        this.type = 'horizontal';
        this.types = ['horizontal', 'vertical'];
        if (this.element.attr('type') !== undefined) {
            if (this.element.attr('type') !== '') {
                if (this.types[this.element.attr('type')]) {
                    this.type = this.element.attr('type');
                }
            }
        }

        const model = new UIKitStages_Model();
        this.mediator = new UIKit.Core.UIKitMediator(model);
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

        this.innerObjects.push(
            new UIKitStages_Track(
            this.element.find('.uikit-stages-track'),
            this.mediator,
            this.type,
            this.storage.invert));

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

        super.init();
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
        if (this.type === 'vertical') {
            if (typeof value === 'boolean') {
                this.storage.invert = value;
                this.rebuild();
            }
        }
    }
}

class UIKitStages_Model extends UIKit.Core.UIKitModel {
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
                localData = UIKit.Core.UIKitMath.clamp(localData, 0, this.data.stages);
                this.data.stage = localData;
                return true;
            default:
                return false;
        }
    }
}

export default UIKitStages;
