import './index.styl'
import UIKit from '../../uikit-core/index'

class UIKitToggle_Thumb extends UIKit.Core.UIKitElement{
  constructor(element:any, mediator, type){
    //@ts-ignore
    super(element, mediator, type);
    let that = this;

    this.Mediator.subscribe('model.checked', function(modelData){
      if (modelData.checked){
				that.element.addClass('checked');
			} else {
				that.element.removeClass('checked');
			}
    });

    this.acceptType();
  }
}

export default UIKitToggle_Thumb;
