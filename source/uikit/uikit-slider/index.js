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
		this.Model.Slider.element = this.element;
		this.Model.Slider.minimum = Number(this.element.attr('minimum'));
		this.Model.Slider.maximum = Number(this.element.attr('maximum'));

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

		this.Model.Slider.value = Number(this.element.attr('value'));
	}

	set value(value){
		this.Model.Slider.value = value;
	}

	get value(){
		return this.Model.Slider.value;
	}
}

class UIKitSlider_Model {
	constructor(){
		var that = this;
		this._eventsList = new UIKit.Core.UIKitEventsList();

		var dispatchSubscribers = function(property, ...args){
			that._eventsList.dispatch(property, ...args);
		}

		this.Slider = {
			element: undefined,
			_value: 0,
			_minimum: 0,
			_maximum: 0,
			get value(){
				return this._value;
			},
			set value(value){
				this._value = value;
				dispatchSubscribers('slider.value', value);
			},
			get minimum(){
				return this._minimum;
			},
			set minimum(value){
				this._minimum = value;
				dispatchSubscribers('slider.minimum', value);
			},
			get maximum(){
				return this._maximum;
			},
			set maximum(value){
				this._maximum = value;
				dispatchSubscribers('slider.maximum', value);
			}
		}

		this.Track = {
			element: undefined,
			_position: 0, //absolute
			_isDrag: false,
			get width(){
				return this.element.width();
			},
			get height(){
				return this.element.height();
			},
			get position(){
				return this._position;
			},
			get offset(){
				return this.element.offset();
			},
			get maximum(){
				if (that.Thumb.element){
					return (100/this.width) * (this.width - that.Thumb.width);
				}
				return 100;
			},
			set position(value){
				this._position = value;
				dispatchSubscribers('slider.track.position', value);
			},
			get isDrag(){
				return this._isDrag;
			},
			set isDrag(value){
				this._isDrag = value;
				dispatchSubscribers('slider.track.isDrag', value);
			},
			Calculate: {
				value(position){
					//точки отсчета отступают на: половину ширина тамба слева на право и справа на лево
					position = UIKit.Core.UIKitMath.Clamp(position, that.Thumb.width/2, that.Track.width - (that.Thumb.width/2));
					//|x-a|/b-a
					var percent = Math.abs(position - that.Thumb.width/2)/((that.Track.width - (that.Thumb.width/2)) - (that.Thumb.width/2));
					percent *= 100;
					var value = Math.round(((percent * (that.Slider.maximum - that.Slider.minimum))/100) + that.Slider.minimum);
					return value;
				},
				position(value){
					value = UIKit.Core.UIKitMath.Clamp(value, that.Slider.minimum, that.Slider.maximum);
					//|x-a|/b-a
					var percent = Math.abs(value - that.Slider.minimum)/(that.Slider.maximum - that.Slider.minimum);
					percent *= 100;
					var position = Math.round(((percent * ((that.Track.width - (that.Thumb.width/2)) - (that.Thumb.width/2)))/100) + (that.Thumb.width/2));
					return position;
				}
			}
		}

		this.Thumb = {
			element: undefined, //по другому: передавать дом через сеттер для тамба, и записывать в _thumbElement в корне, 
								//объект данных тамба брать из его геттера
			_isHover: false,
			get width(){
				if (this.element){
					return this.element.width();
				}
				return 0;
			},
			get height(){
				if (this.element){
					return this.element.height();
				}
				return 0;
			},
			get isHover(){
				return this._isHover;
			},
			set isHover(value){
				this._isHover = value;
				dispatchSubscribers('slider.track.thumb.isHover', value);
			}
		}

		this.ThumbUpper = {
			_text: "",
			get text(){
				return this._text;
			},
			set text(value){
				this._text = value;
				dispatchSubscribers('slider.track.thumb.upper.text', value);
			}
		}

		this.TrackFilled = {
			element: undefined
		}

		this.Rule = {
			element: undefined,
			get segments(){
				if (this.element){
					return Number(this.element.attr('segments'));
				}
				return 0;
			}
		}
	}

	subscribeTo(property, func){
		this._eventsList.add(property, func);
	}
}

UIKit.Core.UIKitSlider = UIKitSlider;