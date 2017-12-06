class Types {
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

    public getAll(): [string, string][] {
        const types: [string, string][] = [];
        const keys: string[] = this.getKeys();
        keys.map((key) => {
            types.push([key, this.get(key)]);
        });
        return types;
    }

    public get(key: string): string {
        if (this.contains(key)) {
            return this.types[key];
        }
        return '';
    }
}
export default Types;
