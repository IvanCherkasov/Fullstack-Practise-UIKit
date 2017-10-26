import './index.styl'
import UIKit from '../../../../uikit-core/index.js'

class UIKitSlider_Upper extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type){
		super(dom, mediator, type);
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

		this.Mediator.subscribe('model.value', function(modelData){
			print(modelData.value);
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

		this.Mediator.subscribe('model.value', function(){
			show();
		});

		this.stylize(this.Type);
	}
}

export default UIKitSlider_Upper;