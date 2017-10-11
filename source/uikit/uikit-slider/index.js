import './index.styl'
import UIKit from '../uikit-core/index.js'

class UIKitSlider extends UIKit.Core.UIKitElement {
	constructor(dom){
		super(dom);
		if (!this.element.hasClass('uikit-slider')){
			throw new ReferenceError('Элемент не является слайдером');
		}
		var that = this;
		this._value = 0;
		this._isHover = false;
		this._maximum = this.element.attr('maximum');
		this._minimum = this.element.attr('minimum');

		this.Track = new UIKitSlider_Track(
			this.element.find('.uikit-slider-track'), 
			this.EventsList
			);

		this.Rule = new UIKitSlider_Rule(
			this.element.find('.uikit-slider-rule'), 
			this.EventsList,
			this._minimum,
			this._maximum
			);

		this.EventsList.add('slider.thumb.positionChanged', function(val){
			//TODO: по проценту узнаю значение и выставляю
		});

		this.EventsList.add('slider.hoverChanged', function(value){
			
		});

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		this.value = this.element.attr('value');
	}

	set value(val){
		val = Number(val);
		this._value = val;
		this.EventsList.dispatch('slider.valueChanged', val)
	}

	get value(){
		return this._value;
	}

	set isHover(val){
		this._isHover = val;
		this.EventsList.dispatch('slider.hoverChanged', val);
	}

	get isHover(){
		return this._isHover;
	}
}

class UIKitSlider_Track extends UIKit.Core.UIKitElement{
	constructor(dom, eventsList){
		super(dom, eventsList);
		var that = this;

		this.Thumb = new UIKitSlider_Thumb(
			this.element.find('.uikit-slider-thumb'),
			this.EventsList,
			{
				get width(){ return that.element.width(); },
				get height(){ return that.element.height(); }
			}, //либо добавить какой-нибудь onresize для обновления размеров
			this.element.offset()
			);

		this.element.on('mousedown', function(event){
			that.EventsList.dispatch('slider.track.mousePressed', event.pageX - that.element.offset().left);
		});
	}
}

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, eventsList, trackSize, trackOffset){
		super(dom, eventsList);
		var that = this;
		this._isHover = false;
		this._isDrag = false;
		this._position = 0;
		this._trackSize = trackSize;
		this._trackOffset = trackOffset;
		this.Upper = new UIKitSlider_Upper(
			this.element.find('.uikit-slider-upper'),
			this.EventsList
			);

		this.EventsList.add('slider.thumb.hoverChanged', function(value){
			that.toggleClass('hover');
		});

		this.element.on('mouseenter', function(){
			that.isHover = true;
		});

		this.element.on('mouseleave', function(){
			that.isHover = false;
		});

		this.element.on('mousedown', function(){
			//that.startDrag();
		});

		this.EventsList.add('slider.thumb.positionChanged', function(val){
			that._move(val);
		});

		this.EventsList.add('slider.valueChanged', function(value){
			if (!that.isDrag){
				//TODO: посчитать процент по значению. Получить кординату. И отправить в position. Где будет получен новый процент 
			}
		});

		this.EventsList.add('slider.track.mousePressed', function(x){
			that.position = x;
			that.startDrag();
		});
	}

	get isHover(){
		return this.isHover;
	}

	set isHover(val){
		this._isHover = val;
		this.EventsList.dispatch('slider.thumb.hoverChanged', val);
	}

	get isDrag(){
		return this._isDrag;
	}

	set isDrag(val){
		this._isDrag = val;
		this.EventsList.dispatch('slider.thumb.dragChanged', val);
	}

	get positionPercent(){
		//TODO: вернуть позицию в процентах.
		var val = this._calc(this.position);
		return val;
	}

	get position(){
		return this._position;
	}

	set position(val){//сюда идут координаты
		this._position = val;
		this.EventsList.dispatch('slider.thumb.positionChanged', this.positionPercent);
	}

	_calc(val){
		var clamp = function(val, min, max){
			return Math.round(Math.min(Math.max(min, val), max));
		}
		return clamp(val - this.element.width()/2, 0, this._trackSize.width - this.element.width());
	}

	_move(val){
		this.element.css('left', val + 'px');
	}

	startDrag(){
		var that = this;
		that.isDrag = true;
		$(document).on('mousemove.uikit.slider', function(event){
			that.position = event.pageX - that._trackOffset.left;
		});
		$(document).on('mouseup.uikit.slider', function(){
			$(document).off('mousemove.uikit.slider');
			$(document).off('mouseup.uikit.slider');
			that.isDrag = false;
		});
}
}

class UIKitSlider_Upper extends UIKit.Core.UIKitElement{
	constructor(dom, eventsList){
		super(dom, eventsList);
		var that = this;
		this.EventsList.add('slider.valueChanged', function(value){
			that.print(value);
		});
	}

	print(value){
		this.element.find('div.no-select').text(value);
	}
}

class UIKitSlider_Rule extends UIKit.Core.UIKitElement{
	constructor(dom, eventsList, minimum, maximum){
		super(dom, eventsList);
		this.init(minimum, maximum);
	}

	init(minimum, maximum){

	}
}

UIKit.Core.UIKitSlider = UIKitSlider;