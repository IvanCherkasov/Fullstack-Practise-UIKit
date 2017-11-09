import './index.styl';
import UIKitStages_Track from './uikit-stages-track/index';
import UIKit from '../uikit-core/index';

class UIKitStages extends UIKit.Core.UIKitElement {

    private INVERT: boolean;
    private model;
    private mediator;
    private track: UIKitStages_Track;

    constructor(element) {
        // @ts-ignore
        super(element);
        if (!this.element.hasClass('uikit-stages')) {
            throw new ReferenceError('Элемент не является stages');
        }

        if (this.element.attr('invert') !== undefined) {
            if (this.element.attr('invert') !== '') {
                const isTrueSet = (this.element.attr('invert') === 'true');
                if (isTrueSet) {
                    this.INVERT = true;
                }
            }
        }

        this.Type = 'horizontal';
        this.TypesList = ['horizontal', 'vertical'];
        if (this.element.attr('type') !== undefined) {
            if (this.element.attr('type') !== '') {
                if (this.TypesList.indexOf(this.element.attr('type')) > -1) {
                    this.Type = this.element.attr('type');
                }
            }
        }

        this._init();
    }

    protected _init(): void {
        this.model = new UIKitStages_Model();
        this.mediator = new UIKit.Core.UIKitMediator(this.model);
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

        this.track = new UIKitStages_Track(
            this.element.find('.uikit-stages-track'),
            this.mediator,
            this.Type,
            this.INVERT);

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

        this.acceptType();
    }

    public get stage(): number {
        return this.mediator.getData('model.stage');
    }

    public set stage(value: number) {
        this.mediator.setData('model.stage', value);
    }

    public get invert(): boolean {
        return this.INVERT;
    }

    public set invert(value: boolean) {
        if (this.Type === 'vertical') {
            if (typeof value === 'boolean') {
                this.INVERT = value;
                this.rebuild();
            }
        }
    }
}

class UIKitStages_Model extends UIKit.Core.UIKitModel {
    constructor() {
        // @ts-ignore
        super({
            _stages: 0,
            _stage: 0,
            get stages() {
                return this._stages;
            },
            get stage() {
                return this._stage;
            },
        });
    }

    public getData(property: string) {
        switch (property){
            case 'stages':
                return this.Data.stages;
            case 'stage':
                return this.Data.stage;
            default:
                return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        let localData = data;
        switch (property){
            case 'stages':
                if (localData < 1) localData = 1;
                this.Data._stages = localData;
                return true;
            case 'stage':
                localData = UIKit.Core.UIKitMath.Clamp(localData, 0, this.Data.stages);
                this.Data._stage = localData;
                return true;
            default:
                return false;
        }
    }
}

UIKit.Core.UIKitStages = UIKitStages;
