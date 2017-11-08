import './index.styl'
import UIKit from '../uikit-core/index'

class UIKitArrowButton extends UIKit.Core.UIKitElement{

    private Model: any;

    constructor(element: any){
        //@ts-ignore
        super(element);
        let that = this;
        
        this.Model = new UIKitArrowButton_Model();
        this.Mediator = new UIKit.Core.UIKitMediator(this.Model);
        
        this.Type = 'left';
		this.TypesList = ['left', 'right'];
		if (this.element.attr('type') !== undefined){
			if (this.element.attr('type') !== ''){
				if (this.TypesList.indexOf(this.element.attr('type')) > -1){
					this.Type = this.element.attr('type');
				}
			}
        }
        
        this.Mediator.subscribe('arrowbutton.type', function(value){
			that.acceptType();
		});

		that.acceptType();
    }

    public set type(value: string){
        if (typeof value === 'string'){ // horizontal / vertical
			if (this.TypesList.indexOf(value) > -1){
				this.Type = value;
				this.Mediator.publish('arrowbutton.type', value);
			}
		}
    }

    public get type(): string{
		return this.Type;
	}

}

class UIKitArrowButton_Model extends UIKit.Core.UIKitModel{
    constructor(){
        //@ts-ignore
        super();
    }
}

UIKit.Core.UIKitArrowButton = UIKitArrowButton;