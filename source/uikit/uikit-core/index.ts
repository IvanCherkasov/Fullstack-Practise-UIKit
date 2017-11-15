import './uikit-styles.styl';
import $ from 'jquery';
import themes from '../themes/load-all';

namespace ElementTypes {
    export enum TArrowButton {
        LEFT,
        RIGHT,
    }

    export enum TSlider {
        HORIZONTAL,
        VERTICAL,
    }

    export enum TStages {
        HORIZONTAL,
        VERTICAL,
    }
}

class UIKitComponent {

    protected element: JQuery;
    protected types: object;
    protected mediator: UIKitMediator;
    protected type: string;
    protected storage: {[key: string]: any} = {};

    constructor(element: JQuery, mediator: UIKitMediator, types?: object, type?: string) {
        if (!element || element === null) {
            throw ReferenceError('Передан пустой компонент');
        }
        this.element = element;

        this.storage = {
            enabled: true,
        };

        if (mediator) {
            this.mediator = mediator;
        }

        if (types) {
            this.types = types;
        }

        if (type) {
            this.type = type;
        } else {
            if (types && Object.keys(types).length > 0) {
                this.type = types[0];
            }
        }
    }

    protected init(): void {
    }

    protected get enabled(): boolean {
        return this.storage.enabled;
    }

    protected set enabled(value: boolean) {
        this.storage.enabled = value;
        if (value) {
            this.element.addClass('disabled');
        } else {
            this.element.removeClass('disabled');
        }
        if (this.mediator) {
            this.mediator.publish('element.enabled', value);
        }
    }
}

class UIKitElement {

    protected element: JQuery;
    protected original: JQuery;
    protected mediator: UIKitMediator;
    protected noRebuild: boolean = false;

    protected storage: {[key: string]: any} = {};

    constructor(element: JQuery) {
        if (!element || element === null) {
            throw ReferenceError('Передан пустой элемент');
        }
        if (!element.hasClass('uikit')) {
            throw ReferenceError(
                'Переданный элемент не является объектом uikit');
        }

        this.storage = {
            type: '',
            types: {},
            enabled: true,
        };

        this.element = element;
        this.original = element.clone();

        if (this.element.attr('data-enabled') === 'false') {
            this.enabled = false;
        }
    }

    protected init(): void {
        this.acceptType();
    }

    protected rebuild(): void {
        const parent: JQuery = this.element.parent();
        let spawned: boolean = false;

        let attributes = [];
        const elementEachCallback = (item) => {
            $.each(item.attributes, function () {
                if (this.specified) {
                    attributes.push({
                        name: this.name,
                        value: this.value,
                    });
                }
            });
        };
        this.element.toArray().map(elementEachCallback);

        let index = -1;
        const parentChildrenFindEachCallback = (item, i) => {
            if ($(item).is(this.element)) {
                index = i;
                return;
            }
        };
        parent.children().toArray().map(parentChildrenFindEachCallback);

        this.element.remove();
        this.element = this.original.clone();

        attributes.map((attr) => {
            if (attr.name !== 'class') {
                this.element.attr(attr.name, attr.value);
            }
        });

        const parentChildrenPlaceEachCallback = (item, i) => {
            if (i === index) {
                $(item).before(this.element);
                spawned = true;
                return;
            }
        };
        parent.children().toArray().map(parentChildrenPlaceEachCallback);

        if (!spawned) {
            parent.append(this.element);
        }

        this.element.ready(() => {
            setTimeout(
                () => {
                    this.init();
                },
                0);
        });
    }

    protected initTypes(types: object, type?: any): void {
        if (Object.keys(types).length > 0) {
            this.storage.types = types;
            if (type) {
                if (this.storage.types[type]) {
                    this.storage.type = type;
                }
            } else {
                this.storage.type = types[0];
            }
        }
    }

    // если элементу была присвоена вариация по ходу работы, то
    // смена типа сотрет её
    private acceptType(): void {
        if (this.element.hasClass(this.type) === false) {
            const baseClasses = this.original.attr('class');
            this.element.attr('class', '')
                .attr('class', baseClasses)
                .addClass(this.type);
        }
    }

    public get type(): string {
        return this.storage.type;
    }

