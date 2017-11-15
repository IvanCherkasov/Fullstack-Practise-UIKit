/* tslint:disable */
import './index.styl'
import UIKit from '../uikit-core/index'
import UIKitToggle_Thumb from './uikit-toggle-thumb/index'

class UIKitToggle extends  UIKit.Core.UIKitElement{

    private innerObjects: any[];

    constructor(element:any){
        super(element);
        if (!this.element.hasClass('uikit-toggle')) {
            throw new ReferenceError('Элемент не является переключателем uikit');
        }

        this.init();
    }

    protected init(){

        this.type = 'horizontal';
        this.typesList = ['horizontal', 'vertical'];
        if (this.element.attr('type') !== undefined){
            if (this.element.attr('type') !== ''){
                if (this.typesList.indexOf(this.element.attr('type')) > -1){
                    this.type = this.element.attr('type');
                }
            }
        }

        const model = new UIKitToggle_Model();
        this.mediator = new UIKit.Core.UIKitMediator(model);
        var isChecked = false;
        if (this.element.attr('value') === 'true'){
          isChecked = true;
        } else {
          isChecked = false;
        }

        this.mediator.subscribe('model.checked', (modelData) => {
                this.element.attr('value', modelData.checked);
                if (this.checked){
                    this.element.addClass('checked');
                } else {
                    this.element.removeClass('checked');
                }
            });

        this.innerObjects.push(new UIKitToggle_Thumb(
                this.element.find('.uikit-toggle-thumb'),
                this.mediator,
                this.type));

        this.element.on('click', () => {
                this.checked = !this.checked;
            });

        setTimeout(function(){
            this.checked = isChecked;
        }, 0);

        super.init();
    }

    public get checked(): boolean{
          return this.mediator.getData('model.checked');
      }

      public set checked(value: boolean){
          if (typeof value === 'boolean'){
              this.mediator.setData('model.checked', value);
          }
      }
}

class UIKitToggle_Model extends UIKit.Core.UIKitModel{
    constructor(){
        super({
            ckecked: false,
        });
    }

    public getData(property:string){
        switch(property){
            case "checked":
                return this.data.checked;
            default:
                return undefined;
        }
    }

    public setData(property:string, data:any){
        switch(property){
            case "checked":
                if (typeof data === 'boolean'){
                    this.data.checked = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

export default UIKitToggle;
