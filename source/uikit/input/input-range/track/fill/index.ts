import * as Core from '../../../../core/index';
import * as _ from 'lodash';
import Range_Filled from './filled/index';

class Range_Fill extends Core.Element {
    private filled: Range_Filled;

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        protected defaultParameters: Core.TParameters,
    ) {
        super(dom, mediator, orientation, defaultParameters);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        
    }

    private applyEvents() {

    }
}

export default Range_Fill;
