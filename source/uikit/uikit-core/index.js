import './uikit-styles.styl'

class UIKitElement{// AbstractBase
	constructor(dom, mediator, type){
		if (dom !== undefined && dom !== null){
			var that = this;
			this.element = dom;
			this.Original = dom.clone();

			if (mediator !== undefined && mediator !== null){
				this.Mediator = mediator;
			}

			if (type !== undefined && type !== null){
				this.Type = type;
			}

		} else throw ReferenceError('Элемент пустой');
	}

	stylize(type){
		this.element.addClass(type);
	}

	//смена класса
	safeRebuild(type){
		var baseClasses = this.Original.attr('class');
		this.element.attr('class', '');
		this.element.attr('class', baseClasses);
		this.element.attr('class', this.element.attr('class') + type);
	}

	clearStyle(){
		var that = this;
		UIKit.styles.forEach(function(item){
			that.element.removeClass(item);
		});
	}

	set style(name){
		var that = this;
		if (UIKit.styles.includes(name)){
			this.clearStyle();
			that.element.addClass(name);
		}
	}

	//полное перестроение элемента
	//каждый элемент сам решает как ему перестроиться
	rebuild(){}
}

class UIKitMath{
	constructor(){}
	static Clamp(value, min, max){
		return Math.min(Math.max(min, value), max);
	}
}

class UIKitCoordinateSystem{
	constructor(dom){
		this._element = dom;
		var that = this;
	}

	get xMin(){
		if (this._element){
			return this._element.offset().left;
		}
		return 0;
	}

	get yMin(){
		if (this._element){
			return this._element.offset().top;
		}
		return 0;
	}

	get xMax(){
		if (this._element){
			return this._element.offset().left + this._element.width();
		}
		return 0;
	}

	get yMax(){
		if (this._element){
			return this._element.offset().top + this._element.height();
		}
		return 0;
	}

	get width(){
		if (this._element){
			return this._element.width();
		}
		return 0;
	}

	get height(){
		if (this._element){
			return this._element.height();
		}
		return 0;
	}
}

class UIKitMediator{
	constructor(Model, middleWare){
		var that = this;
		this.channels = {}
		this._middleWare = [];
		this._model = Model;
		if (middleWare){
			if (Array.isArray(middleWare)){
				this._middleWare = middleWare;
			}
		}
	}

	subscribe(channel, func){
		if (!this.channels[channel]){
			this.channels[channel] = [];
		}
		this.channels[channel].push({
			callback: func
		});
	}

	publish(channel, ...args){
		var that = this;
		if (!this.channels[channel]){
			return false;
		}

		this.channels[channel].forEach(function(subscription){
			subscription.callback(...args);
		});

		return true;
	}

	setData(property, data){
		var props = property.split('.');
		var done = false;

		if (props[0] === 'model'){
			if (this._model.setData(props[1], data)){
				done = true;
			}
		}
		
		if (done === false){
			console.error('no such property named "' + property + '"');
			return false;
		}

		this.publish(property, this._model.Data);

		this._middleWare.forEach(function(func){
			func('mediator set data', {
				property: property,
				data: data
			});
		});
	}

	getData(property){
		var props = property.split('.');
		var done = false;
		var data = null;

		if (props[0] === 'model'){
			data = this._model.getData(props[1]);
			if (data !== undefined){
				done = true;
			}
		}

		if (done){
			return data;
		} else {
			console.error('no such property named "' + property + '"');
			return undefined;
		}
	}
}

//типа абстрактый класс
class UIKitModel{
	constructor(data){
		this.Data = {}
		if (data){
			if (data !== null){
				this.Data = data;
			}
		}
	}

	getData(property){}
	setData(property, data){}
}

var BreakException = {};
var style = '';
var styles = []
var rawObject = require('!!to-raw-loader!css-as-json-loader!stylus-loader!./uikit-styles.styl');
var jsonObject = JSON.parse(rawObject.raw);
jsonObject.forEach(function(item){
	if (Array.isArray(item['selectors'])){
		for(var i = 0; i < item['selectors'].length; i++){

			var ok = false;
			var selector = item['selectors'][i];
			if (selector.search('uikit-style-') > -1){
				var strings = selector.split('.');
				for (var j = 0; j < strings.length; j++){
					if (strings[j].search('uikit-style-') > -1){
						styles.push(strings[j].trim());
						ok = true;
					}
					if (ok){
						break;
					}
				}
			}
			if (ok){
				break;
			}
		}
	}
});

console.log(styles);

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitMath: UIKitMath,
		UIKitCoordinateSystem: UIKitCoordinateSystem,
		UIKitMediator: UIKitMediator,
		UIKitModel: UIKitModel
	},
	set style(name){
		if (styles.includes(name)){
			styles.forEach(function(item){
				$('body').removeClass(item);
			});
			$('body').addClass(name);
			style = name;
		}
	},
	get style(){
		return style;
	},
	get styles(){
		return styles;
	}
}

UIKit.style = styles[0]; //default
export default UIKit;