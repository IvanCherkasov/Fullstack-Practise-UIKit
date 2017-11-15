import './index.styl';
import UIKit from '../../uikit-core/index';

class UIKitToggle_Thumb extends UIKit.Core.UIKitElement{
  constructor(element:any, mediator, type) {
    super(element, mediator, type);
    this.init();
  }

  protected init() {
      this.mediator.subscribe('model.checked', (modelData) => {
        if (modelData.checked) {
                  this.element.addClass('checked');
              } else {
                  this.element.removeClass('checked');
              }
      });
  }
}

export default UIKitToggle_Thumb;
