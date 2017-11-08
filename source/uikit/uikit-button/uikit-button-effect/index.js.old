import './index.styl'
import UIKit from '../../uikit-core/index.ts'

class UIKitButton_Effect extends UIKit.Core.UIKitElement{
	constructor(dom, mediator){
		super(dom, mediator);
		var that = this;

		this.Mediator.subscribe('button.click', function(event){
			//включение анимации
			var target = $(event.currentTarget);
			var offset = target.offset();
            var x = event.pageX - offset.left;
            var y = event.pageY - offset.top;
            that.element.removeClass('animate');
            var size = Math.max(target.outerWidth(), target.outerHeight());
			that.element.css("top", y - size/2).css("left", x  - size/2).css("width", size).css("height", size);
			that.element.addClass("animate");
		});
	}
}

export default UIKitButton_Effect;