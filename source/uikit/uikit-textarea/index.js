import './index.styl'
import UIKit from '../uikit-core/index.ts'

class UIKitTextarea extends UIKit.Core.UIKitElement {
    constructor(dom) {
        super(dom);
    if (!this.element.hasClass('uikit-textarea')) {
      throw new ReferenceError('Элемент не является многострочный полем ввода uikit');
    }
    let that = this;

		this.Caption = this.element.attr('caption');
		this.Model = new UIKitTextarea_Model();
		this.Mediator = new UIKit.Core.UIKitMediator(this.Model);

		this.element.focusin(function(){
			var value = that.element.val();
			if (typeof value === 'string'){
				if (value === that.Caption){
					that.element.val('');
				}
			}
		});

		this.element.focusout(function(){
			var value = that.element.val();
			if (typeof value === 'string'){
				value = value.trim();
				if (value === ''){
					that.element.val(that.Caption);
				}
			}
		});

		this.Mediator.subscribe('model.text', function(modelData){
			that.element.val(modelData.text);
		});
	}

	get text(){
		return this.Mediator.getData('model.text');
	}

	set text(value){
		if (typeof value === 'string'){
			this.Mediator.setData('model.text', value);
		}
	}
}

class UIKitTextarea_Model extends UIKit.Core.UIKitModel{
	constructor(){
		super({
			_text: '',
			get text(){
				return this._text;
			}
		})
	}
}

UIKit.Core.UIKitTextarea = UIKitTextarea;
