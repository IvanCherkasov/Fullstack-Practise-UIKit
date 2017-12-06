import Types from '../types/index';
import Mediator from '../mediator/index';
import Model from '../model/index';
import Utils from '../utils/index';

export abstract class Component {
    private storageType: string = '';
    private storageEnabled: boolean = true;
    private storageVariant: string = '';

    protected abstract build();
    protected mediator: Mediator;
    protected typeChangingNeedRebuild: boolean = false;
    protected availableTypes: Types;
    protected availableVariants: Types;
    protected isBuilded: boolean = false;

    public static create(dom: JQuery): Component {
        return undefined;
    }

    constructor(protected dom: JQuery) {
        if (!this.dom || this.dom === null) {
            throw ReferenceError('Component is empty!');
        }
        if (!Utils.isUikit(this.dom)) {
            throw ReferenceError('Component is not UIKit object!');
        }

        if (this.dom.attr('data-enabled') === 'false') {
            this.enabled = false;
        }
    }

    public get type(): string {
        return this.storageType;
    }

    public set type(value: string) {
        if (this.availableTypes.contains(value)) {
            if (value !== this.storageType) {
                this.storageType = value;
                if (this.isBuilded) {
                    this.dom.attr('data-type', this.storageType);
                    if (this.typeChangingNeedRebuild) {
                        this.build();
                    } else {
                        this.mediator.publish('component.typeChanged');
                    }
                }
            }
        }
    }

    public get variant(): string {
        return this.storageVariant;
    }

    public set variant(value: string) {
        if (this.availableVariants.contains(value)) {
            if (value !== this.storageVariant) {
                this.storageVariant = value;
                this.dom.attr('data-variant', this.storageVariant);
                this.mediator.publish('component.variantChanged');
            }
        }
    }

    public get enabled(): boolean {
        return this.storageEnabled;
    }

    public set enabled(value: boolean) {
        this.dom.attr('data-enabled', `${value}`);
        this.storageEnabled = value;
        if (this.mediator) {
            this.mediator.publish('component.enabled', value);
        }
    }

    public on(channel: string, callback: Function) {
        this.mediator.subscribe(channel, callback);
    }
}

export default Component;
