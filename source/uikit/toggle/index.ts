import './themes/index';
import * as UIKit from '../uikit-core/index';
import Toggle_Thumb from './toggle-thumb/index';

class Types extends UIKit.Core.Types {
    public static readonly HORIZONTAL: string = 'horizontal';
    public static readonly VERTICAL: string = 'vertical';
}

interface IElements {
    thumb: Toggle_Thumb;
}

class Toggle extends  UIKit.Core.Component{

    public static readonly TYPES = {
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
    };

    private components: IElements;

    constructor(dom: JQuery) {
        super(dom);
        if (!this.dom.hasClass('uikit-toggle')) {
            throw new ReferenceError('Элемент не является переключателем uikit');
        }
        this.initialize();
    }

    protected initialize() {

        this.types = new UIKit.Core.Types(Toggle.TYPES);
        const type = this.dom.attr('data-type');
        if (this.types.contains(type)) {
            this.type = type;
        } else {
            this.type = Toggle.TYPES.HORIZONTAL;
        }

        const model = new Toggle_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        let isChecked = false;
        if (this.dom.attr('value') === 'true') {
          isChecked = true;
        } else {
          isChecked = false;
        }

        this.mediator.subscribe('model.checked', (modelData) => {
                this.dom.attr('value', modelData.checked);
                if (this.checked) {
                    this.dom.addClass('checked');
                } else {
                    this.dom.removeClass('checked');
                }
                this.mediator.publish('checked', this, undefined, modelData.checked);
            });

        this.components = {
            thumb: new Toggle_Thumb(
                    this.dom.find('.uikit-toggle-thumb'),
                    this.mediator,
                    this.type),
        };

        this.dom.on('click', () => {
                this.checked = !this.checked;
            });

        const mediatorElementType = () => {
            if (this.type === Types.HORIZONTAL) {
                this.dom.removeClass('vertical');
                this.dom.addClass('horizontal');
            } else if (this.type === Types.VERTICAL) {
                this.dom.removeClass('horizontal');
                this.dom.addClass('vertical');
            }
        };
        this.mediator.subscribe('element.type', mediatorElementType);

        setTimeout(() => {
                this.checked = isChecked;
            },     0);

        super.initialize();
    }

    public get checked(): boolean {
        return this.mediator.getData('model.checked');
    }

    public set checked(value: boolean) {
      if (typeof value === 'boolean') {
          this.mediator.setData('model.checked', value);
      }
    }
}

class Toggle_Model extends UIKit.Core.Model{
    constructor() {
        super({
            ckecked: false,
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

export default Toggle;
