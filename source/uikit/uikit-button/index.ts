import './index.styl'
import UIKit from '../uikit-core/index'
import UIKitButton_Caption from './uikit-button-caption/index'
import UIKitButton_Effect from './uikit-button-effect/index'

class UIKitButton extends UIKit.Core.UIKitElement{

	private _model: any;
		
	private Caption;
	private Radial;

    constructor(element: any){
		//@ts-ignore
		super(element);
		
        let that = this;

        this._model = new UIKitButton_Model();
        this.Mediator = new UIKit.Core.UIKitMediator(this._model);
		
		this.Caption = new UIKitButton_Caption(
			this.element.find('.uikit-button-caption'),
			this.Mediator
			);

		this.Radial = new UIKitButton_Effect(
			this.element.find('.uikit-button-effect'),
			this.Mediator
			);

        this.element.on('click', function(event){
			that.Mediator.publish('button.click', event); //запуск анимации у элемента effect
			event.stopPropagation();
		});

		this.element.on('mouseenter', function(){
			that.Mediator.publish('button.hover', true); //обработка наведения там, где это невозможно сдлать через стили
		});

		this.element.on('mouseleave', function(){
			that.Mediator.publish('button.hover', false); //обработка наведения там, где это невозможно сдлать через стили
		});

		this.caption = this.element.attr('caption');
	}
	
	public set caption(value: string){
		this.Mediator.publish('button.caption', value);
	}
}

class UIKitButton_Model extends UIKit.Core.UIKitModel{
	constructor(){
        //@ts-ignore
		super();
	}
}

UIKit.Core.UIKitButton = UIKitButton;