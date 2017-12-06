abstract class Model {
    constructor(protected data?: {[key: string]: any}) {
    }

    public getAllData(): {[key: string]: any} {
        return jQuery.extend(true, {}, this.data);
    }

    public abstract getData(property: string): any;
    public abstract setData(property: string, data: any): boolean;
}

export default Model;
