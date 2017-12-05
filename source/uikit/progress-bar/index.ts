import './themes/index';
import * as UIKit from '../uikit-core/index';
import ProgressBar_Track from './progress-bar-track/index';

interface IElements {
    track: ProgressBar_Track;
}

class ProgressBar extends UIKit.Core.Component {

    public static readonly TYPES = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    private storageValue: number = 0;
    private components: IElements;

    constructor(dom: JQuery) {
        super(dom);
        this.initialize();
    }

    protected initialize() {
        this.types = new UIKit.Core.Types(ProgressBar.TYPES);
        const type = this.dom.attr('data-type');
        if (this.types.contains(type)) {
            this.type = type;
        } else {
            this.type = ProgressBar.TYPES.HORIZONTAL;
        }

        const model = new ProgressBar_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.noRebuild = false;

        this.components = {
            track: new ProgressBar_Track(
                this.dom.find('.uikit-progress-bar-track'),
                this.mediator,
                this.type),
        };

        const attrValue: number = Number(this.dom.attr('data-value'));
        this.value = attrValue;

        const mediatorModelValue = (modelData) => {
            this.dom.attr('data-value', modelData.value);
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
