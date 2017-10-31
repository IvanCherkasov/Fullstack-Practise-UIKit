import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitRadialProgress_Caption extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;

		var print = function(value){
			that.element.text(value);
		}

		this.Mediator.subscribe('model.value', function(modelData){
			print(modelData.value);
		});


	}
}

export default UIKitRadialProgress_Caption;