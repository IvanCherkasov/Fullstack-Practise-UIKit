import './index.styl'
import UIKit from '../../../uikit-core/index.js'
import UIKitSlider_Filled from './uikit-slider-filled/index.js'

class UIKitSlider_Fill extends UIKit.Core.UIKitElement{
	constructor(dom, model, eventsList){
		super(dom, model, eventsList);
		var that = this;
		this.Filled = new UIKitSlider_Filled(
			this.element.find('.uikit-slider-filled'),
			this.Model,
			this.EventsList
			);

			this.EventsList.add('slider.type.change', function(typesList, type){
				that.reStyle(typesList, type);
			});
	}
}
export default UIKitSlider_Fill;