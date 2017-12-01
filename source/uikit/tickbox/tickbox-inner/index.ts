import './index.styl';
import * as UIKit from '../../uikit-core/index';

class Tickbox_Inner extends UIKit.Core.Component {
    constructor(element: JQuery, mediator: UIKit.Core.Mediator, type: string) {
        super(element, mediator, type);
        this.initialize();
    }

    protected initialize() {
        const mediatorModelChecked = (modelData) => {
            // подпись на изменение model.checked
            // но ничего не делаем, так как внешний вид
            // меняется через стили
        };
        this.mediator.subscribe('model.checked', mediatorModelChecked);
        super.initialize();
    }
}

export default Tickbox_Inner;
