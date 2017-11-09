import './index.styl';
import './uikit-stages-stage/index';
import './uikit-stages-between/index';
import UIKit from '../../uikit-core/index';

class UIKitStages_Track extends UIKit.Core.UIKitElement {

    private invert: boolean = false;

    constructor(element, mediator, type, invert: boolean) {
        // @ts-ignore
        super(element, mediator, type);
        this.invert = invert;

        if (this.invert === true && this.Type === 'vertical') {
            const addClassInvert = () => {
                this.element.addClass('invert');
            };
            setTimeout(addClassInvert, 0);
        }

        let orientation: string[] = ['', ''];
        if (this.Type === 'horizontal') {
            orientation = ['width', 'left'];
        } else if (this.Type === 'vertical') {
            orientation = ['height', 'top'];
        }

        const stages = this.Mediator.getData('model.stages');
        const percent = 100 / (stages - 1);
        const stageDom = $('<div>').addClass('uikit-stages-stage');
        const captionDom = $('<div>').addClass('uikit-stage-caption');
        const betweenDom = $('<div>')
            .addClass('uikit-stages-between')
            .addClass(this.Type)
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
            if (this.invert) {
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

        this.Mediator.subscribe(
            'model.stage',
            mediatorSubscribeModelStageCallback);
        this.acceptType();
    }
}

export default UIKitStages_Track;
