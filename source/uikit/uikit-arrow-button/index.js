import './index.styl'
import UIKit from '../uikit-core/index.ts'

class UIKitArrowButton extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		var that = this;

		this.Model = new UIKitArrowButton_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);

		this.Type = 'left';
		this.TypesList = ['left', 'right'];
		var that = this;
		if (this.element.attr('type') !== undefined){
			if (this.element.attr('type') !== ''){
				if (this.TypesList.includes(this.element.attr('type'))){
					this.Type = this.element.attr('type');
				}
			}
		}

		this.Mediator.subscribe('arrowbutton.type', function(value){
			that.acceptType(value);
		});

		that.acceptType(this.Type);
	}

	set type(value){
		if (typeof value === 'string'){ // horizontal / vertical
			if (this.TypesList.includes(value)){
				this.Type = value;
				this.Mediator.publish('arrowbutton.type', value);
			}
		}
	}

	get type(){
		return this.Type;
	}
}

//пустая модель
class UIKitArrowButton_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super();
	}
}

UIKit.Core.UIKitArrowButton = UIKitArrowButton;