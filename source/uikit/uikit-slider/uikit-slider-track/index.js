import './index.styl'
import UIKit from '../../uikit-core/index.js'
import UIKitSlider_Thumb from './uikit-slider-thumb/index.js'
import UIKitSlider_Fill from './uikit-slider-fill/index.js'

class UIKitSlider_Track extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		this.Model.Track.element = this.element;

		this.Thumb = new UIKitSlider_Thumb(
			this.element.find('.uikit-slider-thumb'),
			this.Model
			);

		this.Fill = new UIKitSlider_Fill(
			this.element.find('.uikit-slider-fill'),
			this.Model
			);

		var Clamp = UIKit.Core.UIKitMath.Clamp;

		var startDrag = function(){
			$(document).on('mousemove.uikit.slider', function(event){
				that.Model.Track.position = event.pageX - that.Model.Track.offset.left;
				var value = that.Model.Track.Calculate.value(that.Model.Track.position);
				that.Model.Slider.value = value;
			});
			$(document).on('mouseup.uikit.slider', function(){
				$(document).off('mousemove.uikit.slider');
				$(document).off('mouseup.uikit.slider');
				that.Model.Track.isDrag = false;
			});
		}
		
		this.Model.subscribeTo('slider.value', function(value){
			if (!that.Model.Track.isDrag){
				that.Model.Track.position = that.Model.Track.Calculate.position(value);
			}
		});

		this.element.on('mousedown', function(event){
			that.Model.Track.isDrag = true;
			that.Model.Track.position = event.pageX - that.Model.Track.offset.left;
			var value = that.Model.Track.Calculate.value(that.Model.Track.position);
			that.Model.Slider.value = value;
			startDrag();
		});
	}
}

export default UIKitSlider_Track;