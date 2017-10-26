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
		this.Type = 'horizontal';
		this.Original = this.element.clone();
		this.TypesList = ['horizontal', 'vertical'];
		var that = this;
		if (this.element.attr('type') !== undefined){
			if (this.element.attr('type') !== ''){
				if (this.TypesList.includes(this.element.attr('type'))){
					this.Type = this.element.attr('type');
				}
			}
		}

		this.init();
	}

	init(){
		var that = this;
		var middleWare = [];

		this.Model = new UIKitSlider_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model, middleWare);
		this.Mediator.setData('model.minimum', Number(this.element.attr('minimum')));
		this.Mediator.setData('model.maximum', Number(this.element.attr('maximum')));

		this.Mediator.subscribe('model.value', function(modelData){
			that.element.attr('value', modelData.value);
		});

		this.Mediator.subscribe('model.minimum', function(modelData){
			that.element.attr('minimum', modelData.minimum);
		});

		this.Mediator.subscribe('model.maximum', function(modelData){
			that.element.attr('maximum', modelData.maximum);
		});

		this.Track = new UIKitSlider_Track(
			this.element.find('.uikit-slider-track'),
			this.Mediator,
			this.Type
			);

		this.Rule = new UIKitSlider_Rule(
			this.element.find('.uikit-slider-rule'), 
			this.Mediator,
			this.Type
			);

		setTimeout(function(){
			that.Mediator.setData('model.value', Number(that.element.attr('value')));
		}, 0);

		this.element.on('dragstart', function(){
			return false;
		});
		
		this.element.on('selectstart', function(){
			return false;
		});

		this.stylize(this.Type);
	}

	reBuild(){
		var that = this;
		var parent = this.element.parent();
		var spawned = false;

		var attributes = [];
		this.element.each(function(){
			$.each(this.attributes, function(){
				if (this.specified){
					attributes.push({
						name: this.name,
						value: this.value
					});
				}
			});
		});

		var index = -1;
		parent.children().each(function(i){
			if ($(this).is(that.element)) {
				index = i;
				return;
			}
		});

		this.element.remove();
		this.element = this.Original.clone();

		attributes.forEach(function(attr){
			if (attr.name !== 'class'){
				that.element.attr(attr.name, attr.value);
			}
		});

		parent.children().each(function(i){
			if (i === index){
				$(this).before(that.element);
				spawned = true;
				return;
			}
		});

		if (!spawned){
			parent.append(this.element);
		}

		this.element.attr('type', this.Type);

		this.element.ready(function(){
			setTimeout(function(){
				that.init(that.Type);
			}, 0);
		});
	}

	get type(){
		return this.Type;
	}

	set type(value){
		if (typeof value === 'string'){ // horizontal / vertical
			if (this.TypesList.includes(value)){
				this.Type = value;
				//this.Mediator.publish('slider.type', this.TypesList, value);
				this.reBuild(this.Type);
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

		this.Data = {
			_value: 0,
			_minimum: 0,
			_maximum: 0,
			_cs: null,
			get value(){
				return this._value;
			},
			get minimum(){
				return this._minimum;
			},
			get maximum(){
				return this._maximum;
			},
			get coordinateSystem(){
				return this._cs;
			}
		}

	}

	getData(property){
		switch(property){
			case 'value':
				return this.Data.value;
			case 'minimum':
				return this.Data.minimum;
			case 'maximum':
				return this.Data.maximum;
			case 'coordinateSystem':
				return this.Data.coordinateSystem;
			default:
				return undefined;
		}
	}

	setData(property, data){
		switch(property){
			case 'value':
				var value = UIKit.Core.UIKitMath.Clamp(data, this.Data.minimum, this.Data.maximum);
				this.Data._value = value;
				return true;
			case 'minimum':
				this.Data._minimum = data;
				return true;
			case 'maximum':
				this.Data._maximum = data;
				return true;
			case 'coordinateSystem':
				var cs = new UIKit.Core.UIKitCoordinateSystem(data);
				this.Data._cs = cs;
				return true;
			default:
				return false;
		}
	}

	getProperties(){
		return this.Data;
	}

	/*set value(value){
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
		this._cs = null;
	}*/
}

UIKit.Core.UIKitSlider = UIKitSlider;