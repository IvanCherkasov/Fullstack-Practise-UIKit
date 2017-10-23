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

		this.Model = new UIKitSlider_Model();
		this.Model.minimum = Number(this.element.attr('minimum'));
		this.Model.maximum = Number(this.element.attr('maximum'));
		var list = ['thumb.hover', 'track.hover', 'slider.type.change'];
		this.EventsList = new UIKit.Core.UIKitEventsList(list);

		this.Track = new UIKitSlider_Track(
			this.element.find('.uikit-slider-track'),
			this.Model,
			this.EventsList
			);

		this.Rule = new UIKitSlider_Rule(
			this.element.find('.uikit-slider-rule'), 
			this.Model,
			this.EventsList
			);

		this.Model.subscribeTo('value', function(value){
			that.element.attr('value', value);
		});

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		this.EventsList.add('slider.type.change', function(typesList, type){
			that.reStyle(typesList, type);
		});

		this.TypesList = ['horizontal', 'vertical'];
		if (this.TypesList.includes(this.element.attr('type'))){
			this.type = this.element.attr('type');
		} else {
			this.type = 'horizontal';
		}

		this.Model.value = Number(this.element.attr('value'));
	}

	get type(){
		return this._type;
	}

	set type(value){
		if (typeof value === 'string'){ // horizontal / vertical
			if (this.TypesList.includes(value)){
				this._type = value;
				this.EventsList.dispatch('slider.type.change', this.TypesList, value);
			}
		}
	}
}

class UIKitSlider_Model {
	constructor(){
		var that = this;
		var list = ['value', 'minimum', 'maximum'];
		this._eventsList = new UIKit.Core.UIKitEventsList(list);
		this._value = 0;
		this._minimum = 0;
		this._maximum = 0;
		this._cs = undefined;
	}

	subscribeTo(property, func){
		this._eventsList.add(property, func);
	}

	set value(value){
		value = UIKit.Core.UIKitMath.Clamp(value, this.minimum, this.maximum);
		this._value = value;
		this._dispatchSubscribers('value', value);
	}

	get value(){
		return this._value;
	}

	set maximum(value){
		this._maximum = value;
		this._dispatchSubscribers('maximum', value);
	}

	get maximum(){
		return this._maximum;
	}

	set minimum(value){
		this._minimum = value;
		this._dispatchSubscribers('minimum', value);
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
		this._dispatchSubscribers('coordinateSystem.reset');
	}

	_dispatchSubscribers(property, ...args){
		this._eventsList.dispatch(property, ...args);
	}
}

UIKit.Core.UIKitSlider = UIKitSlider;