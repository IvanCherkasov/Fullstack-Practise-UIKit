class UIKitElement{
	constructor(element){
		this.element = element;
		this.EventsList = new UIKitEventsList();
	}

	static Get(obj){
		if (obj.data(this.name)){
			console.log('экземпляр взят из data');
			return obj.data(this.name);
		}
		var inst = new this(obj);
		obj.data(this.name, inst);
		console.log('создан новый экземпляр и помещен в data');
		return inst;
	}
}

class UIKitFragment{
	constructor(element, eventsList){
		this.element = element;
		this.EventsList = eventsList;
	}
}

class UIKitEvent{
	constructor(name){
		this.name = name;
		this._callbacks = [];
	}

	setCallback(f){
		this._callbacks.push(f);
	}

	dispatch(...args){
		this._callbacks.forEach(function(event){
			event(...args);
		});
	}
}

class UIKitEventsList{
	constructor(){
		this._events = [];
	}

	getEvent(name){
		var _event = undefined;
		this._events.forEach(function(event){
			if (event.name === name) {
				_event = event;
				return;
			}
		});
		return _event;
	}

	addEvent(eventName, f){
		var event = new UIKitEvent(eventName);
		if (!this.exists(event.name)){
			event.setCallback(f);
			this._events.push(event);
		} else {
			this.getEvent(eventName).setCallback(f);
		}
	}

	exists(name){
		var exist = false;
		this._events.forEach(function(event){
			if (event.name === name) {
				exist = true;
				return;
			}
		});
		return exist;
	}
}

var UIKit = {
	Core: {
		UIKitElement: UIKitElement,
		UIKitFragment: UIKitFragment,
		UIKitEvent: UIKitEvent,
		UIKitEventsList: UIKitEventsList
	}
}
export default UIKit;