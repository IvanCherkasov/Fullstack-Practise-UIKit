import Mediator from '../mediator/index';

abstract class Element {
    private storageType: string = '';

    public static create(dom: JQuery): Element {
        return undefined;
    }

    constructor(
        protected dom: JQuery,
        protected mediator: Mediator,
        type: string,
        protected attributes: object) {
            if (!this.dom || this.dom === null) {
                throw ReferenceError('Component is empty!');
            }
            this.storageType = type;
    }

    public get type(): string {
        return this.storageType;
    }
}

export default Element;
