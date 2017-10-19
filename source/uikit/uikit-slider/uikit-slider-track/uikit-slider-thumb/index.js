import './index.styl'
import UIKit from  '../../../uikit-core/index.js'
import UIKitSlider_Upper from './uikit-slider-upper/index.js'

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, model, eventsList){
		super(dom, model, eventsList);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;
		var isDrag = false;
		var isHover = false;

		var calculateValue = function(position){
			var percent = (100/that.Model.coordinateSystem.width) * position;
			var value = Math.round(((percent * (that.Model.maximum - that.Model.minimum))/100) + that.Model.minimum);
			return value;
		}

		var moveThumb = function(position){
			if (position >= 0){
				var percent = (100/that.Model.coordinateSystem.width) * (position);
				var maximum = (100/that.Model.coordinateSystem.xMax) * (that.Model.coordinateSystem.xMax - (that.element.width()/2));
				var minimum = (100/that.Model.coordinateSystem.width) * that.element.width();
				that.element.css('left', Clamp(percent, -minimum, maximum) + '%');
			}
		}

		var startDrag = function(){
			isDrag = true;
			$(document).on('mousemove.uikit.slider.thumb', function(event){
				var position = event.pageX - that.Model.coordinateSystem.xMin;
				var value = calculateValue(position);
				if (value !== that.Model.value){
					that.Model.value = value;
				}
			});
			$(document).on('mouseup.uikit.slider.thumb', function(){
				$(document).off('mousemove.uikit.slider.thumb');
				$(document).off('mouseup.uikit.slider.thumb');
				isDrag = false;
			});
		}

		this.Upper = new UIKitSlider_Upper(
			this.element.find('.uikit-slider-thumb-upper'),
			this.Model,
			this.EventsList
			);

		this.element.on('mouseenter', function(){
			isHover = true;
			that.EventsList.dispatch('thumb.hover', true);
		});

		this.element.on('mouseleave', function(){
			isHover = false;
			that.EventsList.dispatch('thumb.hover', false);
		});

		this.Model.subscribeTo('value', function(value){
			var percent = Math.abs(value - that.Model.minimum)/(that.Model.maximum - that.Model.minimum) * 100;
			var position = Math.round(((percent * (that.Model.coordinateSystem.width))/100));
			moveThumb(position);
		});	

		this.element.on('mousedown', function(event){
			startDrag();
			event.stopPropagation();
		});
	}
}

export default UIKitSlider_Thumb;