import './index.styl'
import UIKit from  '../../../uikit-core/index.ts'
import UIKitSlider_Upper from './uikit-slider-upper/index.js'

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
		var that = this;
		var Clamp = UIKit.Core.UIKitMath.Clamp;
		var isDrag = false;
		var isHover = false;

		var calculateValue = function(position){
			var percent = 0;
			var coordinateSystem = that.Mediator.getData('model.coordinateSystem');
			var minimum = that.Mediator.getData('model.minimum');
			var maximum = that.Mediator.getData('model.maximum');
			if (that.Type === 'horizontal'){
				percent	= (100/coordinateSystem.width) * position;
			} else if (that.Type === 'vertical'){
				percent	= (100/coordinateSystem.height) * position;
				percent = 100 - percent;
			}
			var value = Math.round(((percent * (maximum - minimum))/100) + minimum);
			return value;
		}

		var moveThumb = function(position){
			if (position >= 0){
				var coordinateSystem = that.Mediator.getData('model.coordinateSystem');
				if (that.Type === "horizontal"){
					var percent = (100/coordinateSystem.width) * (position);
					var maximum = (100/coordinateSystem.xMax) * (coordinateSystem.xMax - (that.element.width()/2));
					var minimum = (100/coordinateSystem.width) * that.element.width();
					that.element.css('left', Clamp(percent, -minimum, maximum) + '%');
				} else if (that.Type === 'vertical'){
					var percent = (100/coordinateSystem.height) * (position);
					var maximum = (100/coordinateSystem.yMax) * (coordinateSystem.yMax + (that.element.width()));
					var minimum = (100/coordinateSystem.height) * that.element.width()/2;
					that.element.css('top', (100 - Clamp(percent, -minimum, maximum)) + '%');
				}
			}
		}

		var startDrag = function(){
			isDrag = true;
			var coordinateSystem = that.Mediator.getData('model.coordinateSystem');
			$(document).on('mousemove.uikit.slider.thumb', function(event){
				if (that.Type === "horizontal"){
					var position = event.pageX - coordinateSystem.xMin;
					var value = calculateValue(position);
					if (value !== that.Mediator.getData('model.value')){
						that.Mediator.setData('model.value', value);
					}
				} else if (that.Type === 'vertical'){
					var position = event.pageY - coordinateSystem.yMin;
					var value = calculateValue(position);
					if (value !== that.Mediator.getData('model.value')){
						that.Mediator.setData('model.value', value);
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
			this.Mediator,
			this.Type
			);

		this.element.on('mouseenter', function(){
			isHover = true;
			that.Mediator.publish('thumb.hover', true);
		});

		this.element.on('mouseleave', function(){
			isHover = false;
			that.Mediator.publish('thumb.hover', false);
		});

		this.Mediator.subscribe('model.value', function(modelData){
			var coordinateSystem = that.Mediator.getData('model.coordinateSystem');
			var minimum = that.Mediator.getData('model.minimum');
			var maximum = that.Mediator.getData('model.maximum');
			var percent = Math.abs(modelData.value - minimum)/(maximum - minimum) * 100;
			if (that.Type === 'horizontal'){
				var position = Math.round(((percent * (coordinateSystem.width))/100));
				moveThumb(position);
			} else if (that.Type === 'vertical'){
				var position = Math.round(((percent * (coordinateSystem.height))/100));
				moveThumb(position);
			}
		});	

		this.element.on('mousedown', function(event){
			startDrag();
			event.stopPropagation();
		});

		this.stylize(this.Type);
	}
}

export default UIKitSlider_Thumb;