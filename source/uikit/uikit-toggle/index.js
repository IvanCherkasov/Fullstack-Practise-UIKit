import './index.styl'
import UIKit from '../uikit-core/index.js'
import UIKitToggle_Thumb from './thumb/index.js'

class UIKitToggle extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-toggle')){
			throw new ReferenceError('Элемент не является переключателем uikit');
		}
		var that = this;

		this.Type = 'horizontal';
		this.TypesList = ['horizontal', 'vertical'];
		var that = this;
		if (this.element.attr('type') !== undefined){
			if (this.element.attr('type') !== ''){
				if (this.TypesList.includes(this.element.attr('type'))){
					this.Type = this.element.attr('type');
				}
			}
		}

		this._init();
	}

	_init(){
		var that = this;
		this.Model = new UIKitToggle_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);
		var isChecked = false;
		if (this.element.attr('value') === 'true'){
			isChecked = true;
		} else {
			isChecked = false;
		}

		this.Mediator.subscribe('model.checked', function(modelData){
			that.element.attr('value', modelData.checked);
			if (that.checked){
				that.element.addClass('checked');
			} else {
				that.element.removeClass('checked');
			}
		});

		this.Thumb = new UIKitToggle_Thumb(
			this.element.find('.uikit-toggle-thumb'),
			this.Mediator,
			this.Type
			);

		this.element.on('click', function(){
			that.checked = !that.checked;
			
		});

		setTimeout(function(){
			that.checked = isChecked;
		}, 0);

		that.acceptType(this.Type);
	}

	get checked(){
		return this.Mediator.getData('model.checked');
	}

	set checked(value){
		if (typeof value === 'boolean'){
			this.Mediator.setData('model.checked', value);
		}
	}
}

class UIKitToggle_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super({
			_ckecked: false,
			get checked(){
				return this._checked;
			}
		});
	}

	getData(property){
		switch(property){
			case "checked":
				return this.Data.checked;
			default:
				return undefined;
		}
	}

	setData(property, data){
		switch(property){
			case "checked":
				if (typeof data === 'boolean'){
					this.Data._checked = data;
					return true;
				}
				return false;
			default:
				return false;
		}
	}
}

UIKit.Core.UIKitToggle = UIKitToggle;