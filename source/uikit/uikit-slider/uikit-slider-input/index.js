import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitSlider_Input extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
		var that = this;

		this.Mediator.subscribe('model.value', function(modelData){
			var val = parseInt(that.element.val());
			if (val !== NaN){
				that.element.val(modelData.value);
			}
			else {
				if (modelData.value !== val){
					that.element.val(modelData.value);
				}
			}
		});

		this.element.on('change.uikit.slider.input', function(){
			if (that.element.val()){
				var val = parseInt(that.element.val());
				if (val !== NaN){
					if (val !== that.Mediator.getData('model.value')){
						that.Mediator.setData('model.value', val);
					}
				}
			}
		});

		this.stylize(this.Type);
	}
}

export default UIKitSlider_Input;