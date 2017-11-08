import './index.styl'
import UIKit from '../uikit-core/index.ts'
import UIKitInputText_Input from './uikit-input/index.js'
import UIKitInputText_Indicator from './uikit-indicator/index.js'

class UIKitInputText extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-input-text')){
			throw new ReferenceError('Элемент не является полем ввода UIKit');
		}

		this.Model = new UIKitInputText_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);

		this.Input = new UIKitInputText_Input(
			this.element.find('input'),
			this.Mediator
			);

		this.Indicator = new UIKitInputText_Indicator(
			this.element.find('.uikit-indicator'),
			this.Mediator
			);

		if (this.element.attr('indicator') === 'true'){
			this.indicator.enabled = true;
		} else {
			this.indicator.enabled = false;
		}

		this.indicator.status = true;
	}

	get text(){
		return this.Mediator.getData('model.text');
	}

	set text(value){
		if (typeof value === 'string'){
			this.Mediator.setData('model.text', value);
		}
	}

	get indicator(){
		var that = this;
		return {
			set enabled(value){
				if (typeof value === 'boolean'){
					that.Mediator.publish('indicator.enabled', value);
				}
			},
			set status(value){
				if (typeof value === 'boolean'){
					that.Mediator.publish('indicator.status', value);
				}
			}
		}
	}
}

class UIKitInputText_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super({
			_text: '',
			get text(){
				return this._text;
			}
		});
	}

	getData(property){
		switch(property){
			case 'text':
				return this.Data.text;
			default:
				return undefined;
		}
	}

	setData(property, data){
		switch(property){
			case 'text':
				if (typeof data === string){
					this.Data._text = data;
					return true;
				}
				return false;
			default:
				return false;
		}
	}
}

UIKit.Core.UIKitInputText = UIKitInputText;