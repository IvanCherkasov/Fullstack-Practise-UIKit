import './index.styl';
import * as UIKit from '../uikit-core/index';
import ProgressBar_Track from './progress-bar-track/index';

interface IComponent {
    track: ProgressBar_Track;
}

class ProgressBar extends UIKit.Core.Element {

    private storageValue: number = 0;
    private components: IComponent;

    constructor(element: JQuery) {
        super(element);
        this.initialize();
    }

    protected initialize() {

        const availableTypes = [UIKit.Core.Types.HORIZONTAL, UIKit.Core.Types.VERTICAL];
        const type = this.element.attr('data-type');
        this.type = UIKit.Core.Types.HORIZONTAL;
        if (availableTypes.indexOf(type) > -1) {
            this.type = type;
        }

        const model = new ProgressBar_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.noRebuild = false;

        this.components = {
            track: new ProgressBar_Track(
                this.element.find('.uikit-progress-bar-track'),
                this.mediator,
                this.type,
            ),
        };

        const attrValue: number = Number(this.element.attr('data-value'));
        this.value = attrValue;

        const mediatorModelValue = (modelData) => {
            this.element.attr('data-value', modelData.value);
        };
        this.mediator.subscribe('model.value', mediatorModelValue);

        super.initialize();
    }

    public get value(): number {
        return this.storageValue;
    }

    public set value(value: number) {
        this.mediator.setData('model.value', value);
    }
}

class ProgressBar_Model extends UIKit.Core.Model {
    constructor() {
        super({
            value: 0,
        });
    }

    public getData(property: string): {[key: string]: string} {
        switch (property){
            case 'value':
                return this.data.value;
            default:
                return undefined;
        }
    }

    public setData(property: string, data): boolean {
        switch (property){
            case 'value':
                const value = UIKit.Core.Math.clamp(
                    data,
                    0,
                    100);
                this.data.value = value;
                return true;
            default:
                return false;
        }
    }
}

export default ProgressBar;
