import './index.styl'
import UIKit from '../uikit-core/index.js'
import UIKitSlider_Track from './uikit-slider-track/index.js'
import UIKitSlider_Rule from './uikit-slider-rule/index.js'

class UIKitSlider extends UIKit.Core.UIKitElement {
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-slider')){
			throw new ReferenceError('Элемент не является слайдером');
		}
		var that = this;

		var loggers = [];
		var logger = function(...args){
			console.log(...args);
		}
		loggers.push(logger);

		this.Model = new UIKitSlider_Model();
		this.Model.minimum = Number(this.element.attr('minimum'));
		this.Model.maximum = Number(this.element.attr('maximum'));
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model, loggers);
		this.Mediator.isLogging = true;	 //включено логирование !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

		this.Mediator.subscribe('value', function(value){
			that.element.attr('value', value);
		});

		this.Mediator.subscribe('minimum', function(minimum){
			that.element.attr('minimum', minimum);
		});

		this.Mediator.subscribe('maximum', function(maximum){
			that.element.attr('maximum', maximum);
		});

		this.Track = new UIKitSlider_Track(
			this.element.find('.uikit-slider-track'),
			this.Mediator
			);

		this.Rule = new UIKitSlider_Rule(
			this.element.find('.uikit-slider-rule'), 
			this.Mediator
			);

		this.Mediator.subscribe('slider.type', function(typesList, type){
			that.reStyle(typesList, type);
		});

		this.TypesList = ['horizontal', 'vertical'];
		if (this.TypesList.includes(this.element.attr('type'))){
			this.type = this.element.attr('type');
		} else {
			this.type = 'horizontal';
		}

		this.Mediator.setData('value', Number(this.element.attr('value')));

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});
	}

	get type(){
		return this._type;
	}

	set type(value){
		if (typeof value === 'string'){ // horizontal / vertical
			if (this.TypesList.includes(value)){
				this._type = value;
				this.Mediator.publish('slider.type', this.TypesList, value);
			}
		}
	}
}

class UIKitSlider_Model {
	constructor(){
		var that = this;
		this._value = 0;
		this._minimum = 0;
		this._maximum = 0;
		this._cs = null;
	}

	set value(value){
		value = UIKit.Core.UIKitMath.Clamp(value, this.minimum, this.maximum);
		this._value = value;
	}

	get value(){
		return this._value;
	}

	set maximum(value){
		this._maximum = value;
	}

	get maximum(){
		return this._maximum;
	}

	set minimum(value){
		this._minimum = value;
	}

	get minimum(){
		return this._minimum;
	}

	get coordinateSystem(){
		return this._cs;
	}

	set coordinateSystem(dom){
		if (!this._cs){
			this._cs = new UIKit.Core.UIKitCoordinateSystem(dom);
		}
	}

	resetCoordinateSystem(){
		this._cs = undefined;
	}
}

UIKit.Core.UIKitSlider = UIKitSlider;