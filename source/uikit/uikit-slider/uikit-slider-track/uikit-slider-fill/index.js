import './index.styl'
import UIKit from '../../../uikit-core/index.js'
import UIKitSlider_Filled from './uikit-slider-filled/index.js'

class UIKitSlider_Fill extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		this.Filled = new UIKitSlider_Filled(
			this.element.find('.uikit-slider-filled'),
			this.Model
			);
	}
}
export default UIKitSlider_Fill;