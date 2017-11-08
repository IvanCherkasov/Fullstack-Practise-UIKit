import './index.styl'
import UIKit from '../../uikit-core/index.ts'

class UIKitToggle_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
		var that = this;

		this.Mediator.subscribe('model.checked', function(modelData){
			if (modelData.checked){
				that.element.addClass('checked');
			} else {
				that.element.removeClass('checked');
			}
		});

		this.acceptType(this.Type);
	}
}

export default UIKitToggle_Thumb;