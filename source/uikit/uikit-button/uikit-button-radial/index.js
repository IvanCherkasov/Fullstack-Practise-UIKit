import './index.styl'
import import UIKit from '../../uikit-core/index.js'

class UIKitButton_Radial extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
		var that = this;

		this.Mediator.subscribe('button.click', function(event){
			//включение анимации
		});

		this.stylize(this.Type);
	}
}