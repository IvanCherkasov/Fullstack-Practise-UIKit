import Model from '../model/index';

class Mediator{
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

export default Mediator;
