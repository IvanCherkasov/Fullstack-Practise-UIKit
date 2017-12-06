import $ from 'jquery';
import themes from '../themes.conf';

export namespace Core {

    export class Types {
        private types: object;
        constructor(TYPES: object) {
            this.types = TYPES;
        }

        public contains(key: string): boolean {
            if (this.getValues().indexOf(key) > -1) {
                return true;
            }
            return false;
        }

        public getKeys(): string[] {
            return Object.keys(this.types);
        }

        public getValues(): string[] {
            const keys = Object.keys(this.types);
            const values: string[] = [];
            keys.map((key) => {
                values.push(this.types[key]);
            });
            return values;
        }

        public get(key: string): string {
            if (this.contains(key)) {
                return this.types[key];
            }
            return '';
        }
    }

    export class Variants {
        public static readonly ERROR: string = 'error';
        public static readonly ACCEPT: string = 'accept';
    }

    export class Component {

        protected mediator: Mediator;
        protected original: JQuery;
        protected types: Types;

        private storageType: string = '';
        private storageEnabled: boolean = true;
        private storageIsInited: boolean = false;
        private storageNoRebuild: boolean = true;
        private storageVariant: string = '';

        constructor(protected dom: JQuery) {
            if (!this.dom || this.dom === null) {
                throw ReferenceError('Передан пустой элемент');
            }
            if (!this.dom.hasClass('uikit')) {
                throw ReferenceError(
                    'Переданный элемент не является объектом uikit');
            }

            this.original = this.dom.clone();
            if (this.dom.attr('data-enabled') === 'false') {
                this.enabled = false;
            }
        }

        private acceptType() {
            this.dom.attr('data-type', this.storageType);
            this.types.getValues().map((value) => {
                this.dom.removeClass(value);
            });
            this.dom.addClass(this.storageType);
            if (this.mediator) {
                this.mediator.publish('element.type');
            }
        }

        protected rebuild() {
            this.storageIsInited = false;
            const parent: JQuery = this.dom.parent();
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
            this.dom.toArray().map(elementEachCallback);

            let index = -1;
            const parentChildrenFindEachCallback = (item, i) => {
                if ($(item).is(this.dom)) {
                    index = i;
                    return;
                }
            };
            parent.children().toArray().map(parentChildrenFindEachCallback);

            this.dom.remove();
            this.dom = this.original.clone();

            attributes.map((attr) => {
                if (attr.name !== 'class') {
                    this.dom.attr(attr.name, attr.value);
                }
            });

            const parentChildrenPlaceEachCallback = (item, i) => {
                if (i === index) {
                    $(item).before(this.dom);
                    spawned = true;
                    return;
                }
            };
            parent.children().toArray().map(parentChildrenPlaceEachCallback);

            if (!spawned) {
                parent.append(this.dom);
            }

            this.dom.ready(() => {
                setTimeout(
                    () => {
                        this.initialize();
                    },
                    0);
            });
        }

        protected initialize(): void {
            let enabled = true;
            if (this.dom.attr('data-enabled') === 'false') {
                enabled = false;
            }
            this.enabled = enabled;

            const variant = this.dom.attr('data-variant');
            if (variant) {
                this.variant = variant;
            }

            this.storageIsInited = true;
            if (this.storageType !== '') {
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
            if (this.types.contains(value)) {
                if (value !== this.storageType) {
                    this.storageType = value;
                    if (this.storageIsInited) {
                        if (this.noRebuild) {
                            this.acceptType();
                        } else {
                            this.dom.attr('data-type', this.storageType);
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
            this.dom.attr('data-enabled', `${value}`);
            this.storageEnabled = value;
            if (value) {
                this.dom.removeClass('disabled');
            } else {
                this.dom.addClass('disabled');
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
                this.dom.removeClass(this.storageVariant);
                this.storageVariant = value;
                this.dom.attr('data-variant', value);
                this.dom.addClass(value);
            }
        }

        public on(channel: string, callback: Function) {
            this.mediator.subscribe(channel, callback);
        }
    }

    export class Element {

        private storageType: string = '';
        private storageEnabled: boolean = true;

        constructor(
            protected dom: JQuery,
            protected mediator: Mediator,
            type: string) {

                if (!dom || dom === null) {
                    throw ReferenceError('Передан пустой компонент');
                }
                this.storageType = type;
        }

        protected initialize(): void {
            let enabled = true;
            if (this.dom.attr('data-enabled') === 'false') {
                enabled = false;
            }
            this.enabled = enabled;
        }

        public get enabled(): boolean {
            return this.storageEnabled;
        }

        public set enabled(value: boolean) {
            this.dom.attr('data-enabled', `${value}`);
            this.storageEnabled = value;
            if (value) {
                this.dom.removeClass('disabled');
            } else {
                this.dom.addClass('disabled');
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
        constructor(private dom: JQuery) {
        }

        public get xMin(): number {
            return this.dom.offset().left;
        }

        public get yMin(): number {
            return this.dom.offset().top;
        }

        public get xMax(): number {
            return this.dom.offset().left + this.dom.width();
        }

        public get yMax(): number {
            return this.dom.offset().top + this.dom.height();
        }

        public get width(): number {
            return this.dom.width();
        }

        public get height(): number {
            return this.dom.height();
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
