import Orientations from '../orientations/index';
import Mediator from '../mediator/index';
import Model from '../model/index';
import { TParameters } from '../index';

export abstract class Component {
    private storageOrientation: string = '';
    private storageEnabled: boolean = true;
    private storageVariant: string = '';

    protected abstract build();
    protected mediator: Mediator;
    protected orientationChangingNeedRebuild: boolean = false;
    protected availableOrientations: Orientations;
    protected availableVariants: Orientations;
    protected isBuilded: boolean = false;

    public static create(dom: JQuery): Component {
        return undefined;
    }

    constructor(protected dom: JQuery) {
        if (!this.dom || this.dom === null) {
            throw ReferenceError('Component is empty!');
        }
        
        if (!dom.hasClass('uikit')) {
            dom.addClass('uikit');
        }

        if (this.dom.attr('data-enabled') === 'false') {
            this.enabled = false;
        }
    }

    /**
     * Применит ориентацию из списка из аттрибута 'data-orientation', либо дефолтный 
     * Данная функция выставит "orientationChangingNeedRebuild = false"
     */
    protected acceptOrientation(orientations: object, defaultOrientation: string) {
        this.orientationChangingNeedRebuild = false;
        this.availableOrientations = new Orientations(orientations);
        const orientation = this.dom.attr('data-orientation');
        if (this.availableOrientations.contains(orientation)) {
            this.orientation = orientation;
        } else {
            this.orientation = defaultOrientation;
        }
    }

    public get orientation(): string {
        return this.storageOrientation;
    }

    public set orientation(value: string) {
        if (this.availableOrientations.contains(value)) {
            if (value !== this.storageOrientation) {
                this.storageOrientation = value;
                this.dom.attr('data-orientation', this.storageOrientation);
                if (this.isBuilded) {
                    if (this.orientationChangingNeedRebuild) {
                        this.build();
                    } else {
                        this.mediator.publish('orientationChange');
                    }
                }
            }
        }
    }

    public get variant(): string {
        return this.storageVariant;
    }

    public set variant(value: string) {
        let val = value;
        if (!this.availableVariants.contains(val)) {
            val = this.availableVariants.getValues()[0];
        }

        if (val !== this.storageVariant) {
            this.storageVariant = val;
            if (this.isBuilded) {
                this.dom.attr('data-variant', this.storageVariant);
                this.mediator.publish('component.variantChanged', this.storageVariant);
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
            this.mediator.publish('enabled', value);
        }
    }

    public on(channel: string, callback: Function) {
        this.mediator.subscribe(channel, callback);
    }

    public get parameters(): TParameters {
        return {};
    }

    public set parameters(newParams: TParameters) {

    }

    public get name(): string {
        return (<any>this).constructor.name;
    }
}

export default Component;
