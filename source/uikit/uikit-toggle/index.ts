import './index.styl'
import UIKit from '../uikit-core/index'
import UIKitToggle_Thumb from './thumb/index'



class UIKitToggle extends  UIKit.Core.UIKitElement{

    public Thumb: UIKitToggle_Thumb;
    private Model: UIKitToggle_Model;
    public Mediator;

    constructor(element:any){
        //@ts-ignore
        super(element);
        if (!this.element.hasClass('uikit-toggle')){
            throw new ReferenceError('Элемент не является переключателем uikit');
        }
        let that = this;

        this.Type = 'horizontal';
        this.TypesList = ['horizontal', 'vertical'];
        if (this.element.attr('type') !== undefined){
            if (this.element.attr('type') !== ''){
                if (this.TypesList.indexOf(this.element.attr('type')) > -1){
                    this.Type = this.element.attr('type');
                }
            }
        }

        this._init();
    }

    protected _init(){
        let that = this;
        this.Model = new UIKitToggle_Model();
        this.Mediator = new UIKit.Core.UIKitMediator(this.Model);
        var isChecked = false;
        if (this.element.attr('value') === 'true'){
          isChecked = true;
        } else {
          isChecked = false;
        }

        this.Mediator.subscribe('model.checked', function(modelData){
    			that.element.attr('value', modelData.checked);
    			if (that.checked){
    				that.element.addClass('checked');
    			} else {
    				that.element.removeClass('checked');
    			}
    		});

        this.Thumb = new UIKitToggle_Thumb(
    			this.element.find('.uikit-toggle-thumb'),
    			this.Mediator,
    			this.Type
    			);

        this.element.on('click', function(){
    			that.checked = !that.checked;
    		});

    		setTimeout(function(){
    			that.checked = isChecked;
    		}, 0);

    		that.acceptType();
    }

    public get checked(): boolean{
  		return this.Mediator.getData('model.checked');
  	}

  	public set checked(value: boolean){
  		if (typeof value === 'boolean'){
  			this.Mediator.setData('model.checked', value);
  		}
  	}
}

class UIKitToggle_Model extends UIKit.Core.UIKitModel{
    constructor(){
        //@ts-ignore
        super({
            _ckecked: false,
            get checked(){
                return this._checked;
            }
        });
    }

    public getData(property:string){
        switch(property){
            case "checked":
                //@ts-ignore
                return this.Data.checked;
            default:
                return undefined;
        }
    }

    public setData(property:string, data:any){
        switch(property){
            case "checked":
                if (typeof data === 'boolean'){
                    //@ts-ignore
                    this.Data._checked = data;
                    return true;
                }
                return false;
            default:
                return false;
        }
    }
}

UIKit.Core.UIKitToggle = UIKitToggle;
