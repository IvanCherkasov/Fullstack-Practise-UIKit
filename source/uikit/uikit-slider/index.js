import UIKit from '../uikit-core/index.js'

class UIKitSlider extends UIKit.Core.UIKitElement {
	constructor(slider){
		super(slider);
		if (!slider.hasClass('uikit-slider')){
			throw new ReferenceError('Элемент не является слайдером');
		}
		var that = this;
		this._value = 0;
		this._isHover = false;
		this._maximum = slider.attr('maximum');
		this._minimum = slider.attr('minimum');
		
		this.value = slider.attr('value');

		this.EventsList.addEvent('slider.valueChanged', function(value){
			console.log('value changed: ' + value);
		});

		this.EventsList.addEvent('slider.hoverChanged', function(value){
			console.log('hover changed: ' + value);
		});

		this.Track = new UIKitSlider_Track(slider.find('.uikit-slider-track'), this.EventsList);
		this.Rule = new UIKitSlider_Rule(slider.find('.uikit-slider-rule'), this.EventsList);
	}

	set value(val){
		val = Number(val);
		this._value = val;
		var event = this.EventsList.getEvent('slider.valueChanged');
		if (event){
			event.dispatch(val);
		}
	}

	get value(){
		return this._value;
	}

	set isHover(val){
		this._isHover = val;
		if (event = this.EventsList.getEvent('slider.hoverChanged')){
			event.dispatch(val);
		}
	}

	get isHover(){
		return this._isHover;
	}
}

class UIKitSlider_Track extends UIKit.Core.UIKitFragment{
	constructor(track, eventsList){
		super(track, eventsList);
		var that = this;
	}
}

class UIKitSlider_Thumb extends UIKit.Core.UIKitFragment{
	constructor(thumb, eventsList){
		super(thumb, eventsList);
		var that = this;
	}
}

class UIKitSlider_Upper extends UIKit.Core.UIKitFragment{
	constructor(upper, eventsList){
		super(upper, eventsList);
		var that = this;
	}
}

class UIKitSlider_Rule extends UIKit.Core.UIKitFragment{
	constructor(rule, eventsList){
		super(rule, eventsList);
		var that = this;
	}
}

UIKit.Core.UIKitSlider = UIKitSlider;