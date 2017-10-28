import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitButton_Caption extends UIKit.Core.UIKitElement{
	constructor(dom, model, type){
		super(dom, model, type);
		var that = this;

		this.Mediator.subscribe('button.caption', function(caption){
			that.element.text(caption);
		});

		this.Mediator.subscribe('element.safeRebuild', function(type){
			this.safeRebuild(type);
		});

		this.stylize(type);
	}
}