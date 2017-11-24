import './uikit-styles.styl';
import $ from 'jquery';

export namespace Core {

    export enum Types {
        ORIENTATION_HORIZONTAL = 1,
        ORIENTATION_VERTICAL,
        DIRECTION_LEFT,
        DIRECTION_RIGHT,
        DIRECTION_UP,
        DIRECTION_DOWN,
    }

    export class Element {

        protected storage: {[key: string]: any} = {};
        protected mediator: Mediator;
        protected original: JQuery;

        constructor(protected element: JQuery) {
            if (!this.element || this.element === null) {
                throw ReferenceError('Передан пустой элемент');
            }
            if (!this.element.hasClass('uikit')) {
                throw ReferenceError(
                    'Переданный элемент не является объектом uikit');
            }

            this.storage = {
                type: [-1],
                enabled: true,
                isInited: false,
                noRebuild: true,
            };

            this.original = this.element.clone();
            if (this.element.attr('data-enabled') === 'false') {
                this.enabled = false;
            }
        }

        private acceptType() {
            if (this.mediator) {
                this.mediator.publish('element.type', this.type);
            }
        }

        protected rebuild() {
            this.storage.isInited = false;
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
                        this.initialize();
                    },
                    0);
            });
        }

        protected initialize(): void {
            this.storage.isInited = true;
            if (this.storage.type !== [-1]) {
                this.acceptType();
            }
        }

        protected get noRebuild(): boolean {
            return this.storage.noRebuild;
        }

        protected set noRebuild(value: boolean) {
            this.storage.noRebuild = value;
        }

        public set type(type: number[]) {
            if (type !== this.storage.type) {
                this.storage.type = type;
                if (this.storage.isInited) {
                    if (this.noRebuild) {
                        this.acceptType();
                    } else {
                        this.rebuild();
                    }
                }
            }
        }

        public get type(): number[] {
            return this.storage.type;
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

    export class Component {

        protected storage: {[key: string]: any} = {};

        constructor(
            protected element: JQuery,
            protected mediator: Mediator,
            type?: number[]) {

                if (!element || element === null) {
                    throw ReferenceError('Передан пустой компонент');
                }

                this.storage = {
                    type: [-1],
                };

                if (type) {
                    this.storage.type = type;
                }
        }

        protected initialize(): void {
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

        public get type(): number[] {
            return this.storage.type;
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

    }

    export namespace Math {
        export function clamp(value: number, minimum: number, maximum: number) {
            return global.Math.min(global.Math.max(minimum, value), maximum);
        }
    }
}
