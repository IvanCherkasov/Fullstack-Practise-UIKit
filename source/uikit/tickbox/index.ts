import './index.styl';
import * as UIKit from '../uikit-core/index';
import Tickbox_Inner from './tickbox-inner/index';

interface IElements {
    inner: Tickbox_Inner;
}

class Tickbox extends UIKit.Core.Component {
    private components: IElements;

    constructor(dom: JQuery) {
        super(dom);
        this.initialize();
    }

    protected initialize() {
        const model = new Tickbox_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.components = {
            inner: new Tickbox_Inner(
                this.dom.find('.uikit-tickbox-inner'),
                this.mediator,
                this.type),
        };

        const mediatorModelChecked = (modelData) => {
            this.dom.attr('data-checked', `${modelData.checked}`);
        };
        this.mediator.subscribe('model.checked', mediatorModelChecked);

        this.checked = (this.dom.attr('data-checked') === 'true');
        super.initialize();
    }

    public get checked(): boolean {
        return this.mediator.getData('model.checked');
    }

    public set checked(value: boolean) {
        this.mediator.setData('model.checked', value);
    }
}

class Tickbox_Model extends UIKit.Core.Model {
    constructor() {
        super({
            checked: false,
        });
    }

    public getData(property:string) {
        switch (property) {
            case 'checked':
                return this.data.checked;
            default:
                return undefined;
        }
    }

    public setData(property:string, data:any) {
        switch (property) {
            case 'checked':
                if (typeof data === 'boolean') {
                    this.data.checked = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

export default Tickbox;
