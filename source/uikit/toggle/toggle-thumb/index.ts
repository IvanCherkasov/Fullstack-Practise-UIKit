import * as UIKit from '../../uikit-core/index';

class Toggle_Thumb extends UIKit.Core.Element{
  constructor(
      dom: JQuery,
      mediator: UIKit.Core.Mediator,
      type: string) {
    super(dom, mediator, type);
    this.initialize();
  }

  protected initialize() {
      this.mediator.subscribe('model.checked', (modelData) => {
        if (modelData.checked) {
                  this.dom.addClass('checked');
              } else {
                  this.dom.removeClass('checked');
              }
      });
  }
}

export default Toggle_Thumb;
