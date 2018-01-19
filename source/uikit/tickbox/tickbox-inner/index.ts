import * as Core from '../../core/index';

class Tickbox_Inner extends Core.Element {
    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        protected defaultParameters: Core.TParameters) {
            super(dom, mediator, orientation, defaultParameters);
            this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        // ---
    }

    private applyEvents() {
        const mediatorModelChecked = (modelData) => {
            // подпись на изменение model.checked
            // но ничего не делаем, так как внешний вид
            // меняется через стили
        };
        this.mediator.subscribe('model.checked', mediatorModelChecked);
    }
}

export default Tickbox_Inner;
