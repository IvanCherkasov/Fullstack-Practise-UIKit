import './index.styl'
import UIKit from '../../../uikit-core/index.js'
import UIKitSlider_Filled from './uikit-slider-filled/index.js'

class UIKitSlider_Fill extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;
		this.Filled = new UIKitSlider_Filled(
			this.element.find('.uikit-slider-filled'),
			this.Mediator
			);

			this.Mediator.subscribe('slider.type', function(typesList, type){
				that.reStyle(typesList, type);
			});
	}
}
export default UIKitSlider_Fill;