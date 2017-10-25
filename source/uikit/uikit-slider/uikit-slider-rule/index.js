import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitSlider_Rule extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;
		var segments = this.element.attr('segments');

		var getValues = function(){
			if (segments > 0){
				var minimum = that.Mediator.getData('minimum');
				var maximum = that.Mediator.getData('maximum');
				var values = [];
				var crat =((Math.abs(minimum) + Math.abs(maximum)) / (segments - 1));
				var buf = minimum;
				for (var i = 0; i < segments; i++) {
					values.push(Math.round(buf));
					buf += crat;
				}
				return values;
			}
			return undefined;
		}

		this.Mediator.subscribe('slider.type', function(typesList, type){
			that.reStyle(typesList, type);
			if (segments !== 0){
				var values = getValues();
				if (values){
					if (type === 'horizontal'){
						that._build(values, true);
					} else if (type === 'vertical'){
						that._build(values, false);
					}
				}
			}
		});
	}

	_build(values, isHorizontal){
		var that = this;
		var divs = [];
		var size = (100/(values.length + 1));
		var shiftType = '';
		var minimum = that.Mediator.getData('minimum');
		var maximum = that.Mediator.getData('maximum');

		if (isHorizontal){
			shiftType = 'left';
			that.element.css('width', '100%');
		} else {
			shiftType = 'top';
			that.element.css('height', '100%');
		}

		this.element.find('div.rule-item').each(function(){
			$(this).remove();
		});

		for(var i = 0; i < values.length; i++){
			var div = $('<div>')
				.addClass('rule-item')
				.html('<div>' + values[i] + '</div>')
				.attr('value', values[i]);
			divs.push(div);
		}

		if (!isHorizontal){
			divs.reverse();
		}

		for(var i = 1; i < values.length - 1; i++){
			var percent = Math.abs(values[i] - minimum)/(maximum - minimum) * 100;
			divs[i].css(shiftType, percent + '%');
			if (isHorizontal){
				divs[i].css('transform', 'translateX(1px) translateX(-50%)');
			} else {
				divs[i].css('transform', 'translateY(-50%)');
			}
		}

		divs.forEach(function(item){
			that.element.append(item);
			item.on('click', function(){
				var value = Number($(this).attr('value'));
				that.Mediator.setData('value', value);
			});
		});
	}
}

export default UIKitSlider_Rule;