    public set type(value: string) {
        if (this.storage.types[value]) {
            this.storage.type = value;
            if (this.noRebuild) {
                this.acceptType();
            } else {
                this.rebuild();
            }
            if (this.mediator) {
                if (this.noRebuild) {
                    this.mediator.publish('element.type');
                } else {
                    this.mediator.publish('element.rebuild');
                }
            }
        }
    }

    public get enabled(): boolean {
        return this.storage.enabled;
    }

    public set enabled(value: boolean) {
        this.storage.enabled = value;
        if (value) {
            this.element.addClass('disabled');
        } else {
            this.element.removeClass('disabled');
        }
        if (this.mediator) {
            this.mediator.publish('element.enabled', value);
        }
    }
}

class UIKitMediator {

    private channels: {[key: string]: Function[]} = {};
    private middleware: any[];
    private model: UIKitModel;

    constructor(model: UIKitModel, middleWare?: Function[]) {
        this.model = model;
        if (middleWare) {
            this.middleware = middleWare;
        }
    }

    public subscribe(channel: string, callback): void {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push(callback);
    }

    public publish(channel: string, ...args: any[]): boolean {
        if (!this.channels[channel]) {
            return false;
        }
        const mapEmitCallback = (callback: Function) => {
            callback(args);
        };
        this.channels[channel].map(mapEmitCallback);
        return true;
    }

    public getData(property: string): any {
        const props: string[] = property.split('.');

        if (props[0] === 'model') {
            const newProps = property.replace('model.', '');
            const data = this.model.getData(newProps);
            if (data !== undefined) {
                return true;
            }
        }

        return undefined;
    }

    public setData(property: string, data: any): boolean {
        const props: string[] = property.split('.');

        const emitMiddlewares = (funcs: Function[]) => {
            funcs.map((func) => {
                func('mediator set data', { property, data });
            });
        };

        if (props[0] === 'model') {
            const newProps = property.replace('model.', '');
            if (this.model.setData(newProps, data)) {
                this.publish(property, this.model.getAllData());
                emitMiddlewares(this.middleware);
                return true;
            }
        }

        return false;
    }
}

class UIKitModel {

    protected data: {[key: string]: any} = {};

    constructor(data?: {[key: string]: any}) {
        if (data) {
            this.data = data;
        }
    }

    public getAllData(): {[key: string]: any} {
        return jQuery.extend(true, {}, this.data);
    }

    public getData(property: string): any {

    }

    public setData(property: string, data: any): boolean {
        return false;
    }
}

class UIKitMath {
    public static clamp(value: number, minimum: number, maximum: number) {
        return Math.min(Math.max(minimum, value), maximum);
    }
}

class UIKitCoordinateSystem {

    private element: JQuery;

    constructor(element: JQuery) {
        if (!element) {
            return undefined;
        }
        this.element = element;
    }

    public get xMin(): number {
        return this.element.offset().left;
    }

    public get yMin(): number {
        return this.element.offset().top;
    }

    public get xMax(): number {
        return this.element.offset().left + this.element.width();
    }

    public get yMax(): number {
        return this.element.offset().top + this.element.height();
    }

    public get width(): number {
        return this.element.width();
    }

    public get height(): number {
        return this.element.height();
    }
}

class UIKitThemeController {

    private storage = {
        themesList: [],
        currentTheme: '',
    };

    constructor(theme?: string) {
        this.storage.themesList = themes.list;
        if (theme) {
            this.theme = theme;
        }
    }

    private changeTheme(value: string) {
        this.themesList.map((item) => {
            $('body').removeClass(item);
        });
        $('body').addClass(value);
        this.storage.currentTheme = value;
    }

    public get themesList(): string[] {
        return this.storage.themesList;
    }

    public get theme(): string {
        return this.storage.currentTheme;
    }

    public set theme(value: string) {
        if (this.themesList.indexOf(value) > -1) {
            this.changeTheme(value);
        }
    }
}

export default {
    Core: {
        UIKitElement,
        UIKitComponent,
        UIKitMediator,
        UIKitModel,
        UIKitMath,
        UIKitThemeController,
        UIKitCoordinateSystem,
        ElementTypes,
    } };
