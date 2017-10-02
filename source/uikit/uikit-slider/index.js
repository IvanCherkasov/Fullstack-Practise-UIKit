class UIKitElement{
	constructor(element){
		this.element = element;
		this.EventsList = new UIKitEventsList();
	}
}

class UIKitFragment{
	constructor(element, eventsList){
		this.element = element;
		this.EventsList = eventsList;
	}
}

class UIKitEvent{
	constructor(name){
		this.name = name;
		this._callbacks = [];
	}

	setCallback(value){
		this._callbacks.push(value);
	}

	dispatch(...args){
		this._callbacks.forEach(function(event){
			event(...args);
		});
	}
}

class UIKitEventsList{
	constructor(){
		this._events = [];
	}

	getEvent(name){
		var _event = undefined;
		this._events.forEach(function(event){
			if (event.name === name) {
				_event = event;
				return;
			}
		});
		return _event;
	}

	addEvent(event, f){
		if (!this.exists(event.name)){
			event.setCallback(f);
			this._events.push(event);
		}
	}

	exists(name){
		this._events.forEach(function(event){
			if (event.name === name) return true;
		});
		return false;
	}
}

class UIKitSlider extends UIKitElement{
	constructor(slider){
		super(slider);
		var that = this;
		this._value = 0;
		this._isHover = false;
		
		this.EventsList.addEvent(new UIKitEvent('slider.valueChanged'), function(value){
			console.log('valueChanged: ' + value);
		});

		this.EventsList.addEvent(new UIKitEvent('slider.hoverChanged'), function(value){
			console.log('hoverChanged: ' + value);
		});

		this.Thumb = new UIKitSliderThumb(slider.find('.uikit-slider-thumb'), this.EventsList);

		//в конце
		(function($){
			var sliderData = function(){
				if (slider.data('UIKit.Slider')){
					return slider.data('UIKit.Slider');
				}
				slider.data('UIKit.Slider', that);
				return that;
			}
			jQuery.fn.UIKit.Slider = sliderData;
			jQuery.fn.UIKit().Slider = sliderData;
		})(jQuery);
	}

	set value(val){
		this._value = val;
		if (event = this.EventsList.getEvent('slider.valueChanged')){
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

class UIKitSliderThumb extends UIKitFragment{
	constructor(thumb, eventsList){
		super(thumb, eventsList);
		var that = this;
	}
}

//ядро UIKit
(function($){
  	jQuery.fn.UIKit = function(option){
		if (option){
			return new option(this);
		}
		return this;
	}
})(jQuery);

$('#uikit-slider-id').UIKit(UIKitSlider);
$('#uikit-slider-id').UIKit.Slider().value = 10;