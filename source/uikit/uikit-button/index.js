import './index.styl'
import './colors.styl'
import UIKit from '../uikit-core/index.js'
import UIKitButton_Caption from './uikit-button-caption/index.js'
import UIKitButton_Radial from './uikit-button-radial/index.js'

class UIKitButton extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		var that = this;

		this.TypesList = ['aqua', 'lightred'];
		if (!this.element.attr('colors')){
			if (!this.TypesList.includes(this.element.attr('colors'))){
				this.element.attr('colors', 'aqua');
				this.Type = 'aqua';
			} else {
				this.Type = this.element.attr('colors');
			}
		} else {
			this.element.attr('colors', 'aqua');
			this.Type = 'aqua';
		}

		this.Model = new UIKitButton_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);

		this.Caption = new UIKitButton_Caption(
			this.element.find('.uikit-button-caption'),
			this.Model,
			this.Type
			);

		this.Radial = new UIKitButton_Radial(
			this.element.find('.uikit-button-radial'),
			this.Model,
			this.Type
			);

		this.element.on('click', function(event){
			that.Mediator.publish('button.click', event); //запуск анимации у элемента radial
			event.stopPropagation();
		});

		this.element.on('mouseenter', function(){
			that.Mediator.publish('button.hover', true); //обработка наведения там, где это невозможно сдлать через стили
		});

		this.element.on('mouseleave', function(){
			that.Mediator.publish('button.hover', false); //обработка наведения там, где это невозможно сдлать через стили
		});

		this.Mediator.subscribe('element.safeRebuild', function(type){
			this.safeRebuild(type);
		});

		this.stylize(this.Type);
	}

	set caption(value){
		this.Mediator.publish('button.caption', value);
	}

	set colors(type){
		if (typeof type === 'string'){
			if (this.TypesList.includes(type)){
				this.Type = type;
				this.Mediator.publish('element.safeRebuild', type);
			}
		}
	}

	get colors(){
		return this.Type;
	}
}


//Пустая модель
class UIKitButton_Model extends UIKitModel{
	constructor(){
		super();
	}
}