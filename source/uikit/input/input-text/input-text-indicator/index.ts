import * as Core from '../../../core/index';
import InputText_Caption from './input-text-indicator-caption/index';

class InputText_Indicator extends Core.Element {

    private indicatorCaption: InputText_Caption;

    constructor (
        dom: JQuery,
        mediator: Core.Mediator,
        type: string,
        defaultParameters: Core.TParameters) {
            super(dom, mediator, type, defaultParameters);
            this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        const enabled: boolean = (this.defaultParameters['indicator.enabled'] === 'true');
        this.dom.attr('data-status', `${this.defaultParameters['indicator.enabled']}`);
        this.enabled = enabled;
    }

    protected build() {
        this.dom.empty();
        const domCaption = $('<div>')
            .addClass('uikit-indicator-caption')
            .attr('data-text-ok', this.defaultParameters['indicator.caption.ok'])
            .attr('data-text-error', this.defaultParameters['indicator.caption.error']);
        this.dom.append(domCaption);
        this.indicatorCaption = new InputText_Caption(
            domCaption,
            this.mediator,
            this.orientation,
            this.defaultParameters,
        );
    }

    private applyEvents() {
        const mediatorSubscribeIndicatorEnabled = (indicatorEnabled) => {
            if (indicatorEnabled) {
                const enabled: boolean = (indicatorEnabled === 'true');
                this.enabled = enabled;
            }
        };
        const mediatorSubscribeIndicatoStatus = (indicatorStatus) => {
            if (indicatorStatus) {
                this.dom.attr('data-status', `${indicatorStatus}`);
            }
        };
        this.mediator.subscribe('parameters.indicator.status', mediatorSubscribeIndicatoStatus);
        this.mediator.subscribe('parameters.indicator.enabled', mediatorSubscribeIndicatorEnabled);
    }
}

export default InputText_Indicator;
