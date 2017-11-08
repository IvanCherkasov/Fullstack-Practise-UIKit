import './index.styl'
import UIKit from '../../uikit-core/index.ts'

class UIKitInputText_Input extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;

		this.Caption = this.element.attr('caption');

		this.element.focusin(function(){
			var value = that.element.val();
			if (typeof value === 'string'){
				if (value === that.Caption){
					that.element.val('');
				}
			}
		});

		this.element.focusout(function(){
			var value = that.element.val();
			if (typeof value === 'string'){
				value = value.trim();
				if (value === ''){
					that.element.val(that.Caption);
				}
			}
		});

		this.Mediator.subscribe('model.text', function(modelData){
			if (modelData.text !== that.element.val()){
				that.element.val(modelData.text);
			}
		});
	}
}

export default UIKitInputText_Input;