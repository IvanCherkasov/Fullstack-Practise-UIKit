import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitSlider_Rule extends UIKit.Core.UIKitElement{
	constructor(dom, model, eventsList){
		super(dom, model, eventsList);
		var that = this;
		var segments = this.element.attr('segments');

		var getValues = function(){
			if (segments > 0){
				var values = [];
				var crat =((Math.abs(that.Model.minimum) + Math.abs(that.Model.maximum)) / (segments - 1));
				var buf = that.Model.minimum;
				for (var i = 0; i < segments; i++) {
					values.push(Math.round(buf));
					buf += crat;
				}
				return values;
			}
			return undefined;
		}

		this.EventsList.add('slider.type.change', function(typesList, type){
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
		var sizeType = '';

		if (isHorizontal){
			sizeType = 'width';
		} else {
			sizeType = 'height';
		}

		this.element.find('div.rule-item').each(function(){
			$(this).remove();
		});

		for (var i = 0; i < values.length; i++){
			var div = $('<div>')
				.addClass('rule-item')
				.css(sizeType, size + '%')
				.attr('value', values[i])
				.html('<div><span>'+ values[i] +'</span></div>')
			divs.push(div);
		}

		if (!isHorizontal){
			divs.reverse();
		}

		if (values.length & 1){
			//нечетное
			var half = Math.floor(values.length/2); //округление до меньшего целого
			var div = $('<div>')
				.addClass('rule-item')
				.css(sizeType, (size * 2) + '%')
				.html('<div><span>'+ values[half] +'</span></div>')
				.attr('value', values[half]);
			divs.splice(half, 1, div);
		}

		divs.forEach(function(item){
			that.element.append(item);
		});

		this.element.find('div').each(function(){
			$(this).addClass('no-select');
			$(this).on('click', function(){
				that.Model.value = Number($(this).attr('value'));
			});
		});
	}
}

export default UIKitSlider_Rule;