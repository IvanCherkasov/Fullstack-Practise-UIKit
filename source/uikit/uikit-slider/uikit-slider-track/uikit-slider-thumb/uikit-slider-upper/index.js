import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Upper extends UIKit.Core.UIKitElement{
	constructor(dom, model, eventsList){
		super(dom, model, eventsList);
		var that = this;
		var div = that.element.find('div.no-select');
		var timerId = 0;
		var disable = function(){
			that.element.removeClass('show');
		}

		var print = function(value){
			div.text(value);
		}

		var show = function(){
			clearTimeout(timerId);
			that.element.addClass('show');
			timerId = setTimeout(disable, 1000);
		}

		this.Model.subscribeTo('value', function(value){
			print(value);
		});

		this.EventsList.add('thumb.hover', function(value){
			if (value){
				show();
			}
		});

		this.EventsList.add('track.hover', function(value){
			if (value){
				show();
			}
		});

		this.Model.subscribeTo('value', function(){
			show();
		});
	}
}

export default UIKitSlider_Upper;