import './index.styl'
import UIKit from '../uikit-core/index.ts'
import UIKitRadialProgress_Caption from './uikit-radial-progress-caption/index.js'

class UIKitRadialProgress extends UIKit.Core.UIKitElement{
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-radial-progress')){
			throw new ReferenceError('Элемент не является радиальным прогресс баром');
		}
		var that = this;

		this.Model = new UIKitRadialProgress_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);
		this.Mediator.setData('model.minimum', Number(this.element.attr('minimum')));
		this.Mediator.setData('model.maximum', Number(this.element.attr('maximum')));

		this.Mediator.subscribe('model.value', function(modelData){
			that.element.attr('value', modelData.value);
		});

		this.Mediator.subscribe('model.minimum', function(modelData){
			that.element.attr('minimum', modelData.minimum);
		});

		this.Mediator.subscribe('model.maximum', function(modelData){
			that.element.attr('maximum', modelData.maximum);
		});

		this.Caption = new UIKitRadialProgress_Caption(
			this.element.find('.uikit-radial-progress-caption'),
			this.Mediator
		);

		this.Mediator.subscribe('model.value', function(modelData){
			var item_right = that.element.find('.progress-right');
			var item_left = that.element.find('.progress-left');
			var percent = Math.abs(modelData.value - modelData.minimum)/(modelData.maximum - modelData.minimum) * 100;
			var value = Math.round(((percent * (360))/100));
			if (value <= 180 && value >= 0){
				item_right.css('transform', 'rotate(' + value + 'deg)');
				item_left.css('transform', 'rotate(180deg)');
			} else if (value <= 360 && value > 180 ){
	            item_right.css('transform', 'rotate(180deg)');
	            item_left.css('transform', 'rotate(' + value + 'deg)');
        	}
		});

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		this.value = Number(this.element.attr('value'));
	}

	get value(){
		return this.Mediator.getData('model.value');
	}

	set value(val){
		this.Mediator.setData('model.value', val);
	}
}

class UIKitRadialProgress_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super({
			_value: 0,
			_minimum: 0,
			_maximum: 0,
			get value(){
				return this._value;
			},
			get minimum(){
				return this._minimum;
			},
			get maximum(){
				return this._maximum;
			}
		});
	}

	getData(property){
		switch(property){
			case 'value':
				return this.Data.value;
			case 'minimum':
				return this.Data.minimum;
			case 'maximum':
				return this.Data.maximum;
			default:
				return undefined;
		}
	}

	setData(property, data){
		switch(property){
			case 'value':
				var value = UIKit.Core.UIKitMath.Clamp(data, this.Data.minimum, this.Data.maximum);
				this.Data._value = value;
				return true;
			case 'minimum':
				this.Data._minimum = data;
				return true;
			case 'maximum':
				this.Data._maximum = data;
				return true;
			default:
				return false;
		}
	}
}

UIKit.Core.UIKitRadialProgress = UIKitRadialProgress;