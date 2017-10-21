class UIKitElement{
	constructor(dom, model, eventsList){
		if (dom !== null && dom !== undefined){
			var that = this;
			this.element = dom;
			if (model !== null && model !== undefined){
				this.Model = model;
			}
			if (eventsList !== null && eventsList !== undefined){
				this.EventsList = eventsList;
			}
		} else throw ReferenceError('Элемент пустой');
	}

	static Get(obj){
		if (!obj){
			throw new ReferenceError('Элемент пустой');
		}
		if (obj.data(this.name)){
			return obj.data(this.name);
		}
		var inst = new this(obj);
		obj.data(this.name, inst);
		return inst;
	}

	reStyle(typesList, ...args){

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

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitEvent: UIKitEvent,
		UIKitEventsList: UIKitEventsList,
		UIKitMath: UIKitMath,
		UIKitCoordinateSystem: UIKitCoordinateSystem
	}
}
export default UIKit;