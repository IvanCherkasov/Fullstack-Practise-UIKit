import './index.styl'
import UIKit from  '../../../uikit-core/index.js'
import UIKitSlider_Upper from './uikit-slider-upper/index.js'

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		this.Model.Thumb.element = this.element;

		var Clamp = UIKit.Core.UIKitMath.Clamp;

		var moveThumb = function(position){
			position = position - (that.Model.Thumb.width/2);
			var percent = (100/that.Model.Track.width) * position;
			that.Model.Thumb.element.css('left', Clamp(percent, 0, that.Model.Track.maximum) + '%');
		}

		this.Upper = new UIKitSlider_Upper(
			this.element.find('.uikit-slider-thumb-upper'),
			this.Model
			);

		this.element.on('mouseenter', function(){
			that.Model.Thumb.isHover = true;
		});

		this.element.on('mouseleave', function(){
			that.Model.Thumb.isHover = false;
		});

		this.Model.subscribeTo('slider.track.isDrag', function(value){
			if (!value){
				if (!that.Model.Thumb.isHover){
					that.element.removeClass('hover');
				}
			}
		});

		this.Model.subscribeTo('slider.track.thumb.isHover', function(value){
			if (value){
				that.element.addClass('hover');
			} else {
				if (!that.Model.Track.isDrag){
					that.element.removeClass('hover');
				}
			}
		});

		this.Model.subscribeTo('slider.track.position', function(position){
			moveThumb(position);
		});
	}
}

export default UIKitSlider_Thumb;