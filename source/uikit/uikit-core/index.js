class UIKitElement{
	constructor(dom, eventsList){
		if (dom !== null && dom !== undefined){
			var that = this;
			this.element = dom;
			if (eventsList === null || eventsList === undefined){
				this.EventsList = new UIKitEventsList(); //Создает новый eventsList, если данный элемент корневой
			} else {
				this.EventsList = eventsList; //Произошла передача уже созданного eventsList от родительского элемента
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

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitEvent: UIKitEvent,
		UIKitEventsList: UIKitEventsList
	}
}
export default UIKit;