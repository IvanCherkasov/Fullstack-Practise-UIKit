import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitSlider_Rule extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		that.Model.Rule.element = this.element;
		var segments = that.Model.Rule.segments;

		var values = function(){
			if (segments !== 0 && segments > 0){
				var values = [];
				var crat =((Math.abs(that.Model.Slider.minimum) + Math.abs(that.Model.Slider.maximum)) / (segments - 1));
				var buf = that.Model.Slider.minimum;
				for (var i = 0; i < segments; i++) {
					values.push(Math.round(buf));
					buf += crat;
				}
				return values;
			}
			return undefined;
		}

		if (segments !== 0){
			var values = values();
			if (values){
				that.element.append($('<span>').text(values[0]).attr('value', values[0]));
				that.element.append($('<span>').text(values[values.length - 1]).attr('value', values[values.length - 1]));
				for (var i = 1; i < values.length - 1; i++){
					var span = $('<span>').text(values[i]).css('position', 'absolute').css('width', that.Model.Thumb.width).attr('value', values[i]);
					that.element.append(span);
					var position = (that.Model.Track.Calculate.position(values[i])) - that.Model.Thumb.width/2;
					var percent = (100/that.Model.Track.width) * position;
					span.css('left', percent + '%');
				}
				that.element.find('span').each(function(){
					$(this).addClass('no-select');
					$(this).on('click', function(){
						that.Model.Slider.value = Number($(this).attr('value'));
					});
				});
			}
		}
	}
}

export default UIKitSlider_Rule;