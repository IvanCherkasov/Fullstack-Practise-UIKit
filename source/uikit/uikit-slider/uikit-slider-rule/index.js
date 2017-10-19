import './index.styl'
import UIKit from '../../uikit-core/index.js'

class UIKitSlider_Rule extends UIKit.Core.UIKitElement{
	constructor(dom, model){
		super(dom, model);
		var that = this;
		var segments = this.element.attr('segments');

		var values = function(){
			if (segments !== 0 && segments > 0){
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

		if (segments !== 0){
			var values = values();
			if (values){
				var divs = [];
				var length = 0;
				var width = (100/(values.length + 1));
				if (values.length & 1){
					//нечетное количество
					length = values.length + 1;
				} else {
					//четное количество
					length = values.length;
				}

				for (var i = 0; i < length; i++){
					var div = $('<div>')
						.css('position', 'relative')
						.css('display', 'table-cell')
						.css('width', width + '%')
						.css('text-align', 'center')
					divs.push(div);
				}

				divs[0]
					.css('text-align', 'left')
					.text(values[0])
					.attr('value', values[0]);

				divs[divs.length - 1]
					.css('text-align', 'right')
					.text(values[values.length - 1])
					.attr('value', values[values.length - 1]);

				var half = (length / 2) - 1;

				for (var i = 1; i < half; i++){
					divs[i]
						.text(values[i])
						.attr('value', values[i]);
				}

				var _half = half;
				
				if (!(values.length & 1)){
					_half--;
				}

				for (var i = values.length - 2; i > _half; i--){
					divs[i+1]
						.text(values[i])
						.attr('value', values[i]);
				}

				if (!(length & 1)){
					var div = $('<div>')
						.css('position', 'relative')
						.css('display', 'table-cell')
						.css('width', (width * 2) + '%')
						.css('text-align', 'center')
						.text(values[_half])
						.attr('value', values[_half]);
					divs.splice(_half, 2, div);
				}

				divs.forEach(function(item){
					that.element.append(item);
				});

				that.element.find('div').each(function(){
					$(this).addClass('no-select');
					$(this).on('click', function(){
						that.Model.value = Number($(this).attr('value'));
					});
				});
			}
		}
	}
}

export default UIKitSlider_Rule;