import './index.styl'
import UIKit from '../../../uikit-core/index.js'
import UIKitSlider_Filled from './uikit-slider-filled/index.js'

class UIKitSlider_Fill extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
		var that = this;
		this.Filled = new UIKitSlider_Filled(
			this.element.find('.uikit-slider-filled'),
			this.Mediator,
			this.Type
			);

			this.stylize(this.Type);
	}
}
export default UIKitSlider_Fill;