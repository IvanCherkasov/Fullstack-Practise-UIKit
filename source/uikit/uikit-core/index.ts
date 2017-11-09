import './uikit-styles.styl'
import $ from 'jquery'

interface CoreObjects{
	[key: string]: any
}

class UIKitElement{

    private _typesList: string[];
    private _original: any;
    private _enabled: boolean = true;

    constructor(private _element: any, private _mediator?: UIKitMediator, private _type?: string){
        if (_element && _element !== null){
            if (!(_element instanceof $)){
                if (_element instanceof HTMLCollection){
                    _element = $(_element);
                } else {
                    throw ReferenceError('Переданный элемент не является объектом jQuery или HTMLCollection');
                }
            }
            this._original = _element.clone();
        } else {
            throw ReferenceError('Передан пустой элемент');
        }
    }

    protected _init(): void{

    }

    protected rebuild(): void{
        let that = this;
        let parent = this._element.parent();
        let spawned = false;

        let attributes = [];
		this._element.each(function(){
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
			if ($(this).is(that._element)) {
				index = i;
				return;
			}
		});

		this._element.remove();
        this._element = this.Original.clone();

        attributes.map(function(attr){
			if (attr.name !== 'class'){
				that._element.attr(attr.name, attr.value);
			}
        });

        parent.children().each(function(i){UIKitModel
			if (i === index){
				$(this).before(that._element);
				spawned = true;
				return;
			}
        });

        if (!spawned){
			parent.append(this._element);
        }

        this._element.attr('type', this.Type);

        this._element.ready(function(){
			setTimeout(function(){
				that._init();
			}, 0);
		});
    }

    protected clearStyle(): void{
        var that = this;
		UIKit.styles.forEach(function(item){
			that._element.removeClass(item);
		});
    }

    protected acceptType(): void{
        if (!this._element.hasClass(this.Type)){
			var baseClasses = this.Original.attr('class');
			this._element.attr('class', '');
			this._element.attr('class', baseClasses);
			this._element.addClass(this.Type);
		}
    }

    protected stylize(type: string){
        this._element.addClass(type);
    }

    protected get TypesList(): string[]{
        return this._typesList;
    }

    protected set TypesList(value: string[]){
        this._typesList = value;
    }

    protected get Original(): any{
        return this._original;
    }

    protected get element(){
        return this._element;
    }

    public get Mediator(): UIKitMediator{
        return this._mediator;
    }

    public set Mediator(value: UIKitMediator){
        this._mediator = value;
    }

    public get Type(): string{
        return this._type;
    }

    public set Type(value: string){
        this._type = value;
    }

    public get type(): string{
        return this._type;
    }

    public set type(value: string){
        if (this.TypesList.indexOf(value) > -1){
            this._type = value;
            this.rebuild();
        }
    }

    public get enabled(): boolean{
        return this._enabled;
    }

    public set enabled(value: boolean){
        this._enabled = value;
        if (value){
            this._element.removeClass('disabled');
        } else {
            this._element.addClass('disabled');
        }
        if (this.Mediator){
            this.Mediator.publish('element.enabled', value);
        }
    }

    public set style(value: string){
        let that = this;
        if (UIKit.styles.indexOf(value) > -1){
            that.clearStyle();
            that._element.addClass(value);
            if (this.Mediator){
				this.Mediator.publish('element.style', name);
			}
        }
    }

}

class UIKitMath{
	constructor(){}
	static Clamp(value, min, max){
		return Math.min(Math.max(min, value), max);
	}
}

class UIKitMediator{

    private _channels = {}
    private _middleware = []

    constructor(private _model: UIKitModel, middleware?: any){
        var that = this;
		if (middleware){
			if (Array.isArray(middleware)){
				this._middleware = middleware;
			}
		}
    }

    public subscribe(channel: string, func): void{
        if (!this._channels[channel]){
			this._channels[channel] = [];
		}
		this._channels[channel].push({
			callback: func
		});
    }

    public publish(channel: string, ...args: any[]): boolean{
        var that = this;
		if (!this._channels[channel]){
			return false;
		}

		this._channels[channel].forEach(function(subscription){
			subscription.callback(...args);
		});

		return true;
    }

    public getData(property: string): any{
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

    public setData(property: string, data: any): boolean{
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

		this._middleware.forEach(function(func){
			func('mediator set data', {
				property: property,
				data: data
			});
		});
    }
}

class UIKitModel{

    public Data = {}

    constructor(data?: any){
		if (data !== null){
			this.Data = data;
		}
	}

	getData(property: string){}
	setData(property:string, data:any){}
}

class UIKitCoordinateSystem{

    private _element: any;

    constructor(dom){
        this._element = dom;
		let that = this;
    }

    public get xMin(){
		if (this._element){
			return this._element.offset().left;
		}
		return 0;
	}

	public get yMin(){
		if (this._element){
			return this._element.offset().top;
		}
		return 0;
	}

	public get xMax(){
		if (this._element){
			return this._element.offset().left + this._element.width();
		}
		return 0;
	}

	public get yMax(){
		if (this._element){
			return this._element.offset().top + this._element.height();
		}
		return 0;
	}

	public get width(){
		if (this._element){
			return this._element.width();
		}
		return 0;
	}

	public get height(){
		if (this._element){
			return this._element.height();
		}
		return 0;
	}
}

let style = '';
let styles: string[] = [];

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

class UIKit{

	public static Core: CoreObjects = {
		'UIKitElement': UIKitElement,
		'UIKitMath': UIKitMath,
		'UIKitCoordinateSystem': UIKitCoordinateSystem,
		'UIKitMediator': UIKitMediator,
		'UIKitModel': UIKitModel
	}

	public static set style(name){
		if (styles.indexOf(name) > -1){
			styles.forEach(function(item){
				$('body').removeClass(item);
			});
			$('body').addClass(name);
			style = name;
		}
	}

	public static get style(){
		return style;
	}

    public static get styles(): string[]{
        return styles;
    }
}

UIKit.style = styles[0]; //default
export default UIKit;
