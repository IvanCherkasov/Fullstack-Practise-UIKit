import './index.styl'
import UIKit from '../uikit-core/index.js'
import UIKitSlider_Track from './uikit-slider-track/index.js'
import UIKitSlider_Rule from './uikit-slider-rule/index.js'
import UIKitSlider_Input from './uikit-slider-input/index.js'

class UIKitSlider extends UIKit.Core.UIKitElement {
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-slider')){
			throw new ReferenceError('Элемент не является слайдером');
		}
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
		var middleWare = [];

		this.Model = new UIKitSlider_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model, middleWare);
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

		this.Track = new UIKitSlider_Track(
			this.element.find('.uikit-slider-track'),
			this.Mediator,
			this.Type
			);

		this.Rule = new UIKitSlider_Rule(
			this.element.find('.uikit-slider-rule'), 
			this.Mediator,
			this.Type
			);

		this.Input = new UIKitSlider_Input(
			this.element.find('.uikit-slider-input'),
			this.Mediator,
			this.Type
			);

		setTimeout(function(){
			that.Mediator.setData('model.value', Number(that.element.attr('value')));
		}, 0);

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		this.stylize(this.Type);
	}
}

class UIKitSlider_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super({
			_value: 0,
			_minimum: 0,
			_maximum: 0,
			_cs: null,
			get value(){
				return this._value;
			},
			get minimum(){
				return this._minimum;
			},
			get maximum(){
				return this._maximum;
			},
			get coordinateSystem(){
				return this._cs;
			}
		});
		var that = this;
	}

	getData(property){
		switch(property){
			case 'value':
				return this.Data.value;
			case 'minimum':
				return this.Data.minimum;
			case 'maximum':
				return this.Data.maximum;
			case 'coordinateSystem':
				return this.Data.coordinateSystem;
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
			case 'coordinateSystem':
				var cs = new UIKit.Core.UIKitCoordinateSystem(data);
				this.Data._cs = cs;
				return true;
			default:
				return false;
		}
	}

}

UIKit.Core.UIKitSlider = UIKitSlider;