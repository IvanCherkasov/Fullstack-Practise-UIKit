import './index.styl'
import UIKit from '../../uikit-core/index'

class UIKitButton_Caption extends UIKit.Core.UIKitElement{
    constructor(element: any, mediator?, type?: string){
        //@ts-ignore
        super(element, mediator, type);
        let that = this;

        this.Mediator.subscribe('button.caption', function(caption){
			that.element.text(caption);
		});
    }
}

export default UIKitButton_Caption;