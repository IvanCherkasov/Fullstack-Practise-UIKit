import './index.styl'
import UIKit from '../../uikit-core/index.js'
import UIKitSlider_Thumb from './uikit-slider-thumb/index.js'
import UIKitSlider_Fill from './uikit-slider-fill/index.js'

class UIKitSlider_Track extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		this.Model.coordinateSystem = this.element;

		this.Thumb = new UIKitSlider_Thumb(
			this.element.find('.uikit-slider-thumb'),
			this.Model
			);

		this.Fill = new UIKitSlider_Fill(
			this.element.find('.uikit-slider-fill'),
			this.Model
			);

		this.element.on('mousedown', function(event){
			//TODO: вычислить value на точке. выставить value
			var position = event.pageX - that.Model.coordinateSystem.xMin;
			var percent = 
		});
	}
}

export default UIKitSlider_Track;