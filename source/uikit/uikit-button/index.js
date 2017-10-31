import './index.styl'
import UIKit from '../uikit-core/index.js'
import UIKitButton_Caption from './uikit-button-caption/index.js'
import UIKitButton_Effect from './uikit-button-effect/index.js'

class UIKitButton extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		var that = this;
		var style = '';

		this.Model = new UIKitButton_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);

		this.Caption = new UIKitButton_Caption(
			this.element.find('.uikit-button-caption'),
			this.Mediator
			);

		this.Radial = new UIKitButton_Effect(
			this.element.find('.uikit-button-effect'),
			this.Mediator
			);

		this.element.on('click', function(event){
			that.Mediator.publish('button.click', event); //запуск анимации у элемента effect
			event.stopPropagation();
		});

		this.element.on('mouseenter', function(){
			that.Mediator.publish('button.hover', true); //обработка наведения там, где это невозможно сдлать через стили
		});

		this.element.on('mouseleave', function(){
			that.Mediator.publish('button.hover', false); //обработка наведения там, где это невозможно сдлать через стили
		});

		this.caption = this.element.attr('caption');
	}

	set caption(value){
		this.Mediator.publish('button.caption', value);
	}
}

//Пустая модель
class UIKitButton_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super();
	}
}

UIKit.Core.UIKitButton = UIKitButton;