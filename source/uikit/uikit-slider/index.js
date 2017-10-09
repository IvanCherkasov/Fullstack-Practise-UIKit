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

		this.value = this.element.attr('value');

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

		var valueChangedFlag = false;
		this.EventsList.add('slider.valueChanged', function(value){
			if (!valueChangedFlag){
				valueChangedFlag = true;
				//получаю координаты по значению
				//вызываю onDrag
			} else {
				//ничего не делаю
				//переключаю флаг
				valueChangedFlag = false;
			}
		});

		this.EventsList.add('slider.thumb.onDrag', function(x, y){
			if (!valueChangedFlag){
				valueChangedFlag = true;
				//получаю значение по координатам
				//выставляю значение
			} else {
				//ничего не делаю
				//переключаю флаг
				valueChangedFlag = false;
			}
		});

		this.EventsList.add('slider.hoverChanged', function(value){
			
		});
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
			this.EventsList
			);
		this.element.on('mousedown', function(event){
			//перемещаю тамб вызовом события onDrag
			that.EventsList.dispatch('slider.thumb.onDrag', event.pageX, event.pageY);
		});
	}
}

class UIKitSlider_Thumb extends UIKit.Core.UIKitElement{
	constructor(dom, eventsList){
		super(dom, eventsList);
		var that = this;
		this._isHover = false;
		this._isDrag = false;
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
			that.isDrag = true;
			$(document).on('mousemove.uikit.slider', function(event){
				that.EventsList.dispatch('slider.thumb.onDrag', event.pageX, event.pageY);
			});
			$(document).on('mouseup.uikit.slider', function(){
				$(document).off('mousemove.uikit.slider');
				$(document).off('mouseup.uikit.slider');
				that.isDrag = false;
			});
		});

		this.EventsList.add('slider.thumb.onDrag', function(x, y){
			//перемещение тамба
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
}

class UIKitSlider_Upper extends UIKit.Core.UIKitElement{
	constructor(dom, eventsList){
		super(dom, eventsList);
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