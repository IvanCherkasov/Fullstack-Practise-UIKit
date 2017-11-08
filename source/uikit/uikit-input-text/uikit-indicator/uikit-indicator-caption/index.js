import './index.styl'
import UIKit from '../../../uikit-core/index.ts'

class UIKitInputText_Caption extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;

		this.Mediator.subscribe('indicator.status', function(value){
			if (value){
				that.element.text(that.element.attr('ok'));
			} else {
				that.element.text(that.element.attr('error'));
			}
		});
	}
}

export default UIKitInputText_Caption;