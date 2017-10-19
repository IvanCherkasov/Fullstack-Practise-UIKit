import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Filled extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;

		var moveFilled = function(position){
			var percent = (100/that.Model.coordinateSystem.width) * position;
			that.element.css('width', Clamp(percent, 0, 100) + '%');
		}

		this.Model.subscribeTo('value', function(value){
			var percent = Math.abs(value - that.Model.minimum)/(that.Model.maximum - that.Model.minimum);
			percent *= 100;
			var position = Math.round(((percent * (that.Model.coordinateSystem.width))/100));
			moveFilled(position);
		});
	}
}

export default UIKitSlider_Filled;