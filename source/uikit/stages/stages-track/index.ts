import './index.styl';
import './stages-stage/index';
import './stages-between/index';
import * as UIKit from '../../uikit-core/index';

class Stages_Track extends UIKit.Core.Component {

    constructor(element, mediator, type, invert: boolean) {
        super(element, mediator, type);
        this.storage['invert'] = invert;
        this.initialize();
    }

    protected initialize() {
        if (this.storage.invert === true) {
            if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_VERTICAL) > -1) {
                const addClassInvert = () => {
                this.element.addClass('invert');
                };
                setTimeout(addClassInvert, 0);
            }
        }

        // базовый
        let typeClass = 'horizontal';
        let orientation = ['width', 'left'];

        if (this.type.indexOf(UIKit.Core.Types.ORIENTATION_VERTICAL) > -1) {
            orientation = ['height', 'top'];
            typeClass = 'vertical';
        }

        const stages = this.mediator.getData('model.stages');
        const percent = 100 / (stages - 1);
        const stageDom = $('<div>').addClass('uikit-stages-stage');
        const captionDom = $('<div>').addClass('uikit-stage-caption');
        const betweenDom = $('<div>')
            .addClass('uikit-stages-between')
            .addClass(typeClass)
            .css(orientation[0], percent + '%');



        let shift: number = 0;
        for (let i = 1; i <= stages - 1; i += 1) {
            betweenDom.css(orientation[1], shift + '%');
            shift += percent;
            this.element.append(betweenDom.clone());
        }

        for (let i = 1; i <= stages; i += 1) {
            const clone = stageDom.clone()
                .append(
                    captionDom.clone()
                    .html('<span>' + i + '</span>'));
            this.element.append(clone);
        }

        const mediatorSubscribeModelStageCallback = (modelData) => {
            let betweens = this.element.find('.uikit-stages-between');
            if (this.storage.invert) {
                betweens = $(betweens.get().reverse());
                console.log(betweens);
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
            this.element.find('.uikit-stages-stage').toArray().map(
                stagesEachMap);
        };

        this.mediator.subscribe(
            'model.stage',
            mediatorSubscribeModelStageCallback);

        super.initialize();
    }
}

export default Stages_Track;
