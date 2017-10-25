import './index.styl'
import UIKit from '../../uikit-core/index.js'
import UIKitSlider_Thumb from './uikit-slider-thumb/index.js'
import UIKitSlider_Fill from './uikit-slider-fill/index.js'

class UIKitSlider_Track extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;
		var isDrag = false;
		this._type = "";
		that.Mediator.setData('coordinateSystem', this.element);

		this.Thumb = new UIKitSlider_Thumb(
			this.element.find('.uikit-slider-thumb'),
			this.Mediator
			);

		this.Fill = new UIKitSlider_Fill(
			this.element.find('.uikit-slider-fill'),
			this.Mediator
			);

		var startDrag = function(){
			isDrag = true;
			$(document).on('mousemove.uikit.slider.track', function(event){
				var position = 0;
				var percent = 0;
				var coordinateSystem = that.Mediator.getData('coordinateSystem');
				var minimum = that.Mediator.getData('minimum');
				var maximum = that.Mediator.getData('maximum');
				if (that._type === 'horizontal'){
					position = event.pageX - coordinateSystem.xMin;
					percent = (100/(coordinateSystem.width)) * position;
				} else if (that._type === 'vertical'){
					position = event.pageY - coordinateSystem.yMin;
					percent = (100/(coordinateSystem.height)) * position;
					percent = 100 - percent;
				}
				var value = Math.round(((percent * (maximum - minimum))/100) + minimum);
				if (value !== that.Mediator.getData('value')){
					that.Mediator.setData('value', value);
				}
			});
			$(document).on('mouseup.uikit.slider.track', function(){
				$(document).off('mousemove.uikit.slider.track');
				$(document).off('mouseup.uikit.slider.track');
				isDrag = false;
			});
		}

		this.element.on('mousedown', function(event){
			var position = 0;
			var percent = 0 ;
			var coordinateSystem = that.Mediator.getData('coordinateSystem');
			var minimum = that.Mediator.getData('minimum');
			var maximum = that.Mediator.getData('maximum');
			if (that._type === 'horizontal'){
				position = event.pageX - coordinateSystem.xMin;
				percent = (100/(coordinateSystem.width)) * position;
			} else if (that._type === 'vertical'){
				position = event.pageY - coordinateSystem.yMin;
				percent = (100/(coordinateSystem.height)) * position;
				percent = 100 - percent;
			}
			var value = Math.round(((percent * (maximum - minimum))/100) + minimum);
			that.Mediator.setData('value', value);
			startDrag();
		});

		this.element.on('mouseenter', function(){
			that.Mediator.publish('track.hover', true);
		});

		this.Mediator.subscribe('slider.type', function(typesList, type){
			that.reStyle(typesList, type);
			that._type = type;
		});
	}
}

export default UIKitSlider_Track;