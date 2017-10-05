import UIKit from '../uikit-core/index.js'

class UIKitSlider extends UIKit.Core.UIKitElement {
	constructor(slider){
		super(slider);
		var that = this;
		this._value = 0;
		this._isHover = false;
		
		this.EventsList.addEvent('slider.valueChanged', function(value){
			console.log('value changed: ' + value);
		});

		this.EventsList.addEvent('slider.hoverChanged', function(value){
			console.log('hover changed: ' + value);
		});

		this.Thumb = new UIKitSliderThumb(slider.find('.uikit-slider-thumb'), this.EventsList);
	}

	set value(val){
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

class UIKitSliderThumb extends UIKit.Core.UIKitFragment{
	constructor(thumb, eventsList){
		super(thumb, eventsList);
		var that = this;
	}
}

UIKit.Core.UIKitSlider = UIKitSlider;