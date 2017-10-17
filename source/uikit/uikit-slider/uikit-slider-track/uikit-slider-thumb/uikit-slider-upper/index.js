import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Upper extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;

		var print = function(value){
			that.element.find('div').text(value);
		}

		this.Model.subscribeTo('slider.value', function(value){
			that.Model.ThumbUpper.text = value;
			print(value);
		});
	}
}

export default UIKitSlider_Upper;