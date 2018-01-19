import * as Core from '../../../core/index';
import * as _ from 'lodash';
import Range_Fill from './fill/index';
import Range_Thumb from './thumb/index';

class Range_Track extends Core.Element {
    private fill: Range_Fill;
    private thumb: Range_Thumb;

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

export default Range_Track;
