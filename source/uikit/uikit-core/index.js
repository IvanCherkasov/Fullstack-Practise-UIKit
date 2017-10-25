class UIKitElement{// AbstractBase
	constructor(dom, mediator){
		if (dom !== undefined && dom !== null){
			var that = this;
			this.element = dom;

			if (mediator !== undefined && mediator !== null){
				this.Mediator = mediator;
			}

		} else throw ReferenceError('Элемент пустой');
	}

	reStyle(typesList, ...args){
		//typeList - array, список классов string
		//args - array, список классов string
		var that = this;
		var toDelete = []; //список типов которые есть в typesList но нету в args
		typesList.forEach(function(item){
			if (!args.includes(item)){
				toDelete.push(item);
			}
		});
		toDelete.forEach(function(item){
			that.element.removeClass(item);
		});
		args.forEach(function(item){
			that.element.addClass(item);
		});
	}
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
	constructor(Model, logsList){
		var that = this;
		this.channels = {}
		this._isLogging = false;
		this._logsList = [];
		this._model = Model;
		if (logsList){
			if (Array.isArray(logsList)){
				this._logsList = logsList;
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

	setData(name, value){
		if (this._model[name] !== undefined){
			this._model[name] = value;
			value = this._model[name]; //на случай если модель как-то фильтрует значения
			this.publish(name, value);
			if (this.isLogging){
				this._logsList.forEach(function(log){
					log('mediator set data', {
						name: name,
						data: value
					});
				});
			}
		} else {
			console.error('no such property named "' + name + '"');
		}
	}

	getData(name){
		if (this._model[name] !== undefined){
			return this._model[name];
		}
	}

	get isLogging(){
		return this._isLogging;
	}

	set isLogging(value){
		if (value){
			if (typeof value === 'boolean'){
				this._isLogging = value;
			}
		}
	}	
}

class UIKitLogger{
	constructor(){

	}


}

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitMath: UIKitMath,
		UIKitCoordinateSystem: UIKitCoordinateSystem,
		UIKitMediator: UIKitMediator,
		UIKitLogger: UIKitLogger
	}
}
export default UIKit;