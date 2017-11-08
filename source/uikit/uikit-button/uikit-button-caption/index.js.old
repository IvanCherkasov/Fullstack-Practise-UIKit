import './index.styl'
import UIKit from '../../uikit-core/index.ts'

class UIKitButton_Caption extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;

		this.Mediator.subscribe('button.caption', function(caption){
			that.element.text(caption);
		});
	}
}

export default UIKitButton_Caption;