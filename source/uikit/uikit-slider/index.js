var UIKitElement 	= 	$.UIKit.Core.UIKitElement;
var UIKitFragment 	= 	$.UIKit.Core.UIKitFragment;
var UIKitEvent 		= 	$.UIKit.Core.UIKitEvent;
var UIKitEventsList = 	$.UIKit.Core.UIKitEventsList;

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

$('#uikit-slider-id').UIKit(UIKitSlider);
console.log($.UIKit);