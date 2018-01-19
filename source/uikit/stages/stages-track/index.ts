import Stages from '../index';
import * as Core from '../../core/index';

class Stages_Track extends Core.Element {

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        type: string,
        protected defaultParameters: Core.TParameters,
        private storageInvert: boolean) {
            super(dom, mediator, type, defaultParameters);
            this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.acceptEvents();
    }

    protected build() {
        this.dom.empty();
        let orientation = ['width', 'left'];
        if (this.orientation === Stages.ORIENTATIONS.VERTICAL) {
            orientation = ['height', 'top'];
        }
        const stagesCount = this.defaultParameters['maximum'];
        const percent = 100 / (stagesCount - 1);
        const stageDom = $('<div>').addClass('uikit-stages-stage');
        const captionDom = $('<div>').addClass('uikit-stage-caption');
        const betweenDom = $('<div>')
            .addClass('uikit-stages-between')
            .css(orientation[0], percent + '%');

        let shift: number = 0;
        for (let i = 1; i <= stagesCount - 1; i += 1) {
            betweenDom.css(orientation[1], shift + '%');
            shift += percent;
            this.dom.append(betweenDom.clone());
        }

        for (let i = 1; i <= stagesCount; i += 1) {
            const clone = stageDom.clone()
                .append(
                    captionDom.clone()
                    .html('<span>' + i + '</span>'));
            this.dom.append(clone);
        }
    }

    private acceptEvents() {
        const mediatorSubscribeModelStage = (modelData) => {
            let betweens = this.dom.find('.uikit-stages-between');
            if (this.storageInvert) {
                betweens = $(betweens.get().reverse());
            }

            const betweensEachMap = (item, i) => {
                if (i < (modelData.stage - 1)) {
                    $(item).addClass('staged');
                } else {
                    $(item).removeClass('staged');
                }
            };
            betweens.toArray().map(betweensEachMap);

            const stagesEachMap = (item, i) => {
                if (i <= (modelData.stage - 1)) {
                    $(item).addClass('staged');
                } else {
                    $(item).removeClass('staged');
                }
            };
            this.dom.find('.uikit-stages-stage').toArray().map(
                stagesEachMap);
        };
        this.mediator.subscribe('model.stage', mediatorSubscribeModelStage);
    }
}

export default Stages_Track;
