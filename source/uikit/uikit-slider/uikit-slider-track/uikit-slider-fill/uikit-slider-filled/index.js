import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Filled extends UIKit.Core.UIKitElement{
	constructor(dom, model, eventsList){
		super(dom, model, eventsList);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;
		this._type = "";

		var moveFilled = function(position){
			var percent = 0;
			if (that._type === 'horizontal'){
				percent = (100/that.Model.coordinateSystem.width) * position;
				that.element.css('width', Clamp(percent, 0, 100) + '%');
			} else if (that._type === 'vertical'){
				percent = (100/that.Model.coordinateSystem.height) * position;
				that.element.css('height', (Clamp(percent, 0, 100)) + '%');
			}
		}

		this.Model.subscribeTo('value', function(value){
			var percent = Math.abs(value - that.Model.minimum)/(that.Model.maximum - that.Model.minimum);
			percent *= 100;
			var position = 0;
			if (that._type === 'horizontal'){
				position = Math.round(((percent * (that.Model.coordinateSystem.width))/100));
			} else if (that._type === 'vertical'){
				position = Math.round(((percent * (that.Model.coordinateSystem.height))/100));
			}
			moveFilled(position);
		});
		
		this.EventsList.add('slider.type.change', function(typesList, type){
			that.element.css('width', '').css('height', '');
			that.reStyle(typesList, type);
			that._type = type;

		});
	}
}

export default UIKitSlider_Filled;