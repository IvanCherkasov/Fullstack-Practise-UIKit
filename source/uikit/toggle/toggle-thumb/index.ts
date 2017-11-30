import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Toggle_Thumb extends UIKit.Core.Component{
  constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
    super(element, mediator, type);
    this.initialize();
  }

  protected initialize() {
      this.mediator.subscribe('model.checked', (modelData) => {
        if (modelData.checked) {
                  this.element.addClass('checked');
              } else {
                  this.element.removeClass('checked');
              }
      });
  }
}

export default Toggle_Thumb;
