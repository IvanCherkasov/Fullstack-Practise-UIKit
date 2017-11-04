import './index.styl'
import UIKit from '../../uikit-core/index.js'
import UIKitInputText_Caption from './uikit-indicator-caption/index.js' 

class UIKitInputText_Indicator extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;

		this.Caption = new UIKitInputText_Caption(
			this.element.find('.uikit-indicator-caption'),
			this.Mediator,
			this.element.attr('ok'),
			this.element.attr('error')
			);

		this.Mediator.subscribe('indicator.status', function(value){
			if (value){
				that.element.addClass('indicator-ok');
			} else {
				that.element.removeClass('indicator-ok');
			}
		});

		this.Mediator.subscribe('indicator.enabled', function(value){
			//переключение индикатора из корня релизует стандартный способ переключения для элемента
			that.enabled = value;
		});
	}
}

export default UIKitInputText_Indicator;