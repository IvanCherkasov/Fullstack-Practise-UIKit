import * as Core from '../../../../core/index';
import * as _ from 'lodash';
import Range_Upper from './upper/index';

class Range_Thumb extends Core.Element {
    private upper: Range_Upper;

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

export default Range_Thumb;