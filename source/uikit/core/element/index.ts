import Mediator from '../mediator/index';
import { TParameters } from '../index';

abstract class Element {
    private storageOrientation: string = '';
    private storageEnabled: boolean = true;

    protected abstract build();
    protected isBuilded: boolean = false;

    constructor(
        protected dom: JQuery,
        protected mediator: Mediator,
        orientation: string,
        protected defaultParameters?: TParameters) {
            if (!this.dom || this.dom === null) {
                throw ReferenceError('Component is empty!');
            }
            this.storageOrientation = orientation;
            if (!this.dom.attr('data-enabled')) {
                this.dom.attr('data-enabled', 'true');
            }
    }

    public get orientation(): string {
        return this.storageOrientation;
    }

    public get enabled(): boolean {
        return this.storageEnabled;
    }

    public set enabled(value: boolean) {
        this.dom.attr('data-enabled', `${value}`);
        this.storageEnabled = value;
        if (this.mediator) {
            this.mediator.publish('enabled', value);
        }
    }
}

export default Element;
