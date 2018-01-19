import * as Core from '../../../../../core/index';
import * as _ from 'lodash';

class Range_Filled extends Core.Element {
    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        protected defaultParameters: Core.TParameters,
    ) {
        super(dom, mediator, orientation, defaultParameters);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        
    }

    private applyEvents() {

    }
}

export default Range_Filled;