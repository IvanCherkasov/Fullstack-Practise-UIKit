import './index.styl'
import './uikit-stages-stage/index.js'
import './uikit-stages-between/index.js'
import UIKit from '../../uikit-core/index.ts'

class UIKitStages_Track extends UIKit.Core.UIKitElement{
	constructor(dom, mediator, type, invert){
		super(dom, mediator, type);
		var that = this;

		this.Invert = false;
		if (typeof invert === 'boolean'){
			if (invert === true && this.Type === 'vertical'){
				this.Invert = true;
				setTimeout(function(){
					that.element.addClass('invert');
				}, 0);
			}
		}

		var sizeType = '';
		var shiftType = '';
		if (this.Type === 'horizontal'){
			sizeType = 'width';
			shiftType = 'left';
		} else if (this.Type === 'vertical') {
			sizeType = 'height';
			shiftType = 'top';
		}

		var stages = this.Mediator.getData('model.stages');
		var stage = this.Mediator.getData('model.stage');

		var stageDom = $('<div>')
			.addClass('uikit-stages-stage');

		var captionDom = $('<div>')
			.addClass('uikit-stage-caption');

		var percent = 100/(stages-1);
		var shift = 0;
		var betweenDom = $('<div>')
			.addClass('uikit-stages-between')
			.addClass(this.Type)
			.css(sizeType, percent + '%');

		for(var i = 1; i <= stages-1; i++){
			betweenDom.css(shiftType, shift + '%');
			shift += percent;
			this.element.append(betweenDom.clone());
		}

		for(var i = 1; i <= stages; i++){
			var clone = stageDom.clone().append(captionDom.clone().html('<span>' + i + '</span>'));
			this.element.append(clone);
		}

		this.Mediator.subscribe('model.stage', function(modelData){
			var betweens = that.element.find('.uikit-stages-between');
			if (that.Invert){
				betweens = $(betweens.get().reverse());
				console.log(betweens);
			}

			betweens.each(function(i){
				if (i < (modelData.stage - 1)){
					$(this).addClass('staged');
				} else {
					$(this).removeClass('staged');
				}
			});

			that.element.find('.uikit-stages-stage').each(function(i){
				if (i <= (modelData.stage - 1)){
					$(this).addClass('staged');
				} else {
					$(this).removeClass('staged');
				}
			});
		});

		this.acceptType(this.Type);
	}
}

export default UIKitStages_Track;