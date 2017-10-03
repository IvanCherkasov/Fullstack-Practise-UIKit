class UIKitElement{
	constructor(element){
		this.element = element;
		this.EventsList = new UIKitEventsList();
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

	setCallback(value){
		this._callbacks.push(value);
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

	addEvent(event, f){
		if (!this.exists(event.name)){
			event.setCallback(f);
			this._events.push(event);
		}
	}

	exists(name){
		this._events.forEach(function(event){
			if (event.name === name) return true;
		});
		return false;
	}
}

(function($){
  	jQuery.fn.UIKit = function(option){
		if (option){
			return new option(this);
		}
		return this;
	}

	jQuery.UIKit = {
		Core: {
			UIKitElement: UIKitElement,
			UIKitFragment: UIKitFragment,
			UIKitEvent: UIKitEvent,
			UIKitEventsList: UIKitEventsList
		}
	};
	
})(jQuery);

console.log($.UIKit);