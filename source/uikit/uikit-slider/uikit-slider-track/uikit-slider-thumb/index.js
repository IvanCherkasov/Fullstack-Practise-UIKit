import './index.styl'
import UIKit from  '../../../uikit-core/index.js'
import UIKitSlider_Upper from './uikit-slider-upper/index.js'

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;
		var isDrag = false;
		var isHover = false;
		this._type = "";

		var calculateValue = function(position){
			var percent = 0;
			var coordinateSystem = that.Mediator.getData('coordinateSystem');
			var minimum = that.Mediator.getData('minimum');
			var maximum = that.Mediator.getData('maximum');
			if (that._type === 'horizontal'){
				percent	= (100/coordinateSystem.width) * position;
			} else if (that._type === 'vertical'){
				percent	= (100/coordinateSystem.height) * position;
				percent = 100 - percent;
			}
			var value = Math.round(((percent * (maximum - minimum))/100) + minimum);
			return value;
		}

		var moveThumb = function(position){
			if (position >= 0){
				var coordinateSystem = that.Mediator.getData('coordinateSystem');
				if (that._type === "horizontal"){
					var percent = (100/coordinateSystem.width) * (position);
					var maximum = (100/coordinateSystem.xMax) * (coordinateSystem.xMax - (that.element.width()/2));
					var minimum = (100/coordinateSystem.width) * that.element.width();
					that.element.css('left', Clamp(percent, -minimum, maximum) + '%');
				} else if (that._type === 'vertical'){
					var percent = (100/coordinateSystem.height) * (position);
					var maximum = (100/coordinateSystem.yMax) * (coordinateSystem.yMax + (that.element.width()));
					var minimum = (100/coordinateSystem.height) * that.element.width()/2;
					that.element.css('top', (100 - Clamp(percent, -minimum, maximum)) + '%');
				}
			}
		}

		var startDrag = function(){
			isDrag = true;
			var coordinateSystem = that.Mediator.getData('coordinateSystem');
			$(document).on('mousemove.uikit.slider.thumb', function(event){
				if (that._type === "horizontal"){
					var position = event.pageX - coordinateSystem.xMin;
					var value = calculateValue(position);
					if (value !== that.Mediator.getData('value')){
						that.Mediator.setData('value', value);
					}
				} else if (that._type === 'vertical'){
					var position = event.pageY - coordinateSystem.yMin;
					var value = calculateValue(position);
					if (value !== that.Mediator.getData('value')){
						that.Mediator.setData('value', value);
					}
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
			this.Mediator
			);

		this.element.on('mouseenter', function(){
			isHover = true;
			that.Mediator.publish('thumb.hover', true);
		});

		this.element.on('mouseleave', function(){
			isHover = false;
			that.Mediator.publish('thumb.hover', false);
		});

		this.Mediator.subscribe('value', function(value){
			var coordinateSystem = that.Mediator.getData('coordinateSystem');
			var minimum = that.Mediator.getData('minimum');
			var maximum = that.Mediator.getData('maximum');
			var percent = Math.abs(value - minimum)/(maximum - minimum) * 100;
			if (that._type === 'horizontal'){
				var position = Math.round(((percent * (coordinateSystem.width))/100));
				moveThumb(position);
			} else if (that._type === 'vertical'){
				var position = Math.round(((percent * (coordinateSystem.height))/100));
				moveThumb(position);
			}
		});	

		this.element.on('mousedown', function(event){
			startDrag();
			event.stopPropagation();
		});

		this.Mediator.subscribe('slider.type', function(typesList, type){
			that.reStyle(typesList, type);
			that._type = type;
		});
	}
}

export default UIKitSlider_Thumb;