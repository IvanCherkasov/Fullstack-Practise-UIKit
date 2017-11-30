import $ from 'jquery';
import themes from '../themes/load-all';

export namespace Core {

    export class Types {
        private static readonly types: string[] = [
            '',
            'horizontal',
            'vertical',
            'left',
            'right',
            'top',
            'bottom',
            'radial',
        ];

        public static readonly NO_TYPE: string = Types.types[0];
        public static readonly HORIZONTAL: string = Types.types[1];
        public static readonly VERTICAL: string = Types.types[2];
        public static readonly LEFT: string = Types.types[3];
        public static readonly RIGHT: string = Types.types[4];
        public static readonly TOP: string = Types.types[5];
        public static readonly BOTTOM: string = Types.types[6];
        public static readonly RADIAL: string = Types.types[7];

        public static contains(value: string): boolean {
            if (this.types.indexOf(value) > -1) {
                return true;
            }
            return false;
        }

        public static toArray(): string[] {
            return Types.types.slice(); // clone
        }
    }

    export class Variants {
        public static readonly ERROR: string = 'error';
        public static readonly ACCEPT: string = 'accept';
    }

    export class Element {

        protected mediator: Mediator;
        protected original: JQuery;

        private storageType: string = Types.NO_TYPE;
        private storageEnabled: boolean = true;
        private storageIsInited: boolean = false;
        private storageNoRebuild: boolean = true;
        private storageVariant: string = '';

        constructor(protected element: JQuery) {
            if (!this.element || this.element === null) {
                throw ReferenceError('Передан пустой элемент');
            }
            if (!this.element.hasClass('uikit')) {
                throw ReferenceError(
                    'Переданный элемент не является объектом uikit');
            }

            this.original = this.element.clone();
            if (this.element.attr('data-enabled') === 'false') {
                this.enabled = false;
            }
        }

        private acceptType() {
            this.element.attr('data-type', this.storageType);
            Types.toArray().map((item) => {
                this.element.removeClass(item);
            });
            this.element.addClass(this.storageType);
            if (this.mediator) {
                this.mediator.publish('element.type');
            }
        }

        protected rebuild() {
            this.storageIsInited = false;
            const parent: JQuery = this.element.parent();
            let spawned: boolean = false;

            const attributes = [];
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
                        this.initialize();
                    },
                    0);
            });
        }

        protected initialize(): void {
            let enabled = true;
            if (this.element.attr('data-enabled') === 'false') {
                enabled = false;
            }
            this.enabled = enabled;

            const variant = this.element.attr('data-variant');
            if (variant) {
                this.variant = variant;
            }

            this.storageIsInited = true;
            if (this.storageType !== Types.NO_TYPE) {
                this.acceptType();
            }
        }

        protected get noRebuild(): boolean {
            return this.storageNoRebuild;
        }

        protected set noRebuild(value: boolean) {
            this.storageNoRebuild = value;
        }

        public get type(): string {
            return this.storageType;
        }

        public set type(value: string) {
            if (Types.contains(value)) {
                if (value !== this.storageType) {
                    this.storageType = value;
                    if (this.storageIsInited) {
                        if (this.noRebuild) {
                            this.acceptType();
                        } else {
                            this.element.attr('data-type', this.storageType);
                            this.rebuild();
                        }
                    }
                }
            }
        }

        public get enabled(): boolean {
            return this.storageEnabled;
        }

        public set enabled(value: boolean) {
            this.element.attr('data-enabled', `${value}`);
            this.storageEnabled = value;
            if (value) {
                this.element.removeClass('disabled');
            } else {
                this.element.addClass('disabled');
            }
            if (this.mediator) {
                this.mediator.publish('element.enabled', value);
            }
        }

        public get variant(): string {
            return this.storageVariant;
        }

        public set variant(value: string) {
            if (value) {
                this.element.removeClass(this.storageVariant);
                this.storageVariant = value;
                this.element.attr('data-variant', value);
                this.element.addClass(value);
            }
        }
    }

    export class Component {

        private storageType: string = Types.NO_TYPE;
        private storageEnabled: boolean = true;

        constructor(
            protected element: JQuery,
            protected mediator: Mediator,
            type: string) {

                if (!element || element === null) {
                    throw ReferenceError('Передан пустой компонент');
                }
                this.storageType = type;
        }

        protected initialize(): void {
            let enabled = true;
            if (this.element.attr('data-enabled') === 'false') {
                enabled = false;
            }
            this.enabled = enabled;
        }

        public get enabled(): boolean {
            return this.storageEnabled;
        }

        public set enabled(value: boolean) {
            this.element.attr('data-enabled', `${value}`);
            this.storageEnabled = value;
            if (value) {
                this.element.removeClass('disabled');
            } else {
                this.element.addClass('disabled');
            }
            if (this.mediator) {
                this.mediator.publish('element.enabled', value);
            }
        }

        public get type(): string {
            return this.storageType;
        }
    }

    export class Mediator {

        private channels: {[key: string]: Function[]} = {};

        constructor(private model: Model, private middleWare?: Function[]) {
        }

        public publish(channel: string, ...args: any[]): boolean {
            if (!this.channels[channel]) {
                return false;
            }
            const channelEmitCallbacks = (callback: Function) => {
                callback(...args);
            };
            this.channels[channel].map(channelEmitCallbacks);
            return true;
        }

        public subscribe(channel: string, callback: Function): void {
            if (!this.channels[channel]) {
                this.channels[channel] = [];
            }
            this.channels[channel].push(callback);
        }

        public getData(property: string): any {
            const props: string[] = property.split('.');

            if (props[0] === 'model') {
                const newProps = property.replace('model.', '');
                return this.model.getData(newProps);
            }

            return undefined;
        }

        public setData(property: string, data: any): boolean {
            const props: string[] = property.split('.');

            const emitMiddlewares = (funcs: Function[]) => {
                if (funcs) {
                    funcs.map((func) => {
                        func('mediator set data', { property, data });
                    });
                }
            };

            if (props[0] === 'model') {
                const newProps = property.replace('model.', '');
                if (this.model.setData(newProps, data)) {
                    this.publish(property, this.model.getAllData());
                    emitMiddlewares(this.middleWare);
                    return true;
                }
            }

            return false;
        }
    }

    export class Model {
        constructor(protected data?: {[key: string]: any}) {
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

    export class CoordinateSystem {
        constructor(private element: JQuery) {
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

    export class ThemeController {
        private static themes: string[] = themes.list;
        private static baseTheme: string = themes.baseTheme;
        private static inited: boolean = false;

        private static clearThemes() {
            this.themes.map((themeName) => {
                $('body').removeClass(themeName);
            });
        }

        public static changeTheme(themeName: string) {
            if (this.themes.indexOf(themeName) > -1) {
                this.clearThemes();
                $('body').addClass(themeName);
            } else {
                if (themeName === this.baseTheme) {
                    this.clearThemes();
                }
            }
        }

        public static getAll(): string[] {
            const outArray: string[] = [];
            outArray.push(this.baseTheme);
            this.themes.map((theme) => {
                outArray.push(theme);
            });
            return outArray;
        }

        public static initialize() {
            if (!this.inited) {
                $('body').addClass(this.baseTheme);
                this.inited = true;
            }
        }
    }

    export namespace Math {
        export function clamp(value: number, minimum: number, maximum: number) {
            return global.Math.min(global.Math.max(minimum, value), maximum);
        }
    }
}

Core.ThemeController.initialize();
