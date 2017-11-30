import './index.styl';
import * as UIKit from '../uikit-core/index';
import Toggle_Thumb from './toggle-thumb/index';

interface IComponent {
    thumb: Toggle_Thumb;
}

class Toggle extends  UIKit.Core.Element{

    private components: IComponent;

    constructor(element: JQuery) {
        super(element);
        if (!this.element.hasClass('uikit-toggle')) {
            throw new ReferenceError('Элемент не является переключателем uikit');
        }
        this.initialize();
    }

    protected initialize() {

        this.type = UIKit.Core.Types.HORIZONTAL;
        const type = this.element.attr('data-type');
        if (type) {
            this.type = type;
        }

        const model = new Toggle_Model();
        this.mediator = new UIKit.Core.Mediator(model);
        let isChecked = false;
        if (this.element.attr('value') === 'true') {
          isChecked = true;
        } else {
          isChecked = false;
        }

        this.mediator.subscribe('model.checked', (modelData) => {
                this.element.attr('value', modelData.checked);
                if (this.checked) {
                    this.element.addClass('checked');
                } else {
                    this.element.removeClass('checked');
                }
            });

        this.components = {
            thumb: new Toggle_Thumb(
                    this.element.find('.uikit-toggle-thumb'),
                    this.mediator,
                    this.type),
        };

        this.element.on('click', () => {
                this.checked = !this.checked;
            });

        const mediatorElementType = () => {
            if (this.type === UIKit.Core.Types.HORIZONTAL) {
                this.element.removeClass('vertical');
                this.element.addClass('horizontal');
            } else if (this.type === UIKit.Core.Types.VERTICAL) {
                this.element.removeClass('horizontal');
                this.element.addClass('vertical');
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
