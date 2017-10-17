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

		this.Track = new UIKitSlider_Track(
			this.element.find('.uikit-slider-track'), 
			this.Model
			);

		this.Rule = new UIKitSlider_Rule(
			this.element.find('.uikit-slider-rule'), 
			this.Model
			);

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		this.Model.value = Number(this.element.attr('value'));
	}
}

class UIKitSlider_Model {
	constructor(){
		var that = this;
		this._eventsList = new UIKit.Core.UIKitEventsList();

		var dispatchSubscribers = function(property, ...args){
			that._eventsList.dispatch(property, ...args);
		}

		this._value = 0;
		this._minimum = 0;
		this._maximum = 0;
		this._cs = undefined;	
	}

	subscribeTo(property, func){
		this._eventsList.add(property, func);
	}

	set value(value){
		this._value = value;
		dispatchSubscribers('value', value);
	}

	get value(){
		return this._value;
	}

	set maximum(value){
		this._maximum = value;
		dispatchSubscribers('maximum', value);
	}

	get maximum(){
		return this._maximum;
	}

	set minimum(value){
		this._minimum = value;
		dispatchSubscribers('minimum', value);
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
		dispatchSubscribers('coordinateSystem.reset');
	}
}

UIKit.Core.UIKitSlider = UIKitSlider;