import './index.styl'
import UIKit from '../../uikit-core/index.js'
import UIKitSlider_Thumb from './uikit-slider-thumb/index.js'
import UIKitSlider_Fill from './uikit-slider-fill/index.js'

class UIKitSlider_Track extends UIKit.Core.UIKitElement{
	constructor(dom, model, eventsList){
		super(dom, model, eventsList);
		var that = this;
		var isDrag = false;
		this.Model.coordinateSystem = this.element;

		this.Thumb = new UIKitSlider_Thumb(
			this.element.find('.uikit-slider-thumb'),
			this.Model,
			this.EventsList
			);

		this.Fill = new UIKitSlider_Fill(
			this.element.find('.uikit-slider-fill'),
			this.Model
			);

		var startDrag = function(){
			isDrag = true;
			$(document).on('mousemove.uikit.slider.track', function(event){
				var position = event.pageX - that.Model.coordinateSystem.xMin;
				var percent = (100/(that.Model.coordinateSystem.width)) * position;
				var value = Math.round(((percent * (that.Model.maximum - that.Model.minimum))/100) + that.Model.minimum);
				if (value !== that.Model.value){
					that.Model.value = value;
				}
			});
			$(document).on('mouseup.uikit.slider.track', function(){
				$(document).off('mousemove.uikit.slider.track');
				$(document).off('mouseup.uikit.slider.track');
				isDrag = false;
			});
		}

		this.element.on('mousedown', function(event){
			var position = event.pageX - that.Model.coordinateSystem.xMin;
			var percent = (100/(that.Model.coordinateSystem.width)) * position;
			var value = Math.round(((percent * (that.Model.maximum - that.Model.minimum))/100) + that.Model.minimum);
			that.Model.value = value;
			startDrag();
		});

		this.element.on('mouseenter', function(){
			that.EventsList.dispatch('track.hover', true);
		});
	}
}

export default UIKitSlider_Track;