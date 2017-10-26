import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Filled extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;

		var moveFilled = function(position){
			var percent = 0;
			var coordinateSystem = that.Mediator.getData('model.coordinateSystem');
			if (that.Type === 'horizontal'){
				percent = (100/coordinateSystem.width) * position;
				that.element.css('width', Clamp(percent, 0, 100) + '%');
			} else if (that.Type === 'vertical'){
				percent = (100/coordinateSystem.height) * position;
				that.element.css('height', (Clamp(percent, 0, 100)) + '%');
			}
		}

		this.Mediator.subscribe('model.value', function(modelData){
			var coordinateSystem = that.Mediator.getData('model.coordinateSystem');
			var minimum = that.Mediator.getData('model.minimum');
			var maximum = that.Mediator.getData('model.maximum');
			var percent = Math.abs(modelData.value - minimum)/(maximum - minimum);
			percent *= 100;
			var position = 0;
			if (that.Type === 'horizontal'){
				position = Math.round(((percent * (coordinateSystem.width))/100));
			} else if (that.Type === 'vertical'){
				position = Math.round(((percent * (coordinateSystem.height))/100));
			}
			moveFilled(position);
		});
		
		this.stylize(this.Type);
	}
}

export default UIKitSlider_Filled;