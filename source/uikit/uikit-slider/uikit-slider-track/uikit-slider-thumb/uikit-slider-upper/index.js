import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Upper extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
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

		this.Mediator.subscribe('value', function(value){
			print(value);
		});

		this.Mediator.subscribe('thumb.hover', function(value){
			if (value){
				show();
			}
		});

		this.Mediator.subscribe('track.hover', function(value){
			if (value){
				show();
			}
		});

		this.Mediator.subscribe('value', function(){
			show();
		});

		this.Mediator.subscribe('slider.type', function(typesList, type){
			that.reStyle(typesList, type);
		});
	}
}

export default UIKitSlider_Upper;