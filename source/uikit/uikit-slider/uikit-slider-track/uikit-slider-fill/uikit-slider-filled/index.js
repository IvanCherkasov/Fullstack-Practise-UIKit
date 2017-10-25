import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Filled extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;
		this._type = "";

		var moveFilled = function(position){
			var percent = 0;
			var coordinateSystem = that.Mediator.getData('coordinateSystem');
			if (that._type === 'horizontal'){
				percent = (100/coordinateSystem.width) * position;
				that.element.css('width', Clamp(percent, 0, 100) + '%');
			} else if (that._type === 'vertical'){
				percent = (100/coordinateSystem.height) * position;
				that.element.css('height', (Clamp(percent, 0, 100)) + '%');
			}
		}

		this.Mediator.subscribe('value', function(value){
			var coordinateSystem = that.Mediator.getData('coordinateSystem');
			var minimum = that.Mediator.getData('minimum');
			var maximum = that.Mediator.getData('maximum');
			var percent = Math.abs(value - minimum)/(maximum - minimum);
			percent *= 100;
			var position = 0;
			if (that._type === 'horizontal'){
				position = Math.round(((percent * (coordinateSystem.width))/100));
			} else if (that._type === 'vertical'){
				position = Math.round(((percent * (coordinateSystem.height))/100));
			}
			moveFilled(position);
		});
		
		this.Mediator.subscribe('slider.type', function(typesList, type){
			that.element.css('width', '').css('height', '');
			that.reStyle(typesList, type);
			that._type = type;
		});
	}
}

export default UIKitSlider_Filled;