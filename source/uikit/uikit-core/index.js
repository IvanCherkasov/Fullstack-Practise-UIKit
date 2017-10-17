class UIKitElement{
	constructor(dom, model){
		if (dom !== null && dom !== undefined){
			var that = this;
			this.element = dom;
			if (model !== null && model !== undefined){
				this.Model = model;
			}
		} else throw ReferenceError('Элемент пустой');
	}

	toggleClass(className){
		if (this.element.hasClass(className)){
			this.element.removeClass(className);
		} else {
			this.element.addClass(className);
		}
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
	constructor(){
		this._events = {}
	}

	get(name){
		return this._events[name];
	}

	add(name, f){
		var getted = this._events[name];
		if (getted !== undefined){
			getted.addCallback(f);
		} else {
			var event = new UIKitEvent();
			event.addCallback(f);
			this._events[name] = event;
		}
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

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitEvent: UIKitEvent,
		UIKitEventsList: UIKitEventsList,
		UIKitMath: UIKitMath
	}
}
export default UIKit;