import * as Core from '../../../../core/index';

class InputText_Caption extends Core.Element {

    private domCaption: JQuery;

    constructor (
        dom: JQuery,
        mediator: Core.Mediator,
        type: string,
        parameters?: {[key: string]: any}) {
            super(dom, mediator, type, parameters);
            this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();

        const statusText = this.getStatusText(this.defaultParameters);
        this.dom.text(statusText);

        const enabled: boolean = (this.defaultParameters['indicator.caption.enabled'] === 'true');
        this.enabled = enabled;
    }

    protected build() {
        this.dom.empty();
    }

    private applyEvents() {
        const mediatorSubscribeIndicatorStatus = (indicatorStatus) => {
            if (indicatorStatus) {
                const statusText = this.getStatusText(indicatorStatus);
                this.dom.text(statusText);
            }
        };
        this.mediator.subscribe('parameters.indicator.status', mediatorSubscribeIndicatorStatus);
    }

    private getStatusText(status): string {
        switch (status) {
            case 'true':
                return this.defaultParameters['indicator.caption.ok'];
            case 'false':
                return this.defaultParameters['indicator.caption.error'];
            default:
                break;
        }
        return undefined;
    }
}

export default InputText_Caption;
