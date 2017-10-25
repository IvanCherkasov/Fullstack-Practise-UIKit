class UIKitElement{// AbstractBase
	constructor(dom, model, eventsList){
		if (dom !== undefined && dom !== null){
			var that = this;
			this.element = dom;

			if (model !== undefined && model !== null){
				this.Model = model;
			}

			if (eventsList !== undefined && eventsList !== null){
				this.EventsList = eventsList;
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

class UIKitEvent{
	constructor(){
		this._callbacks = []
	}

	addCallback(f){
		if (typeof f === 'function'){
			this._callbacks.push(f);
		} else throw ReferenceError('Входящий параметр не является функцией!');
	}

	dispatch(...args){
		this._callbacks.forEach(function(event){
			event(...args);
		});
	}
}

class UIKitEventsList{
	constructor(list){
		this._events = {}
		if (list !== null && list !== undefined){
			if (Array.isArray(list)){
				if (list.length > 0){
					this._list = list;
				}
			}
		}
	}

	get(name){
		return this._events[name];
	}

	add(name, f){
		var that = this;
		var _addCallback = function(name, f){
			var getted = that._events[name];
			if (getted !== undefined){
				getted.addCallback(f);
			} else {
				var event = new UIKitEvent();
				event.addCallback(f);
				that._events[name] = event;
			}
		}

		if (this._list){
			if (this._list.includes(name)){
				_addCallback(name, f);
				return true;
			}
			return false;
		}
		_addCallback(name, f);
		return true;
	}

	dispatch(name, ...args){
		var getted = this._events[name];
		if (getted !== undefined){
			getted.dispatch(...args);
			return true;
		}
		return false;
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
	constructor(isLogging){
		var that = this;
		this.channels = {}
		this._isLogging = false;
		if (isLogging){
			if (typeof isLogging === 'boolean'){
				this._isLogging = isLogging;
			}
		}
		this._log = function(logText){
			if (this._isLogging){
				console.log(logText);
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

	publish(channel, ...agrs){
		var that = this;
		if (!this.channels[channel]){
			return false;
		}

		that._log('try publish');
		that._log("		channel: " + channel + '; args: ' + args);
		this.channels[channel].forEach(function(subscription, index){
			that._log('		subscriber{ index: ' + index + ' context: ' + subscription + ' }');
			subscription.callback.apply(args);
		});
		that._log('publish success');

		return true;
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

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitEvent: UIKitEvent,
		UIKitEventsList: UIKitEventsList,
		UIKitMath: UIKitMath,
		UIKitCoordinateSystem: UIKitCoordinateSystem,
		UIKitMediator: UIKitMediator
	}
}
export default UIKit;